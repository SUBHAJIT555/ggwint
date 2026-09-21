"use client";

import {
  motion,
  useInView,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import { toSrc, type ImageSource } from "../lib/toSrc";
import Button from "./ui/Button";
import eventManagementHoverImage from "../assets/images/Home-page-images/EventManagement-Hover.webp";
import printingServicesHoverImage from "../assets/images/Home-page-images/PrintingServices-Hover.webp";
import corporateGiftsHoverImage from "../assets/images/Home-page-images/CorporateGifts-Hover.webp";
import generalTradingHoverImage from "../assets/images/Home-page-images/GeneralTrading-Hover.webp";

const StatItem = ({
  stat,
  index,
}: {
  stat: { value: string; label: string };
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const parseValue = (value: string) => {
    const match = value.match(/(\d+)\s*([+\-%])?/);
    if (match) {
      return { number: parseInt(match[1]), symbol: match[2] || "" };
    }
    return { number: 0, symbol: "" };
  };
  const { number: numericValue, symbol } = parseValue(stat.value);
  const [displayValue, setDisplayValue] = useState<number>(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isInView || hasAnimated) return;
    let rafId: number;
    let startTimestamp: number | null = null;
    const duration = 1500;
    function animateCount(timestamp: number) {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = timestamp - startTimestamp;
      const percent = Math.min(progress / duration, 1);
      setDisplayValue(Math.floor(numericValue * percent));
      if (percent < 1) rafId = requestAnimationFrame(animateCount);
      else {
        setDisplayValue(numericValue);
        setHasAnimated(true);
      }
    }
    const timeoutId = setTimeout(() => {
      rafId = requestAnimationFrame(animateCount);
    }, 200 + index * 200);
    return () => {
      clearTimeout(timeoutId);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [numericValue, index, isInView, hasAnimated]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
    >
      <div className="text-display-sm font-semibold text-ink tracking-[-0.5px]">
        {displayValue}
        {symbol}
      </div>
      <div className="text-caption text-muted uppercase mt-1">{stat.label}</div>
    </motion.div>
  );
};

const AboutSnapshot = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotate = useMotionValue(0);
  const scale = useMotionValue(1);
  const springConfig = { damping: 15, stiffness: 150, mass: 0.8 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  const rotateSpring = useSpring(rotate, { damping: 20, stiffness: 200 });
  const scaleSpring = useSpring(scale, { damping: 25, stiffness: 300 });
  const prevX = useRef(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const currentX = e.clientX;
    const velocityX = currentX - prevX.current;
    mouseX.set(currentX + 20);
    mouseY.set(e.clientY - 80);
    rotate.set(Math.max(-12, Math.min(12, velocityX * 0.5)));
    scale.set(1 + Math.min(0.05, Math.abs(velocityX) * 0.002));
    prevX.current = currentX;
  };

  const handleHover = (image: ImageSource) => {
    setHoveredImage(toSrc(image));
    setIsHovering(true);
    rotate.set(0);
    scale.set(1);
  };

  const handleLeave = () => {
    setIsHovering(false);
    rotate.set(0);
    scale.set(1);
  };

  const services = [
    { name: "General Trading", number: "04", image: generalTradingHoverImage },
    { name: "Corporate Gifts Supply", number: "03", image: corporateGiftsHoverImage },
    { name: "Event Management", number: "01", image: eventManagementHoverImage },
    { name: "Printing Services", number: "02", image: printingServicesHoverImage },
  ];

  const stats = [
    { value: "10 +", label: "Years" },
    { value: "99 %", label: "Success" },
    { value: "200 +", label: "Clients" },
  ];

  return (
    <section ref={containerRef} className="relative bg-surface-card py-section overflow-hidden screen-line-top">
      <AnimatePresence>
        {isHovering && hoveredImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="fixed pointer-events-none z-50 hidden lg:block"
            style={{
              left: springX,
              top: springY,
              rotate: rotateSpring,
              scale: scaleSpring,
            }}
          >
            <div className="relative w-60 h-40 rounded-lg overflow-hidden border border-hairline shadow-lift">
              <img src={hoveredImage} alt="" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-caption text-muted uppercase mb-4"
        >
          About us
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-[32px] sm:text-display-md lg:text-display-lg font-semibold text-ink tracking-[-1.5px] leading-[1.1]"
        >
          Transforming trade into lasting partnerships
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12">
          <div className="lg:col-span-5">
            <p className="text-body-md text-body">
              GGW International is a Dubai-based general trading company
              connecting global markets with excellence, integrity, and
              innovation.
            </p>
            <p className="text-body-md text-body mt-4">
              From the heart of Dubai, we supply quality materials and products
              that help businesses grow across the UAE and international
              markets.
            </p>
            <div className="flex gap-8 mt-10">
              {stats.map((stat, i) => (
                <StatItem key={stat.label} stat={stat} index={i} />
              ))}
            </div>
            <div className="mt-10">
              <Button href="/about" variant="text-link">
                Discover more about us <FiArrowRight />
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="border-t border-hairline">
              {services.map((service) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  className="border-b border-hairline py-6 cursor-pointer"
                  onMouseEnter={() => handleHover(service.image)}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleLeave}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-muted text-title-md">{service.number}</span>
                    <h3 className="text-title-lg text-ink">{service.name}</h3>
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="mt-8 text-body-sm text-muted">
              Based in White Crown Building, Sheikh Zayed Road, Dubai, UAE · Serving global markets
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSnapshot;
