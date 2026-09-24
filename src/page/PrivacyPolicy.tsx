"use client";

import CommonHeroSection from "../component/ui/CommonHeroSection";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

import privacyPolicyHeroImage from "../assets/images/Hero-images/PrivacyPolicy.webp";

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

const PrivacyPolicy = () => {
  return (
    <div className="bg-bg">
      <CommonHeroSection
        backgroundImage={privacyPolicyHeroImage}
        heading="Privacy Policy"
        headingHighlight="Privacy Policy"
        subHeading="We are committed to protecting your privacy and ensuring the security of personal information collected through our website. This Privacy Policy explains how we collect, use, store, and protect your information."
        buttonText="Contact Us"
        buttonLink="/contact"
        textAlign="center"
        overlayOpacity={0.65}
        parallaxStrength={400}
      />

      {/* Privacy Policy Content */}
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
                <strong className="text-ink">
                  G G W INTERNATIONAL GENERAL TRADING L.L.C
                </strong>{" "}
                ("we," "us," or "our") is committed to protecting your privacy
                and ensuring the security of personal information collected
                through our website. We understand the importance of privacy and
                are dedicated to maintaining the confidentiality and security of
                your personal data.
              </p>
              <p>
                This Privacy Policy explains how we collect, use, store,
                disclose, and protect your personal information when you visit
                our website, use our services, or interact with us. It also
                describes your rights regarding your personal data and how you
                can exercise those rights.
              </p>
              <p>
                By using our website or providing us with your personal
                information, you acknowledge that you have read and understood
                this Privacy Policy and agree to the collection, use, and
                disclosure of your personal information as described herein.
              </p>
              <p>
                This Privacy Policy should be read in conjunction with our Terms
                & Conditions and Cookie Policy, which together govern your use
                of our website and services.
              </p>
            </div>
          </Section>

          <div className="h-px bg-zinc-400/20 my-12" />

          {/* Information We Collect */}
          <Section>
            <h2 className="text-section text-ink mb-4">
              2. Information We Collect
            </h2>
            <div className="text-copy text-body space-y-6">
              <div>
                <h3 className="text-title-lg text-ink mb-3">
                  Personal Information
                </h3>
                <p>
                  We may collect personal information when you interact with our
                  website or services. This includes information you voluntarily
                  provide to us when you:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    Fill out a contact form, inquiry form, or request a
                    quotation
                  </li>
                  <li>
                    Contact us via email, phone, or other communication channels
                  </li>
                  <li>
                    Request services, product information, or technical support
                  </li>
                  <li>
                    Subscribe to our newsletter or marketing communications
                  </li>
                  <li>
                    Participate in surveys, promotions, or other interactive
                    features
                  </li>
                  <li>
                    Register for an account or create a profile on our website
                  </li>
                </ul>
                <p className="mt-4">
                  The personal information we collect may include:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Name and title</li>
                  <li>Company name and business information</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Mailing address or location</li>
                  <li>Inquiry details, messages, or comments</li>
                  <li>Service preferences or requirements</li>
                  <li>Payment information (when applicable)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-title-lg text-ink mb-3">
                  Automatically Collected Information
                </h3>
                <p>
                  When you visit our website, we may automatically collect
                  certain information about your device and browsing behavior,
                  including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>IP address and location data</li>
                  <li>Browser type and version</li>
                  <li>Operating system information</li>
                  <li>Device identifiers</li>
                  <li>Pages visited and time spent on pages</li>
                  <li>Referring website addresses</li>
                  <li>Clickstream data and navigation patterns</li>
                </ul>
                <p className="mt-4">
                  This information is collected through cookies, web beacons,
                  and similar technologies. For more details, please refer to
                  our Cookie Policy.
                </p>
              </div>
            </div>
          </Section>

          <div className="h-px bg-zinc-400/20 my-12" />

          {/* How We Use Information */}
          <Section>
            <h2 className="text-section text-ink mb-4">
              3. How We Use Information
            </h2>
            <div className="text-copy text-body space-y-4">
              <p>
                We use the collected information for various legitimate business
                purposes, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong className="text-ink">
                    Responding to Inquiries:
                  </strong>{" "}
                  To respond to your questions, comments, requests, and provide
                  customer support
                </li>
                <li>
                  <strong className="text-ink">Providing Services:</strong> To
                  provide services, process orders, deliver quotations, and
                  fulfill your requests
                </li>
                <li>
                  <strong className="text-ink">
                    Business Communications:
                  </strong>{" "}
                  To communicate with you regarding business matters, service
                  updates, and important information
                </li>
                <li>
                  <strong className="text-ink">Website Improvement:</strong>{" "}
                  To analyze website usage, improve our website functionality,
                  and enhance user experience
                </li>
                <li>
                  <strong className="text-ink">Marketing:</strong> To send you
                  marketing communications, newsletters, and promotional
                  materials (with your consent where required)
                </li>
                <li>
                  <strong className="text-ink">Legal Compliance:</strong> To
                  comply with legal obligations, enforce our terms, and protect
                  our rights
                </li>
                <li>
                  <strong className="text-ink">Security:</strong> To detect,
                  prevent, and address security issues, fraud, or other illegal
                  activities
                </li>
                <li>
                  <strong className="text-ink">Analytics:</strong> To conduct
                  research, analytics, and statistical analysis to improve our
                  services
                </li>
              </ul>
              <p>
                We do not sell, rent, or trade your personal data to third
                parties for their marketing purposes. We only share your
                information as described in this Privacy Policy or with your
                explicit consent.
              </p>
              <p>
                We process your personal information based on various legal
                bases, including your consent, the performance of a contract,
                compliance with legal obligations, protection of vital
                interests, and our legitimate business interests.
              </p>
            </div>
          </Section>

          <div className="h-px bg-zinc-400/20 my-12" />

          {/* Data Sharing */}
          <Section>
            <h2 className="text-section text-ink mb-4">
              4. Data Sharing
            </h2>
            <div className="text-copy text-body space-y-4">
              <p>
                We respect your privacy and do not share your personal
                information except in the limited circumstances described below:
              </p>
              <p>
                <strong className="text-ink">
                  Trusted Service Providers:
                </strong>{" "}
                We may share information with trusted third-party service
                providers who assist us in operating our website, conducting our
                business, or serving our users. These providers include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Web hosting and cloud service providers</li>
                <li>Email service providers and communication platforms</li>
                <li>Analytics and marketing service providers</li>
                <li>Payment processors and financial institutions</li>
                <li>IT support and maintenance service providers</li>
              </ul>
              <p>
                All service providers are contractually obligated to maintain
                the confidentiality and security of your information and are
                prohibited from using your information for any purpose other
                than providing services to us.
              </p>
              <p>
                <strong className="text-ink">
                  Legal and Regulatory Obligations:
                </strong>{" "}
                We may disclose your information when required by law,
                regulation, legal process, or governmental request. This
                includes responding to court orders, subpoenas, or other legal
                processes.
              </p>
              <p>
                <strong className="text-ink">Business Transfers:</strong> In
                the event of a merger, acquisition, reorganization, or sale of
                assets, your information may be transferred as part of the
                transaction. We will notify you of any such change in ownership
                or control of your personal information.
              </p>
              <p>
                <strong className="text-ink">Protection of Rights:</strong> We
                may disclose information when we believe it is necessary to
                protect our rights, property, or safety, or that of our users,
                employees, or others.
              </p>
              <p>
                All shared data is handled securely and confidentially, and we
                take appropriate measures to ensure that third parties with whom
                we share your information maintain adequate data protection
                standards.
              </p>
            </div>
          </Section>

          <div className="h-px bg-zinc-400/20 my-12" />

          {/* Data Security */}
          <Section>
            <h2 className="text-section text-ink mb-4">
              5. Data Security
            </h2>
            <div className="text-copy text-body space-y-4">
              <p>
                We implement appropriate technical and organizational measures
                to protect personal information against unauthorized access,
                loss, destruction, alteration, or misuse. Our security measures
                include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Encryption of data in transit and at rest</li>
                <li>
                  Secure socket layer (SSL) technology for data transmission
                </li>
                <li>Access controls and authentication mechanisms</li>
                <li>Regular security assessments and vulnerability testing</li>
                <li>
                  Employee training on data protection and security practices
                </li>
                <li>Firewall and intrusion detection systems</li>
                <li>Regular backups and disaster recovery procedures</li>
                <li>Physical security measures for our facilities</li>
              </ul>
              <p>
                However, no method of transmission over the Internet or
                electronic storage system is completely secure. While we strive
                to use commercially acceptable means to protect your personal
                information, we cannot guarantee absolute security.
              </p>
              <p>
                We recommend that you also take steps to protect your personal
                information, such as using strong passwords, keeping your login
                credentials confidential, and being cautious about sharing
                personal information online.
              </p>
              <p>
                If you believe that your personal information has been
                compromised or if you have any security concerns, please contact
                us immediately so we can investigate and take appropriate
                action.
              </p>
            </div>
          </Section>

          <div className="h-px bg-zinc-400/20 my-12" />

          {/* Data Retention */}
          <Section>
            <h2 className="text-section text-ink mb-4">
              6. Data Retention
            </h2>
            <div className="text-copy text-body space-y-4">
              <p>
                We retain personal data only for as long as necessary to fulfill
                the purposes for which it was collected, unless a longer
                retention period is required or permitted by applicable laws and
                regulations.
              </p>
              <p>
                The retention period for personal data depends on various
                factors, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>The purpose for which the data was collected</li>
                <li>Legal, regulatory, or contractual requirements</li>
                <li>The nature of the relationship with the data subject</li>
                <li>Whether there are ongoing business or legal needs</li>
                <li>
                  The potential risk of harm from unauthorized use or disclosure
                </li>
              </ul>
              <p>
                When personal data is no longer needed, we will securely delete
                or anonymize it in accordance with our data retention policies
                and applicable legal requirements.
              </p>
              <p>
                In some cases, we may retain certain information for longer
                periods if required by law, such as for tax, accounting, or
                legal compliance purposes. We may also retain information if
                necessary to resolve disputes, enforce our agreements, or
                protect our legal rights.
              </p>
            </div>
          </Section>

          <div className="h-px bg-zinc-400/20 my-12" />

          {/* Your Rights */}
          <Section>
            <h2 className="text-section text-ink mb-4">
              7. Your Rights
            </h2>
            <div className="text-copy text-body space-y-4">
              <p>
                You have certain rights regarding your personal information
                under applicable data protection laws. These rights include:
              </p>
              <p>
                <strong className="text-ink">Right to Access:</strong> You
                have the right to request access to your personal data and
                receive information about how we process it, including what data
                we hold, why we hold it, and who we share it with.
              </p>
              <p>
                <strong className="text-ink">Right to Correction:</strong> You
                have the right to request correction of inaccurate or incomplete
                personal data. We will update your information promptly upon
                verification of your identity and the accuracy of the new
                information.
              </p>
              <p>
                <strong className="text-ink">Right to Deletion:</strong> You
                have the right to request deletion of your personal data in
                certain circumstances, such as when the data is no longer
                necessary for the purposes for which it was collected, or when
                you withdraw your consent.
              </p>
              <p>
                <strong className="text-ink">Right to Object:</strong> You
                have the right to object to the processing of your personal data
                for certain purposes, such as direct marketing or when
                processing is based on legitimate interests.
              </p>
              <p>
                <strong className="text-ink">
                  Right to Restrict Processing:
                </strong>{" "}
                You have the right to request restriction of processing of your
                personal data in certain circumstances, such as when you contest
                the accuracy of the data or object to processing.
              </p>
              <p>
                <strong className="text-ink">
                  Right to Data Portability:
                </strong>{" "}
                You have the right to receive your personal data in a
                structured, commonly used, and machine-readable format and to
                transmit that data to another controller where technically
                feasible.
              </p>
              <p>
                <strong className="text-ink">
                  Right to Withdraw Consent:
                </strong>{" "}
                Where processing is based on your consent, you have the right to
                withdraw your consent at any time. Withdrawal of consent does
                not affect the lawfulness of processing based on consent before
                its withdrawal.
              </p>
              <p>
                To exercise any of these rights, please contact us using the
                contact information provided in this Privacy Policy. We will
                respond to your request within a reasonable timeframe and in
                accordance with applicable laws.
              </p>
              <p>
                Please note that we may need to verify your identity before
                processing your request, and certain rights may be subject to
                limitations or exceptions under applicable law.
              </p>
            </div>
          </Section>

          <div className="h-px bg-zinc-400/20 my-12" />

          {/* Third-Party Links */}
          <Section>
            <h2 className="text-section text-ink mb-4">
              8. Third-Party Links
            </h2>
            <div className="text-copy text-body space-y-4">
              <p>
                Our website may contain links to third-party websites, services,
                or applications that are not operated or controlled by us. These
                links are provided for your convenience and reference only.
              </p>
              <p>
                We are not responsible for the privacy practices, content, or
                security of third-party websites. When you click on a
                third-party link, you will be directed to that third party's
                website, and we encourage you to review their privacy policy
                before providing any personal information.
              </p>
              <p>
                This Privacy Policy does not apply to third-party websites, and
                we do not endorse or assume any responsibility for the privacy
                policies or practices of third parties. Your interactions with
                third-party websites are solely between you and the third party.
              </p>
              <p>
                We recommend that you exercise caution and review the privacy
                policies of any third-party websites you visit to understand how
                they collect, use, and protect your information.
              </p>
            </div>
          </Section>

          <div className="h-px bg-zinc-400/20 my-12" />

          {/* Changes to Privacy Policy */}
          <Section>
            <h2 className="text-section text-ink mb-4">
              9. Changes to Privacy Policy
            </h2>
            <div className="text-copy text-body space-y-4">
              <p>
                We reserve the right to update, modify, or change this Privacy
                Policy at any time to reflect changes in our practices,
                technology, legal requirements, or for other operational, legal,
                or regulatory reasons.
              </p>
              <p>
                When we make changes to this Privacy Policy, we will update the
                "Last Updated" date at the top of this page and post the updated
                policy on our website. Changes will be effective immediately
                upon posting, unless otherwise stated.
              </p>
              <p>
                We encourage you to review this Privacy Policy periodically to
                stay informed about how we collect, use, and protect your
                personal information. Your continued use of our website or
                services after any changes to this Privacy Policy constitutes
                your acceptance of those changes.
              </p>
              <p>
                If we make material changes to this Privacy Policy that
                significantly affect your rights or how we use your personal
                information, we will notify you through a prominent notice on
                our website or by other means, such as email, to ensure you are
                aware of the changes.
              </p>
              <p>
                However, it is your responsibility to review this Privacy Policy
                regularly to stay informed of any updates or changes.
              </p>
            </div>
          </Section>

          <div className="h-px bg-zinc-400/20 my-12" />

          {/* Contact Information */}
          <Section>
            <h2 className="text-section text-ink mb-4">
              10. Contact Information
            </h2>
            <div className="text-copy text-body space-y-4">
              <p>
                If you have any questions, concerns, or inquiries regarding this
                Privacy Policy, your personal information, or your privacy
                rights, please feel free to contact us using the following
                information:
              </p>
              <div className="space-y-4 mt-6">
                <div>
                  <p className="text-ink font-semibold mb-2">Company:</p>
                  <p className="text-zinc-300">
                    G G W INTERNATIONAL GENERAL TRADING L.L.C
                  </p>
                </div>
                <div>
                  <p className="text-ink font-semibold mb-2">Location:</p>
                  <p className="text-zinc-300">
                    Office 303, Building White Crown, Sheikh Zayed Road, Dubai, UAE
                  </p>
                </div>
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
              </div>
              <p className="mt-6">
                We aim to respond to all privacy-related inquiries within a
                reasonable timeframe, typically within 30 days. For urgent
                matters or data protection requests, please contact us via phone
                during our business hours.
              </p>
              <p>
                If you are not satisfied with our response to your privacy
                concern, you have the right to lodge a complaint with the
                relevant data protection authority in your jurisdiction.
              </p>
            </div>
          </Section>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
