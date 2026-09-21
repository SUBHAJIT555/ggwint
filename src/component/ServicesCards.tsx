"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { toSrc, type ImageSource } from "../lib/toSrc";
import { ProductMockupCard } from "./ui/Card";
import eventCardImage from "../assets/images/Home-page-images/Services-EventManagement.webp";
import corporateGiftSupplyCardImage from "../assets/images/Home-page-images/Services-CorporateGifts.webp";
import printingServicesCardImage from "../assets/images/Home-page-images/Services-PrintingServices.webp";
import generalTradingCardImage from "../assets/images/Home-page-images/Services-GeneralTrading.webp";

interface ServiceData {
  id: number;
  title: string;
  category: string;
  bgImage: ImageSource;
  description: string;
}

const servicesData: ServiceData[] = [
  {
    id: 4,
    title: "General Trading",
    category: "Trading",
    bgImage: generalTradingCardImage,
    description:
      "Food, beverages, packaged food, spices, and related products. Your trusted B2B trading partner.",
  },
  {
    id: 2,
    title: "Corporate Gift Supply",
    category: "Corporate",
    bgImage: corporateGiftSupplyCardImage,
    description:
      "Customized promotional and business gifts that leave lasting impressions on clients and partners.",
  },
  {
    id: 1,
    title: "Event Management",
    category: "Events",
    bgImage: eventCardImage,
    description:
      "Planning and execution of corporate events. From concept to completion, we deliver excellence.",
  },
  {
    id: 3,
    title: "Printing Services",
    category: "Print",
    bgImage: printingServicesCardImage,
    description:
      "High-quality printing for branding and marketing. State-of-the-art tech meets creative excellence.",
  },
];

const ServicesCards = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section ref={sectionRef} className="relative bg-canvas py-section screen-line-top">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-caption text-muted uppercase mb-4"
        >
          What we offer
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.05 }}
          className="text-[32px] sm:text-display-md lg:text-display-lg font-semibold text-ink tracking-[-1.5px] leading-[1.1]"
        >
          Our services
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="mt-4 text-body-md text-body max-w-2xl"
        >
          Comprehensive solutions tailored to elevate your business across the
          GCC region.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {servicesData.map((service) => (
            <ProductMockupCard key={service.id}>
              <div
                className="h-40 rounded-md bg-cover bg-center mb-5"
                style={{ backgroundImage: `url(${toSrc(service.bgImage)})` }}
              />
              <p className="text-caption text-muted uppercase mb-2">
                {service.category}
              </p>
              <h3 className="text-title-md text-ink">{service.title}</h3>
              <p className="mt-2 text-body-sm text-body">{service.description}</p>
            </ProductMockupCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesCards;
