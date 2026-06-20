# Technical Requirements Document

## Source Context

Generated from `00-project-context.md`. This TRD defines a safe v1 architecture for the TaskPilot example.

## Architecture Overview

```text
Markdown docs
→ context parser
→ requirement analyzer
→ task planner
→ reviewable output
```

## Components

| Component | Responsibility |
|---|---|
| Document loader | Reads approved Markdown files from the configured workspace |
| Context parser | Extracts project name, goals, scope, constraints, and open questions |
| Requirement analyzer | Finds gaps, conflicts, and unconfirmed assumptions |
| Task planner | Creates ordered implementation tasks with acceptance criteria |
| Output writer | Writes Markdown and JSON handoff artifacts |
| Safety controller | Enforces tool allowlist and stop conditions |

## Data Contracts

### Task Output

```json
{
  "id": "TASK-001",
  "title": "Implement lead creation form",
  "sourceDocs": ["03-prd.md"],
  "scope": "Confirmed behavior only",
  "acceptanceCriteria": [],
  "risks": [],
  "openQuestions": []
}
```

### Assumption Output

```json
{
  "assumption": "Authentication is required",
  "confidence": "medium",
  "requiresHumanReview": true
}
```

## Tool Policy

- Read-only file access is allowed for approved workspace docs.
- File write access is limited to generated planning artifacts.
- Network calls are disabled in v1 unless explicitly configured.
- Secret access is not allowed.
- Destructive commands are not allowed.

## Stop Conditions

The agent must stop and request review when:

- Requirements conflict across documents.
- A requested task needs credentials or production data.
- The user asks for scope not present in approved docs.
- The output would require changing security, billing, or permission behavior without review.

## Implementation Order

1. Markdown document loader
2. Context parser
3. Open-question detector
4. Task planner
5. Markdown output writer
6. JSON output writer
7. Evaluation fixtures
8. Safety and refusal tests
