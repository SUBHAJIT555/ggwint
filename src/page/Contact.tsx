"use client";

import { Suspense } from "react";
import ContactForm from "../component/contact/ContactForm";
import ContactHero from "../component/contact/ContactHero";
import ContactLocations from "../component/contact/ContactLocations";

const Contact = () => {
  return (
    <div className="bg-canvas">
      <ContactHero />
      <ContactLocations />
      <Suspense fallback={null}>
        <ContactForm />
      </Suspense>
    </div>
  );
};

export default Contact;
