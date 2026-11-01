import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section aria-labelledby="not-found-title" className="relative isolate flex min-h-[85svh] items-end overflow-hidden bg-black">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_at_50%_30%,#000,transparent_70%)]" />
      <Container className="pt-40 pb-24">
        <p aria-hidden className="font-display text-[clamp(8rem,30vw,22rem)] leading-[0.8] font-bold tracking-[-0.07em] text-outline">
          404
        </p>
        <h1 id="not-found-title" className="mt-10 text-display-md font-semibold text-white">
          This page could not be found.
        </h1>
        <p className="mt-5 max-w-lg text-lead text-white/60">
          The link may be out of date, or the page may have moved. Everything else is one click away.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/services" variant="secondary" icon="none">
            Explore Our Services
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
