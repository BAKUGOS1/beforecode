# TaskPilot AI Agent Project Brief

## Product Summary

TaskPilot is a human-supervised AI execution agent that converts a user goal into a structured plan, gathers approved context, uses permissioned tools, pauses for risky decisions, and produces a verifiable result with evidence.

## Problem

General chat assistants can suggest steps but often lose state, use tools without clear boundaries, provide results without evidence, and fail unpredictably during long tasks. Users need an agent that is transparent, resumable, reviewable, and safe enough for practical project work.

## Target Users

- Developers and technical teams
- Product managers and founders
- Researchers and analysts
- Operations teams
- Students managing complex projects

## Product Goal

Provide a reliable workspace where users can delegate bounded multi-step tasks while retaining control over permissions, approvals, budget, evidence, and final acceptance.

## Core Workflow

```text
Goal submission
→ Scope and risk classification
→ Context collection
→ Plan proposal
→ User approval when required
→ Tool execution
→ Verification
→ Final report and artifacts
```

## MVP Features

1. Goal-based task creation
2. Structured planning with editable steps
3. Resumable agent runs with checkpoints
4. Read-only research and workspace tools
5. Explicit approval for external writes or high-impact actions
6. Per-run time, tool-call, and token budgets
7. Short-term thread state and curated long-term memory
8. Evidence-linked final reports
9. Run timeline, tool-call status, errors, and retry controls
10. Evaluation suite and operational metrics

## Autonomy Levels

| Level | Behavior |
|---|---|
| Observe | Read and analyze only |
| Assist | Propose actions; user executes |
| Execute with approval | Agent acts after approval |
| Bounded auto-execute | Agent acts within explicit low-risk policy |

MVP defaults to Observe or Execute with approval.

## Out of Scope

- Unrestricted autonomous operation
- Financial transactions
- Production infrastructure changes
- Sending public communications without approval
- Self-modifying prompts or policies
- Autonomous model training
- General-purpose computer control
- Multi-agent swarms

## Success Criteria

- At least 85% of golden evaluation tasks meet task-specific success criteria
- 100% of high-impact actions require valid approval
- Interrupted runs resume without repeating completed non-idempotent actions
- Every final factual claim produced from tools is traceable to evidence
- Critical security and cross-user isolation tests pass
- Users can understand the current run state and next action without reading raw logs

## Key Risks

| Risk | Control |
|---|---|
| Prompt injection | Treat retrieved content as untrusted data; enforce policy outside prompts |
| Excessive agency | Least-privilege tools, approval gates, budgets, and deny-by-default policies |
| Hallucinated completion | Tool result verification and evidence requirements |
| Duplicate side effects | Idempotency keys and action ledger |
| Memory poisoning | Provenance, user review, confidence, and restricted memory writes |
| Unbounded cost | Step, token, tool, retry, and time limits |
| Hidden failures | Structured traces, state timeline, and explicit terminal statuses |

## Release Definition

The MVP is ready when task planning, bounded execution, approval interrupts, resumability, tool policy enforcement, evidence reporting, evaluation gates, and critical security tests are complete.