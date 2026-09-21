"use client";

import { motion } from "framer-motion";
import { toSrc, type ImageSource } from "../../lib/toSrc";
import Button from "./Button";

interface CommonHeroSectionProps {
  backgroundImage: ImageSource;
  heading: string;
  subHeading: string;
  buttonText: string;
  buttonLink: string;
  overlayOpacity?: number;
  parallaxStrength?: number;
  headingHighlight?: string;
  textAlign?: "left" | "center" | "right";
  minHeight?: string;
}

const CommonHeroSection = ({
  backgroundImage,
  heading,
  subHeading,
  buttonText,
  buttonLink,
  headingHighlight,
}: CommonHeroSectionProps) => {
  const renderHeading = () => {
    if (!headingHighlight || !heading.includes(headingHighlight)) {
      return heading;
    }
    const parts = heading.split(headingHighlight);
    return (
      <>
        {parts[0]}
        <span>{headingHighlight}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <section className="bg-canvas">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-section">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-[32px] sm:text-display-md lg:text-display-lg font-semibold text-ink tracking-[-1.5px] leading-[1.1]"
            >
              {renderHeading()}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
              className="mt-6 text-body-md text-body max-w-xl"
            >
              {subHeading}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              className="mt-8"
            >
              <Button href={buttonLink} variant="accent" className="h-12 px-6">
                {buttonText}
              </Button>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-5"
          >
            <div className="rounded-xl overflow-hidden border border-hairline shadow-card bg-canvas">
              <img
                src={toSrc(backgroundImage)}
                alt=""
                className="w-full h-64 sm:h-80 object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CommonHeroSection;
