export interface Service {
  number: string;
  name: string;
  tagline: string;
  track: 'entry' | 'I' | 'II' | 'III';
  situation: string;
  whatWeDo: string[];
  deliverables: { marker: string; text: string }[];
  details: { label: string; value: string }[];
  taoRef?: { quote: string; principle: number };
  connector?: string;
}

export const tracks = {
  entry: {
    label: 'Entry Point',
    title: 'Where Every Engagement Begins',
    description: 'A clear-eyed diagnostic before you commit to anything.',
  },
  I: {
    label: 'Track I',
    title: 'For Organizations Building Agentic Systems',
    description:
      'Five services that take you from tacit knowledge to self-improving agents in production. Each produces artifacts the next one consumes.',
  },
  II: {
    label: 'Track II',
    title: 'For SaaS Products Going Agent-Ready',
    description:
      "Your customers' agents are about to become your most important users. Is your product ready for them?",
  },
  III: {
    label: 'Track III \u2014 Applied Lab',
    title: 'For Small Businesses',
    description:
      "Where our patterns are born. We deploy production agents in real businesses \u2014 and every engagement teaches us something that compounds into our enterprise practice.",
  },
};

export const services: Service[] = [
  // ── ENTRY POINT ──
  {
    number: '00',
    name: 'Agentic Readiness Assessment',
    tagline: 'A clear-eyed diagnostic before you commit to anything.',
    track: 'entry',
    situation:
      'You know agents are going to change how your organization works. You may have already experimented \u2014 a chatbot here, a copilot there, maybe a prototype that impressed in a demo but never reached production. What you don\u2019t have is a map: where should agents create value, what infrastructure is missing, and what should you build first?',
    whatWeDo: [
      'We spend one week inside your organization. We observe workflows, interview the people who know how things actually work, and audit your existing tools, data, and infrastructure. We classify every process against a framework we call the Determinism Spectrum \u2014 where on the range between "hardcode this" and "give the agent full autonomy" each workflow belongs.',
      'We also apply our Flow Zone governance model, mapping your operations into four autonomy tiers: full agent autonomy with logging, autonomous with periodic checkpoints, human approval required, and human-only with agent advisory support.',
    ],
    deliverables: [
      { marker: 'Artifact', text: 'Agentic Readiness Scorecard \u2014 five dimensions: knowledge explicitness, workflow determinism, tool maturity, governance readiness, organizational adaptability' },
      { marker: 'Artifact', text: 'Flow Zone Map \u2014 every major process classified by autonomy tier with rationale' },
      { marker: 'Artifact', text: 'Priority Roadmap \u2014 the three highest-leverage opportunities, sequenced' },
      { marker: 'Session', text: 'Executive briefing \u2014 a 90-minute walkthrough of findings and recommended next steps' },
    ],
    details: [
      { label: 'Duration', value: '1 week' },
      { label: 'Best for', value: 'Organizations exploring agentic AI, stuck after initial experiments, or beginning a strategic initiative' },
      { label: 'Team involvement', value: '3\u20135 interviews with key operators plus access to existing documentation' },
    ],
    taoRef: {
      quote: 'We begin every project by clarifying intent: what outcome must change in the real world. If intent is fuzzy, we don\u2019t design, we don\u2019t scope, and we don\u2019t build.',
      principle: 1,
    },
  },

  // ── TRACK I ──
  {
    number: '01',
    name: 'Intent Mapping & Knowledge Extraction',
    tagline: 'We surface what you know before we automate what you do.',
    track: 'I',
    situation:
      'Your organization runs on knowledge that lives in people\u2019s heads \u2014 the operations manager who knows which vendors are reliable, the compliance officer who knows the edge cases the policy manual missed, the sales engineer who knows which objections are real. This knowledge is your most valuable asset and your biggest bottleneck. Until it\u2019s explicit, no agent can use it.',
    whatWeDo: [
      'We spend 2\u20134 weeks inside your organization conducting structured knowledge extraction sessions with the people who know how things actually work. We don\u2019t just document processes \u2014 we extract the decision heuristics, the edge cases, the judgment calls that make the difference between a process that works on paper and one that works in reality.',
      'We translate everything into a knowledge architecture: structured specifications that are simultaneously human-readable and agent-legible. Decision frameworks become Given-When-Then scenarios. Heuristics become classification rules. Tribal knowledge becomes searchable, versioned, institutional intelligence.',
    ],
    deliverables: [
      { marker: 'Artifact', text: 'Knowledge Architecture \u2014 structured specifications, decision frameworks, and heuristics codified in both human-readable and agent-legible formats' },
      { marker: 'Artifact', text: 'Workflow Decomposition \u2014 every process mapped on the Determinism Spectrum with recommended autonomy levels' },
      { marker: 'Artifact', text: 'Specification Layer \u2014 Given-When-Then acceptance criteria for every automated workflow' },
      { marker: 'Artifact', text: 'Institutional Knowledge Base \u2014 versioned documentation that serves onboarding, training, and agent development' },
    ],
    details: [
      { label: 'Duration', value: '2\u20134 weeks' },
      { label: 'Best for', value: 'Organizations where critical knowledge lives in people\u2019s heads and processes depend on judgment that hasn\u2019t been articulated' },
      { label: 'Trigger moment', value: 'You tried to build an agent and it failed because it didn\u2019t know what your team knows tacitly' },
    ],
    taoRef: {
      quote: 'We surface tacit knowledge before we generate automation. Specifications, examples, and decision frameworks come first; code, prompts, and tools follow.',
      principle: 6,
    },
    connector: 'The Knowledge Architecture and Specification Layer become the foundation for Tool Architecture & Governance \u2014 where tools and harness are designed against the intent you\u2019ve now made explicit.',
  },
  {
    number: '02',
    name: 'Tool Architecture & Governance',
    tagline: 'We design the tools agents actually need \u2014 not the APIs you already have.',
    track: 'I',
    situation:
      'Your team wrapped existing APIs in natural language descriptions and called them "agent tools." The demo worked. Production didn\u2019t. Agents hallucinate file paths, call the wrong endpoints, and produce outputs that look plausible but miss what your users actually need. The gap between what an API does and what an agent needs is where all the engineering effort belongs.',
    whatWeDo: [
      'We audit your existing tool surface \u2014 every API, CLI, MCP server, and integration your agents touch \u2014 and evaluate each one against our Three-Layer Tool Architecture.',
      'The service layer contains your low-level system tools. The workflow layer sits above \u2014 your business logic. The domain layer is agent-specific: intention-shaped tools that encode what the agent is trying to accomplish. Instead of get_crm_records, your agent gets prepare_customer_meeting.',
    ],
    deliverables: [
      { marker: 'Audit', text: 'Tool Surface Assessment \u2014 every existing tool scored for agent-friendliness' },
      { marker: 'Design', text: 'Three-Layer Tool Catalog \u2014 service, workflow, and domain tools mapped with contracts and examples' },
      { marker: 'Artifact', text: 'Intention-Based Tool Specs \u2014 redesigned tool interfaces shaped around what agents are trying to accomplish' },
      { marker: 'System', text: 'Tool Governance Framework \u2014 registry, naming conventions, versioning, and change management' },
    ],
    details: [
      { label: 'Duration', value: '3\u20136 weeks' },
      { label: 'Best for', value: 'Engineering teams whose agents are unreliable and suspect the tools \u2014 not the model \u2014 are the problem' },
      { label: 'Trigger moment', value: '\u201CWe wrapped our APIs in MCP and it still doesn\u2019t work\u201D' },
    ],
    taoRef: {
      quote: 'Raw model capability is table stakes. The differentiator is the harness around it: clear goals, tools that match human intent, context graphs, guardrails, and evaluation loops that keep systems aligned with reality.',
      principle: 5,
    },
    connector: 'The Tool Catalog and Intention Specs become the contracts that Agentic Platform Architecture builds against.',
  },
  {
    number: '03',
    name: 'Agentic Platform Architecture',
    tagline: 'From one chatbot to a coherent agentic layer \u2014 the blueprint for everything.',
    track: 'I',
    situation:
      'You built one agent and it worked. Now everyone wants agents. But there\u2019s no coherent platform \u2014 each team is building independently, using different patterns, with no shared infrastructure for memory, orchestration, evaluation, or governance. You need an architecture, not more prototypes.',
    whatWeDo: [
      'We design the complete harness \u2014 the environment, tools, constraints, memory systems, skills, and evaluation infrastructure that sit between the LLM and your business processes.',
      'The architecture includes context engineering: how context flows through the system \u2014 what lives in system prompts, what\u2019s in the structured knowledge base, what\u2019s retrieved via tools, and what agents build themselves through progressive disclosure.',
    ],
    deliverables: [
      { marker: 'Blueprint', text: 'Harness Architecture \u2014 complete technical design for orchestration, sub-agents, memory, context flow, and skill system' },
      { marker: 'Blueprint', text: 'Governance Model \u2014 safe trajectory spaces, steward agent design, service integrity agreements' },
      { marker: 'Artifact', text: 'Context Architecture \u2014 what goes where: system prompts, knowledge base structure, tool-retrieved context' },
      { marker: 'Ref impl', text: 'Reference Implementation \u2014 a working proof of the architecture for your team to extend' },
    ],
    details: [
      { label: 'Duration', value: '6\u201312 weeks' },
      { label: 'Best for', value: 'CTOs who built one successful agent and need a platform that scales to many' },
      { label: 'Trigger moment', value: 'Three teams building agents independently, no shared patterns, growing tech debt' },
    ],
    taoRef: {
      quote: 'The core asset is not any single use case, but the agentic layer: prompts, tools, policies, orchestration, and evaluation. Every improvement to this layer must compound across clients and use cases.',
      principle: 3,
    },
    connector: 'With a platform in place, Ambient Agent Design extends it into event-driven agents \u2014 and Observability & Evaluation keeps the whole system aligned with reality.',
  },
  {
    number: '04',
    name: 'Ambient Agent Design',
    tagline: 'Agents that don\u2019t wait to be asked.',
    track: 'I',
    situation:
      'Your agents respond when prompted. But the real leverage is in agents that act before anyone asks \u2014 monitoring event streams, detecting anomalies, maintaining knowledge, spawning investigations when they find something worth pursuing. The transition from request-driven to change-driven systems is where agents become genuinely transformative.',
    whatWeDo: [
      'We identify the key events in your ecosystem and design agents that trigger on these events to take proactive action: suggest next steps, fetch context, auto-complete routine work, or spawn focused investigations.',
      'We implement the Inception Pattern: scheduled agents with constrained self-spawning capability. The system grows when the world is interesting and stays quiet when it isn\u2019t.',
    ],
    deliverables: [
      { marker: 'Design', text: 'Event Map \u2014 every key event in your ecosystem, what it means, and what agent action it should trigger' },
      { marker: 'Blueprint', text: 'Spawn Architecture \u2014 the Inception Pattern with constraint sets: branching limits, temporal buffers, quality criteria' },
      { marker: 'System', text: 'Prototype Ambient Agents \u2014 working agents for 2\u20133 priority use cases' },
      { marker: 'Blueprint', text: 'Knowledge Graph Design \u2014 entity model, data sources, reconciliation logic, continuous refinement' },
    ],
    details: [
      { label: 'Duration', value: '4\u20138 weeks' },
      { label: 'Best for', value: 'Operations leaders whose teams spend 40% of their time on monitoring, triaging, and routing' },
      { label: 'Trigger moment', value: 'You realize the highest-value agent work happens between user requests, not during them' },
    ],
    taoRef: {
      quote: 'The first targets for agents are the glue tasks: coordination, translation, enrichment, monitoring, and reporting. We protect human bandwidth for judgment, creativity, and relationships.',
      principle: 10,
    },
  },
  {
    number: '05',
    name: 'Agent Observability & Evaluation',
    tagline: 'If you can\u2019t see what your agents are doing, they\u2019re not working for you.',
    track: 'I',
    situation:
      'You have agents in production. They seem to work. But when someone asks "how well are they performing?" or "why did it do that?", no one can answer. You have no way to tell the difference between an agent that\u2019s doing excellent work and one that\u2019s confidently producing garbage.',
    whatWeDo: [
      'We instrument your agents to capture what matters: input context, tools chosen, reasoning traces, decisions made, and outcomes produced. We define evaluation scenarios tied to real business goals.',
      'We implement the compound engineering loop: when an agent struggles or fails, we treat it as a signal \u2014 identify what\u2019s missing and feed the fix back into the harness. Every mistake becomes a permanent improvement.',
    ],
    deliverables: [
      { marker: 'System', text: 'Observability Instrumentation \u2014 logging of input context, tool selection, reasoning traces, and outcomes' },
      { marker: 'Artifact', text: 'Evaluation Suites \u2014 test scenarios defined by business goal with pass/fail criteria from your specifications' },
      { marker: 'Process', text: 'Compound Loop \u2014 a systematic process for converting agent failures into harness improvements' },
      { marker: 'Recurring', text: 'Agent Health Reports \u2014 monthly analysis of agent performance with prioritized recommendations' },
    ],
    details: [
      { label: 'Duration', value: 'Ongoing \u2014 quarterly retainer' },
      { label: 'Best for', value: 'Teams with agents in production who can\u2019t answer "are they working?"' },
      { label: 'Trigger moment', value: 'An agent makes an expensive mistake and no one can explain why' },
    ],
    taoRef: {
      quote: 'We make reasoning, assumptions, and limitations visible to clients and users. No magic, no black boxes: inspectable traces, explainable policies, and honest performance characterization.',
      principle: 13,
    },
  },

  // ── TRACK II ──
  {
    number: '06',
    name: 'Agent Experience Design',
    tagline: 'Treat agents as first-class users of your product.',
    track: 'II',
    situation:
      'Your enterprise customers are starting to ask: "Can my agents use your product?" The honest answer is "kind of, but it\u2019s janky." Your APIs were designed for human developers. Your documentation assumes a person is reading it. Your error messages are written for screens, not for reasoning models.',
    whatWeDo: [
      'We audit your entire product surface from the perspective of an agent trying to accomplish a task. We apply the Agent Experience (AX) methodology: the same rigor your team brings to UX research, but for non-human users.',
      'We redesign your tool interfaces to be intention-shaped \u2014 organized around what agents are trying to accomplish, not the internal structure of your system. We restructure documentation for retrieval and redesign error messages for agent self-recovery.',
    ],
    deliverables: [
      { marker: 'Audit', text: 'AX Assessment \u2014 every API endpoint, doc page, and error path scored for agent usability' },
      { marker: 'Design', text: 'Intention-Shaped API Specs \u2014 redesigned interfaces organized around agent tasks' },
      { marker: 'Artifact', text: 'Agent-Ready Documentation \u2014 restructured docs optimized for retrieval: chunked, schemaed, example-rich' },
      { marker: 'Guide', text: 'AX Style Guide \u2014 ongoing standards for maintaining agent-friendliness as your product evolves' },
    ],
    details: [
      { label: 'Duration', value: '4\u20138 weeks' },
      { label: 'Best for', value: 'B2B SaaS companies whose enterprise customers are building agents that need to use their product' },
      { label: 'Trigger moment', value: 'A major customer asks "can my agents use your API?" and the answer is "technically yes, reliably no"' },
    ],
    taoRef: {
      quote: 'We write everything so that humans can understand it and agents can execute it. Workflows, data, and configuration must be simultaneously humane for stakeholders and machine-legible for agents.',
      principle: 7,
    },
  },

  // ── TRACK III ──
  {
    number: '07',
    name: 'The Operations Copilot',
    tagline: 'Six agents running before you open your laptop.',
    track: 'III',
    situation:
      'You run a business of 5\u201330 people. You spend the first two hours of every day on email triage, scheduling, status updates, and coordination \u2014 connective tissue that keeps the business running but doesn\u2019t move it forward.',
    whatWeDo: [
      'We build a personalized agent system \u2014 a team of specialized agents that run on a schedule, operate in parallel, and produce artifacts you review in five minutes.',
      'This isn\u2019t a chatbot. It\u2019s a system where each piece is designed to feed the next one. The email scanner attributes tasks. The morning sweep assembles context. The time-blocker reads everything upstream.',
    ],
    deliverables: [
      { marker: 'System', text: 'Personalized Agent Team \u2014 4\u20136 specialized agents configured to your workflows, tools, and preferences' },
      { marker: 'Session', text: 'Knowledge Extraction \u2014 structured session to capture classification rules, VIP contacts, and decision heuristics' },
      { marker: 'Ongoing', text: 'Monthly Tuning \u2014 every misclassification or error becomes a permanent harness improvement' },
    ],
    details: [
      { label: 'Best for', value: 'Founders, small firm partners, and operators drowning in administrative overhead' },
      { label: 'Time to value', value: 'Agents running within 2 weeks' },
    ],
  },
  {
    number: '08',
    name: 'Workflow Agent Packages',
    tagline: 'Pre-designed agentic systems, customized to your practice.',
    track: 'III',
    situation:
      'Your team wastes hours on repetitive client work \u2014 chasing documents, preparing meeting materials, processing intake forms, assembling reports. The tasks are predictable in structure but variable in content. This is exactly what agents are best at.',
    whatWeDo: [
      'We offer pre-designed agent systems for specific verticals, customized to each client\u2019s context. For law firms: intake processing, conflict checking, document preparation. For accounting practices: document collection, categorization, review preparation. For agencies: brief intake, project status monitoring, content pipeline management.',
      'Each package is built to compound. The monthly retainer isn\u2019t maintenance \u2014 it\u2019s continuous improvement.',
    ],
    deliverables: [
      { marker: 'System', text: 'Vertical-Specific Agent Package \u2014 pre-designed agents customized to your practice workflows' },
      { marker: 'Ongoing', text: 'Continuous Improvement \u2014 every interaction produces learning that makes the system better' },
    ],
    details: [
      { label: 'Best for', value: 'Professional services firms with repeatable client workflows' },
      { label: 'Trigger moment', value: 'You realize your team\u2019s most expensive hours are spent on your least valuable tasks' },
    ],
    taoRef: {
      quote: 'Our edge is not the smartest agent, but the way we package agentic capability into safe, contextual, industry-specific systems.',
      principle: 14,
    },
  },
  {
    number: '09',
    name: 'Knowledge Capture',
    tagline: 'What happens to your business if you get hit by a bus?',
    track: 'III',
    situation:
      'Your business runs on knowledge that lives in one or two people\u2019s heads. The founder knows which clients need hand-holding. The operations lead knows the workaround for the billing system. None of this is written down. All of it is load-bearing.',
    whatWeDo: [
      'We spend 2\u20133 days interviewing your key people, extracting the tacit knowledge that runs the business. We produce a human-readable knowledge base for onboarding and continuity, and an agent-legible version \u2014 specifications, decision trees, and classification rules.',
      'This engagement stands on its own. Many clients value the documentation even if they never build a single agent. But it\u2019s also the natural entry point for everything else.',
    ],
    deliverables: [
      { marker: 'Artifact', text: 'Human-Readable Knowledge Base \u2014 structured documentation for onboarding, training, and continuity' },
      { marker: 'Artifact', text: 'Agent-Legible Specifications \u2014 decision trees and classification rules ready for agent consumption' },
    ],
    details: [
      { label: 'Duration', value: '2\u20133 days of interviews, 1 week of synthesis' },
      { label: 'Best for', value: 'Any small business where critical knowledge lives in too few heads' },
      { label: 'Standalone value', value: 'Yes \u2014 the knowledge base serves onboarding and continuity regardless of agent development' },
    ],
    taoRef: {
      quote: 'We treat a client\u2019s institutional knowledge \u2014 processes, heuristics, edge cases \u2014 as an asset to be extracted, structured, and protected.',
      principle: 12,
    },
  },
];

export const trackOrder: (keyof typeof tracks)[] = ['entry', 'I', 'II', 'III'];

export function getServicesByTrack(track: keyof typeof tracks): Service[] {
  return services.filter((s) => s.track === track);
}
