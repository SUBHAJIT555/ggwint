"""Download Composer packages into public/vendor without the Composer PHAR."""
import json
import shutil
import ssl
import urllib.request
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VENDOR = ROOT / "public" / "vendor"
PACKAGES = {
    "phpmailer/phpmailer": "^7.0",
    "vlucas/phpdotenv": "^5.6",
}

ctx = ssl.create_default_context()


def fetch_json(url: str):
    with urllib.request.urlopen(url, context=ctx) as res:
        return json.load(res)


def parse_constraint(constraint: str):
    constraint = constraint.strip().split(" ")[0]
    if constraint.startswith("^"):
        parts = constraint[1:].split(".")
        major = int(parts[0])
        minor = int(parts[1]) if len(parts) > 1 else 0
        if major == 0:
            upper = (0, minor + 1, 0)
        else:
            upper = (major + 1, 0, 0)
        return tuple(int(p) for p in (parts + ["0", "0"])[:3]), upper
    if constraint.startswith("~"):
        parts = constraint[1:].split(".")
        major = int(parts[0])
        minor = int(parts[1]) if len(parts) > 1 else 0
        return tuple(int(p) for p in (parts + ["0", "0"])[:3]), (major, minor + 1, 0)
    parts = constraint.lstrip("v").split(".")
    exact = tuple(int(p) for p in (parts + ["0", "0"])[:3])
    return exact, (exact[0], exact[1], exact[2] + 1)


def version_tuple(version: str):
    version = version.lstrip("v").split("-")[0]
    return tuple(int(p) for p in (version.split(".") + ["0", "0"])[:3])


def matches(version: str, constraint: str) -> bool:
    if "||" in constraint:
        return any(matches(version, part) for part in constraint.split("||"))
    low, high = parse_constraint(constraint)
    current = version_tuple(version)
    return low <= current < high


def pick(name: str, constraint: str):
    data = fetch_json(f"https://repo.packagist.org/p2/{name}.json")
    for release in data["packages"][name]:
        version = release["version"]
        if version.startswith("dev-") or "alpha" in version or "beta" in version or "RC" in version:
            continue
        if matches(version, constraint):
            return release
    raise SystemExit(f"No release of {name} matches {constraint}")


def install(name: str, constraint: str, seen: dict):
    if name in seen or name == "php" or name.startswith("ext-"):
        return
    release = pick(name, constraint)
    seen[name] = release["version"]
    print(f"{name} {release['version']}")
    dest = VENDOR / name
    if dest.exists():
        shutil.rmtree(dest)
    dest.parent.mkdir(parents=True, exist_ok=True)
    zip_path = VENDOR / "_tmp.zip"
    with urllib.request.urlopen(release["dist"]["url"], context=ctx) as res:
        zip_path.write_bytes(res.read())
    with zipfile.ZipFile(zip_path) as archive:
        top = archive.namelist()[0].split("/")[0]
        archive.extractall(VENDOR / "_extract")
    shutil.move(str(VENDOR / "_extract" / top), dest)
    shutil.rmtree(VENDOR / "_extract", ignore_errors=True)
    zip_path.unlink(missing_ok=True)
    meta = json.loads((dest / "composer.json").read_text(encoding="utf-8"))
    for dep, dep_constraint in meta.get("require", {}).items():
        if dep == "php" or dep.startswith("ext-"):
            continue
        install(dep, dep_constraint, seen)


def main():
    if VENDOR.exists():
        shutil.rmtree(VENDOR)
    VENDOR.mkdir(parents=True)
    seen = {}
    for name, constraint in PACKAGES.items():
        install(name, constraint, seen)

    psr4 = []
    files = []
    for name in seen:
        meta = json.loads((VENDOR / name / "composer.json").read_text(encoding="utf-8"))
        autoload = meta.get("autoload", {})
        for prefix, paths in autoload.get("psr-4", {}).items():
            if isinstance(paths, str):
                paths = [paths]
            for path in paths:
                rel = (Path(name) / path).as_posix().rstrip("/")
                psr4.append((prefix, rel))
        for path in autoload.get("files", []):
            files.append((Path(name) / path).as_posix())

    lines = [
        "<?php",
        "// Generated for cPanel. Upload this vendor folder with the site.",
        "spl_autoload_register(static function (string $class): void {",
        "    $map = [",
    ]
    for prefix, rel in psr4:
        lines.append(f"        {prefix!r} => {rel!r},")
    lines += [
        "    ];",
        "    foreach ($map as $prefix => $rel) {",
        "        if (!str_starts_with($class, $prefix)) {",
        "            continue;",
        "        }",
        "        $file = __DIR__ . '/' . $rel . '/' . str_replace('\\\\', '/', substr($class, strlen($prefix))) . '.php';",
        "        if (is_file($file)) {",
        "            require $file;",
        "            return;",
        "        }",
        "    }",
        "});",
    ]
    for rel in files:
        lines.append(f"require_once __DIR__ . '/{rel}';")
    lines.append("")
    (VENDOR / "autoload.php").write_text("\n".join(lines), encoding="utf-8")
    print("installed", ", ".join(f"{k}@{v}" for k, v in seen.items()))


if __name__ == "__main__":
    main()
