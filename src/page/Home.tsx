"use client";

import HeroSection from "../component/HeroSection";
import AboutSnapshot from "../component/AboutSnapshot";
import ClientLogos from "../component/ClientLogos";
import ServicesCards from "../component/ServicesCards";
import WhyChooseUs from "../component/WhyChooseUs";
import FAQ, { type FAQItem } from "../component/ui/Faq";
import CallToAction from "../component/ui/CallToAction";
import ProductCategoryCards from "../component/ProductCategoryCards";

const homeFAQData: FAQItem[] = [
  {
    id: 1,
    question: "What does GGW International offer?",
    answer:
      "We specialize in international general trading across auto spare parts, construction and safety tools, construction materials, electrics and electronics, food, agro and pharma chemicals, food products, IT and accessories, paints and finishes, solar panels and lithium batteries, and water and fire proofing.",
  },
  {
    id: 2,
    question: "Where is GGW International based?",
    answer:
      "We are based in Dubai, United Arab Emirates, and serve clients across the UAE and GCC region. Our strategic location allows us to provide efficient service delivery throughout the region.",
  },
  {
    id: 3,
    question: "How can I get a quote for your services?",
    answer:
      "You can request a quote by contacting us through our contact form, calling us directly, or reaching out via WhatsApp. We'll provide a detailed quotation based on your specific requirements.",
  },
  {
    id: 4,
    question: "Do you handle both small and large-scale orders?",
    answer:
      "Yes. Whether you need a focused product shipment or a large-scale supply programme, we have the sourcing network and logistics to deliver reliably at any scale.",
  },
  {
    id: 5,
    question:
      "What makes GGW International different from other trading companies?",
    answer:
      "We combine multiple product categories under one roof, ensuring consistent quality and reliable supply. Our Dubai-based operations, ISO 9001:2015 certification, and commitment to excellence set us apart as a trusted trading partner.",
  },
  {
    id: 6,
    question: "How long has GGW International been in business?",
    answer:
      "G G W INTERNATIONAL GENERAL TRADING L.L.C is a UAE-based ISO 9001:2015-certified company, established in 2015. We have built a track record of reliable supply and long-term client relationships.",
  },
];

const Home = () => {
  return (
    <>
      <HeroSection />
      <div className="mx-auto max-w-content border-x border-dashed border-hairline">
        <AboutSnapshot />
        <ClientLogos />
        <ServicesCards />
        <ProductCategoryCards />
        <WhyChooseUs />
        <FAQ
          sectionLabel="FAQ"
          heading="Frequently Asked Questions"
          headingHighlightStart={17}
          subHeading="Find answers to common questions about our services and how we can help your business"
          highlightWord="common questions"
          faqItems={homeFAQData}
          whatsappMessage="Hello! I'm interested in learning more about GGW International's products."
          chatPrompt="Can't find what you are looking for?"
          chatButtonText="We would like to chat with you"
          defaultExpandedId={2}
        />
        <CallToAction
          heading="General trading and supply from Dubai"
          subHeading="GGW International supplies construction materials, food products, auto spare parts, electronics, and chemicals to businesses across the UAE. Request a quote and we will confirm availability and delivery."
          quoteLabel="Get a quote"
          whatsappMessage="Hello! I'm interested in learning more about GGW International's products."
        />
      </div>
    </>
  );
};

export default Home;
