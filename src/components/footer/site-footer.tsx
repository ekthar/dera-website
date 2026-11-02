import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DeraWordmark } from "@/components/brand/logo";
import { Container } from "@/components/ui/primitives";
import { WhatsAppLink } from "@/components/ui/whatsapp-link";
import { footerNav } from "@/config/navigation";
import { businessInfo, contactChannels, siteConfig, socialLinks } from "@/config/site";

const linkClass =
  "inline-flex rounded text-[0.9375rem] text-white/60 transition-colors duration-300 hover:text-white";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black">
      <Container className="pt-20 pb-10 sm:pt-24">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Link href="/" aria-label="Dera Business Solutions, home" className="inline-block rounded">
              <DeraWordmark className="h-6 w-auto text-white" />
              <span className="mt-3 block text-[0.6875rem] font-medium tracking-[0.28em] text-white/60">
                BUSINESS SOLUTIONS
              </span>
            </Link>
            <p className="mt-8 font-display text-2xl leading-tight font-medium tracking-[-0.03em] text-white">
              {siteConfig.tagline}
            </p>
            <ul className="mt-8 space-y-2">
              {businessInfo.phones.map((phone) => (
                <li key={phone.tel}>
                  <a className={`${linkClass} tabular-nums`} href={`tel:${phone.tel}`}>
                    {phone.display}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <WhatsAppLink className="text-[0.9375rem]" />
              </li>
              {contactChannels.email ? (
                <li>
                  <a className={linkClass} href={`mailto:${contactChannels.email}`}>
                    {contactChannels.email}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            {footerNav.map((group) => (
              <nav key={group.title} aria-label={`Footer ${group.title}`}>
                <h2 className="font-mono text-[0.6875rem] font-medium tracking-[0.16em] text-white/50 uppercase">
                  {group.title}
                </h2>
                <ul className="mt-5 space-y-3">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className={linkClass}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            {socialLinks.length > 0 ? (
              <nav aria-label="Social">
                <h2 className="font-mono text-[0.6875rem] font-medium tracking-[0.16em] text-white/50 uppercase">
                  Follow
                </h2>
                <ul className="mt-5 space-y-3">
                  {socialLinks.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} className={`${linkClass} items-center gap-1`} target="_blank" rel="noopener noreferrer">
                        {link.label}
                        <ArrowUpRight aria-hidden className="size-3.5" />
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
          </div>
        </div>

        {/* Brand signature: the wordmark, set across the full width. */}
        <div aria-hidden className="relative mt-24 select-none">
          <DeraWordmark className="w-full text-white/[0.06]" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black to-transparent" />
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 text-[0.8125rem] text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© 2026 {siteConfig.name}. All rights reserved.</p>
          <p className="flex flex-wrap gap-x-6 gap-y-1">
            <span>
              {businessInfo.address.city}, {businessInfo.address.state}, {businessInfo.address.country}.
            </span>
            <span>
              GSTIN: <span className="font-mono tracking-wide text-white/60">{businessInfo.gstin}</span>
            </span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
