import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/legal-page";
import { addressSingleLine, businessInfo } from "@/config/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Terms",
  description: "Terms of use for the Dera Business Solutions website.",
  path: "/terms",
});

const sections = [
  { id: "about", title: "About these terms" },
  { id: "information", title: "Information on this site" },
  { id: "services", title: "Services and quotations" },
  { id: "use", title: "Acceptable use" },
  { id: "ip", title: "Intellectual property" },
  { id: "liability", title: "Limitation of liability" },
  { id: "links", title: "External links" },
  { id: "law", title: "Governing law" },
  { id: "contact", title: "Contact" },
] as const;

export default function TermsPage() {
  return (
    <LegalPage eyebrow="Terms" title={["Terms of Use"]} updated="2 November 2026" sections={sections}>
      <h2 id="about">About these terms</h2>
      <p>
        These terms apply to your use of this website, operated by <strong>{businessInfo.legalName}</strong> (GSTIN{" "}
        {businessInfo.gstin}). By using the website you agree to these terms. If you do not agree, please do not use the site.
      </p>

      <h2 id="information">Information on this site</h2>
      <p>
        The content on this website is provided for general information about Dera and its services. We try to keep it
        accurate and current, but it may change without notice and does not form an offer or a binding commitment.
      </p>

      <h2 id="services">Services and quotations</h2>
      <p>
        Sending an enquiry through this website does not create a contract. Any work, supply of hardware or software
        licence is governed by a separate quotation, order or agreement that sets out its scope, price and terms.
      </p>

      <h2 id="use">Acceptable use</h2>
      <p>When using this website you agree not to:</p>
      <ul>
        <li>Use it for any unlawful purpose or in breach of applicable law</li>
        <li>Attempt to gain unauthorised access to the site, its servers or related systems</li>
        <li>Send spam, malicious code or misleading information through the contact form</li>
        <li>Interfere with the normal operation or security of the website</li>
      </ul>

      <h2 id="ip">Intellectual property</h2>
      <p>
        The Dera name, wordmark and monogram, and the design, text and graphics of this
        website belong to {businessInfo.legalName} unless stated otherwise. You may view and share pages for personal or
        internal business reference. Any other reproduction requires our written permission.
      </p>

      <h2 id="liability">Limitation of liability</h2>
      <p>
        The website is provided on an &ldquo;as is&rdquo; basis. To the extent permitted by law, Dera is not liable for any
        loss arising from the use of, or reliance on, information on this website, or from the website being temporarily
        unavailable. Nothing in these terms limits any liability that cannot be limited under applicable law.
      </p>

      <h2 id="links">External links</h2>
      <p>
        Links to external websites are provided for convenience. We are not responsible for the content or practices of
        those websites.
      </p>

      <h2 id="law">Governing law</h2>
      <p>
        These terms are governed by the laws of India. Any dispute relating to this website is subject to the jurisdiction
        of the courts at Thiruvananthapuram, Kerala.
      </p>

      <h2 id="contact">Contact</h2>
      <p>
        Questions about these terms can be sent to {businessInfo.legalName}, {addressSingleLine}, or through the{" "}
        <Link href="/contact">contact page</Link>. Please also read our <Link href="/privacy-policy">privacy policy</Link>.
      </p>
    </LegalPage>
  );
}
