# TaskPilot Database Schema

## 1. Principles

- PostgreSQL is the authoritative metadata and workflow-state store
- Every tenant-owned record includes `workspace_id`
- UUID primary keys and timezone-aware timestamps
- Immutable events and action ledger for auditability
- Large prompts, outputs, evidence, and artifacts stored externally by reference
- Sensitive content encrypted or redacted according to classification

## 2. Relationship Map

```text
workspaces → workspace_members
workspaces → tasks → runs → run_steps
                       ├→ run_events
                       ├→ checkpoints
                       ├→ approvals
                       ├→ tool_actions → evidence
                       └→ artifacts
workspaces → memories
workspaces → tool_connections
workspaces → evaluation_cases → evaluation_results
```

## 3. Core Tables

### tasks

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| workspace_id | uuid | Tenant key |
| title | text | Required |
| goal | text | Required |
| expected_output | text | Nullable |
| constraints | jsonb | Structured limits |
| autonomy_level | text | observe, assist, approve, bounded |
| created_by | uuid | User reference |
| created_at | timestamptz | Required |

### runs

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| workspace_id | uuid | Tenant key |
| task_id | uuid | Foreign key |
| status | text | State-machine status |
| state_version | bigint | Optimistic concurrency |
| graph_thread_id | text | Unique checkpoint thread |
| risk_level | text | low, medium, high, prohibited |
| model_route | text | Versioned route |
| policy_version | text | Required |
| prompt_version | text | Required |
| budget_config | jsonb | Initial limits |
| budget_usage | jsonb | Current usage |
| worker_lease_id | uuid | Nullable |
| lease_expires_at | timestamptz | Nullable |
| started_at | timestamptz | Nullable |
| finished_at | timestamptz | Nullable |
| created_at | timestamptz | Required |
| updated_at | timestamptz | Required |

### run_steps

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| run_id | uuid | Foreign key |
| step_key | text | Stable within plan version |
| plan_version | integer | Required |
| objective | text | Required |
| dependencies | jsonb | Step keys |
| risk_class | text | R0–R4 |
| status | text | pending, active, blocked, complete, failed, skipped |
| completion_check | jsonb | Required evidence/rules |
| attempt_count | integer | Default 0 |
| started_at | timestamptz | Nullable |
| completed_at | timestamptz | Nullable |

### checkpoints

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| run_id | uuid | Foreign key |
| sequence | bigint | Monotonic per run |
| state_ref | text | Encrypted blob/object reference or serialized state |
| state_hash | text | Integrity check |
| node_name | text | Graph node |
| created_at | timestamptz | Required |

Constraint: unique `(run_id, sequence)`.

### approvals

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| run_id | uuid | Foreign key |
| step_id | uuid | Nullable FK |
| action_hash | text | Binds exact proposal |
| tool_name | text | Nullable |
| sanitized_arguments | jsonb | No secrets |
| risk_class | text | Required |
| status | text | pending, approved, rejected, expired, consumed |
| requested_at | timestamptz | Required |
| expires_at | timestamptz | Required |
| decided_by | uuid | Nullable |
| decided_at | timestamptz | Nullable |
| consumed_at | timestamptz | Nullable |

### tool_actions

| Column | Type | Notes |
|---|---|---|
| id | uuid | Primary key |
| run_id | uuid | Foreign key |
| step_id | uuid | Foreign key |
| tool_name | text | Required |
| tool_version | text | Required |
| request_hash | text | Required |
| idempotency_key | text | Required |
| risk_class | text | Required |
| policy_decision_id | uuid | Required |
| approval_id | uuid | Nullable |
| status | text | proposed, authorized, executing, succeeded, failed, uncertain |
| attempt_count | integer | Required |
| result_ref | text | Nullable |
| error_code | text | Nullable |
| started_at | timestamptz | Nullable |
| finished_at | timestamptz | Nullable |

Constraint: unique `(workspace_id, idempotency_key)` through tenant-aware design.

### run_events

Append-only timeline containing run, node, model, policy, approval, tool, budget, error, and user-control events. Payloads are sanitized and versioned.

### evidence

Stores source type, URI/object reference, content hash, retrieval time, access classification, excerpt reference, and related run/step/tool action.

### artifacts

Stores object key, media type, size, checksum, version, creator run, and access classification.

### memories

Stores the fields defined in `memory-plan.md`, including provenance, review status, sensitivity, expiry, and supersession.

### policy_decisions

Stores policy version, input facts, decision, reason codes, required approval class, and timestamp. Secrets and full sensitive content are excluded.

## 4. Indexes

```text
runs(workspace_id, status, updated_at desc)
runs(status, lease_expires_at)
run_steps(run_id, plan_version, status)
checkpoints(run_id, sequence desc)
approvals(workspace_id, status, expires_at)
tool_actions(run_id, status, started_at)
run_events(run_id, created_at)
evidence(run_id, step_id)
memories(workspace_id, subject_id, type, review_status)
```

## 5. Isolation and Retention

RLS or equivalent server-side tenant filters apply to every workspace table. Operational event retention may differ from content retention. Deleting a task must account for checkpoints, artifacts, evidence, and derived memories according to policy.

## 6. Consistency Rules

- Run terminal states reject new executable actions
- Approval action hash must match the proposed action
- Consumed approval cannot be reused
- Tool success requires result reference or explicit empty-result proof
- Uncertain tool action blocks terminal success until reconciled
- Checkpoint sequence and run state version are monotonic