"use client";

import { useRef, useState } from "react";
import { Parallax } from "react-parallax";
import {
  motion,
  useInView,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { AiTwotoneStar } from "react-icons/ai";
import { AiTwotoneEye } from "react-icons/ai";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FiShield } from "react-icons/fi";
import { AiOutlineClockCircle } from "react-icons/ai";

import type { IconType } from "react-icons";
import { toSrc, type ImageSource } from "../lib/toSrc";

import coreValueBackgroundImage from "../assets/images/About-page-images/OurCoreValues.webp"
import qualityImage from "../assets/images/About-page-images/QualityandConsistency.webp";
import transparencyImage from "../assets/images/About-page-images/TransparencyandTrust.webp";
import customerFocusedImage from "../assets/images/About-page-images/Customer-FocusedService.webp";
import ethicalTradingImage from "../assets/images/About-page-images/EthicalTradingPractices.webp";
import onTimeDeliveryImage from "../assets/images/About-page-images/On-TimeDelivery.webp";

interface CoreValue {
  id: number;
  title: string;
  description: string;
  image: ImageSource;
  icon: IconType;
}

const coreValues: CoreValue[] = [
  {
    id: 1,
    title: "Quality and Consistency.",
    description:
      "Delivering excellence in every project with unwavering standards.",
    image:
      qualityImage,
    icon: AiTwotoneStar,
  },
  {
    id: 2,
    title: "Transparency and Trust.",
    description:
      "Building lasting relationships through honest and open communication.",
    image:
      transparencyImage,
    icon: AiTwotoneEye,
  },
  {
    id: 3,
    title: "Customer-Focused Service.",
    description:
      "Putting our clients' needs at the center of everything we do.",
    image:
      customerFocusedImage,
    icon: AiOutlineUsergroupAdd,
  },
  {
    id: 4,
    title: "Ethical Trading Practices.",
    description: "Conducting business with integrity and responsibility.",
    image:
      ethicalTradingImage,
    icon: FiShield,
  },
  {
    id: 5,
    title: "On-Time Delivery.",
    description:
      "Meeting deadlines consistently without compromising on quality.",
    image:
      onTimeDeliveryImage,
    icon: AiOutlineClockCircle,
  },
];

const ValueItem = ({
  value,
  index,
  onHover,
  onMouseMove,
  onLeave,
}: {
  value: CoreValue;
  index: number;
  onHover: (image: ImageSource) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onLeave: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="group"
      onMouseEnter={() => onHover(value.image)}
      onMouseMove={onMouseMove}
      onMouseLeave={onLeave}
    >
      <div className="flex items-start gap-4 sm:gap-6 py-6 sm:py-8 border-b border-white/10 transition-colors duration-300 hover:border-white/20 cursor-pointer">
        {/* Number */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{
            duration: 0.4,
            delay: index * 0.1 + 0.2,
            type: "spring",
            stiffness: 200,
          }}
          className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-zinc-400/50 group-hover:bg-zinc-400/10 transition-all duration-300 backdrop-blur-sm"
        >
          {(() => {
            const IconComponent = value.icon;
            return (
              <IconComponent className="text-zinc-400 text-lg sm:text-xl" />
            );
          })()}
        </motion.div>

        {/* Content */}
        <div className="flex-1">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
            className="text-white text-lg sm:text-xl md:text-2xl font-poppins font-medium tracking-wide mb-2 group-hover:text-cyan-400 transition-colors duration-300"
          >
            {value.title}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
            className="text-zinc-200 text-sm sm:text-base font-poppins tracking-wide leading-relaxed"
          >
            {value.description}
          </motion.p>
        </div>

        {/* Number indicator */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
          className="hidden sm:block text-3xl sm:text-4xl font-poppins font-bold shrink-0"
          style={{
            WebkitTextStroke: "0.5px rgba(255,255,255,0.65)",
            color: "transparent",
          }}
        >
          0{value.id}
        </motion.span>
      </div>
    </motion.div>
  );
};

const CoreValues = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });

  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  // Motion values for smooth mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotate = useMotionValue(0);
  const scale = useMotionValue(1);

  // Elastic spring config - more bouncy for position
  const springConfig = { damping: 15, stiffness: 150, mass: 0.8 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // More responsive spring for rotation - follows velocity
  const rotateSpring = useSpring(rotate, { damping: 20, stiffness: 200 });
  const scaleSpring = useSpring(scale, { damping: 25, stiffness: 300 });

  // Track previous position for velocity calculation
  const prevX = useRef(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const currentX = e.clientX;
    const velocityX = currentX - prevX.current;

    mouseX.set(currentX + 20);
    mouseY.set(e.clientY - 80);

    // Rotate based on horizontal velocity (tilts in direction of movement)
    const rotationAmount = Math.max(-12, Math.min(12, velocityX * 0.5));
    rotate.set(rotationAmount);

    // Slight scale boost when moving fast
    const speed = Math.abs(velocityX);
    const scaleAmount = 1 + Math.min(0.05, speed * 0.002);
    scale.set(scaleAmount);

    prevX.current = currentX;
  };

  const handleHover = (image: ImageSource) => {
    setHoveredImage(toSrc(image));
    setIsHovering(true);
    // Reset rotation and scale on new hover
    rotate.set(0);
    scale.set(1);
  };

  const handleLeave = () => {
    setIsHovering(false);
    rotate.set(0);
    scale.set(1);
  };

  return (
    <Parallax
      bgImage={toSrc(coreValueBackgroundImage)}
      strength={300}
      bgImageStyle={{
        objectFit: "cover",
        width: "100%",
        height: "auto",
        minHeight: "100%",
      }}
    >
      <section
        ref={containerRef}
        className="relative py-20 sm:py-28 md:py-36 overflow-hidden screen-line-top"
      >
        {/* Light overlay */}
        <div className="absolute inset-0 bg-canvas/88" />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, #ffffff 0%, transparent 20%, transparent 80%, #ffffff 100%)`,
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to right, #ffffff 0%, transparent 15%, transparent 85%, #ffffff 100%)`,
          }}
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.01]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Mouse Following Image */}
        <AnimatePresence>
          {isHovering && hoveredImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{
                opacity: { duration: 0.25, ease: "easeOut" },
                scale: {
                  type: "spring",
                  damping: 12,
                  stiffness: 200,
                  mass: 0.8,
                },
              }}
              className="fixed pointer-events-none z-50 hidden lg:block"
              style={{
                left: springX,
                top: springY,
                rotate: rotateSpring,
                scale: scaleSpring,
              }}
            >
              <motion.div
                className="relative w-[240px] h-[160px] rounded-xl overflow-hidden"
                style={{
                  boxShadow:
                    "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(34, 211, 238, 0.1)",
                }}
              >
                <motion.img
                  key={hoveredImage}
                  src={hoveredImage}
                  alt="Value illustration"
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.3, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.2, opacity: 0 }}
                  transition={{
                    scale: { type: "spring", damping: 15, stiffness: 150 },
                    opacity: { duration: 0.2 },
                  }}
                />
                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-black/40" />
                {/* Border */}
                <div className="absolute inset-0 rounded-xl border border-zinc-400" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          {/* Section Header */}
          <div ref={headerRef} className="mb-12 sm:mb-16 md:mb-20">
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={
                isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-6"
            >
              <motion.span
                initial={{ width: 0 }}
                animate={isHeaderInView ? { width: 60 } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="h-px bg-cyan-400"
              />
              <span className="text-cyan-400 text-xs sm:text-sm tracking-[0.4em] font-poppins uppercase">
                What We Stand For
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial="hidden"
              animate={isHeaderInView ? "visible" : "hidden"}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-oswald font-light leading-tight"
            >
              {"Our Core ".split("").map((char, index) => (
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
                  className="inline-block text-zinc-200"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
              {"Values".split("").map((char, index) => (
                <motion.span
                  key={`highlight-${index}`}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.4,
                        delay: 0.27 + index * 0.03,
                        ease: [0.215, 0.61, 0.355, 1],
                      },
                    },
                  }}
                  className="inline-block bg-linear-to-r from-zinc-800 via-purple-400 to-zinc-200 bg-clip-text text-transparent font-poppins font-semibold tracking-tight"
                >
                  {char}
                </motion.span>
              ))}
            </motion.h2>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={
                isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-zinc-400 text-base sm:text-lg md:text-xl font-poppins tracking-wide mt-4 max-w-2xl"
            >
              The principles that guide our business and define who we are.
            </motion.p>
          </div>

          {/* Values List */}
          <div>
            {coreValues.map((value, index) => (
              <ValueItem
                key={value.id}
                value={value}
                index={index}
                onHover={handleHover}
                onMouseMove={handleMouseMove}
                onLeave={handleLeave}
              />
            ))}
          </div>
        </div>
      </section>
    </Parallax>
  );
};

export default CoreValues;
