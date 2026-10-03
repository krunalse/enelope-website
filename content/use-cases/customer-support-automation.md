---
title: Customer Support Automation
description: Answer routine customer questions instantly and give your support team the time and context to handle the hard cases.
icon: Headset
industries: retail-ecommerce, telecom, financial-services
---
## The problem

Most support queues are dominated by a small set of repeat questions: where is my order, why is my bill higher, how do I change my plan, what does this fee mean. Each one is simple, but together they keep customers waiting and keep experienced staff busy with work that does not use their skills. Rule-based chatbots were supposed to fix this. In practice they match keywords to a fixed decision tree, so they fail the moment a customer phrases something unexpectedly or asks two things at once, and the customer ends up repeating everything to a human.

Language models make bots far more flexible, but they bring a different risk: a fluent answer that is simply wrong. In the 2024 case Moffatt v. Air Canada, a British Columbia tribunal held the airline responsible for incorrect bereavement-fare information its website chatbot gave a customer, rejecting the argument that the chatbot was a separate entity responsible for its own statements (as summarised by the Data & Society research project). The lesson is not to avoid AI. It is that a support agent must be grounded in your actual policies and must be built so that its statements are your statements.

There is also evidence that AI helps human agents. In a field study of 5,179 customer support agents, Brynjolfsson, Li and Raymond found that access to a generative AI assistant raised the number of issues resolved per hour by 14% on average, with much larger gains for less experienced staff and little change for the most experienced. That is an argument for designing the system around the whole support team, not only around a customer-facing bot.

## How an AI agent handles it

A support agent works through a conversation in a loop, not a single prompt.

- **Perceive.** It reads the customer message, the channel (chat, email, web form) and any identity the customer has already verified.
- **Understand.** It classifies the intent, pulls out details such as order number or contract, and notes sentiment or urgency.
- **Look up.** It retrieves the relevant policy or help article from your approved knowledge base and calls read-only tools, for example the order system, billing system or CRM, to get the customer's actual data.
- **Decide.** If the answer is clearly supported by the retrieved material, it responds and cites which policy it used. If the material is missing or conflicting, it says so instead of guessing.
- **Act.** For low-risk actions with explicit rules, such as resending an invoice or updating a delivery address, it calls the relevant system. Anything involving money, contract changes or exceptions is proposed, not executed, until a person approves.
- **Hand over.** It escalates to a human when the customer asks, when confidence is low, when the topic is on a sensitive list (complaints, vulnerable customers, legal threats), or after repeated failed attempts. The handover includes a summary, the data already gathered and the draft reply, so the customer does not start over.

## What we build

### Grounded chatbots and AI agents

We build the conversational layer on retrieval over your own documents: help centre, product data, terms and internal procedures. Answers are tied to source passages, and the agent is instructed to decline when no source supports an answer. Where useful, the same agent also supports your staff with suggested replies and conversation summaries.

### Tool integrations

The agent connects to your helpdesk, CRM, order and billing systems through narrow, permissioned interfaces. Each tool has defined inputs, limits and an audit log, so you can see what the agent looked up or changed and why.

### Guardrails and compliance

We design topic restrictions, approval steps for sensitive actions and clear disclosure that the customer is talking to a machine. The Swiss Federal Data Protection and Information Commissioner (FDPIC) states that the Data Protection Act applies directly to AI-supported processing and that people have a right to know whether they are corresponding with a machine and to ask for human review of automated individual decisions. For financial institutions, FINMA Guidance 08/2024 states that responsibility for decisions cannot be delegated to AI or third parties, which shapes where a human stays in the loop.

### Evaluation and cloud deployment

Before launch we build a test set from your real, anonymised tickets and measure the agent against it. After launch we keep sampling conversations. We deploy on cloud infrastructure in the region you require, with access control and logging, and consulting is available to decide which ticket types to automate first.

## Where it works best, and where it does not

It works best when a large share of contacts are repetitive, the answers live in written policy, and the backend systems have usable interfaces. Clean, current documentation matters more than the choice of model: if your help articles contradict each other, the agent will too.

It is a poor fit where each case needs judgement or empathy, such as bereavement, serious complaints or financial hardship, or where policies change daily without anyone updating the source. Hallucination cannot be reduced to zero, so we limit what the agent may state and do, and we keep a human route visible at all times. Do not use it to hide the contact options of customers who want a person.

## How we measure it

We agree metrics before launch and report them from the start. We do not promise numbers in advance, because they depend on your ticket mix.

- Containment or resolution rate: conversations resolved without human involvement, checked by sampling, not only by the customer closing the chat.
- Answer accuracy: share of sampled answers that a reviewer judges correct and policy-compliant.
- Escalation rate and escalation quality: how often and why the agent hands over, and whether the human needed to re-ask anything.
- Handling time and first response time, for both bot and human-handled tickets.
- Customer satisfaction on automated versus human conversations.
- Repeat contact within a set period, which exposes answers that seemed fine but did not solve the problem.

## Sources

- [Generative AI at Work (NBER Working Paper 31161), Brynjolfsson, Li, Raymond](https://www.nber.org/papers/w31161)
- [Moffatt v. Air Canada case summary, Data & Society](https://data-en-maatschappij.ai/en/publications/canada-moffatt-v-air-canada-bccrt)
- [AI and data protection, Swiss FDPIC](https://www.edoeb.admin.ch/en/ai-and-data-protection)
- [FINMA guidance on governance and risk management when using AI, Pestalozzi](https://pestalozzilaw.com/en/insights/news/legal-insights/finma-guidance-on-governance-and-risk-management-when-using-ai/)
