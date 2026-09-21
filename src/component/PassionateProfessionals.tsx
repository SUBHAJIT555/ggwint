"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const paragraphs = [
  "We are passionate about what we do and are committed to delivering the highest level of service. Our diverse team brings together decades of combined experience in international trade, ensuring that we can handle the most complex requirements with confidence and precision.",
  "Our team is comprised of experienced professionals with extensive knowledge of global markets, logistics, and product sourcing. We leverage this expertise to ensure every transaction is smooth, efficient, and successful.",
];

const PassionateProfessionals = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="relative bg-canvas py-section screen-line-top"
    >
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(15rem,20rem)_minmax(0,1fr)] lg:gap-0">
          <div className="lg:border-r lg:border-dashed lg:border-hairline lg:pr-12">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="mb-4 text-caption text-muted uppercase"
            >
              Our team
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.05 }}
              className="text-[32px] font-semibold leading-[1.1] tracking-[-1.5px] text-ink sm:text-display-md lg:text-display-lg"
            >
              Passionate Professionals
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="mt-4 text-body-sm text-muted"
            >
              Decades of combined experience
            </motion.p>
          </div>

          <div className="space-y-4 lg:pl-12">
            {paragraphs.map((text, index) => (
              <motion.p
                key={text.slice(0, 24)}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.12 + index * 0.06 }}
                className="text-body-md leading-relaxed text-body"
              >
                {text}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PassionateProfessionals;
