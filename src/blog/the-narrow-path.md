---
title: "The Narrow Path: On Agents That Remember"
pubDate: 2026-03-19
description: "What a philosopher of narration, a specification writer, and the deep history of feedback loops reveal about the difference between agents that accumulate data and agents whose work compounds."
author: "Agentura"
tags: ["essays", "agents", "compounding", "narrative", "memory"]
---

In his *Arcades Project*, the great unfinished cathedral of twentieth-century criticism, Walter Benjamin wrote a sentence that the philosopher Byung-Chul Han would excavate decades later and place at the center of his own argument about what we have lost: "Our life is a muscle strong enough to contract the whole of historical time." It is a strange image — life as a muscle, history as something that can be *contracted*, drawn together, held in tension. Benjamin meant that genuine happiness is not a private sensation but a form of remembrance — that the experience of meaning requires the ability to gather scattered moments into a coherent arc, to feel the past vibrating in the present, to sense that this moment is connected to all the other moments that made it possible.

Han, a Korean-born philosopher working in Berlin, has spent the last decade arguing that this capacity — the capacity for narrative, for drawing connections across time — is precisely what the digital age is systematically destroying. His 2023 book *The Crisis of Narration* is a slim, urgent volume that reads less like philosophy and more like a diagnosis. The patient is modern consciousness. The disease is information.

> Time is becoming increasingly atomized. Narrating a story, by contrast, consists in establishing connections. Whoever narrates in the Proustian sense delves into life and inwardly weaves new threads between events. In this way, a narrator forms a dense network of relations in which nothing remains isolated. Everything appears to be meaningful. It is through narrative that we escape the contingency of life.

What Han describes is not a literary technique. It is a cognitive architecture. Narrative is how humans transform raw experience into meaning — by selecting, connecting, and interpreting events into a shape that makes the present intelligible in light of the past. Without narrative, experience is merely additive. Days tack onto days. Events accumulate but do not cohere. Nothing builds on anything else.

This distinction — between the additive and the narrative, between accumulation and coherence — is the central problem of building AI agents whose work compounds. Most agents today are stateless. Each invocation begins from scratch. They process the current input, produce the current output, and retain nothing. Even agents with memory are typically additive — they store transcripts, logs, retrieved documents, growing ever larger but never growing wiser. They accumulate data the way a database accumulates records. They do not narrate.

***

Kamil Nicieja was a software engineer and specification writer who spent years working on a problem that seems, at first glance, purely technical: how to write specifications that stay true. His book *Writing Great Specifications* and his later synthesis *The Discipline of Intent* address the epidemic of what he mordantly calls "speci-fiction" — specifications that "pose as a single source of truth but can't be one because nobody cares to update them." These are documents that were accurate once, at the moment of writing, and have been slowly diverging from reality ever since. They are the organizational equivalent of a false memory.

Nicieja's solution is what he calls *living documentation* — specifications that are executable, that run against the actual system and fail when the system diverges from what was specified. The key insight is not technical but epistemological: the only way to keep documentation true is to continuously verify it against reality.

> Only working production code holds the truth about the system. Most specifications become outdated before the project is delivered.

This is a devastating admission for someone who has devoted his career to specifications. But Nicieja does not conclude that specifications are futile. He concludes that they must be *alive* — linked to the running system through automated verification, updated by feedback loops that enforce honesty. He tells the story of Peter, a new team member who discovered that the project's domain language was inconsistent — that "screening" and "qualifying" were used interchangeably, and that "tenant leads" and "candidates" seemed to mean the same thing. Rather than treating this as a failure, Nicieja frames it as the system working:

> There's nothing wrong with the fact that the changes are only happening now, after Peter pointed them out. That's why we talk about a living documentation system. Such a system employs feedback loops to correct itself over time.

The living documentation self-corrects not because it is intelligent but because it is *connected* — tied to the reality it describes through verification loops that surface contradictions and force resolution. This is compounding, but of a specific kind. Each correction makes the documentation more accurate. Each new team member who discovers an inconsistency and fixes it makes the system more trustworthy. The documentation doesn't just grow; it gets better.

***

Han's diagnosis of the modern condition and Nicieja's solution for software specifications seem, on the surface, to inhabit entirely different worlds. One is a philosopher mourning the loss of narrative in an age of information overload. The other is an engineer building feedback loops to keep documentation honest. But they are circling the same problem from opposite directions, and the place where they meet illuminates something essential about what it would mean for an AI agent's work to compound.

Han's key distinction is between *narrative memory* and *database memory*:

> Human memory is selective. This is how it differs from a database. It is narrative, whereas digital memories are additive and cumulative. A narrative depends on a selection and connection of events. It proceeds in a selective fashion. The narrated or remembered life is necessarily incomplete. Digital platforms, by contrast, seek to create a complete record of a life. The less narration there is, the more data and information there are.

The narrative path is narrow. It comprises only selected events, connected by interpretation, shaped by judgment about what matters and what doesn't. A database path is wide — it captures everything, discards nothing, and precisely because of its completeness, means nothing. The completeness is the problem. When everything is preserved with equal weight, nothing stands out. When every interaction is logged with the same fidelity, no interaction teaches anything.

This is the condition of most AI agents with memory. They store everything — full conversation transcripts, retrieved documents, tool outputs, error logs — in growing context windows or vector databases that become more comprehensive and less useful with each addition. They are databases pretending to be memories. They accumulate without narrating. They grow without learning.

Nicieja, working from the engineering side, arrives at the same insight through a different vocabulary. His synthesis document — written with the investor Sarah Guo and drawing on an essay called "Relocating Rigor" — identifies what he calls "the relocation thesis":

> Certain shifts in software history feel like freedom because they remove familiar signals of control. In reality, they relocate rigor closer to where truth lives.

The history he traces is illuminating. Extreme Programming in the late 1990s "compressed feedback loops until truth became unavoidable. Tests replaced promises. Continuous integration replaced status reports. Working software replaced narrative." But then XP "got absorbed into the broader 'Agile' movement and solidified into branding and ceremony. When the name took over, the rigor drained out. The feedback softened. The theater returned." The pattern repeated with each subsequent wave: a genuine insight about connecting systems to truth gets diluted into process, ceremony, documentation that nobody reads.

The lesson is not that rigor disappears. It relocates. And the question for any new technology — including AI agents — is: *where did the rigor go?*

Guo's companion essay provides the answer for the age of AI-generated code: rigor relocates from writing code to *specifying intent*. When code becomes cheap to generate, the scarce resource is no longer the ability to write programs but the ability to say precisely what the program should do — and to verify that it did it. Nicieja's executable specifications are the mechanism: human-readable descriptions of intended behavior, linked to automated verification that runs continuously against the real system.

> As software becomes abundant, the ability to make intent clear becomes scarce. Everything that follows is a consequence of that shift.

***

The synthesis between Han and Nicieja is this: *compounding requires narrative, not accumulation.* An agent whose work compounds is not one that stores more data, retrieves more context, or maintains a longer memory. It is one that *selects and connects* — that narrates its own history, identifying which experiences mattered, what they revealed, and how they change what should be done next. It is an agent that has the discipline to forget — to leave out the irrelevant, to compress the redundant, to elevate the significant — because narrative, as Han insists, "proceeds in a selective fashion" and "is necessarily incomplete."

This is what Nicieja's living documentation achieves in miniature. Each specification is a narrative about intent — a declaration of what must be true, written in the language of the business, verified against reality. When the specification fails, it means the world has changed and the narrative must be updated. The update is not additive (append the new fact) but narrative (revise the story to incorporate what was learned). The documentation doesn't just grow; it *improves*. Each failure makes the system's self-description more accurate, more complete, more honest.

Contrast this with the typical agent memory system, which is purely additive. The agent stores the transcript of every conversation. It retrieves relevant fragments by similarity search. But it never revises its own history. It never decides that a previous interaction was misleading, or that a previous approach was wrong, or that a previously retrieved fact has been superseded. It cannot narrate because it cannot select. It cannot compound because it cannot forget.

***

There is a deeper layer here, one that Han touches on in his discussion of Proust. Narration is not just selection — it is *re-interpretation*. Proust's great project in *In Search of Lost Time* was not to record his past but to discover, through the act of narrating it, meanings that were invisible at the time of living. The madeleine dipped in tea does not merely recall a childhood memory; it reveals that the childhood experience contained a significance that could only be recognized retrospectively, from the vantage point of the narrator's present. The past changes meaning when viewed from a different present.

Han frames this with characteristic precision:

> Memories necessarily have gaps. They presuppose closeness and distance. When all experience is present and distanceless, that is, when it is available, remembrance is impossible. The gapless repetition of past experience is not a narrative but a report or record. To be able to narrate or remember, one must be able to forget or leave out a great deal.

The gapless repetition of past experience — this is exactly what a context window provides. Every previous message, every tool output, every reasoning step, laid out in sequence without selection, without interpretation, without the closeness and distance that make genuine remembering possible. It is, in Han's terms, "not a narrative but a report or record." And a report, no matter how complete, does not compound.

What would it look like for an agent to narrate rather than report? It would mean maintaining not a transcript but a *model* — an evolving understanding of the domain, the user, the system, that is updated through interpretation rather than append. When the agent encounters a new piece of information, it would not simply store it alongside everything else. It would ask: *does this change what I thought I knew? Does this revise a previous understanding? Does this reveal that a pattern I identified earlier was wrong, or incomplete, or more significant than I realized?* This is what Nicieja's living documentation does — it doesn't just record; it *revises in light of new evidence*.

Guo identifies the human competency that this requires:

> Judgment engineering is the work of translating accumulated experience into explicit constraints, tests, and boundaries that systems and teams can operate against.

Judgment engineering is narrative work. It takes the raw material of experience — logs, outcomes, failures, successes — and compresses it into constraints that encode what was learned. A constraint is a narrative in miniature: *because this happened, we now require that.* It is selective (it leaves out everything that doesn't matter), connected (it links the past event to the future requirement), and interpretive (it assigns meaning to the experience). And critically, it compounds — each constraint makes the system smarter, more robust, more aligned with the reality it operates in.

***

Stewart Brand, writing about the maintenance of physical machines, captured the same idea in a characteristically earthy image. Skilled maintainers, he observed, "build two narratives: one for finding the problem and one for solving the problem. Working backward from the visible part of the problem to the issues hidden behind it is detective work into what caused what." Even in the world of engines and circuit boards, compounding is narrative. The mechanic who gets better over time is not the one who accumulates more repair logs. It is the one who builds better *stories* about how machines fail — richer causal narratives that allow faster diagnosis, more accurate prediction, and ultimately the kind of preventive awareness that makes repair unnecessary.

Han would recognize this immediately. The mechanic is narrating. The database is reporting. And the difference between them is the difference between a system that merely persists and a system whose persistence means something — whose accumulated experience has been woven, through selection and interpretation, into an understanding that grows more powerful with each encounter.

The compounding agent is not the one with the largest memory. It is the one with the narrowest path — the one that has learned, like Proust's narrator, that remembering is an act of creation, not retrieval. That forgetting is as essential as storing. That the only experience worth keeping is the experience that has been *interpreted* — woven into a narrative that makes the next encounter more intelligible than the last. It is an agent that does not merely accumulate its history but *authors* it, revising and compressing and connecting until what remains is not a record of everything that happened but a living understanding of what it all meant.

This is what it would mean for an agent's work to compound. Not more data. Not longer context. Not better retrieval. But narrative — the ancient, unglamorous, irreducibly human art of deciding what matters, connecting it to what came before, and letting the rest fall away. The narrow path. The selective memory. The muscle strong enough to contract the whole of operational time into a single, coherent understanding that makes the next action wiser than the last.
