# TaskPilot AI Agent Documentation Pack

TaskPilot is a researched example of a human-supervised, tool-using AI agent designed around explicit state, durable checkpoints, least privilege, approvals, evidence, and evaluation.

## Reading Order

1. [Project Brief](project-brief.md)
2. [Research Report](research-report.md)
3. [Product Requirements](prd.md)
4. [Technical Requirements](trd.md)
5. [Agent Workflow](agent-workflow.md)
6. [Tool and Permission Plan](tool-plan.md)
7. [Memory Plan](memory-plan.md)
8. [Evaluation Plan](evaluation-plan.md)
9. [QA Test Plan](qa-test-plan.md)
10. [Implementation Plan](implementation-plan.md)

## Architecture Summary

```text
User goal
→ explicit LangGraph state machine
→ deterministic policy and approval
→ typed tool gateway
→ evidence and verification
→ reviewed result
```

PostgreSQL stores run metadata, checkpoints, approvals, memory metadata, and the action ledger. A durable queue and worker pool execute resumable runs. OpenTelemetry provides trace and metric structure.

## Important Boundary

The model proposes and reasons. Trusted application code authorizes, persists, executes, verifies, and audits.

## How to Use

Copy this pack when planning a task agent, then replace the product goal, tools, risk rules, memory policy, evaluation dataset, deployment requirements, and acceptance thresholds with project-specific decisions.