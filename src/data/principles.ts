export interface Principle {
  number: number;
  title: string;
  body: string;
  section: 'intent' | 'method' | 'culture';
}

export const principles: Principle[] = [
  // ── INTENT ──
  {
    number: 1,
    title: 'Start from Intent, Not Features',
    body: 'We begin every project by clarifying intent: what outcome must change in the real world. If intent is fuzzy, we don\'t design, we don\'t scope, and we don\'t build.',
    section: 'intent',
  },
  {
    number: 2,
    title: 'Agents Over Apps',
    body: 'We don\'t build apps that humans click through; we build agents that do the work. Where others add "AI features," we redesign the workflow so agents can own the connective tissue.',
    section: 'intent',
  },
  {
    number: 3,
    title: 'The Agentic Layer Is the Product',
    body: 'The core asset is not any single use case, but the agentic layer: prompts, tools, policies, orchestration, and evaluation. Every improvement to this layer must compound across clients and use cases.',
    section: 'intent',
  },
  {
    number: 4,
    title: 'Always Bet on the Models',
    body: 'We design architecture, tools, and UX for the models our clients will have in six to eighteen months, not just the ones they have today. When in doubt between hard-coding a brittle flow and giving the model more agency with a stronger harness, we choose agency plus harness.',
    section: 'intent',
  },
  {
    number: 5,
    title: 'Harness Matters as Much as Model',
    body: 'Raw model capability is table stakes. The differentiator is the harness around it: clear goals, tools that match human intent, context graphs, guardrails, and evaluation loops that keep systems aligned with reality.',
    section: 'intent',
  },

  // ── METHOD ──
  {
    number: 6,
    title: 'Specification Before Automation',
    body: 'We surface tacit knowledge before we generate automation. Specifications, examples, and decision frameworks come first; code, prompts, and tools follow.',
    section: 'method',
  },
  {
    number: 7,
    title: 'Human-Centric, Agent-Legible',
    body: 'We write everything so that humans can understand it and agents can execute it. Workflows, data, and configuration must be simultaneously humane for stakeholders and machine-legible for agents.',
    section: 'method',
  },
  {
    number: 8,
    title: 'Relationship Over Demo',
    body: 'We optimize for enduring human\u2013agent relationships, not impressive one-off demos. Trust, predictability, and incremental autonomy matter more than spectacle.',
    section: 'method',
  },
  {
    number: 9,
    title: 'Speed First, Then Rigor',
    body: 'We move fast to find truth: tight loops of prototype, deploy, observe, adjust. Once value is proven, we slow down to harden: observability, safety, governance, and change management.',
    section: 'method',
  },
  {
    number: 10,
    title: 'Default to Automation of Connective Tissue',
    body: 'The first targets for agents are the glue tasks: coordination, translation, enrichment, monitoring, and reporting. We protect human bandwidth for judgment, creativity, and relationships.',
    section: 'method',
  },

  // ── CULTURE ──
  {
    number: 11,
    title: 'Autonomy with Explicit Guardrails',
    body: 'Agents must know what they exist to do, and what they are never allowed to do. We design for proactive behavior inside clearly articulated goals, KPIs, and red lines.',
    section: 'culture',
  },
  {
    number: 12,
    title: 'Organizational Intelligence as First-Class Asset',
    body: 'We treat a client\'s institutional knowledge\u2014processes, heuristics, edge cases\u2014as an asset to be extracted, structured, and protected. Our work should leave them with more explicit, teachable intelligence than they had when we arrived.',
    section: 'culture',
  },
  {
    number: 13,
    title: 'Truth via Transparency',
    body: 'We make reasoning, assumptions, and limitations visible to clients and users. No magic, no black boxes: inspectable traces, explainable policies, and honest performance characterization.',
    section: 'culture',
  },
  {
    number: 14,
    title: 'Packaging Is the Wedge',
    body: 'Our edge is not "the smartest agent," but the way we package agentic capability into safe, contextual, industry-specific systems. We design for fit with real organizations: incentives, compliance, UX, and change management.',
    section: 'culture',
  },
  {
    number: 15,
    title: 'Continuous Rewrite Culture',
    body: 'We assume our first version is a hypothesis, not an asset to defend. We willingly rewrite prompts, tools, and architectures when a cleaner, more agent-native design appears.',
    section: 'culture',
  },
];

/** The 6 curated principles for the homepage teaser */
export const homepagePrinciples = [1, 3, 5, 8, 10, 13].map(
  (n) => principles.find((p) => p.number === n)!
);

export const sectionLabels: Record<Principle['section'], string> = {
  intent: 'What We Believe',
  method: 'How We Work',
  culture: 'How We Grow',
};
