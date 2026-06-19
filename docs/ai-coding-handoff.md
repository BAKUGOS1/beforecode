# AI Coding Handoff

AI coding agents perform better when they receive a bounded objective, consistent source documents, repository rules, and explicit verification—not a folder of unprioritized files.

## Minimum Handoff Package

```text
Repository instructions
Approved PRD and acceptance criteria
TRD and decision records
Database/API/permission documents
UX flow or design reference
QA plan and relevant test cases
Implementation phase/build plan
```

## Context Manifest

Tell the agent:

- Which documents are authoritative
- Which release/phase is in scope
- Which files or modules may change
- Which decisions are unresolved
- Which actions require human approval
- Which commands verify completion

## Recommended Workflow

1. Read instructions and source documents.
2. Inspect the existing repository before proposing changes.
3. Map the request to requirement IDs.
4. Report conflicts, missing details, and unrelated existing changes.
5. Propose a bounded plan with verification.
6. Implement in dependency order.
7. Run tests and compare results with acceptance criteria.
8. Report evidence, risks, and remaining work.

Use [Build From Approved Documentation](../prompts/codex/build-from-docs.md).

## Decision Boundaries

Require human approval for:

- Material scope or architecture changes
- Destructive data or repository operations
- External messages, deployments, purchases, or production changes
- New secrets, permissions, connectors, or third-party services
- Security/privacy trade-offs
- Assumptions that materially change behavior

## Repository Guidance

Add an `AGENTS.md` or tool-specific instruction file when appropriate. Include setup, test commands, architecture boundaries, style conventions, generated files, forbidden operations, and documentation update rules.

## Review After Implementation

Use [Audit Implementation Against Documentation](../prompts/codex/audit-against-docs.md) to identify missing, partial, conflicting, or untested requirements.

## Common Failure Modes

- Giving the agent stale or conflicting documents
- Asking it to “build everything” without phases
- Treating UI visibility as authorization
- Allowing undocumented feature expansion
- Accepting a completion claim without tests or repository evidence
- Failing to update docs after approved implementation changes

## Handoff Success

A strong handoff lets the agent state the outcome, boundaries, affected components, risks, and verification steps before it edits code.
