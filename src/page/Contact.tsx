"use client";

import CommonHeroSection from "../component/ui/CommonHeroSection";
import ContactDetails from "../component/ContactDetails";

import contactHeroImage from "../assets/images/Hero-images/ContactHero.webp";


const Contact = () => {
  return (
    <div>
      <CommonHeroSection
        backgroundImage={contactHeroImage}
        heading="Let’s Connect: Your Questions & Ideas Start Here! Contact Us"
        headingHighlight="Contact Us"
        subHeading="Have a question or a project in mind? Our team is ready to help - whether you need expert advice, creative solutions, or quick support. Reach out today and let's achieve something great together!"
        buttonText="Get Your Free Quote"
        buttonLink="/contact#get-free-quote"
        textAlign="center"
        overlayOpacity={0.65}/>
        <ContactDetails />
    </div>
  );
}

export default Contact