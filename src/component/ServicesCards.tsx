"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { heroShowcaseCards } from "../data/heroShowcase";

const imageById = (id: string) =>
  heroShowcaseCards.find((card) => card.id === id)?.src ?? "";

const servicesData = [
  {
    id: 1,
    title: "Global Sourcing & Procurement.",
    description:
      "We specialize in sourcing high-quality products from trusted suppliers worldwide. Our extensive network ensures that you get the best raw materials, industrial chemicals, and agro products at competitive prices, meeting your business needs efficiently.",
    image: imageById("warehouse-supply"),
    accent: "bg-brand-accent text-on-primary",
  },
  {
    id: 2,
    title: "International Trade & Distribution.",
    description:
      "With a robust logistics and supply chain network, we facilitate seamless import and export operations across global markets. From food additives to building materials, we ensure timely delivery with full compliance with international trade regulations.",
    image: imageById("global-logistics"),
    accent: "bg-amber-400 text-ink",
  },
  {
    id: 3,
    title: "Customized Supply Chain Solutions.",
    description:
      "Every business has unique requirements, and we provide tailored supply chain solutions to optimize your procurement, storage, and distribution processes. Our expertise helps reduce costs and improve operational efficiency.",
    image: imageById("port-operations"),
    accent: "bg-violet-500 text-on-primary",
  },
  {
    id: 4,
    title: "Quality Assurance & Compliance.",
    description:
      "We prioritize quality and regulatory compliance in every trade transaction. Our rigorous quality control measures ensure that all products meet industry standards, providing our clients with reliable and safe solutions.",
    image: imageById("quality-control"),
    accent: "bg-orange-500 text-on-primary",
  },
];

const ServicesCards = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-surface-card py-section screen-line-top"
    >
      <div
        aria-hidden="true"
        className="pattern-hatch absolute inset-0 h-full w-full bg-[repeating-linear-gradient(-315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[5px_5px] bg-fixed"
      />

      <div className="relative z-10 mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-4 text-caption text-muted uppercase"
        >
          Services
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.05 }}
          className="max-w-xl text-section text-ink"
        >
          A supply process that stays in sync
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="mt-4 max-w-lg text-copy text-body"
        >
          Source, move, store, and deliver — nothing gets lost in the handoff.
        </motion.p>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:gap-x-6 lg:gap-y-12">
          {servicesData.map((service) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              className="flex flex-col"
            >
              <div className="overflow-hidden bg-canvas p-2 shadow-sm ring-1 ring-black/5 [--inner:var(--radius-xl)] [--pad:0.5rem] rounded-[calc(var(--inner)+var(--pad))]">
                <img
                  src={service.image}
                  alt=""
                  className="h-48 w-full rounded-[var(--inner)] object-cover sm:h-64 lg:h-72"
                />
              </div>
              <div className="mt-6 flex items-start gap-3">
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[11px] font-semibold ${service.accent}`}
                >
                  {service.id}
                </span>
                <div>
                  <h3 className="text-title-md font-semibold text-ink">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-body-sm leading-6 text-body">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesCards;
