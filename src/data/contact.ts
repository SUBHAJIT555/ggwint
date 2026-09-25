const WHATSAPP_NUMBER = "971565877607";

export const SITE_CONTACT = {
  name: "G G W INTERNATIONAL GENERAL TRADING L.L.C",
  email: "info@ggwint.com",
  phone: "+971 56 587 7607",
  phoneHref: "tel:+971565877607",
  whatsappNumber: WHATSAPP_NUMBER,
  whatsappHref:
    "https://wa.me/" +
    WHATSAPP_NUMBER +
    "?text=" +
    encodeURIComponent(
      "Hello! I'm interested in learning more about GGW International's products."
    ),
  address: "Office 303, Building White Crown, Sheikh Zayed Road, Dubai, UAE",
  city: "Dubai",
  googleMapsUrl:
    "https://www.google.com/maps/place/White+Crown+Tower/@25.2229921,55.2821137,17z",
} as const;

export const CONTACT_FORM_ID = "get-free-quote";

/** Quote buttons land on the contact form, not the top of the contact page. */
export const CONTACT_FORM_HREF = `/contact/#${CONTACT_FORM_ID}`;

export function contactFormHref(serviceSlug?: string) {
  if (!serviceSlug) return CONTACT_FORM_HREF;
  return `/contact/?service=${encodeURIComponent(serviceSlug)}#${CONTACT_FORM_ID}`;
}
