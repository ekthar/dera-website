import { Check } from "lucide-react";
import { serviceIcons } from "@/components/illustrations/service-icons";
import { ServiceVisual } from "@/components/illustrations/service-visuals";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { CornerMarks } from "@/components/ui/primitives";
import type { Service } from "@/types";

const shortNames: Record<Service["slug"], string> = {
  "software-development": "a software project",
  "enterprise-erp": "an ERP requirement",
  hardware: "a hardware requirement",
  networking: "a network project",
  "business-automation": "an automation idea",
  "it-services": "a technical service",
};

export function ServiceDetail({ service }: { service: Service }) {
  const Icon = serviceIcons[service.slug];
  return (
    <article id={service.slug} aria-labelledby={`${service.slug}-title`} className="scroll-mt-36 border-t border-white/10 py-16 sm:py-20 lg:scroll-mt-24 lg:py-24">
      <Reveal className="flex items-center gap-4">
        <span className="flex size-11 items-center justify-center rounded-full ring-1 ring-white/15">
          <Icon aria-hidden strokeWidth={1.5} className="size-5" />
        </span>
        <span className="font-mono text-xs text-white/50">{service.number} / 06</span>
      </Reveal>

      <Reveal delay={0.05}>
        <h2 id={`${service.slug}-title`} className="mt-8 text-display-md font-semibold text-white">
          {service.title}
        </h2>
        <p className="mt-6 max-w-2xl text-lead text-white/65">{service.description}</p>
      </Reveal>

      <Reveal delay={0.1} y={32} className="relative mt-12 overflow-hidden rounded-[1.25rem] bg-graphite ring-1 ring-white/[0.08]">
        <div aria-hidden className="bg-grid absolute inset-0 opacity-50" />
        <CornerMarks className="m-4" />
        <ServiceVisual kind={service.visual} className="relative mx-auto h-64 max-w-2xl px-6 py-8 text-white sm:h-80 sm:px-12 sm:py-10" />
      </Reveal>

      <div className="mt-12 grid gap-10 sm:grid-cols-2 sm:gap-8">
        <Reveal>
          <h3 className="font-mono text-[0.6875rem] tracking-[0.16em] text-white/50 uppercase">Business value</h3>
          <ul className="mt-5 space-y-3.5">
            {service.value.map((item) => (
              <li key={item} className="flex gap-3 text-[1.0625rem] leading-snug text-white/80">
                <Check aria-hidden strokeWidth={1.75} className="mt-0.5 size-4 shrink-0 text-white" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.08}>
          <h3 className="font-mono text-[0.6875rem] tracking-[0.16em] text-white/50 uppercase">Suitable for</h3>
          <ul className="mt-5 divide-y divide-white/10 border-y border-white/10">
            {service.useCases.map((item) => (
              <li key={item} className="py-3 text-[1.0625rem] text-white/80">
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <Reveal className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
        <ButtonLink href={`/contact?service=${service.slug}`} size="md">
          Discuss {shortNames[service.slug]}
        </ButtonLink>
      </Reveal>
    </article>
  );
}
