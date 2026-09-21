"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/cn";

const lift = {
  whileHover: { y: -4, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" },
  transition: { duration: 0.2 },
};

const reveal = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.4, ease: "easeOut" as const },
};

type CardProps = {
  children: ReactNode;
  className?: string;
  liftOnHover?: boolean;
};

export function FeatureCard({ children, className, liftOnHover = true }: CardProps) {
  return (
    <motion.div
      {...reveal}
      {...(liftOnHover ? lift : {})}
      className={cn(
        "bg-surface-card text-ink rounded-lg p-8",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function ProductMockupCard({
  children,
  className,
  liftOnHover = true,
}: CardProps) {
  return (
    <motion.div
      {...reveal}
      {...(liftOnHover ? lift : {})}
      className={cn(
        "bg-canvas text-ink rounded-lg p-6 border border-hairline",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function TestimonialCard({
  children,
  className,
  liftOnHover = true,
}: CardProps) {
  return (
    <motion.div
      {...reveal}
      {...(liftOnHover ? lift : {})}
      className={cn(
        "bg-surface-card text-ink rounded-lg p-6",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

export function CtaBand({ children, className }: CardProps) {
  return (
    <motion.div
      {...reveal}
      className={cn(
        "bg-surface-card text-ink rounded-lg p-12",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
