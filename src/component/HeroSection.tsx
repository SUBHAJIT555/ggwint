"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import Button from "./ui/Button";
import { heroFallbackSrc, heroShowcaseCards } from "../data/heroShowcase";

const COLS = 5;
const COL_WIDTH = 400;
const CARD_WIDTH = 384;
const CARD_GAP = 16;
const REST_SCALE = 1.35;
const TRAVEL_SCALE = 1.12;
const HOLD_MS = 3400;
const HEIGHTS = [301, 346, 316, 369, 331, 283, 361, 311, 339, 291, 270, 354];

type PlacedCard = (typeof heroShowcaseCards)[number] & {
  x: number;
  y: number;
  width: number;
  height: number;
  index: number;
};

const placeCards = (): { cards: PlacedCard[]; width: number; height: number } => {
  const items = Array.from({ length: COLS * 8 }, (_, index) => ({
    ...heroShowcaseCards[index % heroShowcaseCards.length],
    index,
  }));
  const colY = Array.from({ length: COLS }, () => 0);
  const cards = items.map((item, index) => {
    const col = index % COLS;
    const height = HEIGHTS[index % HEIGHTS.length];
    const x = col * COL_WIDTH;
    const y = colY[col];
    colY[col] += height + CARD_GAP;
    return { ...item, id: `${item.id}-${index}`, x, y, width: CARD_WIDTH, height, index };
  });

  return {
    cards,
    width: COLS * COL_WIDTH - (COL_WIDTH - CARD_WIDTH),
    height: Math.max(...colY),
  };
};

const HeroImage = ({
  src,
  alt,
  className,
  style,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
}) => {
  const [current, setCurrent] = useState(src);

  return (
    <img
      src={current}
      alt={alt}
      className={className}
      style={style}
      loading="lazy"
      onError={() => {
        if (current !== heroFallbackSrc) setCurrent(heroFallbackSrc);
      }}
    />
  );
};

const HeroCardWall = () => {
  const wallRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const focusedRef = useRef(0);
  const scaleTargetRef = useRef(REST_SCALE);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0, scale: REST_SCALE });
  const [focused, setFocused] = useState(0);
  const layout = useMemo(() => placeCards(), []);

  const tourIndexes = useMemo(() => {
    const inner = layout.cards
      .map((_, index) => index)
      .filter((index) => {
        const col = index % COLS;
        return col >= 1 && col <= 3;
      });
    return inner.filter((_, step) => step % 2 === 0).slice(0, 10);
  }, [layout.cards]);

  useEffect(() => {
    const wall = wallRef.current;
    const viewport = viewportRef.current;
    if (!wall || !viewport) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const frameCard = (index: number, scale: number) => {
      const card = layout.cards[index];
      if (!card) return;
      // Park the focused card at the start of the solid mask (~75% from the right)
      // so its left neighbors ghost under the copy instead of leaving a white gap.
      const vx = viewport.clientWidth * 0.22;
      const vy = viewport.clientHeight * 0.16;
      pos.current.tx = vx - card.x * scale;
      pos.current.ty = vy - card.y * scale;
      scaleTargetRef.current = scale;
    };

    const startIndex = tourIndexes[0] ?? 0;
    focusedRef.current = startIndex;
    frameCard(startIndex, prefersReduced ? 1.08 : REST_SCALE);
    pos.current.x = pos.current.tx;
    pos.current.y = pos.current.ty;
    wall.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) scale(${pos.current.scale})`;

    if (prefersReduced) return;

    const tick = () => {
      pos.current.scale += (scaleTargetRef.current - pos.current.scale) / 14;
      pos.current.x += (pos.current.tx - pos.current.x) / 18;
      pos.current.y += (pos.current.ty - pos.current.y) / 18;
      wall.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) scale(${pos.current.scale})`;
      frameRef.current = requestAnimationFrame(tick);
    };

    let step = 0;
    const cycle = () => {
      step = (step + 1) % tourIndexes.length;
      const next = tourIndexes[step];
      focusedRef.current = next;
      setFocused(next);
      frameCard(next, TRAVEL_SCALE);
      window.setTimeout(() => {
        if (focusedRef.current === next) frameCard(next, REST_SCALE);
      }, 700);
    };

    const onResize = () => frameCard(focusedRef.current, REST_SCALE);

    frameRef.current = requestAnimationFrame(tick);
    const interval = window.setInterval(cycle, HOLD_MS);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.clearInterval(interval);
      window.removeEventListener("resize", onResize);
    };
  }, [layout.cards, tourIndexes]);

  return (
    <div
      ref={viewportRef}
      data-hero-wall="true"
      className="hero-card-wall relative h-80 w-full overflow-hidden sm:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:z-0 lg:h-auto lg:w-[58%] xl:w-[60%]"
    >
      <div
        ref={wallRef}
        className="absolute top-0 left-0 origin-top-left transform-gpu"
        style={{ width: layout.width, height: layout.height }}
      >
        {layout.cards.map((card) => {
          const isFocused = card.index === focused;
          return (
            <Link
              key={card.id}
              href={card.href}
              className="hero-card-chrome absolute flex flex-col gap-1.5 overflow-hidden rounded-xl p-1.5 transition-opacity duration-500"
              style={{
                left: card.x,
                top: card.y,
                width: card.width,
                height: card.height,
                opacity: isFocused ? 1 : 0.55,
              }}
            >
              <span className="flex shrink-0 items-center px-1 pt-0.5 font-mono text-[9px] text-neutral-500">
                {card.title}
              </span>
              <span className="hero-card-screen relative min-h-0 flex-1 overflow-hidden rounded-lg">
                <HeroImage
                  src={card.src}
                  alt={card.title}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const HeroSection = () => {
  const previewImages = heroShowcaseCards.slice(0, 5);

  return (
    <section className="relative w-full min-h-[calc(100svh-4rem)] overflow-hidden bg-canvas screen-line-bottom">
      <div className="relative z-10 flex w-full flex-col items-center lg:min-h-[calc(100svh-4rem)] lg:flex-row">
        <div className="relative z-20 flex w-full flex-col items-start justify-center px-4 py-10 sm:px-6 lg:min-h-[calc(100svh-4rem)] lg:w-[50%] lg:py-16 lg:pl-[max(1.25rem,calc((100vw-1200px)/2-1.25rem))] xl:w-[48%]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="relative mb-4 flex items-center"
          >
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 rounded-full bg-neutral-100 py-1 pr-4 pl-2"
            >
              <span className="relative h-[18px] w-6">
                <span className="absolute inset-0 rounded-[4px] bg-linear-to-b from-amber-400 to-amber-500" />
                {previewImages.map((image, index) => (
                  <HeroImage
                    key={image.id}
                    src={image.src}
                    alt=""
                    className="hero-preview-card absolute top-0.5 left-1/2 h-3.5 w-5 origin-bottom overflow-hidden rounded-[3px] object-cover ring-1 ring-black/10"
                    style={{
                      animation: "hero-preview-flip 11s linear infinite",
                      animationDelay: `${index * 2.2}s`,
                    }}
                  />
                ))}
              </span>
              <span className="text-[12px] font-medium text-ink">Dubai · UAE</span>
              <span className="text-[12px] text-muted">ISO 9001:2015</span>
              <FiArrowRight className="h-3 w-3 text-muted transition-transform group-hover:translate-x-0.5" />
            </Link>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="max-w-[20ch] text-[34px] font-bold leading-[1.08] tracking-tight text-ink sm:text-[40px] lg:max-w-[22ch] lg:text-[44px] lg:leading-[1.06] xl:max-w-[24ch] xl:text-5xl xl:leading-[1.05]"
          >
            GGW INTERNATIONAL GENERAL TRADING LLC
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-5 max-w-xl text-[15px] leading-7 text-body lg:max-w-lg lg:text-body-md"
          >
            Your Gateway to Global Trade – Bridging markets with excellence,
            integrity, and innovation from the heart of Dubai
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <Button href="/products" variant="accent" className="h-11 rounded-lg px-5">
              Explore products
            </Button>
            <Button href="/contact" variant="primary" className="h-11 rounded-lg px-5">
              Get a quote
            </Button>
          </motion.div>
        </div>

        <HeroCardWall />
      </div>
    </section>
  );
};

export default HeroSection;
