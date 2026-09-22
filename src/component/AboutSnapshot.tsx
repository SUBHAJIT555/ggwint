"use client";

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useState, type ComponentType } from "react";
import Link from "next/link";
import {
  FiAlertTriangle,
  FiArrowRight,
  FiBox,
  FiLayers,
  FiMonitor,
  FiSettings,
  FiShield,
  FiTool,
  FiZap,
} from "react-icons/fi";
import { IconFlask, IconPaint } from "@tabler/icons-react";
import { toSrc, type ImageSource } from "../lib/toSrc";
import Button from "./ui/Button";
import { categoryDetails, type MainCategory } from "../data/products";

type CategoryIcon = ComponentType<{ className?: string }>;

const categoryIcons: Record<MainCategory, CategoryIcon> = {
  "Construction Materials": FiLayers,
  "Food Products": FiBox,
  "Mechanical Tools": FiTool,
  "Construction and Safety": FiShield,
  "Paints and Finishes": IconPaint,
  "Water / Fire Proofing": FiAlertTriangle,
  Electronics: FiZap,
  "Auto Spare Parts": FiSettings,
  "IT Accessories": FiMonitor,
  Chemicals: IconFlask,
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

  const productHighlights = categoryDetails.map((category) => ({
    name: category.name,
    href: `/products/${category.slug}`,
    image: category.image,
    description: category.menuDescription,
    Icon: categoryIcons[category.name],
  }));

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
          className="text-section text-ink"
        >
          Reliable supply solutions across the UAE
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mt-8 space-y-4"
        >
          <p className="text-copy text-body">
            We are specialized in the international trading of steel, MEP
            products, construction materials, IT Products & Solutions, Food
            Stuff, Food Additives, Chemicals, AGRO & Pharma Chemicals.
          </p>
          <p className="text-copy text-body">
            We provide reliable supply solutions to the power, industrial,
            commercial and oilfield sectors across the UAE.
          </p>
          <p className="text-copy text-body">
            Our partnerships with international manufacturers enable us to
            offer quality products at competitive prices, reliable market
            information, and professional support.
          </p>
          <p className="text-copy text-body">
            Supported by an experienced professional team, we ensure efficient
            service, technical expertise and timely delivery. We remain
            committed to customer satisfaction, quality and building lasting
            business relationships.
          </p>
          <p className="text-copy text-body">
            Backed by strong industry knowledge and operational expertise, we
            serve customers throughout the UAE with efficiency and reliability.
            Customer satisfaction remains our highest priority and the
            foundation of our continued growth.
          </p>
          <p className="text-copy text-body">
            With the continued trust of our employees, suppliers and clients,
            we confidently look forward to sustainable growth and expansion.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 border-t border-hairline">
          {productHighlights.map((product) => {
            const Icon = product.Icon;
            return (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                className="border-b border-hairline"
                onMouseEnter={() => handleHover(product.image)}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleLeave}
              >
                <Link
                  href={product.href}
                  className="group flex items-start gap-3 py-5 pr-6 md:odd:pr-8 md:even:pl-8"
                >
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-accent/10 text-brand-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-body-md font-medium text-ink transition-colors group-hover:text-brand-accent">
                      {product.name}
                    </span>
                    <span className="mt-0.5 block text-caption text-muted leading-snug">
                      {product.description}
                    </span>
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10">
          <Button href="/about" variant="accent">
            Discover more about us <FiArrowRight />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutSnapshot;
