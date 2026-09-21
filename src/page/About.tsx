"use client";

import CommonHeroSection from "../component/ui/CommonHeroSection";
import OurStory from "../component/OurStory";
import MissionVisionSection from "../component/MissionVisionSection";
import PassionateProfessionals from "../component/PassionateProfessionals";
import AboutStats from "../component/AboutStats";
import WhyChooseUs from "../component/WhyChooseUs";
import CallToAction from "../component/ui/CallToAction";

const About = () => {
  return (
    <div>
      <CommonHeroSection
        heading="About GGW International General Trading LLC"
        headingHighlight="General Trading LLC"
        subHeading="Decades of experience, unwavering reliability, and a steadfast commitment to delivering quality trading solutions across diverse industries."
        buttonText="Explore products"
        buttonLink="/products"
        secondaryButtonText="Get a quote"
        secondaryButtonLink="/contact"
        showTrust
        trustCaption="Some of the companies we've worked with"
      />
      <OurStory />
      <MissionVisionSection />
      <PassionateProfessionals />
      <AboutStats />
      <WhyChooseUs />
      <CallToAction />
    </div>
  );
};

export default About;
