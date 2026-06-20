# BeforeCode Reference Examples

These folders are **reference-grade documentation packs**, not tiny samples. Each pack demonstrates how BeforeCode should turn a real product idea into a structured build handoff.

## Example Gallery

| Example | Best for | What it demonstrates |
|---|---|---|
| [SaaS CRM Pro](saas-crm-pro/README.md) | B2B SaaS, dashboards, multi-tenant CRM | PRD, TRD, ERD, API, permissions, QA, AI handoff |
| [AI Video Editor](ai-video-editor/README.md) | AI media products, editors, render pipelines | agent workflow, Temporal-style jobs, rendering, storage, QA |
| [Browser QA Agent](browser-qa-agent/README.md) | QA automation, Playwright agents, browser testing | safe agent boundaries, report schema, evidence capture, evaluation |

## How to read these examples

Start with the context file, then follow the document chain:

```text
00 Project Context
→ 01 Open Questions
→ PRD / TRD / ERD / API / UX / QA
→ AI Handoff
→ Implementation Plan
```

## Quality Standard

A good BeforeCode example should include:

- Real project context, not generic filler.
- Clear target users, roles, and business rules.
- Explicit MVP and out-of-scope sections.
- Requirements that can be tested.
- Architecture decisions and tradeoffs.
- Database or data model design.
- API contracts or action boundaries.
- UX flow and screen inventory.
- QA test plan with release gates.
- AI handoff rules with stop conditions.

## Documentation rule

If a fact is not confirmed, do not invent it. Mark it as `TBD` or add it to open questions.
