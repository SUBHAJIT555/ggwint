"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { IoLogoWhatsapp } from "react-icons/io";

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface FAQProps {
  sectionLabel?: string;
  heading: string;
  headingHighlightStart?: number; // Index where gradient text starts
  subHeading?: string;
  highlightWord?: string; // Word to highlight in subheading
  faqItems: FAQItem[];
  whatsappNumber?: string;
  whatsappMessage?: string;
  chatPrompt?: string;
  chatButtonText?: string;
  defaultExpandedId?: number; // ID of FAQ item to expand by default
  showSearch?: boolean;
  searchPlaceholder?: string;
}

const FAQ = ({
  sectionLabel = "FAQ",
  heading,
  headingHighlightStart = 10,
  subHeading,
  highlightWord,
  faqItems,
  whatsappNumber = "+97142712771",
  whatsappMessage = "Hello! I have a question about GGW International's products.",
  chatPrompt = "Can't find what you are looking for?",
  chatButtonText = "We would like to chat with you.",
  defaultExpandedId,
  showSearch = true,
  searchPlaceholder = "What are you looking for?",
}: FAQProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedItems, setExpandedItems] = useState<number[]>(
    defaultExpandedId ? [defaultExpandedId] : []
  );

  const filteredFAQs = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleItem = (id: number) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [id]
    );
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
    <section className="bg-canvas text-ink py-16 sm:py-20 md:py-28 screen-line-top">
      <div className="max-w-400 mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <motion.span
              initial={{ width: 0 }}
              whileInView={{ width: 60 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-px bg-ink"
            />
            <span className="text-ink text-xs sm:text-sm tracking-[0.4em]  uppercase">
              {sectionLabel}
            </span>
          </div>

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight font-light mb-6 leading-tight"
          >
            {heading.split(" ").map((word, wordIndex) => {
              let charCount = 0;
              for (let i = 0; i < wordIndex; i++) {
                charCount += heading.split(" ")[i].length + 1; // +1 for space
              }

              return (
                <span
                  key={wordIndex}
                  className="inline-block whitespace-nowrap"
                >
                  {word.split("").map((char, charIndex) => {
                    const globalIndex = charCount + charIndex;
                    return (
                      <motion.span
                        key={`${wordIndex}-${charIndex}`}
                        variants={{
                          hidden: { opacity: 0, y: 40 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                              duration: 0.4,
                              delay: globalIndex * 0.03,
                              ease: [0.215, 0.61, 0.355, 1],
                            },
                          },
                        }}
                        className={`inline-block ${globalIndex >= headingHighlightStart
                          ? "bg-linear-to-r from-ink via-ink to-ink bg-clip-text text-transparent  font-semibold tracking-tight"
                          : "text-ink"
                          }`}
                      >
                        {char}
                      </motion.span>
                    );
                  })}
                  {wordIndex < heading.split(" ").length - 1 && (
                    <span className="inline-block">&nbsp;</span>
                  )}
                </span>
              );
            })}
          </motion.h2>

          {renderSubHeading()}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left Column - Chat Prompt */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 order-2 lg:order-1"
          >
            <div className="space-y-6 sm:space-y-8">
              <p className="text-ink text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight font-light leading-relaxed">
                {chatPrompt}
              </p>
              <motion.a
                href={`https://wa.me/${whatsappNumber.replace(
                  /[^0-9]/g,
                  ""
                )}?text=${encodeURIComponent(whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-4 group cursor-pointer"
              >
                <p className="text-ink  font-medium text-base sm:text-lg md:text-xl tracking-wide group-hover:text-ink transition-colors duration-300">
                  {chatButtonText}
                </p>
                <div className="shrink-0">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl  flex items-center justify-center transition-all duration-300">
                    <IoLogoWhatsapp className="text-ink text-xl sm:text-2xl md:text-3xl" />
                  </div>
                </div>
              </motion.a>
            </div>
          </motion.div>

          {/* Right Column - FAQ Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3 order-1 lg:order-2 space-y-6"
          >
            {/* Search Bar */}
            {showSearch && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-muted"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 sm:py-4 border-0 border-b-2 border-hairline focus:border-ink focus:outline-none text-sm sm:text-base text-ink placeholder:text-muted bg-transparent  transition-colors duration-300"
                />
              </div>
            )}

            {/* FAQ Items */}
            <div className="space-y-2 sm:space-y-4">
              {filteredFAQs.map((item) => {
                const isExpanded = expandedItems.includes(item.id);
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: item.id * 0.05 }}
                    className="border-b border-hairline"
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className="w-full py-4 sm:py-5 flex items-center justify-between text-left focus:outline-none group"
                    >
                      <span
                        className={` font-medium text-sm sm:text-base md:text-lg pr-4 transition-colors duration-300 ${isExpanded
                          ? "text-ink"
                          : "text-ink group-hover:text-ink"
                          }`}
                      >
                        {item.question}
                      </span>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="shrink-0"
                      >
                        <FiChevronDown
                          className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 ${isExpanded
                            ? "text-ink"
                            : "text-muted group-hover:text-ink"
                            }`}
                        />
                      </motion.div>
                    </button>

                    <motion.div
                      initial={false}
                      animate={{
                        height: isExpanded ? "auto" : 0,
                        opacity: isExpanded ? 1 : 0,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pb-4 sm:pb-5">
                        <p className="text-muted text-sm sm:text-base md:text-lg  leading-relaxed tracking-wide">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* No results message */}
            {filteredFAQs.length === 0 && searchTerm && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 sm:py-12"
              >
                <p className="text-muted text-sm sm:text-base ">
                  No questions found matching "{searchTerm}"
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
