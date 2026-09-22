"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiCheck,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiX,
} from "react-icons/fi";
import { cn } from "../../lib/cn";
import { getCategoryIcon } from "../../data/categoryIcons";

export type ProductFilterOption = {
  id: string;
  label: string;
  count: number;
};

type ProductFilterProps = {
  options: ProductFilterOption[];
  value: string;
  resultCount: number;
  onChange: (id: string) => void;
  label?: string;
};

const HEADER_OFFSET = 64;

function FilterChip({
  id,
  active,
  label,
  count,
  onClick,
  compact,
}: {
  id: string;
  active: boolean;
  label: string;
  count: number;
  onClick: () => void;
  compact?: boolean;
}) {
  const Icon = getCategoryIcon(id);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex shrink-0 snap-start items-center rounded-pill text-sm font-medium transition-colors",
        compact ? "gap-1.5 px-2.5 py-1.5" : "gap-2 px-3.5 py-2",
        active
          ? "bg-brand-accent text-on-primary"
          : "border border-dashed border-hairline bg-canvas text-ink hover:border-brand-accent/50 hover:text-brand-accent"
      )}
    >
      <Icon
        className={cn(
          "shrink-0",
          compact ? "size-3.5" : "size-4",
          active ? "text-on-primary" : "text-brand-accent"
        )}
      />
      <span>{label}</span>
      <span
        className={cn(
          "text-[11px] tabular-nums",
          active ? "text-on-primary/75" : "text-muted"
        )}
      >
        {count}
      </span>
    </button>
  );
}

function CategoryScroller({
  options,
  value,
  onChange,
  compact,
}: {
  options: ProductFilterOption[];
  value: string;
  onChange: (id: string) => void;
  compact?: boolean;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const updateOverflow = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateOverflow();
    el.addEventListener("scroll", updateOverflow, { passive: true });
    window.addEventListener("resize", updateOverflow);
    return () => {
      el.removeEventListener("scroll", updateOverflow);
      window.removeEventListener("resize", updateOverflow);
    };
  }, [options]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const active = el.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!active) return;
    const left =
      active.offsetLeft - el.clientWidth / 2 + active.offsetWidth / 2;
    el.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [value]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      if (el.scrollWidth <= el.clientWidth) return;
      event.preventDefault();
      el.scrollBy({ left: event.deltaY, behavior: "smooth" });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const slide = (direction: -1 | 1) => {
    scrollerRef.current?.scrollBy({
      left: direction * 260,
      behavior: "smooth",
    });
  };

  const maskImage = `linear-gradient(to right, ${
    canLeft ? "transparent 0, black 1.5rem" : "black 0"
  }, ${canRight ? "black calc(100% - 1.5rem), transparent 100%" : "black 100%"})`;

  return (
    <div className="flex min-w-0 flex-1 items-center">
      <button
        type="button"
        onClick={() => slide(-1)}
        disabled={!canLeft}
        aria-label="Previous categories"
        className={cn(
          "inline-flex size-8 shrink-0 items-center justify-center rounded-full text-muted transition-opacity duration-200",
          canLeft
            ? "opacity-100 hover:bg-surface-soft hover:text-ink"
            : "pointer-events-none opacity-0"
        )}
      >
        <FiChevronLeft className="size-4" />
      </button>

      <div
        ref={scrollerRef}
        className="flex min-w-0 flex-1 snap-x snap-proximity gap-1.5 overflow-x-auto scroll-smooth scrollbar-hide [touch-action:pan-x]"
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
        }}
      >
        {options.map((option) => (
          <FilterChip
            key={option.id}
            id={option.id}
            active={option.id === value}
            label={option.label}
            count={option.count}
            compact={compact}
            onClick={() => onChange(option.id)}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => slide(1)}
        disabled={!canRight}
        aria-label="Next categories"
        className={cn(
          "inline-flex size-8 shrink-0 items-center justify-center rounded-full text-muted transition-opacity duration-200",
          canRight
            ? "opacity-100 hover:bg-surface-soft hover:text-ink"
            : "pointer-events-none opacity-0"
        )}
      >
        <FiChevronRight className="size-4" />
      </button>
    </div>
  );
}

function FilterList({
  options,
  value,
  onChange,
}: {
  options: ProductFilterOption[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {options.map((option) => {
        const active = option.id === value;
        const Icon = getCategoryIcon(option.id);
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={cn(
              "flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-3 text-left transition-colors",
              active
                ? "bg-brand-accent text-on-primary"
                : "bg-canvas text-ink hover:bg-surface-soft"
            )}
          >
            <span className="inline-flex min-w-0 items-center gap-2.5">
              <Icon
                className={cn(
                  "size-4 shrink-0",
                  active ? "text-on-primary" : "text-brand-accent"
                )}
              />
              <span className="text-sm font-medium">{option.label}</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <span
                className={cn(
                  "text-caption tabular-nums",
                  active ? "text-on-primary/75" : "text-muted"
                )}
              >
                {option.count}
              </span>
              {active ? <FiCheck className="size-4" /> : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function FilterPanel({
  options,
  value,
  resultCount,
  onChange,
  onOpen,
  label,
  selectedLabel,
}: {
  options: ProductFilterOption[];
  value: string;
  resultCount: number;
  onChange: (id: string) => void;
  onOpen: () => void;
  label: string;
  selectedLabel: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-hairline bg-surface-card p-3 sm:p-4">
      <div
        className={cn(
          "flex items-center justify-between gap-3",
          options.length > 1 && "mb-3"
        )}
      >
        <p className="text-caption uppercase tracking-wide text-muted">{label}</p>
        <p className="text-caption tabular-nums text-muted">
          {resultCount} {resultCount === 1 ? "product" : "products"}
        </p>
      </div>

      {options.length > 1 ? (
        <div className="hidden md:block">
          <CategoryScroller
            options={options}
            value={value}
            onChange={onChange}
          />
        </div>
      ) : null}

      {options.length > 1 ? (
        <button
          type="button"
          onClick={onOpen}
          className="flex w-full items-center justify-between gap-3 rounded-xl border border-dashed border-hairline bg-canvas px-3.5 py-3 text-left md:hidden"
        >
          <span>
            <span className="block text-caption text-muted">
              Currently showing
            </span>
            <span className="mt-0.5 block text-sm font-semibold text-ink">
              {selectedLabel}
            </span>
          </span>
          <FiChevronDown className="size-5 shrink-0 text-muted" />
        </button>
      ) : (
        <p className="mt-1 text-sm font-semibold text-ink md:hidden">
          {selectedLabel}
        </p>
      )}
    </div>
  );
}

function StickyFilterBar({
  options,
  value,
  onChange,
  selectedLabel,
}: {
  options: ProductFilterOption[];
  value: string;
  onChange: (id: string) => void;
  selectedLabel: string;
}) {
  return (
    <div className="mx-auto max-w-content md:border-x md:border-dashed md:border-hairline">
      <div className="flex h-16 items-center rounded-b-2xl border border-t-0 border-dashed border-hairline bg-canvas/95 px-2 shadow-sm backdrop-blur-md sm:px-3 md:rounded-none md:border-0 md:px-4 md:shadow-none lg:px-8">
        {options.length > 1 ? (
          <CategoryScroller
            options={options}
            value={value}
            onChange={onChange}
            compact
          />
        ) : (
          <p className="truncate px-2 text-sm font-semibold text-ink">
            {selectedLabel}
          </p>
        )}
      </div>
    </div>
  );
}

export default function ProductFilter({
  options,
  value,
  resultCount,
  onChange,
  label = "Filter by category",
}: ProductFilterProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [stuck, setStuck] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.id === value) ?? options[0];
  const selectedLabel = selected?.label ?? "All";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const el = anchorRef.current;
    if (!el) return;

    const update = () => {
      const top = el.getBoundingClientRect().top;
      setStuck((prev) =>
        prev ? top <= HEADER_OFFSET + 16 : top <= HEADER_OFFSET
      );
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY;
    const { body, documentElement } = document;
    const previous = {
      htmlOverflow: documentElement.style.overflow,
      bodyOverflow: body.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
    };

    documentElement.style.overflow = "hidden";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    const onTouchMove = (event: TouchEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-filter-list]")) return;
      event.preventDefault();
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("touchmove", onTouchMove);
      documentElement.style.overflow = previous.htmlOverflow;
      body.style.overflow = previous.bodyOverflow;
      body.style.position = previous.bodyPosition;
      body.style.top = previous.bodyTop;
      body.style.left = previous.bodyLeft;
      body.style.right = previous.bodyRight;
      body.style.width = previous.bodyWidth;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  const choose = (id: string) => {
    setOpen(false);
    onChange(id);
  };

  const panelProps = {
    options,
    value,
    resultCount,
    onChange,
    onOpen: () => setOpen(true),
    label,
    selectedLabel,
  };

  return (
    <>
      <div ref={anchorRef}>
        <FilterPanel {...panelProps} />
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {stuck ? (
              <motion.div
                key="sticky-filter"
                initial={{ y: -24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -24, opacity: 0 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-x-0 top-16 z-40"
              >
                <StickyFilterBar
                  options={options}
                  value={value}
                  onChange={onChange}
                  selectedLabel={selectedLabel}
                />
              </motion.div>
            ) : null}
          </AnimatePresence>,
          document.body
        )}

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open ? (
              <motion.div
                key="product-filter-overlay"
                className="md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div
                  className="fixed inset-0 bg-ink/40 backdrop-blur-sm"
                  style={{ zIndex: 200 }}
                  onClick={() => setOpen(false)}
                />
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  transition={{ type: "spring", damping: 28, stiffness: 280 }}
                  className="fixed inset-x-0 bottom-0 flex max-h-[80dvh] flex-col overflow-hidden rounded-t-3xl border border-dashed border-hairline bg-canvas p-1"
                  style={{ zIndex: 201 }}
                >
                  <div className="flex shrink-0 items-center justify-between px-4 py-3">
                    <p className="text-caption uppercase tracking-wide text-muted">
                      {label}
                    </p>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="inline-flex size-8 items-center justify-center rounded-md border border-dashed border-hairline text-body"
                      aria-label="Close filters"
                    >
                      <FiX className="size-4" />
                    </button>
                  </div>
                  <div
                    data-filter-list
                    className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] [-webkit-overflow-scrolling:touch]"
                    style={{ maxHeight: "calc(80dvh - 3.75rem)" }}
                  >
                    <FilterList
                      options={options}
                      value={value}
                      onChange={choose}
                    />
                  </div>
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
