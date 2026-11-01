import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/legal-page";
import { addressSingleLine, businessInfo, contactChannels } from "@/config/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description: "How Dera Business Solutions collects, uses and protects personal information shared through this website.",
  path: "/privacy-policy",
});

const sections = [
  { id: "who-we-are", title: "Who we are" },
  { id: "information", title: "Information we collect" },
  { id: "use", title: "How we use it" },
  { id: "sharing", title: "Sharing and service providers" },
  { id: "cookies", title: "Cookies and tracking" },
  { id: "retention", title: "Retention and security" },
  { id: "rights", title: "Your rights" },
  { id: "links", title: "External links" },
  { id: "changes", title: "Changes to this policy" },
  { id: "contact", title: "Contact" },
] as const;

export default function PrivacyPolicyPage() {
  return (
    <LegalPage eyebrow="Privacy Policy" title={["Privacy Policy"]} updated="1 November 2026" sections={sections}>
      <h2 id="who-we-are">Who we are</h2>
      <p>
        This website is operated by <strong>{businessInfo.legalName}</strong>, a {businessInfo.structure.toLowerCase()}{" "}
        registered in India (GSTIN {businessInfo.gstin}), with its business address at {addressSingleLine}. In this policy,
        &ldquo;Dera&rdquo;, &ldquo;we&rdquo; and &ldquo;us&rdquo; refer to the business.
      </p>
      <p>
        This policy explains what personal information we collect through this website, why we collect it and how it is
        handled. We aim to process personal data in line with applicable Indian law, including the Digital Personal Data
        Protection Act, 2023 and the Information Technology Act, 2000.
      </p>

      <h2 id="information">Information we collect</h2>
      <p>We only collect personal information that you choose to give us through the contact form:</p>
      <ul>
        <li>Your name, email address and phone number</li>
        <li>Your company name, if you provide it</li>
        <li>The service you are interested in and the project details you write</li>
      </ul>
      <p>
        Like most websites, the servers that host this site may automatically record basic technical information such as
        your IP address, browser type and the pages requested. This is used to keep the site secure and working.
      </p>

      <h2 id="use">How we use it</h2>
      <ul>
        <li>To read and respond to your enquiry</li>
        <li>To discuss, quote for or deliver the services or products you ask about</li>
        <li>To protect the website against spam and misuse</li>
        <li>To meet legal, tax or regulatory obligations where they apply</li>
      </ul>
      <p>
        We do not sell your personal information and we do not use it for unrelated marketing without your consent.
      </p>

      <h2 id="sharing">Sharing and service providers</h2>
      <p>
        We share information only where needed to run this website and respond to you. This may include the company that
        hosts the website and the email delivery service that passes contact form messages to us. These providers process
        data on our behalf and only for that purpose.
      </p>
      <p>We may also disclose information where required by law or by a lawful request from a public authority.</p>

      <h2 id="cookies">Cookies and tracking</h2>
      <p>
        This website does not use advertising cookies, analytics trackers or third-party tracking scripts. Fonts are served
        from this website itself rather than from an external font service. If this changes, this policy will be updated
        before such tools are used.
      </p>

      <h2 id="retention">Retention and security</h2>
      <p>
        We keep enquiry information for as long as it is needed to respond to you and for any related work or records we
        are required to keep. When it is no longer needed, we delete it. We use reasonable measures to protect personal
        information, but no method of transmission over the internet is completely secure.
      </p>

      <h2 id="rights">Your rights</h2>
      <p>Subject to applicable law, you may ask us to:</p>
      <ul>
        <li>Tell you what personal information we hold about you</li>
        <li>Correct or update information that is inaccurate</li>
        <li>Delete information that we no longer need to keep</li>
        <li>Withdraw consent you have given, where processing is based on consent</li>
      </ul>
      <p>To make a request or raise a concern, contact us using the details below.</p>

      <h2 id="links">External links</h2>
      <p>
        This site links to external services such as Google Maps. When you follow those links, the external service&apos;s own
        privacy policy applies.
      </p>

      <h2 id="changes">Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The date at the top of this page shows when it was last changed.
      </p>

      <h2 id="contact">Contact</h2>
      <p>
        For privacy questions or requests, write to {businessInfo.legalName}, {addressSingleLine}
        {contactChannels.email ? (
          <>
            {" "}
            or email <a href={`mailto:${contactChannels.email}`}>{contactChannels.email}</a>
          </>
        ) : null}
        . You can also reach us through the <Link href="/contact">contact page</Link>.
      </p>
    </LegalPage>
  );
}
