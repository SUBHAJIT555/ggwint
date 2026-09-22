import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const fontSizes = [
  "display-xl",
  "display-lg",
  "display-md",
  "display-sm",
  "title-lg",
  "title-md",
  "title-sm",
  "body-md",
  "body-sm",
  "caption",
  "button",
  "nav-link",
  "hero",
  "section",
  "copy",
];

const textColors = [
  "primary",
  "primary-active",
  "primary-disabled",
  "ink",
  "body",
  "muted",
  "muted-soft",
  "hairline",
  "hairline-soft",
  "canvas",
  "bg",
  "surface-soft",
  "surface-card",
  "surface-strong",
  "surface-dark",
  "surface-dark-elevated",
  "on-primary",
  "on-dark",
  "on-dark-soft",
  "brand-accent",
  "success",
  "warning",
  "error",
  "badge-orange",
  "badge-pink",
  "badge-violet",
  "badge-emerald",
];

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: fontSizes }],
      "text-color": [{ text: textColors }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
