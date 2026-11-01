"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";
import { easeOutExpo, fadeUp, revealViewport, staggerContainer } from "./variants";

type Tag = "div" | "li" | "ul" | "ol" | "span" | "section" | "article" | "dl";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: Tag;
  delay?: number;
  y?: number;
  duration?: number;
};

const tags = {
  div: m.div,
  li: m.li,
  ul: m.ul,
  ol: m.ol,
  span: m.span,
  section: m.section,
  article: m.article,
  dl: m.dl,
} as const;

/** Fades and lifts its content once, when it scrolls into view. */
export function Reveal({ children, className, as = "div", delay = 0, y = 24, duration = 0.9 }: RevealProps) {
  const Component = tags[as];
  return (
    <Component
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={{ duration, delay, ease: easeOutExpo }}
    >
      {children}
    </Component>
  );
}

type GroupProps = {
  children: ReactNode;
  className?: string;
  as?: Tag;
  stagger?: number;
  delay?: number;
};

/** Staggers the entrance of its RevealItem children. */
export function RevealGroup({ children, className, as = "div", stagger = 0.08, delay = 0 }: GroupProps) {
  const Component = tags[as];
  return (
    <Component
      className={className}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
    >
      {children}
    </Component>
  );
}

export function RevealItem({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: Tag }) {
  const Component = tags[as];
  return (
    <Component data-reveal="" className={className} variants={fadeUp}>
      {children}
    </Component>
  );
}
