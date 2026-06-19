# TaskPilot Product Requirements Document

## 1. Product Overview

TaskPilot lets users submit complex goals and supervise an AI agent through planning, execution, approval, verification, and delivery. The product is designed for bounded knowledge and project tasks rather than unrestricted autonomy.

## 2. Product Principles

- User intent and permissions are authoritative
- Consequential actions are inspectable before execution
- Every run has explicit limits
- Progress and uncertainty remain visible
- Claims and completion are evidence-backed
- Failure must be recoverable and understandable

## 3. Personas

### Individual Operator

Delegates research, planning, analysis, and workspace tasks.

### Team Reviewer

Reviews plans, approvals, evidence, and final outputs.

### Workspace Administrator

Configures tools, models, policies, retention, and budgets.

## 4. Run Lifecycle

```text
Draft → Queued → Scoping → Planning → Awaiting Approval
→ Executing → Verifying → Completed
```

Alternative terminal states:

```text
Failed | Cancelled | Rejected | Budget Exceeded | Expired
```

## 5. Functional Requirements

### FR-001 Task Creation

Users can create a task with goal, expected output, context, constraints, deadline, autonomy level, and budget.

### FR-002 Scope Analysis

The system identifies ambiguity, missing context, task risk, required tools, and completion criteria. Material ambiguity triggers a clarification request.

### FR-003 Plan Generation

The agent creates structured steps with purpose, dependencies, expected evidence, tool requirements, and risk classification. Users can approve or edit the plan.

### FR-004 Durable Runs

Run state is checkpointed after meaningful transitions. A worker restart must not erase completed steps or pending approvals.

### FR-005 Tool Execution

Tools use typed schemas and return structured results. The UI shows tool name, purpose, status, duration, and evidence without exposing secrets.

### FR-006 Approval Gates

Approval is required for:

- External writes or messages
- Destructive actions
- Permission changes
- Purchases or paid operations
- Sensitive-data access
- Actions outside the approved plan

Approval records include exact action, sanitized arguments, risk, expiry, approver, and decision.

### FR-007 Budgets

Each run enforces limits for model tokens, cost estimate, wall-clock time, steps, tool calls, retries, and retrieved content.

### FR-008 Memory

Users can review, edit, pin, or delete long-term memories. The agent cannot silently promote arbitrary retrieved content into trusted memory.

### FR-009 Evidence and Verification

Every completed step records evidence. The final report separates verified facts, agent inference, unresolved uncertainty, and failed checks.

### FR-010 Run Control

Users can pause, resume, cancel, retry a safe failed step, reject an approval, or branch a run from a checkpoint.

### FR-011 Artifacts

The agent can produce reports, plans, tables, and files. Artifacts include version, creator run, timestamps, and source references.

### FR-012 History and Audit

Users can inspect run state transitions, model calls, tool calls, approvals, policy decisions, errors, and artifact versions according to role.

### FR-013 Administration

Admins configure enabled tools, model routes, default autonomy, approval policies, budgets, retention, and redaction settings.

### FR-014 Feedback

Users can mark outcomes correct/incorrect, score usefulness, identify unsafe behavior, and attach corrected outputs for evaluation.

## 6. Tool Risk Classes

| Class | Example | Default Policy |
|---|---|---|
| R0 | Local calculation | Auto |
| R1 | Read public source | Auto with budget |
| R2 | Read private workspace | Scoped permission |
| R3 | External write/message | Approval required |
| R4 | Destructive, financial, privileged | Disabled in MVP |

## 7. UX Requirements

- Run page shows goal, plan, active step, progress, budget, approvals, evidence, and final output
- Approval dialogs use plain-language consequences
- Users can distinguish agent text from trusted tool evidence
- Errors show whether retry is safe
- Streaming output must not imply an action completed before tool confirmation
- Mobile supports review and approval even if full setup is desktop-first

## 8. Non-Functional Requirements

### Security

- Tenant isolation and least privilege
- Policy checks outside model prompts
- Secrets resolved only inside trusted tool workers
- Untrusted content cannot change tool permissions
- Sensitive logs and traces redacted by default

### Reliability

- At-least-once job delivery supported safely through idempotency
- State transitions validated server-side
- Non-idempotent actions never retry blindly
- Approval expiry and cancellation are deterministic

### Performance

- Task submission acknowledgement under 2 seconds
- Run state updates visible within 2 seconds
- Approval decision acknowledgement under 2 seconds
- UI remains usable for runs with 500 timeline events

### Accessibility

Core task, plan, approval, and result flows target WCAG 2.1 AA.

## 9. Success Metrics

- Golden task success rate
- Policy violation rate
- Approval precision and rejection rate
- Unsupported completion claim rate
- Duplicate side-effect rate
- Median task latency and cost
- Human correction rate
- Resume success rate

## 10. MVP Release Criteria

- Critical workflow and security tests pass
- No R3 action executes without valid approval
- Run recovery passes worker-crash tests
- Golden dataset reaches defined threshold
- Evidence coverage is measured and meets target
- Operational dashboards and incident runbook are available

## 11. Future Scope

- Specialist subagents
- Enterprise SSO
- Temporal-based cross-service workflows
- Scheduled and recurring runs
- Expanded MCP connectors
- Policy-as-code administration
- Advanced offline evaluation and model optimization