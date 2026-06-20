# TaskPilot AI Agent Example Pack

TaskPilot is a production-oriented BeforeCode example for an AI task execution agent that can inspect project docs, plan work, call approved tools, generate implementation tasks, and produce verification notes.

This example is intentionally specific. It shows how BeforeCode can define agent boundaries before implementation so the agent does not operate from vague instructions.

## Scenario

A product team wants an AI assistant that can turn approved project documentation into actionable engineering tasks. The agent should read context, identify missing requirements, prepare an execution plan, and produce a handoff for developers or coding agents.

## Core workflow

```text
User provides project goal
→ agent reads docs
→ agent identifies missing context
→ agent creates task plan
→ agent calls approved tools only
→ agent produces implementation handoff
→ human reviews before build
```

## Generated docs in this pack

| File | Purpose |
|---|---|
| `00-project-context.md` | Source-of-truth agent context |
| `01-open-questions.md` | Missing decisions and safety questions |
| `03-prd.md` | Product requirements for the agent |
| `07-trd.md` | Architecture, tools, memory, and guardrails |
| `09-evaluation-plan.md` | Quality, reliability, and safety evaluation |

## Why this example matters

AI agents fail when their authority, inputs, tools, and stopping conditions are unclear. This pack shows how to document those boundaries before coding.
