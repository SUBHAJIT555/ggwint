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

const sourceRoot = path.join("src", "assets", "images");
const destRoot = path.join("public", "images");

fs.mkdirSync(destRoot, { recursive: true });

for (const dir of dirs) {
  const from = path.join(sourceRoot, dir);
  const to = path.join(destRoot, dir);
  if (!fs.existsSync(from)) continue;
  fs.cpSync(from, to, { recursive: true });
}

console.log("Copied product images to public/images");
