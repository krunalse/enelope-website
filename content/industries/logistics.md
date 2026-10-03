---
title: Logistics & Supply Chain
description: AI agents that read shipping documents, answer status requests and prepare customs data so dispatchers spend their time on exceptions.
icon: Truck
---
## Where AI actually helps in logistics and supply chain

Logistics runs on paperwork and on small decisions made many times a day. Freight and logistics operations are document-heavy: according to a McKinsey-cited overview, bills of lading, purchase orders, packing lists, customs declarations and certificates of origin are typically read, validated and keyed into systems by people. That is slow, and a single typo can hold a shipment at the border.

Swiss customs is also in motion. The Federal Office for Customs and Border Security (FOCBS) is replacing e-dec with its Passar system as part of the DaziT programme. Since 1 January 2026 only Passar can be used for export declarations, and the standard import part (Passar 2.0) is in pilot operation from the second quarter of 2026, with other companies staying on e-dec Import until it opens more widely. Forwarders and shippers therefore have to adapt their data flows while keeping daily operations running.

The third pain point is plain communication. Dispatchers, customer service and carriers spend hours on "where is my shipment" calls, quote requests and delay notices. These are repetitive, rule-based and time-sensitive, which makes them a good fit for software that can read, look up and draft, with a person approving anything that matters.

## What we build

### Document intake agent
An agent that reads incoming PDFs, scans and emails (delivery notes, commercial invoices, packing lists, CMRs), extracts the fields you care about and checks them against the order in your TMS or ERP. Mismatches are flagged for a person instead of being silently corrected.

### Shipment status chatbot
A chatbot for customers and carriers that answers status, ETA and proof-of-delivery questions in German, French, Italian or English by querying your tracking data. When it cannot answer, it hands over to a dispatcher with the conversation attached.

### Customs data preparation
A workflow that assembles draft declaration data from invoices and shipping documents, for example tariff number suggestions and value and weight checks, and queues it for a customs specialist to review before anything is submitted through Passar or e-dec. The agent prepares; the specialist decides.

### Exception and delay triage
An agent that watches for late pickups, missed scans and customer-stated deadlines, ranks them by impact and drafts the notification to the customer. Dispatchers see a short, ordered list rather than an inbox.

### Cloud integration layer
Most of the value depends on clean access to your systems. We set up the cloud infrastructure that connects the agents to your TMS, WMS, email and carrier APIs, with logging and access control built in.

## Compliance and data considerations

Shipping documents contain names, addresses and delivery details of individuals, so the revised Swiss Federal Act on Data Protection (nFADP/revDSG), in force since 1 September 2023, applies. The Federal Data Protection and Information Commissioner (FDPIC) states that the act is directly applicable to AI-supported processing and asks for transparency about purpose, functionality and data sources. Where you serve EU customers, the GDPR applies in parallel.

Under the EU AI Act, the transparency duties for chatbots (Article 50) have applied since 2 August 2026: users must be told they are talking to an AI unless that is obvious. We build that disclosure into every customer-facing bot.

Customs filings are legally binding. We therefore design customs workflows so that a named person approves each declaration, and we keep an audit log of what the agent extracted, what it suggested and who signed off. Hosting can be in Switzerland or the EU, and we do not send your documents to services that train on them.

## How an engagement starts

We begin with a short scoping conversation and pick one workflow, for example document intake for a single customer or lane. We run it as a small pilot against your real documents, measure error rates and handling time against how you work today, and only then discuss extending it. If the numbers do not justify more, we will say so.

## Sources

- [Code and cargo: How AI could change freight logistics (McKinsey)](https://www.mckinsey.com/industries/logistics/our-insights/code-and-cargo-how-ai-could-change-freight-logistics)
- [Passar Import (Passar 2.0), FOCBS](https://www.bazg.admin.ch/en/passar-import)
- [Passar 1.0: Switzerland's new goods traffic system (KPMG)](https://kpmg.com/ch/en/insights/taxes/indirect-tax-passar-1.html)
- [AI and data protection (FDPIC)](https://www.edoeb.admin.ch/en/ai-and-data-protection)
- [EU AI Act Article 50 Transparency Obligations Go Live (Baker Botts)](https://www.bakerbotts.com/thought-leadership/publications/2026/september/eu-ai-act-article-50-transparency-obligations-go-live)
