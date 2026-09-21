"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { ProductMockupCard } from "./ui/Card";
import { categoryDetails } from "../data/products";

const ProductCategoryCards = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const router = useRouter();

  return (
    <section ref={sectionRef} className="relative bg-canvas py-section screen-line-top">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-caption text-muted uppercase mb-4"
        >
          What we trade
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.05 }}
          className="text-[32px] sm:text-display-md lg:text-display-lg font-semibold text-ink tracking-[-1.5px] leading-[1.1]"
        >
          Our product categories
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="mt-4 text-body-md text-body max-w-2xl"
        >
          A complete trading range spanning construction, food, industrial
          supplies, electronics, and chemicals.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mt-12">
          {categoryDetails.map((category, index) => (
            <ProductMockupCard key={category.slug} className="cursor-pointer">
              <button
                type="button"
                className="text-left w-full"
                onClick={() => router.push(`/products/${category.slug}`)}
              >
                <div
                  className="h-36 rounded-md bg-cover bg-center mb-5 bg-surface-card"
                  style={{ backgroundImage: `url(${category.image})` }}
                />
                <p className="text-caption text-muted uppercase mb-2">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="text-title-md text-ink">{category.name}</h3>
                <p className="mt-2 text-body-sm text-body">
                  {category.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-button text-ink">
                  View category <FiArrowUpRight />
                </span>
              </button>
            </ProductMockupCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategoryCards;
