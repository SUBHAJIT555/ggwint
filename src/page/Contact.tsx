"use client";

import ContactForm from "../component/contact/ContactForm";
import ContactHero from "../component/contact/ContactHero";
import ContactLocations from "../component/contact/ContactLocations";

const Contact = () => {
  return (
    <div className="bg-canvas">
      <ContactHero />
      <ContactLocations />
      <ContactForm />
    </div>
  );
};

export default Contact;
