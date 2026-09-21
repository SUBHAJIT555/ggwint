"use client";

const Logo = ({
  className = "",
  variant = "on-dark",
}: {
  className?: string;
  variant?: "on-dark" | "on-light";
}) => {
  const isLight = variant === "on-light";

  return (
    <div className={`flex items-center gap-2.5 h-full ${className}`}>
      <span
        className={`flex items-center justify-center w-8 h-8 rounded-sm text-[10px] font-semibold tracking-wide ${
          isLight ? "bg-ink text-canvas" : "bg-canvas text-ink"
        }`}
      >
        GGW
      </span>
      <span className={`leading-[1.15] ${isLight ? "text-ink" : "text-on-dark"}`}>
        <span className="block text-[11px] sm:text-xs font-semibold tracking-[0.04em]">
          GGW INTERNATIONAL
        </span>
        <span
          className={`block text-[9px] sm:text-[10px] tracking-wide ${
            isLight ? "text-muted" : "text-on-dark-soft"
          }`}
        >
          General Trading LLC
        </span>
      </span>
    </div>
  );
};

export default Logo;
