import { MessageCircle } from "lucide-react";
import { businessInfo, whatsappUrl } from "@/config/site";
import { cn } from "@/lib/utils";

type WhatsAppLinkProps = {
  className?: string;
  /** "pill" for a button, "text" for an inline link. */
  variant?: "pill" | "text";
  label?: string;
};

/** Opens a WhatsApp chat with the business in a new tab. */
export function WhatsAppLink({ className, variant = "text", label = "Chat on WhatsApp" }: WhatsAppLinkProps) {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex items-center gap-2 font-medium",
        variant === "pill"
          ? "h-12 justify-center rounded-full px-6 text-base text-white ring-1 ring-inset ring-white/25 transition-[box-shadow,background-color] duration-300 hover:bg-white/[0.04] hover:ring-white/60 active:scale-[0.98]"
          : "rounded text-white underline-offset-4 hover:underline",
        className,
      )}
    >
      <MessageCircle aria-hidden strokeWidth={1.75} className="size-4 shrink-0" />
      {label}
      <span className="sr-only">
        {" "}
        at {businessInfo.whatsapp.display} (opens in a new tab)
      </span>
    </a>
  );
}
