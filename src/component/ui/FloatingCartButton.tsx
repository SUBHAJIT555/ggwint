"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { useQuote } from "../../hooks/useQuote";

const FloatingCartButton = () => {
  const { items } = useQuote();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{
            opacity: 1,
            y: 0,
            x: [0, -3, 3, -3, 3, 0],
          }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            opacity: { duration: 0.25 },
            y: { duration: 0.25 },
            x: {
              duration: 0.6,
              delay: 0.5,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut",
            },
          }}
          className="fixed top-15 right-2 sm:top-16 sm:right-6 z-50"
        >
          <Link
            href="/quote"
            className="relative flex items-center gap-2 bg-primary text-on-primary px-3 py-2 sm:px-4 sm:py-3 rounded-md shadow-card"
            aria-label="Go to quote"
          >
            <FaShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="text-xs sm:text-sm font-poppins">Quote</span>
            <span className="absolute -top-2 -right-2 h-5 min-w-5 sm:h-6 sm:min-w-6 px-1 rounded-full bg-red-500 text-white text-xs sm:text-sm font-semibold flex items-center justify-center font-poppins">
              {count}
            </span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingCartButton;
