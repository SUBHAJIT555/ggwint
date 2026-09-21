"use client";

import CommonHeroSection from "../component/ui/CommonHeroSection";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

import cookiePolicyHeroImage from "../assets/images/Hero-images/CookiePolicy.webp";

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

const CookiePolicy = () => {
  return (
    <div className="bg-bg">
      <CommonHeroSection
        backgroundImage={cookiePolicyHeroImage}
        heading="Cookie Policy"
        headingHighlight="Cookie Policy"
        subHeading="This Cookie Policy explains how we use cookies and similar technologies when you visit our website. By using our website, you consent to the use of cookies in accordance with this policy."
        buttonText="Contact Us"
        buttonLink="/contact"
        textAlign="center"
        overlayOpacity={0.65}
        parallaxStrength={400}
      />

      {/* Cookie Policy Content */}
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-oswald font-semibold text-white mb-6">
              1. Introduction
            </h2>
            <div className="text-zinc-300 text-base sm:text-lg font-poppins leading-relaxed space-y-4">
              <p>
                This Cookie Policy explains how{" "}
                <strong className="text-white">
                  GGW INTERNATIONAL GENERAL TRADING LLC
                </strong>{" "}
                ("we," "us," or "our") uses cookies and similar tracking
                technologies when you visit our website. This policy should be
                read in conjunction with our Privacy Policy and Terms &
                Conditions.
              </p>
              <p>
                By using this website, you consent to the use of cookies in
                accordance with this Cookie Policy. If you do not agree with our
                use of cookies, you should adjust your browser settings
                accordingly or discontinue use of our website.
              </p>
              <p>
                We are committed to being transparent about our use of cookies
                and providing you with information about how they work and how
                they affect your browsing experience. This policy will help you
                understand what cookies are, how we use them, and how you can
                manage them.
              </p>
            </div>
          </Section>

          <div className="h-px bg-zinc-400/20 my-12" />

          {/* What Are Cookies */}
          <Section>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-oswald font-semibold text-white mb-6">
              2. What Are Cookies
            </h2>
            <div className="text-zinc-300 text-base sm:text-lg font-poppins leading-relaxed space-y-4">
              <p>
                Cookies are small text files that are stored on your device
                (computer, tablet, or mobile device) when you visit a website.
                They are widely used to make websites work more efficiently and
                to provide information to website owners.
              </p>
              <p>
                Cookies help improve website functionality, performance, and
                user experience by remembering your preferences, understanding
                how you interact with our website, and enabling certain features
                to work properly.
              </p>
              <p>
                Cookies can be "session cookies" (which are deleted when you
                close your browser) or "persistent cookies" (which remain on
                your device for a set period or until you delete them). They can
                also be "first-party cookies" (set by our website) or
                "third-party cookies" (set by other websites or services).
              </p>
              <p>
                In addition to cookies, we may also use other similar
                technologies such as web beacons, pixel tags, and local storage
                to collect and store information about your use of our website.
                These technologies work similarly to cookies and are covered by
                this Cookie Policy.
              </p>
            </div>
          </Section>

          <div className="h-px bg-zinc-400/20 my-12" />

          {/* Types of Cookies We Use */}
          <Section>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-oswald font-semibold text-white mb-6">
              3. Types of Cookies We Use
            </h2>
            <div className="text-zinc-300 text-base sm:text-lg font-poppins leading-relaxed space-y-6">
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-oswald font-semibold text-white mb-4">
                  Essential Cookies
                </h3>
                <p>
                  These cookies are necessary for the website to function
                  properly and cannot be disabled in our systems. They are
                  usually only set in response to actions made by you, such as
                  setting your privacy preferences, logging in, or filling in
                  forms.
                </p>
                <p>
                  Essential cookies enable basic features such as page
                  navigation, form submissions, secure areas access, and
                  remembering your preferences during your visit. Without these
                  cookies, services you have requested cannot be provided, and
                  we only use these cookies to provide you with those services.
                </p>
                <p>
                  These cookies do not store any personally identifiable
                  information and are essential for the website's core
                  functionality. They typically expire when you close your
                  browser session.
                </p>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-oswald font-semibold text-white mb-4">
                  Performance & Analytics Cookies
                </h3>
                <p>
                  These cookies help us understand how visitors interact with
                  our website by collecting and reporting information
                  anonymously. They allow us to recognize and count the number
                  of visitors and see how visitors move around our website when
                  they are using it.
                </p>
                <p>
                  This helps us improve website performance, identify popular
                  content, understand user behavior patterns, and optimize our
                  website's structure and content. The information collected is
                  aggregated and anonymous, meaning it does not identify
                  individual users.
                </p>
                <p>
                  We use this data to enhance user experience, improve website
                  speed and functionality, and ensure that our website meets the
                  needs of our visitors. These cookies may be set by us or by
                  third-party analytics providers whose services we use.
                </p>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-oswald font-semibold text-white mb-4">
                  Functionality Cookies
                </h3>
                <p>
                  These cookies remember user preferences such as language
                  selection, region settings, font size, and other display
                  preferences to enhance and personalize your user experience.
                </p>
                <p>
                  Functionality cookies allow the website to remember choices
                  you make (such as your username, language, or region) and
                  provide enhanced, more personalized features. They may also be
                  used to provide services you have requested, such as watching
                  a video or commenting on a blog.
                </p>
                <p>
                  The information these cookies collect may be anonymized and
                  cannot track your browsing activity on other websites. These
                  cookies enable us to provide a more tailored experience and
                  remember your preferences for future visits.
                </p>
              </div>
            </div>
          </Section>

          <div className="h-px bg-zinc-400/20 my-12" />

          {/* Third-Party Cookies */}
          <Section>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-oswald font-semibold text-white mb-6">
              4. Third-Party Cookies
            </h2>
            <div className="text-zinc-300 text-base sm:text-lg font-poppins leading-relaxed space-y-4">
              <p>
                We may use third-party tools and services (such as analytics
                services, advertising networks, social media platforms, and
                content delivery networks) that place cookies on your device to
                collect usage information and provide various services.
              </p>
              <p>
                These third-party cookies are used for purposes such as website
                analytics, advertising, social media integration, and content
                personalization. We do not control these cookies, and their
                usage is governed by the respective third parties' privacy
                policies and cookie policies.
              </p>
              <p>
                Third-party cookies may track your browsing activity across
                different websites to build a profile of your interests and
                provide you with relevant advertisements or content. We
                encourage you to review the privacy and cookie policies of these
                third parties to understand how they use cookies and what
                information they collect.
              </p>
              <p>
                Some common third-party services we may use include Google
                Analytics, social media platforms, and advertising networks. You
                can learn more about how these services use cookies by visiting
                their respective websites and privacy policies.
              </p>
            </div>
          </Section>

          <div className="h-px bg-zinc-400/20 my-12" />

          {/* Managing Cookies */}
          <Section>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-oswald font-semibold text-white mb-6">
              5. Managing Cookies
            </h2>
            <div className="text-zinc-300 text-base sm:text-lg font-poppins leading-relaxed space-y-4">
              <p>
                You have the right to control and manage cookies on your device.
                Most web browsers allow you to control cookies through their
                settings preferences. You can control or disable cookies through
                your browser settings, and you can also delete cookies that have
                already been set.
              </p>
              <p>
                Please note that disabling certain cookies may affect website
                functionality and your user experience. Some features of our
                website may not function properly if cookies are disabled,
                particularly essential cookies that are necessary for the
                website to operate.
              </p>
              <p>
                To manage cookies in your browser, you can typically find cookie
                settings in the "Privacy" or "Security" section of your
                browser's preferences or settings menu. Different browsers
                provide different ways to manage cookies:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>You can block all cookies or only third-party cookies</li>
                <li>You can delete existing cookies from your browser</li>
                <li>
                  You can set your browser to notify you before accepting
                  cookies
                </li>
                <li>
                  You can configure your browser to automatically delete cookies
                  when you close it
                </li>
              </ul>
              <p>
                For more specific instructions on how to manage cookies in your
                particular browser, please refer to your browser's help section
                or visit the browser manufacturer's website.
              </p>
              <p>
                Additionally, you can opt out of certain third-party cookies by
                visiting the respective third-party websites or using opt-out
                tools provided by advertising networks and analytics services.
              </p>
            </div>
          </Section>

          <div className="h-px bg-zinc-400/20 my-12" />

          {/* Updates to Cookie Policy */}
          <Section>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-oswald font-semibold text-white mb-6">
              6. Updates to Cookie Policy
            </h2>
            <div className="text-zinc-300 text-base sm:text-lg font-poppins leading-relaxed space-y-4">
              <p>
                We may update this Cookie Policy from time to time to reflect
                changes in our practices, technology, legal requirements, or for
                other operational, legal, or regulatory reasons. Any changes
                will be posted on this page with an updated "Last Updated" date.
              </p>
              <p>
                We encourage you to review this Cookie Policy periodically to
                stay informed about how we use cookies and similar technologies.
                Your continued use of our website after any changes to this
                Cookie Policy constitutes your acceptance of those changes.
              </p>
              <p>
                If we make significant changes to this Cookie Policy, we may
                notify you through a prominent notice on our website or by other
                means, such as email, to ensure you are aware of the changes.
                However, it is your responsibility to review this policy
                regularly.
              </p>
            </div>
          </Section>

          <div className="h-px bg-zinc-400/20 my-12" />

          {/* Cookie Duration */}
          <Section>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-oswald font-semibold text-white mb-6">
              7. Cookie Duration and Lifespan
            </h2>
            <div className="text-zinc-300 text-base sm:text-lg font-poppins leading-relaxed space-y-4">
              <p>
                Cookies have different lifespans depending on their purpose and
                type. Understanding cookie duration helps you make informed
                decisions about managing your cookie preferences.
              </p>
              <p>
                <strong className="text-white">Session Cookies:</strong> These
                cookies are temporary and are deleted automatically when you
                close your browser. They are used to maintain your session while
                you navigate through our website and do not persist after you
                leave.
              </p>
              <p>
                <strong className="text-white">Persistent Cookies:</strong>{" "}
                These cookies remain on your device for a specified period or
                until you manually delete them. They can last from a few days to
                several years, depending on their purpose. Persistent cookies
                help us remember your preferences and provide a better user
                experience across multiple visits.
              </p>
              <p>
                The duration of cookies we use varies based on their function:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  Essential cookies typically expire when you close your browser
                </li>
                <li>Functionality cookies may last for up to 12 months</li>
                <li>Analytics cookies may persist for up to 24 months</li>
                <li>
                  Third-party cookies follow the policies of their respective
                  providers
                </li>
              </ul>
              <p>
                You can delete cookies at any time through your browser
                settings, regardless of their intended duration. However,
                deleting cookies may require you to re-enter information or
                reset preferences on subsequent visits.
              </p>
            </div>
          </Section>

          <div className="h-px bg-zinc-400/20 my-12" />

          {/* Your Rights */}
          <Section>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-oswald font-semibold text-white mb-6">
              8. Your Rights Regarding Cookies
            </h2>
            <div className="text-zinc-300 text-base sm:text-lg font-poppins leading-relaxed space-y-4">
              <p>
                You have several rights regarding cookies and your personal data
                collected through cookies. We respect your privacy choices and
                are committed to providing you with control over your cookie
                preferences.
              </p>
              <p>
                <strong className="text-white">Right to Information:</strong>{" "}
                You have the right to be informed about what cookies are used on
                our website and how they are used. This Cookie Policy provides
                comprehensive information about our cookie practices.
              </p>
              <p>
                <strong className="text-white">Right to Consent:</strong> For
                non-essential cookies, you have the right to provide or withdraw
                your consent at any time. You can manage your cookie preferences
                through your browser settings or our cookie consent tool (if
                available).
              </p>
              <p>
                <strong className="text-white">Right to Access:</strong> You
                have the right to access information about what personal data we
                collect through cookies and how it is used. You can request this
                information by contacting us.
              </p>
              <p>
                <strong className="text-white">Right to Control:</strong> You
                have the right to control which cookies are placed on your
                device. You can accept, reject, or delete cookies through your
                browser settings at any time.
              </p>
              <p>
                <strong className="text-white">Right to Object:</strong> You
                have the right to object to the use of certain cookies,
                particularly those used for marketing or analytics purposes. You
                can exercise this right through your browser settings or by
                contacting us.
              </p>
              <p>
                If you wish to exercise any of these rights or have questions
                about your rights regarding cookies, please contact us using the
                contact information provided in this policy.
              </p>
            </div>
          </Section>

          <div className="h-px bg-zinc-400/20 my-12" />

          {/* Do Not Track */}
          <Section>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-oswald font-semibold text-white mb-6">
              9. Do Not Track Signals
            </h2>
            <div className="text-zinc-300 text-base sm:text-lg font-poppins leading-relaxed space-y-4">
              <p>
                Some web browsers incorporate a "Do Not Track" (DNT) feature
                that signals to websites you visit that you do not want to have
                your online activity tracked. Currently, there is no industry
                standard for how DNT signals should be interpreted, as different
                browsers may send different signals.
              </p>
              <p>
                We respect your privacy preferences, but we do not currently
                respond to DNT browser signals or mechanisms. This is because
                there is no common understanding of what DNT means, and there is
                no consistent way to honor such signals.
              </p>
              <p>
                However, you can still control cookies and tracking through your
                browser settings as described in Section 5 (Managing Cookies).
                We encourage you to use your browser's privacy settings to
                manage your cookie preferences and control tracking.
              </p>
              <p>
                If a universal standard for DNT signals is established in the
                future, we will review and update our practices accordingly to
                comply with such standards.
              </p>
            </div>
          </Section>

          <div className="h-px bg-zinc-400/20 my-12" />

          {/* Security */}
          <Section>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-oswald font-semibold text-white mb-6">
              10. Security of Information
            </h2>
            <div className="text-zinc-300 text-base sm:text-lg font-poppins leading-relaxed space-y-4">
              <p>
                We take the security of information collected through cookies
                seriously and implement appropriate technical and organizational
                measures to protect your data against unauthorized access,
                alteration, disclosure, or destruction.
              </p>
              <p>
                Our website uses industry-standard security technologies and
                procedures to help protect your information. This includes the
                use of secure connections (HTTPS), encryption where appropriate,
                and regular security assessments of our systems.
              </p>
              <p>
                However, no method of transmission over the Internet or
                electronic storage is 100% secure. While we strive to use
                commercially acceptable means to protect your information, we
                cannot guarantee absolute security.
              </p>
              <p>
                We recommend that you also take steps to protect your personal
                information, such as:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Keeping your browser and operating system up to date</li>
                <li>Using strong, unique passwords for your accounts</li>
                <li>
                  Being cautious about sharing personal information online
                </li>
                <li>Regularly reviewing and managing your cookie settings</li>
                <li>Using antivirus and anti-malware software</li>
              </ul>
              <p>
                If you believe that your personal information has been
                compromised or if you have any security concerns, please contact
                us immediately.
              </p>
            </div>
          </Section>

          <div className="h-px bg-zinc-400/20 my-12" />

          {/* Children's Privacy */}
          <Section>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-oswald font-semibold text-white mb-6">
              11. Children's Privacy
            </h2>
            <div className="text-zinc-300 text-base sm:text-lg font-poppins leading-relaxed space-y-4">
              <p>
                Our website is not intended for children under the age of 18. We
                do not knowingly collect personal information from children
                through cookies or any other means without appropriate parental
                consent.
              </p>
              <p>
                If you are a parent or guardian and believe that your child has
                provided us with personal information through our website,
                please contact us immediately. We will take steps to delete such
                information from our systems as soon as reasonably possible.
              </p>
              <p>
                We encourage parents and guardians to monitor their children's
                online activities and to help enforce this Cookie Policy by
                instructing their children never to provide personal information
                on our website without their permission.
              </p>
              <p>
                If we become aware that we have collected personal information
                from a child without verification of parental consent, we will
                take steps to remove that information from our servers and
                delete any related cookies.
              </p>
            </div>
          </Section>

          <div className="h-px bg-zinc-400/20 my-12" />

          {/* Links to Other Policies */}
          <Section>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-oswald font-semibold text-white mb-6">
              12. Links to Other Policies
            </h2>
            <div className="text-zinc-300 text-base sm:text-lg font-poppins leading-relaxed space-y-4">
              <p>
                This Cookie Policy should be read in conjunction with our other
                privacy and legal policies. Our use of cookies is part of our
                broader data protection and privacy practices.
              </p>
              <p>
                <strong className="text-white">Privacy Policy:</strong> Our
                Privacy Policy provides detailed information about how we
                collect, use, store, and protect your personal information,
                including information collected through cookies. It explains
                your privacy rights and how you can exercise them.
              </p>
              <p>
                <strong className="text-white">Terms & Conditions:</strong> Our
                Terms & Conditions govern your use of our website and services,
                including your agreement to our use of cookies as described in
                this Cookie Policy.
              </p>
              <p>
                These policies work together to provide you with a comprehensive
                understanding of how we handle your information and your rights
                regarding our website and services. We encourage you to review
                all relevant policies to fully understand our practices.
              </p>
              <p>
                If there is any conflict or inconsistency between this Cookie
                Policy and our Privacy Policy or Terms & Conditions, the terms
                of this Cookie Policy shall govern with respect to
                cookie-related matters.
              </p>
            </div>
          </Section>

          <div className="h-px bg-zinc-400/20 my-12" />

          {/* Contact Section */}
          <Section>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-oswald font-semibold text-white mb-6">
              13. Contact Information
            </h2>
            <div className="text-zinc-300 text-base sm:text-lg font-poppins leading-relaxed space-y-4">
              <p>
                If you have any questions, concerns, or inquiries regarding this
                Cookie Policy or our use of cookies, please feel free to contact
                us using the following information:
              </p>
              <div className="space-y-4 mt-6">
                <div>
                  <p className="text-white font-semibold mb-2">Email:</p>
                  <a
                    href="mailto:info@ggwint.com"
                    className="block text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    info@ggwint.com
                  </a>
                </div>
                <div>
                  <p className="text-white font-semibold mb-2">Phone:</p>
                  <a
                    href="tel:+97142712771"
                    className="text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    +971 4 271 2771
                  </a>
                </div>
                <div>
                  <p className="text-white font-semibold mb-2">Location:</p>
                  <p className="text-zinc-300">
                    GGW INTERNATIONAL GENERAL TRADING LLC
                    <br />
                    Office 393, White Crown Building,
                    <br />
                    Sheikh Zayed Road, Dubai, United Arab Emirates
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

export default CookiePolicy;
