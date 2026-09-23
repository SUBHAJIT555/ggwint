import type { Metadata } from "next";
import Link from "next/link";
import { categoryDetails } from "@/data/products";

export const metadata: Metadata = {
  title: "Sitemap",
  description:
    "A list of every page on the GGW International website, including product categories and policies.",
};

const pages = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
  { label: "Quote", href: "/quote" },
];

const policies = [
  { label: "Terms & Condition", href: "/terms-and-conditions" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Cookie Policy", href: "/cookie-policy" },
];

function SitemapGroup({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <section>
      <h2 className="text-caption font-semibold tracking-[0.14em] text-ink uppercase">
        {title}
      </h2>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-copy text-body transition-colors duration-200 hover:text-ink"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function SitemapPage() {
  return (
    <div className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <h1 className="text-section text-ink">Sitemap</h1>
      <p className="mt-3 max-w-xl text-copy text-body">
        Every page on this site, including product categories and policies.
      </p>

      <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <SitemapGroup title="Pages" links={pages} />
        <SitemapGroup
          title="Product Categories"
          links={categoryDetails.map((category) => ({
            label: category.name,
            href: `/products/${category.slug}`,
          }))}
        />
        <SitemapGroup title="Policies" links={policies} />
      </div>
    </div>
  );
}
