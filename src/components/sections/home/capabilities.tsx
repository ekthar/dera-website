import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { serviceIcons } from "@/components/illustrations/service-icons";
import { ServiceVisual } from "@/components/illustrations/service-visuals";
import { MaskText } from "@/components/motion/mask-text";
import { Reveal } from "@/components/motion/reveal";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { services } from "@/config/services";
import { cn } from "@/lib/utils";
import type { ServiceSlug } from "@/types";

/** Layout per card: grid placement, visual height and surface. Deliberately uneven. */
const layout: Record<ServiceSlug, { grid: string; visual: string; tone: "dark" | "light"; delay: number }> = {
  "software-development": {
    grid: "md:col-span-2 lg:col-span-7 lg:row-span-2",
    visual: "h-56 sm:h-72 lg:h-auto lg:flex-1 lg:min-h-80",
    tone: "dark",
    delay: 0,
  },
  "enterprise-erp": { grid: "lg:col-span-5", visual: "h-52 sm:h-60", tone: "dark", delay: 0.06 },
  hardware: { grid: "lg:col-span-5", visual: "h-52 sm:h-60", tone: "dark", delay: 0.12 },
  networking: { grid: "lg:col-span-4", visual: "h-48 sm:h-56", tone: "dark", delay: 0 },
  "business-automation": { grid: "lg:col-span-4", visual: "h-48 sm:h-56", tone: "light", delay: 0.06 },
  "it-services": { grid: "md:col-span-2 lg:col-span-4", visual: "h-48 sm:h-56", tone: "dark", delay: 0.12 },
};

export function Capabilities() {
  return (
    <section id="what-we-do" aria-labelledby="capabilities-title" className="relative bg-black pb-28 sm:pb-36 lg:pb-44">
      <Container>
        <div className="grid gap-10 border-t border-white/10 pt-16 sm:pt-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow index="02">What we do</Eyebrow>
            </Reveal>
            <MaskText
              as="h2"
              id="capabilities-title"
              lines={["One partner.", "Multiple possibilities."]}
              className="mt-8 text-display-lg font-semibold text-white"
            />
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="max-w-md text-lead text-white/65 lg:ml-auto">
              Six connected areas of work, from the code that runs a business to the cables and
              hardware it runs on.
            </p>
            <Link
              href="/services"
              className="group mt-6 inline-flex items-center gap-2 rounded text-[0.9375rem] font-medium text-white lg:ml-auto lg:flex lg:w-fit"
            >
              View all services
              <ArrowRight aria-hidden strokeWidth={1.75} className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-4 sm:mt-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          {services.map((service) => {
            const config = layout[service.slug];
            const Icon = serviceIcons[service.slug];
            const light = config.tone === "light";
            return (
              <Reveal as="li" key={service.slug} delay={config.delay} className={cn("flex", config.grid)}>
                <SpotlightCard href={`/services#${service.slug}`} tone={config.tone} className="w-full">
                  <div className="flex items-center justify-between px-6 pt-6 sm:px-7 sm:pt-7">
                    <span className={cn("font-mono text-xs", light ? "text-black/55" : "text-white/50")}>
                      {service.number}
                    </span>
                    <span
                      className={cn(
                        "flex size-10 items-center justify-center rounded-full ring-1 transition-colors duration-500",
                        light ? "ring-black/10 group-hover:bg-black group-hover:text-white" : "ring-white/12 group-hover:bg-white group-hover:text-black",
                      )}
                    >
                      <Icon aria-hidden strokeWidth={1.5} className="size-[1.125rem]" />
                    </span>
                  </div>

                  <ServiceVisual
                    kind={service.visual}
                    className={cn("px-5 py-5 sm:px-7", light ? "text-black" : "text-white", config.visual)}
                  />

                  <div className="mt-auto px-6 pb-6 sm:px-7 sm:pb-7">
                    <h3 className="font-display text-display-sm font-semibold">{service.title}</h3>
                    <p className={cn("mt-3 max-w-md text-[0.9375rem] leading-relaxed", light ? "text-black/65" : "text-white/60")}>
                      {service.summary}
                    </p>
                    <span
                      className={cn(
                        "mt-6 inline-flex items-center gap-2 text-sm font-medium",
                        light ? "text-black" : "text-white",
                      )}
                    >
                      Learn more
                      <span className="sr-only"> about {service.title}</span>
                      <ArrowRight aria-hidden strokeWidth={1.75} className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
