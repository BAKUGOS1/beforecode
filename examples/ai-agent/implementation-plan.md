# TaskPilot Implementation Plan

## Phase 0: Foundations

- Lock MVP scope, autonomy levels, risk classes, and state machine
- Initialize web, API, worker, migrations, tests, and CI
- Establish structured logging, trace IDs, and configuration rules

Exit: reproducible local stack and green baseline pipeline.

## Phase 1: Identity, Tenancy, and Run Service

- Add users, workspaces, roles, runs, steps, events, and budgets
- Implement legal state transitions and optimistic concurrency
- Add run creation, status, cancellation, and timeline APIs

Exit: tenant isolation and state tests pass.

## Phase 2: Queue, Workers, and Checkpoints

- Add durable queue, leases, heartbeats, and worker recovery
- Integrate LangGraph checkpointer
- Add duplicate-delivery and crash tests

Exit: interrupted run resumes without repeating completed state.

## Phase 3: Model Gateway and Planning

- Add provider adapter and structured output
- Implement intake, risk, clarification, planning, and budget accounting
- Version prompts and model routes

Exit: planning component evaluation meets threshold.

## Phase 4: Policy and Approval

- Build deterministic policy engine
- Add tool risk registry and approval records
- Implement approve, reject, edit, expire, and resume flows

Exit: high-impact actions cannot execute without a current approval.

## Phase 5: Tool Gateway

- Implement calculator, public research, workspace read/write, and artifact export
- Add schemas, credential resolution, idempotency, action ledger, redaction, and verification
- Map approved MCP tools through same policy boundary

Exit: tool contract and injection suites pass.

## Phase 6: Evidence and Verification

- Add evidence store and artifact metadata
- Implement completion verifier and final report structure
- Prevent unsupported terminal success

Exit: research cases meet evidence coverage gate.

## Phase 7: Memory

- Add conversation summaries, episodic memory, reviewed semantic memory, and retrieval policies
- Add review/edit/delete UI and poisoning tests

Exit: memory privacy and provenance tests pass.

## Phase 8: Product UI

- Build task composer, plan review, run timeline, approval center, artifact viewer, budget panel, and final report
- Add responsive and accessibility states

Exit: critical user journeys pass Playwright tests.

## Phase 9: Evaluation and Operations

- Create golden and adversarial datasets
- Add offline runner, regression reports, dashboards, alerts, and incident runbooks
- Load and chaos test staging

Exit: all product, QA, and evaluation release gates pass.

## Dependency Order

```text
Identity/state
→ durable workers
→ model planning
→ policy/approval
→ tools
→ verification
→ memory
→ UI completion
→ release hardening
```

## Definition of Done

- Acceptance criteria implemented
- Policy and tenant checks enforced server-side
- Failure and empty states handled
- Automated tests and relevant evaluations added
- Trace and metric coverage present
- Documentation and migration notes updated
- No unresolved critical defect