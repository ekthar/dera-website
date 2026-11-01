import { Building2 } from "lucide-react";
import { N1Wordmark } from "@/components/brand/logo";
import { erpThemeIcons } from "@/components/erp-preview/erp-icons";
import { ErpStage } from "@/components/erp-preview/erp-stage";
import { MaskText } from "@/components/motion/mask-text";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { Container, Eyebrow, StatusBadge } from "@/components/ui/primitives";
import { erpFeatureThemes } from "@/config/erp";

export function ErpFeature() {
  return (
    <section
      id="n1-erp"
      aria-labelledby="erp-title"
      className="surface-light relative overflow-hidden rounded-[2rem] bg-white py-28 text-black sm:rounded-[3rem] sm:py-36 lg:py-44"
    >
      <div aria-hidden className="bg-grid-light pointer-events-none absolute inset-x-0 top-0 h-[38rem] mask-fade-b" />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow tone="light" index="03">
                Built by Dera
              </Eyebrow>
            </Reveal>
            <Reveal delay={0.05}>
              <N1Wordmark title="N1 ERP" className="mt-10 text-[2.5rem] text-black sm:text-[3.25rem]" />
            </Reveal>
            <MaskText
              as="h2"
              id="erp-title"
              lines={["Your business.", "One connected system."]}
              className="mt-8 text-display-lg font-semibold text-black"
              delay={0.1}
            />
          </div>
          <Reveal delay={0.15} className="lg:col-span-5">
            <p className="text-lead text-black/65">
              An enterprise resource planning platform under development, designed to bring essential
              business operations together through a unified digital experience.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ButtonLink href="/n1-erp" variant="inverse" magnetic>
                Explore N1 ERP
              </ButtonLink>
              <StatusBadge tone="light" pulse>
                Currently in Development
              </StatusBadge>
            </div>
          </Reveal>
        </div>

        <ErpStage className="mt-20 sm:mt-24" idPrefix="home-erp" />
        <p className="mt-14 text-center text-[0.8125rem] text-black/55 sm:mt-16">
          Interface concept for N1 ERP. Figures shown are illustrative.
        </p>

        <div className="mt-24 sm:mt-28">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <h3 className="font-display text-display-sm font-semibold">Planned capabilities</h3>
            <p className="text-sm text-black/60">Capability themes for the platform. Not yet released.</p>
          </div>
          <RevealGroup
            as="ul"
            className="mt-8 grid gap-px overflow-hidden rounded-[1.25rem] bg-black/10 ring-1 ring-black/10 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.06}
          >
            {erpFeatureThemes.map((theme) => {
              const Icon = erpThemeIcons[theme.name] ?? Building2;
              return (
                <li key={theme.name} className="group bg-white">
                  <RevealItem className="p-7 sm:p-8">
                    <div className="flex items-center justify-between">
                      <Icon
                        aria-hidden
                        strokeWidth={1.5}
                        className="size-5 text-black transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5"
                      />
                      <span className="rounded-full px-2.5 py-0.5 text-[0.6875rem] font-medium text-black/60 ring-1 ring-black/12">
                        Planned
                      </span>
                    </div>
                    <h4 className="mt-6 text-lg font-semibold tracking-[-0.02em]">{theme.name}</h4>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-black/60">{theme.description}</p>
                  </RevealItem>
                </li>
              );
            })}
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}
