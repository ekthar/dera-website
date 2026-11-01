"use client";

import { m, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Rounded so server and client print identical attribute values. */
const r2 = (value: number) => Math.round(value * 100) / 100;

type Orbit = {
  id: string;
  rotate: number;
  squash: number;
  r: number;
  opacity: number;
  dashed?: boolean;
  /** Seconds per revolution. Slow enough to read as ambient, not as a signal. */
  duration: number;
  nodes: ReadonlyArray<number>;
};

const orbits: ReadonlyArray<Orbit> = [
  { id: "a", rotate: -18, squash: 0.27, r: 440, opacity: 0.28, duration: 64, nodes: [0, 200] },
  { id: "b", rotate: 54, squash: 0.17, r: 372, opacity: 0.16, dashed: true, duration: 90, nodes: [120] },
  { id: "c", rotate: -62, squash: 0.36, r: 318, opacity: 0.12, duration: 76, nodes: [300] },
];

/** Ellipse as a path, so nodes can travel along it without being squashed. */
function ellipsePath(rx: number, ry: number): string {
  return `M${rx} 0 A${rx} ${ry} 0 1 1 ${-rx} 0 A${rx} ${ry} 0 1 1 ${rx} 0`;
}

function OrbitRings({ half }: { half: "back" | "front" }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const reduce = useReducedMotion();

  // SMIL ignores the reduced-motion media query, so pause it explicitly.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    if (reduce) svg.pauseAnimations();
    else svg.unpauseAnimations();
  }, [reduce]);

  return (
    <svg ref={svgRef} viewBox="-500 -500 1000 1000" className="absolute inset-0 h-full w-full overflow-visible">
      <defs>
        <clipPath id={`hero-orbit-${half}`}>
          <rect x="-520" y={half === "front" ? 0 : -520} width="1040" height={half === "front" ? 520 : 1040} />
        </clipPath>
      </defs>
      {orbits.map((orbit) => {
        const ry = r2(orbit.r * orbit.squash);
        const path = ellipsePath(orbit.r, ry);
        return (
          <g key={orbit.id} transform={`rotate(${orbit.rotate})`}>
            <g clipPath={`url(#hero-orbit-${half})`}>
              <path
                d={path}
                fill="none"
                stroke="white"
                strokeOpacity={orbit.opacity}
                strokeWidth={1.2}
                strokeDasharray={orbit.dashed ? "3 7" : undefined}
              />
              {orbit.nodes.map((angle) => (
                <circle key={angle} r={half === "front" ? 5.5 : 4} fill="white" fillOpacity={half === "front" ? 1 : 0.45}>
                  <animateMotion
                    dur={`${orbit.duration}s`}
                    repeatCount="indefinite"
                    begin={`${r2((-orbit.duration * angle) / 360)}s`}
                    path={path}
                  />
                </circle>
              ))}
            </g>
          </g>
        );
      })}
      {half === "back" ? (
        <g>
          {/* Measuring ring with fine ticks. */}
          <circle r="486" fill="none" stroke="white" strokeOpacity="0.07" />
          {Array.from({ length: 72 }, (_, i) => {
            const rad = (i * 5 * Math.PI) / 180;
            const long = i % 6 === 0;
            const inner = long ? 470 : 478;
            return (
              <line
                key={i}
                x1={r2(Math.cos(rad) * inner)}
                y1={r2(Math.sin(rad) * inner)}
                x2={r2(Math.cos(rad) * 486)}
                y2={r2(Math.sin(rad) * 486)}
                stroke="white"
                strokeOpacity={long ? 0.22 : 0.09}
              />
            );
          })}
        </g>
      ) : null}
    </svg>
  );
}

function Sphere() {
  return (
    <div className="absolute inset-[25%] animate-float">
      {/* Body: key light top-left, falling into shadow. */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 33% 27%, #dcdcdc 0%, #8f8f8f 6%, #3f3f3f 21%, #181818 42%, #070707 63%, #000 80%)",
          boxShadow:
            "inset -24px -36px 70px rgb(0 0 0 / 0.85), inset 6px 8px 30px rgb(255 255 255 / 0.06), 0 0 140px 10px rgb(255 255 255 / 0.05)",
        }}
      />
      {/* Rim light from behind, lower right. */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle at 78% 86%, rgb(255 255 255 / 0.22), transparent 34%)",
          mixBlendMode: "screen",
        }}
      />
      {/* Latitude and longitude lines, clipped to the sphere. */}
      <svg viewBox="-100 -100 200 200" className="absolute inset-0 h-full w-full">
        <defs>
          <clipPath id="hero-sphere-clip">
            <circle r="99.5" />
          </clipPath>
          <radialGradient id="hero-sphere-lines" cx="30%" cy="25%" r="80%">
            <stop offset="0%" stopColor="white" stopOpacity="0.16" />
            <stop offset="100%" stopColor="white" stopOpacity="0.015" />
          </radialGradient>
        </defs>
        <g clipPath="url(#hero-sphere-clip)" fill="none" stroke="url(#hero-sphere-lines)" strokeWidth="0.35">
          {[-75, -50, -25, 0, 25, 50, 75].map((y) => (
            <ellipse key={`lat-${y}`} cx="0" cy={y} rx={r2(Math.sqrt(100 * 100 - y * y))} ry={r2(Math.sqrt(100 * 100 - y * y) * 0.16)} />
          ))}
          {[20, 45, 70, 92].map((rx) => (
            <ellipse key={`lon-${rx}`} cx="0" cy="0" rx={rx} ry="100" />
          ))}
        </g>
        <circle r="99.6" fill="none" stroke="white" strokeOpacity="0.14" strokeWidth="0.4" />
      </svg>
    </div>
  );
}

/** Kept to the right of the headline column so labels never touch the copy. */
const callouts = [
  { label: "Software", className: "left-[36%] top-[21%]", line: "right" },
  { label: "Enterprise systems", className: "right-[2%] top-[16%]", line: "left" },
  { label: "Hardware", className: "right-[0%] top-[49%]", line: "left" },
  { label: "Connectivity", className: "right-[9%] bottom-[23%]", line: "left" },
] as const;

function Callouts() {
  return (
    <div className="absolute inset-0 hidden lg:block">
      {callouts.map((callout, index) => (
        <div
          key={callout.label}
          className={cn("absolute flex items-center gap-3 animate-fade-up", callout.className)}
          style={{ animationDelay: `${1.1 + index * 0.12}s` }}
        >
          {callout.line === "left" ? (
            <>
              <span className="size-1.5 rounded-full bg-white" />
              <span className="h-px w-10 bg-white/30" />
            </>
          ) : null}
          <span className="font-mono text-[0.625rem] tracking-[0.16em] text-white/60 uppercase">{callout.label}</span>
          {callout.line === "right" ? (
            <>
              <span className="h-px w-10 bg-white/30" />
              <span className="size-1.5 rounded-full bg-white" />
            </>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function Layer({ children, depth, px, py, className }: { children: ReactNode; depth: number; px: MotionValue<number>; py: MotionValue<number>; className?: string }) {
  const x = useTransform(px, (value) => value * depth * 18);
  const y = useTransform(py, (value) => value * depth * 14);
  return (
    <m.div className={cn("absolute inset-0", className)} style={{ x, y }}>
      {children}
    </m.div>
  );
}

/** Decorative hero composition. Hidden from assistive technology. */
export function HeroVisual() {
  const reduce = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const px = useSpring(pointerX, { stiffness: 50, damping: 20, mass: 0.8 });
  const py = useSpring(pointerY, { stiffness: 50, damping: 20, mass: 0.8 });

  useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia("(pointer: fine)");
    if (!fine.matches) return;
    function onMove(event: PointerEvent) {
      pointerX.set((event.clientX / window.innerWidth) * 2 - 1);
      pointerY.set((event.clientY / window.innerHeight) * 2 - 1);
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, pointerX, pointerY]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Perspective floor grid. */}
      <div className="absolute inset-x-[-40%] bottom-[-6%] h-[52%] [perspective:700px]">
        <div className="h-full w-full origin-bottom [transform:rotateX(64deg)] overflow-hidden [mask-image:radial-gradient(ellipse_at_50%_100%,#000_10%,transparent_70%)]">
          <div className="bg-grid absolute inset-x-0 -top-16 bottom-0 animate-grid-drift" />
        </div>
      </div>

      {/* Blueprint column lines. */}
      <div className="absolute inset-0 mx-auto hidden max-w-[90rem] grid-cols-12 px-12 lg:grid">
        {Array.from({ length: 12 }, (_, i) => (
          <span key={i} className={cn("h-full border-l border-white/[0.035]", i === 11 && "border-r")} />
        ))}
      </div>

      {/* Sphere system. */}
      <div className="absolute top-[30%] left-1/2 aspect-square w-[min(150vw,46rem)] -translate-x-1/2 -translate-y-1/2 animate-fade-up [animation-duration:1.8s] sm:top-[34%] lg:top-[45%] lg:left-[66%] lg:w-[min(64vw,60rem)]">
        <Layer depth={0.25} px={px} py={py}>
          <div className="absolute inset-[-10%] rounded-full bg-[radial-gradient(circle,rgb(255_255_255/0.09)_0%,transparent_58%)]" />
        </Layer>
        {/* Rings and sphere share one depth so the ring halves stay aligned. */}
        <Layer depth={0.9} px={px} py={py}>
          <OrbitRings half="back" />
          <Sphere />
          <OrbitRings half="front" />
        </Layer>
        <Layer depth={1.6} px={px} py={py}>
          <Callouts />
        </Layer>
      </div>

      {/* Fade into the page below. */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-black to-transparent" />
    </div>
  );
}
