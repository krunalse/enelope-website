---
title: IT & HR Helpdesk Agents
description: Answer routine employee IT and HR requests instantly from your own policies and systems, and route the hard cases to the right person.
icon: LifeBuoy
industries: telecom, financial-services, manufacturing
---
## The problem

Internal helpdesks tend to answer the same questions all day: how to reset an access right, where the travel policy lives, how many leave days remain, which form a new starter needs. The answers usually exist, but they are spread across wikis, PDFs, ticket histories and people's heads. Staff wait for a reply, and the specialists who could handle exceptions spend their time on repeats.

A classic rule-based bot only helps when the question matches a pre-written flow. Employees phrase things in their own words, mix topics ("my laptop is slow and I need a letter for my landlord"), and policies change faster than decision trees get edited. Manual handling copes with that variety but does not scale. Gartner's June 2025 research also warns against the opposite mistake: it predicts that over 40% of agentic AI projects will be cancelled by the end of 2027, and says most current projects are early experiments that are often misapplied. It also notes that of the thousands of vendors claiming agentic products, only around 130 offer real agentic features. A helpdesk agent therefore needs a clear scope and measurable goals from day one.

## How an AI agent handles it

A well-scoped helpdesk agent works as a short loop that ends in either a resolved request or a clean hand-over.

- **Perceive.** The employee writes in chat, Teams, Slack or email. The agent identifies who they are through your single sign-on, and what they are asking for.
- **Classify.** It decides whether this is a question (answer from documents), an action (reset, order, request), or something sensitive (a grievance, a payroll dispute, a security incident).
- **Retrieve.** For questions, it searches the current versions of your policies, runbooks and past resolved tickets, and answers with a link to the source passage.
- **Act.** For actions, it calls your systems through narrow, permissioned tools: create or update a ticket in your service management tool, check a request status, trigger an approved password or access workflow, look up a leave balance in the HR system.
- **Confirm.** Before any change, it states what it is about to do and asks the employee to confirm.
- **Hand over.** If the answer is not in the sources, the request is sensitive, or the employee asks for a person, it opens a ticket with the full conversation summarised, so nobody has to ask the same questions again.

## What we build

### Retrieval over your documents

We index your policies, IT runbooks, onboarding guides and resolved tickets, respecting existing access rights, so an employee only sees what they are allowed to see. Answers carry citations, and stale or conflicting documents are flagged to the owner rather than quietly merged.

### Tool integrations

The agent connects to your ticketing, identity and HR systems through a small set of explicit actions. Each action has its own permissions, input checks and an audit log. This is where our AI agent work and your existing systems meet.

### Guardrails and escalation

Topics such as discipline, health, pay disputes and security incidents are routed to humans by design. The agent states clearly that it is an AI, which also matches the Swiss data protection authority's position that people interacting with a language model are entitled to know they are talking to a machine.

### Deployment and consulting

We run the agent on cloud infrastructure in the region your data policy requires, and we start with a short consulting phase to pick the five or ten request types where automation is genuinely worthwhile.

## Where it works best, and where it does not

It works best when you have a stable body of written policy, a ticketing system with an API, and a high volume of repeat requests. It works poorly when the knowledge lives only in people's heads: the agent cannot retrieve what was never written down, so someone has to own and maintain the content it draws on.

Risks are real. The agent can state a policy wrongly or apply an outdated version. In financial services, FINMA Guidance 08/2024 expects institutions to keep an AI inventory with risk classification and to test and monitor accuracy continuously, and its 2025 survey named data quality and accuracy among the top concerns. Where the agent touches employee personal data, the Swiss FADP applies, and a data protection impact assessment may be needed for higher-risk processing. We would not automate decisions that materially affect an employee, such as sanctions or pay changes, without human review.

## How we measure it

We would agree the metrics with you before launch and track them against a baseline taken from your current ticket data.

- Share of requests resolved without a person, counted only when the employee confirms the issue is solved.
- Answer accuracy, scored by your subject-matter owners on a sampled, regularly refreshed test set.
- Escalation quality: how often a hand-over arrives with enough context to act on.
- Time to first useful response and time to resolution, by request type.
- Citation coverage and the number of stale or conflicting documents found and fixed.
- Employee satisfaction and the rate of repeat contacts for the same issue.

## Sources

- [Gartner Predicts Over 40% of Agentic AI Projects Will Be Canceled by End of 2027, summarised by MarTech](https://martech.org/gartner-40-of-agentic-ai-projects-will-fail-making-humans-indispensable/)
- [FINMA Guidance 08/2024 summary, Lenz & Staehelin](https://www.lenzstaehelin.com/news-and-insights/browse-thought-leadership-insights/insights-detail/finma-issues-guidance-on-ai-use-in-financial-institutions/)
- [FINMA survey: artificial intelligence gaining traction at Swiss financial institutions](https://www.finma.ch/en/news/2025/04/20250424-mm-umfrage-ki/)
- [FDPIC: AI and data protection](https://www.edoeb.admin.ch/en/ai-and-data-protection)
