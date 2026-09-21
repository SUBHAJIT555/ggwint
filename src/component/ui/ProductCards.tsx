"use client";

import { useMemo, useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  categories as categoryList,
  products as catalog,
  type MainCategory,
  type Product,
} from "../../data/products";

import { IoArrowForwardOutline } from "react-icons/io5";
import { FiFilter, FiX } from "react-icons/fi";
import { ImCross } from "react-icons/im";
import { BsCart4 } from "react-icons/bs";
import { useQuote } from "../../hooks/useQuote";

const PAGE_SIZE = 24;

type ProductGridProps = {
  title?: string;
  initialMainCategory?: MainCategory | "All";
};

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
  const [showFloatingFilter, setShowFloatingFilter] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  // Handle scroll to show/hide floating filter button
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const sectionElement = sectionRef.current;

      if (!sectionElement) return;

      const sectionTop = sectionElement.offsetTop;
      const sectionBottom = sectionTop + sectionElement.offsetHeight;
      const viewportHeight = window.innerHeight;

      if (
        currentScrollY > sectionTop + 150 &&
        currentScrollY < sectionBottom - viewportHeight &&
        currentScrollY > 100
      ) {
        setShowFloatingFilter(true);
      } else {
        setShowFloatingFilter(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
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

  const subCategories = useMemo(() => {
    if (selectedMainCategory === "All") return [];
    const cats = catalog
      .filter((p) => p.mainCategory === selectedMainCategory)
      .map((p) => p.category);
    return Array.from(new Set(cats));
  }, [selectedMainCategory]);

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

  const scrollToTop = useCallback(() => {
    if (sectionRef.current) {
      const sectionTop = sectionRef.current.offsetTop;
      window.scrollTo({
        top: sectionTop - 20,
        behavior: "smooth",
      });
    }
  }, []);

  const changeMainCategory = (category: MainCategory | "All") => {
    setSelectedMainCategory(category);
    setSelectedSubCategory("All");
    setCurrentPage(1);
    handleFilterSelection();
  };

  const changeSubCategory = (subCategory: string) => {
    setSelectedSubCategory(subCategory);
    setCurrentPage(1);
    handleFilterSelection();
  };

  const handleFilterSelection = () => {
    // Close bottom sheet after selection on mobile
    if (window.innerWidth < 1024) {
      setIsBottomSheetOpen(false);
      // Scroll to top of product grid section after bottom sheet closes
      setTimeout(() => {
        scrollToTop();
      }, 350);
    }
  };

  const handlePageChange = useCallback(
    (newPage: number) => {
      setCurrentPage(newPage);
      scrollToTop();
    },
    [scrollToTop]
  );

  return (
    <section
      ref={sectionRef}
      className="w-full py-10 sm:py-12 lg:py-16 screen-line-top"
      id="products"
    >
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 max-w-480 mx-auto space-y-6">
        <div className="flex flex-col gap-4 sm:gap-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-ink leading-tight flex items-center gap-3">
            {title} <IoArrowForwardOutline className="rotate-45" />
          </h2>

          {/* Category Filters - Desktop */}
          <div className="hidden lg:flex flex-wrap gap-3">
            {initialMainCategory === "All" ? (
              <>
                <button
                  onClick={() => changeMainCategory("All")}
                  className={`px-4 py-2 rounded-md text-sm sm:text-base  transition ${selectedMainCategory === "All"
                      ? "bg-primary text-on-primary border border-gray-400 text-ink"
                      : "bg-surface-card text-ink hover:bg-gray-300"
                    }`}
                >
                  All
                </button>
                {categoryList.map((category) => (
                  <button
                    key={category}
                    onClick={() => changeMainCategory(category)}
                    className={`px-4 py-2 rounded-md text-sm sm:text-base  transition whitespace-nowrap ${selectedMainCategory === category
                        ? "bg-primary text-on-primary border border-gray-400 text-ink"
                        : "bg-surface-card text-ink hover:bg-gray-300 hover:text-green-700"
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </>
            ) : (
              <>
                <button
                  onClick={() => changeSubCategory("All")}
                  className={`px-4 py-2 rounded-md text-sm sm:text-base  transition ${selectedSubCategory === "All"
                      ? "bg-primary text-on-primary border border-gray-400 text-ink"
                      : "bg-surface-card text-ink hover:bg-gray-300"
                    }`}
                >
                  All {selectedMainCategory}
                </button>
                {subCategories.map((subCat) => (
                  <button
                    key={subCat}
                    onClick={() => changeSubCategory(subCat)}
                    className={`px-4 py-2 rounded-md text-sm sm:text-base  transition whitespace-nowrap ${selectedSubCategory === subCat
                        ? "bg-primary text-on-primary border border-gray-400 text-ink"
                        : "bg-surface-card text-ink hover:bg-gray-300 hover:text-green-700"
                      }`}
                  >
                    {subCat}
                  </button>
                ))}
              </>
            )}
          </div>

          {/* Mobile/Tablet Filter */}
          <div className="lg:hidden overflow-x-auto scrollbar-hide -mx-3 sm:-mx-4 md:-mx-6 px-3 sm:px-4 md:px-6">
            <div className="flex gap-3 min-w-max pb-2">
              {initialMainCategory === "All" ? (
                <>
                  <button
                    onClick={() => changeMainCategory("All")}
                    className={`px-4 py-2 rounded-md text-sm  transition whitespace-nowrap ${selectedMainCategory === "All"
                        ? "bg-primary text-on-primary border border-gray-400 text-ink"
                        : "bg-surface-card text-ink hover:bg-gray-300"
                      }`}
                  >
                    All
                  </button>
                  {categoryList.map((category) => (
                    <button
                      key={category}
                      onClick={() => changeMainCategory(category)}
                      className={`px-4 py-2 rounded-md text-sm  transition whitespace-nowrap ${selectedMainCategory === category
                          ? "bg-primary text-on-primary border border-gray-400 text-ink"
                          : "bg-surface-card text-ink hover:bg-gray-300"
                        }`}
                    >
                      {category}
                    </button>
                  ))}
                </>
              ) : (
                <>
                  <button
                    onClick={() => changeSubCategory("All")}
                    className={`px-4 py-2 rounded-md text-sm  transition whitespace-nowrap ${selectedSubCategory === "All"
                        ? "bg-primary text-on-primary border border-gray-400 text-ink"
                        : "bg-surface-card text-ink hover:bg-gray-300"
                      }`}
                  >
                    All
                  </button>
                  {subCategories.map((subCat) => (
                    <button
                      key={subCat}
                      onClick={() => changeSubCategory(subCat)}
                      className={`px-4 py-2 rounded-md text-sm  transition whitespace-nowrap ${selectedSubCategory === subCat
                          ? "bg-primary text-on-primary border border-gray-400 text-ink"
                          : "bg-surface-card text-ink hover:bg-gray-300"
                        }`}
                    >
                      {subCat}
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Floating Filter Button */}
        <AnimatePresence>
          {showFloatingFilter && (
            <motion.button
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => {
                if (window.innerWidth < 1024) {
                  // On mobile, open bottom sheet
                  setIsBottomSheetOpen(true);
                } else {
                  // On desktop, scroll to filter section
                  if (sectionRef.current) {
                    const sectionTop = sectionRef.current.offsetTop;
                    window.scrollTo({
                      top: sectionTop - 20,
                      behavior: "smooth",
                    });
                  }
                }
              }}
              className="fixed bottom-0 lg:bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-primary text-on-primary/40 backdrop-blur-sm text-ink px-4 py-2 lg:px-6 lg:py-3 rounded-md shadow-lg  text-xs lg:text-sm tracking-wide lg:tracking-widest flex items-center gap-1.5 lg:gap-2 border border-gray-400 mb-2 lg:mb-0 "
            >
              <FiFilter className="h-4 w-4 lg:h-5 lg:w-5" />
              Filter
            </motion.button>
          )}
        </AnimatePresence>

        {/* Bottom Sheet Modal (Mobile/Tablet) */}
        <AnimatePresence>
          {isBottomSheetOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsBottomSheetOpen(false)}
                className="lg:hidden fixed inset-0 bg-black/50 z-50"
              />
              {/* Bottom Sheet */}
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="lg:hidden fixed -bottom-7 left-0 right-0 z-50 bg-canvas rounded-t-3xl shadow-2xl max-h-[80vh] overflow-hidden border-t border-hairline"
              >
                <div className="p-4 sm:p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold tracking-tight text-ink uppercase tracking-wide">
                      Filter by Category
                    </h3>
                    <button
                      onClick={() => setIsBottomSheetOpen(false)}
                      className="p-2 hover:bg-surface-card rounded-full transition-colors"
                    >
                      <ImCross className="h-5 w-5 text-body" />
                    </button>
                  </div>

                  {/* Filter Options */}
                  <div className="overflow-y-auto max-h-[60vh]">
                    <div className="flex flex-col gap-3">
                      {initialMainCategory === "All" ? (
                        <>
                          <button
                            onClick={() => changeMainCategory("All")}
                            className={`w-full px-5 py-3.5 rounded-lg  font-medium text-left transition-all duration-200 ${selectedMainCategory === "All"
                                ? "bg-primary text-on-primary border border-gray-400 text-ink shadow-md"
                                : "bg-surface-card text-ink hover:bg-surface-card border border-hairline"
                              }`}
                          >
                            All Categories
                          </button>
                          {categoryList.map((category) => (
                            <button
                              key={category}
                              onClick={() => changeMainCategory(category)}
                              className={`w-full px-5 py-3.5 rounded-lg  font-medium text-left transition-all duration-200 ${selectedMainCategory === category
                                  ? "bg-primary text-on-primary border border-gray-400 text-ink shadow-md"
                                  : "bg-surface-card text-ink hover:bg-surface-card border border-hairline"
                                }`}
                            >
                              {category}
                            </button>
                          ))}
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => changeSubCategory("All")}
                            className={`w-full px-5 py-3.5 rounded-lg  font-medium text-left transition-all duration-200 ${selectedSubCategory === "All"
                                ? "bg-primary text-on-primary border border-gray-400 text-ink shadow-md"
                                : "bg-surface-card text-ink hover:bg-surface-card border border-hairline"
                              }`}
                          >
                            All Subcategories
                          </button>
                          {subCategories.map((subCat) => (
                            <button
                              key={subCat}
                              onClick={() => changeSubCategory(subCat)}
                              className={`w-full px-5 py-3.5 rounded-lg  font-medium text-left transition-all duration-200 ${selectedSubCategory === subCat
                                  ? "bg-primary text-on-primary border border-gray-400 text-ink shadow-md"
                                  : "bg-surface-card text-ink hover:bg-surface-card border border-hairline"
                                }`}
                            >
                              {subCat}
                            </button>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Mobile List View */}
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
        <div className="md:hidden space-y-3">
          {paginatedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.02 }}
              onClick={() => handleCardClick(product)}
              className="bg-surface-card rounded-lg shadow-sm hover:shadow-lg border border-hairline transition flex gap-3 cursor-pointer p-3"
            >
              {/* Image - Left Side */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 bg-gray-100 overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Content - Right Side */}
              <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                <span className="text-[10px] uppercase tracking-wide text-ink  bg-primary text-on-primary/30 border border-gray-400 rounded px-1.5 py-0.5 w-fit">
                  {product.mainCategory}
                </span>
                <h3 className="text-sm  font-medium text-ink leading-tight line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-xs text-muted  line-clamp-2 leading-snug">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-auto gap-2">
                  <span className="text-sm font-semibold text-green-700 ">
                    AED {product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={(e) => handleAddToQuote(product, e)}
                    disabled={isInQuote(product.id)}
                    className={`px-3 py-1.5 rounded-md  font-semibold text-xs transition shrink-0 ${isInQuote(product.id)
                        ? "bg-gray-300 text-ink cursor-not-allowed"
                        : "bg-primary text-on-primary border border-gray-400 text-ink hover:bg-green-800"
                      }`}
                  >
                    {isInQuote(product.id) ? "Added" : "Add"}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop Grid View */}
        <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 sm:gap-5 md:gap-6">
          {paginatedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.02 }}
              onClick={() => handleCardClick(product)}
              className="bg-surface-card rounded-lg shadow-sm hover:shadow-lg border border-hairline transition flex flex-col cursor-pointer"
            >
              <div className="w-full h-40 sm:h-44 md:h-48 bg-gray-100 overflow-hidden rounded-t-lg">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-4 sm:p-5 flex flex-col gap-2 flex-1">
                <span className="text-xs uppercase tracking-wide text-ink  bg-primary text-on-primary/30 border border-gray-400 rounded-md px-2 py-1 w-fit">
                  {product.mainCategory}
                </span>
                <h3 className="text-lg sm:text-xl  text-ink leading-tight line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-sm text-ink  line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-base sm:text-lg  text-green-500  ">
                    Price: AED {product.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <motion.button
                    onClick={(e) => handleAddToQuote(product, e)}
                    disabled={isInQuote(product.id)}
                    className={`relative w-full py-3 sm:py-3.5 rounded-lg  font-semibold text-sm sm:text-base overflow-hidden mt-2 ${isInQuote(product.id)
                        ? "bg-surface-card text-muted cursor-not-allowed border border-hairline"
                        : "bg-primary text-on-primary hover:bg-green-600 border border-green-600 text-ink shadow-lg"
                      }`}
                    whileHover="hover"
                    initial="default"
                    variants={{
                      default: {},
                      hover: {},
                    }}
                  >
                    {isInQuote(product.id) ? (
                      "Added to Quote"
                    ) : (
                      <>
                        {/* Text - Translates out on hover */}
                        <motion.span
                          className="inline-block"
                          variants={{
                            default: { opacity: 1, y: 0 },
                            hover: { opacity: 0, y: -20 },
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          Add to Quote
                        </motion.span>
                        {/* Cart Icon - Translates in on hover */}
                        <motion.span
                          className="absolute inset-0 flex items-center justify-center"
                          variants={{
                            default: { opacity: 0, y: 20 },
                            hover: { opacity: 1, y: 0 },
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <BsCart4 className="text-lg sm:text-xl" />
                        </motion.span>
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
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

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-100"
            />
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, type: "spring", damping: 25 }}
              className="fixed inset-0 z-101 flex items-center justify-center p-4 sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-canvas rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-hairline shadow-2xl flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-hairline">
                  <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink font-semibold">
                    Product Details
                  </h2>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-surface-card rounded-full transition-colors"
                    aria-label="Close modal"
                  >
                    <FiX className="h-6 w-6 text-body" />
                  </button>
                </div>

                {/* Content */}
                <div className="overflow-y-auto flex-1 p-4 sm:p-6">
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Image Section */}
                    <div className="w-full lg:w-1/2">
                      <div className="w-full h-64 sm:h-80 lg:h-96 bg-gray-100 rounded-xl overflow-hidden">
                        <img
                          src={selectedProduct.image}
                          alt={selectedProduct.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Details Section */}
                    <div className="w-full lg:w-1/2 flex flex-col gap-4">
                      {/* Category Badge */}
                      <span className="text-xs uppercase tracking-wide text-ink  bg-primary text-on-primary/30 border border-gray-400 rounded-md px-3 py-1.5 w-fit">
                        {selectedProduct.mainCategory}
                      </span>

                      {/* Title */}
                      <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink font-semibold leading-tight">
                        {selectedProduct.title}
                      </h3>

                      {/* Price */}
                      <div className="flex items-center gap-3">
                        <span className="text-xl sm:text-2xl font-bold text-green-700 ">
                          Price: AED {selectedProduct.price.toFixed(2)}
                        </span>
                      </div>

                      {/* Description */}
                      <div className="mt-2">
                        <h4 className="text-lg  font-semibold text-ink mb-2">
                          Description
                        </h4>
                        <p className="text-base sm:text-lg text-body  leading-relaxed">
                          {selectedProduct.description}
                        </p>
                      </div>

                      {/* Product ID */}
                      {/* <div className="mt-2">
                        <h4 className="text-sm  font-semibold text-muted mb-1">
                          Product ID
                        </h4>
                        <p className="text-sm text-zinc-500 ">
                          {selectedProduct.id}
                        </p>
                      </div> */}

                      {/* Action Buttons */}
                      <div className="mt-4 flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={(e) => {
                            handleAddToQuote(selectedProduct, e);
                            if (!isInQuote(selectedProduct.id)) {
                              setTimeout(() => closeModal(), 500);
                            }
                          }}
                          disabled={isInQuote(selectedProduct.id)}
                          className={`flex-1 py-3 px-6 rounded-lg  font-semibold text-base transition ${isInQuote(selectedProduct.id)
                              ? "bg-gray-300 text-ink cursor-not-allowed"
                              : "bg-primary text-on-primary border border-gray-400 text-ink hover:bg-green-800"
                            }`}
                        >
                          {isInQuote(selectedProduct.id)
                            ? "Added to Quote"
                            : "Add to Quote"}
                        </button>
                        <button
                          onClick={closeModal}
                          className="flex-1 py-3 px-6 rounded-lg  font-semibold text-base bg-surface-card border border-hairline text-ink hover:bg-surface-card transition"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProductGrid;
