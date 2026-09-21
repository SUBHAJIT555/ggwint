"use client";

import CommonHeroSection from "../component/ui/CommonHeroSection";
import ProductGrid from "../component/ui/ProductCards";
import CallToAction from "../component/ui/CallToAction";

import productsHeroImage from "../assets/images/Hero-images/ProductsHero.webp";

const Products = () => {
  return (
    <div className="bg-bg">
      <CommonHeroSection
        backgroundImage={productsHeroImage}
        heading="Unveiling Excellence: Explore Our Impressive Product Universe"
        headingHighlight="Product Universe"
        subHeading="Discover our comprehensive range of quality products designed to meet your business and personal needs. From food items to consumer goods, we offer excellence in every category."
        buttonText="Request Free Quote"
        buttonLink="/contact"
        textAlign="center"
        overlayOpacity={0.65}
        parallaxStrength={400}
      />
      <ProductGrid
        initialMainCategory="All"
        title="Our Variety of Products"
      />
      <CallToAction />
    </div>
  );
};

export default Products;
