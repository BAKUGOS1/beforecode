# MiniCRM Example Pack

MiniCRM is a context-first BeforeCode example for a small B2B SaaS CRM used by service businesses to manage leads, follow-ups, deals, and team ownership.

This example is intentionally specific. It is not a random template. It shows how real project context turns into connected product, technical, database, API, QA, and implementation docs.

## Scenario

A small sales team is losing track of inbound leads from phone calls, website forms, WhatsApp, and referrals. They need a lightweight CRM that captures leads, assigns owners, tracks follow-ups, and shows which opportunities are likely to close.

## Example user flow

```text
New lead received
→ sales owner assigned
→ follow-up scheduled
→ notes added
→ lead qualified
→ converted to deal
→ deal stage updated
→ manager reviews pipeline
```

## Generated docs in this pack

| File | Purpose |
|---|---|
| `00-project-context.md` | Source-of-truth project context |
| `01-open-questions.md` | Questions that must be answered before build |
| `03-prd.md` | Product requirements with MVP scope |
| `07-trd.md` | Technical design and architecture notes |
| `09-qa-test-plan.md` | Critical QA workflows and acceptance checks |

## Why this example matters

This pack demonstrates the core BeforeCode principle:

> Capture context first. Mark missing details as TBD. Do not invent product behavior.

Use it as a reference when testing `npx beforecode start` or when showing how AI coding agents should receive structured project context.
