import { MaskText } from "@/components/motion/mask-text";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/primitives";
import { HorizonGlow } from "./horizon-glow";

type ClosingCtaProps = {
  lines?: ReadonlyArray<string>;
  text?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

/** The large black closing section shared by every page. */
export function ClosingCta({
  lines = ["Have something", "worth building?"],
  text = "Let's turn your next business or technology requirement into something meaningful.",
  primary = { label: "Start a Conversation", href: "/contact" },
  secondary = { label: "Explore Our Services", href: "/services" },
}: ClosingCtaProps) {
  return (
    <section aria-labelledby="closing-title" className="relative isolate overflow-hidden bg-black">
      <HorizonGlow />
      <Container className="relative py-36 sm:py-44 lg:py-56">
        <MaskText
          as="h2"
          id="closing-title"
          lines={lines}
          className="text-display-xl font-semibold text-white"
          stagger={0.12}
        />
        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:items-end">
          <Reveal delay={0.15} className="lg:col-span-5">
            <p className="max-w-md text-lead text-white/65">{text}</p>
          </Reveal>
          <Reveal delay={0.25} className="flex flex-col gap-3 sm:flex-row lg:col-span-7 lg:justify-end">
            <ButtonLink href={primary.href} magnetic>
              {primary.label}
            </ButtonLink>
            <ButtonLink href={secondary.href} variant="secondary" icon="none" magnetic>
              {secondary.label}
            </ButtonLink>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
