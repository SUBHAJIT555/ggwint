export type MainCategory =
  | "Construction Materials"
  | "Food Products"
  | "Mechanical Tools"
  | "Construction and Safety"
  | "Paints and Finishes"
  | "Water / Fire Proofing"
  | "Electronics"
  | "Auto Spare Parts"
  | "IT Accessories"
  | "Chemicals";

export type Category = MainCategory;

export type Product = {
  id: string;
  title: string;
  mainCategory: MainCategory;
  category: Category;
  description: string;
  image: string;
  price: number;
};

export const mainCategories: MainCategory[] = [
  "Construction Materials",
  "Food Products",
  "Mechanical Tools",
  "Construction and Safety",
  "Paints and Finishes",
  "Water / Fire Proofing",
  "Electronics",
  "Auto Spare Parts",
  "IT Accessories",
  "Chemicals",
];

export const categories = mainCategories;

export function toCategorySlug(category: string) {
  return category
    .toLowerCase()
    .replace(/\s*\/\s*/g, "-")
    .replace(/ & /g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const categoryDetails: {
  name: MainCategory;
  slug: string;
  description: string;
  menuDescription: string;
  image: string;
}[] = [
  {
    name: "Construction Materials",
    slug: "construction-materials",
    description:
      "Cement, steel, timber, tiles, and core building supplies for projects of every scale.",
    menuDescription: "Cement, steel, timber & core building supplies",
    image:
      "https://images.unsplash.com/photo-1503387762458-7e528f908504?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Food Products",
    slug: "food-products",
    description:
      "Rice, spices, oils, frozen foods, and other quality food supplies for trade.",
    menuDescription: "Rice, spices, oils, frozen foods & groceries",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Mechanical Tools",
    slug: "mechanical-tools",
    description:
      "Industrial and workshop tools engineered for reliable everyday performance.",
    menuDescription: "Industrial and workshop tools for daily use",
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Construction and Safety",
    slug: "construction-and-safety",
    description:
      "Safety helmets, gloves, ladders, and site equipment that keep crews protected.",
    menuDescription: "Helmets, gloves, ladders & site safety gear",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Paints and Finishes",
    slug: "paints-and-finishes",
    description:
      "Interior and exterior paints, primers, enamels, and finishing supplies.",
    menuDescription: "Paints, primers, enamels & finishing supplies",
    image:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Water / Fire Proofing",
    slug: "water-fire-proofing",
    description:
      "Waterproofing membranes, fire-resistant coatings, and protective systems.",
    menuDescription: "Membranes, coatings & protective systems",
    image:
      "https://images.unsplash.com/photo-1581094794329-adc7bb0b4d2b?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Electronics",
    slug: "electronics",
    description:
      "Lighting, cables, appliances, and electrical products for commercial supply.",
    menuDescription: "Lighting, cables, appliances & electrical goods",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Auto Spare Parts",
    slug: "auto-spare-parts",
    description:
      "Vehicle components and spare parts sourced for workshops and distributors.",
    menuDescription: "Vehicle components for workshops & trade",
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "IT Accessories",
    slug: "it-accessories",
    description:
      "Computers, printers, networking hardware, and IT accessories for business.",
    menuDescription: "Computers, printers, networking & accessories",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Chemicals",
    slug: "chemicals",
    description:
      "Industrial, agro, food, and pharma-grade chemicals for specialized supply.",
    menuDescription: "Industrial, agro, food & pharma-grade chemicals",
    image:
      "https://images.unsplash.com/photo-1532187875605-2fe358a71e7a?auto=format&fit=crop&w=800&q=80",
  },
];

// Products will be added later.
export const products: Product[] = [];
