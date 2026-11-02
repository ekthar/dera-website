export type NavItem = {
  label: string;
  href: string;
};

export type ServiceSlug =
  | "software-development"
  | "enterprise-erp"
  | "hardware"
  | "networking"
  | "business-automation"
  | "it-services";

export type ServiceVisualKind = "code" | "erp" | "hardware" | "network" | "automation" | "blueprint";

export type Service = {
  slug: ServiceSlug;
  number: string;
  title: string;
  summary: string;
  description: string;
  value: ReadonlyArray<string>;
  useCases: ReadonlyArray<string>;
  visual: ServiceVisualKind;
};
