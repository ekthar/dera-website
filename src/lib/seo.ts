import type { Metadata } from "next";
import { businessInfo, contactChannels, siteConfig } from "@/config/site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Use the bare title without the site-name suffix. */
  absoluteTitle?: boolean;
};

export function createPageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: PageMetaInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

const postalAddress = {
  "@type": "PostalAddress",
  streetAddress: `${businessInfo.address.building}, ${businessInfo.address.street}, ${businessInfo.address.locality}`,
  addressLocality: businessInfo.address.city,
  addressRegion: businessInfo.address.state,
  postalCode: businessInfo.address.postalCode,
  addressCountry: businessInfo.address.countryCode,
} as const;

/** Organization and LocalBusiness structured data. Only verified facts. */
export function organizationJsonLd(): Record<string, unknown> {
  const orgId = `${siteConfig.url}/#organization`;
  const contact: Record<string, string> = {};
  if (contactChannels.email) contact.email = contactChannels.email;
  if (contactChannels.phone) contact.telephone = contactChannels.phone;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: siteConfig.name,
        legalName: businessInfo.legalName,
        url: siteConfig.url,
        logo: `${siteConfig.url}/apple-icon`,
        description: siteConfig.description,
        foundingDate: siteConfig.foundingYear,
        taxID: businessInfo.gstin,
        address: postalAddress,
        ...contact,
      },
      {
        "@type": "LocalBusiness",
        "@id": `${siteConfig.url}/#localbusiness`,
        name: siteConfig.name,
        url: siteConfig.url,
        image: `${siteConfig.url}/opengraph-image`,
        parentOrganization: { "@id": orgId },
        address: postalAddress,
        ...contact,
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        publisher: { "@id": orgId },
        inLanguage: "en-IN",
      },
    ],
  };
}
