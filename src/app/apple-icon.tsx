import { ImageResponse } from "next/og";
import { monogramD } from "@/components/brand/brand-paths";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#000" }}>
      <svg width="100" height="100" viewBox="0 0 20 20" fill="#fff">
        <path d={monogramD.stem} />
        <path d={monogramD.bowl} />
      </svg>
    </div>,
    size,
  );
}
