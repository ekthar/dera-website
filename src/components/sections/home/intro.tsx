import { MaskText } from "@/components/motion/mask-text";
import { Reveal } from "@/components/motion/reveal";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { TypeStack } from "./type-stack";

export function Intro() {
  return (
    <section id="who-we-are" aria-labelledby="intro-title" className="relative bg-black py-28 sm:py-36 lg:py-44">
      <Container>
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6 xl:col-span-5">
            <Reveal>
              <Eyebrow index="01">Who we are</Eyebrow>
            </Reveal>
            <MaskText
              as="h2"
              id="intro-title"
              lines={["More than solutions.", "A foundation for progress."]}
              className="mt-8 text-display-md font-semibold text-white"
            />
            <div className="mt-10 space-y-5 text-lead text-white/65">
              <Reveal delay={0.1}>
                <p>
                  Dera Business Solutions is an independently operated business based in
                  Thiruvananthapuram, Kerala, working across technology, software development, IT
                  infrastructure and business solutions.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <p>
                  From building software to supplying hardware and connecting systems, our approach is
                  centred on making technology practical, accessible and dependable.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="flex items-center lg:col-span-6 xl:col-span-7">
            <TypeStack className="w-full" />
          </div>
        </div>
      </Container>
    </section>
  );
}
