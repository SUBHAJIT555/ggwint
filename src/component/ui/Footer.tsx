"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import Logo from "./Logo";
import Button from "./Button";
import { cn } from "../../lib/cn";
import { mainCategories, toCategorySlug } from "../../data/products";

function FooterSectionHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="inline-flex items-center rounded-lg border border-dashed border-hairline bg-surface-card px-3 py-1 text-caption font-medium text-body">
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
  const itemClassName = cn(
    "group flex items-center gap-1.5 text-body-md text-muted transition-colors duration-200",
    "hover:text-ink"
  );
  const content = (
    <>
      <span>{children}</span>
      <FiArrowUpRight
        className="h-3.5 w-3.5 shrink-0 text-brand-accent opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
        aria-hidden
      />
    </>
  );

  return (
    <li>
      {external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={itemClassName}
        >
          {content}
        </a>
      ) : (
        <Link href={href} className={itemClassName}>
          {content}
        </Link>
      )}
    </li>
  );
}

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
    <footer className="relative w-full overflow-x-hidden bg-canvas screen-line-top pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
      <div className="mx-auto max-w-content border-x border-dashed border-hairline px-5 py-12 sm:px-6 sm:py-16 lg:py-20">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-5 lg:gap-y-12">
          <div className="col-span-2">
            <Link
              href="/"
              className="inline-block transition-opacity duration-200 hover:opacity-80"
            >
              <div className="h-9 w-52">
                <Logo variant="on-light" />
              </div>
            </Link>

            <p className="mt-4 max-w-sm text-body-md leading-relaxed text-muted">
              Your Gateway to Global Trade — bridging markets with excellence,
              integrity, and innovation from the heart of Dubai.
            </p>

            <div className="mt-6 max-w-sm">
              <FooterSectionHeading>Newsletter</FooterSectionHeading>
              <p className="mt-4 text-body-md text-muted">
                Stay updated with our latest news, industry insights, and
                exclusive offers.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="mt-4 space-y-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  className="w-full rounded-xl border border-hairline bg-surface-card px-4 py-3 text-body-md text-ink placeholder:text-muted focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent/30"
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
                  className="h-12 w-full"
                >
                  {isSubmitting
                    ? "Submitting..."
                    : isSubscribed
                      ? "Subscribed"
                      : "Subscribe"}
                </Button>
              </form>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <FooterSectionHeading>Useful Links</FooterSectionHeading>
            <ul className="mt-5 flex flex-col gap-2.5">
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/products">Products</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <FooterSectionHeading>Product Categories</FooterSectionHeading>
            <ul className="mt-5 flex flex-col gap-2.5">
              {mainCategories.map((name) => (
                <FooterLink key={name} href={`/products/${toCategorySlug(name)}`}>
                  {name}
                </FooterLink>
              ))}
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <FooterSectionHeading>Legals</FooterSectionHeading>
            <ul className="mt-5 flex flex-col gap-2.5">
              <FooterLink href="/terms-and-conditions">
                Terms & Condition
              </FooterLink>
              <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
              <FooterLink href="/cookie-policy">Cookie Policy</FooterLink>
              <FooterLink href="mailto:info@ggwint.com" external>
                Support
              </FooterLink>
            </ul>

            <div className="mt-8">
              <FooterSectionHeading>Social</FooterSectionHeading>
              <ul className="mt-5 flex flex-col gap-2.5">
                <FooterLink href="#" external>
                  Facebook
                </FooterLink>
                <FooterLink href="#" external>
                  Instagram
                </FooterLink>
                <FooterLink href="#" external>
                  LinkedIn
                </FooterLink>
                <FooterLink href="https://wa.me/97142712771" external>
                  WhatsApp
                </FooterLink>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-dashed border-hairline" />

        <div className="flex w-full items-center justify-center px-4 py-6">
          <p className="text-center text-body-md leading-relaxed text-muted">
            &copy; {currentYear}{" "}
            <Link href="/" className="text-ink hover:underline">
              GGW International General Trading LLC
            </Link>
            . All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
