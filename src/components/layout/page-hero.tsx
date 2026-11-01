import type { ReactNode } from "react";
import { Container } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: ReadonlyArray<string>;
  intro?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
  className?: string;
  titleClassName?: string;
};

/**
 * Hero for inner pages. The title animates with CSS so it paints before
 * any JavaScript runs.
 */
export function PageHero({ eyebrow, title, intro, children, aside, className, titleClassName }: PageHeroProps) {
  return (
    <section aria-labelledby="page-title" className={cn("relative isolate overflow-hidden bg-black", className)}>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_70%_0%,#000,transparent)]" />
        <div className="absolute -top-1/2 right-[-10%] aspect-square w-[70rem] rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.07),transparent)]" />
      </div>
      <Container className="pt-36 pb-20 sm:pt-44 sm:pb-24 lg:pt-52 lg:pb-28">
        <p className="flex animate-fade-up items-center gap-3 font-mono text-[0.6875rem] font-medium tracking-[0.16em] text-white/60 uppercase">
          <span aria-hidden className="h-px w-6 bg-white/30" />
          {eyebrow}
        </p>
        <div className={cn("mt-8 grid gap-12", aside ? "lg:grid-cols-12 lg:items-end" : null)}>
          <div className={cn(aside ? "lg:col-span-7" : null)}>
            <h1
              id="page-title"
              className={cn("font-display text-display-lg font-semibold text-white", titleClassName)}
            >
              {title.map((line, index) => (
                <span key={line} className="line-mask">
                  <span className="block animate-hero-line" style={{ animationDelay: `${120 + index * 100}ms` }}>
                    {line}
                  </span>
                </span>
              ))}
            </h1>
            {intro ? (
              <div className="mt-8 max-w-2xl animate-fade-up text-lead text-white/65 [animation-delay:420ms]">{intro}</div>
            ) : null}
            {children ? <div className="mt-10 animate-fade-up [animation-delay:520ms]">{children}</div> : null}
          </div>
          {aside ? <div className="animate-fade-up [animation-delay:480ms] lg:col-span-5">{aside}</div> : null}
        </div>
      </Container>
    </section>
  );
}
