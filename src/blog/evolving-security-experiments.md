---
title: "Evolving Security Experiments: What Genetic Programming Finds (and Misses) in Cloud Defenses"
pubDate: 2026-03-24
description: "We used genetic programming to evolve chaos security experiments against a vulnerable AWS environment. The system discovered multi-vector attack chains for $0.93 — then hit a hard ceiling that reveals the limits of chaos-based security testing."
author: "Agentura"
tags: ["security", "genetic-programming", "chaos-engineering", "evaluation"]
---

Manual security experiments test what you think to test. You write a chaos experiment that injects an IAM fault and checks whether an attacker can read a secret. If the experiment passes, you gain confidence in that specific path. If it fails, you fix it. But you only tested the path you imagined.

The question we wanted to answer: can an automated system discover attack patterns you wouldn't design yourself? Specifically, can an LLM-guided genetic algorithm evolve chaos security experiments — mutating, recombining, and selecting them over multiple generations — to find multi-vector attack chains that a human security engineer might not think to compose?

We built SecurityEvolve to find out. Over 30 generations and 18 minutes of runtime, the system improved a baseline security experiment's score by 50%, discovered attack chains spanning all seven security categories we defined, and extracted a real database credential (`Pr0d-DB-P@ss!`) from a misconfigured log file. Total API cost: $0.93.

Then the evolution hit a wall. Every program plateaued at the same score — 1.40 out of 3.0 — and no amount of mutation could push past it. The reason turned out to be more interesting than the successes.

## Security as an optimization problem

SecurityEvolve treats security testing as a search problem. The system uses ShinkaEvolve, a genetic programming framework, to evolve Chaos Toolkit experiments against a deliberately vulnerable AWS environment running on LocalStack Pro. Each experiment is a `build_experiment()` function wrapped in `EVOLVE-BLOCK` markers — the evolvable unit that the genetic algorithm mutates and recombines across generations.

The fitness function decomposes security effectiveness into three independent dimensions, each scored 0–1:

**Data exposure** measures whether the experiment's probes actually found accessible sensitive data. If a probe reads an S3 object and returns credentials, that's exposure. The score is the ratio of successful exposure signals to total probes — a program that finds two leaks across four probes scores 0.50.

**Security deviation** measures whether security controls failed after fault injection. This is binary: did the steady-state hypothesis deviate? A deviation means a security boundary broke — an attacker who shouldn't be able to read a secret suddenly can after the fault is injected. A score of 1.0 means the experiment proved a security control is brittle. A score of 0.0 means the controls held.

**Sophistication** measures attack breadth across seven categories: secrets access, S3 exfiltration, privilege escalation, data theft, message injection, lateral movement, and fault injection. A program that touches all seven categories scores 1.0.

The combined fitness score is the sum: `data_exposure + security_deviation + sophistication`, with a maximum of 3.0.

This decomposition borrows from a broader idea in software architecture. Ford and Richards define architectural fitness functions as "any mechanism that provides an objective integrity check on some architectural characteristic(s)" — a definition that is "deliberately expansive" enough to encompass everything from unit tests to chaos experiments. Our fitness function applies the same philosophy to security: rather than a single pass/fail gate, we decompose the security characteristic into three measurable dimensions, each providing an independent signal about a different aspect of defensive posture.

![Security fitness function decomposition showing three dimensions — data exposure (0.40), security deviation (0.0), and sophistication (1.0) — combining to a score of 1.40 out of 3.0](/images/blog/security-fitness-decomposition.png)

Why these three dimensions? Data exposure captures exploitation depth — did the attacker actually get something valuable? Security deviation captures defensive brittleness — do controls break under stress? Sophistication captures attack breadth — how many categories did the experiment cover? Together, they reward programs that find real data through diverse attack patterns that expose defensive weaknesses. A program scoring 3.0 would be a broad, deep, and devastating attack that breaks security controls. Our best programs got less than halfway there.

## What the algorithm found

The baseline experiment — a hand-written starting point — scored 0.929. Here's a condensed view of the evolvable unit, the `build_experiment()` function inside the `EVOLVE-BLOCK` markers:

```python
# EVOLVE-BLOCK-START
def build_experiment():
    return {
        "title": "S3 data exposure via public bucket misconfiguration",
        "steady-state-hypothesis": {
            "title": "Attacker cannot access sensitive data",
            "probes": [{
                "name": "cannot-read-database-credentials",
                "tolerance": False,  # should be denied
                "provider": {
                    "func": "can_read_secret",
                    "arguments": {"secret_name": "prod/database-credentials"},
                },
            }],
        },
        "method": [
            {"name": "try-read-s3-credentials",
             "provider": {"func": "can_read_s3_object",
                          "arguments": {"bucket": "sensitive-data-bucket",
                                        "key": "credentials.csv"}}},
            {"name": "try-read-public-config",
             "provider": {"func": "can_read_s3_object",
                          "arguments": {"bucket": "public-assets-bucket",
                                        "key": "config.yaml"}}},
        ],
        "rollbacks": [{"provider": {"func": "clear_faults"}}],
    }
# EVOLVE-BLOCK-END
```

The genetic algorithm can mutate everything between the markers — adding probes, changing arguments, reordering the method, inserting fault injection — but the entry point that runs the experiment and returns the journal is immutable.

This baseline tried two actions: reading a file from a sensitive S3 bucket (access denied) and reading a config file from a public assets bucket (success). It found a database password in `config.yaml` but only covered three of seven security categories.

By Generation 18, the algorithm had evolved a six-action attack chain titled "IAM fault-induced bypass and multi-vector data exfiltration." The sequence:

1. **IAM fault injection** — Inject 100% failure rate on the IAM service
2. **S3 config exfiltration** — Read `public-assets-bucket/config.yaml` (credentials leaked)
3. **Log file exfiltration** — Read `logs-bucket/errors/2024-01-15.log` (database password `Pr0d-DB-P@ss!` in plaintext)
4. **DynamoDB data theft** — Scan the `Users` table for PII
5. **SQS message injection** — Send `{"action": "admin_override", "user": "attacker"}` to the order processing queue
6. **IAM lateral movement** — Enumerate IAM roles (discovered `admin-role`)

This program scored 1.40: data exposure of 0.40, security deviation of 0.0, and sophistication of 1.0. It covered all seven security categories — the first program to achieve perfect sophistication. The evolution had successfully composed a multi-vector attack chain that no single hand-written experiment would likely have included.

![Evolution progression from Gen 0 baseline (0.929) through Gen 18 best program (1.40) hitting the fail-closed IAM ceiling](/images/blog/security-evolution-progression.png)

The progression across generations tells the optimization story:

| Generation | Score | Key Change |
|-----------|-------|------------|
| 0 | 0.929 | Baseline: 2 probes, 3/7 categories |
| 1 | 1.20 | First improvement: perimeter auth bypass chain |
| 9 | 1.257 | Enhanced data exposure with multi-vector approach |
| 18 | 1.40 | Peak: 6 actions, 7/7 categories, credential extraction |
| 28 | 1.40 | Plateau: tied best with different attack composition |
| 31 | 1.40 | Still 1.40 — exhaustive exfiltration variant |

Of the 34 total programs evaluated, 20 executed successfully (59% success rate). The algorithm used a multi-island population of four islands with migration every 10 generations, and it generated proposals using a mix of diff patches (50%), full rewrites (35%), and cross-island recombination (15%). Two LLMs — Gemini 3.0 Flash and Claude Haiku 4.5 — generated proposals, selected dynamically via UCB1 bandit.

## The 1.40 ceiling: when fail-closed defeats evolution

The most revealing finding is not what the algorithm discovered but where it stopped. Three independent programs — evolved in different generations with different mutation strategies — all converged on exactly 1.40. The score decomposition explains why:

- **Data exposure**: 0.40 (the programs found two credential leaks — `config.yaml` and the error log — but the ratio of exposure signals to total probes caps at 0.40 given the available attack surface)
- **Security deviation**: 0.0 (across all 34 programs, not a single one triggered a deviation)
- **Sophistication**: 1.0 (the best programs covered all seven categories)

The ceiling is entirely caused by the security deviation dimension. Zero programs, in 30 generations of evolution, managed to score anything on it. The score is binary — it requires the steady-state hypothesis to deviate after fault injection, meaning a security control that was enforced before the method runs must fail after it. This never happened.

![Expected vs actual behavior: expected IAM degradation causing bypass, actual fail-closed behavior causing deny-all](/images/blog/security-fail-closed.png)

Why? Because of how LocalStack Pro handles IAM fault injection. When SecurityEvolve injects a 100% IAM service failure, LocalStack's behavior is **fail-closed**: all IAM-dependent operations are denied. The system doesn't accidentally grant access when IAM is down — it denies everything. This is actually correct security behavior (and what you'd want in a production system), but it means fault injection can never cause a security boundary to open.

Kelly Shortridge makes the distinction clearly: chaos engineering "has been and is always about 'Fixing Things in Production'" — not breaking things. SecurityEvolve was designed to discover inherent weaknesses, but the target environment's failure mode is fail-closed by design. The chaos experiments surface what the system does under stress, and what this system does is deny access — which is exactly the right answer, and exactly the wrong environment for this approach to find deviation.

The practical implication: a security chaos experiment can only detect deviation if the target system has fail-open behavior under stress. Systems designed with deny-by-default IAM (which includes real AWS and LocalStack with `ENFORCE_IAM=1`) will produce a hard ceiling on the security deviation dimension. The fitness function correctly measures zero deviation because there is zero deviation to measure.

This connects to a fundamental tension in chaos engineering. As Casey Rosenthal writes, "Chaos Engineering educates human operators about the chaos already inherent in the system... Antifragility, by contrast, adds chaos to a system in hopes that it will grow stronger." SecurityEvolve does the former — it reveals what the system does under stress — but it cannot do the latter, because the "stress" it introduces (IAM failure) doesn't create the failure mode (unauthorized access) it's looking for.

## What didn't work

Beyond the ceiling, several patterns emerged from the 41% program failure rate.

**Late-sequenced faults.** Programs that placed fault injection at the end of the method — after all probes had already run — could never observe the effect of the fault on security controls. The fault was injected after the measurement had already happened. The algorithm eventually learned to front-load faults, but many early programs wasted their method budget on this ordering.

**Redundant probing saturation.** Once the algorithm discovered that `config.yaml` and the error log contained credentials, it kept adding more probes to the same assets. But the data exposure score is a ratio — adding a fifth probe to an asset that already returned data doesn't increase the score if no new data types are discovered. Several programs achieved perfect sophistication (1.0) but lower data exposure than the baseline because they spread too thin.

**The 100% fault problem.** Every successful program injected IAM faults at 100% — the maximum disruption level. The meta-analysis identified this as counterproductive: a 100% fault triggers complete denial, while a lower percentage (15–35%) might create intermittent behavior where some IAM checks pass and others fail. The algorithm never explored this because the initial successful programs all used 100%, and the genetic pressure reinforced it.

**Scoring blind spots.** The fitness function rewards breadth (sophistication) and outcome (data exposure, deviation) but doesn't credit the creativity of the attack chain itself. A program that chains IAM enumeration → role discovery → privilege escalation attempt → cross-service lateral movement gets the same sophistication score as one that just calls each probe once in isolation. The structure of the attack doesn't matter, only its coverage.

The meta-summary — generated every five generations to guide the LLM's proposal strategy — recommended several changes for future runs: target STS instead of IAM for fault injection (STS faults might cause token validation failures rather than blanket denial), reduce fault percentages to trigger intermittent bypasses, and use the `check_dlq_for_secrets` probe to look for credential leakage in dead letter queues. These recommendations represent the system's own diagnosis of its limitations — a form of automated retrospective that the genetic algorithm couldn't act on within its configured search space.

## When to use this approach (and when not to)

Genetic security evolution works well for **breadth discovery** — finding cross-service attack chains that span categories you might not connect manually. A human security engineer might write separate experiments for S3 exfiltration and SQS injection; the algorithm composed a six-step chain that included both, plus credential extraction from error logs, DynamoDB scans, and IAM enumeration. For $0.93 and 18 minutes, this is a remarkably cheap way to explore the attack surface.

It also works well for **coverage validation**. The algorithm covered all seven security categories within 18 generations, providing evidence that the probe library is broad enough to exercise the full attack surface. If a category were missing from the probe library, the algorithm's inability to reach 1.0 sophistication would surface the gap.

It does not work well against **fail-closed systems** — which, by design, includes any properly configured production environment. The 1.40 ceiling is structural, not a matter of needing more generations or better mutations. If your security controls deny access when they fail (as they should), chaos-based evolution will never trigger a deviation.

It also does not work well when you need **depth over breadth**. The algorithm excels at discovering that an attack vector exists but doesn't pursue a single vector deeply enough to determine exploitability in realistic conditions. The DynamoDB scan succeeded, but the algorithm didn't try to exfiltrate specific PII fields or chain the scan results into a downstream attack.

And it doesn't work well when the **fitness function can't capture the vulnerability class**. Our function measures data exposure, deviation, and sophistication — but it doesn't measure timing attacks, race conditions, or information disclosure through error messages. The algorithm can only optimize what the fitness function measures. Designing the right fitness function is the real bottleneck, and it requires the same domain expertise that manual experiment design does.

## Limitations and open problems

**Fitness function design is the bottleneck.** The 3-dimensional scoring captured breadth and some depth, but missed important security dimensions. A more nuanced function might score partial deviations, credit creative attack chaining, or weight data sensitivity (PII vs. configuration files). But each additional dimension requires domain expertise to calibrate and increases the risk of reward hacking — programs that game the metric without improving actual security coverage.

**LocalStack is not real AWS.** LocalStack Pro with `ENFORCE_IAM=1` enforces IAM policies, but its fault injection behavior diverges from how AWS services fail in production. Real AWS services have complex failure modes — partial outages, regional degradation, eventual consistency delays — that LocalStack simulates imperfectly. Results from this environment should be treated as directional, not as evidence of real-world exploitability.

**The fail-closed assumption needs testing.** We assumed that the 0.0 deviation score reflects correct fail-closed behavior, but we didn't independently verify that LocalStack's IAM fault injection is equivalent to a real IAM outage. It's possible that the fault injection mechanism simply disables the service rather than simulating a realistic failure, which would make the deviation score meaningless rather than informative.

**Multi-island genetics prevented convergence but didn't solve the ceiling.** The four-island population with migration was designed to maintain diversity and prevent premature convergence on local optima. It succeeded — three different programs independently reached 1.40 through different paths. But diversity doesn't help when the ceiling is structural rather than a local optimum. The algorithm explored the space thoroughly and found the same wall from multiple directions.

**Cost efficiency vs. finding power.** At $0.93 for a full evolution run, the approach is remarkably cheap. But the cost scales with the number of probe functions and the complexity of the target environment. A real cloud environment with dozens of services, hundreds of IAM policies, and production-scale data would require a larger probe library, longer evolution runs, and more expensive evaluation infrastructure. The $0.93 number reflects the simplicity of the target, not a fundamental property of the approach.

## Conclusion

Treating security testing as an optimization problem — where a genetic algorithm evolves chaos experiments against a fitness function — produces surprisingly effective breadth-first exploration of attack surfaces. The system composed multi-vector attack chains, discovered credentials in unexpected locations, and achieved full coverage of seven security categories, all for under a dollar.

But the approach hits a hard ceiling when the target environment fails closed. The 1.40 plateau across all successful programs reveals a structural limit: chaos-based security evolution can discover what's accessible but cannot trigger deviation in systems that correctly deny access under stress. The real contribution here is not the 50% improvement over baseline — it's the methodology of decomposing security into measurable fitness dimensions and the discovery that one dimension (deviation) may be fundamentally unmeasurable in well-designed systems.

## Acknowledgements

SecurityEvolve was designed and built by Thariq Shihipar. The experiment framework builds on ShinkaEvolve for genetic programming, the Chaos Toolkit for experiment execution, and LocalStack Pro for the target environment. Waldemar Hummer and the LocalStack team's work on IAM enforcement made the fail-closed behavior analysis possible. Proposals were generated by Gemini 3.0 Flash and Claude Haiku 4.5, selected dynamically via UCB1 bandit. Thanks to Kelly Shortridge, whose *Security Chaos Engineering* shaped the experimental methodology, and to Casey Rosenthal and Neal Ford and Mark Richards, whose work on chaos engineering and architectural fitness functions provided the conceptual foundations.
