"use client";

import { useMemo, useState, type InputHTMLAttributes } from "react";
import {
  IconArrowLeft,
  IconMinus,
  IconPlus,
  IconShoppingCart,
  IconTrash,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useQuote } from "../hooks/useQuote";
import Button from "../component/ui/Button";
import { cn } from "../lib/cn";

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

const fieldClass = cn(
  "w-full rounded-lg border bg-canvas px-3.5 py-2.5",
  "text-sm text-ink placeholder:text-muted",
  "focus:outline-none focus:ring-1",
  "disabled:opacity-60"
);

const fieldOk =
  "border-hairline focus:border-brand-accent focus:ring-brand-accent/30";
const fieldErr = "border-red-500 focus:border-red-500 focus:ring-red-500/20";
const labelClass = "mb-1.5 block text-sm font-medium text-ink";

function Field({
  label,
  error,
  className,
  ...props
}: {
  label: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      <label className={labelClass}>{label}</label>
      <input
        {...props}
        suppressHydrationWarning
        className={cn(fieldClass, error ? fieldErr : fieldOk)}
      />
      {error ? <p className="mt-1 text-xs text-red-500">{error}</p> : null}
    </div>
  );
}

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

      formData.append("billing_first_name", data.billing_first_name);
      formData.append("billing_last_name", data.billing_last_name);
      formData.append("billing_email", data.billing_email);
      formData.append("billing_phone", data.billing_phone);
      formData.append("billing_address", data.billing_address);
      formData.append("billing_town", data.billing_town);
      formData.append("billing_state", data.billing_state);
      formData.append("billing_postcode", data.billing_postcode || "");

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
    <div className="w-full bg-canvas">
      <section className="px-4 pt-10 pb-6 sm:px-6 sm:pt-14 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-caption uppercase text-muted">Quote</p>
            <h1 className="text-[32px] font-semibold leading-[1.1] tracking-[-1.5px] text-ink sm:text-display-md">
              Review your quote
            </h1>
            <p className="mt-3 max-w-xl text-body-md text-muted">
              Check your items, add contact details, and send the list to GGW
              International. We&apos;ll come back with pricing and availability.
            </p>
          </div>
          {items.length > 0 ? (
            <button
              type="button"
              onClick={clearQuote}
              className="inline-flex items-center gap-1.5 self-start text-sm font-medium text-red-500 transition-colors hover:text-red-600 sm:self-end"
            >
              <IconTrash className="size-4" stroke={1.75} />
              Clear list
            </button>
          ) : null}
        </div>
      </section>

      <section className="px-4 pb-14 sm:px-6 lg:px-8 lg:pb-16">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-hairline bg-surface-card px-6 py-14 text-center shadow-lift">
            <span className="mx-auto flex size-12 items-center justify-center rounded-xl border border-dashed border-hairline bg-canvas text-brand-accent">
              <IconShoppingCart className="size-6" stroke={1.75} />
            </span>
            <h2 className="mt-5 text-title-md font-semibold text-ink">
              Your quote list is empty
            </h2>
            <p className="mx-auto mt-2 max-w-md text-body-sm text-muted">
              Browse products and tap Add to Quote. Your list will show up here
              so we can prepare a personalised estimate.
            </p>
            <Button
              href="/products"
              variant="accent"
              className="mt-6 h-11 gap-2 px-5"
            >
              <IconArrowLeft className="size-4" stroke={1.75} />
              Browse products
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="space-y-6 lg:col-span-5">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-title-md font-semibold text-ink">
                    Quoted items
                  </h2>
                  <span className="rounded-full border border-dashed border-hairline bg-surface-card px-2.5 py-0.5 text-caption text-muted">
                    {totalItems} {totalItems === 1 ? "item" : "items"}
                  </span>
                </div>

                <div className="max-h-120 space-y-3 overflow-y-auto pr-0.5">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        className="flex items-center gap-3 rounded-2xl border border-dashed border-hairline bg-surface-card p-2.5"
                      >
                        <div className="size-16 shrink-0 overflow-hidden rounded-xl bg-canvas">
                          <img
                            src={item.image}
                            alt=""
                            className="size-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <h3 className="truncate text-sm font-semibold text-ink">
                                {item.title}
                              </h3>
                              <p className="mt-0.5 text-caption text-muted">
                                {item.category}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFromQuote(item.id)}
                              className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-red-500 transition-colors hover:bg-red-50 hover:text-red-600"
                              aria-label={`Remove ${item.title}`}
                            >
                              <IconTrash className="size-4" stroke={1.75} />
                            </button>
                          </div>
                          <div className="mt-2 flex items-center justify-between gap-3">
                            <div className="inline-flex items-center rounded-lg border border-hairline bg-canvas">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, -1)}
                                className="inline-flex size-8 items-center justify-center text-muted hover:text-ink"
                                aria-label="Decrease quantity"
                              >
                                <IconMinus className="size-3.5" stroke={2} />
                              </button>
                              <span className="w-6 text-center text-sm font-semibold text-ink">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, 1)}
                                className="inline-flex size-8 items-center justify-center text-muted hover:text-ink"
                                aria-label="Increase quantity"
                              >
                                <IconPlus className="size-3.5" stroke={2} />
                              </button>
                            </div>
                            <span className="text-sm font-semibold text-ink">
                              AED {(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <div className="rounded-2xl border border-dashed border-hairline bg-surface-card p-5">
                <div className="flex items-center justify-between border-b border-dashed border-hairline pb-3">
                  <h2 className="text-title-md font-semibold text-ink">
                    Summary
                  </h2>
                  <span className="text-caption text-muted">
                    Quote estimate
                  </span>
                </div>
                <dl className="mt-4 space-y-2.5 text-sm">
                  <div className="flex justify-between text-muted">
                    <dt>Subtotal</dt>
                    <dd className="font-medium text-ink">
                      AED {subtotal.toFixed(2)}
                    </dd>
                  </div>
                  <div className="flex justify-between text-muted">
                    <dt>Tax (5%)</dt>
                    <dd className="font-medium text-ink">
                      AED {tax.toFixed(2)}
                    </dd>
                  </div>
                </dl>
                <div className="mt-4 flex items-end justify-between rounded-xl bg-brand-accent/10 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-ink">Total</p>
                    <p className="text-caption text-muted">
                      Inclusive of tax
                    </p>
                  </div>
                  <p className="text-xl font-semibold tracking-tight text-brand-accent">
                    AED {total.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 lg:sticky lg:top-24">
              <div className="rounded-2xl border border-dashed border-hairline bg-surface-card p-5 sm:p-6">
                <h2 className="text-title-md font-semibold text-ink">
                  Your details
                </h2>
                <p className="mt-1 text-body-sm text-muted">
                  We&apos;ll use this to send your quote and confirm availability.
                </p>

                <form
                  onSubmit={handleSubmit((data) => onSubmit(data))}
                  className="mt-6 space-y-4"
                >
                  <div className="hidden" aria-hidden>
                    <input type="text" {...register("website")} />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                      label="First name"
                      error={errors.billing_first_name?.message}
                      placeholder="First name"
                      {...register("billing_first_name")}
                    />
                    <Field
                      label="Last name"
                      error={errors.billing_last_name?.message}
                      placeholder="Last name"
                      {...register("billing_last_name")}
                    />
                    <Field
                      label="Email"
                      type="email"
                      className="sm:col-span-2"
                      error={errors.billing_email?.message}
                      placeholder="you@company.com"
                      {...register("billing_email")}
                    />
                    <Field
                      label="Phone number"
                      className="sm:col-span-2"
                      error={errors.billing_phone?.message}
                      placeholder="+971 50 000 0000"
                      {...register("billing_phone")}
                    />
                    <Field
                      label="Billing address"
                      className="sm:col-span-2"
                      error={errors.billing_address?.message}
                      placeholder="Street, building, office"
                      {...register("billing_address")}
                    />
                    <Field
                      label="City"
                      error={errors.billing_town?.message}
                      placeholder="Dubai"
                      {...register("billing_town")}
                    />
                    <Field
                      label="Postcode"
                      placeholder="00000"
                      {...register("billing_postcode")}
                    />
                  </div>

                  <label className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-dashed border-hairline bg-canvas px-3.5 py-3 text-sm text-ink">
                    <input
                      type="checkbox"
                      id="shippingSame"
                      {...register("shipping_same_as_billing")}
                      className={cn(
                        "size-4 shrink-0 appearance-none rounded-xs border transition-colors",
                        "border-hairline bg-canvas",
                        "checked:border-brand-accent checked:bg-brand-accent",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/35",
                        "checked:bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20stroke%3D%22white%22%20stroke-width%3D%222.2%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M3.5%208.5%206.5%2011.5%2012.5%204.5%22%2F%3E%3C%2Fsvg%3E')] bg-center bg-no-repeat"
                      )}
                    />
                    Shipping address is the same as billing
                  </label>

                  {!shippingSameAsBilling ? (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="space-y-4 border-t border-dashed border-hairline pt-4"
                    >
                      <h3 className="text-sm font-semibold text-ink">
                        Shipping information
                      </h3>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field
                          label="First name"
                          error={errors.shipping_first_name?.message}
                          placeholder="First name"
                          {...register("shipping_first_name")}
                        />
                        <Field
                          label="Last name"
                          error={errors.shipping_last_name?.message}
                          placeholder="Last name"
                          {...register("shipping_last_name")}
                        />
                        <Field
                          label="Email"
                          type="email"
                          className="sm:col-span-2"
                          error={errors.shipping_email?.message}
                          placeholder="you@company.com"
                          {...register("shipping_email")}
                        />
                        <Field
                          label="Phone number"
                          className="sm:col-span-2"
                          error={errors.shipping_phone?.message}
                          placeholder="+971 50 000 0000"
                          {...register("shipping_phone")}
                        />
                        <Field
                          label="Shipping address"
                          className="sm:col-span-2"
                          error={errors.shipping_address?.message}
                          placeholder="Street, building, office"
                          {...register("shipping_address")}
                        />
                        <Field
                          label="City"
                          error={errors.shipping_town?.message}
                          placeholder="Dubai"
                          {...register("shipping_town")}
                        />
                        <Field
                          label="Postcode"
                          placeholder="00000"
                          {...register("shipping_postcode")}
                        />
                      </div>
                    </motion.div>
                  ) : null}

                  <div>
                    <label className={labelClass}>Additional notes</label>
                    <textarea
                      {...register("order_notes")}
                      rows={3}
                      placeholder="Quantities, delivery timing, or anything we should know…"
                      suppressHydrationWarning
                      className={cn(fieldClass, fieldOk, "min-h-22 resize-y")}
                    />
                  </div>

                  {status.type ? (
                    <p
                      className={cn(
                        "rounded-xl border border-dashed px-3.5 py-3 text-sm",
                        status.type === "success"
                          ? "border-brand-accent/30 bg-brand-accent/10 text-ink"
                          : "border-red-200 bg-red-50 text-red-600"
                      )}
                      role="status"
                    >
                      {status.message}
                    </p>
                  ) : null}

                  <div className="flex flex-col gap-3 pt-1">
                    <Button
                      type="submit"
                      variant="accent"
                      disabled={loading}
                      className="h-11 w-full"
                    >
                      {loading ? "Sending…" : "Send quote request"}
                    </Button>
                    <Button
                      href="/products"
                      variant="secondary"
                      className="h-11 w-full gap-2"
                    >
                      <IconArrowLeft className="size-4" stroke={1.75} />
                      Add more products
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Quote;
