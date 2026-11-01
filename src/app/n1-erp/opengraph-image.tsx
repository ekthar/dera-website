import { ImageResponse } from "next/og";
import { OgCard, ogSize } from "@/lib/og";

export const alt = "N1 ERP by Dera Business Solutions. Everything connected. In development.";
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <OgCard eyebrow="In development · Built by Dera" title="N1 ERP. Everything connected." mark="n1" />,
    size,
  );
}
