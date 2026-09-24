"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import {
  IconMail,
  IconMapPin,
  IconPhone,
} from "@tabler/icons-react";
import Logo from "./Logo";
import Button from "./Button";
import { cn } from "../../lib/cn";
import { SITE_CONTACT } from "../../data/contact";
import { mainCategories, toCategorySlug } from "../../data/products";

function FooterLabel({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-caption font-semibold tracking-[0.14em] text-ink uppercase">
      {children}
    </h3>
  );
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const itemClassName =
    "text-body-sm text-muted transition-colors duration-200 hover:text-ink";

  return (
    <li>
      {external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={itemClassName}
        >
          {children}
        </a>
      ) : (
        <Link href={href} className={itemClassName}>
          {children}
        </Link>
      )}
    </li>
  );
}

const affiliatedCompanies = [
  {
    name: "Telosgrid Technologies",
    href: "https://telos-grid.com/",
    src: "/images/affilatedCompanies/telosgrid.png",
  },
  {
    name: "Wadi Souf",
    href: "https://wadisouf.com/home/",
    src: "/images/affilatedCompanies/wadisouf.png",
  },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    if (website) {
      setIsSubscribed(true);
      setEmail("");
      setWebsite("");
      setTimeout(() => setIsSubscribed(false), 3000);
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("website", website);
      formData.append("formType", "newsletter");

      const response = await fetch(`/api/mail.php`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.status === "success") {
        setIsSubscribed(true);
        setEmail("");
        setWebsite("");
        setTimeout(() => setIsSubscribed(false), 3000);
      }
    } catch (error) {
      console.error("Newsletter error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-x-hidden bg-surface-soft screen-line-top">
      <div className="mx-auto max-w-content border-x border-dashed border-hairline px-5 py-12 sm:px-6 sm:py-14">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3 transition-opacity duration-200 hover:opacity-80"
            >
              <Logo className="h-28" />
              <span className="leading-[1.15] text-ink">
                <span className="block text-sm font-semibold tracking-[0.04em]">
                  G G W INTERNATIONAL
                </span>
                <span className="mt-1 block text-xs tracking-wide text-muted">
                  GENERAL TRADING L.L.C
                </span>
              </span>
            </Link>
            <p className="mt-4 max-w-md text-copy text-muted">
              Your Gateway to Global Trade — bridging markets with excellence,
              integrity, and innovation from the heart of Dubai.
            </p>
            <ul className="mt-5 flex flex-col gap-2.5 text-body-sm text-muted">
              <li>
                <a
                  href={`mailto:${SITE_CONTACT.email}`}
                  className="inline-flex items-center gap-2 transition-colors hover:text-ink"
                >
                  <IconMail className="size-4 shrink-0 text-brand-accent" stroke={1.75} />
                  {SITE_CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONTACT.phoneHref}
                  className="inline-flex items-center gap-2 transition-colors hover:text-ink"
                >
                  <IconPhone className="size-4 shrink-0 text-brand-accent" stroke={1.75} />
                  {SITE_CONTACT.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <IconMapPin
                  className="mt-0.5 size-4 shrink-0 text-brand-accent"
                  stroke={1.75}
                />
                <a
                  href={SITE_CONTACT.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-ink"
                >
                  {SITE_CONTACT.address}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className=" border border-dashed border-hairline bg-canvas p-5 sm:p-6">
            <FooterLabel>Newsletter</FooterLabel>
            <p className="mt-2 max-w-md text-copy text-muted">
              Stay updated with our latest news, industry insights, and exclusive
              offers.
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="mt-4 grid w-full min-w-0 grid-cols-1 gap-2.5 sm:grid-cols-[minmax(0,1fr)_auto]"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                autoComplete="email"
                suppressHydrationWarning
                className="h-12 w-full min-w-0 max-w-full appearance-none rounded-md border border-hairline bg-white px-4 text-base text-ink placeholder:text-muted shadow-[inset_0_1.5px_8px_0_rgba(38,103,255,0.10)] focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent/30"
              />
        
              <div className="hidden">
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <Button
                type="submit"
                variant="accent"
                disabled={isSubmitting}
                className="h-12 w-full sm:w-auto sm:px-6"
              >
                {isSubmitting
                  ? "Submitting..."
                  : isSubscribed
                    ? "Subscribed"
                    : "Subscribe"}
              </Button>
            </form>
          </div>
          <div className="mt-6">
            <p className="text-caption font-semibold tracking-[0.14em] text-ink uppercase">
              Affiliated company
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-3">
              {affiliatedCompanies.map(({ name, href, src }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3"
                  >
                    <span
                      className={cn(
                        "flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-hairline bg-canvas",
                        "transition-colors duration-200 group-hover:border-brand-accent"
                      )}
                    >
                      <img src={src} alt="" className="size-11 object-contain" />
                    </span>
                    <span className="text-body-sm font-medium text-ink transition-colors duration-200 group-hover:text-brand-accent">
                      {name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          </div>
        </div>

        <div className="mt-10 border-t border-dashed border-hairline pt-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-3">
              <FooterLabel>Useful Links</FooterLabel>
              <ul className="mt-4 flex flex-col gap-2.5">
                <FooterLink href="/">Home</FooterLink>
                <FooterLink href="/about">About</FooterLink>
                <FooterLink href="/products">Products</FooterLink>
                <FooterLink href="/contact">Contact</FooterLink>
              </ul>
            </div>

            <div className="lg:col-span-6">
              <FooterLabel>Product Categories</FooterLabel>
              <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
                {mainCategories.map((name) => (
                  <FooterLink
                    key={name}
                    href={`/products/${toCategorySlug(name)}`}
                  >
                    {name}
                  </FooterLink>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-3">
              <FooterLabel>Legals</FooterLabel>
              <ul className="mt-4 flex flex-col gap-2.5">
                <FooterLink href="/terms-and-conditions">
                  Terms & Condition
                </FooterLink>
                <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
                <FooterLink href="/cookie-policy">Cookie Policy</FooterLink>
                <FooterLink href={`mailto:${SITE_CONTACT.email}`} external>
                  Support
                </FooterLink>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-dashed border-hairline pt-5 sm:flex-row md:pr-14">
          <p className="text-center text-caption text-muted sm:text-left">
            &copy; {currentYear}{" "}
            <Link href="/" className="text-ink hover:underline">
              {SITE_CONTACT.name}
            </Link>
            . All Rights Reserved.
            <span className="mx-2 text-hairline" aria-hidden>
              ·
            </span>
            <Link href="/sitemap" className="text-ink hover:underline">
              Sitemap
            </Link>
          </p>
          <p className="inline-flex items-center gap-1 text-center text-caption text-muted">
            Design with
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4 text-brand-accent"
              aria-hidden
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" />
            </svg>
            by{" "}
            <Link
              href="https://subhajit-dhali.vercel.app/"
              target="_blank"
              className="text-ink hover:underline"
            >
              Subhajit
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
