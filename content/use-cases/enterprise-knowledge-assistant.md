---
title: Enterprise Knowledge Assistant
description: Let employees ask questions in plain language and get sourced answers from your own documents, policies and systems.
icon: BookOpen
industries: professional-services, manufacturing, healthcare
---
## The problem

In most organisations, the knowledge people need exists but is hard to reach. It sits in intranet pages, shared drives, PDFs, email threads, ticket histories and the heads of a few long-serving colleagues. Staff either interrupt those colleagues, search several systems one after another, or give up and act on a guess. Keyword search helps only if you already know the right term, and it returns documents, not answers. Wikis go stale because maintaining them is nobody's main job.

The raw material is largely unstructured. Gartner's figure, as reported by Docsumo in 2026, is that 70% to 90% of organisational data is unstructured, such as documents and multimedia. A 2026 Harvard Business Review Analytic Services survey sponsored by Hyland, also reported by Docsumo, found that 39% of respondents considered their unstructured data AI-ready, against 65% for structured data. A general-purpose chatbot does not solve this, because it knows nothing about your internal procedures and will answer anyway. The approach that fits is retrieval-augmented generation: the original paper by Lewis and colleagues describes combining a language model with a retrievable index of documents, in part to provide provenance for answers and to allow knowledge to be updated without retraining.

## How an AI agent handles it

Take an engineer asking, "What is the approved torque procedure for this assembly, and did it change last year?"

- **Interpret.** The agent identifies what is being asked, which product or site is meant and what the user is allowed to see.
- **Retrieve.** It searches an index of your documents using both meaning and exact terms such as part numbers, and filters by the user's access rights before anything reaches the model.
- **Check.** It compares passages, notices versions and effective dates, and flags where two documents disagree.
- **Answer.** It writes a short answer from the retrieved passages only, with links to the source documents and page references so the person can verify.
- **Act, if asked.** With read-only tools it can look up a record in an ERP, quality system or ticket tool, or draft a summary of a long document.
- **Decline and route.** If nothing relevant is found, it says so and suggests who owns the topic. For questions with safety, medical or legal consequences, it presents sources and leaves the decision to a qualified person.

## What we build

### Retrieval over your documents

We connect to the places your knowledge lives (document stores, wikis, ticketing, email archives where permitted), clean and chunk the content, and keep the index in sync as documents change. Document ownership, version and validity dates are stored as metadata so that outdated material can be down-ranked or excluded.

### Access control and tool integrations

The assistant respects the permissions of the person asking. Optional read-only integrations with business systems let it answer with live data. We scope each integration narrowly and log every call.

### Guardrails and compliance

Answers must be supported by retrieved text and show their sources. The FDPIC states that Swiss data protection law applies directly to AI-supported processing and that organisations must make the purpose, functionality and data sources of such processing transparent. For healthcare and other sensitive data we advise on data minimisation, where the system runs and who can see logs, and we involve your data protection officer early.

### Evaluation and cloud deployment

We build a question set with your subject experts, covering common questions, tricky edge cases and questions that should be refused. We run it on every change to the index or prompts. The assistant is deployed on cloud infrastructure in the region you specify, with monitoring and usage reporting. Our consulting work often starts with an audit of which knowledge sources are worth indexing.

## Where it works best, and where it does not

It works best when there is a sizeable body of written material, many people asking overlapping questions, and a clear owner for content quality. Typical wins are onboarding, internal policy and IT questions, technical documentation, tender and proposal reuse, and procedure lookup.

It does not fix poor content. If documents are outdated, duplicated or contradictory, retrieval will surface that mess faster. Scanned files with poor quality need extraction work first. Knowledge that was never written down cannot be retrieved. Hallucination is reduced by grounding but not eliminated, so we do not recommend using the assistant as the sole basis for clinical, safety-critical or legally binding decisions. Permissions are another risk: indexing everything without access controls can expose confidential files to the wrong people.

## How we measure it

Metrics are agreed upfront and compared against a baseline taken before launch.

- Answer accuracy and groundedness on the expert-built question set, and on sampled live questions.
- Citation correctness: whether the linked passage actually supports the statement.
- Coverage: share of questions where the assistant finds relevant material rather than declining.
- Adoption and repeat use by team.
- Time to find an answer, measured with short user studies or surveys rather than assumed.
- Content gaps found, meaning the questions that fail and the documents that should exist, which feed back to the content owners.
- Access-control tests: deliberate attempts to retrieve restricted content.

## Sources

- [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks, Lewis et al. (arXiv)](https://arxiv.org/abs/2005.11401)
- [Intelligent document processing statistics, Docsumo (reports Gartner and HBR Analytic Services figures)](https://www.docsumo.com/blog/intelligent-document-processing-statistics)
- [AI and data protection, Swiss FDPIC](https://www.edoeb.admin.ch/en/ai-and-data-protection)
