import type { Service } from "@/types";

export const services: ReadonlyArray<Service> = [
  {
    slug: "software-development",
    number: "01",
    title: "Software Development",
    summary: "Purpose-built digital solutions engineered around real business requirements.",
    description:
      "Custom software designed around the way a business actually works. We start from the process, the people who use it and the data it depends on, then build web and desktop applications that fit those needs instead of forcing a business into a generic product.",
    value: [
      "Software shaped around existing workflows rather than replacing them blindly",
      "Clear scope, regular progress reviews and maintainable code",
      "Room to extend the system as requirements change",
    ],
    useCases: [
      "Internal business tools and dashboards",
      "Web applications and customer-facing portals",
      "Desktop and point-of-sale style applications",
      "Integrations between existing software systems",
    ],
    visual: "code",
  },
  {
    slug: "enterprise-erp",
    number: "02",
    title: "Enterprise & ERP Solutions",
    summary:
      "Connected systems that bring business operations, information and workflows together.",
    description:
      "Enterprise systems work best when information flows between departments without retyping. We help businesses plan and implement connected systems for operations, records and reporting, and we are building our own ERP platform, N1 ERP.",
    value: [
      "One place for operational information instead of scattered spreadsheets",
      "Workflows planned around how teams hand work to each other",
      "A path from current tools to a more connected setup",
    ],
    useCases: [
      "Planning an ERP or business management system",
      "Consolidating records across sales, stock and accounts",
      "Reporting and visibility for owners and managers",
      "Enquiries about N1 ERP, our platform in development",
    ],
    visual: "erp",
  },
  {
    slug: "hardware",
    number: "03",
    title: "Hardware & Technology",
    summary: "Hardware sourcing, supply and technology solutions for modern business environments.",
    description:
      "Computer hardware and IT equipment supplied for offices, shops and growing teams. We help match equipment to the work it needs to do, then supply it through our wholesale and retail operations.",
    value: [
      "Equipment chosen for the actual workload and budget",
      "One supplier for computers, peripherals and IT accessories",
      "Hardware planned alongside the software that runs on it",
    ],
    useCases: [
      "Desktops, laptops and peripherals for offices",
      "Billing counters and retail technology setups",
      "Replacement and upgrade of ageing equipment",
      "Wholesale and retail hardware supply",
    ],
    visual: "hardware",
  },
  {
    slug: "networking",
    number: "04",
    title: "Networking & Infrastructure",
    summary: "Reliable networking and IT infrastructure designed to keep systems connected.",
    description:
      "Networks are the quiet layer every system depends on. We plan, install and organise wired and wireless networks and the IT infrastructure around them, so devices, software and people stay connected.",
    value: [
      "Structured, documented network layouts that are easier to maintain",
      "Wired and wireless coverage planned around the space",
      "Infrastructure that supports the systems running on it",
    ],
    useCases: [
      "New office or shop network installation",
      "Structured cabling and network organisation",
      "Wi-Fi coverage planning and setup",
      "Network troubleshooting and reorganisation",
    ],
    visual: "network",
  },
  {
    slug: "business-automation",
    number: "05",
    title: "Business Automation",
    summary: "Smarter workflows, streamlined operations and technology-driven efficiency.",
    description:
      "Many everyday business tasks follow the same steps every time. We look for repetitive, manual work and design automated workflows that reduce retyping, handoffs and avoidable errors.",
    value: [
      "Less time spent on repetitive data entry",
      "Consistent processes that follow the same rules every time",
      "Better use of the software a business already owns",
    ],
    useCases: [
      "Automating reports and recurring documents",
      "Connecting forms, records and notifications",
      "Reducing manual steps between departments",
      "Digitising paper-based processes",
    ],
    visual: "automation",
  },
  {
    slug: "it-services",
    number: "06",
    title: "IT & Technical Services",
    summary: "Practical technical support and technology services for businesses.",
    description:
      "Technology needs looking after. We provide practical technical services: setting up systems, resolving issues, installing software and keeping equipment in working order, delivered with clear communication.",
    value: [
      "A single point of contact for day-to-day technology issues",
      "Practical fixes explained in plain language",
      "Support that understands both hardware and software",
    ],
    useCases: [
      "System setup and software installation",
      "Troubleshooting hardware and software problems",
      "Maintenance of computers and peripherals",
      "Technology installation projects",
    ],
    visual: "blueprint",
  },
];

export const contactServiceOptions: ReadonlyArray<{ value: string; label: string }> = [
  ...services.map((service) => ({ value: service.slug, label: service.title })),
  { value: "n1-erp", label: "N1 ERP product enquiry" },
  { value: "supply", label: "Wholesale or retail supply" },
  { value: "other", label: "Something else" },
];

/** Areas of business, as listed by the business. */
export const businessActivities: ReadonlyArray<string> = [
  "Software Development",
  "Enterprise Software Solutions",
  "ERP Development",
  "Hardware Sales and Supply",
  "Computer Hardware and IT Infrastructure",
  "Network Infrastructure and Networking Solutions",
  "Technology Consulting",
  "Business Automation",
  "Wholesale and Retail Operations",
  "IT Support and Technical Services",
];
