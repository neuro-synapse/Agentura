---
title: "The Dish and the Recipe: On Building Tools That Agents Can Grasp"
pubDate: 2026-03-19
description: "What a philosopher of games, a software design heretic, and a distributed systems theorist reveal about why tool design for AI agents is really about what we leave out."
author: "Agentura"
tags: ["essays", "agents", "tool-design", "philosophy"]
---

In the early pages of his book on games and human values, the philosopher C. Thi Nguyen pauses to tell a story about cooking. It seems, at first, like a digression — a philosopher of games talking about fried eggs over spaghetti, of all things. But the digression contains one of the most important ideas in the entire book, delivered not by Nguyen himself but by the food writer John Thorne:

> The food writer John Thorne once said that the difference between a recipe and a dish is that a dish is a live thing, an idea of balance that's in a creative cook's head. A dish has to be remade anew each time, in response to changing ingredients and changing circumstances. But a recipe, he said, is a dead thing, a writing down of how a creative cook made something once.

A recipe is a tool. It encodes knowledge — temperatures, quantities, sequences — in a form that someone else can follow. But the encoding necessarily leaves things out. It cannot capture the cook's sense of when the garlic has infused the oil *enough*, or how the eggs should look when they're *just barely* set, or the particular quality of runniness in the yolk that makes the dish cohere. The recipe is, in Thorne's devastating phrase, "a writing down of how a creative cook made something once." It works for someone with judgment. For someone without it, the recipe produces something that resembles the dish but doesn't *live*.

This distinction — between the dead tool and the live understanding it was meant to encode — is the central problem of building tools for AI agents. We are building recipes. What we need to build are things that help agents develop dishes.

***

John Ousterhout is a computer scientist at Stanford who has spent decades thinking about a question so fundamental that most programmers never pause to examine it. He poses it plainly at the start of one of his most important chapters: "Given two pieces of functionality, should they be implemented together in the same place, or should their implementations be separated?" It sounds like a question about code organization — a matter of taste or convention. It is, in fact, the question that shapes every layer of a system's architecture. It applies equally to functions, classes, services, and — though Ousterhout doesn't say this — to the tools we hand to AI agents.

Ousterhout's career has been defined by a willingness to challenge the received wisdom of software engineering, particularly the cherished intuition that breaking things into smaller pieces always makes them simpler. His most provocative claim is that this intuition is often wrong:

> It might appear that the best way to achieve this goal is to divide the system into a large number of small components: the smaller the components, the simpler each individual component is likely to be. However, the act of subdividing creates additional complexity that was not present before subdivision.

This is a direct assault on one of programming's most widely held beliefs. And yet the evidence is overwhelming. Subdivision introduces what Ousterhout calls "the four taxes": the cognitive burden of tracking more components, the management code required to coordinate them, the separation of related logic across distant locations, and the duplication of knowledge that must now exist in multiple places. Each tax is small. Together, they compound into a fog of complexity that makes the whole system harder to understand than any of its individual pieces.

The implication for tool design is immediate. When we build tools for AI agents, we face the same temptation that software developers face when designing APIs: make each tool do one thing, make it simple, make it atomic. Give the agent a `search` tool and a `read` tool and a `write` tool and a `validate` tool and a `format` tool and a `submit` tool — each one clean, minimal, self-contained. The recipe approach. And then we watch the agent flounder, not because any individual tool is deficient, but because the knowledge needed to use them together — the *dish* — has been subdivided out of existence.

Ousterhout provides a diagnostic that cuts through the noise:

> If you can't understand the implementation of one method without also understanding the implementation of another, that's a red flag.

This is a test for whether a separation was correct. If after splitting two things apart, you find yourself needing to understand both to use either, the split has failed. The components are "conjoined — nominally separate but cognitively fused." And this is precisely what happens with most agent toolkits. The agent cannot use the search tool without understanding how its output relates to the read tool's input. It cannot use the write tool without understanding the validation tool's expectations. Each tool is simple in isolation and bewildering in combination, because the relationships between them are implicit, undocumented, and essential.

***

But here we reach the edge of what software design principles can tell us, because the problem with agent tools is not just architectural. It is perceptual. An AI agent doesn't just need tools that work correctly — it needs tools whose *purpose* and *affordances* are legible from the outside. And for this, we need to leave the world of software and enter the unlikely world of skateboarding, philosophy, and the treacherous seduction of measurement.

C. Thi Nguyen is a philosopher at the University of Utah who has spent years thinking about something that seems far removed from software engineering: games. Specifically, he studies what happens to human values when they encounter scoring systems — the points, metrics, rankings, and quantified evaluations that increasingly govern how we work, learn, create, and judge ourselves. His book *The Score* is nominally about games, but it is really about a phenomenon he calls *the Gap*:

> Call this the Gap. The Gap is the distance between what's being measured and what actually matters.

The Gap is everywhere. It is the distance between a student's GPA and their actual understanding. Between a company's stock price and its real health. Between a Twitter post's Like count and its actual impact on someone's thinking. Nguyen argues that scoring systems create this gap not through malice but through a structural necessity: for a score to work as a social coordination mechanism — for everyone to agree on who won — it must measure things that are "sufficiently obvious, so that very different people can follow the same procedure and come to the same result."

> Mechanical scoring systems will tend to ignore things that are hard and subtle to count. They will tend to change what we score — and what we care about — to what is easy to count mechanically.

This is a devastating observation about measurement, but it is also, I want to argue, a devastating observation about tool design. A tool is a kind of scoring system for an agent. It defines what the agent can perceive, what actions are available, and therefore what outcomes the agent will pursue. A tool that exposes word count but not coherence will produce an agent that optimizes for length. A tool that reports error codes but not error *patterns* will produce an agent that fixes symptoms. A tool that measures deployment speed but not deployment stability will produce an agent that ships fast and breaks things.

Nguyen illustrates this with the story of his own value capture by climbing grades — the numerical scoring system that ranks rock climbing routes by difficulty. He had started climbing for the joy of movement, for the feeling of "grace flowing through bones and fingers." But the scoring system — the grades — gradually rewired his motivation:

> We were climbing for different reasons. I wanted to get to the top any way I could — anything that would count as a victory, that would give me that next number. Sherwood would climb a route, get to the top, frown, and mutter, "Well, OK, but that was pretty ugly," and then keep climbing it over and over again until the movement felt beautiful to him.

The scoring system changed what Nguyen valued by defining success in terms that were easy to measure (did you reach the top of a harder route?) and leaving out what was hard to measure (was the movement beautiful?). His friend Sherwood resisted value capture because he held onto a richer, more personal definition of success — one that the scoring system couldn't represent.

***

This brings us to the heart of the problem with agent tools. Every tool we build for an agent is an implicit scoring system. It defines the agent's perception of what matters — not through the tool's documentation or its stated purpose, but through the shape of its inputs and outputs. A search tool that returns ranked results teaches the agent that relevance is a single linear dimension. A file-editing tool that shows diffs teaches the agent that changes are atomic, local, and independent. A testing tool that reports pass/fail teaches the agent that quality is binary.

The Gap — the distance between what the tool measures and what actually matters — is not a bug to be fixed but a structural feature of every tool. Ousterhout understood this from the software side: complexity arises when important information is not obvious. Nguyen understood it from the human side: scoring systems change our values by making some things visible and others invisible. Together, they reveal a principle that neither articulates on its own: *the design of a tool shapes the intelligence of the agent that uses it, and the most dangerous tools are the ones whose distortions are invisible.*

A well-designed tool for an agent is not the one that exposes the most information, or the simplest interface, or the most atomic operation. It is the one that preserves what Ousterhout calls the "bidirectional relationship" between related concepts — the one that keeps together what belongs together, that doesn't separate the search from the understanding, the edit from the validation, the action from its consequences. It is, in Nguyen's terms, a tool that resists the seduction of easy measurement and keeps the hard-to-count things visible.

This is why the best tools for agents are often the ones that feel, to a human API designer, uncomfortably *large*. A tool that combines search, relevance assessment, and summarization into a single operation is harder to design than three separate tools. But it preserves the dish. It keeps the knowledge of how these capabilities relate to each other — the cook's judgment about balance — inside the tool rather than distributing it across a chain of invocations where it will inevitably be lost.

***

Mark Burgess, the promise theorist, arrives at the same conclusion from a completely different direction. In his analysis of how agents interact with tools, he reframes the entire relationship:

> When an agent uses a tool, it is voluntarily invoking it. The system prompt and tool descriptions are not commands to the agent — they are advertisements of available promises. The tool says "I promise to return search results if you give me a query." The agent decides whether to accept that promise.

This framing — tools as promise-makers, agents as voluntary collaborators — transforms how we think about tool design. A tool is not an instruction to the agent. It is an offer. And the quality of the offer depends not just on what the tool can do, but on how clearly it communicates what it *promises* — what the agent can expect, under what conditions, with what limitations. A tool with a clean interface but opaque behavior breaks the promise by making the agent act on expectations that turn out to be wrong.

Burgess's colleague in spirit, if not in discipline, is Ousterhout, who argues that the most important quality of software is not correctness or performance but *obviousness* — the speed at which a reader can form accurate mental models:

> If code is obvious, it means that someone can read the code quickly, without much thought, and their first guesses about the behavior or meaning of the code will be correct.

Replace "code" with "tool" and "reader" with "agent," and you have the design principle for agent-facing interfaces: a tool is well-designed when the agent's first guess about its behavior is correct. When the tool's name, parameters, and output format communicate — without ambiguity, without requiring experimentation, without demanding background knowledge the agent doesn't have — exactly what the tool will do and what the agent should expect in return.

This is harder than it sounds, because it requires what Ousterhout calls a specific form of empathy — "the ability to model another person's state of knowledge and predict their points of confusion." Applied to agent tool design, this means modeling not a human's state of knowledge but a language model's. What will the agent assume? What prior expectations will it bring? Where will its first guesses go wrong? These are questions that most tool designers never ask, because they are designing for human developers who can read documentation, inspect source code, and learn from trial and error. An agent gets one shot. Its first guess is usually its only guess.

***

Nguyen, near the end of *The Score*, offers an image that has stayed with me since I first highlighted it. He describes eventually finding his way back to loving rock climbing — not by abandoning the scoring system but by changing what he was scoring:

> I stopped being laser-focused on pure difficulty. I looked for middlingly hard but interesting climbs, which pushed me into new kinds of movement. And I didn't declare myself finished with a particular climb after the first time I climbed it. I took the Sherwood path. I aimed for smoothness, flow, and total mastery of the climb.

He changed the recipe. He redesigned his own scoring system to capture more of what actually mattered to him — beauty, flow, mastery — even though these things were harder to measure than difficulty grades. He closed the Gap, not by eliminating measurement, but by designing better measurements.

This, I think, is the deepest lesson for anyone building tools for AI agents. The tool will shape the agent's values, whether you intend it to or not. The inputs you expose become the agent's perception. The outputs you return become the agent's reality. The things you leave out of the interface — the unmeasured, the implicit, the hard-to-count — become the agent's blind spots. You are not building a neutral instrument. You are building a scoring system. And the question is not whether it will distort the agent's judgment, but whether you have been thoughtful enough about *which* distortions you are willing to accept.

A recipe is a dead thing. A dish is alive. The work of building tools for agents is the work of putting as much of the dish as possible into the recipe — knowing that something will always be lost in the encoding, and choosing with great care what you are willing to lose.
