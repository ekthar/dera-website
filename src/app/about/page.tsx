import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DeraMonogram, N1Wordmark } from "@/components/brand/logo";
import { PageHero } from "@/components/layout/page-hero";
import { MaskText } from "@/components/motion/mask-text";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { ClosingCta } from "@/components/sections/closing-cta";
import { Container, CornerMarks, Eyebrow, StatusBadge } from "@/components/ui/primitives";
import { businessActivities } from "@/config/services";
import { businessInfo } from "@/config/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description:
    "Dera Business Solutions is a registered proprietorship in Thiruvananthapuram, Kerala, working across software, ERP, hardware, networking and IT services. GSTIN 32BAOPD9925J1ZF.",
  path: "/about",
});

const principles = [
  {
    title: "Useful before impressive",
    text: "Technology earns its place by solving a real problem. We start with the problem and choose the simplest thing that solves it well.",
  },
  {
    title: "Connected, not fragmented",
    text: "Software, hardware and networks affect each other. Looking at them together avoids the gaps that appear between separate suppliers.",
  },
  {
    title: "Plain communication",
    text: "Clear scope, clear language and honest status. People should always know what is being done and why.",
  },
] as const;

const { address } = businessInfo;

const registryRows: ReadonlyArray<{ label: string; value: ReactNode }> = [
  { label: "Business", value: businessInfo.legalName },
  { label: "Business structure", value: businessInfo.structure },
  { label: "Registration date", value: businessInfo.registrationDate },
  {
    label: "GSTIN",
    value: <span className="font-mono tracking-wide">{businessInfo.gstin}</span>,
  },
  {
    label: "Jurisdiction",
    value: (
      <>
        {businessInfo.jurisdiction}
        <span className="block text-black/55">({businessInfo.jurisdictionCodes})</span>
      </>
    ),
  },
  {
    label: "Business address",
    value: (
      <>
        {address.building}, {address.street},
        <br />
        {address.locality}, {address.city},
        <br />
        {address.state} - {address.postalCode}.
      </>
    ),
  },
  {
    label: "Nature of business",
    value: (
      <ul className="space-y-1">
        {businessInfo.natureOfBusiness.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    ),
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Dera"
        title={["Practical technology,", "from Thiruvananthapuram."]}
        intro={
          <p>
            Dera Business Solutions is a registered proprietorship that brings software, enterprise
            systems, hardware and networking together for businesses.
          </p>
        }
      />

      {/* Background */}
      <section aria-labelledby="background-title" className="bg-black pb-24 sm:pb-32">
        <Container>
          <div className="grid gap-12 border-t border-white/10 pt-16 sm:pt-20 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <Reveal>
                <Eyebrow index="01">Background</Eyebrow>
              </Reveal>
            </div>
            <div className="lg:col-span-8">
              <MaskText
                as="h2"
                id="background-title"
                lines={["Independently operated.", "Broad by design."]}
                className="text-display-md font-semibold text-white"
              />
              <div className="mt-10 grid gap-6 text-lead text-white/65 md:grid-cols-2 md:gap-10">
                <Reveal delay={0.06}>
                  <p>
                    Dera was registered on {businessInfo.registrationDate} and operates from{" "}
                    {address.locality} in {address.city}, Kerala. It is run as an independent
                    proprietorship.
                  </p>
                </Reveal>
                <Reveal delay={0.12}>
                  <p>
                    The business works across software development, enterprise and ERP systems,
                    hardware sales and supply, networking, business automation and IT services,
                    alongside wholesale and retail operations.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Registration details */}
      <section aria-labelledby="registry-title" className="bg-black pb-24 sm:pb-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <Reveal>
                <Eyebrow index="02">Business information</Eyebrow>
              </Reveal>
              <h2 id="registry-title" className="mt-8 text-display-sm font-semibold text-white">
                Registered details
              </h2>
              <p className="mt-4 max-w-sm text-[1.0625rem] leading-relaxed text-white/60">
                Official business details, as registered for Goods and Services Tax.
              </p>
            </div>
            <Reveal delay={0.08} y={32} className="lg:col-span-8">
              <div className="surface-light relative overflow-hidden rounded-[1.5rem] bg-white text-black">
                <div aria-hidden className="bg-grid-light absolute inset-0 opacity-60 mask-fade-b" />
                <CornerMarks tone="light" className="m-5" />
                <div className="relative flex items-center justify-between gap-6 border-b border-black/10 px-6 py-6 sm:px-10 sm:py-8">
                  <div className="flex items-center gap-4">
                    <DeraMonogram tone="light" className="size-11" />
                    <div>
                      <p className="font-display text-lg font-semibold tracking-[-0.02em]">{businessInfo.legalName}</p>
                      <p className="text-sm text-black/55">Business profile</p>
                    </div>
                  </div>
                  <span className="hidden font-mono text-xs text-black/50 sm:block">{businessInfo.gstin}</span>
                </div>
                <dl className="relative divide-y divide-black/10 px-6 sm:px-10">
                  {registryRows.map((row) => (
                    <div key={row.label} className="grid gap-1.5 py-5 sm:grid-cols-[13rem_1fr] sm:gap-6">
                      <dt className="font-mono text-[0.6875rem] tracking-[0.14em] text-black/55 uppercase sm:pt-1">{row.label}</dt>
                      <dd className="text-[1.0625rem] leading-relaxed text-black">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Philosophy */}
      <section aria-labelledby="philosophy-title" className="bg-black pb-24 sm:pb-32">
        <Container>
          <div className="border-t border-white/10 pt-16 sm:pt-20">
            <div className="grid gap-10 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <Reveal>
                  <Eyebrow index="03">Philosophy</Eyebrow>
                </Reveal>
              </div>
              <MaskText
                as="h2"
                id="philosophy-title"
                lines={["Technology should feel", "dependable, not difficult."]}
                className="text-display-md font-semibold text-white lg:col-span-8"
              />
            </div>
            <RevealGroup as="ul" className="mt-16 grid gap-px overflow-hidden rounded-[1.25rem] bg-white/10 ring-1 ring-white/10 md:grid-cols-3">
              {principles.map((principle, index) => (
                <li key={principle.title} className="bg-black">
                  <RevealItem className="h-full p-7 sm:p-9">
                    <span className="font-mono text-xs text-white/45">0{index + 1}</span>
                    <h3 className="mt-10 font-display text-xl font-semibold tracking-[-0.02em] text-white">{principle.title}</h3>
                    <p className="mt-3 text-[1rem] leading-relaxed text-white/60">{principle.text}</p>
                  </RevealItem>
                </li>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </section>

      {/* Capabilities */}
      <section aria-labelledby="capabilities-title" className="bg-black pb-24 sm:pb-32">
        <Container>
          <div className="grid gap-12 border-t border-white/10 pt-16 sm:pt-20 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <Reveal>
                <Eyebrow index="04">Capabilities</Eyebrow>
              </Reveal>
              <h2 id="capabilities-title" className="mt-8 text-display-sm font-semibold text-white">
                Registered business activities
              </h2>
              <Link
                href="/services"
                className="group mt-6 inline-flex items-center gap-2 rounded text-[0.9375rem] font-medium text-white"
              >
                See how these become services
                <ArrowRight aria-hidden strokeWidth={1.75} className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
            <ol className="grid border-t border-white/10 sm:grid-cols-2 lg:col-span-8">
              {businessActivities.map((activity, index) => (
                <li
                  key={activity}
                  className="flex items-baseline gap-5 border-b border-white/10 py-5 sm:odd:pr-6 sm:even:border-l sm:even:pl-6"
                >
                  <span className="font-mono text-xs text-white/45">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-[1.0625rem] text-white/85">{activity}</span>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* Current initiative and direction */}
      <section aria-labelledby="initiative-title" className="bg-black pb-8">
        <Container>
          <div className="grid gap-4 lg:grid-cols-2">
            <Reveal>
              <Link
                href="/n1-erp"
                className="group relative flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-white p-8 text-black ring-1 ring-white transition-transform duration-500 ease-out-quart hover:-translate-y-0.5 sm:p-10"
              >
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-black/55 uppercase">Current initiative</p>
                  <StatusBadge tone="light" pulse>
                    In development
                  </StatusBadge>
                </div>
                <N1Wordmark className="mt-14 text-[2.75rem] text-black" />
                <h2 id="initiative-title" className="mt-6 font-display text-display-sm font-semibold">
                  Dera&apos;s own ERP platform.
                </h2>
                <p className="mt-4 max-w-md text-[1.0625rem] leading-relaxed text-black/65">
                  N1 ERP is being built to bring business management, accounting, inventory, sales and
                  purchasing into one connected system.
                </p>
                <span className="mt-auto inline-flex items-center gap-2 pt-10 text-sm font-medium">
                  Explore N1 ERP
                  <ArrowRight aria-hidden strokeWidth={1.75} className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="flex h-full flex-col rounded-[1.5rem] bg-graphite p-8 ring-1 ring-white/10 sm:p-10">
                <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-white/50 uppercase">Long-term direction</p>
                <h2 className="mt-14 font-display text-display-sm font-semibold text-white">
                  From services to systems.
                </h2>
                <p className="mt-4 max-w-md text-[1.0625rem] leading-relaxed text-white/60">
                  The aim is to keep delivering practical services while growing Dera&apos;s own software,
                  so that more of what businesses need can come from one dependable, connected source.
                </p>
                <ul className="mt-auto grid gap-3 pt-10 text-[0.9375rem] text-white/75 sm:grid-cols-2">
                  {["Mature N1 ERP into a released product", "Deepen software and automation work", "Keep hardware and networks close to the software", "Stay rooted in Kerala"].map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-white/50" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <ClosingCta
        lines={["Let's build", "something useful."]}
        text="Whether it is software, hardware, a network or all three, start with a conversation."
      />
    </>
  );
}
