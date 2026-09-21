"use client";

import {
  Children,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";

import { cn } from "../../lib/cn";

const DEFAULT_COLUMN_COUNT = 4;
const CYCLE_INTERVAL = 2000;
const STAGGER_DELAY = 100;
const EASE_OUT_QUAD = [0.25, 0.46, 0.45, 0.94] as const;

type WaveDirection = "ltr" | "rtl";

export type LogosCarouselProps = {
  children: ReactNode;
  columnCount?: number;
  direction?: WaveDirection;
  className?: string;
  compact?: boolean;
};

export function LogosCarousel({
  children,
  columnCount = DEFAULT_COLUMN_COUNT,
  direction = "ltr",
  className,
  compact = false,
}: LogosCarouselProps) {
  const columns = useMemo(
    () => distributeLogos(Children.toArray(children), columnCount),
    [children, columnCount],
  );

  const reduceMotion = useReducedMotion() ?? false;
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    margin: "200px 0px 200px 0px",
    amount: 0.01,
  });
  const shouldPlay = !reduceMotion && isInView;

  const [activeIndices, setActiveIndices] = useState<number[]>(() =>
    columns.map(() => 0),
  );

  const columnsRef = useRef(columns);
  useEffect(() => {
    columnsRef.current = columns;
  });

  useEffect(() => {
    if (!shouldPlay) return;

    const advanceWave = () => {
      setActiveIndices((prev) =>
        columnsRef.current.map(
          (column, columnIndex) =>
            ((prev[columnIndex] ?? 0) + 1) % column.length,
        ),
      );
    };

    const kickoffId = window.setTimeout(advanceWave, 600);
    const beatId = window.setInterval(advanceWave, CYCLE_INTERVAL);

    return () => {
      window.clearTimeout(kickoffId);
      window.clearInterval(beatId);
    };
  }, [shouldPlay]);

  return (
    <div
      ref={containerRef}
      data-slot="logos-carousel"
      className={cn(
        "grid",
        compact &&
          "w-full max-w-80 grid-cols-2 gap-x-6 gap-y-5 sm:max-w-none sm:w-fit sm:grid-cols-4 sm:gap-8 sm:gap-y-0",
        className,
      )}
      style={
        compact
          ? undefined
          : {
              gridTemplateColumns: `repeat(var(--column-count,${columns.length}), minmax(0, 1fr))`,
            }
      }
    >
      {columns.map((columnLogos, columnIndex) => {
        const waveIndex =
          direction === "rtl" ? columns.length - 1 - columnIndex : columnIndex;

        return (
          <LogoColumn
            key={columnIndex}
            logos={columnLogos}
            columnIndex={columnIndex}
            waveIndex={waveIndex}
            activeIndex={(activeIndices[columnIndex] ?? 0) % columnLogos.length}
            reduceMotion={reduceMotion}
            compact={compact}
          />
        );
      })}
    </div>
  );
}

type LogoColumnProps = {
  logos: ReactNode[];
  columnIndex: number;
  waveIndex: number;
  activeIndex: number;
  reduceMotion: boolean;
  compact: boolean;
};

const LogoColumn = memo(function LogoColumn({
  logos,
  columnIndex,
  waveIndex,
  activeIndex,
  reduceMotion,
  compact,
}: LogoColumnProps) {
  const swapDelay = reduceMotion ? 0 : waveIndex * (STAGGER_DELAY / 1000);

  return (
    <motion.div
      data-slot="logos-carousel-column"
      className={
        compact
          ? "relative h-8 w-full min-w-0 overflow-hidden sm:min-w-32 sm:w-auto"
          : "relative aspect-2/1 min-h-18 overflow-hidden px-2 sm:min-h-24 sm:px-4 md:min-h-28"
      }
      initial={
        reduceMotion ? false : { opacity: 0, y: "60%" }
      }
      animate={{ opacity: 1, y: "0%" }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              ease: EASE_OUT_QUAD,
              duration: 0.5,
              delay: swapDelay,
            }
      }
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={`${columnIndex}-${activeIndex}`}
          data-slot="logos-carousel-logo"
          className={
            compact
              ? "absolute inset-0 flex items-center justify-center sm:justify-start"
              : "absolute inset-0 flex items-center justify-center px-2 sm:px-4"
          }
          initial={
            reduceMotion
              ? false
              : {
                  y: "24%",
                  opacity: 0,
                }
          }
          animate={{
            y: "0%",
            opacity: 1,
            transition: reduceMotion
              ? { duration: 0 }
              : { ease: EASE_OUT_QUAD, duration: 0.4, delay: swapDelay },
          }}
          exit={
            reduceMotion
              ? undefined
              : {
                  y: "-24%",
                  opacity: 0,
                  transition: {
                    ease: EASE_OUT_QUAD,
                    duration: 0.4,
                    delay: swapDelay,
                  },
                }
          }
        >
          {logos[activeIndex]}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
});

function distributeLogos(
  logos: ReactNode[],
  columnCount: number,
): ReactNode[][] {
  const effectiveCount = Math.min(columnCount, logos.length);
  const columns: ReactNode[][] = Array.from(
    { length: effectiveCount },
    () => [],
  );

  logos.forEach((logo, index) => {
    columns[index % effectiveCount].push(logo);
  });

  return columns;
}
