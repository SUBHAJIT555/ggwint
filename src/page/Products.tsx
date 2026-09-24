"use client";

import CommonHeroSection from "../component/ui/CommonHeroSection";
import ProductGrid from "../component/ui/ProductCards";
import CallToAction from "../component/ui/CallToAction";

const Products = () => {
  return (
    <div className="bg-bg">
      <CommonHeroSection
        backgroundImage="/images/heroes/products.webp"
        heading="Unveiling Excellence: Explore Our Impressive Product Universe"
        headingHighlight="Product Universe"
        subHeading="Discover our comprehensive range of quality products designed to meet your business and personal needs. From food items to consumer goods, we offer excellence in every category."
        buttonText="Request Free Quote"
        buttonLink="/contact"
        showTrust
      />
      <ProductGrid
        initialMainCategory="All"
        title="Our Variety of Products"
      />
      <CallToAction
        heading="Request a quote for products supplied from Dubai"
        subHeading="From auto spare parts and construction materials to food, chemicals, IT, paints, solar, and waterproofing — send the items and quantities. GGW International will prepare a clear supply quote."
        quoteLabel="Request a product quote"
        whatsappMessage="Hello! I would like a quote from the GGW International product range."
      />
    </div>
  );
};

export default Products;
