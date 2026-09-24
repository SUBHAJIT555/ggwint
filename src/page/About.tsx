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
        backgroundImage="/images/heroes/about.webp"
        heading="About G G W INTERNATIONAL GENERAL TRADING L.L.C"
        headingHighlight="GENERAL TRADING L.L.C"
        subHeading="Decades of experience, unwavering reliability, and a steadfast commitment to delivering quality trading solutions across diverse industries."
        buttonText="Explore products"
        buttonLink="/products"
        secondaryButtonText="Get a quote"
        secondaryButtonLink="/contact"
        showTrust
      />
      <OurStory />
      <MissionVisionSection />
      <PassionateProfessionals />
      <AboutStats />
      <WhyChooseUs />
      <CallToAction
        heading="A Dubai partner for sourcing and long-term supply"
        subHeading="G G W INTERNATIONAL GENERAL TRADING L.L.C sources, imports, and delivers for contractors, traders, and operators across the UAE. Tell us your requirements and our team will map the right supply plan."
        quoteLabel="Talk to us"
        whatsappMessage="Hello! I would like to know more about working with GGW International."
      />
    </div>
  );
};

export default About;
