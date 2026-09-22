"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { categoryDetails } from "../data/products";

const ProductCategoryCards = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="relative bg-canvas py-section screen-line-top">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-4 text-caption text-muted uppercase"
        >
          What we trade
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.05 }}
          className="text-[32px] font-semibold leading-[1.1] tracking-[-1.5px] text-ink sm:text-display-md lg:text-display-lg"
        >
          Our product categories
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="mt-4 max-w-2xl text-body-md text-body"
        >
          A complete trading range spanning construction, food, industrial
          supplies, electronics, and chemicals.
        </motion.p>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
          {categoryDetails.map((category, index) => (
            <Link
              key={category.slug}
              href={`/products/${category.slug}`}
              className="group flex h-full flex-col rounded-2xl border border-hairline border-dashed bg-surface-card p-1 [--inner:0.85rem] shadow-lift hover:shadow-lg transition-all duration-300 sm:rounded-3xl sm:[--inner:1.25rem]"
            >
              <div className="relative isolate overflow-hidden rounded-(--inner)">
                <img
                  src={category.image}
                  alt=""
                  className="aspect-16/10 w-full rounded-(--inner) object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 rounded-(--inner) bg-linear-to-t from-[#111111]/25 to-transparent"
                />
                <span className="absolute left-2 top-2 inline-flex h-6 min-w-6 items-center justify-center rounded-pill bg-[#111111]/55 px-2 text-[10px] font-medium text-on-primary backdrop-blur-sm sm:left-3 sm:top-3 sm:h-7 sm:min-w-7 sm:px-2.5 sm:text-caption">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="min-h-10 px-1 pt-2 text-[13px] font-semibold leading-snug text-ink sm:min-h-12 sm:pt-3 sm:text-title-sm">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategoryCards;
