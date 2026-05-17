export const siteConfig = {
  name: "Abiansh",
  fullName: "Abiansh Innovative Solutions Pvt Ltd.",
  tagline: "Practical Software for Real Business Problems",
  email: "hello@abiansh.com",
  address: {
    line1: "Flat 101, Loger Saraswati Gallery",
    line2: "Raghunathpur, Bhubaneswar",
    line3: "Odisha 751024, India",
    short: "Bhubaneswar, Odisha, India",
  },
  linkedin: "linkedin.com/company/abiansh",
  url: "app.abiansh.io",
} as const;

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Process", href: "#process" },
  { label: "Founders", href: "#founders" },
  { label: "Career School", href: "/career-school" },
] as const;

export const stats = [
  { value: 12, label: "Industries served" },
  { value: 40, label: "Modules delivered" },
  { value: 100, suffix: "%", label: "Built in-house" },
] as const;

export const services = [
  {
    icon: "UsersRound" as const,
    title: "CRM Systems",
    description:
      "Pipelines, contacts, follow-ups, and reporting tailored to your sales motion.",
    colorClass: "bg-blue-700/10 dark:bg-blue-700/20 text-blue-700 dark:text-sky-400",
    hoverClass: "group-hover:bg-blue-700 group-hover:text-white",
  },
  {
    icon: "Boxes" as const,
    title: "Inventory Management",
    description:
      "Stock, SKUs, suppliers, and warehouse moves in one accurate place.",
    colorClass: "bg-sky-500/10 dark:bg-sky-500/20 text-sky-500",
    hoverClass: "group-hover:bg-sky-500 group-hover:text-white",
  },
  {
    icon: "Workflow" as const,
    title: "Workflow Automation",
    description:
      "Replace manual handoffs with rules, approvals, and audit-ready trails.",
    colorClass: "bg-slate-900/10 dark:bg-white/10 text-slate-900 dark:text-white",
    hoverClass:
      "group-hover:bg-slate-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-slate-900",
  },
  {
    icon: "LineChart" as const,
    title: "Reporting Dashboards",
    description:
      "Live KPIs your team actually opens — not a quarterly PDF.",
    colorClass: "bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
    hoverClass: "group-hover:bg-emerald-600 group-hover:text-white",
  },
  {
    icon: "DoorOpen" as const,
    title: "Customer Portals",
    description:
      "A self-serve home for clients — orders, invoices, tickets, and docs.",
    colorClass: "bg-blue-700/10 dark:bg-blue-700/20 text-blue-700 dark:text-sky-400",
    hoverClass: "group-hover:bg-blue-700 group-hover:text-white",
  },
  {
    icon: "CalendarClock" as const,
    title: "Appointment Booking",
    description:
      "Calendar logic, reminders, rescheduling — wired to your team's hours.",
    colorClass: "bg-sky-500/10 dark:bg-sky-500/20 text-sky-500",
    hoverClass: "group-hover:bg-sky-500 group-hover:text-white",
  },
  {
    icon: "FileText" as const,
    title: "Quotation Systems",
    description:
      "Price books, approvals, and proposal-to-PO in one tracked flow.",
    colorClass: "bg-slate-900/10 dark:bg-white/10 text-slate-900 dark:text-white",
    hoverClass:
      "group-hover:bg-slate-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-slate-900",
  },
  {
    icon: "ShieldCheck" as const,
    title: "Admin Panels",
    description:
      "Role-based control, audit logs, and a UI your ops team won't curse at.",
    colorClass: "bg-rose-100 dark:bg-rose-500/15 text-rose-600 dark:text-rose-400",
    hoverClass: "group-hover:bg-rose-600 group-hover:text-white",
  },
] as const;

export type IndustryKey =
  | "consulting"
  | "it"
  | "retail"
  | "trading"
  | "ecommerce";

export interface IndustryData {
  label: string;
  icon: string;
  problems: string[];
  solutions: string[];
}

export const industries: Record<IndustryKey, IndustryData> = {
  consulting: {
    label: "Consulting",
    icon: "Briefcase",
    problems: [
      "Manual client onboarding",
      "Proposal tracking in spreadsheets",
      "Interview scheduling",
      "Missed follow-ups",
    ],
    solutions: [
      "Client portal",
      "Proposal management system",
      "Scheduling system",
      "Automated reminders",
    ],
  },
  it: {
    label: "IT Solutions",
    icon: "Cpu",
    problems: [
      "Requirement tracking",
      "Resource allocation",
      "Bug reporting",
      "Timesheet management",
    ],
    solutions: [
      "Project dashboard",
      "Ticketing system",
      "Resource planner",
      "Analytics reports",
    ],
  },
  retail: {
    label: "Retail",
    icon: "ShoppingBag",
    problems: [
      "Stock mismatch",
      "Slow billing",
      "Supplier coordination",
      "Lack of sales analysis",
    ],
    solutions: [
      "Inventory management platform",
      "POS integration",
      "Supplier module",
      "Sales dashboard",
    ],
  },
  trading: {
    label: "Trading",
    icon: "TrendingUp",
    problems: [
      "Price fluctuation tracking",
      "Purchase order delays",
      "Shipment monitoring",
      "Margin analysis",
    ],
    solutions: [
      "Pricing engine",
      "Order tracking system",
      "Shipment dashboard",
      "Profitability reports",
    ],
  },
  ecommerce: {
    label: "E-Commerce",
    icon: "ShoppingCart",
    problems: [
      "Order tracking across channels",
      "Cart abandonment",
      "Customer support overload",
      "Return processing delays",
    ],
    solutions: [
      "Unified order dashboard",
      "Automated notifications",
      "Support portal",
      "Returns workflow system",
    ],
  },
};

export const industryKeys: IndustryKey[] = [
  "consulting",
  "it",
  "retail",
  "trading",
  "ecommerce",
];

export const processSteps = [
  {
    number: "01",
    title: "Understand the workflow",
    description:
      "We sit with your team and map how work actually moves today.",
    borderColor: "border-blue-700",
    textColor: "text-blue-700",
  },
  {
    number: "02",
    title: "Identify bottlenecks",
    description:
      "Pinpoint the repetitive tasks and friction points worth automating.",
    borderColor: "border-blue-700",
    textColor: "text-blue-700",
  },
  {
    number: "03",
    title: "Design wireframes",
    description:
      "Clickable mockups before we write a line of production code.",
    borderColor: "border-sky-500",
    textColor: "text-sky-500",
  },
  {
    number: "04",
    title: "Build the application",
    description:
      "Modular, type-safe code, shipped in tight weekly iterations.",
    borderColor: "border-sky-500",
    textColor: "text-sky-500",
  },
  {
    number: "05",
    title: "Test with real scenarios",
    description:
      "Your data, your edge cases, your users — before launch day.",
    borderColor: "border-slate-900 dark:border-white",
    textColor: "text-slate-900 dark:text-white",
  },
  {
    number: "06",
    title: "Deploy and support",
    description:
      "Production-ready handover with ongoing maintenance options.",
    borderColor: "border-slate-900 dark:border-white",
    textColor: "text-slate-900 dark:text-white",
  },
] as const;

export const whyUsItems = [
  {
    icon: "MessageSquareText",
    title: "Direct line to technical founders",
    description: "Decisions get made on the call, not after three emails.",
  },
  {
    icon: "Target",
    title: "Focus on specific issues",
    description: "We solve the problem in front of us, not sell a platform.",
  },
  {
    icon: "Puzzle",
    title: "Modular architecture",
    description: "Swap modules in and out as your business changes.",
  },
  {
    icon: "TrendingUp",
    title: "Scalable, maintainable code",
    description: "TypeScript, tests, and documentation — not a black box.",
  },
  {
    icon: "Eye",
    title: "Transparent delivery",
    description:
      "Weekly demos, a public roadmap, and visibility into every commit.",
    span: true,
  },
] as const;

export const industryStrip = [
  "Consulting",
  "IT Solutions",
  "Retail",
  "Trading",
  "E-Commerce",
] as const;

export const founderCards = [
  {
    initial: "A",
    gradient: "from-blue-700 to-sky-500",
    title: "Founding Partner",
    subtitle: "Software Engineering · KIIT",
    description:
      "Specializes in distributed systems, API design, and the architecture decisions that keep applications fast a year after launch.",
  },
  {
    initial: "B",
    gradient: "from-slate-900 to-blue-700",
    title: "Founding Partner",
    subtitle: "Analytics · KIIT",
    description:
      "Translates messy operational data into dashboards executives actually use. Background in industry consulting across retail and trading.",
  },
] as const;

export const founderStats = [
  { value: "15+", label: "Years combined" },
  { value: "KIIT", label: "University" },
  { value: "B2B", label: "SaaS focus" },
] as const;

export const founderTags = [
  "Software Engineering",
  "Analytics",
  "Industry Consulting",
  "Enterprise Systems",
] as const;
