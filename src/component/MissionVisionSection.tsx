"use client";

import { motion } from "framer-motion";
import { cn } from "../lib/cn";

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("size-5 shrink-0", className)}
    aria-hidden
  >
    <path
      opacity="0.28"
      d="M12.0001 21.1501C17.0535 21.1501 21.1501 17.0535 21.1501 12.0001C21.1501 6.94669 17.0535 2.8501 12.0001 2.8501C6.94669 2.8501 2.8501 6.94669 2.8501 12.0001C2.8501 17.0535 6.94669 21.1501 12.0001 21.1501Z"
      fill="currentColor"
    />
    <path
      d="M8.5 12.5124L10.8412 14.851C11.9672 12.8821 13.5256 11.1944 15.3987 9.91536L15.5 9.84619M21.1501 12.0001C21.1501 17.0535 17.0535 21.1501 12.0001 21.1501C6.94669 21.1501 2.8501 17.0535 2.8501 12.0001C2.8501 6.94669 6.94669 2.8501 12.0001 2.8501C17.0535 2.8501 21.1501 6.94669 21.1501 12.0001Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const missionPoints = [
  "Trusted global leader in import and export",
  "Top-quality products",
  "Ethical trade practices",
  "Long-term partnerships",
  "Value through innovation, efficiency, and customer satisfaction",
];

const visionPoints = [
  "Sustainable, interconnected global trade network",
  "Smooth transactions",
  "Promotes economic growth",
  "Supports businesses worldwide in achieving their goals",
];

const MissionVisionSection = () => {
  return (
    <section className="relative bg-canvas py-section screen-line-top">
      <div className="mx-auto max-w-content px-4 text-center sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-[40ch] text-balance text-section text-ink lg:max-w-[45ch]"
        >
          About{" "}
          <span className="bg-brand-accent px-1.5 text-on-primary">
            Advantage GGW Trading
          </span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.05 }}
          className="mx-auto mt-4 max-w-[62ch] text-pretty text-copy text-body"
        >
          Advantage GGW Trading is a diversified company offering specialized
          services in construction, foodstuff, contracting, import and export,
          and electronics and IT. With a focus on quality and innovation, the
          company delivers reliable solutions across multiple sectors, ensuring
          customer satisfaction and excellence in every project.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ delay: 0.08 }}
        className="mx-auto mt-10 grid max-w-content grid-cols-1 gap-2 px-4 sm:px-6 md:grid-cols-2 md:items-stretch lg:px-8"
      >
        <article className="h-full overflow-hidden rounded-md bg-canvas ring-1 ring-hairline ring-inset">
          <div className="relative z-10 mx-auto w-full max-w-sm px-6 py-8 sm:px-8 md:py-12">
            <h3 className="text-title-lg text-ink">Mission</h3>
            <p className="mt-2 max-w-sm text-copy text-body">
              To be a trusted global leader in import and export.
            </p>
            <ul className="mt-6 flex flex-col gap-2 text-copy text-ink">
              {missionPoints.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <CheckIcon className="mt-0.5 text-brand-accent" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>

        <article className="relative h-full overflow-hidden rounded-md bg-linear-to-b from-[#5B8AFF] to-brand-accent text-on-primary ring-1 ring-hairline ring-inset [--pattern-fg:rgba(255,255,255,0.12)]">
          <div className="pointer-events-none absolute inset-0 opacity-30">
            <div className="pattern-hatch absolute inset-0" />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-sm px-6 py-8 sm:px-8 md:py-12">
            <h3 className="text-title-lg">Vision</h3>
            <p className="mt-2 max-w-sm text-copy text-white/80">
              To build a sustainable and interconnected global trade network.
            </p>
            <ul className="mt-6 flex flex-col gap-2 text-copy">
              {visionPoints.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <CheckIcon className="mt-0.5 text-on-primary" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto mt-6 max-w-content px-4 text-center text-sm font-medium text-muted sm:px-6 lg:px-8"
      >
        <p>We deliver quality, reliability, and consistency in every shipment.</p>
        <p className="mt-1">
          <a
            href="/contact"
            className="text-brand-accent underline decoration-hairline underline-offset-4 transition-colors hover:text-brand-accent"
          >
            Get a quote
          </a>{" "}
          or email us at{" "}
          <a
            href="mailto:info@ggwint.com"
            className="text-brand-accent underline decoration-hairline underline-offset-4 transition-colors hover:text-brand-accent"
          >
            info@ggwint.com
          </a>
        </p>
      </motion.div>
    </section>
  );
};

export default MissionVisionSection;
