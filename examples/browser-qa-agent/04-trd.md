# Technical Requirements Document

## Source Context

Source-of-truth: `00-project-context.md` and `03-prd.md`.

## Architecture Overview

```text
CLI or service entrypoint
→ run configuration parser
→ browser automation runner
→ observation and evidence collector
→ issue classifier
→ report writer
```

## Core Modules

| Module | Responsibility |
|---|---|
| Config Loader | Reads target URL, workflows, allowed actions, output path |
| Browser Runner | Launches browser, navigates pages, performs steps |
| Step Executor | Executes explicit workflow steps safely |
| Observer | Captures screenshots, console logs, network failures, visible states |
| Classifier | Labels bug, UX issue, feature gap, blocker, or pass |
| Reporter | Writes Markdown and JSON report artifacts |
| Safety Guard | Blocks unapproved destructive or out-of-scope actions |

## Run Configuration

```json
{
  "targetUrl": "https://example.test/app",
  "outputDir": "qa-results/run-001",
  "workflows": ["login", "create-lead", "search", "archive-restore"],
  "allowedActions": ["create", "edit", "archive", "restore"],
  "blockedActions": ["permanent-delete", "payment", "production-email-send"]
}
```

## Execution Flow

```text
Load config
→ validate safe target
→ launch browser
→ perform sign-in sequence if required
→ execute workflow steps
→ capture evidence per step
→ classify results
→ write reports
→ close browser
```

## Selector Strategy

Preferred order:

1. `data-testid`
2. accessible role/name selectors
3. label text for forms
4. visible text fallback
5. CSS selector only when stable and documented

## Evidence Strategy

| Evidence | Capture Timing |
|---|---|
| Screenshot | on workflow start, important step, failure, and completion |
| Console error | during full run |
| Network failure | during full run |
| DOM text snapshot | on failure only |
| Trace | optional, default on failure |

## Report Artifacts

```text
qa-results/run-id/
├── report.md
├── report.json
├── screenshots/
└── traces/
```

## Safety Constraints

- Do not run unbounded crawler behavior in v1.
- Do not permanently delete records unless explicitly approved.
- Do not run payment flows against live payment providers.
- Do not expose sensitive test account data in reports.
- Stop when authentication fails instead of guessing.

## Implementation Order

1. Config schema and validation.
2. Browser runner lifecycle.
3. Basic workflow step executor.
4. Screenshot and evidence capture.
5. Markdown report writer.
6. JSON report writer.
7. Safety guard.
8. Evaluation fixtures.
