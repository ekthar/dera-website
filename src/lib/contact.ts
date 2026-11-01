import { contactServiceOptions } from "@/config/services";

export type ContactFields = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  details: string;
};

export type ContactField = keyof ContactFields;
export type ContactErrors = Partial<Record<ContactField, string>>;

export const contactLimits = {
  name: 100,
  email: 160,
  phone: 20,
  company: 120,
  detailsMin: 20,
  detailsMax: 4000,
} as const;

export const emptyContactFields: ContactFields = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  details: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^\+?[\d\s()-]{7,20}$/;
const validServices = new Set(contactServiceOptions.map((option) => option.value));

export function isValidService(value: string | null | undefined): value is string {
  return typeof value === "string" && validServices.has(value);
}

export function validateContactField(field: ContactField, raw: string): string | undefined {
  const value = raw.trim();
  switch (field) {
    case "name":
      if (!value) return "Please enter your name.";
      if (value.length < 2) return "Your name needs at least 2 characters.";
      if (value.length > contactLimits.name) return `Please keep your name under ${contactLimits.name} characters.`;
      return undefined;
    case "email":
      if (!value) return "Please enter your email address.";
      if (value.length > contactLimits.email || !EMAIL_PATTERN.test(value))
        return "Please enter a valid email address, like name@company.com.";
      return undefined;
    case "phone": {
      if (!value) return "Please enter a phone number so we can reach you.";
      const digits = value.replace(/\D/g, "");
      if (!PHONE_PATTERN.test(value) || digits.length < 7 || digits.length > 15)
        return "Please enter a valid phone number, for example +91 98765 43210.";
      return undefined;
    }
    case "company":
      if (value.length > contactLimits.company)
        return `Please keep the company name under ${contactLimits.company} characters.`;
      return undefined;
    case "service":
      if (!value) return "Please choose the service you need.";
      if (!validServices.has(value)) return "Please choose a service from the list.";
      return undefined;
    case "details":
      if (!value) return "Please tell us a little about your requirement.";
      if (value.length < contactLimits.detailsMin)
        return `Please add a little more detail (at least ${contactLimits.detailsMin} characters).`;
      if (value.length > contactLimits.detailsMax)
        return `Please keep the details under ${contactLimits.detailsMax} characters.`;
      return undefined;
  }
}

export function validateContact(fields: ContactFields): ContactErrors {
  const errors: ContactErrors = {};
  (Object.keys(fields) as ContactField[]).forEach((field) => {
    const message = validateContactField(field, fields[field]);
    if (message) errors[field] = message;
  });
  return errors;
}

/** Reads untrusted JSON into typed fields. Unknown keys are ignored. */
export function parseContactPayload(input: unknown): ContactFields | null {
  if (typeof input !== "object" || input === null) return null;
  const record = input as Record<string, unknown>;
  const read = (key: ContactField) => (typeof record[key] === "string" ? (record[key] as string) : "");
  return {
    name: read("name").trim(),
    email: read("email").trim(),
    phone: read("phone").trim(),
    company: read("company").trim(),
    service: read("service").trim(),
    details: read("details").trim(),
  };
}

export function serviceLabel(value: string): string {
  return contactServiceOptions.find((option) => option.value === value)?.label ?? value;
}

export type ContactApiResponse =
  | { ok: true }
  | { ok: false; reason: "not-configured" | "invalid" | "rate-limited" | "failed"; errors?: ContactErrors };
