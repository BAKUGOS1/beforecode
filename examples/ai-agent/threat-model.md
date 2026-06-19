# TaskPilot Threat Model

## 1. Protected Assets

- User and workspace data
- Connector credentials and access tokens
- Tool permissions and approvals
- System policies and prompt configuration
- Run state, memory, evidence, and artifacts
- External systems reachable through tools
- Budget and billing controls

## 2. Trust Boundaries

```text
User browser | API
API | worker queue
Worker | model provider
Worker | tool gateway
Tool gateway | external systems
Retrieved content | model context
Model proposal | deterministic policy engine
Tenant A | Tenant B
```

## 3. Principal Threats

### Prompt Injection

Malicious instructions arrive through user input, web pages, documents, tool results, or memory.

Controls: isolate untrusted content, deterministic authorization, tool allowlists, provenance, output validation, and adversarial evaluations.

### Excessive Agency

Agent receives broader tools or permissions than necessary.

Controls: autonomy levels, risk classes, scoped credentials, approval gates, disabled R4 tools, budgets, and destination constraints.

### Sensitive Information Disclosure

Secrets or private content leak to model context, logs, tools, or other tenants.

Controls: tenant isolation, secret broker, redaction, data minimization, provider policy, access checks, and retention limits.

### Unsafe Tool Output Handling

Model-generated or retrieved output is interpreted as executable arguments or rendered unsafely.

Controls: typed schemas, sanitization, separate read/write phases, argument review, content security policy, and no raw chaining into mutation tools.

### Duplicate or Ambiguous Side Effects

Retries create duplicate messages/files or leave unknown state.

Controls: idempotency keys, action ledger, reconciliation, verification, and no blind retry after uncertain status.

### Approval Bypass or Replay

Approval is reused for a changed or repeated action.

Controls: action hashes, expiry, single-use consumption, approver identity, state version, and reauthorization before execution.

### Memory Poisoning

Malicious or incorrect content becomes durable memory.

Controls: provenance, review status, confidence, write policy, user control, and retrieval-time trust labels.

### Unbounded Consumption

Agent loops, retrieves excessive content, or generates uncontrolled cost.

Controls: budgets, loop detectors, maximum depth, rate limits, timeouts, and operator alerts.

### Supply-Chain and Connector Risk

Compromised dependency, MCP server, tool, or model provider affects the system.

Controls: pinned dependencies, signed releases where available, connector registry, scope review, token audience validation, egress restrictions, and rapid revocation.

## 4. Abuse Cases

- User asks agent to send data to an attacker-controlled endpoint
- Web page instructs agent to ignore policy and reveal workspace files
- Member modifies resource IDs to access another workspace
- Attacker replays an approval request
- Worker crashes after sending a message but before recording success
- Tool returns HTML/script payload displayed in the UI
- Retrieved document creates false long-term memory
- Agent repeatedly re-plans to exhaust budget

## 5. Security Verification

Each release includes policy unit tests, cross-tenant integration tests, injection corpus, approval replay tests, idempotency chaos tests, secret scanning, dependency review, and connector revocation tests.

## 6. Incident Priorities

Critical incidents include unauthorized external action, cross-tenant exposure, credential leakage, approval bypass, or repeated harmful side effects. The system must support immediate connector disablement, worker stop, token revocation, trace preservation, and affected-run identification.