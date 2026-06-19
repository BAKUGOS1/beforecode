# Getting Started

BeforeCode is modular. A weekend project should not complete the same document set as a regulated multi-tenant platform.

## 1. Choose the Smallest Useful Track

### Lean track

```text
Project Brief → PRD → Build Plan → QA Checklist
```

Use for a personal project, prototype, or small internal tool.

### Product track

```text
Brief → Research → PRD → UX → TRD → Data/API → QA → Implementation
```

Use for SaaS, CRM, marketplace, mobile, and team products.

### High-risk track

Add BRD/SRS, permission matrix, decision records, threat model, migration, evaluation, and deployment planning when security, money, sensitive data, automation, or compliance raises the cost of mistakes.

## 2. Create a Project Docs Folder

```text
your-project/
  docs/
    01-project-brief.md
    02-research-report.md
    03-prd.md
    04-ux-flows.md
    05-trd.md
    06-database-schema.md
    07-api-documentation.md
    08-qa-test-plan.md
    09-implementation-plan.md
```

Copy from the [template catalog](../templates/README.md).

## 3. Work in Decision Order

1. Confirm the problem and primary user.
2. Research facts that affect product or architecture decisions.
3. Lock MVP and non-goals.
4. Define workflows, roles, states, and acceptance criteria.
5. Design architecture, data, API, security, and failure behavior.
6. Map requirements to QA coverage.
7. Convert the approved specification into phased implementation.

Do not let later documents silently change earlier decisions. Update the source document and record important trade-offs.

## 4. Make Requirements Testable

Weak:

```text
The dashboard should load quickly.
```

Stronger:

```text
For the expected MVP dataset, the authenticated dashboard should become usable within three seconds at the 95th percentile in the staging performance test.
```

## 5. Maintain Traceability

Use stable IDs such as `BR-001`, `FR-001`, `NFR-001`, and `TC-001`. Link each critical requirement to architecture, API/data behavior, implementation tasks, and tests.

## 6. Review Before Building

Use the [PRD](../checklists/prd-review-checklist.md), [technical](../checklists/technical-readiness-checklist.md), and [pre-build](../checklists/pre-build-checklist.md) checklists.

## 7. Hand Off Safely

For AI coding tools, use the [AI coding handoff guide](ai-coding-handoff.md). Humans still approve scope, permissions, destructive actions, security, and release decisions.

## 8. Learn From Complete Packs

- [MiniCRM SaaS CRM](../examples/saas-crm/README.md)
- [TaskPilot AI Agent](../examples/ai-agent/README.md)

## Done Means

Your docs are ready to build when a developer or AI coding agent can explain what to build, what not to build, how the system should behave, how it can fail, who can do what, and how completion will be verified—without inventing major decisions.
