"use client";

import type { ComponentType } from "react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FiBox,
  FiClock,
  FiHelpCircle,
  FiMapPin,
  FiPhone,
  FiStar,
} from "react-icons/fi";
import { cn } from "../../lib/cn";
import { SITE_CONTACT } from "../../data/contact";

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  Icon?: ComponentType<{ className?: string }>;
}

interface FAQProps {
  sectionLabel?: string;
  heading: string;
  headingHighlightStart?: number;
  subHeading?: string;
  highlightWord?: string;
  faqItems: FAQItem[];
  whatsappNumber?: string;
  whatsappMessage?: string;
  chatPrompt?: string;
  chatButtonText?: string;
  defaultExpandedId?: number;
  showSearch?: boolean;
  searchPlaceholder?: string;
}

const fallbackIcons = [
  FiHelpCircle,
  FiMapPin,
  FiPhone,
  FiBox,
  FiStar,
  FiClock,
];

const FAQ = ({
  sectionLabel = "FAQ",
  heading,
  subHeading,
  faqItems,
  whatsappNumber = SITE_CONTACT.whatsappNumber,
  whatsappMessage = "Hello! I have a question about GGW International's products.",
  chatPrompt = "Didn't find your answer?",
  chatButtonText = "Chat with us",
}: FAQProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <section
      ref={sectionRef}
      className="bg-canvas py-section text-ink screen-line-top"
    >
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="mb-4 w-fit bg-brand-accent px-1.5 text-caption text-on-primary uppercase"
        >
          {sectionLabel}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-section text-ink"
        >
          {heading}
        </motion.h2>
        {subHeading && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="mt-4 max-w-2xl text-copy text-body"
          >
            {subHeading}
          </motion.p>
        )}

        <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2">
          {faqItems.map((item, index) => {
            const Icon = item.Icon ?? fallbackIcons[index % fallbackIcons.length];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.04 }}
              >
                <span
                  className={cn(
                    "mb-4 flex h-8 w-8 items-center justify-center text-on-primary",
                    "rounded-sm bg-linear-to-b from-[#5B8AFF] to-[#2667FF]",
                    "shadow-[0px_0px_10px_0px_rgba(255,255,255,0.25)_inset]",
                    "ring ring-white/25 ring-inset ring-offset-1 ring-offset-[#2667FF]"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <h3 className="text-title-sm font-semibold text-ink">
                  {item.question}
                </h3>
                <p className="mt-3 text-body-sm leading-relaxed text-body">
                  {item.answer}
                </p>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-14 text-center text-body-sm text-muted">
          {chatPrompt}{" "}
          <a
            href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand-accent underline-offset-4 hover:text-brand-accent hover:underline transition-all duration-300"
          >
            {chatButtonText}
          </a>{" "}
          or email{" "}
          <a
            href={`mailto:${SITE_CONTACT.email}`}
            className={cn(
              "inline-flex items-center gap-1 font-medium text-brand-accent underline-offset-4 hover:text-brand-accent hover:underline transition-all duration-300"
            )}
          >
            
            {SITE_CONTACT.email}
          </a>
          .
        </p>
      </div>
    </section>
  );
};

export default FAQ;
