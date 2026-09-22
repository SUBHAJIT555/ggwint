"use client";

import CommonHeroSection from "../component/ui/CommonHeroSection";
import ProductGrid from "../component/ui/ProductCards";
import CallToAction from "../component/ui/CallToAction";
import {
  categoryDetails,
  mainCategories,
  toCategorySlug,
  type MainCategory,
} from "../data/products";

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
        backgroundImage={detail?.image}
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
        buttonLink="/contact"
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
      <CallToAction />
    </div>
  );
};

export default ProductCategory;
