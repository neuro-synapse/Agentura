---
title: "The Arrow of Certainty: On Agents That Act Before Being Asked"
pubDate: 2026-03-19
description: "What a physicist's theory of promises, a pair of organizational behaviorists, and a hippie mechanic reveal about the deepest challenge in building proactive AI agents."
author: "Agentura"
tags: ["essays", "agents", "philosophy", "proactive-systems"]
---

In 1969, on a commune in rural New Mexico, a group of back-to-the-land hippies discovered something about machines that would take the rest of the world another half-century to learn about software. Stewart Brand, who had cofounded the *Whole Earth Catalog* and spent the better part of a decade championing self-reliance, would later write about this era with the clarity of someone who'd lived through the lesson and only understood it much later. The hippies, he recalled, were magnificent at crisis response — a busted water pump at midnight, a collapsed roof beam in a storm, a generator that died during a blizzard. They were *terrible* at the thing that would have prevented all of it:

> Something breaking is a big event. Repairing the broken thing is a big event. But preventing the thing from breaking is a non-event. Doing a responsible task like changing the oil doesn't come naturally. It's a messy chore, tedious and thankless. There is no reward when you do it and no reward later — just the unnoticeable absence of pain.

Brand's observation is, on its surface, about Volkswagen engines and goat fences. But it describes, with uncanny precision, the central problem of building AI agents that do anything useful in the world. We have become extraordinarily good at building systems that respond — that answer questions, follow instructions, execute workflows triggered by human commands. What we have not yet learned to build, with anything resembling reliability, are systems that *act before being asked*. Systems that change the oil. Systems that notice the non-event and intervene before the event becomes necessary.

The proactive agent is the most sought-after and least understood pattern in the current wave of AI engineering. And the reason it remains elusive has less to do with the capabilities of language models than with a philosophical confusion that runs much deeper — a confusion about the nature of action itself, about what it means to initiate rather than respond, and about where the intelligence for such initiation must live.

***

Mark Burgess spent the first part of his career as a theoretical physicist before crossing into computer science, where he became known for something unusual: applying the logic of physical systems to the problem of human and machine cooperation. His *Promise Theory*, developed over two decades of work on distributed systems, begins with what he calls a "disarmingly ambitious premise" — imagine a set of principles that could explain how parts combine to become wholes, regardless of whether those parts are people, birds, computers, or cogs in a Swiss watch. This is not mere analogy-hunting. Burgess is after a universal grammar of cooperation, one language that describes every form of coordinated behavior from a database cluster to a jazz ensemble.

The heart of his theory is a distinction so simple it sounds almost trivial, until you realize it reframes everything: the distinction between *commands* and *promises*. A command is an instruction issued by one agent to another — do this, in this order, in this way. A promise is a declaration made by an agent about its own future behavior — I will ensure this outcome. The difference seems cosmetic until Burgess reveals what changes structurally when you shift from one frame to the other:

> Commands fan out into unpredictable outcomes from definite beginnings, and we go from a certain state to an uncertain one. Promises converge towards a definite outcome from unpredictable beginnings, leading to improved certainty.

This is perhaps the most visually powerful idea in the entire theory. A command is a cannon shot — launched from a known position along a predetermined trajectory into an unknown future. If anything along that trajectory is unexpected — a gust of wind, an obstacle, a target that moved — the shot goes wide, and no force within the cannonball can correct its path. A promise is something else entirely: a homing signal, a gravitational attractor pulling from an unpredictable present toward a declared destination. The starting conditions don't matter. What matters is that the agent making the promise has co-located the intent, the information, and the control necessary to converge on the outcome.

This is why workflows break and agents don't — or at least, this is why they break differently. A workflow is a crystallized sequence of commands: step one, then step two, then step three, with branching logic designed at planning time by someone who has never seen the runtime conditions. When step three encounters something the flowchart didn't anticipate — a malformed API response, an ambiguous user input, an edge case the designer never imagined — the trajectory diverges into the unhandled. The workflow doesn't know what it was *for*. It only knows what it was told to do.

An agent operating on promises is structurally different. It knows what it's trying to achieve because it declared the outcome. When it encounters the unexpected, it can adapt — not because it's smarter, but because the information needed to navigate toward the goal is co-located with the entity doing the navigating. Burgess puts this with characteristic precision:

> Promises are local, whereas obligations are distributed (nonlocal). A promise is made by the agent that controls the relevant behavior — causation and declaration are co-located. An obligation, by contrast, originates externally and must traverse the gap between the obliger and the obligee.

Locality is the architectural reason proactive agents work for open-ended tasks. In a workflow, the intelligence about what should happen lives in the orchestrator — not in the execution nodes. When something goes wrong at step four of seven, the execution node doesn't know why it was called or what the overall goal is. It cannot self-correct because the information for self-correction is somewhere else. In a promise-based system, the agent that encounters the problem is the same agent that declared the outcome, and therefore holds everything needed to navigate around the obstacle.

***

But if promise theory explains the *physics* of proactive agency — if it tells us that convergence requires co-locating intent, information, and control — it does not explain why proactive systems are so rare. The capability exists. Large language models can reason, plan, and use tools. The infrastructure for autonomous action is well-established. And yet most AI systems sit idle until prompted, like a mechanic who knows exactly what the engine needs but waits for it to seize before picking up a wrench.

For this, we need to leave the world of physics and enter the world of organizational behavior, where two Stanford researchers spent the better part of a decade studying a phenomenon so pervasive it seems almost embarrassing to name: organizations that know exactly what they should do, and don't do it.

Jeffrey Pfeffer and Robert Sutton called it *the knowing-doing gap*, and their 2000 book of that name remains one of the most quietly devastating texts in management literature. They studied companies that had sent executives to the best training programs, hired the brightest consultants, benchmarked the most successful competitors, and produced reams of strategy documents articulating precisely what needed to change. And then nothing changed. The knowing was abundant. The doing was absent.

Their diagnosis cuts to the bone:

> One of the main barriers to turning knowledge into action is the tendency to treat talking about something as equivalent to actually doing something about it.

This sentence, written about human organizations in the late 1990s, is the most precise description I know of how most AI agent systems actually work in 2026. We build elaborate planning chains. We implement "reasoning" loops where the agent thinks step-by-step about what it should do. We create reflection frameworks where the agent evaluates its own plan. We construct workflows where the agent outlines its approach, gets approval, and then — finally, hesitantly, after all that cognitive ceremony — does something. We have built, in other words, systems that are fluent in talking about action and structurally reluctant to take it.

Pfeffer and Sutton found that the organizations that actually closed the knowing-doing gap shared a distinctive quality. They were not smarter. They did not have better knowledge. What they had was a bias toward simple language and immediate action — what Pfeffer and Sutton called "the virtue of simple language, simple structures, simple concepts, and the power of common sense." They quote GE's Jack Welch, whose Workout program was, in the authors' words, "nothing more complicated than bringing people of all ranks and functions together in a room to focus on a problem or an opportunity, and then acting rapidly and decisively on the best ideas developed, regardless of their source."

The critical mechanism was what happened at the end of each Workout session: a senior leader had to make an immediate yes-or-no decision on every idea presented. Not "we'll study it." Not "let's form a committee." Not "interesting — send me a memo." Yes or no, right now. This forced closure — this refusal to let talk substitute for action — was what made the program work.

> Simple talk is valuable because it is more likely to lead to action. It is less possible to second-guess or dispute simple, direct ideas. One may disagree with a simple idea or a simple philosophy, but that is transparent at the outset.

***

Read together, Burgess and Pfeffer/Sutton reveal something that neither says alone. Burgess gives us the physics: proactive agency requires co-locating intent, information, and control at the point of execution. Commands diverge; promises converge. The architecture matters. But Pfeffer and Sutton give us the pathology: even when the architecture is right — even when the knowledge exists and the capability is present — a system can still fail to act, because *talk has become a substitute for doing*.

The implication for AI agent design is unsettling. We have been building our agents as talkers. The default architecture of an LLM-based agent is a reasoning loop: observe the environment, think about what to do, generate a plan, reflect on the plan, maybe revise the plan, and only then — if the confidence is high enough and the guardrails permit — take action. Each step in that loop is a form of talk. And each step provides another opportunity for the system to convince itself that thinking about acting is the same as acting.

A truly proactive agent is one that has closed this gap. It has internalized its promises so thoroughly that the question of whether to act is already answered before the situation arises. It doesn't need a planning loop because it has already declared its outcomes. It doesn't need approval because it has co-located the authority to act with the information needed to act well. It is, in Burgess's terms, an agent that has made its promises local — that has moved the intent, the information, and the control to the same place.

This is what Burgess means when he writes that "the promise position is an extreme position" — and that its extremity is precisely what makes it useful. If you start from the assumption that every agent controls its own behavior and makes voluntary commitments about its outcomes, you can reconstruct any shade of compliance — any workflow, any approval chain, any governance structure — as a pattern of promises. But you cannot go the other direction. You cannot start from commands and obligations and reconstruct the agent's capacity for autonomous convergence, because commands are structurally incapable of carrying intent to the place where it is needed.

***

Near the end of his memoir about the Whole Earth era, Brand circles back to a figure who had been there all along, quietly modeling the philosophy that the hippie communes struggled to learn. John Muir — not the naturalist, but the author of *How to Keep Your Volkswagen Alive: A Manual of Step-by-Step Procedures for the Compleat Idiot*, the best-selling automotive repair manual in American history — taught his readers not just every repair their VW might ever need, but especially how to avoid having to make those repairs in the first place. "Warm up the engine before moving," Muir advised. "Ninety percent of engine wear happens in the first fifteen minutes of operation. Warming up the engine is a sacred rite."

But Muir's deeper lesson was about attention — about what it means to develop the kind of awareness that notices problems before they become crises. He taught his readers to listen: "If there's a funny noise and pushing the clutch down silences it, it's a transmission problem, but if it changes to a different funny noise, it's a clutch problem. Loose valves tweedle. Very loose valves clatter." This is not reactive repair. This is something more like perception — a trained sensitivity to the faint signals that precede failure.

Robert Pirsig, whose *Zen and the Art of Motorcycle Maintenance* Brand also invokes, described the same quality in language that reads less like mechanical advice and more like a meditation instruction:

> Just stare at the machine… Watch it the way you watch a line when fishing and before long… you'll get a little nibble, a little fact asking in a timid, humble way if you're interested in it… After a while you may find that the nibbles you get are more interesting than your original purpose of fixing the machine… Then you're no longer strictly a motorcycle mechanic, you're also a motorcycle scientist, and you've completely conquered the gumption trap of value rigidity.

The proactive agent, in the end, is not the one that does more. It is the one that has learned to attend — to notice the nibble, the tweedle, the faint signal that something is about to need attention. It has made a promise not to a user or an orchestrator but to the system it inhabits: *I will keep watch. I will notice. I will act before you need to ask.* And the reason this is so hard to build is not that it requires more intelligence or more capability. It is that it requires a fundamentally different orientation to action — one that treats prevention as a first-class outcome, even though prevention, by its nature, is a non-event. Something that never broke. Something that was never asked for. An absence of pain that no dashboard will ever display, and no metric will ever capture, but that makes all the difference between a system that waits and a system that lives.
