/**
 * Single source of truth for business facts.
 * Everything here comes from the business details supplied by Dera Business
 * Solutions. Optional channels (email, WhatsApp, social) are read from the
 * environment and stay hidden until a real value is configured.
 */

function cleanUrl(value: string | undefined): string | null {
  if (!value) return null;
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

/**
 * Public origin for canonical URLs. An explicit NEXT_PUBLIC_SITE_URL wins;
 * on Vercel the project's production domain is used; locally, localhost.
 */
function resolveSiteUrl(): string {
  const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return (
    cleanUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
    cleanUrl(vercelHost ? `https://${vercelHost}` : undefined) ??
    "http://localhost:3000"
  );
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
  url: resolveSiteUrl(),
  locale: "en_IN",
  foundingYear: "2013",
} as const;

export const businessInfo = {
  legalName: "Dera Business Solutions",
  gstin: "32BAOPD9925J1ZF",
  since: "2013",
  /** Business phone lines, as supplied by the business. */
  phones: [
    { display: "+91 98957 99990", tel: "+919895799990" },
    { display: "+91 96450 09821", tel: "+919645009821" },
  ],
  address: {
    building: "TC 1/2794-2",
    street: "NH-66",
    locality: "Kazhakuttam",
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

/** A map search for the business address. No coordinates are assumed. */
export const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  addressSingleLine,
)}`;

/**
 * Optional public contact channels. Set them in the environment once they are
 * verified. Nothing is shown on the site while they are empty.
 */
export const contactChannels = {
  email: optional(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  whatsapp: optional(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER)?.replace(/[^\d]/g, "") || null,
} as const;

/** Social profiles. Add real URLs only. Empty entries are never rendered. */
export const socialLinks: ReadonlyArray<{ label: string; href: string }> = [
  { label: "LinkedIn", href: optional(process.env.NEXT_PUBLIC_LINKEDIN_URL) ?? "" },
  { label: "Instagram", href: optional(process.env.NEXT_PUBLIC_INSTAGRAM_URL) ?? "" },
  { label: "X", href: optional(process.env.NEXT_PUBLIC_X_URL) ?? "" },
].filter((link) => link.href.length > 0);
