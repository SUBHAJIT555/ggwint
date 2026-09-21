"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUp, FiX } from "react-icons/fi";
import { IoLogoWhatsapp } from "react-icons/io";

// Optional Lenis type (if you add Lenis later)
type LenisInstance = {
  scroll: number;
  scrollTo: (target: number, options?: { duration?: number }) => void;
  on: (event: string, handler: (e: { scroll: number }) => void) => void;
  off: (event: string, handler: (e: { scroll: number }) => void) => void;
};

const FloatingActionButtons = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isWhatsAppHovered, setIsWhatsAppHovered] = useState(false);
  const [isTooltipManuallyClosed, setIsTooltipManuallyClosed] = useState(false);
  const [hasHoverSupport, setHasHoverSupport] = useState(false);
  const whatsappNumber = "+97142712771";
  const whatsappMessage =
    "Hello! I'm interested in learning more about GGW International's products.";

  // Detect if device supports hover (desktop)
  useEffect(() => {
    const checkHoverSupport = () => {
      if (window.matchMedia("(hover: hover)").matches) {
        setHasHoverSupport(true);
      } else {
        setHasHoverSupport(false);
      }
    };

    checkHoverSupport();
    window.addEventListener("resize", checkHoverSupport);
    return () => window.removeEventListener("resize", checkHoverSupport);
  }, []);

  // Optional: Get Lenis from context if available
  // Uncomment and use if you have LenisContext:
  // const { lenis } = useLenisContext?.() || { lenis: null };
  const lenis: LenisInstance | null = null; // Set to null if not using Lenis

  // Set the scroll event listener
  useEffect(() => {
    // Show button when page is scrolled up to given distance
    const checkVisibility = (scrollPosition: number) => {
      if (scrollPosition > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Lenis scroll handler
    const handleLenisScroll = (e: { scroll: number }) => {
      checkVisibility(e.scroll);
    };

    // Native scroll handler
    const handleNativeScroll = () => {
      checkVisibility(window.scrollY);
    };

    if (lenis !== null) {
      const lenisInstance = lenis as LenisInstance;
      lenisInstance.on("scroll", handleLenisScroll);
      // Initial check
      checkVisibility(lenisInstance.scroll);
      return () => {
        lenisInstance.off("scroll", handleLenisScroll);
      };
    } else {
      window.addEventListener("scroll", handleNativeScroll);
      // Initial check
      handleNativeScroll();
      return () => {
        window.removeEventListener("scroll", handleNativeScroll);
      };
    }
  }, []);

  // Scroll to top smoothly
  const scrollToTop = () => {
    if (lenis !== null) {
      const lenisInstance = lenis as LenisInstance;
      lenisInstance.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${whatsappNumber.replace(
      /[^0-9]/g,
      ""
    )}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-6 right-3 sm:bottom-8 sm:right-8 z-50 flex flex-col gap-3 sm:gap-4">
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, y: 200 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 200 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToTop}
            className="p-2 sm:p-3 rounded-md bg-primary text-on-primary shadow-card cursor-pointer"
            aria-label="Scroll to top"
          >
            <FiArrowUp className="w-4 h-4 sm:w-6 sm:h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* WhatsApp Button with Tooltip */}
      <div
        className="relative"
        onMouseEnter={() => {
          if (hasHoverSupport) {
            setIsWhatsAppHovered(true);
          }
        }}
        onMouseLeave={() => {
          if (hasHoverSupport) {
            setIsWhatsAppHovered(false);
          }
        }}
        onClick={() => {
          // On touch devices, toggle tooltip on click
          if (!hasHoverSupport && !isTooltipManuallyClosed) {
            setIsWhatsAppHovered(true);
          }
        }}
      >
        <motion.button
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          onClick={(e) => {
            // Prevent tooltip toggle when clicking the button itself
            e.stopPropagation();
            handleWhatsAppClick();
          }}
          className="p-2 sm:p-3 rounded-md bg-canvas text-success border border-hairline shadow-card cursor-pointer"
          aria-label="Contact us on WhatsApp"
        >
          <IoLogoWhatsapp className="w-4 h-4 sm:w-6 sm:h-6" />
        </motion.button>

        {/* Tooltip - Only show on desktop hover or mobile click (if not manually closed) */}
        <AnimatePresence>
          {isWhatsAppHovered && !isTooltipManuallyClosed && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute right-full mr-3 top-1/2 -translate-y-1/2 z-30 max-w-[200px] sm:max-w-none"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-zinc-800/95 backdrop-blur-sm text-zinc-200 text-xs sm:text-sm font-poppins px-3 py-2 rounded-md border border-zinc-600/50 shadow-xl whitespace-normal sm:whitespace-nowrap relative">
                <span className="pr-6 sm:pr-0">
                  Connect through WhatsApp for faster response
                </span>
                {/* Close button for mobile/touch devices */}
                {!hasHoverSupport && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsTooltipManuallyClosed(true);
                      setIsWhatsAppHovered(false);
                    }}
                    className="absolute top-1 right-1 sm:hidden p-1 rounded hover:bg-zinc-700/50 transition-colors"
                    aria-label="Close tooltip"
                  >
                    <FiX className="w-3 h-3 text-zinc-400" />
                  </button>
                )}
                {/* Arrow pointing right to button */}
                <div className="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-zinc-800/95"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FloatingActionButtons;
