"use client";

import { motion } from "framer-motion";
import { IoLogoWhatsapp } from "react-icons/io";
import Button from "./Button";
import BrandRow from "./BrandRow";
import { CONTACT_FORM_HREF, SITE_CONTACT, contactFormHref } from "../../data/contact";

type CallToActionProps = {
  heading: string;
  subHeading: string;
  quoteLabel?: string;
  /** Category slug to pre-select on the contact form. */
  serviceSlug?: string;
  whatsappMessage: string;
};

const CallToAction = ({
  heading,
  subHeading,
  quoteLabel = "Request a Quote",
  serviceSlug,
  whatsappMessage,
}: CallToActionProps) => {
  const whatsappUrl =
    `https://wa.me/${SITE_CONTACT.whatsappNumber}?text=` +
    encodeURIComponent(whatsappMessage);

  return (
    <section className="relative isolate w-full overflow-hidden bg-canvas screen-line-top">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          mask: "radial-gradient(70% 65% at 50% 45%, transparent 0%, transparent 48%, black 100%)",
          WebkitMask:
            "radial-gradient(70% 65% at 50% 45%, transparent 0%, transparent 48%, black 100%)",
          backgroundImage:
            "linear-gradient(90deg, var(--color-hairline) 1px, transparent 0), linear-gradient(180deg, var(--color-hairline) 1px, transparent 0), repeating-linear-gradient(45deg, var(--color-hairline), transparent 2px 10px)",
          backgroundSize: "24px 24px, 24px 24px, 24px 24px",
          opacity: 0.55,
        }}
      />

      <div className="relative px-5 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-section text-ink"
          >
            {heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
            className="mx-auto mt-4 max-w-3xl text-copy font-medium text-brand-accent"
          >
            {subHeading}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            className="mt-4 flex flex-col items-center justify-center gap-3 sm:mt-5 sm:flex-row sm:gap-4"
          >
            <Button
              href={serviceSlug ? contactFormHref(serviceSlug) : CONTACT_FORM_HREF}
              variant="accent"
              className="h-12 w-full px-6 sm:w-auto sm:min-w-50"
            >
              {quoteLabel}
            </Button>
            <Button
              href={whatsappUrl}
              variant="whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 w-full px-6 sm:w-auto sm:min-w-50"
            >
              <IoLogoWhatsapp className="h-4 w-4" />
              WhatsApp Us
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
            className="mx-auto mt-10 max-w-3xl sm:mt-12"
          >
            <BrandRow />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
