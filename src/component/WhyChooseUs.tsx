"use client";

import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState } from "react";
import { FiCheck, FiArrowRight, FiPlus, FiMinus } from "react-icons/fi";
import { useCallbackModalStore } from "../store/callbackModalStore";

import { toSrc } from "../lib/toSrc";
import whyChooseUsImage from "../assets/images/Home-page-images/WhyChooseUs.webp";

interface FeaturePoint {
  id: number;
  title: string;
  description: string;
}

const features: FeaturePoint[] = [
  {
    id: 1,
    title: "Dubai-Based Operations",
    description:
      "Regional market knowledge with deep understanding of UAE and GCC business landscapes.",
  },
  {
    id: 2,
    title: "Single Trusted Vendor",
    description:
      "Multiple services under one roof - events, printing, gifts, and trading solutions.",
  },
  {
    id: 3,
    title: "Consistent Quality",
    description:
      "Professional execution with meticulous attention to detail on every project.",
  },
  {
    id: 4,
    title: "Custom Solutions",
    description:
      "Tailored approaches designed specifically for your unique business needs.",
  },
  {
    id: 5,
    title: "Reliable Delivery",
    description:
      "Dependable sourcing and timely delivery you can count on every time.",
  },
];

const AccordionItem = ({
  feature,
  index,
  isOpen,
  onToggle,
}: {
  feature: FeaturePoint;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="relative"
    >
      {/* Accordion Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 sm:gap-5 py-5 sm:py-6 border-b border-hairline cursor-pointer group text-left"
      >
        {/* Number */}
        <motion.span
          className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center  font-bold text-sm sm:text-base transition-all duration-300"
          animate={{
            backgroundColor: isOpen
              ? "rgba(17, 17, 17, 0.06)"
              : "rgba(245, 245, 245, 1)",
            borderColor: isOpen
              ? "rgba(17, 17, 17, 0.2)"
              : "rgba(229, 231, 235, 1)",
          }}
          style={{ border: "1px solid" }}
        >
          <span
            className={`transition-colors duration-300 ${isOpen ? "text-ink" : "text-ink/50"
              }`}
          >
            0{feature.id}
          </span>
        </motion.span>

        {/* Title */}
        <motion.h4
          className={`flex-1 text-lg sm:text-xl  font-semibold tracking-wide transition-colors duration-300 ${isOpen ? "text-ink" : "text-ink group-hover:text-ink/80"
            }`}
        >
          {feature.title}
        </motion.h4>

        {/* Toggle Icon */}
        <motion.div
          className={`shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen
            ? "border-cyan-400/50 bg-ink/10"
            : "border-hairline bg-white/5 group-hover:border-white/30"
            }`}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <FiMinus
              className={`text-sm sm:text-base ${isOpen ? "text-ink" : "text-ink/60"
                }`}
            />
          ) : (
            <FiPlus className="text-sm sm:text-base text-ink/60 group-hover:text-ink" />
          )}
        </motion.div>
      </button>

      {/* Accordion Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="py-4 sm:py-5 pl-14 sm:pl-17 pr-4">
              {/* Check Icon with Description */}
              <div className="flex gap-3 items-start">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="shrink-0 w-5 h-5 rounded-full bg-ink/20 flex items-center justify-center mt-0.5"
                >
                  <FiCheck className="text-ink text-xs" />
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                  className="text-body text-sm sm:text-base  tracking-wide leading-relaxed"
                >
                  {feature.description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Indicator Line */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-ink to-ink"
        initial={{ width: "0%" }}
        animate={{ width: isOpen ? "100%" : "0%" }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
};

const WhyChooseUs = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default
  const { openModal } = useCallbackModalStore();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={containerRef}
      className="relative bg-canvas py-16 sm:py-20 md:py-28 lg:py-32 overflow-hidden screen-line-top"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      {/* Floating Gradient Orbs */}
      <motion.div
        style={{ y }}
        className="absolute top-32 left-20 w-112.5 h-112.5 bg-purple-500/10 rounded-full blur-[140px]"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-60, 100]) }}
        className="absolute bottom-40 right-10 w-87.5 h-87.5 bg-cyan-500/10 rounded-full blur-[120px]"
      />

      <div className="relative max-w-400 mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24 items-center">
          {/* Left Column - Image */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="relative order-2 lg:order-1"
          >
            {/* Main Image Container */}
            <motion.div
              style={{ y: imageY }}
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-4/5 sm:aspect-3/4">
                <img
                  src={toSrc(whyChooseUsImage)}
                  alt="Team collaboration"
                  className="w-full h-full object-cover"
                />

                {/* Floating Stats Card */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                  }
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-hairline">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-2xl sm:text-3xl font-bold font-semibold tracking-tight bg-linear-to-r from-ink to-ink bg-clip-text text-transparent">
                          10+
                        </div>
                        <div className="text-ink text-xs sm:text-sm  tracking-wide">
                          Years Experience
                        </div>
                      </div>
                      <div className="h-12 w-px bg-white/20" />
                      <div>
                        <div className="text-2xl sm:text-3xl font-bold font-semibold tracking-tight bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                          99 %
                        </div>
                        <div className="text-ink text-xs sm:text-sm  tracking-wide">
                          Satisfaction Rate
                        </div>
                      </div>
                      <div className="h-12 w-px bg-white/20 hidden sm:block" />
                      <div className="hidden sm:block">
                        <div className="text-2xl sm:text-3xl font-bold font-semibold tracking-tight bg-linear-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
                          GCC
                        </div>
                        <div className="text-ink text-xs sm:text-sm  tracking-wide">
                          Region Coverage
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Content */}
          <div className="order-1 lg:order-2">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-6"
            >
              <motion.span
                initial={{ width: 0 }}
                animate={isInView ? { width: 60 } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-px bg-ink"
              />
              <span className="text-ink text-xs sm:text-sm tracking-[0.4em]  uppercase">
                Why Choose Us
              </span>
            </motion.div>

            {/* Title */}
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="mb-8 sm:mb-10"
            >
              <motion.h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-semibold tracking-tight font-light text-ink leading-tight">
                {"Why work with".split("").map((char, index) => (
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
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.h2>
              <motion.h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl  leading-tight font-semibold">
                {" GGW International ?".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 40 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.4,
                          delay: 0.3 + index * 0.03,
                          ease: [0.215, 0.61, 0.355, 1],
                        },
                      },
                    }}
                    className="inline-block tracking-tight bg-linear-to-r from-ink via-ink to-ink bg-clip-text text-transparent"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </motion.h2>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-ink text-base sm:text-lg  tracking-wide leading-relaxed mb-8 sm:mb-10"
            >
              Partner with a team that understands your vision and delivers
              results. We bring expertise, reliability, and a commitment to
              excellence in every project.
            </motion.p>

            {/* Accordion Features List */}
            <div className="space-y-0">
              {features.map((feature, index) => (
                <AccordionItem
                  key={feature.id}
                  feature={feature}
                  index={index}
                  isOpen={openIndex === index}
                  onToggle={() => handleToggle(index)}
                />
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-10 sm:mt-12"
            >
              <motion.button
                onClick={openModal}
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.98 }}
                className="group flex items-center gap-4  tracking-wider text-sm sm:text-base uppercase cursor-pointer"
              >
                <span className="relative text-ink">
                  Get Started Today
                  <motion.span
                    className="absolute -bottom-1 left-0 h-px bg-linear-to-r from-ink to-ink"
                    initial={{ width: "0%" }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </span>
                <motion.span
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-hairline flex items-center justify-center group-hover:bg-linear-to-r group-hover:from-cyan-400/20 group-hover:to-purple-400/20 group-hover:border-cyan-400/50 transition-all duration-300"
                  whileHover={{ rotate: -45 }}
                >
                  <FiArrowRight className="text-ink text-lg" />
                </motion.span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
