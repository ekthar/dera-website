import { Blocks, CodeXml, HardDrive, Network, Workflow, Wrench, type LucideIcon } from "lucide-react";
import type { ServiceSlug } from "@/types";

export const serviceIcons: Record<ServiceSlug, LucideIcon> = {
  "software-development": CodeXml,
  "enterprise-erp": Blocks,
  hardware: HardDrive,
  networking: Network,
  "business-automation": Workflow,
  "it-services": Wrench,
};
