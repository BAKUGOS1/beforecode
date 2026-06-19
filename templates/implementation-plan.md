# Implementation Plan

## 1. Delivery Goal

Describe the release outcome and link approved source-of-truth documents.

## 2. Preconditions

List decisions, environments, credentials, designs, migrations, dependencies, and approvals required before work begins.

## 3. Delivery Strategy

Explain vertical slices, sequencing, feature flags, migration approach, parallel work, and how usable increments will be demonstrated.

## 4. Phases

### Phase 0 — Foundation

**Outcome:**  
**Dependencies:**  
**Tasks:**  
**Verification:**  
**Exit criteria:**

Repeat this structure for each phase. Prefer phases that deliver testable behavior instead of only frontend/backend layers.

## 5. Dependency Map

```text
Foundation → Identity/access → Core workflow → Integrations → Hardening → Release
```

Identify the critical path and work that can run safely in parallel.

## 6. Milestones

| Milestone | Deliverable | Owner | Target | Acceptance evidence |
|---|---|---|---|---|
|  |  |  |  |  |

## 7. Task Backlog

| ID | Requirement | Task | Dependency | Owner | Estimate | Status |
|---|---|---|---|---|---|---|
| IMP-001 | FR-001 |  |  |  |  | Not started |

## 8. Testing and Review Gates

Define required code review, design review, migration review, automated tests, manual QA, security checks, and performance checks for each phase.

## 9. Data and Migration Work

List schema changes, backfills, compatibility windows, test data, rollback/forward-fix, and verification queries.

## 10. Release Plan

Describe staging validation, feature flags, rollout percentage, monitoring, support readiness, communication, and rollback triggers.

## 11. Risks and Contingencies

| Risk | Signal | Prevention | Contingency | Owner |
|---|---|---|---|---|
|  |  |  |  |  |

## Definition of Done

- Requirement and acceptance criteria are satisfied
- Permission, loading, empty, error, and recovery states are handled
- Tests and observability are included
- Security and data constraints are enforced server-side
- Documentation, migrations, and release notes are updated
- No unresolved release-blocking defect remains
