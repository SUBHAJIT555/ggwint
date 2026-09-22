"use client";

import { useRef, type ComponentType } from "react";
import { motion, useInView } from "framer-motion";
import {
  FiAward,
  FiLayers,
  FiMapPin,
  FiSettings,
  FiTruck,
  FiUsers,
} from "react-icons/fi";

type Feature = {
  title: string;
  description: string;
  Icon: ComponentType<{ className?: string }>;
};

const features: Feature[] = [
  {
    title: "Dubai-Based Operations",
    description:
      "Regional market knowledge with deep understanding of UAE and GCC business landscapes.",
    Icon: FiMapPin,
  },
  {
    title: "Single Trusted Vendor",
    description:
      "Construction, food, industrial, electronics, and chemical supply under one roof.",
    Icon: FiLayers,
  },
  {
    title: "Consistent Quality",
    description:
      "Professional execution with meticulous attention to detail on every shipment.",
    Icon: FiAward,
  },
  {
    title: "Custom Solutions",
    description:
      "Tailored sourcing and supply programmes designed for your unique business needs.",
    Icon: FiSettings,
  },
  {
    title: "Reliable Delivery",
    description:
      "Dependable sourcing and timely delivery you can count on every time.",
    Icon: FiTruck,
  },
  {
    title: "Manufacturer Partnerships",
    description:
      "Direct relationships with international manufacturers for quality products at competitive prices.",
    Icon: FiUsers,
  },
];

const WhyChooseUs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative bg-canvas py-section screen-line-top"
    >
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-4 text-caption text-muted uppercase"
        >
          Why choose us
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.05 }}
          className="text-section text-ink"
        >
          Why work with GGW International?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="mt-4 max-w-2xl text-copy text-body"
        >
          Partner with a team that understands your vision and delivers
          results. We bring expertise, reliability, and a commitment to
          excellence in every project.
        </motion.p>

        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.Icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.12 + index * 0.05 }}
              >
                <Icon className="h-5 w-5 text-brand-accent" />
                <h3 className="mt-4 text-title-sm font-semibold text-ink">
                  {feature.title}
                </h3>
                <p className="mt-2 text-body-sm leading-relaxed text-body">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
