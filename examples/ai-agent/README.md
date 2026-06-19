# TaskPilot AI Agent Documentation Pack

TaskPilot is a researched example of a human-supervised, tool-using AI agent designed around explicit state, durable checkpoints, least privilege, approvals, evidence, security, and evaluation.

## Reading Order

1. [Project Brief](project-brief.md)
2. [Research Report](research-report.md)
3. [Product Requirements](prd.md)
4. [Technical Requirements](trd.md)
5. [Agent Workflow](agent-workflow.md)
6. [Database Schema](database-schema.md)
7. [API Documentation](api-documentation.md)
8. [Tool and Permission Plan](tool-plan.md)
9. [Memory Plan](memory-plan.md)
10. [Threat Model](threat-model.md)
11. [Evaluation Plan](evaluation-plan.md)
12. [QA Test Plan](qa-test-plan.md)
13. [Implementation Plan](implementation-plan.md)

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

## Key Safety Properties

- External writes require explicit policy authorization and usually approval
- Retrieved content never becomes system policy
- Tool retries cannot duplicate completed side effects
- Completion requires evidence and verification
- Memory writes require provenance and review rules
- Cross-workspace data access is denied server-side

## How to Use

Copy this pack when planning a task agent, then replace the product goal, tools, risk rules, memory policy, evaluation dataset, deployment requirements, and acceptance thresholds with project-specific decisions.