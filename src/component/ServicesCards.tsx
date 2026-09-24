"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
const emphasis = "font-semibold text-ink";

const servicesData = [
  {
    id: 1,
    title: "Global Sourcing & Procurement.",
    description: (
      <>
        We specialize in sourcing{" "}
        <strong className={emphasis}>high-quality products</strong> from{" "}
        <strong className={emphasis}>trusted suppliers worldwide</strong>. Our
        extensive network ensures that you get the best{" "}
        <strong className={emphasis}>
          raw materials, industrial chemicals, and agro products
        </strong>{" "}
        at <strong className={emphasis}>competitive prices</strong>, meeting
        your business needs efficiently.
      </>
    ),
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    accent: "bg-brand-accent text-on-primary",
  },
  {
    id: 2,
    title: "International Trade & Distribution.",
    description: (
      <>
        With a robust logistics and supply chain network, we facilitate seamless{" "}
        <strong className={emphasis}>import and export operations</strong>{" "}
        across global markets. From{" "}
        <strong className={emphasis}>
          food additives to building materials
        </strong>
        , we ensure <strong className={emphasis}>timely delivery</strong> with
        full compliance with{" "}
        <strong className={emphasis}>international trade regulations</strong>.
      </>
    ),
    image:
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=80",
    accent: "bg-amber-400 text-ink",
  },
  {
    id: 3,
    title: "Customized Supply Chain Solutions.",
    description: (
      <>
        Every business has unique requirements, and we provide{" "}
        <strong className={emphasis}>tailored supply chain solutions</strong>{" "}
        to optimize your{" "}
        <strong className={emphasis}>
          procurement, storage, and distribution
        </strong>{" "}
        processes. Our expertise helps{" "}
        <strong className={emphasis}>reduce costs</strong> and improve{" "}
        <strong className={emphasis}>operational efficiency</strong>.
      </>
    ),
    image:
      "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&w=1200&q=80",
    accent: "bg-violet-500 text-on-primary",
  },
  {
    id: 4,
    title: "Quality Assurance & Compliance.",
    description: (
      <>
        We prioritize{" "}
        <strong className={emphasis}>
          quality and regulatory compliance
        </strong>{" "}
        in every trade transaction. Our rigorous{" "}
        <strong className={emphasis}>quality control</strong> measures ensure
        that all products meet{" "}
        <strong className={emphasis}>industry standards</strong>, providing our
        clients with{" "}
        <strong className={emphasis}>reliable and safe solutions</strong>.
      </>
    ),
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
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
          A supply process that <span className="bg-brand-accent px-1.5 text-on-primary">stays in sync</span> 
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
