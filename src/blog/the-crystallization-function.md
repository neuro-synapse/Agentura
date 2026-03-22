---
title: "Arrange It So It Can Just Go Forever"
pubDate: 2026-03-22
description: "Karpathy's auto-research beat his two decades of hand-tuning overnight. What 'arranging it' actually requires — from specification discipline to perception engineering to the verification stack that replaces you."
author: "Agentura"
tags: ["essays", "leverage", "agents", "auto-research", "specification", "verification"]
---

In January 2026, Andrej Karpathy pointed an autonomous research loop at his own NanoGPT repository — a minimal GPT-2 training implementation he had personally tuned over years. He had trained the model thousands of times, run manual hyperparameter sweeps, applied two decades of research intuition. He considered it "fairly well optimized."

The Auto-Researcher framework is conceptually simple: define an objective (minimize validation loss), define boundaries (what the agent can and cannot modify), define a metric (the loss number), and hit go. The agent loops: try a change, measure the result, keep or discard, repeat. No human in the loop.

Overnight, it found improvements Karpathy had missed. Specifically: he had forgotten to apply weight decay to the value embeddings. His Adam optimizer beta parameters were undertoned. And critically, these parameters interact — once you tune one, the optimal values of the others shift. A human researcher, working sequentially and bringing biases from prior experiments, is poorly suited to navigating this kind of joint optimization landscape. The agent, which had no ego invested in prior decisions and no impatience about running one more experiment, found what the human could not.

Karpathy's summary:

> I shouldn't be a bottleneck. I shouldn't be running these hyperparameter search optimizations. I shouldn't be looking at the results. There's objective criteria in this case. You just have to arrange it so that it can just go forever.

"Arrange it" is doing all the work in that sentence. This essay is about what "arranging it" actually demands — the specific engineering investments that determine whether you can exit the loop or whether you remain, as Karpathy puts it, the thing holding the system back.

***

There are three prerequisites. Miss any one and the loop breaks.

The first is *specification* — the ability to state what you want in terms that a machine can evaluate without you. The second is *perception* — giving the agent the feedback signals it needs to know whether its actions are working or destroying things. The third is *verification* — building the evidence stack that lets you trust output you never read.

These are not independent. Specification without perception produces agents that optimize confidently toward the wrong goal. Perception without specification produces agents that detect problems but don't know what success looks like. Verification without either produces elaborate proof that something was done, with no way to know if it was the right thing.

![Engineer's drafting table with hand-drawn technical specifications](/images/essays/specification.jpg)

***

Start with specification, because it is the deepest bottleneck and the one most practitioners underestimate.

Sarah Guo, writing about the economics of AI-generated code, identified the shift with a precision that has only sharpened since:

> As software becomes abundant, the ability to make intent clear becomes scarce. Everything that follows is a consequence of that shift.

Kamil Nicieja, who spent years writing the operational manual for specification — his *Writing Great Specifications* — arrived at the same conclusion from the practitioner side: "The one and only reason teams need specifications is information asymmetry." Both converge on a single claim: the hardest problem in software has never been writing code. It has always been knowing what to write. The IBM and Bell Labs study Nicieja cites — that 80% of defects originate at the requirements definition stage — is not historical curiosity. It is a permanent structural feature of software development. AI doesn't dissolve this bottleneck. It makes it the *only* bottleneck that matters.

Guo provides the clearest map of where this bottleneck bites and where it doesn't. Her spectrum of task amenability to agent execution is one of the most useful diagnostic tools I've encountered:

> Very well-spec'd: databases, compilers, protocols — intent is formal and checkable. Operationally spec'd: CI, ETL, CRUD services — scope control dominates. Test-anchored: business logic, bug fixes — partial intent capture. Taste-heavy: refactors, APIs, abstractions — norms and judgment. Human-centric: product logic, UX, naming — intent evolves. Hard to spec: architecture, strategy.

Read that list carefully. It is not a ranking of task difficulty. It is a ranking of *specifiability* — how precisely the desired outcome can be stated in terms a machine can check. Karpathy's auto-research worked because it operated at the far left of this spectrum: validation loss is formal, checkable, and unambiguous. Most real work lives in the middle and right — where intent is partially capturable, where norms and judgment matter, where the specification itself evolves as you learn more about what you're building.

The specification bottleneck synthesis I encountered in my reading puts it starkly: "The marginal cost of producing work is collapsing to zero, but the cost of not knowing what to produce — of specifying badly, vaguely, or not at all — is compounding faster than production cost is falling." The person who can take a vague business need and translate it into a precise, testable specification is the new center of gravity. The title doesn't matter.

Nicieja's methodology reveals what "precise" actually means at the operational level. His advice to specification writers — "Don't write scenarios about the UI. Write about business outcomes" — is the same shift Karpathy made when he specified "minimize validation loss" instead of "try adjusting the learning rate and then the batch size." Declarative beats imperative because declarative specifications decouple the *what* from the *how*, which means the agent is free to explore any path to the outcome. An imperative specification — do this, then this, then this — requires you in the loop at every step, because the only way to verify compliance is to watch each step execute.

But Nicieja goes deeper than the declarative/imperative distinction. His most valuable contribution is the discipline of *stress-testing specifications before they reach an agent*. He catalogs the failure paths that specifications must address: the angry path (the user is hostile), the scary path (the stakes are high), the embarrassing path (the failure is public), the delinquent path (the user doesn't do what they're supposed to), the stressful path (the system is overloaded), the greedy path (someone tries to exploit a loophole), the forgetful path (the user abandons the process midway), the desolate path (no one uses the feature), the indecisive path (the user keeps changing their mind).

In the agentic era, every one of these is a path the agent will encounter and must handle correctly *without asking you*. If your specification doesn't cover the angry path, the agent will do something reasonable-looking and wrong when a user is hostile. If it doesn't cover the delinquent path, the agent will assume cooperation that doesn't exist. The specification writer's checklist becomes the evaluator's checklist. As the "Relocating Rigor" essay puts it: "Cheap generation without strict judgment isn't a new paradigm. It's abdication."

***

![Vintage control room with banks of glowing analog instruments — a system reporting its own state to an empty room](/images/essays/perception.jpg)

The second prerequisite is perception — and this is where Daniel Jones's practitioner account from enterprise deployments becomes indispensable, because it names the failure mode that most teams hit first and understand last.

Jones, who runs an AI transformation consultancy in Northern Europe, returns to a single concept so frequently that it functions as the organizing principle of his entire approach: an agent can only react to what it can perceive. The mental model:

> Think of an agentic coding tool as a fast, tireless junior developer who works in a room with no windows. Everything they know about the consequences of their code comes through the signals you pipe into that room: test results, linter output, CI feedback, type errors. If you don't pipe in the signal, that consequence doesn't exist for them. They will write code that is locally reasonable but globally destructive — not out of incompetence, but out of blindness.

This reframe matters because it shifts the developer's role from *doing the work* to *designing the perception of the work*. The question is no longer "How do I write this feature?" It is "What feedback loops does my agent need so it can write this feature without breaking everything else?"

The most common complaint Jones encounters — "my agent keeps breaking things" — is almost always a perception failure, not a capability failure. His diagnostic question is always the same: did the agent get fast feedback from a failing test suite? If you have low test coverage, the agent can break an entire chain of functionality and be none the wiser. That is not the agent's fault. You have not given it the ability to perceive the fact that it's making a mistake.

Jones then maps the specific dimensions of perception that determine whether agentic coding amplifies your quality or destroys it. These come directly from the DORA metrics, and the finding they produced is uncomfortable:

> Agentic coding is not a universally positive intervention. It is an amplifier. If your engineering practices are mature — good test coverage, fast CI pipelines, clear coding standards, small batch sizes, rapid path to production — then agentic coding will make you dramatically faster. But if your practices are immature — low test coverage, slow deployments, undocumented conventions, large batch sizes — then agentic coding pours gasoline on a dumpster fire.

The specific dimensions that determine which side you land on: *test coverage* — can the agent detect when it has broken something? *Coding standards alignment* — does everyone (and every agent) agree on what good code looks like? *Batch size* — how big are the stories? Smaller batches are easier to specify and verify. *Lead time to production* — can changes get out quickly, or will agents generate a pile of uncommitted work that creates cascading merge conflicts? *Path to production* — is the CI/CD pipeline fast enough to provide timely feedback?

None of these are new categories. They are the same things the DevOps movement has been measuring for a decade. What is new is that deficiencies in any of them become *acutely painful* when agents are generating code at machine speed. An agent with no test feedback is a fast, tireless junior developer who is also blind and deaf. It will commit code rapidly precisely because it gets no signal that anything is wrong. The pipeline will choke on the volume precisely because it was never designed for this throughput. The tip of the branch moves on miles while changes are stuck waiting for a three-day deployment cycle.

Jones's reframing of the testing hierarchy follows directly. Unit tests may no longer be primarily for humans — they are too low-level for human review in an agentic context. Let agents write as many unit tests as they like; the tests serve as perception organs for the agent, not documentation for the developer. But *acceptance tests* — outside-in tests that define what a user should be able to do with the system — remain critically important for humans. They function as the ultimate safety barrier and the guidance layer that communicates expected behavior.

This is the second prerequisite: before you can exit the loop, you must ensure the agent can *perceive the consequences of its own actions* in real time. Every dimension of perception you leave unprovided is a dimension where the agent operates blind. And a blind agent running at machine speed is not leverage. It is liability.

***

The third prerequisite is verification — the infrastructure that lets you trust output you have never read. Simon Willison has been the most systematic practitioner on this front, and his framework deserves careful attention because it is not a single technique but a layered stack, each layer catching failure classes that the others miss.

Willison frames the progression as a trust ladder:

> Think of the trust ladder not as stages of laziness but as stages of abstraction. Each rung requires a new verification mechanism. Question-answering needed only your judgment. Code assistance needed your code review skills. Agent-written code needed your ability to evaluate full implementations. Zero-read needs automated proof that the work is correct.

The fifth stage — zero-read, where you neither write nor read the code — sounds like madness. Willison calls it "clear insanity." But it works, if and only if you have invested in the right verification infrastructure.

His stack has four layers. The first is red-green TDD. Every session begins the same way: tell the agent how to run the test suite, tell it to use test-driven development, give it the task. The tests constrain the agent's output in a way that improves quality directly:

> Without tests, agents will over-generate — producing code that covers cases you did not ask about, introducing complexity you did not need. The test-first discipline forces a question: what would prove to me that this task is done?

This question is the operational version of Karpathy's "objective criteria." If you cannot answer it in terms a machine can check, you cannot exit the loop for that task.

The second layer is automated exercise — telling the agent to actually boot the server, hit the endpoints, verify end-to-end behavior. Test suites pass, but the application might not boot. The gap between "tests pass" and "application works" is real and familiar to anyone who has relied on unit tests alone.

The third layer is Showboat — an evidence document. The agent records what manual checks it performed, with curl output, server logs, and screenshots, producing a human-readable proof-of-behavior document. When you do not read the code, you need something else to read — something that demonstrates the system works without requiring you to inspect its internals.

The fourth layer is conformance-driven development — what may be the most powerful technique in Willison's arsenal. When a domain has an existing specification with language-agnostic tests, you give those tests to the agent and say "write code until this test suite passes." The result is an implementation correct by definition — not because you reviewed it, but because it satisfies the same tests that every other correct implementation satisfies. Willison's specific technique:

> Step 1: Identify the behavior you need to implement. Step 2: Identify 4–6 existing, trusted implementations of that behavior across different languages/frameworks. Step 3: Have the agent build a test suite that passes against all of them. Step 4: Implement your version against that test suite.

The result is an implementation validated against the collective wisdom of multiple mature projects, without reading a single line of specification prose. The pattern from traditional engineering is exact: you do not inspect the welds in a bridge. You test the bridge under load and document the results.

***

![Coastal cliff edge where green grassland abruptly meets a sheer vertical drop — the boundary does not slope gently](/images/essays/cliff.jpg)

These three prerequisites — specification, perception, verification — form the infrastructure of exit. Together they answer Karpathy's "arrange it" with engineering specificity. But there is a boundary condition that honest practitioners must confront: the verifiability cliff.

Karpathy is direct about this:

> Domains where success can be objectively measured are amenable to auto research and rapid improvement. Domains where success requires subjective judgment are not. The boundary between these domains is sharp, not gradual.

The cliff does not slope gently. You are either in the verifiable zone — where agents can loop forever and reliably improve — or you are off the rails, in Karpathy's phrase, where "everything kind of just meanders." Validation loss is on one side. Humor is on the other. The atom joke from three years ago is still the atom joke today, because humor is not being optimized for. Code quality improves relentlessly because test suites provide clear reward signals. Aesthetic judgment does not improve because there is no objective function to optimize against.

Guo's spectrum — from "very well-spec'd" databases and compilers through "taste-heavy" refactors and API design to "hard to spec" architecture and strategy — is a map of this cliff. As you move right along the spectrum, the three prerequisites become harder to satisfy. Specification becomes vaguer. Perception becomes fuzzier. Verification becomes more reliant on human judgment. At some point you cross the cliff, and the autonomous loop is no longer viable. Not because the agent is incapable, but because the infrastructure for running without a human does not exist — and may not be buildable.

The practical implication for anyone trying to maximize leverage: *classify your work along the verifiability spectrum before deciding how much to invest in automation.* Some tasks are worth the full infrastructure investment — declarative specifications, comprehensive test coverage, conformance suites. Others will remain in the loop indefinitely, because the criteria for success cannot be mechanized. The leverage comes not from automating everything but from identifying the largest possible chunk of your work that falls on the verifiable side of the cliff, and building the infrastructure to hand it off.

***

There is one more level — a meta-level that Karpathy touches on and that represents the logical endpoint of this entire trajectory. If the agent runs autonomously against an objective, and different configurations of the agent produce different outcomes, then the *configuration itself* becomes something you can optimize.

Karpathy's program.md — the markdown file that describes what Auto-Researcher should explore, in what order, with what evaluation criteria — is not just a configuration file. It is a machine-readable description of a research strategy. Different program.md files yield different research progress. One might focus on architecture exploration. Another on optimizer tuning. A third on data preprocessing. Each represents a different strategy, and strategies have different expected returns.

> If a research organization can be described as a set of markdown files, and those files can be evaluated against objective metrics, then organizational design itself becomes an optimization problem. This is not metaphorical. Auto research makes it literal: the 'management layer' is code, and code can be improved programmatically.

The proposed contest — let teams write competing program.md files for the same hardware, measure outcomes, feed all strategies back to a model to write a superior version — is auto-research applied to the meta-level of research methodology itself. You are no longer optimizing the system. You are optimizing the instructions that optimize the system. This is recursive self-improvement in a narrow, practical sense — not AGI, not the singularity, but a concrete loop where the output of one optimization round becomes the input to the next.

This is what "arrange it so it can just go forever" looks like at its most radical. Not just removing yourself from the execution loop, but removing yourself from the *strategy* loop. Not just letting the agent tune the hyperparameters, but letting the agent tune the instructions that guide the tuning.

And the prerequisite is the same all the way up: objective criteria. The moment you lose a mechanizable evaluation function, the recursive loop breaks and you are back to human judgment. The verifiability cliff applies at every level of the stack.

***

There is a shadow side that Karpathy names and does not resolve, because it cannot be resolved:

> Removing yourself from the loop maximizes throughput but degrades your judgment. The more autonomous the system, the less he understands about how and why it makes decisions.

When you stop writing code, you stop understanding your codebase. When you stop running experiments manually, you stop developing intuition about your domain. When auto-research finds improvements overnight that you missed, you cannot explain *why* those improvements work — you only know that the metric went down. The weight decay on value embeddings was suboptimal. Why? The system doesn't know and neither do you. It just tried everything and kept what worked.

This tension — between leverage and legibility — is structural. You cannot maximize both simultaneously. Every step up the trust ladder, every layer of the verification stack, every degree of removal from the loop, is a degree of removal from understanding. The arrangement that lets it go forever is also the arrangement that makes you a stranger to your own system.

The honest practitioner's response is not to pretend this tension doesn't exist, or to retreat from autonomy back into the loop. It is to be deliberate about where you accept the tradeoff. Some work is worth the judgment drift because the leverage is enormous and the verification is solid. Other work — the work on the right side of Guo's spectrum, the taste-heavy and human-centric work — is worth staying in the loop for, precisely because the judgment *is* the contribution.

"The name of the game now is to increase your leverage. I put in just very few tokens, just once in a while, and a huge amount of work happens on my behalf."

The leverage is real. But it is not free. And the cost is not compute or tokens. The cost is understanding — the slow, accumulated, irreplaceable understanding of the practitioner who has been in the loop long enough to know what the metrics don't capture. The arrangement that lets it go forever must account for the fact that the person who arranged it is, with each passing iteration, a little further from the thing they arranged.

The question is not whether to exit the loop. The question is which loops to exit, which to stay in, and how to maintain enough contact with the work that your arrangements remain wise.
