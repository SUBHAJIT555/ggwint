"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

import { toSrc, type ImageSource } from "../lib/toSrc";
import missionVisionImage from "../assets/images/About-page-images/OurMission.webp";
import futureVisionImage from "../assets/images/About-page-images/OurVision.webp";

interface SectionData {
  id: string;
  label: string;
  title: string;
  content: string;
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
  image: ImageSource;
}

const sections: SectionData[] = [
  {
    id: "mission",
    label: "OUR PURPOSE",
    title: "Our Mission",
    content:
      "To provide our customers with superior-quality, well engineered, and cost-effective materials that meet international industry standards.",
    accentColor: "cyan-400",
    gradientFrom: "from-zinc-800",
    gradientTo: "to-zinc-200",
    image:
      missionVisionImage,
  },
  {
    id: "vision",
    label: "OUR FUTURE",
    title: "Our Vision",
    content:
      "To become a globally recognized leader in supplying specialized engineering products to the construction and food industries.",
    accentColor: "purple-400",
    gradientFrom: "from-zinc-800",
    gradientTo: "to-zinc-200",
    image:
      futureVisionImage,
  },
];

const SectionCard = ({
  section,
  index,
  isReversed,
}: {
  section: SectionData;
  index: number;
  isReversed: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.95, 1, 0.95]
  );

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: isReversed ? 80 : -80 }}
      animate={
        isInView
          ? { opacity: 1, x: 0 }
          : { opacity: 0, x: isReversed ? 80 : -80 }
      }
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.4, 0, 0.2, 1],
      }}
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
        isReversed ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Content Side */}
      <div
        className={`${isReversed ? "lg:order-2" : "lg:order-1"} ${
          isReversed ? "lg:text-right" : "lg:text-left"
        }`}
      >
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
          className={`flex items-center gap-4 mb-6 ${
            isReversed ? "lg:justify-end" : "justify-start"
          }`}
        >
          {!isReversed && (
            <motion.span
              initial={{ width: 0 }}
              animate={isInView ? { width: 60 } : { width: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
              className="h-px"
              style={{
                backgroundColor:
                  section.accentColor === "cyan-400" ? "#22d3ee" : "#c084fc",
              }}
            />
          )}
          <span
            className="text-xs sm:text-sm tracking-[0.4em] font-poppins uppercase"
            style={{
              color: section.accentColor === "cyan-400" ? "#22d3ee" : "#c084fc",
            }}
          >
            {section.label}
          </span>
          {isReversed && (
            <motion.span
              initial={{ width: 0 }}
              animate={isInView ? { width: 60 } : { width: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
              className="h-px"
              style={{
                backgroundColor:
                  section.accentColor === "cyan-400" ? "#22d3ee" : "#c084fc",
              }}
            />
          )}
        </motion.div>

        {/* Title with Character Animation */}
        <motion.h2
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-oswald font-light mb-6 leading-tight"
        >
          {section.title.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.4,
                    delay: index * 0.2 + 0.3 + charIndex * 0.04,
                    ease: [0.215, 0.61, 0.355, 1],
                  },
                },
              }}
              className={`inline-block ${
                charIndex >= 4
                  ? `bg-linear-to-r ${section.gradientFrom} ${section.gradientTo} bg-clip-text text-transparent font-poppins font-semibold tracking-tight`
                  : "text-zinc-200"
              }`}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h2>

        {/* Content */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
          className="text-zinc-400 text-base sm:text-lg md:text-xl font-poppins tracking-wide leading-relaxed max-w-xl"
          style={{ marginLeft: isReversed ? "auto" : undefined }}
        >
          {section.content}
        </motion.p>

        {/* Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 + 0.7 }}
          className={`mt-8 h-0.5 bg-linear-to-r ${section.gradientFrom} ${
            section.gradientTo
          } max-w-50 ${
            isReversed ? "lg:ml-auto origin-right" : "origin-left"
          }`}
        />
      </div>

      {/* Image Side */}
      <div
        ref={imageRef}
        className={`${isReversed ? "lg:order-1" : "lg:order-2"}`}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
          className={`relative flex ${
            isReversed ? "lg:justify-start" : "lg:justify-end"
          } justify-center`}
        >
          {/* Image Container */}
          <motion.div
            style={{ y: imageY, scale: imageScale }}
            className="relative w-full max-w-125 overflow-hidden rounded-2xl sm:rounded-3xl"
          >
            {/* Image */}
            <div className="relative aspect-4/3 overflow-hidden">
              <img
                src={toSrc(section.image)}
                alt={section.title}
                className="w-full h-full object-cover"
              />

              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-transparent`}
              />

              {/* Corner Accent */}
              <div
                className={`absolute top-4 ${
                  isReversed ? "left-4" : "right-4"
                } w-12 h-12 border-t-2 ${
                  isReversed
                    ? "border-l-2 rounded-tl-xl"
                    : "border-r-2 rounded-tr-xl"
                }`}
                style={{
                  borderColor:
                    section.accentColor === "#ffffff" ? "#ffffff" : "#ffffff",
                }}
              />

              {/* Bottom Accent Line */}
            </div>

            {/* Border Frame */}
            <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border border-white/10 pointer-events-none" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const MissionVisionSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative bg-bg py-20 sm:py-28 md:py-36 overflow-hidden screen-line-top"
    >
      {/* Background Grid Pattern */}
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

      {/* Center Divider Line */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
        className="hidden lg:block absolute left-1/2 top-1/4 bottom-1/4 w-px bg-linear-to-b from-transparent via-white/10 to-transparent origin-top"
      />

      <div className="relative max-w-400 mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 md:mb-14 pb-4"
        >
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-oswald font-light leading-tight sm:leading-tight md:leading-tight"
          >
            {/* First Line */}
            <div className="mb-2 sm:mb-3">
              {"Where Ambition Takes Flight".split("").map((char, index) => {
                const highlightStart = "Where Ambition".length;
                return (
                  <motion.span
                    key={`line1-${index}`}
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
                    className={`inline-block ${
                      index >= highlightStart
                        ? "bg-linear-to-r from-zinc-800 via-purple-400 to-zinc-200 bg-clip-text text-transparent font-poppins font-semibold tracking-tight"
                        : "text-zinc-200"
                    }`}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                );
              })}
            </div>

            {/* Second Line */}
            <div>
              {"Purpose Becomes Action".split("").map((char, index) => {
                const highlightStart = "Purpose".length;
                return (
                  <motion.span
                    key={`line2-${index}`}
                    variants={{
                      hidden: { opacity: 0, y: 40 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.4,
                          delay: 0.5 + index * 0.03,
                          ease: [0.215, 0.61, 0.355, 1],
                        },
                      },
                    }}
                    className={`inline-block ${
                      index >= highlightStart
                        ? "bg-linear-to-r from-zinc-800 via-purple-400 to-zinc-200 bg-clip-text text-transparent font-poppins font-semibold tracking-tight"
                        : "text-zinc-200"
                    }`}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                );
              })}
            </div>
          </motion.h2>
        </motion.div>

        {/* Mission & Vision Cards */}
        <div className="space-y-24 sm:space-y-32 md:space-y-40">
          {sections.map((section, index) => (
            <SectionCard
              key={section.id}
              section={section}
              index={index}
              isReversed={index % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
