import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactFormWithPreset } from "@/components/contact/contact-form-loader";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/primitives";
import { businessInfo, contactChannels, mapSearchUrl } from "@/config/site";
import { isEmailDeliveryConfigured } from "@/lib/email";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact Dera Business Solutions in Thiruvananthapuram, Kerala, about software development, ERP, hardware supply, networking, automation and IT services.",
  path: "/contact",
});

function InfoBlock({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-t border-white/10 py-6">
      <h2 className="font-mono text-[0.6875rem] tracking-[0.16em] text-white/50 uppercase">{label}</h2>
      <div className="mt-3 text-[1.0625rem] leading-relaxed text-white/80">{children}</div>
    </div>
  );
}

export default function ContactPage() {
  const deliveryConfigured = isEmailDeliveryConfigured();
  const { address } = businessInfo;
  const whatsappUrl = contactChannels.whatsapp
    ? `https://wa.me/${contactChannels.whatsapp}?text=${encodeURIComponent("Hello Dera Business Solutions, I would like to make an enquiry.")}`
    : null;

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={["Let's make", "something happen."]}
        intro={
          <p>
            Tell us about the software, system, hardware or network you have in mind. A few clear
            details are enough to start.
          </p>
        }
      />

      <section aria-label="Contact form and details" className="bg-black pb-28 sm:pb-36">
        <Container>
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
            <div className="animate-fade-up [animation-delay:380ms] lg:col-span-7">
              <div className="rounded-[1.5rem] bg-graphite p-6 ring-1 ring-white/10 sm:p-10">
                <Suspense
                  fallback={
                    <ContactForm deliveryConfigured={deliveryConfigured} fallbackEmail={contactChannels.email} />
                  }
                >
                  <ContactFormWithPreset deliveryConfigured={deliveryConfigured} fallbackEmail={contactChannels.email} />
                </Suspense>
              </div>
            </div>

            <div className="animate-fade-up [animation-delay:480ms] lg:col-span-4 lg:col-start-9">
              <InfoBlock label="Business address">
                <address className="not-italic">
                  {address.building}, {address.street},
                  <br />
                  {address.locality},
                  <br />
                  {address.city}, {address.state} - {address.postalCode}.
                </address>
                <a
                  href={mapSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-4 inline-flex items-center gap-1.5 rounded text-[0.9375rem] font-medium text-white"
                >
                  Open in Google Maps
                  <ArrowUpRight aria-hidden strokeWidth={1.75} className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </InfoBlock>

              <InfoBlock label="Location">
                {address.city}, {address.state}, {address.country}
              </InfoBlock>

              {contactChannels.email ? (
                <InfoBlock label="Email">
                  <a href={`mailto:${contactChannels.email}`} className="underline-offset-4 hover:underline">
                    {contactChannels.email}
                  </a>
                </InfoBlock>
              ) : null}

              {contactChannels.phone ? (
                <InfoBlock label="Phone">
                  <a href={`tel:${contactChannels.phone.replace(/\s/g, "")}`} className="underline-offset-4 hover:underline">
                    {contactChannels.phone}
                  </a>
                </InfoBlock>
              ) : null}

              {whatsappUrl ? (
                <InfoBlock label="WhatsApp">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1.5 font-medium text-white">
                    Send a WhatsApp enquiry
                    <ArrowUpRight aria-hidden strokeWidth={1.75} className="size-4" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </InfoBlock>
              ) : null}

              <InfoBlock label="GSTIN">
                <span className="font-mono tracking-wide">{businessInfo.gstin}</span>
              </InfoBlock>

              <InfoBlock label="Business structure">
                {businessInfo.structure}, registered {businessInfo.registrationDate}
              </InfoBlock>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
