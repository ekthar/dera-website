import type { ComponentType } from "react";
import type { ServiceVisualKind } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Line illustrations for each service. They draw in currentColor, so the
 * parent's text colour decides whether they sit on dark or light surfaces.
 * Motion is limited to hover states and slow ambient dashes.
 */

type VisualProps = { className?: string };

const svgBase = "h-full w-full overflow-visible";
const mono = { fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" } as const;

type CodeSegment = readonly [number, number];
const codeRows: ReadonlyArray<{ indent: number; segments: ReadonlyArray<CodeSegment> }> = [
  { indent: 0, segments: [[34, 0.6], [58, 0.3], [22, 0.18]] },
  { indent: 1, segments: [[46, 0.45], [84, 0.22]] },
  { indent: 1, segments: [[28, 0.6], [40, 0.3], [64, 0.18]] },
  { indent: 2, segments: [[72, 0.32], [30, 0.5]] },
  { indent: 2, segments: [[52, 0.22], [96, 0.16]] },
  { indent: 1, segments: [[20, 0.6]] },
  { indent: 1, segments: [[60, 0.45], [36, 0.25], [48, 0.16]] },
  { indent: 0, segments: [[14, 0.6]] },
];

export function CodeVisual({ className }: VisualProps) {
  const top = 70;
  const rowHeight = 19;
  return (
    <svg viewBox="0 0 400 260" className={cn(svgBase, className)} fill="none">
      <rect x="16.5" y="16.5" width="367" height="227" rx="12" stroke="currentColor" strokeOpacity="0.16" fill="currentColor" fillOpacity="0.02" />
      <path d="M16.5 46.5h367" stroke="currentColor" strokeOpacity="0.12" />
      {[34, 46, 58].map((cx) => (
        <circle key={cx} cx={cx} cy="31.5" r="3.5" fill="currentColor" fillOpacity="0.22" />
      ))}
      <rect x="84" y="24" width="88" height="15" rx="4" fill="currentColor" fillOpacity="0.07" />
      <text x="94" y="35.5" fontSize="10" fill="currentColor" fillOpacity="0.6" style={mono}>
        ledger.ts
      </text>
      <path d="M58.5 46.5v197" stroke="currentColor" strokeOpacity="0.08" />

      {/* Active line band. */}
      <rect
        x="17"
        y={top + rowHeight * 3 - 13}
        width="366"
        height="18"
        fill="currentColor"
        fillOpacity="0.05"
        className="transition-[fill-opacity] duration-500 group-hover:[fill-opacity:0.09]"
      />

      {codeRows.map((row, index) => {
        const y = top + index * rowHeight;
        let x = 72 + row.indent * 18;
        return (
          <g key={index}>
            <text x="28" y={y} fontSize="9.5" fill="currentColor" fillOpacity="0.32" style={mono}>
              {String(index + 1).padStart(2, "0")}
            </text>
            {row.segments.map(([width, opacity], segmentIndex) => {
              const rect = (
                <rect
                  key={segmentIndex}
                  x={x}
                  y={y - 7}
                  width={width}
                  height="7"
                  rx="3.5"
                  fill="currentColor"
                  fillOpacity={opacity}
                  className="origin-left transition-transform duration-700 ease-out-expo group-hover:scale-x-[1.06]"
                  style={{ transformBox: "fill-box" }}
                />
              );
              x += width + 7;
              return rect;
            })}
            {index === 3 ? (
              <rect x={x + 2} y={y - 9} width="1.6" height="11" fill="currentColor" className="animate-blink" />
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}

const erpModules = [
  { label: "SALES", x: 62, y: 52 },
  { label: "STOCK", x: 338, y: 52 },
  { label: "ACCOUNTS", x: 44, y: 196 },
  { label: "PURCHASE", x: 356, y: 196 },
  { label: "REPORTS", x: 200, y: 222 },
] as const;

export function ErpVisual({ className }: VisualProps) {
  return (
    <svg viewBox="0 0 400 260" className={cn(svgBase, className)} fill="none">
      {erpModules.map((node) => (
        <path
          key={`link-${node.label}`}
          d={`M200 126 L${node.x} ${node.y}`}
          stroke="currentColor"
          strokeOpacity="0.28"
          strokeDasharray="2 6"
          className="animate-dash"
        />
      ))}
      {/* Hub: a miniature dashboard. */}
      <g className="transition-transform duration-700 ease-out-expo group-hover:-translate-y-1">
        <rect x="140.5" y="86.5" width="119" height="79" rx="10" fill="currentColor" fillOpacity="0.06" stroke="currentColor" strokeOpacity="0.4" />
        <rect x="152" y="98" width="30" height="5" rx="2.5" fill="currentColor" fillOpacity="0.6" />
        <rect x="152" y="110" width="44" height="18" rx="4" fill="currentColor" fillOpacity="0.1" />
        <rect x="202" y="110" width="46" height="18" rx="4" fill="currentColor" fillOpacity="0.1" />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <rect
            key={i}
            x={154 + i * 13.5}
            y={154 - [10, 16, 12, 20, 15, 22, 18][i]}
            width="7"
            height={[10, 16, 12, 20, 15, 22, 18][i]}
            rx="1.5"
            fill="currentColor"
            fillOpacity={i === 5 ? 0.85 : 0.3}
          />
        ))}
      </g>
      {erpModules.map((node) => (
        <g key={node.label}>
          <circle cx={node.x} cy={node.y} r="16" fill="currentColor" fillOpacity="0.04" stroke="currentColor" strokeOpacity="0.3" />
          <circle cx={node.x} cy={node.y} r="3.5" fill="currentColor" />
          <text
            x={node.x}
            y={node.y + 33}
            textAnchor="middle"
            fontSize="11"
            letterSpacing="1.2"
            fill="currentColor"
            fillOpacity="0.55"
            style={mono}
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export function HardwareVisual({ className }: VisualProps) {
  return (
    <svg viewBox="0 0 400 260" className={cn(svgBase, className)} fill="none" stroke="currentColor">
      {/* Rack unit */}
      <g className="transition-transform duration-700 ease-out-expo group-hover:-translate-y-1.5">
        <rect x="40.5" y="40.5" width="86" height="176" rx="8" strokeOpacity="0.4" fill="currentColor" fillOpacity="0.03" />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x="52.5" y={54.5 + i * 31} width="62" height="21" rx="4" strokeOpacity="0.22" />
            <circle cx="63" cy={65 + i * 31} r="2" fill="currentColor" stroke="none" fillOpacity={i === 1 ? 1 : 0.35} />
            <path d={`M72 ${65 + i * 31}h32`} strokeOpacity="0.18" />
          </g>
        ))}
      </g>
      {/* Display */}
      <g className="transition-transform delay-75 duration-700 ease-out-expo group-hover:-translate-y-1.5">
        <rect x="156.5" y="52.5" width="200" height="124" rx="9" strokeOpacity="0.4" fill="currentColor" fillOpacity="0.03" />
        <rect x="168.5" y="64.5" width="176" height="100" rx="4" strokeOpacity="0.14" />
        <path d="M180 148 214 118l26 16 38-40 34 22" strokeOpacity="0.55" strokeLinejoin="round" />
        <path d="M246.5 176.5v22M226 198.5h41" strokeOpacity="0.4" strokeLinecap="round" />
      </g>
      {/* Keyboard */}
      <g className="transition-transform delay-150 duration-700 ease-out-expo group-hover:-translate-y-1.5">
        <rect x="176.5" y="210.5" width="160" height="22" rx="5" strokeOpacity="0.35" />
        {Array.from({ length: 9 }, (_, i) => (
          <path key={i} d={`M${189 + i * 15} 221.5h7`} strokeOpacity="0.25" strokeLinecap="round" />
        ))}
      </g>
    </svg>
  );
}

const netNodes = [
  [60, 70], [150, 40], [250, 62], [340, 44], [100, 150], [200, 130], [300, 150], [56, 220], [170, 214], [270, 226], [356, 206],
] as const;
const netLinks: ReadonlyArray<readonly [number, number]> = [
  [0, 1], [1, 2], [2, 3], [0, 4], [1, 5], [2, 5], [3, 6], [4, 5], [5, 6], [4, 7], [4, 8], [5, 8], [6, 9], [6, 10], [8, 9], [9, 10],
];
const activePath = [0, 4, 5, 6, 10];

export function NetworkVisual({ className }: VisualProps) {
  const pathD = activePath.map((index, i) => `${i === 0 ? "M" : "L"}${netNodes[index][0]} ${netNodes[index][1]}`).join(" ");
  return (
    <svg viewBox="0 0 400 260" className={cn(svgBase, className)} fill="none">
      {netLinks.map(([a, b]) => (
        <path
          key={`${a}-${b}`}
          d={`M${netNodes[a][0]} ${netNodes[a][1]} L${netNodes[b][0]} ${netNodes[b][1]}`}
          stroke="currentColor"
          strokeOpacity="0.16"
        />
      ))}
      <path d={pathD} stroke="currentColor" strokeOpacity="0.85" strokeWidth="1.5" strokeDasharray="6 6" className="animate-dash" />
      {netNodes.map(([x, y], index) => {
        const core = index === 5;
        const onPath = activePath.includes(index);
        return core ? (
          <g key={index}>
            <rect x={x - 13} y={y - 13} width="26" height="26" rx="6" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeOpacity="0.7" />
            <circle cx={x} cy={y} r="3.5" fill="currentColor" />
          </g>
        ) : (
          <g key={index}>
            {onPath ? <circle cx={x} cy={y} r="10" stroke="currentColor" strokeOpacity="0.25" /> : null}
            <circle cx={x} cy={y} r={onPath ? 4 : 3} fill="currentColor" fillOpacity={onPath ? 1 : 0.4} />
          </g>
        );
      })}
    </svg>
  );
}

const flowSteps = [
  { label: "NEW ORDER", x: 20 },
  { label: "CHECK RULE", x: 150 },
  { label: "UPDATE", x: 280 },
] as const;

export function AutomationVisual({ className }: VisualProps) {
  return (
    <svg viewBox="0 0 400 260" className={cn(svgBase, className)} fill="none">
      {flowSteps.map((step, index) => (
        <g key={step.label} className="transition-transform duration-700 ease-out-expo group-hover:-translate-y-1" style={{ transitionDelay: `${index * 70}ms` }}>
          <rect x={step.x + 0.5} y="86.5" width="100" height="44" rx="10" stroke="currentColor" strokeOpacity="0.5" fill="currentColor" fillOpacity={index === 1 ? 0.06 : 0} />
          <text x={step.x + 50} y="112.5" textAnchor="middle" fontSize="11" letterSpacing="0.6" fill="currentColor" fillOpacity="0.75" style={mono}>
            {step.label}
          </text>
        </g>
      ))}
      <path d="M121 108.5h28M251 108.5h28" stroke="currentColor" strokeOpacity="0.6" strokeDasharray="4 4" className="animate-dash" />
      <path d="M145 104.5l4 4-4 4M275 104.5l4 4-4 4" stroke="currentColor" strokeOpacity="0.6" />
      {/* Branches below the update step. */}
      <path d="M330 131v26c0 8-6 14-14 14H84c-8 0-14 6-14 14v8" stroke="currentColor" strokeOpacity="0.25" />
      <path d="M330 157v36" stroke="currentColor" strokeOpacity="0.25" />
      <g>
        <rect x="20.5" y="193.5" width="100" height="36" rx="18" stroke="currentColor" strokeOpacity="0.35" />
        <text x="70" y="215.5" textAnchor="middle" fontSize="11" letterSpacing="0.6" fill="currentColor" fillOpacity="0.65" style={mono}>
          NOTIFY
        </text>
        <rect x="280.5" y="193.5" width="100" height="36" rx="18" fill="currentColor" />
        <path d="M311 211.5l5 5 9-10" style={{ stroke: "var(--visual-contrast, #000)" }} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <text x="354" y="215.5" textAnchor="middle" fontSize="11" letterSpacing="0.6" style={{ ...mono, fill: "var(--visual-contrast, #000)" }}>
          DONE
        </text>
      </g>
      <text x="20" y="60" fontSize="10" letterSpacing="1.4" fill="currentColor" fillOpacity="0.45" style={mono}>
        WORKFLOW / 01
      </text>
      <path d="M20 70.5h360" stroke="currentColor" strokeOpacity="0.12" />
    </svg>
  );
}

export function BlueprintVisual({ className }: VisualProps) {
  return (
    <svg viewBox="0 0 400 260" className={cn(svgBase, className)} fill="none" stroke="currentColor">
      <g className="origin-center transition-transform duration-1000 ease-out-expo group-hover:rotate-[30deg]" style={{ transformBox: "fill-box" }}>
        <circle cx="200" cy="130" r="86" strokeOpacity="0.32" />
        <circle cx="200" cy="130" r="58" strokeOpacity="0.22" strokeDasharray="3 5" />
        <rect x="159" y="89" width="82" height="82" strokeOpacity="0.4" transform="rotate(45 200 130)" />
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          return (
            <path
              key={i}
              d={`M${200 + Math.cos(angle) * 86} ${130 + Math.sin(angle) * 86} L${200 + Math.cos(angle) * 96} ${130 + Math.sin(angle) * 96}`}
              strokeOpacity="0.4"
            />
          );
        })}
      </g>
      <circle cx="200" cy="130" r="20" strokeOpacity="0.7" />
      <path d="M200 30v200M80 130h240" strokeOpacity="0.14" strokeDasharray="8 4 2 4" />
      {/* Dimension line */}
      <path d="M114 236h172M114 230v12M286 230v12" strokeOpacity="0.4" />
      <text x="200" y="231" textAnchor="middle" fontSize="10" stroke="none" fill="currentColor" fillOpacity="0.55" style={mono}>
        172
      </text>
      <path d="M296 70l30-24h50" strokeOpacity="0.35" />
      <text x="330" y="41" fontSize="10" stroke="none" fill="currentColor" fillOpacity="0.55" style={mono}>
        R 86
      </text>
      <path d="M24 30h16M32 22v16M360 214h16M368 206v16" strokeOpacity="0.4" />
    </svg>
  );
}

const visualMap: Record<ServiceVisualKind, ComponentType<VisualProps>> = {
  code: CodeVisual,
  erp: ErpVisual,
  hardware: HardwareVisual,
  network: NetworkVisual,
  automation: AutomationVisual,
  blueprint: BlueprintVisual,
};

export function ServiceVisual({ kind, className }: { kind: ServiceVisualKind; className?: string }) {
  const Visual = visualMap[kind];
  return (
    <div aria-hidden className={className}>
      <Visual />
    </div>
  );
}
