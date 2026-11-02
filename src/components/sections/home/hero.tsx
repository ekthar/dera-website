import { HeroVisual } from "@/components/illustrations/hero-visual";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/primitives";
import { HeroScrollFade } from "./hero-scroll-fade";

const headline = ["Building the", "infrastructure", "for what's next."] as const;

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-black">
      <HeroVisual />

      <HeroScrollFade className="relative z-10 flex flex-1 flex-col">
        <Container className="flex flex-1 flex-col justify-end pt-32 pb-24 sm:pb-28 lg:pt-40 lg:pb-32">
          <p className="flex animate-fade-up items-center gap-3 font-mono text-[0.6875rem] font-medium tracking-[0.18em] text-white/70 uppercase [animation-delay:200ms]">
            <span aria-hidden className="relative flex size-1.5">
              <span className="absolute inset-0 animate-pulse-dot rounded-full bg-white" />
              <span className="relative size-1.5 rounded-full bg-white" />
            </span>
            Thiruvananthapuram, India · Since 2013
          </p>

          <h1
            id="hero-title"
            className="mt-7 font-display text-[clamp(2rem,0.25rem+9.6vw,9.25rem)] leading-[0.9] font-semibold tracking-[-0.052em] text-white"
          >
            {headline.map((line, index) => (
              <span key={line} className="line-mask">
                <span
                  className="block animate-hero-line"
                  style={{ animationDelay: `${280 + index * 110}ms` }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:items-end">
            <div className="animate-fade-up [animation-delay:750ms] lg:col-span-6 xl:col-span-5">
              <p className="font-display text-xl font-medium tracking-[-0.025em] text-white sm:text-2xl">
                Technology. Systems. Solutions.
              </p>
              <p className="mt-4 max-w-xl text-lead text-white/65">
                Dera Business Solutions brings software, enterprise systems, hardware and connectivity
                together to help businesses move forward.
              </p>
            </div>
            <div className="flex animate-fade-up flex-col gap-3 [animation-delay:880ms] sm:flex-row sm:items-center lg:col-span-6 lg:justify-end xl:col-span-7">
              <ButtonLink href="/services" magnetic>
                Explore Our Services
              </ButtonLink>
              <ButtonLink href="/about" variant="secondary" icon="none" magnetic>
                About Dera
              </ButtonLink>
            </div>
          </div>
        </Container>
      </HeroScrollFade>

      <a
        href="#who-we-are"
        className="group absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 rounded-full p-2 sm:flex"
      >
        <span className="font-mono text-[0.625rem] tracking-[0.2em] text-white/60 uppercase transition-colors group-hover:text-white">
          Scroll
        </span>
        <span aria-hidden className="relative block h-10 w-px overflow-hidden bg-white/15">
          <span className="absolute inset-0 animate-scroll-cue bg-white" />
        </span>
      </a>
    </section>
  );
}
