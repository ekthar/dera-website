import { ImageResponse } from "next/og";
import { OgCard, ogSize } from "@/lib/og";

export const alt = "Dera Business Solutions. Building the infrastructure for what's next.";
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <OgCard eyebrow="Technology. Systems. Solutions." title="Building the infrastructure for what's next." mark="dera" />,
    size,
  );
}
