import type { Metadata } from "next";
import { ClosingCta } from "@/components/sections/closing-cta";
import { Approach } from "@/components/sections/home/approach";
import { Capabilities } from "@/components/sections/home/capabilities";
import { Hero } from "@/components/sections/home/hero";
import { Intro } from "@/components/sections/home/intro";
import { Location } from "@/components/sections/home/location";
import { WhyDera } from "@/components/sections/home/why-dera";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: `${siteConfig.name} | Software, ERP, Hardware and Networking in Thiruvananthapuram`,
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Capabilities />
      <WhyDera />
      <Approach />
      <Location />
      <ClosingCta />
    </>
  );
}
