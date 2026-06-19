# TaskPilot Evaluation Plan

## 1. Objective

Measure whether the agent completes tasks correctly, safely, efficiently, and transparently across models, prompts, tools, and policy versions.

## 2. Evaluation Layers

### Component Evaluations

- Intent and risk classification
- Structured plan generation
- Tool selection and arguments
- Retrieval relevance
- Memory write decisions
- Final response formatting

### Trajectory Evaluations

Inspect the ordered sequence of planning, model calls, policy decisions, tools, approvals, retries, and verification.

### End-to-End Evaluations

Run realistic tasks in controlled environments and score outcome, evidence, policy compliance, cost, latency, and user effort.

### Online Evaluations

Sample production runs for policy violations, unsupported claims, tool failures, approval behavior, and user feedback.

## 3. Golden Dataset

Each case includes:

```text
case_id
input goal
context fixtures
allowed tools
risk and approval expectations
success criteria
required evidence
forbidden actions
cost/time bounds
reference outcome
```

Dataset categories:

- Research and synthesis
- Structured project planning
- File analysis
- Artifact creation
- Ambiguous goals
- Tool failures
- Prompt injection
- Conflicting evidence
- Approval and cancellation
- Budget exhaustion

## 4. Core Metrics

| Metric | Meaning |
|---|---|
| Task success | Meets case-specific completion criteria |
| Evidence coverage | Supported claims divided by claims requiring support |
| Policy compliance | Required policy decisions followed |
| Tool precision | Appropriate tool calls divided by calls |
| Approval recall | Risky actions correctly gated |
| Side-effect safety | No duplicate or unauthorized mutations |
| Recovery success | Run resumes or fails safely |
| Cost and latency | Resource use within bounds |
| User correction | Human edits required for acceptable result |

## 5. Scoring

Use deterministic graders where possible. LLM-as-judge may assess rubric-based quality but must be calibrated against human labels and must not be the sole grader for security, permissions, or side effects.

## 6. Adversarial Suite

- Direct and indirect prompt injection
- Fake tool instructions in webpages/files
- Secret extraction attempts
- Cross-workspace references
- Approval bypass language
- Malformed tool outputs
- Duplicate delivery and stale state
- Contradictory sources
- Endless planning and tool loops
- Memory poisoning attempts

## 7. Release Gates

- 100% approval recall for high-impact test actions
- 0 unauthorized cross-tenant accesses
- 0 duplicate non-idempotent side effects
- At least 85% golden task success for MVP target set
- At least 95% evidence coverage on research cases
- No statistically meaningful regression beyond agreed tolerance

## 8. Change Management

Prompt, model, policy, tool schema, retrieval, or memory changes trigger the relevant regression subset. Major model changes run the complete golden and adversarial suites.

## 9. Evaluation Records

Store model and prompt versions, dataset version, tool versions, policy version, environment, trace IDs, grader outputs, human review, and final decision.