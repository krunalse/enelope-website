---
title: Intelligent Document Processing
description: Turn invoices, contracts, forms and emails into checked, structured data in your systems with a human reviewing only the exceptions.
icon: FileText
industries: financial-services, logistics, real-estate
---
## The problem

Business still runs on documents: invoices, delivery notes, bills of lading, loan files, tenancy agreements, insurance forms. Someone has to read each one, find the relevant fields and type them into an ERP, case system or spreadsheet. The work is repetitive, slow and error-prone, and the volume rarely falls. Classic OCR and template-based extraction help only for documents that look exactly the same every time. A new supplier layout, a scan at an angle or a contract with clauses in a different order breaks the template, and someone has to maintain the templates.

Exceptions are where the cost sits. Docsumo reports Ardent Partners 2025 figures of an average cost of $9.84 per invoice processed and 18.4% of invoices hitting an exception. Those are survey-based averages from one analyst and your own numbers will differ, but they point to the pattern: straightforward documents are cheap, and the expensive ones are those needing a person to chase a missing purchase order or interpret a clause. The same article, citing Gartner, says 70% to 90% of organisational data is unstructured. Documents are not a niche problem; they are most of the data.

## How an AI agent handles it

Take an inbound supplier invoice arriving by email.

- **Receive and classify.** The agent picks up the email and attachments, and identifies each as an invoice, credit note, reminder or something else.
- **Read.** A vision-capable model reads the layout, including tables and handwriting where present, and extracts the fields you define: supplier, dates, line items, tax, totals, payment details.
- **Validate.** It checks the result against rules and reference data: do line items add up to the total, does the supplier exist, is there a matching purchase order and delivery, is the bank account the same as last time.
- **Decide.** Documents that pass all checks go straight through. Documents with a low-confidence field or failed rule are routed to a review queue, with the doubtful field highlighted on the original page.
- **Post.** Approved data is written to your ERP, case management or document system through its interface, and the original is archived with the extracted data and an audit trail.
- **Learn.** Reviewer corrections are stored and used to improve prompts, rules and test sets.

The same pattern applies to a loan application pack, a customs declaration or a rental contract, with different fields and checks.

## What we build

### Extraction and validation pipelines

We combine layout-aware extraction, language models for varied or free-text documents and conventional business rules for the arithmetic and lookups, where deterministic code is better than a model. Each field carries a confidence level and a pointer to its location in the source.

### Review interface and exception handling

A simple queue where people confirm or fix flagged fields beside the original document. Reviewer effort goes to the doubtful items only. Every change is logged.

### System integrations and agents

Connectors to your ERP, DMS, email inbox and case tools, so the agent also performs the follow-up: asking a supplier for a missing document, updating a record, or sending a summary to the case owner.

### Governance, evaluation and cloud deployment

We assemble a labelled sample of your real documents and measure field-level accuracy before anything is automated. Processing runs on cloud infrastructure in your chosen region with encryption and retention rules. For financial institutions, FINMA Guidance 08/2024 expects AI inventories, regular testing and monitoring, and attention to data quality, and says responsibility for decisions cannot be delegated to AI or third parties. We design with those expectations in mind, and consulting covers choosing which document types to start with.

## Where it works best, and where it does not

It works best with high volumes of semi-structured documents, clear field definitions, and a system of record to validate against. Starting with one document type, measuring it, then widening scope is more reliable than a general launch.

It is weaker for documents where a single misread number has serious consequences and no downstream check exists. Extraction models can misread similar characters or invent a plausible value for an illegible field, so we require validation rules and a human review for low confidence or high value items. Poor scan quality, missing reference data and unclear business rules limit results regardless of the model. Where document volume is low, the setup effort may not pay back, and a simple manual process is the better answer. Personal data in documents also needs a clear legal basis and retention policy under the Swiss Data Protection Act.

## How we measure it

- Field-level accuracy, measured against a human-labelled sample, split by document type and supplier or template.
- Straight-through rate: share of documents processed with no human touch, alongside the error rate within that group, since a high rate is only good if the results are right.
- Exception rate and exception causes.
- Time from receipt to posting, and reviewer time per document.
- Corrections per reviewer, to find which fields or layouts keep failing.
- Downstream errors found later, such as payment mismatches or rejected filings.
- Cost per document using your own cost data, compared with the baseline before launch.

## Sources

- [Intelligent document processing statistics, Docsumo (reports Ardent Partners 2025 and Gartner 2026 figures)](https://www.docsumo.com/blog/intelligent-document-processing-statistics)
- [FINMA guidance on governance and risk management when using AI, Pestalozzi](https://pestalozzilaw.com/en/insights/news/legal-insights/finma-guidance-on-governance-and-risk-management-when-using-ai/)
- [AI and data protection, Swiss FDPIC](https://www.edoeb.admin.ch/en/ai-and-data-protection)
