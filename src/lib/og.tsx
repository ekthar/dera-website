import { monogramD, wordmarkPaths } from "@/components/brand/brand-paths";
import { businessInfo } from "@/config/site";

export const ogSize = { width: 1200, height: 630 } as const;

type OgCardProps = {
  eyebrow: string;
  title: string;
};

/** Shared Open Graph artwork, rendered by next/og at build time. */
export function OgCard({ eyebrow, title }: OgCardProps) {
  const gridLines = Array.from({ length: 20 }, (_, i) => i * 64);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#000",
        color: "#fff",
        padding: "72px 80px",
        position: "relative",
      }}
    >
      <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", top: 0, left: 0 }}>
        {gridLines.map((x) => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="630" stroke="#fff" strokeOpacity="0.05" />
        ))}
        {gridLines.slice(0, 10).map((y) => (
          <line key={`h${y}`} x1="0" y1={y} x2="1200" y2={y} stroke="#fff" strokeOpacity="0.05" />
        ))}
        <circle cx="1010" cy="250" r="230" fill="none" stroke="#fff" strokeOpacity="0.12" />
        <ellipse cx="1010" cy="250" rx="330" ry="86" fill="none" stroke="#fff" strokeOpacity="0.22" transform="rotate(-18 1010 250)" />
        <circle cx="1010" cy="250" r="150" fill="#111" stroke="#fff" strokeOpacity="0.2" />
        <circle cx="960" cy="200" r="60" fill="#fff" fillOpacity="0.06" />
      </svg>

      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <svg width="172" height="40" viewBox="0 0 86 20" fill="#fff">
          {wordmarkPaths.map((d) => (
            <path key={d} d={d} />
          ))}
        </svg>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: 22, letterSpacing: 4, color: "rgba(255,255,255,0.6)", textTransform: "uppercase" }}>{eyebrow}</span>
        <span style={{ marginTop: 20, fontSize: 76, lineHeight: 1, fontWeight: 700, letterSpacing: -3, maxWidth: 860 }}>{title}</span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 22, color: "rgba(255,255,255,0.6)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <svg width="30" height="30" viewBox="0 0 20 20" fill="#fff">
            <path d={monogramD.stem} />
            <path d={monogramD.bowl} />
          </svg>
          <span>Dera Business Solutions</span>
        </div>
        <span>Thiruvananthapuram, {businessInfo.address.state}</span>
      </div>
    </div>
  );
}
