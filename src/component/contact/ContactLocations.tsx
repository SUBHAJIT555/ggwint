"use client";

import { motion } from "framer-motion";
import { FiArrowUpRight, FiClock, FiMapPin } from "react-icons/fi";
import { SITE_CONTACT } from "../../data/contact";

const LIGHT_BG = `
  radial-gradient(ellipse 95% 78% at 5% 5%, rgba(38, 103, 255, 0.10), transparent 70%),
  radial-gradient(ellipse 91% 75% at 95% 5%, rgba(38, 103, 255, 0.08), transparent 72%),
  radial-gradient(ellipse 88% 72% at 50% 95%, rgba(38, 103, 255, 0.07), transparent 74%),
  radial-gradient(ellipse 85% 70% at 50% 50%, rgba(38, 103, 255, 0.05), transparent 76%),
  linear-gradient(160deg, #f5f8ff 0%, #eef3ff 50%, #f7f9ff 100%)
`;

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function ContactLocations() {
  return (
    <section className="w-full bg-canvas screen-line-top">
      <div className="px-5 py-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-xl">
          <div
            className="absolute inset-0 z-0"
            style={{ background: LIGHT_BG }}
            aria-hidden
          />

          <div className="relative z-10 grid items-center gap-6 px-5 py-6 sm:px-6 sm:py-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-8 lg:px-8 lg:py-7">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fade}
              className="max-w-sm"
            >
              <p className="text-caption text-muted">Our location</p>
              <h2 className="mt-1.5 text-balance text-section text-ink">
                Visit our office
              </h2>
              <p className="mt-2 text-copy text-muted">
                Find us on Sheikh Zayed Road —{" "}
                <span className="text-ink underline decoration-brand-accent/40 decoration-dotted underline-offset-4">
                  open for meetings, sourcing briefings, and trade discussions.
                </span>
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fade}
              transition={{ delay: 0.06 }}
              className="w-full"
            >
              <div className="flex items-center gap-2.5">
                <FiMapPin className="size-4 shrink-0 text-brand-accent" />
                <div className="min-w-0">
                  <h3 className="text-base font-semibold tracking-tight text-ink">
                    {SITE_CONTACT.city}
                  </h3>
                  <p className="text-xs text-muted sm:text-sm">
                    {SITE_CONTACT.name}
                  </p>
                </div>
              </div>

              <div className="my-3 border-t border-dashed border-hairline" />

              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5">
                <div className="min-w-0">
                  <p className="text-[10px] font-semibold tracking-wide text-muted uppercase">
                    Address
                  </p>
                  <p className="mt-0.5 text-sm text-ink">{SITE_CONTACT.address}</p>
                </div>
                <a
                  href={SITE_CONTACT.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-brand-accent transition-colors hover:text-ink sm:text-sm"
                >
                  Google Maps
                  <FiArrowUpRight className="size-3.5" />
                </a>
              </div>

              <div className="my-3 border-t border-dashed border-hairline" />

              <div className="flex items-start gap-2.5">
                <FiClock className="mt-0.5 size-4 shrink-0 text-brand-accent" />
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold tracking-wide text-muted uppercase">
                    Office timing
                  </p>
                  <dl className="mt-1 space-y-1 text-sm">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <dt className="text-muted">Mon – Sat</dt>
                      <dd className="font-medium text-ink">10:00 AM – 6:00 PM</dd>
                    </div>
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <dt className="text-muted">Sunday & official holidays</dt>
                      <dd className="font-medium text-ink">Closed</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
