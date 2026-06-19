# Documentation Workflow

```text
Discover → Decide → Specify → Design → Verify → Build → Release → Learn
```

## 1. Discover

Use the Project Brief and Research Report to understand the problem, users, evidence, alternatives, constraints, and opportunity.

**Gate:** the problem is worth solving and the primary user is known.

## 2. Decide

Use business requirements, product principles, release scope, and decision records to lock objectives, trade-offs, MVP, and non-goals.

**Gate:** decision owners approve a bounded outcome.

## 3. Specify

Use the PRD/SRS to define journeys, roles, requirements, business rules, lifecycle states, data needs, edge cases, and measurable acceptance criteria.

**Gate:** expected behavior is testable without major guesswork.

## 4. Design

Use UX flows, UI system, TRD, database schema, API docs, and permission matrix to define how the experience and system satisfy requirements.

**Gate:** architecture, security, data, integrations, failure behavior, and operational ownership are understood.

## 5. Verify the Plan

Use review checklists and the QA plan to trace critical requirements into test coverage. Resolve conflicts before implementation makes them expensive.

**Gate:** product, engineering, design, QA, and relevant security/data owners accept the plan.

## 6. Build

Use the Implementation Plan for milestones and a Build Plan for each bounded phase. Implement vertical slices with tests and observability.

**Gate:** each phase produces demonstrable, verified behavior.

## 7. Release

Use the Deployment Plan and Launch Checklist for migration, staged rollout, monitoring, support, communication, and rollback.

**Gate:** go/no-go decision has evidence and accountable owners.

## 8. Learn and Update

Compare results with success metrics, user feedback, incidents, and operational data. Update requirements and decision records before the next cycle.

## Change Rule

When a decision changes, update the earliest source-of-truth document affected, then review downstream UX, technical, data, API, QA, and implementation documents for impact.
