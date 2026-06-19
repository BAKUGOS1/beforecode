# TaskPilot Tool and Permission Plan

## 1. Objective

Provide useful tools through a typed, least-privilege gateway while preventing the model from directly controlling credentials, permissions, or unrestricted side effects.

## 2. MVP Tool Catalog

| Tool | Capability | Risk | Approval |
|---|---|---:|---|
| calculator | Deterministic calculation | R0 | No |
| web_search | Search public web | R1 | No |
| web_fetch | Read approved public URL | R1 | No |
| workspace_read | Read permitted files | R2 | Scope-based |
| workspace_write | Create/update workspace artifact | R2/R3 | Policy-based |
| export_artifact | Generate downloadable result | R2 | No |
| send_message | Send external communication | R3 | Always |

Code execution, purchases, production changes, and destructive operations are disabled in MVP.

## 3. Tool Gateway Flow

```text
Model proposes tool call
→ Schema validation
→ Identity and scope resolution
→ Risk classification
→ Budget check
→ Policy decision
→ Approval if required
→ Credential resolution
→ Idempotency/action ledger
→ Execution
→ Output validation and redaction
→ Evidence storage
```

## 4. Authorization Inputs

- Authenticated user and workspace
- Role and connector scopes
- Run autonomy level
- Approved plan step
- Tool risk class and version
- Argument destination and data sensitivity
- Valid approval record
- Remaining budgets

## 5. Prompt Injection Boundary

Content returned by tools is untrusted. It may supply data but cannot:

- Change system or workspace policy
- Enable another tool
- Request secrets
- Grant approval
- Alter budget
- Override the user's goal

Tool output passed to the model is wrapped with provenance and trust metadata.

## 6. Idempotency

Mutation tools accept an `idempotency_key`. The gateway records request hash, destination, attempt count, result, and verification status. A changed request cannot reuse the same key.

## 7. MCP Integration Rules

- Prefer remote authorization using resource-scoped OAuth
- Validate token audience
- Never forward upstream access tokens to another server
- Register MCP server identity, owner, scopes, and trust level
- Map MCP tools into the internal risk catalog
- Disable unknown or dynamically added tools until admin review

## 8. Sandboxing

File tools operate inside workspace roots. Future code tools require isolated containers, no inherited credentials, restricted network, CPU/memory/time limits, and disposable filesystems.

## 9. Output Handling

- Validate response schema
- Limit size and nesting
- Sanitize content before rendering
- Store large payloads as artifacts
- Detect secret-like values and redact logs
- Do not feed raw tool output directly into another mutation tool

## 10. Tool Quality Tests

Each tool requires:

- Schema tests
- Permission tests
- Timeout and retry tests
- Idempotency tests
- Injection payload tests
- Redaction tests
- Evidence and verification tests
- Disabled/revoked connector tests