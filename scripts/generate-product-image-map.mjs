import fs from "fs";
import path from "path";

const dirs = [
  "ProductImages",
  "building-materials-products-images",
  "chemicals-and-additives-product-images",
  "Construction-Materials-products-images",
  "Contracting-Solutions-products-images",
  "electronics-and-it-products-images",
  "food-stuff-product-images",
  "import-and-export-product-images",
  "oil-products-images",
];

const imagesRoot = path.join("src", "assets", "images");
const entries = [];
let i = 0;

for (const dir of dirs) {
  const abs = path.join(imagesRoot, dir);
  if (!fs.existsSync(abs)) continue;
  const files = fs
    .readdirSync(abs)
    .filter((f) => f.toLowerCase().endsWith(".webp"))
    .sort();
  for (const file of files) {
    const key = `../assets/images/${dir}/${file}`;
    const url = `/images/${dir}/${encodeURI(file)}`;
    entries.push(`  ${JSON.stringify(key)}: ${JSON.stringify(url)},`);
    i += 1;
  }
}

const contents = `export const productImages: Record<string, string> = {
${entries.join("\n")}
};
`;

fs.writeFileSync(path.join("src", "data", "productImageMap.ts"), contents);
console.log(`Wrote ${i} public image URLs`);
