import { MaskText } from "@/components/motion/mask-text";
import { Reveal } from "@/components/motion/reveal";
import { Container, Eyebrow } from "@/components/ui/primitives";

const pillars = [
  { number: "01", title: "Practical Thinking", text: "Solutions built around actual business needs." },
  { number: "02", title: "Connected Expertise", text: "Software, hardware and networking under one roof." },
  { number: "03", title: "Business Understanding", text: "An approach that considers the complete operational picture." },
  { number: "04", title: "Continuous Innovation", text: "Developing new systems and exploring better ways to solve problems." },
] as const;

export function WhyDera() {
  return (
    <section aria-labelledby="why-title" className="bg-black py-28 sm:py-36 lg:py-44">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow index="03">Why Dera</Eyebrow>
            </Reveal>
          </div>
          <MaskText
            as="h2"
            id="why-title"
            lines={["Technology should make", "business simpler."]}
            className="text-display-lg font-semibold text-white lg:col-span-8"
          />
        </div>

        <ul className="mt-20 grid border-t border-white/10 md:grid-cols-2 lg:mt-28">
          {pillars.map((pillar, index) => (
            <li
              key={pillar.number}
              className="group border-b border-white/10 py-10 last:border-b-0 sm:py-14 md:odd:border-r md:odd:pr-12 md:even:pl-12 md:[&:nth-last-child(2)]:border-b-0 lg:odd:pr-16 lg:even:pl-16"
            >
              <Reveal delay={(index % 2) * 0.08} className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-4 sm:gap-x-12">
                <span
                  aria-hidden
                  className="row-span-2 font-display text-[4.5rem] leading-[0.8] font-semibold tracking-[-0.06em] text-outline transition-[-webkit-text-stroke-color] duration-500 group-hover:[-webkit-text-stroke-color:rgb(255_255_255)] sm:text-[6.5rem]"
                >
                  {pillar.number}
                </span>
                <h3 className="self-end font-display text-display-sm font-semibold text-white">{pillar.title}</h3>
                <p className="max-w-sm text-[1.0625rem] leading-relaxed text-white/60">{pillar.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
