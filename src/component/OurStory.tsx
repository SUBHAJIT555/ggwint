"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const paragraphs = [
  "Founded in Dubai in 2015, G G W INTERNATIONAL GENERAL TRADING L.L.C was established with a clear vision — to simplify and elevate the global trading landscape. Recognizing the demand for a reliable and efficient partner, we set out to navigate the complexities of international trade with integrity, expertise, and a commitment to excellence.",
  "Since our inception, we have built a reputation for excellence, fostering strong relationships with suppliers and clients across the globe. Our strategic location in Dubai’s bustling commercial hub has enabled us to serve as a vital link between diverse markets worldwide.",
];

const OurStory = () => {
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
              Since 2015
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.05 }}
              className="text-section text-ink"
            >
              Our Story
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="mt-4 text-body-sm text-muted"
            >
              Founded in Dubai
            </motion.p>
          </div>

          <div className="space-y-4 lg:pl-12">
            {paragraphs.map((text, index) => (
              <motion.p
                key={text.slice(0, 24)}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.12 + index * 0.06 }}
                className="text-copy text-body"
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

export default OurStory;
