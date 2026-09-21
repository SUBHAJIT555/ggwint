"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
  FiX,
  FiShoppingCart,
} from "react-icons/fi";
import type { Product } from "../../data/products";
import { products } from "../../data/products";
import { useQuote } from "../../hooks/useQuote";
import { BsCart4 } from "react-icons/bs";

interface FeaturedProductProps {
  sectionLabel?: string;
  heading: string;
  headingHighlightStart?: number;
  subHeading?: string;
  highlightWord?: string;
  autoPlayInterval?: number;
  itemsPerView?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  numberOfProducts?: number;
  exploreButtonText?: string;
  exploreButtonLink?: string;
}

const FeaturedProduct = ({
  sectionLabel = "Featured Products",
  heading,
  headingHighlightStart = 15,
  subHeading,
  highlightWord,
  autoPlayInterval = 4000,
  itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 5,
  },
  numberOfProducts = 12,
  exploreButtonText = "View All Products",
  exploreButtonLink = "/products",
}: FeaturedProductProps) => {
  const router = useRouter();
  const { addToQuote, isInQuote } = useQuote();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(5);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<number | null>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [shuffledProducts, setShuffledProducts] = useState<Product[]>(() =>
    products.slice(0, numberOfProducts)
  );

  useEffect(() => {
    setShuffledProducts([...products].sort(() => Math.random() - 0.5));
  }, []);

  const featuredProducts = useMemo(() => {
    return shuffledProducts.slice(0, numberOfProducts);
  }, [numberOfProducts, shuffledProducts]);

  // Calculate items to show based on screen size
  useEffect(() => {
    let timeoutId: number;
    const updateItemsToShow = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        const width = window.innerWidth;
        if (width < 640) {
          setItemsToShow(itemsPerView.mobile || 1);
        } else if (width < 1024) {
          setItemsToShow(itemsPerView.tablet || 2);
        } else {
          // Desktop: always show 5 cards
          setItemsToShow(5);
        }
        setCurrentIndex(0);
      }, 100);
    };

    updateItemsToShow();
    window.addEventListener("resize", updateItemsToShow);
    return () => {
      window.removeEventListener("resize", updateItemsToShow);
      clearTimeout(timeoutId);
    };
  }, [itemsPerView]);

  // Auto-play functionality
  useEffect(() => {
    if (
      autoPlayInterval > 0 &&
      featuredProducts.length > itemsToShow &&
      isInView
    ) {
      autoPlayRef.current = window.setInterval(() => {
        setCurrentIndex((prev) => {
          const maxIndex = Math.max(0, featuredProducts.length - itemsToShow);
          return prev >= maxIndex ? 0 : prev + 1;
        });
      }, autoPlayInterval);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoPlayInterval, featuredProducts.length, itemsToShow, isInView]);

  const maxIndex = Math.max(0, featuredProducts.length - itemsToShow);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

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
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [selectedProduct, closeModal]);

  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleAddToQuote = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isInQuote(product.id)) {
      addToQuote(product, 1);
    }
  };

  const renderSubHeading = () => {
    if (!subHeading) return null;
    if (!highlightWord) {
      return (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-muted text-base sm:text-lg md:text-xl lg:text-2xl  tracking-wide max-w-4xl leading-relaxed"
        >
          {subHeading}
        </motion.p>
      );
    }

    const parts = subHeading.split(highlightWord);
    return (
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-muted text-base sm:text-lg md:text-xl lg:text-2xl  tracking-wide max-w-4xl leading-relaxed"
      >
        {parts[0]}
        <span className="text-ink">{highlightWord}</span>
        {parts[1]}
      </motion.p>
    );
  };

  return (
    <section
      ref={containerRef}
      className="relative bg-canvas text-ink px-4 sm:px-6 md:px-8 lg:px-16 py-16 sm:py-20 md:py-28 overflow-hidden"
    >
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Floating Gradient Orbs */}
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-40 right-20 w-125 h-125 bg-cyan-500/10 rounded-full blur-[150px]"
      />
      <motion.div
        animate={{ y: [0, 40, 0], x: [0, -30, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-10 w-100 h-100 bg-purple-500/10 rounded-full blur-[120px]"
      />

      <div className="relative max-w-400 mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <motion.span
              initial={{ width: 0 }}
              animate={isInView ? { width: 60 } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-px bg-ink"
            />
            <span className="text-ink text-xs sm:text-sm tracking-[0.4em]  uppercase">
              {sectionLabel}
            </span>
          </div>

          <motion.h2
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight font-light mb-6 leading-tight"
          >
            {heading.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.4,
                      delay: index * 0.03,
                      ease: [0.215, 0.61, 0.355, 1],
                    },
                  },
                }}
                className={`inline-block ${index >= headingHighlightStart
                  ? "bg-linear-to-r from-ink via-ink to-ink bg-clip-text text-transparent  font-semibold tracking-tight"
                  : "text-ink"
                  }`}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h2>

          {renderSubHeading()}
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Carousel */}
          <div className="overflow-hidden rounded-2xl sm:rounded-3xl">
            <motion.div
              ref={carouselRef}
              className="flex -ml-2 sm:-ml-3 md:-ml-3"
              animate={{
                x: `calc(-${currentIndex * (100 / itemsToShow)}%)`,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 0.8,
              }}
            >
              {featuredProducts.map((product) => {
                const cardWidth = `${100 / itemsToShow}%`;

                return (
                  <div
                    key={product.id}
                    className="shrink-0 pl-2 sm:pl-3 md:pl-3"
                    style={{
                      width: cardWidth,
                      flexBasis: cardWidth,
                    }}
                  >
                    <div
                      className="bg-canvas rounded-xl sm:rounded-2xl overflow-hidden border border-hairline hover:border-hairline transition-all duration-300 flex flex-col cursor-pointer h-full group shadow-lg"
                      onClick={() => handleCardClick(product)}
                    >
                      {/* Product Image Container */}
                      <div className="relative w-full h-40 sm:h-44 md:h-48 overflow-hidden bg-zinc-900">
                        {/* Image */}
                        <img
                          src={product.image}
                          alt={product.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />

                        {/* Category Badge */}
                        <div className="absolute top-3 left-3 z-20">
                          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-ink font-semibold bg-surface-card border border-hairline rounded-pill px-3 py-1.5">
                            {product.mainCategory}
                          </span>
                        </div>
                      </div>

                      {/* Product Content */}
                      <div className="p-3 sm:p-4 flex flex-col gap-2 flex-1 bg-canvas">
                        {/* Title */}
                        <h3 className="text-lg sm:text-xl  font-semibold text-ink leading-tight line-clamp-2">
                          {product.title}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-muted  leading-relaxed line-clamp-2 flex-1">
                          {product.description}
                        </p>
                        <div className="w-full h-px bg-zinc-600"></div>

                        {/* Price */}
                        <div className="flex flex-col gap-1">
                          <span className="text-xs text-body  uppercase tracking-wider">
                            Price
                          </span>
                          <span className="text-lg sm:text-xl text-ink  font-semibold">
                            AED {product.price.toFixed(2)}
                          </span>
                        </div>

                        {/* Action Button */}
                        <motion.button
                          onClick={(e) => handleAddToQuote(product, e)}
                          disabled={isInQuote(product.id)}
                          className={`relative w-full py-3 sm:py-3.5 rounded-lg  font-semibold text-sm sm:text-base overflow-hidden mt-2 ${isInQuote(product.id)
                            ? "bg-zinc-700 text-muted cursor-not-allowed border border-hairline"
                            : "bg-primary active:bg-primary-active text-on-primary shadow-card"
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
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Bottom Controls */}
          <div className="mt-8 sm:mt-10">
            {/* Mobile: Dots on Top */}
            {featuredProducts.length > itemsToShow && (
              <div className="flex sm:hidden items-center justify-center gap-1.5 mb-4">
                {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`transition-all duration-300 rounded-full ${currentIndex === index
                      ? "w-6 h-1.5 bg-ink"
                      : "w-1.5 h-1.5 bg-zinc-600 hover:bg-zinc-500"
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Mobile: Navigation (Left) | Explore Button (Right) | Desktop: Explore (Left) | Dots (Middle) | Navigation (Right) */}
            <div className="flex flex-row items-center justify-between gap-4">
              {/* Mobile: Navigation Arrows - Left | Desktop: Explore Button - Left */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Mobile: Navigation */}
                {featuredProducts.length > itemsToShow && (
                  <div className="flex sm:hidden items-center gap-2">
                    <motion.button
                      onClick={goToPrev}
                      disabled={currentIndex === 0}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${currentIndex === 0
                        ? "bg-surface-card/50 border border-hairline text-zinc-600 cursor-not-allowed"
                        : "bg-surface-card/80 backdrop-blur-sm border border-hairline hover:border-zinc-400/50 hover:bg-zinc-400/10 text-body hover:text-muted shadow-lg hover:shadow-zinc-400/20"
                        }`}
                      aria-label="Previous"
                    >
                      <FiArrowLeft className="text-lg" />
                    </motion.button>
                    <motion.button
                      onClick={goToNext}
                      disabled={currentIndex >= maxIndex}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${currentIndex >= maxIndex
                        ? "bg-surface-card/50 border border-hairline text-zinc-600 cursor-not-allowed"
                        : "bg-surface-card/80 backdrop-blur-sm border border-hairline hover:border-zinc-400/50 hover:bg-zinc-400/10 text-body hover:text-muted shadow-lg hover:shadow-zinc-400/20"
                        }`}
                      aria-label="Next"
                    >
                      <FiArrowRight className="text-lg" />
                    </motion.button>
                  </div>
                )}

                {/* Desktop: Explore Button */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="hidden sm:block"
                >
                  <motion.button
                    onClick={() => router.push(exploreButtonLink)}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-3 bg-zinc-400/10 hover:bg-zinc-400/20 border border-zinc-400/30 hover:border-zinc-400/50 text-muted  font-medium text-sm sm:text-base tracking-wider rounded-xl transition-all duration-300 group/btn cursor-pointer backdrop-blur-sm shadow-lg shadow-zinc-400/20"
                  >
                    <span>{exploreButtonText}</span>
                    <span className="w-8 h-8 rounded-lg bg-zinc-400/20 flex items-center justify-center group-hover/btn:bg-zinc-400/30 transition-colors">
                      <FiArrowUpRight className="text-base group-hover/btn:rotate-45 transition-transform duration-300" />
                    </span>
                  </motion.button>
                </motion.div>
              </div>

              {/* Desktop: Dots Indicator - Middle */}
              {featuredProducts.length > itemsToShow && (
                <div className="hidden sm:flex items-center justify-center gap-2 flex-1">
                  {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`transition-all duration-300 rounded-full ${currentIndex === index
                        ? "w-8 h-2 bg-ink"
                        : "w-2 h-2 bg-zinc-600 hover:bg-zinc-500"
                        }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Mobile: Explore Button - Right | Desktop: Navigation Arrows - Right */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Mobile: Explore Button */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="block sm:hidden"
                >
                  <motion.button
                    onClick={() => router.push(exploreButtonLink)}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-zinc-400/10 hover:bg-zinc-400/20 border border-zinc-400/30 hover:border-zinc-400/50 text-muted  font-medium text-sm tracking-wider rounded-xl transition-all duration-300 group/btn cursor-pointer backdrop-blur-sm shadow-lg shadow-zinc-400/20"
                  >
                    <span>{exploreButtonText}</span>
                    <span className="w-7 h-7 rounded-lg bg-zinc-400/20 flex items-center justify-center group-hover/btn:bg-zinc-400/30 transition-colors">
                      <FiArrowUpRight className="text-sm group-hover/btn:rotate-45 transition-transform duration-300" />
                    </span>
                  </motion.button>
                </motion.div>

                {/* Desktop: Navigation Arrows */}
                {featuredProducts.length > itemsToShow && (
                  <div className="hidden sm:flex items-center gap-3">
                    <motion.button
                      onClick={goToPrev}
                      disabled={currentIndex === 0}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 ${currentIndex === 0
                        ? "bg-surface-card/50 border border-hairline text-zinc-600 cursor-not-allowed"
                        : "bg-surface-card/80 backdrop-blur-sm border border-hairline hover:border-zinc-400/50 hover:bg-zinc-400/10 text-body hover:text-muted shadow-lg hover:shadow-zinc-400/20"
                        }`}
                      aria-label="Previous"
                    >
                      <FiArrowLeft className="text-xl sm:text-2xl" />
                    </motion.button>
                    <motion.button
                      onClick={goToNext}
                      disabled={currentIndex >= maxIndex}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 ${currentIndex >= maxIndex
                        ? "bg-surface-card/50 border border-hairline text-zinc-600 cursor-not-allowed"
                        : "bg-surface-card/80 backdrop-blur-sm border border-hairline hover:border-zinc-400/50 hover:bg-zinc-400/10 text-body hover:text-muted shadow-lg hover:shadow-zinc-400/20"
                        }`}
                      aria-label="Next"
                    >
                      <FiArrowRight className="text-xl sm:text-2xl" />
                    </motion.button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Product Detail Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={closeModal}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-100"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, type: "spring", damping: 25 }}
                className="fixed inset-0 z-101 flex items-center justify-center p-4 sm:p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-zinc-900 rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-zinc-700 shadow-2xl flex flex-col">
                  <div className="flex items-center justify-between p-4 sm:p-6 border-b border-zinc-700">
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
                  <div className="overflow-y-auto flex-1 p-4 sm:p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="w-full lg:w-1/2">
                        <div className="w-full h-64 sm:h-80 lg:h-96 bg-gray-100 rounded-xl overflow-hidden">
                          <img
                            src={selectedProduct.image}
                            alt={selectedProduct.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-1/2 flex flex-col gap-4">
                        <span className="text-xs uppercase tracking-wide text-ink  bg-cyan-500/20 border border-cyan-400/40 rounded-full px-4 py-1.5 w-fit">
                          {selectedProduct.mainCategory}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-ink font-semibold leading-tight">
                          {selectedProduct.title}
                        </h3>
                        <div className="flex items-center gap-3">
                          <span className="text-xl sm:text-2xl font-bold text-green-600 ">
                            Price: AED {selectedProduct.price.toFixed(2)}
                          </span>
                        </div>
                        <div className="mt-2">
                          <h4 className="text-lg  font-semibold text-ink mb-2">
                            Description
                          </h4>
                          <p className="text-base sm:text-lg text-body  leading-relaxed">
                            {selectedProduct.description}
                          </p>
                        </div>
                        <div className="mt-4 flex flex-col sm:flex-row gap-3">
                          <button
                            onClick={(e) => {
                              handleAddToQuote(selectedProduct, e);
                              if (!isInQuote(selectedProduct.id)) {
                                setTimeout(() => closeModal(), 500);
                              }
                            }}
                            disabled={isInQuote(selectedProduct.id)}
                            className={`flex-1 py-3 px-6 rounded-lg  font-semibold text-base transition flex items-center justify-center gap-2 ${isInQuote(selectedProduct.id)
                              ? "bg-zinc-700 text-muted cursor-not-allowed"
                              : "bg-primary active:bg-primary-active text-on-primary"
                              }`}
                          >
                            <FiShoppingCart />
                            {isInQuote(selectedProduct.id)
                              ? "Added to Quote"
                              : "Add to Quote"}
                          </button>
                          <button
                            onClick={closeModal}
                            className="flex-1 py-3 px-6 rounded-lg  font-semibold text-base bg-surface-card border border-hairline text-ink hover:bg-zinc-700 transition"
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
      </div>
    </section>
  );
};

export default FeaturedProduct;
