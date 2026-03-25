export interface SiteAction {
  label: string;
  href: string;
  note?: string;
}

export interface SiteDetail {
  label: string;
  value: string;
}

export interface SiteCtaConfig {
  kicker: string;
  heading: string;
  body: string;
  primary: SiteAction;
  secondary?: SiteAction;
  details?: SiteDetail[];
}

export interface HomeProofItem {
  label: string;
  title: string;
  body: string;
}

export interface ServicePathway {
  label: string;
  title: string;
  body: string;
  href: string;
  ctaLabel: string;
}

function createMailtoLink(subject: string, body: string) {
  const params = new URLSearchParams({ subject, body });
  return `mailto:hello@agentura.dev?${params.toString()}`;
}

export const siteLinks = {
  startHere: "/services#start-here",
  readinessAssessment: "/services#assess",
  tao: "/tao",
  blog: "/blog",
  conversation: createMailtoLink(
    "Agentura conversation",
    [
      "Hi Agentura,",
      "",
      "I would like to talk through a workflow we are considering.",
      "",
      "Organization:",
      "Current stage:",
      "Primary bottleneck:",
    ].join("\n"),
  ),
  assessmentInquiry: createMailtoLink(
    "Agentic Readiness Assessment",
    [
      "Hi Agentura,",
      "",
      "I would like to start with the Agentic Readiness Assessment.",
      "",
      "Organization:",
      "Current stage:",
      "Current workflow bottleneck:",
      "Timeline:",
    ].join("\n"),
  ),
  productInquiry: createMailtoLink(
    "Agent-ready product inquiry",
    [
      "Hi Agentura,",
      "",
      "We are interested in making our product more agent-ready.",
      "",
      "Company:",
      "Product:",
      "Key agent-facing workflow:",
      "Current constraint:",
    ].join("\n"),
  ),
  smallBusinessInquiry: createMailtoLink(
    "Small business workflow inquiry",
    [
      "Hi Agentura,",
      "",
      "I would like to discuss workflow agents for our business.",
      "",
      "Business:",
      "Team size:",
      "Workflow eating the most time:",
    ].join("\n"),
  ),
};

export const homeProofItems: HomeProofItem[] = [
  {
    label: "Start",
    title: "One clear first step",
    body: "Every engagement can begin with a one-week readiness assessment instead of a vague discovery loop.",
  },
  {
    label: "Leave behind",
    title: "Artifacts you own",
    body: "Specifications, tool contracts, governance notes, and documented knowledge remain useful after the engagement ends.",
  },
  {
    label: "Deploy",
    title: "Narrow before broad",
    body: "We pilot in constrained workflows first, then expand once the harness proves it can survive real work.",
  },
];

export const servicePathways: ServicePathway[] = [
  {
    label: "Start here",
    title: "We are still figuring out where agents should matter",
    body: "Use the readiness assessment to identify the workflows, knowledge gaps, and governance constraints worth tackling first.",
    href: "#assess",
    ctaLabel: "See the assessment",
  },
  {
    label: "Track I",
    title: "We are building agentic systems inside an organization",
    body: "Move from tacit knowledge and tool sprawl toward a reusable harness, ambient agents, and evaluation loops.",
    href: "#t1",
    ctaLabel: "Explore Track I",
  },
  {
    label: "Track II",
    title: "We are a product team making software agent-ready",
    body: "Design APIs, docs, and error surfaces so your customers' agents can use your product reliably.",
    href: "#t2",
    ctaLabel: "Explore Track II",
  },
  {
    label: "Track III",
    title: "We run a small business and need leverage now",
    body: "Package repeatable workflow agents around administrative drag, knowledge capture, and operational follow-through.",
    href: "#t3",
    ctaLabel: "Explore Track III",
  },
];

export const routeCtas: Record<string, SiteCtaConfig> = {
  home: {
    kicker: "Start with a real workflow",
    heading: "Ask for the readiness assessment, not a vague AI brainstorm.",
    body: "We look at the work, the knowledge it depends on, and the constraints that matter before recommending what to build.",
    primary: {
      label: "Request the assessment",
      href: siteLinks.assessmentInquiry,
      note: "Structured email with the right prompts",
    },
    secondary: {
      label: "Review the service paths",
      href: siteLinks.startHere,
      note: "See where each engagement begins",
    },
    details: [
      { label: "Duration", value: "1 week" },
      { label: "Output", value: "Scorecard, flow map, and next-step roadmap" },
      { label: "Best for", value: "Teams still separating signal from hype" },
    ],
  },
  services: {
    kicker: "Need a clear starting point?",
    heading: "The readiness assessment exists for exactly that moment.",
    body: "If the tracks feel promising but you are not sure which path fits, start with the smallest high-signal engagement.",
    primary: {
      label: "Request the assessment",
      href: siteLinks.assessmentInquiry,
      note: "Tell us the workflow you want to pressure-test",
    },
    secondary: {
      label: "Start a general conversation",
      href: siteLinks.conversation,
      note: "For teams already further along",
    },
    details: [
      { label: "Focus", value: "Intent, workflow leverage, and governance readiness" },
      { label: "Who joins", value: "A few operators plus the decision-maker" },
      { label: "Leaves behind", value: "A prioritized path instead of a pile of options" },
    ],
  },
  tao: {
    kicker: "If the worldview resonates",
    heading: "See how those principles translate into an engagement path.",
    body: "The Tao explains the posture. The services page shows what that posture looks like when it touches real teams, tools, and decisions.",
    primary: {
      label: "Review the service paths",
      href: siteLinks.startHere,
      note: "Commercial path, summarized first",
    },
    secondary: {
      label: "Start a conversation",
      href: siteLinks.conversation,
      note: "Bring a workflow, not a slogan",
    },
  },
  blog: {
    kicker: "Reading is the long way around",
    heading: "If you already know the bottleneck, skip straight to the service paths.",
    body: "The essays explain the worldview. The services page shows how we scope work when the goal is to ship dependable leverage.",
    primary: {
      label: "Review the service paths",
      href: siteLinks.startHere,
      note: "Decision-first overview",
    },
    secondary: {
      label: "Start a conversation",
      href: siteLinks.conversation,
      note: "Tell us the workflow you are trying to change",
    },
  },
  article: {
    kicker: "Want the applied version?",
    heading: "Move from theory to the engagement path.",
    body: "If the argument in this essay feels familiar, the next useful move is usually to pressure-test the workflow itself.",
    primary: {
      label: "Request the assessment",
      href: siteLinks.assessmentInquiry,
      note: "Best for teams still defining the first narrow deployment",
    },
    secondary: {
      label: "Review the service paths",
      href: siteLinks.startHere,
      note: "See the tracks and likely fit",
    },
  },
};
