"use client";

import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { toSrc, type ImageSource } from "../../lib/toSrc";
import Button from "./Button";
import BrandRow from "./BrandRow";
import { clientLogos } from "../../data/clientLogos";

type ButtonVariant = "primary" | "secondary" | "accent";

const DEFAULT_SCENE =
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&w=2400&q=80";

interface CommonHeroSectionProps {
  label?: string;
  heading: string;
  subHeading: string;
  buttonText?: string;
  buttonLink?: string;
  buttonVariant?: ButtonVariant;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  backgroundImage?: ImageSource;
  overlayOpacity?: number;
  parallaxStrength?: number;
  headingHighlight?: string;
  textAlign?: "left" | "center" | "right";
  minHeight?: string;
  showTrust?: boolean;
  trustCaption?: string;
}

const renderHeading = (heading: string, highlight?: string) => {
  if (!highlight || !heading.includes(highlight)) {
    return heading;
  }

  const [before] = heading.split(highlight);
  return (
    <>
      {before.trimEnd()}{" "}
      <span className="bg-brand-accent px-1.5 text-on-primary">
        {highlight}
      </span>
    </>
  );
};

const CommonHeroSection = ({
  heading,
  subHeading,
  buttonText,
  buttonLink,
  buttonVariant = "accent",
  secondaryButtonText,
  secondaryButtonLink,
  backgroundImage,
  headingHighlight,
  showTrust = false,
  trustCaption = "Trusted by companies and operators across",
}: CommonHeroSectionProps) => {
  const scene = backgroundImage ? toSrc(backgroundImage) : DEFAULT_SCENE;

  return (
    <section className="relative isolate overflow-hidden bg-canvas pt-32 pb-16 md:pt-40 md:pb-20">
      <div className="pointer-events-none absolute inset-0 mx-auto h-120 w-full max-w-[calc(100%-6px)] overflow-hidden mask-b-to-50%">
        <img
          src={scene}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-content flex-col items-center px-4 text-center sm:px-6 md:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="max-w-[40ch] text-balance text-hero text-ink md:max-w-[45ch]"
        >
          {renderHeading(heading, headingHighlight)}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.06, ease: "easeOut" }}
          className="mt-3 max-w-[56ch] text-pretty text-copy text-body"
        >
          {subHeading}
        </motion.p>

        {(buttonText && buttonLink) || (secondaryButtonText && secondaryButtonLink) ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
            className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
          >
            {buttonText && buttonLink && (
              <Button href={buttonLink} variant={buttonVariant} className="h-11 px-5">
                {buttonText}
                <FiArrowRight />
              </Button>
            )}
            {secondaryButtonText && secondaryButtonLink && (
              <Button href={secondaryButtonLink} variant="secondary" className="h-11 px-5">
                {secondaryButtonText}
              </Button>
            )}
          </motion.div>
        ) : null}

        {showTrust && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.16, ease: "easeOut" }}
            className="mt-8 w-full md:mt-12"
          >
            <BrandRow caption={trustCaption} logos={clientLogos} />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CommonHeroSection;
