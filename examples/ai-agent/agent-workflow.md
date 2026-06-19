# TaskPilot Agent Workflow

## 1. Workflow Objective

Define the exact state machine used to transform a goal into a controlled, verifiable outcome.

## 2. State Diagram

```text
DRAFT
  ↓ submit
QUEUED
  ↓ worker lease
SCOPING
  ├─ missing material input → WAITING_FOR_USER
  └─ sufficient input → PLANNING
PLANNING
  ├─ plan approval required → WAITING_FOR_APPROVAL
  └─ approved policy → EXECUTING
EXECUTING
  ├─ risky action → WAITING_FOR_APPROVAL
  ├─ recoverable failure → RETRYING
  ├─ plan invalid → REPLANNING
  ├─ criteria appear met → VERIFYING
  └─ cancellation/budget → terminal state
VERIFYING
  ├─ pass → COMPLETED
  ├─ fixable gap → EXECUTING
  └─ unresolved gap → FAILED or PARTIAL
```

## 3. Intake

Inputs:

- Goal
- Expected deliverable
- Constraints
- Available context
- Deadline
- Autonomy level
- Budget

Output: normalized task specification and preliminary risk.

## 4. Scoping

The agent must determine:

- What success means
- Which facts are missing
- Which tools and permissions may be needed
- Whether the request contains conflicting constraints
- Whether the task is allowed and feasible

Clarification is required when proceeding would materially change scope, cost, risk, or outcome.

## 5. Planning

Each plan step contains:

```text
step_id
objective
dependencies
method
tool_candidates
expected_evidence
risk_class
estimated_budget
completion_check
status
```

Plans are versioned. Material edits invalidate dependent approvals.

## 6. Execution Loop

For each ready step:

1. Load minimal required context
2. Select an allowed method or tool
3. Validate arguments against schema
4. Evaluate deterministic policy
5. Pause if approval is required
6. Create or reuse idempotency key
7. Execute tool
8. Store result and evidence by reference
9. Inspect for errors, injection, and contradictions
10. Mark step complete, retry, re-plan, or escalate

## 7. Approval Decision

Possible decisions:

- Approve once
- Approve edited action
- Reject and re-plan
- Cancel run
- Expire automatically

The UI must display destination, effect, data involved, reversibility, and estimated cost.

## 8. Verification

The verifier checks:

- All required steps reached valid terminal states
- Completion criteria are satisfied
- Required evidence exists and is accessible
- Tool results support the final claims
- No unresolved uncertain action exists
- Output respects format and policy
- Known limitations are disclosed

## 9. Finalization

Final output contains:

```text
Outcome summary
Completed work
Artifacts
Evidence
Assumptions and inferences
Unresolved items
Budget usage
Audit/run reference
```

## 10. Retry Rules

- Retry only errors classified as transient
- Preserve idempotency key across retries of the same action
- Revalidate policy after long delays or changed context
- Never automatically retry an uncertain non-idempotent side effect
- Stop after configured attempts and surface a recovery option

## 11. Cancellation

Cancellation prevents new actions, requests cooperative stop for active tools, saves state, and reports any action whose final status is uncertain.

## 12. Invariants

- One active worker lease per run
- One valid state transition at a time
- No tool call without a policy decision
- No approval reuse after material action change
- No completion while required evidence is missing
- No hidden continuation after cancellation