"use client";

import { motion } from "framer-motion";
import { IoLogoWhatsapp } from "react-icons/io";
import Button from "./Button";

const WHATSAPP_URL =
  "https://wa.me/97142712771?text=" +
  encodeURIComponent(
    "Hello! I'm interested in learning more about GGW International's products."
  );

const bullets = [
  "Dubai-based operations with deep UAE and GCC market knowledge.",
  "Construction, food, industrial, electronics, and chemical supply under one roof.",
  "ISO 9001:2015-certified quality and reliable delivery on every order.",
];

const CallToAction = () => {
  return (
    <section className="relative w-full overflow-x-hidden bg-canvas screen-line-top">
      <div className="px-5 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-display-md text-ink"
          >
            Need a trusted trading partner in Dubai? Get a quote
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
            className="mx-auto mt-4 max-w-3xl text-body-md font-semibold capitalize text-brand-accent sm:text-[17px] sm:leading-7"
          >
            We deliver quality, reliability, and consistency in every shipment.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            className="mt-4 flex flex-col items-center justify-center gap-3 sm:mt-5 sm:flex-row sm:gap-4"
          >
            <Button
              href="/contact"
              variant="accent"
              className="h-12 w-full px-6 sm:w-auto sm:min-w-50"
            >
              Request a Quote
            </Button>
            <Button
              href={WHATSAPP_URL}
              variant="whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 w-full px-6 sm:w-auto sm:min-w-50"
            >
              <IoLogoWhatsapp className="h-4 w-4" />
              WhatsApp Us
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
          className="relative mt-6 overflow-hidden border border-hairline sm:mt-8"
        >
          <div
            className="pointer-events-none absolute inset-0 z-0"
            aria-hidden
            style={{
              background:
                "linear-gradient(to bottom, var(--color-canvas) 0%, var(--color-canvas) 28%, transparent 100%), radial-gradient(ellipse 120% 80% at 50% -5%, color-mix(in srgb, var(--color-brand-accent) 30%, var(--color-canvas)) 0%, var(--color-canvas) 78%)",
              opacity: 0.65,
            }}
          >
            <div
              style={{
                WebkitMaskImage:
                  "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 65%)",
                maskImage:
                  "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0) 65%)",
                backgroundImage:
                  "repeating-conic-gradient(from 0deg at 50% 0%, var(--color-brand-accent) 0deg, var(--color-brand-accent) 2deg, transparent 2deg, transparent 12deg)",
                height: "100%",
                left: "50%",
                opacity: 0.16,
                pointerEvents: "none",
                position: "absolute",
                top: "0",
                transform: "translateX(-50%)",
                width: "200%",
              }}
            />
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-8 p-6 sm:p-8 md:grid-cols-2 md:gap-10 lg:p-10">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <span
                  className="inline-block h-3 w-3 shrink-0 rounded-sm bg-brand-accent"
                  aria-hidden
                />
                <span className="text-caption font-medium uppercase tracking-wider text-muted">
                  GGW International General Trading LLC
                </span>
              </div>
              <p className="text-body-md text-ink sm:text-[17px] sm:leading-7">
                Tell us what you need, the quantity, and your timeline. Our team
                will help you source construction materials, food products,
                industrial supplies, electronics, and chemicals for businesses
                across the UAE and beyond.
              </p>
            </div>

            <div className="flex flex-col justify-center space-y-5">
              <h4 className="text-display-sm text-ink">Why choose GGW?</h4>
              <ul className="space-y-3 sm:space-y-4">
                {bullets.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-body-md text-muted sm:text-[17px] sm:leading-7"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-accent"
                      aria-hidden
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
