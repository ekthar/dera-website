import { ArrowUpRight } from "lucide-react";
import { LocationMap } from "@/components/illustrations/location-map";
import { MaskText } from "@/components/motion/mask-text";
import { Reveal } from "@/components/motion/reveal";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { businessInfo, mapSearchUrl } from "@/config/site";

export function Location() {
  return (
    <section aria-labelledby="location-title" className="bg-black pb-28 sm:pb-36 lg:pb-44">
      <Container>
        <div className="grid gap-14 border-t border-white/10 pt-16 sm:pt-20 lg:grid-cols-12 lg:gap-10">
          <div className="flex flex-col lg:col-span-5">
            <Reveal>
              <Eyebrow index="05">Where we are</Eyebrow>
            </Reveal>
            <MaskText
              as="h2"
              id="location-title"
              lines={["Rooted in Kerala.", "Built for business."]}
              className="mt-8 text-display-md font-semibold text-white"
            />

            <Reveal delay={0.1} className="mt-12 lg:mt-auto">
              <p className="font-display text-2xl font-medium tracking-[-0.025em] text-white">
                {businessInfo.address.city}, {businessInfo.address.state}, {businessInfo.address.country}.
              </p>
              <address className="mt-5 text-lead text-white/60 not-italic">
                {businessInfo.address.building}, {businessInfo.address.street},
                <br />
                {businessInfo.address.locality},
                <br />
                {businessInfo.address.city}, {businessInfo.address.state} - {businessInfo.address.postalCode}.
              </address>
              <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-1 text-lead">
                {businessInfo.phones.map((phone) => (
                  <li key={phone.tel}>
                    <a href={`tel:${phone.tel}`} className="text-white tabular-nums underline-offset-4 hover:underline">
                      {phone.display}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                <WhatsAppLink className="text-[0.9375rem]" />
              <a
                href={mapSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded text-[0.9375rem] font-medium text-white"
              >
                Open in Google Maps
                <ArrowUpRight
                  aria-hidden
                  strokeWidth={1.75}
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} y={40} className="lg:col-span-7">
            <LocationMap />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
