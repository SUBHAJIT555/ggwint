"use client";

import CommonHeroSection from "../component/ui/CommonHeroSection";
import ProductGrid from "../component/ui/ProductCards";
import CallToAction from "../component/ui/CallToAction";
import { CONTACT_FORM_HREF, contactFormHref } from "../data/contact";
import {
  categoryDetails,
  mainCategories,
  toCategorySlug,
  type MainCategory,
} from "../data/products";

const categoryCta: Record<MainCategory, { heading: string; subHeading: string }> = {
  "Auto Spare Parts": {
    heading: "Auto spare parts supply in Dubai",
    subHeading:
      "Engine, body, lighting, and driveline parts for workshops, fleets, and traders. Ask GGW International for stock, lead time, and a quote.",
  },
  "Construction and Safety Tools": {
    heading: "Construction and safety tools for UAE sites",
    subHeading:
      "Hand tools, helmets, boots, and site safety gear for contractors and project teams. Share the quantities and we will quote from Dubai.",
  },
  "Construction Materials": {
    heading: "Construction materials trading from Dubai",
    subHeading:
      "Cement, steel, timber, and building supplies for projects across the UAE. Send your list and GGW International will prepare a supply quote.",
  },
  "Electrics and Electronics": {
    heading: "Electrical and electronics supply in the UAE",
    subHeading:
      "Cables, lighting, breakers, and appliances for commercial and industrial orders. Request availability and pricing from our Dubai team.",
  },
  "Food, Agro & Pharma Chemicals": {
    heading: "Food, agro, and pharma chemicals from Dubai",
    subHeading:
      "Food additives, agro chemicals, and industrial and pharma-grade chemicals for manufacturers and traders. Send your specification and we will confirm a quote.",
  },
  "Food Products": {
    heading: "Wholesale food products for trade in the UAE",
    subHeading:
      "Rice, spices, oils, and grocery supplies for distributors and food businesses. Tell us the grades and volumes you need.",
  },
  "IT and Accessories": {
    heading: "IT equipment and accessories in Dubai",
    subHeading:
      "Computers, networking, printers, and accessories for offices and project teams. Ask GGW International for a configured supply quote.",
  },
  "Paints and Finishes": {
    heading: "Paints and finishes supplied from Dubai",
    subHeading:
      "Primers, enamels, and finishing paints for contractors and fit-out teams. Share the colours and coverage, and we will quote.",
  },
  "Solar Panels & Lithium Batteries": {
    heading: "Solar panels and lithium batteries in the UAE",
    subHeading:
      "Panels, inverters, batteries, and installation tools for solar and power projects. Request specifications, availability, and a quote.",
  },
  "Water and Fire Proofing": {
    heading: "Waterproofing and fire protection materials",
    subHeading:
      "Membranes, coatings, and protective boards for building envelopes and safety works. Tell us the system and area, and we will prepare a quote.",
  },
};

const ProductCategory = ({ categorySlug }: { categorySlug?: string }) => {
  const getMainCategoryFromSlug = (slug?: string): MainCategory | "All" => {
    if (!slug) return "All";
    return mainCategories.find((cat) => toCategorySlug(cat) === slug) || "All";
  };

  const selectedMainCategory = getMainCategoryFromSlug(categorySlug);
  const detail = categoryDetails.find(
    (item) => item.name === selectedMainCategory
  );

  return (
    <div className="bg-bg">
      <CommonHeroSection
        backgroundImage={detail?.heroImage ?? detail?.image}
        heading={
          selectedMainCategory === "All"
            ? "Explore our product range"
            : `Explore ${selectedMainCategory}`
        }
        headingHighlight={
          selectedMainCategory === "All" ? "product range" : selectedMainCategory
        }
        subHeading={
          detail?.description ??
          "Discover our comprehensive range of quality products designed to meet your business needs."
        }
        buttonText="Get a quote"
        buttonLink={
          selectedMainCategory === "All"
            ? CONTACT_FORM_HREF
            : contactFormHref(toCategorySlug(selectedMainCategory))
        }
        secondaryButtonText="All products"
        secondaryButtonLink="/products"
        showTrust
      />
      <ProductGrid
        initialMainCategory={selectedMainCategory}
        title={
          selectedMainCategory === "All"
            ? "Our Products"
            : `${selectedMainCategory} Collection`
        }
      />
      <CallToAction
        heading={
          selectedMainCategory === "All"
            ? "Quote the full GGW International product range"
            : categoryCta[selectedMainCategory].heading
        }
        subHeading={
          selectedMainCategory === "All"
            ? "One Dubai trading desk for construction, food, industrial, electronics, and chemical supply. Send your list and we will price what you need."
            : categoryCta[selectedMainCategory].subHeading
        }
        quoteLabel={
          selectedMainCategory === "All" ? "Request a quote" : "Quote this range"
        }
        serviceSlug={
          selectedMainCategory === "All"
            ? undefined
            : toCategorySlug(selectedMainCategory)
        }
        whatsappMessage={
          selectedMainCategory === "All"
            ? "Hello! I would like a quote from the GGW International catalogue."
            : `Hello! I would like a quote for ${selectedMainCategory} from GGW International.`
        }
      />
    </div>
  );
};

export default ProductCategory;
