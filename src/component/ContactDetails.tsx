"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import type { PanInfo } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SITE_CONTACT } from "../data/contact";


const uaePhoneRegex = /^(?:\+971|00971|0)?(?:5[0124568])\d{7}$/;

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string()
    .min(1, "Phone number is required")
    .refine((val) => {
      const digits = val.replace(/\D/g, "");
      return uaePhoneRegex.test(val) || (digits.length >= 10 && digits.length <= 15);
    }, "Please enter a valid UAE number (e.g. 050 123 4567) or international number (e.g. +1...)"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  privacy: z
    .boolean()
    .refine(val => val === true, {
      message: "You must agree to the privacy policy",
    }),
  website: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const ContactDetails = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
      privacy: false,
      website: "",
    },
  });

  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(
    null
  );
  const [message, setMessage] = useState<string>("");
  const [isSlideComplete, setIsSlideComplete] = useState(false);
  const [sliderWidth, setSliderWidth] = useState(280);
  const sliderRef = useRef<HTMLDivElement>(null);

  const thumbSize = 48;
  const maxDrag = sliderWidth - thumbSize - 8; // 8 for padding

  // Motion values for smooth dragging
  const x = useMotionValue(0);
  const progress = useTransform(x, [0, maxDrag], [0, 100]);
  const progressWidth = useTransform(x, (val) => val + thumbSize + 4);
  const textOpacity = useTransform(progress, [0, 50], [1, 0]);

  // Update slider width on mount and resize
  useEffect(() => {
    const updateWidth = () => {
      if (sliderRef.current) {
        setSliderWidth(sliderRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const onSubmit = async (data: FormData) => {
    console.log(data);
    setSubmitStatus(null);
    if (data.website) {
      // Honeypot filled, treat as success silently
      reset();
      return;
    }

    try {
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("message", data.message);
      formData.append("formType", "contact");
      formData.append("website", data.website ?? "");

      const response = await fetch(`/api/mail.php`, {
        method: "POST",
        body: formData,
      });
      console.log(response);

      const responseData = await response.json();
      console.log(responseData);

      if (responseData.status === "error") {
        throw new Error(responseData.message);
      }

      setMessage(responseData.message);
      setSubmitStatus("success");
      reset();
      x.set(0);
      setIsSlideComplete(false);

      // Hide message after 3 seconds and show form again
      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
      if (error instanceof Error) {
        setMessage(error.message);
      }
      setTimeout(() => setSubmitStatus(null), 3000);
      x.set(0);
      setIsSlideComplete(false);
    }
  };

  const handleSliderDrag = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (!isValid) {
      x.set(0);
      return;
    }

    const currentX = x.get() + info.delta.x;
    const clampedX = Math.max(0, Math.min(currentX, maxDrag));
    x.set(clampedX);

    // Check if slide is complete (85% threshold)
    if (clampedX >= maxDrag * 0.85) {
      if (!isSlideComplete) setIsSlideComplete(true);
    } else {
      if (isSlideComplete) setIsSlideComplete(false);
    }
  };

  const handleSliderDragEnd = () => {
    const currentX = x.get();

    if (currentX >= maxDrag * 0.85) {
      // Snap to end and submit
      animate(x, maxDrag, { type: "spring", stiffness: 300, damping: 30 });
      // Trigger form submission
      const form = document.getElementById("get-free-quote") as HTMLFormElement;
      if (form) {
        form.requestSubmit();
      }
    } else {
      // Spring back to start
      animate(x, 0, { type: "spring", stiffness: 500, damping: 30 });
      setIsSlideComplete(false);
    }
  };

  return (
    <div className="bg-canvas text-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-28 mb-10 screen-line-top">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-oswald font-light leading-tight mb-6"
        >
          Please Reach Out to Us
        </motion.h2>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-zinc-400 font-poppins tracking-wide mb-10 max-w-4xl leading-relaxed"
        >
          We are here to help you with event management, general trading,
          printing services, and corporate gift supply. Based in Dubai, UAE, we
          deliver excellence across the region. Reach out to our team for
          personalized solutions tailored to your business needs in Dubai, UAE.
        </motion.p>

        {/* Left-Right Layout: Form & Contact Info */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-16 items-start">
          {/* Left Side: Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="w-full lg:w-1/2 flex flex-col"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              id="get-free-quote"
              noValidate
              className="w-full"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-oswald font-semibold text-white mb-3">
                Send Us a Message
              </h2>
              <p className="text-zinc-400 font-poppins text-base sm:text-lg mb-8 tracking-wide">
                Have a question or something to share? Send us a message. We'll
                get back to you shortly!
              </p>

              <div className="relative">
                {/* Success message */}
                {submitStatus === "success" && (
                  <div className="text-center py-16 absolute inset-0 flex flex-col items-center justify-center bg-[#1a1a1a]/95 backdrop-blur-sm border border-zinc-400/30 rounded-2xl z-10">
                    <div className="text-7xl mb-6">🚀</div>
                    <p className="text-2xl text-cyan-400 font-semibold font-poppins">
                      {message}
                    </p>
                  </div>
                )}

                {/* Error message */}
                {submitStatus === "error" && (
                  <div className="text-center py-16 absolute inset-0 flex flex-col items-center justify-center bg-[#1a1a1a]/95 backdrop-blur-sm border border-red-500/30 rounded-2xl z-10">
                    <div className="text-7xl mb-6">⚠️</div>
                    <p className="text-2xl text-red-400 font-semibold mb-4 font-poppins">
                      Sorry, something went wrong.
                    </p>
                    <p className="text-lg font-poppins text-zinc-400">
                      {message}
                    </p>
                  </div>
                )}

                {/* Form inputs (shown only when no submit status) */}
                {submitStatus === null && (
                  <div className="space-y-6">
                    {/* Two column grid for first name and last name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="firstName"
                          className="block text-white font-poppins font-medium mb-2"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          {...register("firstName")}
                          placeholder="Enter your first name"
                          className={`w-full h-10 px-3.5 border border-hairline rounded-md bg-canvas text-ink focus:outline-none focus:border-ink transition-colors placeholder:text-muted ${errors.firstName
                            ? "border-red-500"
                            : "border-zinc-400/30 focus:border-cyan-400/50"
                            }`}
                        />
                        {errors.firstName && (
                          <p className="text-red-400 text-sm mt-1 font-poppins">
                            {errors.firstName.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="lastName"
                          className="block text-white font-poppins font-medium mb-2"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          {...register("lastName")}
                          placeholder="Enter your last name"
                          className={`w-full h-10 px-3.5 border border-hairline rounded-md bg-canvas text-ink focus:outline-none focus:border-ink transition-colors placeholder:text-muted ${errors.lastName
                            ? "border-red-500"
                            : "border-zinc-400/30 focus:border-cyan-400/50"
                            }`}
                        />
                        {errors.lastName && (
                          <p className="text-red-400 text-sm mt-1 font-poppins">
                            {errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Two column grid for email and phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-white font-poppins font-medium mb-2"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          {...register("email")}
                          placeholder="Enter your email address"
                          className={`w-full h-10 px-3.5 border border-hairline rounded-md bg-canvas text-ink focus:outline-none focus:border-ink transition-colors placeholder:text-muted ${errors.email
                            ? "border-red-500"
                            : "border-zinc-400/30 focus:border-cyan-400/50"
                            }`}
                        />
                        {errors.email && (
                          <p className="text-red-400 text-sm mt-1 font-poppins">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-white font-poppins font-medium mb-2"
                        >
                          Phone no
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          {...register("phone")}
                          placeholder="Enter your phone number"
                          className={`w-full h-10 px-3.5 border border-hairline rounded-md bg-canvas text-ink focus:outline-none focus:border-ink transition-colors placeholder:text-muted ${errors.phone
                            ? "border-red-500"
                            : "border-zinc-400/30 focus:border-cyan-400/50"
                            }`}
                        />
                        {errors.phone && (
                          <p className="text-red-400 text-sm mt-1 font-poppins">
                            {errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Message field */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-white font-poppins font-medium mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        {...register("message")}
                        placeholder="Enter your message"
                        rows={6}
                        className={`w-full px-3.5 py-2.5 border border-hairline rounded-md bg-canvas text-ink focus:outline-none focus:border-ink transition-colors resize-none placeholder:text-muted ${errors.message
                          ? "border-red-500"
                          : "border-zinc-400/30 focus:border-cyan-400/50"
                          }`}
                      />
                      {errors.message && (
                        <p className="text-red-400 text-sm mt-1 font-poppins">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    {/* Honeypot */}
                    <div className="hidden">
                      <input type="text" {...register("website")} />
                    </div>

                    {/* Privacy */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        {...register("privacy")}
                        className={`w-5 h-5 border-2 transition rounded ${errors.privacy
                          ? "border-red-500 accent-red-500"
                          : "border-zinc-400/30 accent-cyan-400"
                          }`}
                      />
                      <span
                        className={`text-sm ml-2 font-poppins ${errors.privacy ? "text-red-400" : "text-zinc-400"
                          }`}
                      >
                        I agree with the{" "}
                        <a
                          href="#"
                          className="underline underline-offset-2 decoration-1 decoration-cyan-400 text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                          Privacy Policy
                        </a>{" "}
                        and consent to being contacted about my inquiry
                      </span>
                    </div>

                    {/* Submit Slider */}
                    <div className="flex justify-start mt-4">
                      {isSubmitting ? (
                        /* Loading State */
                        <motion.div
                          initial={{ scale: 0.95 }}
                          animate={{ scale: 1 }}
                          className="w-full h-14 rounded-full bg-cyan-400/20 border border-cyan-400/50 flex items-center justify-center gap-3"
                        >
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-6 h-6 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full"
                          />
                          <span className="text-cyan-400 font-poppins font-medium text-sm tracking-wide">
                            Sending...
                          </span>
                        </motion.div>
                      ) : (
                        /* Slider Track */
                        <div
                          ref={sliderRef}
                          className="relative w-full h-10 rounded-md bg-surface-card border border-hairline overflow-hidden select-none touch-none"
                        >
                          {/* Progress Fill */}
                          <motion.div
                            className="absolute inset-y-1 left-1 rounded-full bg-linear-to-r from-cyan-500/40 via-purple-500/30 to-purple-500/40"
                            style={{ width: progressWidth }}
                          />

                          {/* Shimmer Effect */}
                          <motion.div
                            className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{
                              duration: 2.5,
                              repeat: Infinity,
                              repeatDelay: 0.5,
                              ease: "easeInOut",
                            }}
                          />

                          {/* Text - Slide to Send */}
                          <motion.div
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                            style={{ opacity: textOpacity }}
                          >
                            <div className="flex items-center gap-2">
                              <motion.span
                                animate={{ x: [0, 8, 0] }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Infinity,
                                  ease: "easeInOut",
                                }}
                                className="text-zinc-400"
                              >
                                <FiArrowRight />
                              </motion.span>
                              <span className="font-poppins text-sm tracking-wider text-zinc-400">
                                Slide to Send Message
                              </span>
                            </div>
                          </motion.div>

                          {/* Success Text */}
                          <motion.div
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                            animate={{
                              opacity: isSlideComplete ? 1 : 0,
                              scale: isSlideComplete ? 1 : 0.9,
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="flex items-center gap-2">
                              <FiCheck className="text-green-400" />
                              <span className="font-poppins text-sm tracking-wider text-green-400 font-medium">
                                Release to Send!
                              </span>
                            </div>
                          </motion.div>

                          {/* Draggable Thumb */}
                          <motion.div
                            drag="x"
                            aria-disabled={isSlideComplete}
                            dragConstraints={sliderRef}
                            dragElastic={0}
                            dragMomentum={false}
                            onDragStart={() => {
                              if (!isValid) trigger();
                            }}
                            onDrag={handleSliderDrag}
                            onDragEnd={handleSliderDragEnd}
                            style={{ x }}
                            whileDrag={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="absolute left-1 top-1 bottom-1 w-12 cursor-grab active:cursor-grabbing z-10"
                          >
                            {/* Thumb */}
                            <motion.div
                              className="w-full h-full rounded-full flex items-center justify-center shadow-lg"
                              animate={{
                                background: isSlideComplete
                                  ? "linear-gradient(135deg, #22c55e 0%, #10b981 100%)"
                                  : "linear-gradient(135deg, #22d3ee 0%, #8b5cf6 100%)",
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              <motion.div
                                animate={{
                                  rotate: isSlideComplete ? 0 : 0,
                                  scale: isSlideComplete ? 1.2 : 1,
                                }}
                                transition={{ duration: 0.2 }}
                              >
                                {isSlideComplete ? (
                                  <FiCheck className="text-white text-lg" />
                                ) : (
                                  <FiArrowRight className="text-white text-lg" />
                                )}
                              </motion.div>
                            </motion.div>

                            {/* Thumb Glow */}
                            <motion.div
                              className="absolute inset-0 rounded-full -z-10"
                              animate={{
                                boxShadow: isSlideComplete
                                  ? "0 0 20px rgba(34, 197, 94, 0.6)"
                                  : "0 0 15px rgba(34, 211, 238, 0.4)",
                              }}
                              transition={{ duration: 0.3 }}
                            />
                          </motion.div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </form>
          </motion.div>

          {/* Right Side: Contact Information & Social Media */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="w-full lg:w-1/2 flex flex-col"
          >
            <div className="border border-hairline rounded-lg p-6 sm:p-8 lg:p-10 h-full flex flex-col bg-surface-card">
              <motion.div variants={fadeInUp} className="mb-8">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-oswald font-semibold text-white mb-4">
                  Hi there! We're always here and happy to help you anytime.
                </h3>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                className="space-y-4 mb-8 flex-1"
              >
                <motion.div
                  variants={fadeInUp}
                  className="rounded-lg p-4 flex items-start gap-4"
                >
                  <div className="shrink-0 mt-1">
                    <FaEnvelope className="text-cyan-400 text-xl" />
                  </div>
                  <div>
                    <p className="text-white font-poppins font-medium mb-1">
                      Email
                    </p>
                    <a
                      href="mailto:info@ggwint.com"
                      className="block text-zinc-400 font-poppins hover:text-cyan-400 transition-colors"
                    >
                      info@ggwint.com
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  className="rounded-lg p-4 flex items-start gap-4"
                >
                  <div className="shrink-0 mt-1">
                    <FaPhone className="text-cyan-400 text-xl" />
                  </div>
                  <div>
                    <p className="text-white font-poppins font-medium mb-1">
                      Phone Number
                    </p>
                    <a
                      href={SITE_CONTACT.phoneHref}
                      className="text-zinc-400 font-poppins hover:text-cyan-400 transition-colors"
                    >
                      {SITE_CONTACT.phone}
                    </a>
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  className="rounded-lg p-4 flex items-start gap-4"
                >
                  <div className="shrink-0 mt-1">
                    <FaMapMarkerAlt className="text-cyan-400 text-xl" />
                  </div>
                  <div>
                    <p className="text-white font-poppins font-medium mb-1">
                      Address
                    </p>
                    <p className="text-zinc-400 font-poppins">
                      {SITE_CONTACT.name} <br />
                      {SITE_CONTACT.address}
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <div className="border-t border-zinc-400/30 pt-6">
                  <p className="text-white font-poppins font-medium mb-4">
                    Connect with us
                  </p>
                  <div className="flex gap-4">
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-zinc-400 hover:text-cyan-400 transition-colors"
                    >
                      <FaLinkedinIn className="text-2xl" />
                    </motion.a>
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-zinc-400 hover:text-cyan-400 transition-colors"
                    >
                      <FaInstagram className="text-2xl" />
                    </motion.a>
                    <motion.a
                      href="#"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-zinc-400 hover:text-cyan-400 transition-colors"
                    >
                      <FaFacebookF className="text-2xl" />
                    </motion.a>
                    <motion.a
                      href={SITE_CONTACT.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-zinc-400 hover:text-cyan-400 transition-colors"
                    >
                      <IoLogoWhatsapp className="text-2xl" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Address Section with Google Map */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="w-full"
        >
          <div className="mb-6">
            <h3 className="text-2xl sm:text-3xl font-oswald font-semibold text-white mb-2 tracking-tight">
              Our Address :
            </h3>
            <p className="text-lg text-zinc-400 font-poppins font-medium">
              {SITE_CONTACT.name} <br />
              {SITE_CONTACT.address}
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full h-100 overflow-hidden"
          >
            <iframe
              className="rounded-2xl border-2 border-zinc-400/30"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.0!2d55.2708!3d25.2048!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a67e24d%3A0xff45e502e1ceb7e2!2sDubai%2C%20United%20Arab%20Emirates!5e0!3m2!1sen!2sae!4v1703837058988!5m2!1sen!2sae"
              style={{
                height: "100%",
                width: "100%",
                borderRadius: "16px",
              }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactDetails;
