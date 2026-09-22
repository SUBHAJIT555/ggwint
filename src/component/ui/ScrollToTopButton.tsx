"use client";

import { useEffect, useRef, useState } from "react";
import { FiArrowUp } from "react-icons/fi";
import { cn } from "../../lib/cn";

const PROGRESS_RADIUS = 46;
const PROGRESS_CIRCUMFERENCE = 2 * Math.PI * PROGRESS_RADIUS;

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const syncMobile = () => setIsMobile(media.matches);
    syncMobile();
    media.addEventListener("change", syncMobile);

    lastScrollY.current = window.scrollY || document.documentElement.scrollTop;

    const update = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const maxScroll =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const nextVisible = scrollY > 120;
      const nextProgress =
        maxScroll > 0 ? Math.min(100, (scrollY / maxScroll) * 100) : 0;

      if (media.matches) {
        const delta = scrollY - lastScrollY.current;
        if (Math.abs(delta) > 4) {
          setIsScrollingDown(delta > 0);
          lastScrollY.current = scrollY;
        }
      } else {
        setIsScrollingDown(false);
        lastScrollY.current = scrollY;
      }

      setIsVisible((prev) => (prev === nextVisible ? prev : nextVisible));
      setProgress((prev) =>
        Math.abs(prev - nextProgress) < 0.25 ? prev : nextProgress
      );
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      media.removeEventListener("change", syncMobile);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const strokeDashoffset =
    PROGRESS_CIRCUMFERENCE - (progress / 100) * PROGRESS_CIRCUMFERENCE;

  const dimWhileScrollingDown = isMobile && isVisible && isScrollingDown;

  return (
    <div
      className={cn(
        "scroll-to-top-fab fixed z-51 right-4 sm:right-6 md:right-8",
        "bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))]",
        "md:bottom-8",
        "transition-opacity duration-300 ease-out",
        !isVisible && "pointer-events-none opacity-0",
        isVisible && dimWhileScrollingDown && "pointer-events-auto opacity-10",
        isVisible && !dimWhileScrollingDown && "pointer-events-auto opacity-100"
      )}
    >
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label={`Scroll to top — ${Math.round(progress)}% of page`}
        suppressHydrationWarning
        className="group relative flex size-11 cursor-pointer items-center justify-center rounded-full md:size-12 lg:size-14"
      >
        <svg
          aria-hidden
          className="absolute inset-0 size-full -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r={PROGRESS_RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-hairline"
          />
          <circle
            cx="50"
            cy="50"
            r={PROGRESS_RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={PROGRESS_CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            className="text-brand-accent transition-[stroke-dashoffset] duration-150"
          />
        </svg>
        <span
          className={cn(
            "relative flex size-8 items-center justify-center rounded-full md:size-9 lg:size-10",
            "border border-dashed border-hairline bg-canvas text-ink",
            "shadow-[0_4px_16px_-6px_rgba(0,0,0,0.12)]",
            "transition-colors duration-200",
            "group-hover:border-brand-accent/40 group-hover:bg-surface-soft group-hover:text-brand-accent"
          )}
        >
          <FiArrowUp className="size-4 lg:size-5" />
        </span>
      </button>
    </div>
  );
};

export default ScrollToTopButton;
