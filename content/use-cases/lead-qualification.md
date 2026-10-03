---
title: Lead Qualification & Sales Assistants
description: Respond to every enquiry within minutes, qualify it against your criteria and pass the promising ones to sales with full context.
icon: Target
industries: real-estate, professional-services, retail-ecommerce
---
## The problem

Enquiries arrive at all hours through web forms, email, chat and listing portals, and the people who answer them are often busy with other work. Speed matters more than most teams assume. A 2011 Harvard Business Review study by Oldroyd, McElheran and Elkington audited 2,241 US companies using real web leads. As reported in a summary of the study, 37% responded within an hour, 24% took more than a day and 23% never responded; firms that tried to contact a lead within an hour were nearly seven times as likely to qualify it as firms that tried an hour later. The data is from 2011 and from US firms, so treat the exact figures as indicative, but the direction matches what most sales teams see: interest fades fast.

The usual fixes have limits. An auto-reply email says "we received your request" and nothing more. A static form with required fields discourages people from filling it in and tells you little about intent. Scoring rules based on form fields and page visits are blunt, and sales staff end up triaging a mixed inbox by hand, spending time on enquiries that were never going to convert while the good ones wait.

## How an AI agent handles it

Take a property enquiry, a consulting request or a retail trade-account request arriving outside office hours.

- **Capture.** The agent receives the enquiry from any channel and matches it to an existing contact or deal in your CRM, to avoid asking known questions twice.
- **Respond.** It replies within minutes with a relevant, accurate answer, using your approved material for listings, services, pricing ranges and availability.
- **Qualify.** It asks the few questions your team actually uses, such as budget range, timing, location, size or decision process, in natural conversation rather than a long form. It records the answers as structured fields.
- **Score and decide.** It applies your criteria, with the reasoning written down: strong fit, possible fit, not a fit, or unclear. It does not discard leads silently. Unclear and not-a-fit cases get a polite answer and a sensible route, for example a resource or a referral.
- **Book or hand over.** For good fits it proposes meeting slots from the sales calendar, or alerts the right person with a summary: who they are, what they asked, what was said and what is missing.
- **Follow up.** If there is no reply, it sends a limited number of reminders within rules you set, and stops when asked.
- **Prepare.** For sales staff it can summarise a company or past conversations before a call and draft follow-up emails for approval.

## What we build

### Conversational qualification agent

A chat or email agent tuned to your offer and tone, grounded in your listings, service descriptions and FAQs. It states clearly that it is an automated assistant and gives an easy route to a person.

### CRM and calendar integrations

Connections to your CRM, calendar and email so that data is written once, in the right fields, and the sales team continues to work in the tools they already use. Each write is logged and reversible.

### Scoring logic and guardrails

Criteria are explicit and reviewable, agreed with your sales leadership during a short consulting phase. The agent does not make price commitments, promise availability that is not confirmed or give binding advice. The FDPIC states that people have a right to know whether they are speaking with a machine and may ask for human review of automated individual decisions, and that Swiss data protection law applies directly to AI processing, so we build in disclosure, consent handling and data retention rules.

### Evaluation and cloud deployment

We test the agent on past enquiries, compare its qualification with your sales team's judgement, and review live conversations in the first weeks. It runs on cloud infrastructure in your chosen region with monitoring.

## Where it works best, and where it does not

It works best where enquiry volume is steady, the first answers are fairly standard, qualification criteria can be written down and a quick reply has commercial value. Property viewings, appointment-based services and trade or B2B enquiries are typical.

It is a poor fit for high-value, relationship-led sales where the first contact must be personal, or where your criteria are mostly intuition. If you cannot describe a good lead, an agent cannot learn it from nowhere, and a poorly specified score will filter out good prospects without anyone noticing. Misstated prices or availability are the main risk, so those answers come from live data or are avoided. Outreach to people who have not enquired is a separate legal question, and we do not build cold-contact automation without a clear legal basis.

## How we measure it

- Time to first response, compared with your baseline.
- Qualification agreement: how often sales staff agree with the agent's rating on a reviewed sample, including leads it marked as not a fit.
- Conversion at each stage: enquiry to conversation, to meeting, to opportunity, to close, tracked over a long enough period to be meaningful.
- Booked meeting and no-show rates.
- Share of enquiries needing human intervention, and the reasons.
- Sales time spent on admin and triage, from short surveys or time samples.
- Complaints or opt-outs, as a check that speed is not costing goodwill.

## Sources

- [The Short Life of Online Sales Leads, Harvard Business Review (2011)](https://hbr.org/2011/03/the-short-life-of-online-sales-leads)
- [Lead response time statistics summary of the HBR study, AInora](https://ainora.lt/blog/lead-response-time-statistics-every-study-2026)
- [AI and data protection, Swiss FDPIC](https://www.edoeb.admin.ch/en/ai-and-data-protection)
