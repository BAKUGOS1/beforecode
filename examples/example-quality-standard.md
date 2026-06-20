# Example Quality Standard

This standard defines what a professional BeforeCode example should contain.

## Purpose

Examples should prove that BeforeCode is not a random template generator. A reference example should show how a real project moves from context to implementation-ready documentation.

## Required Files for a Detailed Pack

| File | Purpose |
|---|---|
| `README.md` | Product summary, document map, workflow, and learning goal |
| `00-project-context.md` | Source-of-truth product context |
| `01-open-questions.md` | Unresolved decisions and missing context |
| `03-prd.md` | Product requirements, personas, MVP scope, acceptance criteria |
| `04-trd.md` | Architecture, stack, modules, constraints, risks |
| `05-data-model.md` or `05-erd.md` | Entities, relationships, table design, indexes |
| `06-api-spec.md` | API routes, actions, payloads, validation, errors |
| `07-ux-flows.md` | Screens, user journeys, states, empty/error flows |
| `08-permission-matrix.md` | Role access, ownership, destructive actions, audit rules |
| `09-qa-test-plan.md` | Critical workflows, negative tests, performance gates |
| `10-ai-handoff.md` | Agent instructions, allowed changes, blocked changes, stop conditions |

## Depth Target

| File Type | Minimum Standard |
|---|---|
| Context | clear idea, users, scope, non-goals, constraints |
| PRD | 7+ functional requirements with acceptance criteria |
| TRD | architecture, modules, data flow, risks, implementation order |
| Data/API | enough detail for a developer or AI agent to start safely |
| QA | P0/P1 workflows, negative tests, release gate |
| AI handoff | source-of-truth docs, allowed scope, blocked actions, verification |

## Writing Rules

- Use concrete domain language.
- Avoid empty generic phrases like “manage things” or “improve experience.”
- Add measurable targets where possible.
- Keep assumptions separate from confirmed facts.
- Every critical product behavior should be testable.
- If something is unknown, mark it as `TBD` and add an open question.

## Traceability Standard

A strong example should let readers trace:

```text
Requirement → Data model → API/action → Screen/flow → QA test → AI handoff instruction
```

## AI Agent Safety Standard

Every detailed example should tell an AI coding agent:

- which docs are source-of-truth
- what changes are allowed
- what changes are blocked
- when to stop and ask for review
- what tests or checks to run
- what output summary to provide
