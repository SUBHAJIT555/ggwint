"use client";

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { toSrc, type ImageSource } from "../lib/toSrc";
import Button from "./ui/Button";
import { categoryIcons } from "../data/categoryIcons";
import { categoryDetails } from "../data/products";

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
          className="mt-8"
        >
          <p className="text-copy text-body">
            We specialize in the international trading of <b>steel</b>, <b>MEP products</b>, <b>construction materials</b>, <b>IT products &amp; solutions</b>, <b>food stuff</b>, <b>food additives</b>, <b>chemicals</b>, <b>AGRO</b> and <b>pharma chemicals</b>, providing <b>reliable supply solutions</b> to the <b>power, industrial, commercial,</b> and <b>oilfield sectors</b> across the UAE. Our partnerships with international manufacturers enable us to offer <b>quality products at competitive prices</b>, reliable market information, and <b>professional support</b>. Backed by an <b>experienced professional team</b> and strong industry knowledge, we ensure <b>efficient service</b>, <b>technical expertise</b>, and <b>timely delivery</b>, remaining committed to <b>customer satisfaction</b>, quality, and building lasting business relationships. Supported by the continued trust of our <b>employees</b>, <b>suppliers</b>, and <b>clients</b>, we confidently look forward to <b>sustainable growth</b> and expansion, serving customers throughout the UAE with efficiency and reliability.
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
                  className="group flex items-start gap-3 py-5 pr-6 md:odd:pr-8 md:even:pl-8 "
                >
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center  text-brand-accent group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300">
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
