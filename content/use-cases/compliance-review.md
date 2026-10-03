---
title: Compliance & Risk Review
description: Speed up document-heavy compliance checks by having an AI agent do the first pass, with every finding cited and signed off by a person.
icon: ShieldCheck
industries: financial-services, healthcare, professional-services
---
## The problem

Compliance and risk teams read a lot: contracts, policies, client files, marketing material, supplier questionnaires, regulatory updates. Each item must be compared against internal rules and external requirements, and the result must be documented in a way an auditor can follow. Much of that time goes into finding the relevant clause or paragraph rather than judging it. Reviewers also get tired, and consistency between two people reviewing similar documents is hard to guarantee.

Keyword search and rule engines handle the obvious cases but miss meaning: the same obligation can be worded ten ways. Fully manual review is thorough but slow, so teams sample instead of checking everything. Large language models are good at reading and comparing text, but they also make things up. A Stanford RegLab and HAI study of commercial legal research tools, which use retrieval-augmented generation and were marketed as avoiding hallucination, found they still hallucinated between 17% and 33% of the time, and the authors stress the need for professionals to supervise and verify outputs. For compliance work, that finding sets the design rule: the agent prepares, a human decides.

## How an AI agent handles it

- **Intake.** The agent receives a document or case, such as a new supplier contract or a client onboarding file, and identifies its type and which checklist or policy set applies.
- **Extract.** It pulls out the facts that matter: parties, dates, obligations, data transfers, jurisdictions, fees, missing sections.
- **Compare.** It checks each item against the relevant internal policy and regulatory text it has been given, and records for each point whether it appears satisfied, unclear or in conflict.
- **Cite.** Every finding quotes the exact passage from the document and the exact rule it was compared with, so the reviewer can verify in seconds.
- **Prioritise.** It ranks the case by apparent risk and flags what it could not assess, instead of guessing.
- **Hand over.** A named reviewer sees the draft assessment, accepts, edits or rejects each finding, and signs off. The decision, the reviewer and the agent's version are logged.

The agent never approves, rejects or files anything on its own.

## What we build

### Retrieval over rules and documents

We build a controlled library of your policies, regulatory texts and precedent decisions, with versions and effective dates. The agent answers only from that library and says so when the library does not cover a question.

### Review workflow with human sign-off

Findings appear in a review screen or in your existing case tool, side by side with the source passage. Sign-off is a required step, not an option, and reviewers can see what the agent was unsure about.

### Guardrails, logging and evaluation

We log inputs, retrieved passages, outputs and reviewer actions. Before go-live we test against a set of past cases your experts have already decided, and we repeat this whenever rules or models change. This is consulting and engineering work together.

### Private cloud deployment

Sensitive files stay in an environment you control, in a region that fits your data residency and outsourcing rules.

## Where it works best, and where it does not

It works best on repetitive, document-based first-pass checks with clear written criteria: contract clause checks, policy-conformance reviews, KYC file completeness, change monitoring of regulatory texts. It works poorly where the criteria are vague, where there are few precedents, or where the document quality is poor, such as bad scans.

Regulation shapes the design. In Switzerland, FINMA Guidance 08/2024 expects supervised institutions to keep an inventory of AI tools with risk classification, to test, evaluate and monitor accuracy continuously, and to set clear responsibilities. Where providers are external, institutions should address data protection, accuracy and confidentiality contractually. The FADP also gives people the right to request that an automated individual decision be reviewed by a human, and requires a data protection impact assessment in high-risk cases. Under the EU AI Act, whether a system counts as high-risk depends on its use. The Digital Omnibus moved the stand-alone high-risk obligations to 2 December 2027, while transparency duties such as telling people they are interacting with an AI began on 2 August 2026. Where Article 14 applies, overseers must be able to understand the system's limits, watch for automation bias, and override its output. We build for that standard even where it is not strictly required, and your legal counsel should confirm how the rules apply to you.

We would not automate final compliance decisions, regulatory filings or anything affecting a person's rights.

## How we measure it

- Agreement between the agent's findings and expert decisions on a held-out set of past cases.
- Missed-issue rate, tracked separately from false alarms, since a missed risk costs more.
- Share of citations that are correct and actually support the finding.
- Reviewer time per case and backlog age, compared with the pre-agent baseline.
- Reviewer override rate and its reasons, which show where the agent needs work.
- Audit readiness: whether any past decision can be reconstructed from the log.

## Sources

- [Hallucination-Free? Assessing the Reliability of Leading AI Legal Research Tools (Stanford RegLab and HAI, arXiv)](https://arxiv.org/abs/2405.20362)
- [FINMA Guidance 08/2024 summary, Lenz & Staehelin](https://www.lenzstaehelin.com/news-and-insights/browse-thought-leadership-insights/insights-detail/finma-issues-guidance-on-ai-use-in-financial-institutions/)
- [FINMA survey: artificial intelligence gaining traction at Swiss financial institutions](https://www.finma.ch/en/news/2025/04/20250424-mm-umfrage-ki/)
- [FDPIC: AI and data protection](https://www.edoeb.admin.ch/en/ai-and-data-protection)
- [EU AI Act Omnibus Agreement, Gibson Dunn](https://www.gibsondunn.com/eu-ai-act-omnibus-agreement-postponed-high-risk-deadlines-and-other-key-changes/)
- [EU AI Act Article 14: Human oversight (European Commission AI Act Service Desk)](https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-14)
