/**
 * Single source of truth for business facts.
 * Everything here comes from the business registration details supplied by
 * Dera Business Solutions. Optional contact channels are read from the
 * environment and stay hidden until a real value is configured.
 */

function cleanUrl(value: string | undefined): string {
  const fallback = "http://localhost:3000";
  if (!value) return fallback;
  try {
    const url = new URL(value);
    return url.origin;
  } catch {
    return fallback;
  }
}

function optional(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export const siteConfig = {
  name: "Dera Business Solutions",
  shortName: "Dera",
  tagline: "Technology. Systems. Solutions.",
  description:
    "Dera Business Solutions is a Thiruvananthapuram-based business working across software development, ERP and enterprise systems, hardware supply, networking, business automation and IT services.",
  url: cleanUrl(process.env.NEXT_PUBLIC_SITE_URL),
  locale: "en_IN",
  foundingYear: "2022",
} as const;

export const businessInfo = {
  legalName: "Dera Business Solutions",
  structure: "Proprietorship",
  gstin: "32BAOPD9925J1ZF",
  registrationDate: "25 October 2022",
  registrationDateIso: "2022-10-25",
  jurisdiction: "Taxpayer Services Circle Kazhakoottam",
  jurisdictionCodes: "KLC230, TH0503",
  natureOfBusiness: [
    "Wholesale business",
    "Supplier of services",
    "Retail business",
    "Works contract",
    "Manufacturing and factory operations",
  ],
  address: {
    building: "Dera 510/2",
    street: "Mundukari Road",
    locality: "Kavottumukk",
    city: "Thiruvananthapuram",
    state: "Kerala",
    postalCode: "695582",
    country: "India",
    countryCode: "IN",
  },
} as const;

export const addressLines = [
  `${businessInfo.address.building}, ${businessInfo.address.street},`,
  `${businessInfo.address.locality}, ${businessInfo.address.city},`,
  `${businessInfo.address.state} - ${businessInfo.address.postalCode}, ${businessInfo.address.country}.`,
] as const;

export const addressSingleLine = `${businessInfo.address.building}, ${businessInfo.address.street}, ${businessInfo.address.locality}, ${businessInfo.address.city}, ${businessInfo.address.state} ${businessInfo.address.postalCode}, ${businessInfo.address.country}`;

/** A map search for the registered address. No coordinates are assumed. */
export const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  addressSingleLine,
)}`;

/**
 * Optional public contact channels. Set them in the environment once they are
 * verified. Nothing is shown on the site while they are empty.
 */
export const contactChannels = {
  email: optional(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  phone: optional(process.env.NEXT_PUBLIC_CONTACT_PHONE),
  whatsapp: optional(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER)?.replace(/[^\d]/g, "") || null,
} as const;

/** Social profiles. Add real URLs only. Empty entries are never rendered. */
export const socialLinks: ReadonlyArray<{ label: string; href: string }> = [
  { label: "LinkedIn", href: optional(process.env.NEXT_PUBLIC_LINKEDIN_URL) ?? "" },
  { label: "Instagram", href: optional(process.env.NEXT_PUBLIC_INSTAGRAM_URL) ?? "" },
  { label: "X", href: optional(process.env.NEXT_PUBLIC_X_URL) ?? "" },
].filter((link) => link.href.length > 0);
