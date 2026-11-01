import type { Metadata } from "next";
import { Building2, Check } from "lucide-react";
import { N1Wordmark } from "@/components/brand/logo";
import { ErpArchitecture } from "@/components/erp-preview/erp-architecture";
import { erpThemeIcons } from "@/components/erp-preview/erp-icons";
import { ErpShowcase } from "@/components/erp-preview/erp-showcase";
import { ErpStage } from "@/components/erp-preview/erp-stage";
import { MaskText } from "@/components/motion/mask-text";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ClosingCta } from "@/components/sections/closing-cta";
import { ButtonLink } from "@/components/ui/button-link";
import { Container, Eyebrow, StatusBadge } from "@/components/ui/primitives";
import { erpDevelopmentStages, erpFeatureThemes, erpPrinciples } from "@/config/erp";
import { cn } from "@/lib/utils";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "N1 ERP",
  description:
    "N1 ERP is an enterprise resource planning platform in development by Dera Business Solutions, designed to bring business management, accounting, inventory, sales and purchasing together.",
  path: "/n1-erp",
});

const stories = [
  {
    kicker: "Enter once",
    title: "A sale should update everything it touches.",
    text: "The intention is simple: record a transaction once and let stock, accounts and reports reflect it, instead of copying the same numbers into several places.",
    flow: ["Invoice", "Stock", "Ledger", "Report"],
  },
  {
    kicker: "See the whole picture",
    title: "Owners need answers, not exports.",
    text: "Dashboards are planned around the questions people ask every day: what sold, what is running low, what is owed and what needs attention.",
    flow: ["Sales", "Stock", "Receivables", "Overview"],
  },
  {
    kicker: "Follow the process",
    title: "Routine work, written down as workflows.",
    text: "Approvals, handoffs and repeat tasks are meant to be modelled as clear steps, so the system can guide work rather than just store it.",
    flow: ["Request", "Approve", "Order", "Receive"],
  },
] as const;

export default function N1ErpPage() {
  return (
    <>
      {/* Hero */}
      <section aria-labelledby="page-title" className="relative isolate overflow-hidden bg-black">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="bg-grid absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_10%,#000,transparent)]" />
          <div className="absolute top-[-30%] left-1/2 aspect-square w-[64rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.1),transparent)]" />
        </div>
        <Container className="pt-36 text-center sm:pt-44 lg:pt-52">
          <div className="flex animate-fade-up justify-center">
            <StatusBadge pulse>In development</StatusBadge>
          </div>
          <div className="mt-10 flex animate-fade-up justify-center [animation-delay:120ms]">
            <N1Wordmark title="N1 ERP" className="text-[3.5rem] text-white sm:text-[5rem] lg:text-[6.5rem]" />
          </div>
          <h1 id="page-title" className="mx-auto mt-10 max-w-5xl font-display text-display-lg font-semibold text-white">
            <span className="line-mask">
              <span className="block animate-hero-line [animation-delay:240ms]">N1 ERP. Everything connected.</span>
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl animate-fade-up text-lead text-white/65 [animation-delay:420ms]">
            A unified approach to managing modern business operations.
          </p>
          <div className="mt-10 flex animate-fade-up flex-col items-center justify-center gap-3 [animation-delay:520ms] sm:flex-row">
            <ButtonLink href="/contact?service=n1-erp" magnetic>
              Enquire about N1 ERP
            </ButtonLink>
            <ButtonLink href="#modules" variant="secondary" icon="none">
              See planned modules
            </ButtonLink>
          </div>
        </Container>
        <Container className="pt-20 pb-24 sm:pt-24 sm:pb-32">
          <ErpStage idPrefix="n1-hero" />
          <p className="mt-14 text-center text-[0.8125rem] text-white/50">
            Interface concept. Figures shown are illustrative and do not represent a live system.
          </p>
        </Container>
      </section>

      {/* Introduction and status */}
      <section aria-labelledby="intro-title" className="bg-black py-24 sm:py-32">
        <Container>
          <div className="grid gap-14 border-t border-white/10 pt-16 sm:pt-20 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow index="01">The product</Eyebrow>
              </Reveal>
              <MaskText
                as="h2"
                id="intro-title"
                lines={["One system for the", "work that runs a business."]}
                className="mt-8 text-display-md font-semibold text-white"
              />
              <div className="mt-8 max-w-2xl space-y-5 text-lead text-white/65">
                <Reveal delay={0.08}>
                  <p>
                    N1 ERP is Dera&apos;s own enterprise resource planning platform. It is being developed to
                    bring business management, accounting, inventory, sales and purchasing into one
                    connected system.
                  </p>
                </Reveal>
                <Reveal delay={0.14}>
                  <p>
                    It grows out of the same work Dera does every day with software, hardware and
                    networks, and it is designed around how businesses actually operate.
                  </p>
                </Reveal>
              </div>
            </div>

            <Reveal delay={0.1} className="lg:col-span-5">
              <div className="rounded-[1.25rem] bg-graphite p-6 ring-1 ring-white/10 sm:p-8">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-white/50 uppercase">Development status</p>
                  <StatusBadge pulse>Active</StatusBadge>
                </div>
                <ol className="mt-8 space-y-0">
                  {erpDevelopmentStages.map((stage, index) => (
                    <li key={stage.label} className="relative flex gap-4 pb-6 last:pb-0">
                      {index < erpDevelopmentStages.length - 1 ? (
                        <span aria-hidden className={cn("absolute top-6 left-[11px] h-[calc(100%-1.5rem)] w-px", stage.state === "done" ? "bg-white/60" : "bg-white/15")} />
                      ) : null}
                      <span
                        className={cn(
                          "relative flex size-6 shrink-0 items-center justify-center rounded-full ring-1",
                          stage.state === "done" && "bg-white text-black ring-white",
                          stage.state === "current" && "bg-black text-white ring-white",
                          stage.state === "next" && "bg-black ring-white/20",
                        )}
                      >
                        {stage.state === "done" ? <Check aria-hidden className="size-3.5" strokeWidth={2.25} /> : null}
                        {stage.state === "current" ? <span className="size-2 animate-pulse rounded-full bg-white" /> : null}
                      </span>
                      <div className="-mt-0.5">
                        <p className={cn("font-medium", stage.state === "next" ? "text-white/50" : "text-white")}>{stage.label}</p>
                        <p className="text-sm text-white/50">
                          {stage.state === "done" ? "Complete" : stage.state === "current" ? "In progress now" : "Upcoming"}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
                <p className="mt-8 border-t border-white/10 pt-6 text-sm leading-relaxed text-white/60">
                  Release timing has not been announced. Capabilities described on this page are planned
                  and may change during development.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Philosophy */}
      <section aria-labelledby="philosophy-title" className="bg-black pb-24 sm:pb-32">
        <Container>
          <div className="border-t border-white/10 pt-16 sm:pt-20">
            <Reveal>
              <Eyebrow index="02">Product philosophy</Eyebrow>
            </Reveal>
            <h2 id="philosophy-title" className="sr-only">
              Product philosophy
            </h2>
            <RevealGroup as="ul" className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8" stagger={0.08}>
              {erpPrinciples.map((principle, index) => (
                <RevealItem as="li" key={principle.title} className="md:border-l md:border-white/10 md:pl-8 md:first:border-l-0 md:first:pl-0">
                  <span className="font-mono text-xs text-white/40">0{index + 1}</span>
                  <h3 className="mt-5 font-display text-display-sm font-semibold text-white">{principle.title}</h3>
                  <p className="mt-4 text-[1.0625rem] leading-relaxed text-white/60">{principle.text}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </section>

      {/* Planned modules */}
      <section id="modules" aria-labelledby="modules-title" className="surface-light rounded-[2rem] bg-white py-24 text-black sm:rounded-[3rem] sm:py-32">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow tone="light" index="03">
                  Planned modules
                </Eyebrow>
              </Reveal>
              <MaskText
                as="h2"
                id="modules-title"
                lines={["Six areas.", "One shared record."]}
                className="mt-8 text-display-lg font-semibold text-black"
              />
            </div>
            <Reveal delay={0.1} className="lg:col-span-5">
              <p className="text-lead text-black/65">
                These are the capability themes N1 ERP is being built around. Each is marked with its
                current status and none is released yet.
              </p>
            </Reveal>
          </div>

          <ol className="mt-16 border-t border-black/10">
            {erpFeatureThemes.map((theme, index) => {
              const Icon = erpThemeIcons[theme.name] ?? Building2;
              return (
                <li key={theme.name} className="group border-b border-black/10">
                  <Reveal className="grid grid-cols-[2.5rem_1fr] items-start gap-x-4 gap-y-3 py-8 sm:grid-cols-[4rem_1fr_auto] sm:items-center sm:gap-x-8 lg:grid-cols-[5rem_20rem_1fr_auto]">
                    <span className="font-mono text-sm text-black/45">0{index + 1}</span>
                    <h3 className="flex items-center gap-3 text-xl font-semibold tracking-[-0.02em] sm:text-2xl">
                      <Icon aria-hidden strokeWidth={1.5} className="size-5 shrink-0 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5" />
                      {theme.name}
                    </h3>
                    <p className="col-start-2 text-[1rem] leading-relaxed text-black/60 sm:col-span-2 lg:col-span-1 lg:col-start-3">
                      {theme.description}
                    </p>
                    <span className="col-start-2 w-fit rounded-full px-3 py-1 text-xs font-medium text-black/65 ring-1 ring-black/15 sm:col-start-3 sm:row-start-1 lg:col-start-4">
                      Planned
                    </span>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      {/* Dashboard showcase */}
      <section aria-labelledby="showcase-title" className="bg-black py-24 sm:py-32 lg:py-40">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Reveal className="flex justify-center">
              <Eyebrow index="04">Interface</Eyebrow>
            </Reveal>
            <MaskText
              as="h2"
              id="showcase-title"
              lines={["Calm on the surface.", "Connected underneath."]}
              className="mt-8 text-display-md font-semibold text-white"
            />
            <Reveal delay={0.1}>
              <p className="mt-6 text-lead text-white/60">
                Switch between views of the interface concept. Each screen draws from the same shared
                records.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="mt-14">
            <ErpShowcase />
          </Reveal>
          <p className="mt-8 text-center text-[0.8125rem] text-white/50">
            Interactive design preview. It is not connected to any data or account.
          </p>
        </Container>
      </section>

      {/* Feature storytelling */}
      <section aria-labelledby="stories-title" className="bg-black pb-24 sm:pb-32 lg:pb-40">
        <Container>
          <div className="border-t border-white/10 pt-16 sm:pt-20">
            <Reveal>
              <Eyebrow index="05">How it is meant to work</Eyebrow>
            </Reveal>
            <h2 id="stories-title" className="sr-only">
              How N1 ERP is meant to work
            </h2>
            <div className="mt-12 space-y-4">
              {stories.map((story, index) => (
                <Reveal key={story.kicker} y={32}>
                  <article className="grid gap-10 rounded-[1.5rem] bg-graphite p-7 ring-1 ring-white/[0.08] sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-16 lg:p-14">
                    <div>
                      <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-white/50 uppercase">
                        0{index + 1} · {story.kicker}
                      </p>
                      <h3 className="mt-5 font-display text-display-sm font-semibold text-white">{story.title}</h3>
                      <p className="mt-5 max-w-lg text-[1.0625rem] leading-relaxed text-white/60">{story.text}</p>
                    </div>
                    <div aria-hidden className="relative">
                      <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:justify-between">
                        {story.flow.map((step, stepIndex) => (
                          <div key={step} className="flex items-center gap-2 sm:flex-1 sm:last:flex-none">
                            <span
                              className={cn(
                                "flex h-11 w-full min-w-0 items-center justify-center rounded-xl px-3 text-xs font-medium ring-1 sm:h-14 sm:w-auto sm:shrink-0 sm:px-4 sm:text-sm",
                                stepIndex === story.flow.length - 1 ? "bg-white text-black ring-white" : "bg-black text-white/80 ring-white/15",
                              )}
                            >
                              {step}
                            </span>
                            {stepIndex < story.flow.length - 1 ? (
                              <span className="relative hidden h-px flex-1 overflow-hidden bg-white/15 sm:block">
                                <span className="absolute inset-y-0 left-0 w-1/2 animate-flow bg-white/70" style={{ animationDelay: `${stepIndex * 0.3}s` }} />
                              </span>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Architecture */}
      <section aria-labelledby="architecture-title" className="bg-black pb-24 sm:pb-32 lg:pb-40">
        <Container>
          <div className="grid gap-14 border-t border-white/10 pt-16 sm:pt-20 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <Reveal>
                <Eyebrow index="06">Architecture</Eyebrow>
              </Reveal>
              <MaskText
                as="h2"
                id="architecture-title"
                lines={["Built in layers."]}
                className="mt-8 text-display-md font-semibold text-white"
              />
              <Reveal delay={0.1}>
                <p className="mt-6 text-lead text-white/60">
                  Interfaces sit on top of modules, and every module reads and writes the same shared
                  core. That is the idea behind &ldquo;everything connected&rdquo;.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="lg:col-span-8">
              <ErpArchitecture />
            </Reveal>
          </div>
        </Container>
      </section>

      <ClosingCta
        lines={["Interested in", "N1 ERP?"]}
        text="Tell us how your business runs today. Product enquiries are welcome while N1 ERP is in development."
        primary={{ label: "Make a product enquiry", href: "/contact?service=n1-erp" }}
        secondary={{ label: "Explore Our Services", href: "/services" }}
      />
    </>
  );
}
