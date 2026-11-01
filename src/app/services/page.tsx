import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { ClosingCta } from "@/components/sections/closing-cta";
import { ServiceDetail } from "@/components/sections/services/service-detail";
import { ServiceIndex } from "@/components/sections/services/service-index";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/primitives";
import { services } from "@/config/services";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Services",
  description:
    "Software development, ERP and enterprise solutions, hardware supply, networking and infrastructure, business automation and IT services from Dera Business Solutions, Thiruvananthapuram.",
  path: "/services",
});

const indexItems = services.map(({ slug, number, title }) => ({ slug, number, title }));

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title={["Technology that", "works for business."]}
        intro={
          <p>
            Six connected areas of work, from the software a business runs on to the hardware and
            network underneath it. Choose one, or bring them together under one partner.
          </p>
        }
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/contact" magnetic>
            Discuss a requirement
          </ButtonLink>
          <ButtonLink href="#software-development" variant="secondary" icon="none">
            Browse services
          </ButtonLink>
        </div>
      </PageHero>

      <section aria-label="Service details" className="bg-black pb-16 sm:pb-24">
        <Container>
          <div className="lg:grid lg:grid-cols-12 lg:gap-10">
            <div className="sticky top-[4.75rem] z-20 -mx-5 bg-black/85 px-5 py-3 backdrop-blur-md sm:-mx-8 sm:px-8 lg:static lg:col-span-3 lg:mx-0 lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
              <div className="lg:sticky lg:top-32 lg:pt-16">
                <ServiceIndex items={indexItems} />
              </div>
            </div>
            <div className="lg:col-span-9 xl:col-span-8 xl:col-start-5">
              {services.map((service) => (
                <ServiceDetail key={service.slug} service={service} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      <ClosingCta
        lines={["Not sure where", "to start?"]}
        text="Describe the problem in your own words. We will help work out which service, or which combination, fits."
        secondary={{ label: "Learn about Dera", href: "/about" }}
      />
    </>
  );
}
