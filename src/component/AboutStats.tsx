"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../lib/cn";

const STATS = [
  {
    value: "5,700+",
    label: "Global transactions done",
    size: "lg",
    offset: "md:translate-y-2",
    z: "z-10",
    float: { amplitude: 5, duration: 4.4, delay: 0 },
  },
  {
    value: "50+",
    label: "Global trading partners",
    size: "sm",
    offset: "md:translate-y-10",
    z: "z-30",
    float: { amplitude: 7, duration: 5.2, delay: 0.35 },
  },
  {
    value: "1,500+",
    label: "Products traded",
    size: "md",
    offset: "md:-translate-y-4",
    z: "z-20",
    float: { amplitude: 4, duration: 3.8, delay: 0.7 },
  },
  {
    value: "2,000+",
    label: "Happy customers",
    size: "md",
    offset: "md:translate-y-4",
    z: "z-40",
    accent: true,
    float: { amplitude: 6, duration: 4.8, delay: 0.15 },
  },
] as const;

const SIZE_CLASS = {
  sm: "h-36 w-36 sm:h-40 sm:w-40",
  md: "h-40 w-40 sm:h-44 sm:w-44 md:h-48 md:w-48",
  lg: "h-44 w-44 sm:h-52 sm:w-52 md:h-56 md:w-56",
} as const;

const easeOutSoft = [0.22, 1, 0.36, 1] as const;

function StatCircle({
  value,
  label,
  size,
  offset,
  z,
  accent,
  animationNum,
  float,
}: {
  value: string;
  label: string;
  size: keyof typeof SIZE_CLASS;
  offset: string;
  z: string;
  accent?: boolean;
  animationNum: number;
  float: { amplitude: number; duration: number; delay: number };
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: 0.5,
        ease: easeOutSoft,
        delay: animationNum * 0.06,
      }}
      className={cn(
        "relative shrink-0",
        SIZE_CLASS[size],
        offset,
        z,
        "md:-ml-6 lg:-ml-8",
        animationNum === 1 && "md:ml-0",
      )}
    >
      <motion.div
        className="h-full w-full will-change-transform"
        animate={
          reduceMotion
            ? undefined
            : {
                y: [0, -float.amplitude, 0],
              }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                duration: float.duration,
                delay: float.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
      >
        <motion.div
          className={cn(
            "flex h-full w-full flex-col items-center justify-center rounded-full",
            "border border-hairline bg-canvas",
            "shadow-[0_8px_30px_-12px_rgba(15,23,42,0.12)]",
            "cursor-default",
          )}
          whileHover={
            reduceMotion
              ? undefined
              : {
                  y: -6,
                  scale: 1.04,
                  boxShadow: "0 18px 40px -16px rgba(15, 23, 42, 0.22)",
                }
          }
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 22,
            mass: 0.7,
          }}
        >
          <motion.p
            className={cn(
              "font-semibold tracking-tight",
              size === "lg"
                ? "text-display-sm sm:text-display-md"
                : "text-title-lg sm:text-display-sm",
              accent
                ? "bg-[linear-gradient(135deg,#5B8AFF_0%,#2667FF_100%)] bg-clip-text text-transparent"
                : "text-ink",
            )}
            initial={reduceMotion ? false : { opacity: 0.55, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.55, ease: easeOutSoft, delay: 0.08 }}
          >
            {value}
          </motion.p>
          <motion.p
            className="mt-1 max-w-32 px-3 text-center text-caption leading-snug text-muted"
            initial={reduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.45, ease: easeOutSoft, delay: 0.18 }}
          >
            {label}
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

const AboutStats = () => {
  return (
    <section className="relative bg-canvas py-section screen-line-top">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 70% at 50% 50%, black 25%, transparent 78%)",
          maskImage:
            "radial-gradient(ellipse 75% 70% at 50% 50%, black 25%, transparent 78%)",
          backgroundImage:
            "radial-gradient(circle at 1px 1px, color-mix(in srgb, var(--color-brand-accent) 22%, transparent) 1px, transparent 0)",
          backgroundSize: "14px 14px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-pretty text-section text-ink">
            A vital link between markets worldwide.
          </h2>
          <p className="mt-4 text-copy text-muted">
            5,700+ global transactions, 50+ trading partners, 1,500+ products
            traded, and 2,000+ happy customers — from our Dubai hub since 2015.
          </p>
        </motion.div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-0 md:mt-16 md:flex-nowrap md:justify-center md:py-4">
          {STATS.map((stat, index) => (
            <StatCircle
              key={stat.label}
              value={stat.value}
              label={stat.label}
              size={stat.size}
              offset={stat.offset}
              z={stat.z}
              accent={"accent" in stat ? stat.accent : false}
              animationNum={index + 1}
              float={stat.float}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStats;
