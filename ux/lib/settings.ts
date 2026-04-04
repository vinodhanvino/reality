export const site = {
  name: "Spirix",
  tagline: "Bar inventory and liquor variance analytics",
} as const;

export const founders = [
  { name: "Vinod S", role: "Founder & CEO", image: "/founders/vinod-s.png" },
] as const;

/** Visual tokens — referenced from layout (CSS variables) and components. */
export const theme = {
  primary: "#6e62e8",
  accent: "#c9a962",
  accentMuted: "rgba(201, 169, 98, 0.14)",
  background: "#050506",
  surface: "#0c0c10",
  surfaceElevated: "#12121a",
  foreground: "#f4f4f5",
  muted: "#8e8e9a",
  border: "rgba(255,255,255,0.07)",
  glowPrimary: "rgba(110, 98, 232, 0.22)",
  glowAccent: "rgba(201, 169, 98, 0.12)",
  pageTransitionMs: 340,
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/product", label: "Product" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/features", label: "Features" },
  { href: "/analytics", label: "Analytics" },
  { href: "/book-demo", label: "Book Demo" },
] as const;

export const hero = {
  headlineLead: "Stop liquor leakage",
  headlineAccent: "in your bar",
  subheadline:
    "Spirix detects variance between sales, purchases, and physical inventory in real time—so you close the gap between the register and the bottle.",
  ctaPrimary: "Book Demo",
  ctaSecondary: "See How It Works",
  eyebrow: "Variance intelligence for hospitality",
} as const;

export const problemPoints = [
  "Liquor theft",
  "Inventory mismatch",
  "Manual stock errors",
  "Revenue leakage",
  "Perks of Friendship",
  "Missed out Bills",
  "Non Chargeable NC",
  "Breakage & spoilage",
] as const;

export const solutionCopy =
  "Spirix automatically analyzes sales reports, purchase records, and physical counts to detect variance.";

/** How it works: root flow from inventory to variance */
export const howItWorks = {
  title: "How it works",
  subtitle: "From physical count to variance you can act on.",
  intro:
    "Inventory is captured in the app, uploaded, then combined with sales, purchases, and NC spoilage. Spirix compares that to what you actually have—so you get clear excess and shortage by category, as per sales and as per cost.",
  steps: [
    {
      id: "inventory",
      label: "Inventory (app)",
      description: "Count physical stock in the Spirix app—bottle-level for liquor, units for beverages.",
    },
    {
      id: "upload",
      label: "Upload",
      description: "Sync counts to the platform. Data is validated and matched to your product master.",
    },
    {
      id: "inputs",
      label: "Sales, purchase, NC spoilage",
      description:
        "System expects stock from: sales (out), purchases (in), and non-chargeable / spoilage (out). This is your “book” or expected inventory.",
    },
    {
      id: "variance",
      label: "Variance we can find",
      description:
        "Spirix compares expected vs physical. You see excess and shortage by category (e.g. Liquor, Beverages), as per sales value and as per cost—so you know where you’re over, short, and what it’s costing you.",
    },
  ] as const,
  outcomeNote:
    "Result: totals like Liquor excess/shortage, Beverages excess/shortage, and combined Liq. & Bev. totals—so you can track leakage and act.",
  cta: "Book a demo",
} as const;

export const features = [
  "Automatic liquor classification",
  "Bottle-level inventory tracking",
  "Variance detection engine",
  "Daily analytics dashboard",
  "POS integration",
] as const;

export const productPage = {
  title: "Product",
  subtitle: "How AI helps you control inventory and stop leakage.",
  intro:
    "Spirix connects your POS, purchases, and physical counts—then uses AI to explain variance, answer questions, and recommend actions.",
  aiContextLabel: "AI context",
  aiSections: [
    {
      title: "Ask in plain language",
      description:
        "No more digging through spreadsheets. Ask things like “Why was my vodka short last week?” or “Which venues have the highest shrinkage?” and get a clear answer with numbers and causes.",
    },
    {
      title: "Variance explained, not just reported",
      description:
        "AI links receiving errors, damage, expiry, theft, and counting gaps to your actual stock. You see why the system and physical count differ, not just that they do.",
    },
    {
      title: "Anomalies and recommendations",
      description:
        "Get alerts when a category or SKU drifts from normal, plus suggested next steps—e.g. recount, adjust process, or investigate—so you act instead of wonder.",
    },
    {
      title: "Breakdowns by venue, category, or time",
      description:
        "Slice by location, product type, or period in one place. Compare bars, see which categories leak most, and track trends over days or weeks.",
    },
    {
      title: "From data to decisions",
      description:
        "Spirix turns inventory data into clear insights and actions—so you spend time fixing issues, not finding them.",
    },
  ] as const,
  dashboardSectionLabel: "Interact",
  dashboard: {
    headline: "Interactive dashboard included",
    description:
      "An interactive dashboard is included with Spirix. Drill down by date, month, or year and use AI to explore your data in plain language.",
    points: [
      "Navigate by date, month, or year to see variance and trends over time",
      "Filter and compare periods with a few clicks",
      "Ask the AI questions about any period: “What drove shortage in March?” or “Compare this month to last”",
    ] as const,
  },
  cta: "Book a demo",
} as const;

export const mcpAI = {
  label: "AI-powered",
  headline: "Interact with your data. Get insights in plain language.",
  subheadline:
    "Ask questions about variance, stock levels, and trends. Spirix uses AI to turn your inventory data into actionable answers.",
  points: [
    "Ask in natural language: “Where did I lose the most last week?”",
    "Get instant breakdowns by category, venue, or time period",
    "Surface anomalies and recommendations without digging through reports",
  ] as const,
  cta: "Book a demo to try it",
} as const;

export const ctaSection = {
  headline: "See Spirix Detect Bar Loss in Minutes",
  button: "Book a Demo",
} as const;

/** WhatsApp Business number for wa.me (digits only: country code + number, no + or spaces). */
export const whatsapp = {
  number: "919019687131",
} as const;

export const footer = {
  leadershipLabel: "Leadership",
  founderBio:
    "Helping hospitality teams catch variance early—with data they can trust and act on.",
} as const;

export const bookDemo = {
  intro:
    "Submit the form and we’ll open WhatsApp so you can continue the conversation with our team.",
  formFields: [
    "name",
    "bar_name",
    "email",
    "phone",
    "city",
    "bar_size",
  ] as const,
} as const;
