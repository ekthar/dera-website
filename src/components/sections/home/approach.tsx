import { MaskText } from "@/components/motion/mask-text";
import { Reveal } from "@/components/motion/reveal";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { ApproachTimeline, type ApproachStep } from "./approach-timeline";

const steps: ReadonlyArray<ApproachStep> = [
  { number: "01", title: "Understand", text: "Understand business requirements and existing workflows." },
  { number: "02", title: "Design", text: "Define the right technical approach." },
  { number: "03", title: "Build", text: "Develop and implement suitable solutions." },
  { number: "04", title: "Connect", text: "Integrate systems, infrastructure and processes." },
  { number: "05", title: "Improve", text: "Support continuous improvement and development." },
];

export function Approach() {
  return (
    <section aria-labelledby="approach-title" className="relative bg-black pb-28 sm:pb-36 lg:pb-44">
      <Container>
        <div className="grid gap-16 border-t border-white/10 pt-16 sm:pt-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <Reveal>
                <Eyebrow index="05">Our approach</Eyebrow>
              </Reveal>
              <MaskText
                as="h2"
                id="approach-title"
                lines={["A clear path", "from requirement", "to working system."]}
                className="mt-8 text-display-md font-semibold text-white"
              />
              <Reveal delay={0.1}>
                <p className="mt-8 max-w-sm text-lead text-white/60">
                  Five steps guide the work, whether it involves software, hardware, networking or
                  all three.
                </p>
              </Reveal>
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <ApproachTimeline steps={steps} />
          </div>
        </div>
      </Container>
    </section>
  );
}
