import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Magnetic } from "@/components/motion/magnetic";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "inverse" | "inverse-secondary";
type Icon = "arrow" | "arrow-up-right" | "none";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  icon?: Icon;
  magnetic?: boolean;
  size?: "md" | "lg";
  className?: string;
  external?: boolean;
};

const variants: Record<Variant, string> = {
  primary: "bg-white text-black hover:bg-mist",
  secondary:
    "text-white ring-1 ring-inset ring-white/25 hover:ring-white/60 hover:bg-white/[0.04]",
  inverse: "bg-black text-white hover:bg-charcoal",
  "inverse-secondary": "text-black ring-1 ring-inset ring-black/20 hover:ring-black/60 hover:bg-black/[0.03]",
};

const sizes = {
  md: "h-11 px-5 text-[0.9375rem] gap-2",
  lg: "h-13 px-7 text-base gap-2.5",
} as const;

/** Pill call-to-action. Icon motion runs on hover and press, never on its own. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  icon = "arrow",
  magnetic = false,
  size = "lg",
  className,
  external = false,
}: ButtonLinkProps) {
  const IconComponent = icon === "arrow" ? ArrowRight : icon === "arrow-up-right" ? ArrowUpRight : null;
  const iconMotion =
    icon === "arrow"
      ? "group-hover/btn:translate-x-0.5"
      : "group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5";

  const classes = cn(
    "group/btn relative inline-flex select-none items-center justify-center rounded-full font-medium tracking-[-0.01em]",
    "transition-[background-color,box-shadow,color,transform] duration-300 ease-out-quart active:scale-[0.97]",
    variants[variant],
    sizes[size],
    className,
  );

  const content = (
    <>
      <span>{children}</span>
      {IconComponent ? (
        <IconComponent
          aria-hidden
          className={cn("size-[1.05em] transition-transform duration-300 ease-out-quart", iconMotion)}
          strokeWidth={1.75}
        />
      ) : null}
    </>
  );

  const anchor = external ? (
    <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
      {content}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );

  return magnetic ? <Magnetic>{anchor}</Magnetic> : anchor;
}
