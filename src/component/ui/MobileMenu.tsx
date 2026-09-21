"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useMobileMenuStore } from "../../store/mobileMenuStore";
import { IoClose } from "react-icons/io5";
import { FiChevronDown } from "react-icons/fi";
import Button from "./Button";
import { mainCategories, toCategorySlug } from "../../data/products";

type NavigationItem = {
  name: string;
  path: string;
  hasDropdown?: boolean;
  dropdownItems?: { name: string; path: string }[];
};

const MobileMenu: React.FC = () => {
  const { isOpen, closeMenu: storeCloseMenu } = useMobileMenuStore();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const closeMenu = useCallback(() => {
    setExpandedItem(null);
    storeCloseMenu();
  }, [storeCloseMenu]);

  const navigationItems: NavigationItem[] = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    {
      name: "Products",
      path: "/products",
      hasDropdown: true,
      dropdownItems: [
        { name: "All Products", path: "/products" },
        ...mainCategories.map((name) => ({
          name,
          path: `/products/${toCategorySlug(name)}`,
        })),
      ],
    },
    { name: "Contact", path: "/contact" },
  ];

  const toggleDropdown = (name: string) => {
    setExpandedItem(expandedItem === name ? null : name);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(".mobile-menu") &&
        !target.closest(".mobile-menu-button")
      ) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside);
      document.body.style.overflow = "hidden";
      document.documentElement.classList.add("mobile-menu-open");
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.classList.remove("mobile-menu-open");
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "unset";
      document.documentElement.classList.remove("mobile-menu-open");
    };
  }, [isOpen, closeMenu]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="md:hidden fixed inset-0 z-999 mobile-menu bg-canvas"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="h-screen w-full overflow-y-auto px-6 pt-4 pb-10">
            <div className="flex justify-end mb-8">
              <button
                className="text-ink p-2 mobile-menu-button"
                onClick={closeMenu}
                aria-label="Close menu"
              >
                <IoClose className="w-6 h-6" />
              </button>
            </div>
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <div key={item.name} className="border-b border-hairline">
                  {item.hasDropdown ? (
                    <div>
                      <div className="flex items-center justify-between py-4">
                        <Link
                          href={item.path}
                          className="text-title-md text-ink"
                          onClick={closeMenu}
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => toggleDropdown(item.name)}
                          className="p-2 text-ink"
                          aria-label={`Expand ${item.name}`}
                        >
                          <motion.div
                            animate={{
                              rotate: expandedItem === item.name ? 180 : 0,
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <FiChevronDown className="w-5 h-5" />
                          </motion.div>
                        </button>
                      </div>
                      <AnimatePresence>
                        {expandedItem === item.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pb-4 pl-3 space-y-3">
                              {item.dropdownItems?.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.path}
                                  className="block text-body-md text-body"
                                  onClick={closeMenu}
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.path}
                      className="block py-4 text-title-md text-ink"
                      onClick={closeMenu}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
            <div className="mt-8">
              <Button href="/contact" variant="accent" className="w-full h-12" onClick={closeMenu}>
                Contact
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
