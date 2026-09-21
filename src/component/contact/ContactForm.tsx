"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/cn";
import { SITE_CONTACT } from "../../data/contact";
import { mainCategories } from "../../data/products";
import Button from "../ui/Button";

const fieldClass = cn(
  "w-full rounded-lg border border-hairline bg-canvas px-3.5 py-2.5",
  "text-sm text-ink placeholder:text-muted",
  "focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent/30",
  "disabled:opacity-60"
);

const labelClass = "mb-1.5 block text-sm font-medium text-ink";

const INITIAL = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
  website: "",
  services: [] as string[],
};

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [feedback, setFeedback] = useState("");

  function update<K extends keyof typeof INITIAL>(
    key: K,
    value: (typeof INITIAL)[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function toggleService(id: string) {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(id)
        ? prev.services.filter((s) => s !== id)
        : [...prev.services, id],
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (form.website) {
      setStatus("success");
      setFeedback("Thanks — we’ll get back to you shortly.");
      setForm(INITIAL);
      return;
    }

    setStatus("loading");
    setFeedback("");

    const phone = form.phone.trim()
      ? `+971 ${form.phone.trim()}`
      : "";
    const interest = form.services.length
      ? `\n\nInterested in: ${form.services.join(", ")}`
      : "";

    try {
      const formData = new FormData();
      formData.append("firstName", form.firstName.trim());
      formData.append("lastName", form.lastName.trim());
      formData.append("email", form.email.trim());
      formData.append("phone", phone);
      formData.append("message", `${form.message.trim()}${interest}`);
      formData.append("formType", "contact");
      formData.append("website", "");

      const response = await fetch("/api/mail.php", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.status === "error") throw new Error(data.message);

      setStatus("success");
      setFeedback(data.message ?? "Thanks — we’ll get back to you shortly.");
      setForm(INITIAL);
    } catch (err) {
      setStatus("error");
      setFeedback(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    }
  }

  const busy = status === "loading";

  return (
    <section id="get-free-quote" className="w-full bg-canvas screen-line-top">
      <div className="px-5 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
        <div className="grid items-end gap-10 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-balance text-[32px] font-semibold leading-[1.1] tracking-[-1.5px] text-ink sm:text-display-md">
              Let&apos;s talk about your next shipment
            </h2>
            <p className="mt-3 text-body-md text-muted">
              You can reach us anytime via{" "}
              <a
                href={`mailto:${SITE_CONTACT.email}`}
                className="font-medium text-brand-accent underline decoration-brand-accent/40 decoration-dotted underline-offset-4 transition-colors hover:text-ink"
              >
                {SITE_CONTACT.email}
              </a>
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="hidden" aria-hidden>
                <label htmlFor="contact-website">Website</label>
                <input
                  id="contact-website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(e) => update("website", e.target.value)}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-first-name" className={labelClass}>
                    First name <span className="text-brand-accent">*</span>
                  </label>
                  <input
                    id="contact-first-name"
                    required
                    autoComplete="given-name"
                    value={form.firstName}
                    onChange={(e) => update("firstName", e.target.value)}
                    placeholder="First name"
                    disabled={busy}
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor="contact-last-name" className={labelClass}>
                    Last name <span className="text-brand-accent">*</span>
                  </label>
                  <input
                    id="contact-last-name"
                    required
                    autoComplete="family-name"
                    value={form.lastName}
                    onChange={(e) => update("lastName", e.target.value)}
                    placeholder="Last name"
                    disabled={busy}
                    className={fieldClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-email" className={labelClass}>
                  Email <span className="text-brand-accent">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@company.com"
                  disabled={busy}
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="contact-phone" className={labelClass}>
                  Phone number
                </label>
                <div className="flex overflow-hidden rounded-lg border border-hairline focus-within:border-brand-accent focus-within:ring-1 focus-within:ring-brand-accent/30">
                  <span className="inline-flex shrink-0 items-center border-r border-hairline bg-surface-soft px-3 text-sm font-medium text-muted">
                    +971
                  </span>
                  <input
                    id="contact-phone"
                    type="tel"
                    autoComplete="tel-national"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    placeholder="50 000 0000"
                    disabled={busy}
                    className="min-w-0 flex-1 border-0 bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none disabled:opacity-60"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className={labelClass}>
                  Message <span className="text-brand-accent">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  placeholder="Tell us what you need to source…"
                  disabled={busy}
                  className={cn(fieldClass, "min-h-26 resize-y")}
                />
              </div>

              <fieldset>
                <legend className={labelClass}>Product categories</legend>
                <div className="mt-1 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {mainCategories.map((category) => {
                    const checked = form.services.includes(category);
                    return (
                      <label
                        key={category}
                        className="flex cursor-pointer items-center gap-2.5 text-sm text-ink"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleService(category)}
                          disabled={busy}
                          className={cn(
                            "size-4 shrink-0 appearance-none rounded-xs border transition-colors",
                            "border-hairline bg-canvas",
                            "checked:border-brand-accent checked:bg-brand-accent",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/35",
                            "disabled:opacity-60",
                            checked &&
                              "bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20stroke%3D%22white%22%20stroke-width%3D%222.2%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M3.5%208.5%206.5%2011.5%2012.5%204.5%22%2F%3E%3C%2Fsvg%3E')] bg-center bg-no-repeat"
                          )}
                        />
                        <span>{category}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <Button
                type="submit"
                variant="accent"
                disabled={busy}
                className="h-11 w-full"
              >
                {busy ? "Sending…" : "Get started"}
              </Button>

              {feedback ? (
                <p
                  className={cn(
                    "text-sm",
                    status === "error" ? "text-error" : "text-muted"
                  )}
                  role="status"
                >
                  {feedback}
                </p>
              ) : null}
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="relative mx-auto hidden w-full max-w-md self-end lg:mx-0 lg:block lg:max-w-none"
          >
            <img
              src="/images/contact-illustration.svg"
              alt=""
              className="aspect-752/880 w-full object-contain object-bottom"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
