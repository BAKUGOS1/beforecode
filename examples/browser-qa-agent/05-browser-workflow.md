# Browser Workflow

## Source Context

The agent should test only approved workflows from the run configuration or human-provided scope.

## Workflow Model

Each workflow should be represented as:

```json
{
  "id": "create-lead",
  "title": "Create a lead",
  "preconditions": ["signed-in user", "lead module available"],
  "steps": [],
  "expectedResult": "lead appears in table",
  "riskLevel": "safe"
}
```

## Standard Workflow Sequence

```text
prepare browser
→ open target URL
→ verify reachable app
→ sign in using approved test account
→ open module
→ execute steps
→ verify expected result
→ capture evidence
→ mark pass/fail/blocker
```

## Example Workflow: Create Lead

| Step | Action | Expected Result |
|---|---|---|
| 1 | Open Leads module | Lead table is visible |
| 2 | Click New Lead | Form or drawer opens |
| 3 | Fill required fields | Inputs accept values |
| 4 | Submit form | Save succeeds |
| 5 | Search created lead | New lead appears |
| 6 | Open detail view | Lead details match submitted data |

## Example Workflow: Archive and Restore

| Step | Action | Expected Result |
|---|---|---|
| 1 | Select existing test lead | Action menu appears |
| 2 | Archive lead | Lead leaves active list |
| 3 | Open archived filter | Archived lead appears |
| 4 | Restore lead | Lead returns to active list |

## Step Statuses

| Status | Meaning |
|---|---|
| `passed` | expected result was confirmed |
| `failed` | expected result was not confirmed |
| `blocked` | agent could not continue because precondition failed |
| `skipped` | step was outside approved scope |
| `needs-review` | uncertain result needs human verification |

## Browser States to Detect

- loading spinner stuck
- form validation error
- empty state
- permission error
- crash or blank screen
- unexpected navigation
- modal blocking progress
- console error
- failed network request

## Evidence Rules

- Capture screenshot before risky action.
- Capture screenshot after failed assertion.
- Capture final screenshot for each workflow.
- Store evidence path in report.
- Avoid including sensitive values in screenshot names or report text.
