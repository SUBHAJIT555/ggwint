"use client";

import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  categories as categoryList,
  products as catalog,
  type MainCategory,
  type Product,
} from "../../data/products";

import { IoArrowForwardOutline } from "react-icons/io5";
import { FiX } from "react-icons/fi";
import { useQuote } from "../../hooks/useQuote";
import Button from "./Button";
import ProductFilter, { type ProductFilterOption } from "./ProductFilter";

const PAGE_SIZE = 24;

function seededRandom(seed: number) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function shuffle<T>(items: T[], seed: number): T[] {
  const copy = [...items];
  const random = seededRandom(seed);
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1));
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy;
}

function mixAcrossCategories(products: Product[]): Product[] {
  const groups = new Map<string, Product[]>();
  for (const product of products) {
    const bucket = groups.get(product.mainCategory);
    if (bucket) bucket.push(product);
    else groups.set(product.mainCategory, [product]);
  }

  const queues = shuffle([...groups.entries()], 42).map(([category, items]) => {
    const seed = [...category].reduce((total, char) => total + char.charCodeAt(0), 0);
    return shuffle(items, seed);
  });

  const mixed: Product[] = [];
  let added = true;
  while (added) {
    added = false;
    for (const queue of queues) {
      const next = queue.shift();
      if (!next) continue;
      mixed.push(next);
      added = true;
    }
  }

  return mixed;
}

type ProductGridProps = {
  title?: string;
  initialMainCategory?: MainCategory | "All";
};

function ProductCard({
  product,
  index,
  inQuote,
  onOpen,
  onAdd,
}: {
  product: Product;
  index: number;
  inQuote: boolean;
  onOpen: (product: Product) => void;
  onAdd: (product: Product, e?: React.MouseEvent) => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index, 8) * 0.04 }}
      onClick={() => onOpen(product)}
      className="group flex h-full cursor-pointer flex-col rounded-3xl border border-dashed border-hairline bg-surface-card p-1 [--inner:1.25rem] shadow-lift transition-shadow duration-300 hover:shadow-lg"
    >
      <div className="overflow-hidden rounded-(--inner)">
        <img
          src={product.image}
          alt={product.title}
          className="aspect-4/3 w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col px-2.5 pb-2.5 pt-3 sm:px-3 sm:pb-3">
        <p className="mb-1 text-[11px] font-medium text-muted sm:text-caption">
          {product.mainCategory}
        </p>
        <h3 className="line-clamp-2 text-title-sm font-semibold leading-snug text-ink sm:text-title-md">
          {product.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-caption text-muted sm:text-body-sm">
          {product.description}
        </p>
        <div className="mt-auto flex flex-col gap-2.5 pt-3">
          <p className="text-body-sm font-semibold text-ink sm:text-title-sm">
            AED {product.price.toFixed(2)}
          </p>
          <Button
            variant={inQuote ? "secondary" : "accent"}
            disabled={inQuote}
            onClick={(e) => onAdd(product, e)}
            className="h-9 w-full px-3 text-[13px] sm:h-10"
          >
            {inQuote ? "Added" : "Add to Quote"}
          </Button>
        </div>
      </div>
    </motion.article>
  );
}

const ProductGrid = ({
  title = "Our Variety of Products",
  initialMainCategory = "All",
}: ProductGridProps) => {
  const { addToQuote, isInQuote } = useQuote();

  // State declarations
  const [selectedMainCategory, setSelectedMainCategory] = useState<
    MainCategory | "All"
  >(initialMainCategory);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Sync state with props when they change (handles route navigation)
  // We use the "Adjusting state during rendering" pattern instead of useEffect
  // to avoid cascading renders and the associated React warning.
  const [prevInitialMainCategory, setPrevInitialMainCategory] =
    useState(initialMainCategory);

  if (initialMainCategory !== prevInitialMainCategory) {
    setPrevInitialMainCategory(initialMainCategory);
    setSelectedMainCategory(initialMainCategory);
    setSelectedSubCategory("All");
    setCurrentPage(1);
  }

  // Track mobile state for responsive pagination
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedProduct) {
        closeModal();
      }
    };

    if (selectedProduct) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [selectedProduct, closeModal]);

  const filterOptions = useMemo<ProductFilterOption[]>(() => {
    if (initialMainCategory === "All") {
      return [
        { id: "All", label: "All", count: catalog.length },
        ...categoryList.map((category) => ({
          id: category,
          label: category,
          count: catalog.filter((product) => product.mainCategory === category)
            .length,
        })),
      ];
    }

    const inCategory = catalog.filter(
      (product) => product.mainCategory === selectedMainCategory
    );
    const subCategories = Array.from(
      new Set(inCategory.map((product) => product.category))
    );
    const extraSubs = subCategories.filter(
      (subCategory) => subCategory !== selectedMainCategory
    );

    if (extraSubs.length === 0) {
      return [
        {
          id: "All",
          label: selectedMainCategory,
          count: inCategory.length,
        },
      ];
    }

    return [
      {
        id: "All",
        label: `All ${selectedMainCategory}`,
        count: inCategory.length,
      },
      ...subCategories.map((subCategory) => ({
        id: subCategory,
        label: subCategory,
        count: inCategory.filter((product) => product.category === subCategory)
          .length,
      })),
    ];
  }, [initialMainCategory, selectedMainCategory]);

  const filteredProducts = useMemo(() => {
    let result = catalog;

    // Filter by Main Category if not "All"
    if (selectedMainCategory !== "All") {
      result = result.filter(
        (product) => product.mainCategory === selectedMainCategory
      );

      // If we have a selected subcategory, filter by it too
      if (selectedSubCategory !== "All") {
        result = result.filter(
          (product) => product.category === selectedSubCategory
        );
      }
    }

    if (selectedMainCategory === "All") {
      return mixAcrossCategories(result);
    }

    return result;
  }, [selectedMainCategory, selectedSubCategory]);

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredProducts.slice(start, start + PAGE_SIZE);
  }, [currentPage, filteredProducts]);

  const handleAddToQuote = (product: Product, e?: React.MouseEvent) => {
    e?.stopPropagation(); // Prevent modal from opening when clicking button
    if (!isInQuote(product.id)) {
      addToQuote(product, 1);
    }
  };

  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const visiblePageNumbers = useMemo(() => {
    // Show fewer pages on mobile for better UX
    const maxVisible = isMobile ? 4 : 6;
    const pages: (number | string)[] = [];

    if (totalPages <= maxVisible) {
      // Show all pages if total is within maxVisible
      for (let i = 1; i <= totalPages; i += 1) {
        pages.push(i);
      }
    } else {
      // Calculate the range of pages to show (centered around current page)
      const offset = isMobile ? 1 : 2;
      let startPage = Math.max(1, currentPage - offset);
      const endPage = Math.min(totalPages, startPage + maxVisible - 1);

      // Adjust start if we're near the end
      if (endPage - startPage < maxVisible - 1) {
        startPage = Math.max(1, endPage - maxVisible + 1);
      }

      // Always show first page
      if (startPage > 1) {
        pages.push(1);
        if (startPage > 2) {
          pages.push("...");
        }
      }

      // Show the range of pages
      for (let i = startPage; i <= endPage; i += 1) {
        pages.push(i);
      }

      // Always show last page if there's a gap
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pages.push("...");
        }
        pages.push(totalPages);
      }
    }

    return pages;
  }, [currentPage, totalPages, isMobile]);

  const scrollToProducts = useCallback(() => {
    const el = sectionRef.current;
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const skipFilterScroll = useRef(true);
  useEffect(() => {
    if (skipFilterScroll.current) {
      skipFilterScroll.current = false;
      return;
    }
    scrollToProducts();
  }, [selectedMainCategory, selectedSubCategory, scrollToProducts]);

  const handleFilterChange = (id: string) => {
    const current =
      initialMainCategory === "All"
        ? selectedMainCategory
        : selectedSubCategory;
    if (id === current) return;

    if (initialMainCategory === "All") {
      setSelectedMainCategory(id as MainCategory | "All");
      setSelectedSubCategory("All");
    } else {
      setSelectedSubCategory(id);
    }
    setCurrentPage(1);
  };

  const handlePageChange = useCallback(
    (newPage: number) => {
      setCurrentPage(newPage);
      scrollToProducts();
    },
    [scrollToProducts]
  );

  return (
    <section
      ref={sectionRef}
      className="w-full scroll-mt-20 py-10 sm:py-12 lg:py-16 screen-line-top"
      id="products"
    >
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 max-w-480 mx-auto space-y-6">
        <div className="flex flex-col gap-4 sm:gap-6">
          <h2 className="flex items-center gap-3 text-section text-ink">
            {title} <IoArrowForwardOutline className="rotate-45" />
          </h2>

          <ProductFilter
            options={filterOptions}
            value={
              initialMainCategory === "All"
                ? selectedMainCategory
                : selectedSubCategory
            }
            resultCount={filteredProducts.length}
            onChange={handleFilterChange}
            label={
              initialMainCategory === "All"
                ? "Filter by category"
                : "Filter this range"
            }
          />
        </div>

        {/* Product list */}
        {paginatedProducts.length === 0 ? (
          <div className="rounded-lg border border-hairline bg-surface-card px-6 py-16 text-center">
            <p className="text-title-md text-ink">Products coming soon</p>
            <p className="mt-2 text-body-sm text-body max-w-md mx-auto">
              This category is ready. Individual products and images will be added
              here shortly.
            </p>
          </div>
        ) : (
          <>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
          {paginatedProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              inQuote={isInQuote(product.id)}
              onOpen={handleCardClick}
              onAdd={handleAddToQuote}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          {/* Results Count */}
          <div className="text-xs sm:text-sm text-ink/70  text-center sm:text-left">
            Showing {(currentPage - 1) * PAGE_SIZE + 1}-
            {Math.min(currentPage * PAGE_SIZE, filteredProducts.length)} of{" "}
            {filteredProducts.length} products
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-hide pb-2 sm:pb-0">
            <button
              onClick={() => {
                const newPage = Math.max(currentPage - 1, 1);
                handlePageChange(newPage);
              }}
              disabled={currentPage === 1}
              className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-md bg-surface-card text-ink border border-hairline text-xs sm:text-sm  font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-card transition-colors shrink-0"
            >
              Prev
            </button>
            {visiblePageNumbers.map((page, index) => {
              if (page === "...") {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-1 sm:px-2 text-muted  text-xs sm:text-sm shrink-0"
                  >
                    ...
                  </span>
                );
              }
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page as number)}
                  className={`px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-md text-xs sm:text-sm  transition min-w-8 sm:min-w-10 shrink-0 ${
                    currentPage === page
                      ? "bg-primary text-on-primary border border-gray-400 text-ink shadow-md"
                      : "bg-surface-card text-ink hover:bg-surface-card border border-hairline"
                  }`}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => {
                const newPage = Math.min(currentPage + 1, totalPages);
                handlePageChange(newPage);
              }}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-md bg-surface-card text-ink border border-hairline text-xs sm:text-sm  font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface-card transition-colors shrink-0"
            >
              Next
            </button>
          </div>
        </div>
          </>
        )}
      </div>

      {isMounted &&
        createPortal(
          <AnimatePresence>
            {selectedProduct && (
              <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeModal}
              className="fixed inset-0 bg-ink/45 backdrop-blur-sm"
              style={{ zIndex: 200 }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.25, type: "spring", damping: 26 }}
              className="fixed inset-0 flex items-center justify-center p-4 sm:p-6"
              style={{ zIndex: 201 }}
              onClick={closeModal}
            >
              <div
                className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-dashed border-hairline bg-canvas p-1 shadow-lift [--inner:1.25rem]"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-dashed border-hairline px-4 py-3 sm:px-5">
                  <p className="text-caption uppercase tracking-wide text-muted">
                    Product details
                  </p>
                  <button
                    onClick={closeModal}
                    className="inline-flex size-8 items-center justify-center rounded-md border border-dashed border-hairline text-body transition-colors hover:bg-surface-card hover:text-ink"
                    aria-label="Close modal"
                  >
                    <FiX className="size-4" />
                  </button>
                </div>

                <div className="overflow-y-auto p-3 sm:p-5">
                  <div className="grid gap-4 md:grid-cols-[1.05fr_0.95fr] md:items-stretch md:gap-6">
                    <div className="overflow-hidden rounded-(--inner) bg-surface-card">
                      <img
                        src={selectedProduct.image}
                        alt={selectedProduct.title}
                        className="aspect-4/3 h-full min-h-56 w-full object-cover md:aspect-auto md:min-h-80"
                      />
                    </div>

                    <div className="flex flex-col rounded-(--inner) border border-dashed border-hairline bg-surface-card p-4 sm:p-5">
                      <p className="w-fit rounded-pill border border-dashed border-hairline bg-canvas px-2.5 py-1 text-caption text-muted">
                        {selectedProduct.mainCategory}
                      </p>
                      <h2 className="mt-3 text-balance text-title-lg font-semibold tracking-tight text-ink">
                        {selectedProduct.title}
                      </h2>
                      <p className="mt-3 text-pretty text-copy text-body">
                        {selectedProduct.description}
                      </p>

                      <div className="mt-auto pt-6">
                        <div className="flex items-end justify-between gap-4 border-t border-dashed border-hairline pt-4">
                          <div>
                            <p className="text-caption text-muted">
                              Indicative price
                            </p>
                            <p className="mt-0.5 text-title-lg font-semibold text-brand-accent">
                              AED {selectedProduct.price.toFixed(2)}
                            </p>
                          </div>
                          <p className="max-w-40 text-right text-caption leading-snug text-muted">
                            Volume pricing available on request
                          </p>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-2">
                          <Button
                            variant={
                              isInQuote(selectedProduct.id)
                                ? "secondary"
                                : "accent"
                            }
                            disabled={isInQuote(selectedProduct.id)}
                            onClick={(e) => {
                              handleAddToQuote(selectedProduct, e);
                              if (!isInQuote(selectedProduct.id)) {
                                setTimeout(() => closeModal(), 500);
                              }
                            }}
                            className="w-full"
                          >
                            {isInQuote(selectedProduct.id)
                              ? "Added"
                              : "Add to quote"}
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={closeModal}
                            className="w-full"
                          >
                            Close
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </section>
  );
};

export default ProductGrid;
