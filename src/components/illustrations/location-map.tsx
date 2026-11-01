import { cn } from "@/lib/utils";

/**
 * A map-inspired drawing, not a survey map. Contours, coast and roads are
 * abstract; only the label text names the real place. No coordinates are used.
 */

const CENTER = { x: 560, y: 330 };

function contourPath(index: number): string {
  const steps = 64;
  const base = 34 + index * 30;
  const points: Array<[number, number]> = [];
  for (let i = 0; i < steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const wobble =
      Math.sin(t * 3 + index * 0.7) * (6 + index * 1.6) +
      Math.sin(t * 5 - index * 0.4) * (3 + index * 0.9) +
      Math.cos(t * 2 + index * 0.3) * (4 + index * 1.2);
    const r = base + wobble;
    points.push([CENTER.x + Math.cos(t) * r * 1.25, CENTER.y + Math.sin(t) * r * 0.82]);
  }
  // Closed Catmull-Rom spline converted to cubic Bezier segments.
  let d = `M${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`;
  for (let i = 0; i < steps; i++) {
    const p0 = points[(i - 1 + steps) % steps];
    const p1 = points[i];
    const p2 = points[(i + 1) % steps];
    const p3 = points[(i + 2) % steps];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return `${d} Z`;
}

const contours = Array.from({ length: 9 }, (_, i) => contourPath(i));

const coast =
  "M210 -10 C 238 70, 196 130, 236 200 S 268 300, 252 370 S 300 470, 318 560 S 352 640, 360 700";

export function LocationMap({ className }: { className?: string }) {
  return (
    <div className={cn("relative aspect-[45/32] overflow-hidden rounded-[1.5rem] bg-graphite ring-1 ring-white/10", className)}>
      <svg
        viewBox="0 0 900 640"
        className="block h-full w-full"
        role="img"
        aria-label="Stylised map marking Dera Business Solutions at Kavottumukk, Thiruvananthapuram, Kerala"
      >
        <defs>
          <clipPath id="map-sea">
            <path d={`${coast} L -10 700 L -10 -10 Z`} />
          </clipPath>
          <radialGradient id="map-glow" cx={CENTER.x} cy={CENTER.y} r="260" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="white" stopOpacity="0.12" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="white" strokeOpacity="0.05" />
          </pattern>
        </defs>

        <rect width="900" height="640" fill="url(#map-grid)" />

        {/* Sea, hatched. */}
        <g clipPath="url(#map-sea)">
          <rect width="900" height="640" fill="black" fillOpacity="0.55" />
          {Array.from({ length: 40 }, (_, i) => (
            <path key={i} d={`M-10 ${i * 17} H 420`} stroke="white" strokeOpacity="0.06" />
          ))}
        </g>
        <path d={coast} fill="none" stroke="white" strokeOpacity="0.35" strokeWidth="1.2" />
        <text x="70" y="560" fill="white" fillOpacity="0.4" fontSize="12" letterSpacing="4" fontFamily="ui-monospace, monospace">
          ARABIAN SEA
        </text>

        {/* Terrain contours. */}
        <g fill="none" stroke="white">
          {contours.map((d, i) => (
            <path key={i} d={d} strokeOpacity={0.05 + (8 - i) * 0.018} />
          ))}
        </g>

        {/* Roads, abstract. */}
        <g fill="none" stroke="white" strokeOpacity="0.22" strokeLinecap="round">
          <path d="M300 -10 C 380 140, 470 220, 560 330 S 760 520, 940 600" strokeWidth="3" />
          <path d="M240 330 C 360 320, 460 340, 560 330 S 780 300, 940 250" strokeWidth="1.6" />
          <path d="M560 330 C 590 420, 600 520, 640 660" strokeWidth="1.2" strokeDasharray="5 6" />
        </g>

        <circle cx={CENTER.x} cy={CENTER.y} r="260" fill="url(#map-glow)" />

        {/* Marker */}
        <g>
          <circle cx={CENTER.x} cy={CENTER.y} r="10" fill="white" fillOpacity="0.15" className="animate-pulse-dot" style={{ transformBox: "fill-box", transformOrigin: "center" }} />
          <circle cx={CENTER.x} cy={CENTER.y} r="22" fill="none" stroke="white" strokeOpacity="0.35" />
          <circle cx={CENTER.x} cy={CENTER.y} r="7" fill="white" />
          <circle cx={CENTER.x} cy={CENTER.y} r="2.5" fill="black" />
        </g>

        {/* North arrow */}
        <g transform="translate(830 70)" stroke="white" strokeOpacity="0.5" fill="none">
          <circle r="18" />
          <path d="M0 -12 L5 6 L0 2 L-5 6 Z" fill="white" fillOpacity="0.7" stroke="none" />
        </g>
        <text x="830" y="112" textAnchor="middle" fill="white" fillOpacity="0.5" fontSize="11" fontFamily="ui-monospace, monospace">
          N
        </text>
      </svg>

      {/* Label card anchored to the marker. */}
      <div className="pointer-events-none absolute top-[51.56%] left-[62.2%] -translate-x-1/2 translate-y-7 sm:translate-x-8 sm:-translate-y-1/2">
        <div className="glass-dark rounded-xl px-4 py-3 ring-1 ring-white/15">
          <p className="text-[0.8125rem] font-semibold whitespace-nowrap text-white">Dera Business Solutions</p>
          <p className="mt-0.5 text-[0.75rem] whitespace-nowrap text-white/60">Kavottumukk, Thiruvananthapuram</p>
        </div>
      </div>
    </div>
  );
}
