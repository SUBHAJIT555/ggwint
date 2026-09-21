"use client";

import { useState } from "react";
import { cn } from "../../lib/cn";
import { SITE_CONTACT } from "../../data/contact";
import dottedMap from "../../data/dottedMap.json";

const { width, height, pin, points } = dottedMap;
const pinLeft = `${(pin.x / width) * 100}%`;
const pinTop = `${(pin.y / height) * 100}%`;

export default function ContactWorldMap({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative mx-auto w-full max-w-4xl", className)}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full overflow-visible"
        aria-hidden
      >
        <g className="fill-ink/20">
          {points.map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={0.22} />
          ))}
        </g>
      </svg>

      <div
        className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
        style={{ left: pinLeft, top: pinTop }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        <a
          href={SITE_CONTACT.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${SITE_CONTACT.name} — ${SITE_CONTACT.address}. Open in Google Maps`}
          className="relative flex size-10 items-center justify-center sm:size-12"
        >
          <span className="absolute inset-0 animate-ping rounded-full border border-brand-accent/50 opacity-40" />
          <span className="absolute size-7 rounded-full border border-brand-accent/40 sm:size-8" />
          <span className="absolute size-4 rounded-full border border-brand-accent/60 sm:size-5" />
          <span className="relative size-2.5 rounded-full bg-brand-accent shadow-sm sm:size-3" />
        </a>

        <div
          role="tooltip"
          className={cn(
            "absolute bottom-full left-1/2 z-20 mb-3 w-56 -translate-x-1/2",
            "rounded-xl border border-dashed border-hairline bg-canvas p-3 text-left shadow-lift",
            "transition-all duration-200",
            open
              ? "pointer-events-auto visible translate-y-0 opacity-100"
              : "pointer-events-none invisible translate-y-1 opacity-0"
          )}
        >
          <p className="text-sm font-semibold text-ink">{SITE_CONTACT.name}</p>
          <p className="mt-0.5 text-xs leading-relaxed text-muted">
            {SITE_CONTACT.address}
          </p>
          <p className="mt-1.5 text-[11px] font-medium text-brand-accent">
            Open in Google Maps
          </p>
        </div>
      </div>
    </div>
  );
}
