"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { cn } from "../../lib/cn";

type Variant = "primary" | "secondary" | "accent" | "whatsapp" | "text-link";

const CANDY_BASE = cn(
  "relative inline-flex cursor-pointer items-center justify-center gap-2 select-none",
  "h-10 px-5 text-button font-semibold rounded-md transition-all duration-200",
  "active:scale-[0.98]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/30",
  "disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100"
);

const variantClass: Record<Variant, string> = {
  primary: cn(
    "bg-linear-to-b from-[#3f3f3f] to-[#111111] text-on-primary",
    "shadow-[0px_0px_10px_0px_rgba(255,255,255,0.2)_inset]",
    "hover:shadow-[0px_0px_20px_0px_rgba(255,255,255,0.4)_inset]",
    "ring ring-white/20 ring-inset ring-offset-2 ring-offset-[#111111]",
    "hover:ring-white/40"
  ),
  secondary: cn(
    "bg-linear-to-b from-white to-[#e5e5e5] text-[#111111]",
    "shadow-[0px_0px_10px_0px_rgba(255,255,255,0.9)_inset]",
    "hover:shadow-[0px_0px_16px_0px_rgba(255,255,255,1)_inset]",
    "ring ring-black/10 ring-inset ring-offset-2 ring-offset-white",
    "hover:ring-black/20"
  ),
  accent: cn(
    "bg-linear-to-b from-[#5B8AFF] to-[#2667FF] text-on-primary",
    "shadow-[0px_0px_10px_0px_rgba(255,255,255,0.25)_inset]",
    "hover:shadow-[0px_0px_20px_0px_rgba(255,255,255,0.4)_inset]",
    "ring ring-white/25 ring-inset ring-offset-2 ring-offset-[#2667FF]",
    "hover:ring-white/45"
  ),
  whatsapp: cn(
    "bg-linear-to-b from-[#4ADE80] to-[#16A34A] text-on-primary",
    "shadow-[0px_0px_10px_0px_rgba(255,255,255,0.25)_inset]",
    "hover:shadow-[0px_0px_20px_0px_rgba(255,255,255,0.4)_inset]",
    "ring ring-white/25 ring-inset ring-offset-2 ring-offset-[#16A34A]",
    "hover:ring-white/45"
  ),
  "text-link": "bg-transparent text-ink border-transparent px-0 h-auto shadow-none ring-0",
};

type ButtonProps = {
  variant?: Variant;
  href?: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

export default function Button({
  variant = "primary",
  href,
  children,
  className,
  type = "button",
  disabled,
  onClick,
  target,
  rel,
  ...rest
}: ButtonProps) {
  const classes = cn(CANDY_BASE, variantClass[variant], className);

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          onClick={onClick as never}
          target={target}
          rel={rel}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onClick={onClick as never}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
      suppressHydrationWarning
      {...rest}
    >
      {children}
    </button>
  );
}
