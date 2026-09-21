"use client";

import CommonHeroSection from "../component/ui/CommonHeroSection";
import MissionVisionSection from "../component/MissionVisionSection";
import CoreValues from "../component/CoreValues";
import CallToAction from "../component/ui/CallToAction";
import aboutHeroImage from "../assets/images/Hero-images/AboutHero.webp";

const About = () => {
  return (
    <div>
      <CommonHeroSection
        backgroundImage={aboutHeroImage}
        heading="About GGW International: Your Gateway to Global Trade from Dubai"
        headingHighlight="GGW International"
        subHeading="GGW INTERNATIONAL GENERAL TRADING LLC is a UAE-based ISO 9001:2015-certified trading company. We bridge markets with excellence, integrity, and innovation, supplying businesses across the UAE and beyond."
        buttonText="Our Products"
        buttonLink="/products"
        textAlign="center"
        overlayOpacity={0.65}
        parallaxStrength={400}
      />
      <MissionVisionSection />
      <CoreValues />
      <CallToAction />
    </div>
  );
};

export default About;
