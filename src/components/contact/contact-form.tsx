"use client";

import Link from "next/link";
import { ArrowRight, CircleAlert, CircleCheck, Info, LoaderCircle } from "lucide-react";
import { useId, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { contactServiceOptions } from "@/config/services";
import {
  contactLimits,
  emptyContactFields,
  validateContact,
  validateContactField,
  type ContactApiResponse,
  type ContactErrors,
  type ContactField,
  type ContactFields,
} from "@/lib/contact";
import { cn } from "@/lib/utils";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "sent" }
  | { kind: "error"; message: string };

type ContactFormProps = {
  deliveryConfigured: boolean;
  initialService?: string;
  fallbackEmail?: string | null;
};

const fieldOrder: ReadonlyArray<ContactField> = ["name", "email", "phone", "company", "service", "details"];

const inputBase =
  "block w-full rounded-xl bg-white/[0.03] px-4 text-[1rem] text-white ring-1 ring-inset transition-[box-shadow,background-color] duration-200 placeholder:text-white/35 focus:bg-white/[0.05] focus:outline-none focus:ring-2";

function errorMessageFor(reason: Extract<ContactApiResponse, { ok: false }>["reason"]): string {
  switch (reason) {
    case "not-configured":
      return "Your message was not sent. Online enquiries are not connected yet.";
    case "rate-limited":
      return "Too many attempts in a short time. Please wait a few minutes and try again.";
    case "invalid":
      return "Some details need attention. Please check the highlighted fields.";
    default:
      return "Your message could not be sent. Please try again in a moment.";
  }
}

export function ContactForm({ deliveryConfigured, initialService = "", fallbackEmail = null }: ContactFormProps) {
  const id = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [fields, setFields] = useState<ContactFields>({ ...emptyContactFields, service: initialService });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const fieldId = (name: ContactField) => `${id}-${name}`;
  const errorId = (name: ContactField) => `${id}-${name}-error`;

  function update(name: ContactField) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = event.target.value;
      setFields((prev) => ({ ...prev, [name]: value }));
      // Once a field has been left with an error, re-check it as the visitor types.
      if (touched[name]) {
        setErrors((prev) => ({ ...prev, [name]: validateContactField(name, value) }));
      }
    };
  }

  function blur(name: ContactField) {
    return () => {
      setTouched((prev) => ({ ...prev, [name]: true }));
      setErrors((prev) => ({ ...prev, [name]: validateContactField(name, fields[name]) }));
    };
  }

  function focusFirstError(found: ContactErrors) {
    const first = fieldOrder.find((name) => found[name]);
    if (first) formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(fieldId(first))}`)?.focus();
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validateContact(fields);
    setTouched({ name: true, email: true, phone: true, company: true, service: true, details: true });
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus({ kind: "error", message: "Some details need attention. Please check the highlighted fields." });
      focusFirstError(found);
      return;
    }

    if (!deliveryConfigured) {
      setStatus({ kind: "error", message: errorMessageFor("not-configured") });
      return;
    }

    setStatus({ kind: "submitting" });
    const honeypot = (formRef.current?.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, website: honeypot }),
      });
      const result = (await response.json().catch(() => null)) as ContactApiResponse | null;
      if (response.ok && result?.ok) {
        setStatus({ kind: "sent" });
        setFields({ ...emptyContactFields });
        setTouched({});
        setErrors({});
        return;
      }
      if (result && !result.ok) {
        if (result.errors) {
          setErrors(result.errors);
          focusFirstError(result.errors);
        }
        setStatus({ kind: "error", message: errorMessageFor(result.reason) });
        return;
      }
      setStatus({ kind: "error", message: errorMessageFor("failed") });
    } catch {
      setStatus({ kind: "error", message: errorMessageFor("failed") });
    }
  }

  const submitting = status.kind === "submitting";

  if (status.kind === "sent") {
    return (
      <div role="status" className="rounded-[1.5rem] bg-graphite p-8 ring-1 ring-white/10 sm:p-12">
        <CircleCheck aria-hidden strokeWidth={1.5} className="size-10 text-white" />
        <h2 className="mt-8 font-display text-display-sm font-semibold text-white">Thank you. Your message was sent.</h2>
        <p className="mt-4 max-w-md text-[1.0625rem] leading-relaxed text-white/65">
          We have received your enquiry and will reply using the contact details you shared.
        </p>
        <button
          type="button"
          onClick={() => setStatus({ kind: "idle" })}
          className="mt-8 inline-flex h-11 items-center rounded-full px-5 text-sm font-medium text-white ring-1 ring-white/25 transition-colors hover:ring-white/60"
        >
          Send another message
        </button>
      </div>
    );
  }

  function fieldClasses(name: ContactField) {
    return cn(inputBase, errors[name] ? "ring-white focus:ring-white" : "ring-white/15 hover:ring-white/30 focus:ring-white/70");
  }

  function fieldError(name: ContactField) {
    if (!errors[name]) return null;
    return (
      <p id={errorId(name)} className="mt-2 flex items-start gap-2 text-sm text-white">
        <CircleAlert aria-hidden strokeWidth={2} className="mt-0.5 size-4 shrink-0" />
        <span>
          <span className="sr-only">Error: </span>
          {errors[name]}
        </span>
      </p>
    );
  }

  const describedBy = (name: ContactField, hint?: string) =>
    [errors[name] ? errorId(name) : null, hint ?? null].filter(Boolean).join(" ") || undefined;

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} aria-describedby={!deliveryConfigured ? `${id}-notice` : undefined}>
      {!deliveryConfigured ? (
        <div id={`${id}-notice`} className="mb-8 flex gap-3 rounded-2xl bg-white/[0.04] p-4 text-sm leading-relaxed text-white/75 ring-1 ring-white/15 sm:p-5">
          <Info aria-hidden strokeWidth={1.75} className="mt-0.5 size-4 shrink-0 text-white" />
          <p>
            <strong className="font-medium text-white">Online submission is not connected yet.</strong> You can fill in
            the form to check your details, but messages cannot be sent from this page until email delivery is set up.
            {fallbackEmail ? (
              <>
                {" "}
                Please email{" "}
                <a className="text-white underline underline-offset-2" href={`mailto:${fallbackEmail}`}>
                  {fallbackEmail}
                </a>{" "}
                instead.
              </>
            ) : (
              <> Please visit or write to the business address shown on this page.</>
            )}
          </p>
        </div>
      ) : null}

      {/* Honeypot for bots. Hidden from people and assistive technology. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-website`}>Leave this field empty</label>
        <input id={`${id}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor={fieldId("name")} className="text-sm font-medium text-white">
            Name <span aria-hidden className="text-white/50">*</span>
          </label>
          <input
            id={fieldId("name")}
            name="name"
            type="text"
            autoComplete="name"
            required
            maxLength={contactLimits.name}
            value={fields.name}
            onChange={update("name")}
            onBlur={blur("name")}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy("name")}
            className={cn(fieldClasses("name"), "mt-2 h-13")}
          />
          {fieldError("name")}
        </div>

        <div>
          <label htmlFor={fieldId("email")} className="text-sm font-medium text-white">
            Email <span aria-hidden className="text-white/50">*</span>
          </label>
          <input
            id={fieldId("email")}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            maxLength={contactLimits.email}
            value={fields.email}
            onChange={update("email")}
            onBlur={blur("email")}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={describedBy("email")}
            className={cn(fieldClasses("email"), "mt-2 h-13")}
          />
          {fieldError("email")}
        </div>

        <div>
          <label htmlFor={fieldId("phone")} className="text-sm font-medium text-white">
            Phone <span aria-hidden className="text-white/50">*</span>
          </label>
          <input
            id={fieldId("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            maxLength={contactLimits.phone}
            placeholder="+91"
            value={fields.phone}
            onChange={update("phone")}
            onBlur={blur("phone")}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={describedBy("phone")}
            className={cn(fieldClasses("phone"), "mt-2 h-13")}
          />
          {fieldError("phone")}
        </div>

        <div>
          <label htmlFor={fieldId("company")} className="text-sm font-medium text-white">
            Company <span className="font-normal text-white/50">(optional)</span>
          </label>
          <input
            id={fieldId("company")}
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={contactLimits.company}
            value={fields.company}
            onChange={update("company")}
            onBlur={blur("company")}
            aria-invalid={errors.company ? true : undefined}
            aria-describedby={describedBy("company")}
            className={cn(fieldClasses("company"), "mt-2 h-13")}
          />
          {fieldError("company")}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={fieldId("service")} className="text-sm font-medium text-white">
            Service required <span aria-hidden className="text-white/50">*</span>
          </label>
          <div className="relative mt-2">
            <select
              id={fieldId("service")}
              name="service"
              required
              value={fields.service}
              onChange={update("service")}
              onBlur={blur("service")}
              aria-invalid={errors.service ? true : undefined}
              aria-describedby={describedBy("service")}
              className={cn(fieldClasses("service"), "h-13 appearance-none pr-12", !fields.service && "text-white/45")}
            >
              <option value="" disabled>
                Choose a service
              </option>
              {contactServiceOptions.map((option) => (
                <option key={option.value} value={option.value} className="bg-graphite text-white">
                  {option.label}
                </option>
              ))}
            </select>
            <svg aria-hidden viewBox="0 0 16 16" className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-white/60" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="m4 6 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {fieldError("service")}
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-baseline justify-between gap-4">
            <label htmlFor={fieldId("details")} className="text-sm font-medium text-white">
              Project details <span aria-hidden className="text-white/50">*</span>
            </label>
            <span id={`${id}-details-count`} className="text-xs text-white/50 tabular-nums">
              {fields.details.length} / {contactLimits.detailsMax}
            </span>
          </div>
          <textarea
            id={fieldId("details")}
            name="details"
            required
            rows={6}
            maxLength={contactLimits.detailsMax}
            placeholder="What do you need, and what does your business do today?"
            value={fields.details}
            onChange={update("details")}
            onBlur={blur("details")}
            aria-invalid={errors.details ? true : undefined}
            aria-describedby={describedBy("details", `${id}-details-count`)}
            className={cn(fieldClasses("details"), "mt-2 resize-y py-3.5 leading-relaxed")}
          />
          {fieldError("details")}
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-sm leading-relaxed text-white/55">
          Fields marked * are required. Your details are used only to respond to this enquiry. See the{" "}
          <Link href="/privacy-policy" className="text-white/80 underline underline-offset-2 hover:text-white">
            privacy policy
          </Link>
          .
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="group inline-flex h-13 shrink-0 items-center justify-center gap-2.5 rounded-full bg-white px-7 font-medium text-black transition-[background-color,transform] duration-300 ease-out-quart hover:bg-mist active:scale-[0.97] disabled:cursor-wait disabled:opacity-70"
        >
          {submitting ? (
            <>
              <LoaderCircle aria-hidden className="size-4 animate-spin" />
              Sending
            </>
          ) : (
            <>
              Send enquiry
              <ArrowRight aria-hidden strokeWidth={1.75} className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </>
          )}
        </button>
      </div>

      <div aria-live="assertive" className="mt-6 empty:hidden">
        {status.kind === "error" ? (
          <p role="alert" className="flex items-start gap-3 rounded-2xl bg-white p-4 text-sm leading-relaxed text-black">
            <CircleAlert aria-hidden strokeWidth={2} className="mt-0.5 size-4 shrink-0" />
            {status.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
