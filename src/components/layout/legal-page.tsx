import type { ReactNode } from "react";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/primitives";

type LegalPageProps = {
  eyebrow: string;
  title: ReadonlyArray<string>;
  updated: string;
  sections: ReadonlyArray<{ id: string; title: string }>;
  children: ReactNode;
};

/** Long-form layout for policy pages: contents on the left, readable prose on the right. */
export function LegalPage({ eyebrow, title, updated, sections, children }: LegalPageProps) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} intro={<p>Last updated {updated}.</p>} />
      <section aria-label={`${eyebrow} content`} className="bg-black pb-28 sm:pb-36">
        <Container>
          <div className="grid gap-12 border-t border-white/10 pt-14 lg:grid-cols-12 lg:gap-10">
            <nav aria-label="On this page" className="lg:col-span-3">
              <div className="lg:sticky lg:top-32">
                <p className="font-mono text-[0.6875rem] tracking-[0.16em] text-white/50 uppercase">On this page</p>
                <ol className="mt-5 space-y-2.5 text-[0.9375rem]">
                  {sections.map((section, index) => (
                    <li key={section.id}>
                      <a href={`#${section.id}`} className="flex gap-3 rounded text-white/60 transition-colors hover:text-white">
                        <span className="font-mono text-xs leading-6 text-white/40">{String(index + 1).padStart(2, "0")}</span>
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>
            <div className="legal-prose max-w-3xl lg:col-span-8 lg:col-start-5">{children}</div>
          </div>
        </Container>
      </section>
    </>
  );
}
