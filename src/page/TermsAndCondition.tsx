"use client";

import CommonHeroSection from "../component/ui/CommonHeroSection";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

import termsAndConditionHeroImage from "../assets/images/Hero-images/TermsandConditions.webp";

const Section = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className="mb-12"
    >
      {children}
    </motion.div>
  );
};

const TermsAndCondition = () => {
  return (
    <div className="bg-bg">
      <CommonHeroSection
        backgroundImage={termsAndConditionHeroImage}
        heading="Terms and Conditions"
        headingHighlight="Terms and Conditions"
        subHeading="Please read these terms and conditions carefully before using our services. By accessing or using our website and services, you agree to be bound by these terms."
        buttonText="Contact Us"
        buttonLink="/contact"
        textAlign="center"
        overlayOpacity={0.65}
        parallaxStrength={400}
      />

      {/* Terms & Conditions Content */}
      <section className="py-16 sm:py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-16">
          {/* Last Updated Date */}
          <div className="mb-8">
            <p className="text-zinc-400 text-sm font-poppins">
              Last Updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Introduction */}
          <Section>
            <h2 className="text-section text-ink mb-4">
              1. Introduction
            </h2>
            <div className="text-copy text-body space-y-4">
              <p>
                These Terms & Conditions ("Terms") govern the use of the website
                operated by{" "}
                <strong className="text-ink">
                  G G W INTERNATIONAL GENERAL TRADING L.L.C
                </strong>
                , based in Dubai, United Arab Emirates. By accessing or using
                this website, you agree to be bound by these Terms & Conditions
                and all applicable laws and regulations.
              </p>
              <p>
                These Terms constitute a legally binding agreement between you
                and G G W INTERNATIONAL GENERAL TRADING L.L.C. If you do not agree
                with any part of these terms, you should immediately discontinue
                use of this website and refrain from accessing any of our
                services or content.
              </p>
              <p>
                Your continued use of this website following the posting of any
                changes to these Terms will be deemed as your acceptance of
                those changes. We reserve the right to modify, update, or change
                these Terms at any time without prior notice.
              </p>
              <p>
                These Terms apply to all visitors, users, and others who access
                or use the website, including but not limited to browsers,
                vendors, customers, merchants, and contributors of content.
              </p>
            </div>
          </Section>

          <div className="h-px bg-zinc-400/20 my-12" />

          {/* Company Information */}
          <Section>
            <h2 className="text-section text-ink mb-4">
              2. Company Information
            </h2>
            <div className="text-copy text-body space-y-4">
              <p className="text-ink font-semibold">
                G G W INTERNATIONAL GENERAL TRADING L.L.C
              </p>
              <p>Office 303, Building White Crown, <br /> Sheikh Zayed Road, <br /> Dubai, UAE</p>
              <p>
                G G W INTERNATIONAL GENERAL TRADING L.L.C is a limited liability
                company registered and operating under the laws of the United
                Arab Emirates. We are an ISO 9001:2015-certified trading company
                committed to bridging global markets with excellence, integrity,
                and innovation.
              </p>
              <p>
                We specialize in the international trading of construction
                materials, food stuff, electronics, chemicals, oil products, and
                related supplies for businesses across the UAE and worldwide.
              </p>
              <p>
                Our operations are conducted in compliance with all applicable
                UAE laws and regulations, and we maintain the highest standards
                of business ethics and professional conduct in all our
                transactions and service deliveries.
              </p>
            </div>
          </Section>

          <div className="h-px bg-zinc-400/20 my-12" />

          {/* Use of the Website */}
          <Section>
            <h2 className="text-section text-ink mb-4">
              3. Use of the Website
            </h2>
            <div className="text-copy text-body space-y-4">
              <p>
                You agree to use this website only for lawful purposes and in a
                manner that does not infringe the rights of, restrict, or
                inhibit anyone else's use of the website. You are responsible
                for ensuring that your use of the website complies with all
                applicable local, national, and international laws and
                regulations.
              </p>
              <p>
                You acknowledge that you are solely responsible for all
                activities that occur under your account or through your use of
                the website. You must maintain the confidentiality of any
                account information, passwords, or other security credentials
                associated with your use of the website.
              </p>
              <p>You must not:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Misuse the website or its content in any way that violates
                  these Terms or applicable laws
                </li>
                <li>
                  Attempt unauthorized access to systems, networks, data, or
                  other restricted areas of the website
                </li>
                <li>
                  Use the website for fraudulent, harmful, illegal, or
                  unauthorized purposes
                </li>
                <li>
                  Transmit any viruses, malware, or other harmful code through
                  the website
                </li>
                <li>
                  Collect or harvest any information or data from the website
                  without our express written permission
                </li>
                <li>
                  Interfere with or disrupt the website's servers, networks, or
                  security systems
                </li>
                <li>
                  Impersonate any person or entity or falsely state or otherwise
                  misrepresent your affiliation with any person or entity
                </li>
                <li>
                  Use automated systems, bots, or scripts to access or interact
                  with the website without our prior written consent
                </li>
              </ul>
              <p>
                We reserve the right to suspend or terminate your access to the
                website immediately, without prior notice, if you violate any of
                these restrictions or engage in any conduct that we deem
                inappropriate or harmful.
              </p>
            </div>
          </Section>

          <div className="h-px bg-zinc-400/20 my-12" />

          {/* Services & Products */}
          <Section>
            <h2 className="text-section text-ink mb-4">
              4. Services & Products
            </h2>
            <div className="text-copy text-body space-y-4">
              <p>
                All services and products displayed on this website are subject
                to availability and confirmation. We strive to maintain accurate
                and up-to-date information about our services and products, but
                we do not guarantee that all items displayed will be available
                at all times or in all locations.
              </p>
              <p>
                Details, descriptions, specifications, images, and pricing (if
                any) are provided for general information purposes only and may
                be updated, modified, or corrected without prior notice. While
                we make every effort to ensure accuracy, we do not warrant that
                product descriptions, images, or other content on the website
                are accurate, complete, reliable, current, or error-free.
              </p>
              <p>
                Final terms, pricing, quantities, delivery conditions, payment
                terms, and all other commercial conditions will be confirmed
                through formal communication, quotations, purchase orders, or
                written agreements. Any verbal communications or preliminary
                discussions are subject to confirmation in writing.
              </p>
              <p>
                We reserve the right to refuse or cancel any order for any
                reason, including but not limited to product availability,
                errors in pricing or product information, or suspected
                fraudulent or illegal activity. In such cases, we will notify
                you promptly and refund any payments made for the cancelled
                order.
              </p>
              <p>
                All services are provided subject to our standard terms of
                service, which may include specific terms regarding delivery
                timelines, quality standards, payment terms, and cancellation
                policies. These terms will be communicated to you prior to the
                commencement of any service.
              </p>
              <p>
                For custom orders, bulk purchases, or specialized services,
                additional terms and conditions may apply. These will be
                specified in the relevant quotation, contract, or service
                agreement.
              </p>
            </div>
          </Section>

          <div className="h-px bg-zinc-400/20 my-12" />

          {/* Intellectual Property */}
          <Section>
            <h2 className="text-section text-ink mb-4">
              5. Intellectual Property
            </h2>
            <div className="text-copy text-body space-y-4">
              <p>
                All content on this website, including but not limited to text,
                logos, trademarks, service marks, images, graphics, photographs,
                videos, audio files, software, code, design elements, layout,
                user interface, and all other materials, is the exclusive
                property of{" "}
                <strong className="text-ink">
                  G G W INTERNATIONAL GENERAL TRADING L.L.C
                </strong>{" "}
                or its licensors, unless otherwise stated or indicated.
              </p>
              <p>
                The website and all its content are protected by copyright,
                trademark, patent, trade secret, and other intellectual property
                laws of the United Arab Emirates and international treaties. All
                rights not expressly granted to you in these Terms are reserved
                by G G W INTERNATIONAL GENERAL TRADING L.L.C and its licensors.
              </p>
              <p>
                You may not copy, reproduce, distribute, transmit, display,
                perform, publish, license, create derivative works from, modify,
                adapt, translate, sell, rent, lease, or otherwise use any
                content from this website without our prior written permission.
                This includes, but is not limited to, downloading, printing, or
                saving any content for commercial purposes.
              </p>
              <p>
                You may view and print individual pages of the website for your
                personal, non-commercial use, provided that you do not remove
                any copyright, trademark, or other proprietary notices from such
                pages. Any unauthorized use of our intellectual property may
                result in legal action and claims for damages.
              </p>
              <p>
                If you believe that any content on our website infringes your
                intellectual property rights, please contact us immediately with
                detailed information about the alleged infringement, and we will
                investigate and take appropriate action in accordance with
                applicable laws.
              </p>
            </div>
          </Section>

          <div className="h-px bg-zinc-400/20 my-12" />

          {/* Third-Party Links */}
          <Section>
            <h2 className="text-section text-ink mb-4">
              6. Third-Party Links
            </h2>
            <div className="text-copy text-body space-y-4">
              <p>
                This website may contain links to third-party websites,
                resources, or services for reference, convenience, or
                informational purposes. These links are provided solely for your
                convenience and do not constitute an endorsement, sponsorship,
                or recommendation by G G W INTERNATIONAL GENERAL TRADING L.L.C.
              </p>
              <p>
                We do not control, monitor, or maintain the content of
                third-party websites and are not responsible for their
                availability, accuracy, completeness, legality, practices,
                privacy policies, terms of use, or any other aspect of such
                websites.
              </p>
              <p>
                Your access to and use of any third-party websites is entirely
                at your own risk. We strongly advise you to review the terms and
                conditions and privacy policies of any third-party websites you
                visit, as they may differ significantly from our own.
              </p>
              <p>
                We shall not be liable for any loss or damage arising from your
                use of or reliance on any third-party websites, including but
                not limited to any transactions, communications, or interactions
                you may have with such websites. Any concerns or issues
                regarding third-party websites should be directed to the
                operators of those websites.
              </p>
              <p>
                We reserve the right to remove or modify any links to
                third-party websites at any time without prior notice. If you
                find any link on our website objectionable or inappropriate,
                please contact us, and we will consider removing it.
              </p>
            </div>
          </Section>

          <div className="h-px bg-zinc-400/20 my-12" />

          {/* Limitation of Liability */}
          <Section>
            <h2 className="text-section text-ink mb-4">
              7. Limitation of Liability
            </h2>
            <div className="text-copy text-body space-y-4">
              <p>
                To the fullest extent permitted by applicable law,{" "}
                <strong className="text-ink">
                  G G W INTERNATIONAL GENERAL TRADING L.L.C
                </strong>
                , its officers, directors, employees, agents, affiliates, and
                licensors shall not be liable for any direct, indirect,
                incidental, special, consequential, punitive, or exemplary
                damages, including but not limited to loss of profits, revenue,
                data, goodwill, or other intangible losses, arising from or
                related to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Your use or inability to use the website or any of its
                  features
                </li>
                <li>
                  Your reliance on any information, content, or materials
                  provided on the website
                </li>
                <li>
                  Errors, omissions, interruptions, delays, or technical
                  failures in the website's operation
                </li>
                <li>
                  Unauthorized access to or alteration of your transmissions or
                  data
                </li>
                <li>
                  Any conduct or content of third parties on the website or
                  through third-party links
                </li>
                <li>
                  Any viruses, malware, or other harmful code that may be
                  transmitted through the website
                </li>
                <li>
                  Any loss or damage resulting from your failure to maintain the
                  confidentiality of your account information
                </li>
              </ul>
              <p>
                The website and all content are provided on an "as is" and "as
                available" basis without warranties of any kind, either express
                or implied, including but not limited to warranties of
                merchantability, fitness for a particular purpose,
                non-infringement, or course of performance.
              </p>
              <p>
                We do not warrant that the website will be uninterrupted,
                secure, error-free, or free from viruses or other harmful
                components. We do not warrant that any defects or errors will be
                corrected, or that the website or its servers are free of
                viruses or other harmful code.
              </p>
              <p>
                Use of the website is entirely at your own risk. You are solely
                responsible for any damage to your computer system, mobile
                device, or other equipment, or loss of data that results from
                your use of the website or downloading of any content from the
                website.
              </p>
              <p>
                In no event shall our total liability to you for all damages,
                losses, or causes of action exceed the amount you have paid to
                us in the twelve (12) months preceding the claim, or one hundred
                United Arab Emirates Dirhams (AED 100), whichever is greater.
              </p>
            </div>
          </Section>

          <div className="h-px bg-zinc-400/20 my-12" />

          {/* Indemnification */}
          <Section>
            <h2 className="text-section text-ink mb-4">
              8. Indemnification
            </h2>
            <div className="text-copy text-body space-y-4">
              <p>
                You agree to indemnify, defend, and hold harmless{" "}
                <strong className="text-ink">
                  G G W INTERNATIONAL GENERAL TRADING L.L.C
                </strong>
                , its officers, directors, employees, agents, affiliates, and
                licensors from and against any and all claims, demands, actions,
                suits, proceedings, liabilities, damages, losses, costs, and
                expenses (including reasonable attorneys' fees and legal costs)
                arising from or related to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Your use or misuse of the website or any content, services, or
                  products obtained through the website
                </li>
                <li>
                  Your violation of these Terms & Conditions or any applicable
                  laws or regulations
                </li>
                <li>
                  Your violation of any rights of any third party, including but
                  not limited to intellectual property rights, privacy rights,
                  or publicity rights
                </li>
                <li>
                  Any content, information, or materials you submit, post,
                  transmit, or make available through the website
                </li>
                <li>
                  Your connection to the website or your breach of any
                  representation or warranty made by you in these Terms
                </li>
                <li>
                  Any fraudulent, negligent, or wrongful act or omission by you
                </li>
              </ul>
              <p>
                This indemnification obligation will survive the termination of
                these Terms and your use of the website. We reserve the right to
                assume the exclusive defense and control of any matter subject
                to indemnification by you, in which case you agree to cooperate
                with us in asserting any available defenses.
              </p>
              <p>
                You agree not to settle any claim subject to this
                indemnification provision without our prior written consent,
                which we may grant or withhold at our sole discretion.
              </p>
            </div>
          </Section>

          <div className="h-px bg-zinc-400/20 my-12" />

          {/* Changes to Terms */}
          <Section>
            <h2 className="text-section text-ink mb-4">
              9. Changes to Terms
            </h2>
            <div className="text-copy text-body space-y-4">
              <p>
                We reserve the right, at our sole discretion, to modify, update,
                change, or replace any part of these Terms & Conditions at any
                time without prior notice. Such modifications may be made for
                various reasons, including but not limited to changes in our
                services, legal requirements, business practices, or website
                functionality.
              </p>
              <p>
                When we make changes to these Terms, we will update the "Last
                Updated" date at the top of this page (if applicable) and post
                the updated Terms on this page. Updates will be posted with
                immediate effect and will apply to all users of the website from
                the date of posting.
              </p>
              <p>
                It is your responsibility to review these Terms periodically to
                stay informed of any changes. Your continued use of the website
                following the posting of any changes to these Terms constitutes
                your acceptance of those changes and your agreement to be bound
                by the modified Terms.
              </p>
              <p>
                If you do not agree to any changes made to these Terms, you must
                immediately stop using the website and discontinue all access to
                our services. Your only recourse if you disagree with any
                changes is to cease using the website.
              </p>
              <p>
                We may, but are not obligated to, notify you of significant
                changes to these Terms via email or other means of
                communication. However, the absence of such notification does
                not affect the validity or enforceability of the updated Terms.
              </p>
            </div>
          </Section>

          <div className="h-px bg-zinc-400/20 my-12" />

          {/* Governing Law */}
          <Section>
            <h2 className="text-section text-ink mb-4">
              10. Governing Law
            </h2>
            <div className="text-copy text-body space-y-4">
              <p>
                These Terms & Conditions are governed by and construed in
                accordance with the laws of the United Arab Emirates, without
                regard to its conflict of law provisions. Any disputes arising
                from or relating to these Terms or your use of the website shall
                be subject to the exclusive jurisdiction of the courts of Dubai,
                United Arab Emirates.
              </p>
              <p>
                You agree that any legal action or proceeding arising out of or
                relating to these Terms or the website shall be brought
                exclusively in the competent courts of Dubai, United Arab
                Emirates, and you hereby consent to the personal jurisdiction of
                such courts.
              </p>
              <p>
                If any provision of these Terms is found to be invalid, illegal,
                or unenforceable by a court of competent jurisdiction, such
                provision shall be modified to the minimum extent necessary to
                make it valid, legal, and enforceable, or if such modification
                is not possible, it shall be severed from these Terms. The
                remaining provisions shall continue in full force and effect.
              </p>
              <p>
                These Terms, together with our Privacy Policy and any other
                legal notices published on the website, constitute the entire
                agreement between you and G G W INTERNATIONAL GENERAL TRADING L.L.C
                regarding your use of the website and supersede all prior or
                contemporaneous communications, agreements, and understandings,
                whether written or oral, relating to the subject matter hereof.
              </p>
              <p>
                No waiver of any term or condition of these Terms shall be
                deemed a further or continuing waiver of such term or condition
                or any other term or condition, and our failure to assert any
                right or provision under these Terms shall not constitute a
                waiver of such right or provision.
              </p>
            </div>
          </Section>

          <div className="h-px bg-zinc-400/20 my-12" />

          {/* Contact Section */}
          <Section>
            <h2 className="text-section text-ink mb-4">
              11. Contact Information
            </h2>
            <div className="text-copy text-body space-y-4">
              <p>
                If you have any questions, concerns, or inquiries regarding
                these Terms & Conditions, please feel free to contact us using
                the following information:
              </p>
              <div className="space-y-4 mt-6">
                <div>
                  <p className="text-ink font-semibold mb-2">Email:</p>
                  <a
                    href="mailto:info@ggwint.com"
                    className="block text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    info@ggwint.com
                  </a>
                </div>
                <div>
                  <p className="text-ink font-semibold mb-2">Phone:</p>
                  <a
                    href="tel:+971565877607"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    +971 56 587 7607
                  </a>
                </div>
                <div>
                  <p className="text-ink font-semibold mb-2">Location:</p>
                  <p className="text-zinc-300">
                    G G W INTERNATIONAL GENERAL TRADING L.L.C
                    <br />
                    Office 303, Building White Crown
                    <br />
                    Sheikh Zayed Road,
                    <br />
                    Dubai, UAE
                  </p>
                </div>
              </div>
              <p className="mt-6">
                We aim to respond to all inquiries within a reasonable
                timeframe. For urgent matters, please contact us via phone
                during our business hours.
              </p>
            </div>
          </Section>
        </div>
      </section>
    </div>
  );
};

export default TermsAndCondition;
