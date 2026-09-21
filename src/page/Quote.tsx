"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  FaTrash,
  FaMinus,
  FaPlus,
  FaArrowLeft,
  FaPaperPlane,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useQuote } from "../hooks/useQuote";

const uaePhoneRegex = /^(?:\+971|00971|0)?(?:5[0124568])\d{7}$/;

const quoteSchema = z
  .object({
    billing_first_name: z.string().min(2, "First name is required"),
    billing_last_name: z.string().min(2, "Last name is required"),
    billing_email: z.string().email("Invalid email address"),
    billing_phone: z
      .string()
      .min(1, "Phone number is required")
      .refine((val) => {
        const digits = val.replace(/\D/g, "");
        return (
          uaePhoneRegex.test(val) ||
          (digits.length >= 10 && digits.length <= 15)
        );
      }, "Please enter a valid UAE number (e.g. 050 123 4567) or international number (e.g. +1...)"),
    billing_address: z.string().min(5, "Address is required"),
    billing_town: z.string().min(2, "City is required"),
    billing_state: z.string(),
    billing_postcode: z.string().optional(),

    shipping_same_as_billing: z.boolean(),

    shipping_first_name: z.string().optional(),
    shipping_last_name: z.string().optional(),
    shipping_email: z
      .string()
      .email("Invalid email address")
      .optional()
      .or(z.literal("")),
    shipping_phone: z
      .string()
      .optional()
      .refine((val) => {
        if (!val) return true;
        const digits = val.replace(/\D/g, "");
        return (
          uaePhoneRegex.test(val) ||
          (digits.length >= 10 && digits.length <= 15)
        );
      }, "Please enter a valid UAE number or international number"),
    shipping_address: z.string().optional(),
    shipping_town: z.string().optional(),
    shipping_state: z.string().optional(),
    shipping_postcode: z.string().optional(),

    order_notes: z.string().optional(),
    website: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.shipping_same_as_billing) {
        return (
          !!data.shipping_first_name &&
          !!data.shipping_last_name &&
          !!data.shipping_email &&
          !!data.shipping_phone &&
          !!data.shipping_address &&
          !!data.shipping_town
        );
      }
      return true;
    },
    {
      message:
        "Shipping information is required when shipping address is different",
      path: ["shipping_first_name"],
    }
  );

type QuoteFormData = z.infer<typeof quoteSchema>;

const Quote = () => {
  const { items, removeFromQuote, clearQuote, updateQuantity } = useQuote();
  const methods = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      billing_state: "Dubai",
      shipping_same_as_billing: true,
      shipping_state: "Dubai",
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = methods;

  const shippingSameAsBilling = watch("shipping_same_as_billing");
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [loading, setLoading] = useState(false);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const tax = useMemo(() => subtotal * 0.05, [subtotal]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  const onSubmit: SubmitHandler<QuoteFormData> = async (data) => {
    setStatus({ type: null, message: "" });
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("formType", "quote");

      // Add billing data
      formData.append("billing_first_name", data.billing_first_name);
      formData.append("billing_last_name", data.billing_last_name);
      formData.append("billing_email", data.billing_email);
      formData.append("billing_phone", data.billing_phone);
      formData.append("billing_address", data.billing_address);
      formData.append("billing_town", data.billing_town);
      formData.append("billing_state", data.billing_state);
      formData.append("billing_postcode", data.billing_postcode || "");

      // Handle shipping info
      if (data.shipping_same_as_billing) {
        formData.append("shipping_first_name", data.billing_first_name);
        formData.append("shipping_last_name", data.billing_last_name);
        formData.append("shipping_email", data.billing_email);
        formData.append("shipping_phone", data.billing_phone);
        formData.append("shipping_address", data.billing_address);
        formData.append("shipping_town", data.billing_town);
        formData.append("shipping_state", data.billing_state);
        formData.append("shipping_postcode", data.billing_postcode || "");
      } else {
        formData.append("shipping_first_name", data.shipping_first_name || "");
        formData.append("shipping_last_name", data.shipping_last_name || "");
        formData.append("shipping_email", data.shipping_email || "");
        formData.append("shipping_phone", data.shipping_phone || "");
        formData.append("shipping_address", data.shipping_address || "");
        formData.append("shipping_town", data.shipping_town || "");
        formData.append("shipping_state", data.shipping_state || "Dubai");
        formData.append("shipping_postcode", data.shipping_postcode || "");
      }

      formData.append("order_notes", data.order_notes || "");
      formData.append("cart_items", JSON.stringify(items));
      formData.append("cart_total", subtotal.toFixed(2));
      formData.append("order_total", total.toFixed(2));
      formData.append("website", data.website || "");

      const response = await fetch("/api/mail.php", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.status === "success") {
        setStatus({
          type: "success",
          message: "Quote request sent successfully! We will contact you soon.",
        });
        clearQuote();
        reset();
      } else {
        setStatus({
          type: "error",
          message: result.message || "Failed to send quote request.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 mt-5">
        <div className="mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-base uppercase tracking-[0.2em] text-zinc-500 font-poppins">
              Quote Information
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-oswald text-white uppercase tracking-tight">
              Review Your Quote
            </h1>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearQuote}
              className="px-6 py-2.5 rounded-full border border-red-500/50 bg-red-500/10 text-red-500 font-poppins hover:bg-red-500 hover:text-white transition-all duration-300"
            >
              Clear List
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="p-12 rounded-2xl border border-dashed border-hairline bg-zinc-900/50 shadow-xl text-center">
            <div className="text-5xl mb-6">📑</div>
            <p className="font-poppins text-lg text-zinc-400 mb-8 max-w-md mx-auto">
              No items in your quote list yet. Explore our products and add them
              here to receive a personalized quote.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-primary text-on-primary font-poppins font-medium hover:bg-green-700 transition-all shadow-lg shadow-green-900/20"
            >
              <FaArrowLeft className="h-4 w-4" />
              Start Browsing
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Summary + Items */}
            <div className="lg:col-span-5 space-y-8">
              {/* Simplified Pricing Summary Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 sm:p-5 rounded-2xl bg-zinc-900 border border-hairline shadow-xl relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4 border-b border-hairline/50 pb-3">
                  <h2 className="text-xl font-oswald text-white uppercase tracking-wider flex items-center gap-2">
                    <span className="w-1 h-5 bg-[#0c963a] rounded-full"></span>
                    Summary
                  </h2>
                  <span className="text-xs font-poppins text-zinc-500 uppercase tracking-widest bg-zinc-800/50 px-2 py-0.5 rounded-md border border-zinc-700/50">
                    Quote Estimation
                  </span>
                </div>

                <div className="space-y-2 relative z-10">
                  <div className="flex justify-between text-zinc-400 font-poppins text-xs uppercase tracking-wider">
                    <span>Subtotal</span>
                    <span className="text-zinc-100 font-bold">
                      AED {subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-zinc-500 font-poppins text-xs uppercase tracking-wider">
                    <span>Tax (5.0%)</span>
                    <span className="text-zinc-400 font-semibold italic">
                      AED {tax.toFixed(2)}
                    </span>
                  </div>

                  <div className="mt-4 pt-4 border-t border-dashed border-hairline flex justify-between items-center bg-[#0c963a]/5 -mx-4 -mb-4 p-4">
                    <div className="flex flex-col">
                      <span className="text-xs uppercase font-poppins text-[#0c963a] font-bold tracking-widest">
                        Total Amount
                      </span>
                      <span className="text-[11px] text-zinc-500 font-poppins italic">
                        Inclusive of all taxes
                      </span>
                    </div>
                    <span className="text-3xl font-oswald font-bold text-[#0c963a]">
                      AED {total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Honeypot */}
              <div className="hidden">
                <input type="text" {...register("website")} />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                  <h2 className="text-3xl font-oswald text-white uppercase tracking-wider flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-[#0c963a] rounded-full"></span>
                    Quoted Items
                    <span className="text-sm font-poppins text-zinc-400 bg-zinc-800/50 px-3 py-1 rounded-full border border-hairline font-medium">
                      {totalItems}
                    </span>
                  </h2>
                </div>

                {/* Scrollable Items Container (Max 4-5 items visible) */}
                <div className="max-h-120 overflow-y-auto pr-2 scrollbar-hide space-y-3">
                  <AnimatePresence mode="popLayout">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ delay: index * 0.05 }}
                        className="group flex items-center gap-3 p-2 rounded-xl bg-zinc-900/40 backdrop-blur-sm border border-hairline/50 hover:border-[#0c963a]/30 hover:bg-zinc-800/60 transition-all duration-300 relative overflow-hidden"
                      >
                        <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-hairline relative z-10 shadow-md">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>

                        <div className="flex-1 min-w-0 flex flex-col relative z-10">
                          <div className="flex justify-between items-start mb-0.5">
                            <h3 className="text-sm font-poppins text-white leading-tight uppercase tracking-wider group-hover:text-[#0c963a] transition-colors truncate pr-4">
                              {item.title}
                            </h3>
                            <button
                              onClick={() => removeFromQuote(item.id)}
                              className="text-red-600 hover:text-red-500 transition-colors p-1"
                              aria-label="Remove item"
                            >
                              <FaTrash size={12} />
                            </button>
                          </div>
                          <p className="text-[10px] uppercase tracking-widest text-[#0c963a]/80 font-poppins font-bold mb-1.5">
                            {item.category}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center p-0.5 bg-zinc-950/80 rounded border border-hairline/50">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="h-5 w-5 flex items-center justify-center rounded hover:bg-zinc-800 transition-colors text-zinc-500 hover:text-white"
                              >
                                <FaMinus size={7} />
                              </button>
                              <span className="w-5 text-center text-[11px] font-bold text-white font-poppins">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="h-5 w-5 flex items-center justify-center rounded hover:bg-zinc-800 transition-colors text-zinc-500 hover:text-white"
                              >
                                <FaPlus size={7} />
                              </button>
                            </div>
                            <span className="text-sm font-poppins font-semibold text-[#0c963a]">
                              AED {(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Right Column: Sticky Form */}
            <div className="lg:col-span-7 space-y-6 lg:sticky lg:top-28">
              {/* Form Card */}
              <div className="p-5 sm:p-6 rounded-3xl bg-zinc-900 border border-hairline shadow-2xl relative">
                <h2 className="text-2xl font-oswald text-white mb-4 uppercase tracking-tight flex items-center gap-2">
                  <span className="w-1 h-6 bg-green-600 rounded-full"></span>
                  Details
                </h2>
                <form
                  onSubmit={handleSubmit((data) => onSubmit(data))}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-widest font-poppins text-zinc-500 font-bold ml-1">
                        First Name
                      </label>
                      <input
                        {...register("billing_first_name")}
                        placeholder="John"
                        className={`w-full rounded-xl border px-3.5 py-2.5 focus:outline-none focus:ring-1 bg-canvas text-ink font-poppins text-base transition-all ${
                          errors.billing_first_name
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            : "border-hairline focus:border-green-500 focus:ring-green-500/20"
                        }`}
                      />
                      {errors.billing_first_name && (
                        <p className="text-xs text-red-500 ml-1">
                          {errors.billing_first_name.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-widest font-poppins text-zinc-500 font-bold ml-1">
                        Last Name
                      </label>
                      <input
                        {...register("billing_last_name")}
                        placeholder="Doe"
                        className={`w-full rounded-xl border px-3.5 py-2.5 focus:outline-none focus:ring-1 bg-canvas text-ink font-poppins text-base transition-all ${
                          errors.billing_last_name
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            : "border-hairline focus:border-green-500 focus:ring-green-500/20"
                        }`}
                      />
                      {errors.billing_last_name && (
                        <p className="text-xs text-red-500 ml-1">
                          {errors.billing_last_name.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs uppercase tracking-widest font-poppins text-zinc-500 font-bold ml-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        {...register("billing_email")}
                        placeholder="john@example.com"
                        className={`w-full rounded-xl border px-3.5 py-2.5 focus:outline-none focus:ring-1 bg-canvas text-ink font-poppins text-base transition-all ${
                          errors.billing_email
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            : "border-hairline focus:border-green-500 focus:ring-green-500/20"
                        }`}
                      />
                      {errors.billing_email && (
                        <p className="text-xs text-red-500 ml-1">
                          {errors.billing_email.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs uppercase tracking-widest font-poppins text-zinc-500 font-bold ml-1">
                        Phone Number
                      </label>
                      <input
                        {...register("billing_phone")}
                        placeholder="+971 -- --- ----"
                        className={`w-full rounded-xl border px-3.5 py-2.5 focus:outline-none focus:ring-1 bg-canvas text-ink font-poppins text-base transition-all ${
                          errors.billing_phone
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            : "border-hairline focus:border-green-500 focus:ring-green-500/20"
                        }`}
                      />
                      {errors.billing_phone && (
                        <p className="text-xs text-red-500 ml-1">
                          {errors.billing_phone.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs uppercase tracking-widest font-poppins text-zinc-500 font-bold ml-1">
                        Billing Address
                      </label>
                      <input
                        {...register("billing_address")}
                        placeholder="Street, Building, Apartment"
                        className={`w-full rounded-xl border px-3.5 py-2.5 focus:outline-none focus:ring-1 bg-canvas text-ink font-poppins text-base transition-all ${
                          errors.billing_address
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            : "border-hairline focus:border-green-500 focus:ring-green-500/20"
                        }`}
                      />
                      {errors.billing_address && (
                        <p className="text-xs text-red-500 ml-1">
                          {errors.billing_address.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-widest font-poppins text-zinc-500 font-bold ml-1">
                        City/Town
                      </label>
                      <input
                        {...register("billing_town")}
                        placeholder="Dubai"
                        className={`w-full rounded-xl border px-3.5 py-2.5 focus:outline-none focus:ring-1 bg-canvas text-ink font-poppins text-base transition-all ${
                          errors.billing_town
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                            : "border-hairline focus:border-green-500 focus:ring-green-500/20"
                        }`}
                      />
                      {errors.billing_town && (
                        <p className="text-xs text-red-500 ml-1">
                          {errors.billing_town.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs uppercase tracking-widest font-poppins text-zinc-500 font-bold ml-1">
                        Postcode
                      </label>
                      <input
                        {...register("billing_postcode")}
                        placeholder="00000"
                        className="w-full rounded-xl border border-hairline px-3.5 py-2.5 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20 bg-canvas text-ink font-poppins text-base transition-all"
                      />
                    </div>
                  </div>

                  {/* Shipping Toggle */}
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-800/30 border border-hairline my-6">
                    <input
                      type="checkbox"
                      id="shippingSame"
                      {...register("shipping_same_as_billing")}
                      className="w-4 h-4 rounded border-hairline bg-black text-green-600 focus:ring-green-500/20"
                    />
                    <label
                      htmlFor="shippingSame"
                      className="text-base text-zinc-300 font-poppins cursor-pointer"
                    >
                      Shipping address same as billing?
                    </label>
                  </div>

                  {!shippingSameAsBilling && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-4 pt-2 border-t border-hairline mb-6"
                    >
                      <h3 className="text-base font-oswald text-white uppercase tracking-wider mb-2">
                        Shipping Information
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-xs uppercase tracking-widest font-poppins text-zinc-500 font-bold ml-1">
                            First Name
                          </label>
                          <input
                            {...register("shipping_first_name")}
                            placeholder="John"
                            className={`w-full rounded-xl border px-3.5 py-2.5 focus:outline-none focus:ring-1 bg-canvas text-ink font-poppins text-base transition-all ${
                              errors.shipping_first_name
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                : "border-hairline focus:border-green-500 focus:ring-green-500/20"
                            }`}
                          />
                          {errors.shipping_first_name && (
                            <p className="text-xs text-red-500 ml-1">
                              {errors.shipping_first_name.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs uppercase tracking-widest font-poppins text-zinc-500 font-bold ml-1">
                            Last Name
                          </label>
                          <input
                            {...register("shipping_last_name")}
                            placeholder="Doe"
                            className={`w-full rounded-xl border px-3.5 py-2.5 focus:outline-none focus:ring-1 bg-canvas text-ink font-poppins text-base transition-all ${
                              errors.shipping_last_name
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                : "border-hairline focus:border-green-500 focus:ring-green-500/20"
                            }`}
                          />
                        </div>
                        <div className="space-y-1.5 sm:col-span-2">
                          <label className="text-xs uppercase tracking-widest font-poppins text-zinc-500 font-bold ml-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            {...register("shipping_email")}
                            placeholder="john@example.com"
                            className={`w-full rounded-xl border px-3.5 py-2.5 focus:outline-none focus:ring-1 bg-canvas text-ink font-poppins text-base transition-all ${
                              errors.shipping_email
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                : "border-hairline focus:border-green-500 focus:ring-green-500/20"
                            }`}
                          />
                        </div>
                        <div className="space-y-1.5 sm:col-span-2">
                          <label className="text-xs uppercase tracking-widest font-poppins text-zinc-500 font-bold ml-1">
                            Phone Number
                          </label>
                          <input
                            {...register("shipping_phone")}
                            placeholder="+971 -- --- ----"
                            className={`w-full rounded-xl border px-3.5 py-2.5 focus:outline-none focus:ring-1 bg-canvas text-ink font-poppins text-base transition-all ${
                              errors.shipping_phone
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                : "border-hairline focus:border-green-500 focus:ring-green-500/20"
                            }`}
                          />
                        </div>
                        <div className="space-y-1.5 sm:col-span-2">
                          <label className="text-xs uppercase tracking-widest font-poppins text-zinc-500 font-bold ml-1">
                            Shipping Address
                          </label>
                          <input
                            {...register("shipping_address")}
                            placeholder="Street, Building, Apartment"
                            className={`w-full rounded-xl border px-3.5 py-2.5 focus:outline-none focus:ring-1 bg-canvas text-ink font-poppins text-base transition-all ${
                              errors.shipping_address
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                : "border-hairline focus:border-green-500 focus:ring-green-500/20"
                            }`}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs uppercase tracking-widest font-poppins text-zinc-500 font-bold ml-1">
                            City/Town
                          </label>
                          <input
                            {...register("shipping_town")}
                            placeholder="Dubai"
                            className={`w-full rounded-xl border px-3.5 py-2.5 focus:outline-none focus:ring-1 bg-canvas text-ink font-poppins text-base transition-all ${
                              errors.shipping_town
                                ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                : "border-hairline focus:border-green-500 focus:ring-green-500/20"
                            }`}
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs uppercase tracking-widest font-poppins text-zinc-500 font-bold ml-1">
                            Postcode
                          </label>
                          <input
                            {...register("shipping_postcode")}
                            placeholder="00000"
                            className="w-full rounded-xl border border-hairline px-3.5 py-2.5 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20 bg-canvas text-ink font-poppins text-base transition-all"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-widest font-poppins text-zinc-500 font-bold ml-1">
                      Additional Notes
                    </label>
                    <textarea
                      {...register("order_notes")}
                      rows={2}
                      className="w-full rounded-xl border border-hairline px-3.5 py-2.5 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/20 bg-canvas text-ink font-poppins text-base transition-all resize-none"
                      placeholder="Special instructions..."
                    />
                  </div>

                  {status.type && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-xl font-poppins text-sm ${
                        status.type === "success"
                          ? "bg-green-500/10 border border-green-500/20 text-green-500"
                          : "bg-red-500/10 border border-red-500/20 text-red-500"
                      }`}
                    >
                      {status.message}
                    </motion.div>
                  )}

                  <div className="pt-2 flex flex-col gap-3">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-primary text-on-primary font-poppins font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-900/30 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      )}
                      {loading ? "Sending..." : "Send Request"}
                    </button>
                    <Link
                      href="/products"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-hairline bg-zinc-800/30 text-zinc-400 font-poppins text-sm hover:text-white hover:bg-zinc-800 transition-all font-medium uppercase tracking-widest"
                    >
                      <FaArrowLeft size={12} />
                      Add More
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quote;
