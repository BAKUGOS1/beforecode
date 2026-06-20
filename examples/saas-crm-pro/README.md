# SaaS CRM Pro Reference Pack

SaaS CRM Pro is a detailed BeforeCode reference pack for a multi-tenant B2B CRM. It is inspired by real CRM planning patterns: PRD, TRD, ERD, API, permissions, UX, QA, implementation, and AI handoff.

## Product Summary

A lightweight CRM for small and mid-sized service businesses that need to capture leads, assign owners, schedule follow-ups, convert qualified leads into deals, and monitor pipeline health.

The example focuses on **clarity before code**. It avoids generic placeholder documentation and shows the level of detail an AI coding agent should receive before implementation.

## Primary Workflow

```text
Lead captured
→ owner assigned
→ follow-up scheduled
→ notes and activities logged
→ lead qualified
→ converted to deal
→ deal moves through pipeline
→ manager reviews performance
```

## Document Map

| File | Purpose |
|---|---|
| `00-project-context.md` | Source-of-truth context and constraints |
| `01-open-questions.md` | Decisions that must not be invented |
| `03-prd.md` | Product requirements and acceptance criteria |
| `04-trd.md` | Architecture, modules, risks, and implementation sequence |
| `05-erd.md` | Database entities, relations, indexes, and RLS notes |
| `06-api-spec.md` | API/action contracts and validation rules |
| `07-ux-flows.md` | Screens, flows, states, and edge cases |
| `08-permission-matrix.md` | Role access rules and audit expectations |
| `09-qa-test-plan.md` | Regression suite, negative tests, and release gates |
| `10-ai-handoff.md` | Instructions for AI coding agents |

## What This Example Teaches

- How to define multi-tenant SaaS scope before coding.
- How to connect PRD requirements to database and API design.
- How to document archive-first delete, ownership, duplicate checks, and role access.
- How to prepare QA tests that map to real workflows.
- How to give AI coding agents safe implementation boundaries.

## Suggested Stack

| Layer | Recommendation |
|---|---|
| Frontend | Next.js with JavaScript/JSX |
| UI | shadcn/ui, light mode, responsive tables |
| Forms | React Hook Form + Zod |
| Data | TanStack Query |
| Backend | Next.js route handlers or server actions |
| Database | Supabase Postgres |
| Auth | Supabase Auth + JWT |
| Security | Supabase RLS with organization-level isolation |

## Recreate With BeforeCode

```bash
npx beforecode start --from examples/saas-crm-pro/00-project-context.md
```

Then review the generated docs against this reference pack.
