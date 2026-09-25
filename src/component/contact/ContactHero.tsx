"use client";

import { motion } from "framer-motion";
import { FiMail, FiPhone } from "react-icons/fi";
import { IoLogoWhatsapp } from "react-icons/io";
import { cn } from "../../lib/cn";
import { SITE_CONTACT } from "../../data/contact";
import ContactWorldMap from "./ContactWorldMap";

const fade = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const CHANNELS = [
  {
    title: "Email support",
    description: "Our team is here to help with sourcing and supply.",
    value: SITE_CONTACT.email,
    href: `mailto:${SITE_CONTACT.email}`,
    Icon: FiMail,
  },
  {
    title: "Sales & quotes",
    description: "Need a brief or a volume quote? Get in touch.",
    value: "Chat on WhatsApp",
    href: SITE_CONTACT.whatsappHref,
    external: true,
    Icon: IoLogoWhatsapp,
  },
  {
    title: "Call us",
    description: "Mon–Sat, 10:00 AM – 6:00 PM. Sunday and official holidays closed.",
    value: SITE_CONTACT.phone,
    href: SITE_CONTACT.phoneHref,
    Icon: FiPhone,
  },
] as const;

export default function ContactHero() {
  return (
    <section className="relative w-full overflow-hidden bg-canvas">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 50% at 50% 0%, black 30%, transparent 70%)",
          backgroundImage:
            "radial-gradient(circle at 1px 1px, color-mix(in srgb, var(--color-brand-accent) 28%, transparent) 1px, transparent 0)",
          backgroundSize: "10px 10px",
          maskImage:
            "radial-gradient(ellipse 80% 50% at 50% 0%, black 30%, transparent 70%)",
          opacity: 0.5,
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-5 pt-12 pb-6 text-center sm:px-6 sm:pt-16 sm:pb-8">
        <motion.h1
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fade}
          className="text-balance text-hero text-ink"
        >
          We&apos;d love to hear from you
        </motion.h1>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fade}
          transition={{ delay: 0.05 }}
          className="mx-auto mt-4 max-w-xl text-copy text-muted"
        >
          Based in Dubai — serving partners across the UAE, GCC, and beyond.
        </motion.p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fade}
        transition={{ delay: 0.08 }}
        className="relative z-10 px-4 sm:px-8 lg:px-12"
      >
        <ContactWorldMap className="py-2 sm:py-4" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-5xl px-5 pb-12 sm:px-6 sm:pb-14 lg:pb-10">
        <div className="grid gap-0 border-t border-dashed border-hairline pt-10 sm:grid-cols-3 sm:pt-12">
          {CHANNELS.map((item, index) => (
            <motion.div
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fade}
              transition={{ delay: 0.1 + index * 0.05 }}
              className={cn(
                "px-2 py-8 text-center sm:px-6 sm:py-2",
                index > 0 &&
                  "border-t border-dashed border-hairline sm:border-t-0 sm:border-l"
              )}
            >
              <span className="mx-auto flex size-10 items-center justify-center rounded-xl border border-dashed border-hairline bg-surface-card shadow-lift">
                <item.Icon className="size-4 text-brand-accent" />
              </span>
              <h2 className="mt-4 text-title-md text-ink">
                {item.title}
              </h2>
              <p className="mx-auto mt-2 max-w-[16rem] text-body-sm leading-relaxed text-muted">
                {item.description}
              </p>
              <a
                href={item.href}
                {...("external" in item && item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="mt-4 inline-flex items-center justify-center text-sm font-semibold text-brand-accent underline decoration-brand-accent/40 decoration-dotted underline-offset-4 transition-colors hover:text-ink hover:decoration-ink/40"
              >
                {item.value}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
