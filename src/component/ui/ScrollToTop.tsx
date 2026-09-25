"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

const HEADER_OFFSET = 80;

type LenisScroll = {
  scrollTo: (
    target: number | HTMLElement,
    options?: { offset?: number; immediate?: boolean }
  ) => void;
};

function scrollToRouteTarget(lenis?: LenisScroll | null) {
  const id = decodeURIComponent(window.location.hash.replace(/^#/, ""));
  const target = id ? document.getElementById(id) : null;

  if (target) {
    if (lenis) {
      lenis.scrollTo(target, { immediate: true });
      return;
    }
    const top = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top: Math.max(0, top), left: 0, behavior: "instant" });
    return;
  }

  if (lenis) {
    lenis.scrollTo(0, { immediate: true });
    return;
  }

  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  if (document.documentElement) document.documentElement.scrollTop = 0;
  if (document.body) document.body.scrollTop = 0;
}

/**
 * Scrolls to the top on route changes. Links that include a hash land on
 * that section instead, once it is in the document.
 */
const ScrollToTop = () => {
  const pathname = usePathname();
  const lenis = useLenis();
  const lenisRef = useRef<LenisScroll | null>(lenis ?? null);
  lenisRef.current = lenis ?? null;

  useEffect(() => {
    const scroll = () => scrollToRouteTarget(lenisRef.current);
    scroll();

    const timeouts = [0, 100, 350].map((delay) => setTimeout(scroll, delay));

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [pathname]);

  return null;
};

export default ScrollToTop;
