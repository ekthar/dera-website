"use client";

import { useSearchParams } from "next/navigation";
import { isValidService } from "@/lib/contact";
import { ContactForm } from "./contact-form";

type Props = { deliveryConfigured: boolean; fallbackEmail: string | null };

/**
 * Reads ?service= so service pages can preselect the right option.
 * Rendered inside Suspense; the fallback is the same form without a preset,
 * so the static HTML still contains a complete, usable form.
 */
export function ContactFormWithPreset({ deliveryConfigured, fallbackEmail }: Props) {
  const params = useSearchParams();
  const requested = params.get("service");
  const initialService = isValidService(requested) ? requested : "";
  return (
    <ContactForm
      key={initialService}
      deliveryConfigured={deliveryConfigured}
      fallbackEmail={fallbackEmail}
      initialService={initialService}
    />
  );
}
