"use client";

import Link from "next/link";
import ProductGrid from "../component/ui/ProductCards";
import CallToAction from "../component/ui/CallToAction";
import { mainCategories, toCategorySlug, type MainCategory } from "../data/products";
import { FiChevronRight, FiHome } from "react-icons/fi";

const ProductCategory = ({ categorySlug }: { categorySlug?: string }) => {

  // Helper to convert slug back to MainCategory
  const getMainCategoryFromSlug = (slug?: string): MainCategory | "All" => {
    if (!slug) return "All";

    const match = mainCategories.find((cat) => toCategorySlug(cat) === slug);

    return match || "All";
  };

  const selectedMainCategory = getMainCategoryFromSlug(categorySlug);

  return (
    <div className="min-h-screen pt-24">
      {/* Breadcrumb Section */}

      <div className="relative ">
        <div className="border-b border-zinc-700 mb-8">
          <div className="container mx-auto px-4 py-6 ">
            <nav className="flex flex-wrap items-center gap-x-2 gap-y-2 text-md md:text-xl text-zinc-400 font-poppins">
              <Link
                href="/"
                className="flex items-center hover:text-primary transition-colors duration-200"
              >
                <FiHome className="mr-1" /> Home
              </Link>
              <FiChevronRight className="text-zinc-600" />
              <Link
                href="/products"
                className="hover:text-primary transition-colors duration-200"
              >
                Products
              </Link>
              <FiChevronRight className="text-zinc-600" />
              <span className="text-white font-medium whitespace-nowrap">
                {selectedMainCategory}
              </span>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pb-12">
        {/* <div className="container mx-auto px-4 mb-8">
          <h1 className="text-3xl md:text-5xl font-poppins font-bold text-white mb-4">
            {selectedMainCategory === "All"
              ? "All Products"
              : selectedMainCategory}
          </h1>
          <p className="text-zinc-400 max-w-2xl leading-relaxed">
            {selectedMainCategory === "All"
              ? "Discover our comprehensive range of quality products designed to meet your business and personal needs."
              : `High-quality products and solutions within the ${selectedMainCategory} sector, tailored for excellence and reliability.`}
          </p>
        </div> */}

        <ProductGrid
          initialMainCategory={selectedMainCategory}
          title={
            selectedMainCategory === "All"
              ? "Our Products"
              : `${selectedMainCategory} Collection`
          }
        />
      </div>

      <CallToAction />
    </div>
  );
};

export default ProductCategory;
