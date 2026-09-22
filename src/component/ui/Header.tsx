"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMobileMenuStore } from "../../store/mobileMenuStore";
import { IoMenu, IoClose } from "react-icons/io5";
import { FiArrowRight, FiChevronDown } from "react-icons/fi";
import { IconBrandWhatsapp, IconShoppingCart } from "@tabler/icons-react";
import Logo from "./Logo";
import Button from "./Button";
import { categoryDetails } from "../../data/products";
import { categoryIcons } from "../../data/categoryIcons";
import { SITE_CONTACT } from "../../data/contact";
import { useQuote } from "../../hooks/useQuote";

type MenuItem = {
  name: string;
  path: string;
  hasDropdown?: boolean;
};

const ProductsDropdown = () => {
  return (
    <div className="absolute top-full left-1/2 z-50 w-160 max-w-[calc(100vw-2rem)] -translate-x-1/2 pt-3 opacity-0 invisible pointer-events-none translate-y-1 transition duration-200 group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-0">
      <div className="bg-canvas border border-hairline rounded-2xl p-3 shadow-[0_16px_40px_rgba(15,23,42,0.12)]">
        <div className="grid grid-cols-2 gap-1">
          {categoryDetails.map((category) => {
            const Icon = categoryIcons[category.name];
            return (
              <Link
                key={category.slug}
                href={`/products/${category.slug}`}
                className="flex items-start gap-3 rounded-xl px-3 py-3 hover:bg-surface-card"
              >
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-body-sm font-medium text-ink">
                    {category.name}
                  </span>
                  <span className="mt-0.5 block text-caption text-muted leading-snug">
                    {category.menuDescription}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { toggleMenu, isOpen } = useMobileMenuStore();
  const pathname = usePathname();
  const { items } = useQuote();
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems: MenuItem[] = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products", hasDropdown: true },
  ];

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 h-16 overflow-visible bg-canvas border-b border-dashed border-hairline ${
        isScrolled ? "backdrop-blur-md bg-canvas/90" : ""
      }`}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="max-w-content mx-auto h-full border-x border-dashed border-hairline px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-full">
          <Link href="/" className="relative z-10 shrink-0">
            <div className="w-44 sm:w-52 md:w-56 h-9">
              <Logo variant="on-light" />
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-4 shrink-0">
            <nav className="flex items-center gap-2">
              {navigationItems.map((item) => (
                <div
                  key={item.name}
                  className={item.hasDropdown ? "relative group" : "relative"}
                  data-nav={item.hasDropdown ? "products" : undefined}
                >
                  <Link
                    href={item.path}
                    className={`flex items-center gap-1 text-nav-link rounded-full px-3 py-1.5 ${
                      isActive(item.path) ? "text-ink" : "text-body"
                    } ${
                      item.hasDropdown
                        ? "group-hover:bg-surface-card group-hover:text-ink"
                        : ""
                    }`}
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <FiChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
                    )}
                  </Link>
                  {item.hasDropdown && <ProductsDropdown />}
                </div>
              ))}
            </nav>
            <Button href="/contact" variant="accent" className="group h-10 gap-2 px-4">
              Contact
              <FiArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Button>
            <Button href="/quote" variant="primary" className="h-10 gap-2 px-3.5">
              <IconShoppingCart className="size-4" stroke={1.75} />
              Quote
              <span
                className={`flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-semibold ${
                  cartCount > 0
                    ? "bg-brand-accent text-on-primary"
                    : "bg-white/15 text-on-primary"
                }`}
              >
                {cartCount}
              </span>
            </Button>
          </div>

          <div className="relative z-70 flex items-center gap-0.5 md:hidden">
            <a
              href={SITE_CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex size-10 items-center justify-center text-[#25D366]"
              aria-label="WhatsApp"
            >
              <IconBrandWhatsapp className="size-5" stroke={1.75} />
            </a>
            <Link
              href="/quote"
              className="relative inline-flex size-10 items-center justify-center text-ink"
              aria-label="Quote cart"
            >
              <IconShoppingCart className="size-5" stroke={1.75} />
              {cartCount > 0 ? (
                <span className="absolute top-1.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-accent px-1 text-[10px] font-semibold text-on-primary">
                  {cartCount}
                </span>
              ) : null}
            </Link>
            <button
              className="inline-flex size-10 items-center justify-center text-ink mobile-menu-button"
              onClick={toggleMenu}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <IoClose className="size-6" /> : <IoMenu className="size-6" />}
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
