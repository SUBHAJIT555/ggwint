export type HeroShowcaseCard = {
  id: string;
  title: string;
  src: string;
  href: string;
};

export type HeroProofAvatar = {
  id: string;
  src: string;
  alt: string;
};

const categoryHref = {
  auto: "/products/auto-spare-parts/",
  safety: "/products/construction-and-safety-tools/",
  materials: "/products/construction-materials/",
  electrics: "/products/electrics-and-electronics/",
  chemicals: "/products/food-agro-pharma-chemicals/",
  food: "/products/food-products/",
  it: "/products/it-and-accessories/",
  paints: "/products/paints-and-finishes/",
  solar: "/products/solar-panels-lithium-batteries/",
  water: "/products/water-and-fire-proofing/",
} as const;

const scene = (file: string) => `/images/heroes/${file}.webp`;

export const heroShowcaseCards: HeroShowcaseCard[] = [
  {
    id: "cargo-shipping",
    title: "Import and export",
    src: scene("port"),
    href: "/about/",
  },
  {
    id: "warehouse-range",
    title: "Warehouse supply",
    src: scene("products"),
    href: "/products/",
  },
  {
    id: "engine-parts",
    title: "Auto Spare Parts",
    src: scene("auto"),
    href: categoryHref.auto,
  },
  {
    id: "site-safety",
    title: "Construction and Safety Tools",
    src: scene("safety"),
    href: categoryHref.safety,
  },
  {
    id: "building-materials",
    title: "Construction Materials",
    src: scene("materials"),
    href: categoryHref.materials,
  },
  {
    id: "electronics-board",
    title: "Electrics and Electronics",
    src: scene("electrics"),
    href: categoryHref.electrics,
  },
  {
    id: "lab-chemicals",
    title: "Food, Agro & Pharma Chemicals",
    src: scene("chemicals"),
    href: categoryHref.chemicals,
  },
  {
    id: "fresh-produce",
    title: "Food Products",
    src: scene("food"),
    href: categoryHref.food,
  },
  {
    id: "workspace-it",
    title: "IT and Accessories",
    src: scene("it"),
    href: categoryHref.it,
  },
  {
    id: "wall-paint",
    title: "Paints and Finishes",
    src: scene("paints"),
    href: categoryHref.paints,
  },
  {
    id: "solar-field",
    title: "Solar Panels & Lithium Batteries",
    src: scene("solar"),
    href: categoryHref.solar,
  },
  {
    id: "building-envelope",
    title: "Water and Fire Proofing",
    src: scene("waterproofing"),
    href: categoryHref.water,
  },
  {
    id: "port-trade",
    title: "Port operations",
    src: scene("port"),
    href: "/about/",
  },
  {
    id: "city-towers",
    title: "Global business",
    src: scene("about"),
    href: "/about/",
  },
];

export const heroProofAvatars: HeroProofAvatar[] = [
  {
    id: "a1",
    src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&h=128&q=80",
    alt: "Client portrait",
  },
  {
    id: "a2",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=128&h=128&q=80",
    alt: "Client portrait",
  },
  {
    id: "a3",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=128&h=128&q=80",
    alt: "Client portrait",
  },
  {
    id: "a4",
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=128&h=128&q=80",
    alt: "Client portrait",
  },
  {
    id: "a5",
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=128&h=128&q=80",
    alt: "Client portrait",
  },
  {
    id: "a6",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&h=128&q=80",
    alt: "Client portrait",
  },
  {
    id: "a7",
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=128&h=128&q=80",
    alt: "Client portrait",
  },
  {
    id: "a8",
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=128&h=128&q=80",
    alt: "Client portrait",
  },
];

export const heroFallbackSrc = "/images/heroes/products.webp";
