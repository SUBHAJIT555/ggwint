"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * ScrollToTop component that scrolls to the top of the page
 * whenever the route changes. Handles edge cases like lazy-loaded
 * components and delayed content rendering.
 */
const ScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top immediately when route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Use instant for immediate scroll
    });

    // Also scroll the document element (for better browser compatibility)
    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
    }

    // Handle cases where content is still loading or animations are running
    // Try multiple times to ensure scroll happens even with lazy-loaded components
    const timeouts = [
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        if (document.documentElement) document.documentElement.scrollTop = 0;
        if (document.body) document.body.scrollTop = 0;
      }, 0),
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        if (document.documentElement) document.documentElement.scrollTop = 0;
        if (document.body) document.body.scrollTop = 0;
      }, 100),
      setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        if (document.documentElement) document.documentElement.scrollTop = 0;
        if (document.body) document.body.scrollTop = 0;
      }, 300),
    ];

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [pathname]);

  return null;
};

export default ScrollToTop;
