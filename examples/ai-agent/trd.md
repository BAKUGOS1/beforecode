# TaskPilot Technical Requirements Document

## 1. Technical Objective

Build a secure, resumable AI-agent platform with explicit workflow states, typed tools, deterministic policy controls, human approval, evidence tracking, memory boundaries, and measurable evaluation.

## 2. Reference Stack

| Layer | Choice |
|---|---|
| Web | React and JavaScript |
| API | FastAPI and Python |
| Agent runtime | LangGraph |
| Primary database | PostgreSQL |
| Queue | Redis-backed durable job queue |
| Artifact storage | S3-compatible object storage |
| Validation | Pydantic and JSON Schema |
| Observability | OpenTelemetry |
| Testing | Pytest and Playwright |
| Deployment | Containerized API and worker services |

## 3. High-Level Architecture

```text
React Web Client
        ↓
API Gateway / FastAPI
        ↓
Run Service ─────────────→ PostgreSQL
        ↓                     ├─ runs and steps
Durable Job Queue             ├─ checkpoints
        ↓                     ├─ approvals
Agent Worker                  ├─ memory metadata
        ↓                     └─ action ledger
LangGraph Orchestrator
  ├─ Model Gateway
  ├─ Policy Engine
  ├─ Tool Gateway ───────→ Sandboxed tools / MCP servers / APIs
  ├─ Retrieval Service
  └─ Verifier

Artifacts → Object Storage
Telemetry → OpenTelemetry Collector
Evaluations → Dataset and Eval Runner
```

## 4. Service Responsibilities

### API Service

Authenticates users, validates requests, creates runs, exposes state, receives approval decisions, and never directly performs agent tools.

### Run Service

Owns legal state transitions, budgets, cancellation, deadlines, and optimistic concurrency.

### Agent Worker

Executes one leased run at a time, renews heartbeat, loads checkpoint, advances graph, and persists transition before acknowledging work.

### Model Gateway

Centralizes provider credentials, model selection, structured output, retry policy, timeouts, token accounting, and content redaction.

### Policy Engine

Deterministically evaluates identity, workspace, tool, risk, arguments, autonomy, approval, and budget. Model output cannot bypass it.

### Tool Gateway

Validates tool input/output schemas, resolves credentials, applies idempotency, records action ledger entries, executes tools, and returns sanitized results.

### Verifier

Checks completion criteria, required evidence, contradictions, failed tools, and unsupported claims before terminal success.

## 5. LangGraph State

```text
run_id
workspace_id
user_id
goal
constraints
completion_criteria
risk_level
autonomy_level
plan
current_step
messages_summary
evidence_refs
artifact_refs
pending_approval
budgets
errors
verification_result
```

Large documents and tool outputs are stored by reference, not copied into every checkpoint.

## 6. Graph Nodes

```text
intake
→ classify_risk
→ collect_context
→ clarify_or_continue
→ create_plan
→ approve_plan_if_needed
→ select_next_step
→ authorize_tool
→ execute_tool
→ inspect_result
→ update_plan
→ verify_completion
→ finalize
```

Failure routes lead to bounded retry, re-plan, user clarification, or terminal failure.

## 7. Persistence and Concurrency

- PostgreSQL is authoritative for run status and checkpoints
- State updates use version numbers or compare-and-swap
- Workers use leases and heartbeats
- Queue delivery is assumed at least once
- Each tool action has a unique idempotency key
- Action ledger status: proposed, authorized, executing, succeeded, failed, uncertain
- Uncertain side effects require reconciliation before retry

## 8. Approval Protocol

1. Graph proposes action and sanitized arguments
2. Policy engine determines approval requirement
3. Checkpoint and approval record commit atomically
4. Run enters `awaiting_approval`
5. User approves, rejects, edits, or lets request expire
6. Resume event references approval version
7. Worker revalidates policy and arguments before execution

Approval is single-use and invalidated by material argument changes.

## 9. Tool Contract

Every tool defines:

```text
name
version
description
input_schema
output_schema
risk_class
required_scopes
timeout
retry_policy
idempotency_support
redaction_rules
verification_method
```

Tools return structured success, failure, or uncertain status plus evidence references.

## 10. Security Architecture

- Deny-by-default tool registry
- Workspace and user-scoped authorization
- No raw provider or connector tokens in prompts
- Network egress allowlists for sensitive tools
- Sandboxed file and code execution
- Maximum input/output sizes
- Prompt injection markers treated as data, not instructions
- Retrieved content separated from system policy
- Output validated before use by another tool
- Audit trail for policy and approval decisions

## 11. Memory Architecture

- Thread state: checkpoints for current run
- Episodic memory: summaries of completed runs with provenance
- Semantic memory: user-approved stable facts and preferences
- Knowledge sources: indexed documents with access controls
- No memory write directly from raw model output
- Memory candidates pass policy, deduplication, provenance, and optional user approval

## 12. Model Strategy

Start with one strong model route for planning and verification, plus an economical route for classification and summarization. Route by evaluated capability, not provider marketing. Model upgrades require regression evaluation.

## 13. Observability

Trace hierarchy:

```text
run
├─ graph node
├─ model call
├─ retrieval
├─ policy decision
├─ approval wait
├─ tool execution
└─ verification
```

Metrics include success, latency, token use, cost estimate, retries, policy denies, approval waits, tool failures, resume failures, and evidence coverage.

## 14. Deployment Topology

```text
web
api replicas
worker replicas
PostgreSQL
Redis
object storage
OpenTelemetry collector
```

Workers scale independently. Tool classes with different trust levels may run in separate worker pools.

## 15. Failure Handling

- Transient model/network errors: bounded exponential retry
- Validation errors: do not retry unchanged input
- Tool timeout with unknown side effect: mark uncertain and reconcile
- Worker crash: lease expires and another worker resumes checkpoint
- Budget exceeded: stop safely with partial report
- Policy denial: request changed plan or human decision

## 16. Temporal ADR

Temporal is not part of MVP. Reconsider it when workflows span days, coordinate many non-agent services, require advanced schedules/signals, or outgrow queue-plus-checkpoint operations. If adopted, Temporal owns outer business workflow durability while LangGraph remains the inner reasoning state machine.

## 17. Technical Acceptance Criteria

- Crash recovery does not duplicate successful actions
- Policy tests prove high-risk actions cannot bypass approval
- Checkpoint history can reproduce run state
- Tool and model credentials never reach client or model context
- Cross-tenant access fails safely
- Critical traces link run, node, tool, approval, and evidence IDs
- Clean environment deployment is reproducible