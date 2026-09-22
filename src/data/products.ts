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
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80",
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
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80",
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
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80",
  },
];

export const products: Product[] = [
  {
    id: "ggw-cement-50kg",
    title: "Portland Cement 50kg",
    mainCategory: "Construction Materials",
    category: "Construction Materials",
    description:
      "High-strength OPC bags for structural pours, blocks, and general building work.",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=800&q=80",
    price: 18.5,
  },
  {
    id: "ggw-basmati-25kg",
    title: "Premium Basmati Rice 25kg",
    mainCategory: "Food Products",
    category: "Food Products",
    description:
      "Long-grain aromatic rice sourced for hotels, catering, and wholesale trade.",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
    price: 42,
  },
  {
    id: "ggw-socket-set",
    title: "Industrial Socket Set 94pc",
    mainCategory: "Mechanical Tools",
    category: "Mechanical Tools",
    description:
      "Chrome-vanadium workshop kit for maintenance crews and industrial workshops.",
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
    price: 165,
  },
  {
    id: "ggw-safety-kit",
    title: "Site Safety Helmet Kit",
    mainCategory: "Construction and Safety",
    category: "Construction and Safety",
    description:
      "Hard hat, reflective vest, and gloves for daily site protection.",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80",
    price: 38,
  },
  {
    id: "ggw-emulsion-20l",
    title: "Exterior Emulsion Paint 20L",
    mainCategory: "Paints and Finishes",
    category: "Paints and Finishes",
    description:
      "Weather-resistant wall finish for commercial and residential facades.",
    image:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&w=800&q=80",
    price: 89,
  },
  {
    id: "ggw-membrane-roll",
    title: "Waterproofing Membrane Roll",
    mainCategory: "Water / Fire Proofing",
    category: "Water / Fire Proofing",
    description:
      "Bitumen membrane for roofs, foundations, and wet-area protection.",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80",
    price: 125,
  },
  {
    id: "ggw-led-panel",
    title: "LED Panel Light 40W",
    mainCategory: "Electronics",
    category: "Electronics",
    description:
      "Energy-efficient ceiling panel for offices, warehouses, and retail fit-outs.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    price: 54,
  },
  {
    id: "ggw-brake-pads",
    title: "Ceramic Brake Pad Set",
    mainCategory: "Auto Spare Parts",
    category: "Auto Spare Parts",
    description:
      "Low-dust ceramic pads suitable for passenger vehicles and light fleets.",
    image:
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80",
    price: 76,
  },
];
