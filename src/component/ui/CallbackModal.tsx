"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import { FiCheck } from "react-icons/fi";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useCallbackModalStore } from "../../store/callbackModalStore";

const uaePhoneRegex = /^(?:\+971|00971|0)?(?:5[0124568])\d{7}$/;

const callbackSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string()
    .min(1, "Phone number is required")
    .refine((val) => {
      // Validate either as UAE standard or international 10-15 digits
      const digits = val.replace(/\D/g, "");
      return uaePhoneRegex.test(val) || (digits.length >= 10 && digits.length <= 15);
    }, "Please enter a valid UAE number (e.g. 50 123 4567) or international number (e.g. +1...)"),
  email: z.string().email("Invalid email address"),
  enquiry: z.string().min(1, "Please select a service"),
  website: z.string().optional(),
});

type FormData = z.infer<typeof callbackSchema>;

const services = [
  "Auto Spare Parts",
  "Construction and Safety Tools",
  "Construction Materials",
  "Electrics and Electronics",
  "Food, Agro & Pharma Chemicals",
  "Food Products",
  "IT and Accessories",
  "Paints and Finishes",
  "Solar Panels & Lithium Batteries",
  "Water and Fire Proofing",
  "Others",
];

const CallbackModal = () => {
  const { isOpen, closeModal } = useCallbackModalStore();
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(
    null
  );
  const [message, setMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(callbackSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      enquiry: "",
      website: "",
    },
  });

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const onSubmit = async (data: FormData) => {
    try {
      let finalPhone = data.phone;
      // If it's a 9-digit UAE number without prefix, add +971
      if (/^[50|52|54|55|56|58]\d{8}$/.test(data.phone.replace(/\s/g, ""))) {
        finalPhone = "+971" + data.phone.replace(/\D/g, "");
      }

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("phone", finalPhone);
      formData.append("email", data.email);
      formData.append("enquiry", data.enquiry);
      formData.append("formType", "callback");
      formData.append("website", data.website ?? "");

      const response = await fetch(`/api/mail.php`, {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();

      if (responseData.status === "error") {
        throw new Error(responseData.message);
      }

      setMessage(
        responseData.message ||
        "Thank you! Our team will contact you within 24 hours."
      );
      setSubmitStatus("success");
      reset();

      // Auto close after 3 seconds
      setTimeout(() => {
        setSubmitStatus(null);
        closeModal();
      }, 3000);
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("Something went wrong. Please try again.");
      }
      setTimeout(() => setSubmitStatus(null), 3000);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      reset();
      setSubmitStatus(null);
      setMessage("");
      closeModal();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-9999"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-10000 flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative bg-canvas border border-hairline rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                disabled={isSubmitting}
                className="absolute top-4 right-4 text-muted hover:text-ink transition-colors z-10 disabled:opacity-50"
              >
                <IoClose className="w-6 h-6" />
              </button>

              {/* Content */}
              <div className="p-6 sm:p-8">
                {/* Header */}
                <div className="mb-6">
                  <h2 className="mb-2 text-section text-ink">
                    Request Callback
                  </h2>
                  <p className="text-muted text-sm sm:text-base ">
                    Fill the below information our team will contact you within
                    24hrs
                  </p>
                </div>

                {/* Success Message */}
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                      <FiCheck className="text-green-400 text-2xl" />
                    </div>
                    <p className="text-green-400  font-semibold text-lg mb-2">
                      Success!
                    </p>
                    <p className="text-body  text-sm">
                      {message}
                    </p>
                  </motion.div>
                )}

                {/* Error Message */}
                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                      <span className="text-red-400 text-2xl">⚠️</span>
                    </div>
                    <p className="text-red-400  font-semibold text-lg mb-2">
                      Error
                    </p>
                    <p className="text-body  text-sm">
                      {message}
                    </p>
                  </motion.div>
                )}

                {/* Form */}
                {submitStatus === null && (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Name Field */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-ink  font-medium mb-2 text-sm"
                      >
                        Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        {...register("name", {
                          required: "Name is required",
                        })}
                        placeholder="Enter your full name"
                        className={`w-full px-4 py-3 border-2 rounded-lg bg-canvas text-ink  focus:outline-none transition-colors placeholder:text-zinc-500 text-sm ${errors.name
                          ? "border-red-500"
                          : "border-hairline focus:border-cyan-400/50"
                          }`}
                      />
                      {errors.name && (
                        <p className="text-red-400 text-xs mt-1 ">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Phone Field */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-ink  font-medium mb-2 text-sm"
                      >
                        Phone Number <span className="text-red-400">*</span>
                      </label>
                      <div className="flex gap-2">
                        <div className="flex items-center px-3 border-2 border-hairline rounded-lg bg-canvas text-muted  text-sm">
                          +971
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          {...register("phone")}
                          placeholder="50 123 4567"
                          className={`flex-1 px-4 py-3 border-2 rounded-lg bg-canvas text-ink  focus:outline-none transition-colors placeholder:text-zinc-500 text-sm ${errors.phone
                            ? "border-red-500"
                            : "border-hairline focus:border-cyan-400/50"
                            }`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-400 text-xs mt-1 ">
                          {errors.phone.message}
                        </p>
                      )}
                      <p className="text-zinc-500 text-[10px] mt-1 ">
                        UAE number (9 digits) or international with +
                      </p>
                    </div>

                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-ink  font-medium mb-2 text-sm"
                      >
                        Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Invalid email address",
                          },
                        })}
                        placeholder="Enter your email address"
                        className={`w-full px-4 py-3 border-2 rounded-lg bg-canvas text-ink  focus:outline-none transition-colors placeholder:text-zinc-500 text-sm ${errors.email
                          ? "border-red-500"
                          : "border-hairline focus:border-cyan-400/50"
                          }`}
                      />
                      {errors.email && (
                        <p className="text-red-400 text-xs mt-1 ">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Enquiry Dropdown */}
                    <div>
                      <label
                        htmlFor="enquiry"
                        className="block text-ink  font-medium mb-2 text-sm"
                      >
                        Enquiry For <span className="text-red-400">*</span>
                      </label>
                      <select
                        id="enquiry"
                        {...register("enquiry", {
                          required: "Please select a service",
                        })}
                        className={`w-full px-4 py-3 border-2 rounded-lg bg-canvas text-ink  focus:outline-none transition-colors text-sm ${errors.enquiry
                          ? "border-red-500"
                          : "border-hairline focus:border-cyan-400/50"
                          }`}
                      >
                        <option value="">Select a service</option>
                        {services.map((service) => (
                          <option key={service} value={service}>
                            {service}
                          </option>
                        ))}
                      </select>
                      {errors.enquiry && (
                        <p className="text-red-400 text-xs mt-1 ">
                          {errors.enquiry.message}
                        </p>
                      )}
                    </div>

                    {/* Honeypot */}
                    <div className="hidden">
                      <input type="text" {...register("website")} />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-3 bg-cyan-400/20 hover:bg-cyan-400/30 border border-cyan-400/30 hover:border-cyan-400/50 text-cyan-400  font-medium text-sm tracking-wider rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 0.8,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                            className="w-5 h-5 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full"
                          />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <span>Submit Request</span>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CallbackModal;
