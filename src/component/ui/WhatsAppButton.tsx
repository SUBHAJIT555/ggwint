"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { cn } from "../../lib/cn";
import { SITE_CONTACT } from "../../data/contact";

const WHATSAPP_URL = SITE_CONTACT.whatsappHref;

const WHATSAPP_GRADIENT = `
  radial-gradient(ellipse 94% 78% at 10% 11%, rgba(120, 200, 160, 0.34), transparent 72%),
  radial-gradient(ellipse 90% 75% at 80% 26%, rgba(140, 220, 175, 0.36), transparent 74%),
  radial-gradient(ellipse 87% 72% at 18% 84%, rgba(100, 190, 150, 0.30), transparent 76%),
  radial-gradient(ellipse 91% 76% at 90% 89%, rgba(130, 210, 170, 0.34), transparent 74%),
  radial-gradient(ellipse 84% 69% at 50% 50%, rgba(150, 225, 185, 0.26), transparent 78%),
  linear-gradient(168deg, #c5e8d4 0%, #b4dec6 50%, #bee4ce 100%)
`;

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      setIsVisible(scrollY > 120);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isVisible ? (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-1/2 right-0 z-50 hidden -translate-y-1/2 md:block"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact on WhatsApp"
              className={cn(
                "group relative flex flex-col items-center gap-3 overflow-hidden rounded-l-2xl border border-r-0 border-[#25D366]/25 px-3 py-5",
                "shadow-[-6px_0_24px_-10px_rgba(37,211,102,0.28)]",
                "transition-[border-color,transform] duration-200",
                "hover:border-[#25D366]/45 active:scale-[0.98]"
              )}
            >
              <div
                className="absolute inset-0 z-0"
                style={{ background: WHATSAPP_GRADIENT }}
                aria-hidden
              />
              <span
                className={cn(
                  "relative z-10 flex size-8 items-center justify-center rounded-full",
                  "bg-canvas text-[#25D366]",
                  "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9)]",
                  "transition-transform duration-200 group-hover:scale-105"
                )}
              >
                <IconBrandWhatsapp className="size-[18px]" stroke={1.75} />
              </span>
              <span
                className="relative z-10 text-[11px] font-bold uppercase tracking-[0.2em] text-ink"
                style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
              >
                WhatsApp
              </span>
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default WhatsAppButton;
