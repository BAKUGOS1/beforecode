# Report Format

## Source Context

Reports must be useful for product owners, developers, QA reviewers, and AI coding agents.

## Output Files

```text
qa-results/run-id/
├── report.md
├── report.json
├── screenshots/
└── traces/
```

## Markdown Report Structure

```md
# QA Report

## Summary

## Environment

## Tested Workflows

## Bugs

## UX Issues

## Feature Gaps

## Blockers

## Evidence

## Recommendations
```

## Bug Object

```json
{
  "id": "BUG-001",
  "title": "Lead save button stays loading after validation error",
  "severity": "high",
  "type": "bug",
  "module": "Leads",
  "workflow": "create-lead",
  "stepsToReproduce": [],
  "expectedResult": "Validation errors appear and save button resets",
  "actualResult": "Save button remains loading",
  "evidence": ["screenshots/BUG-001.png"],
  "consoleErrors": [],
  "networkErrors": [],
  "status": "open"
}
```

## Severity Levels

| Severity | Meaning |
|---|---|
| critical | data loss, data leak, security issue, app unusable |
| high | core workflow broken |
| medium | workflow works with workaround |
| low | cosmetic or minor UX issue |

## Issue Types

| Type | Meaning |
|---|---|
| bug | expected behavior exists but fails |
| UX issue | confusing, unclear, or inefficient experience |
| feature gap | expected capability is absent or incomplete |
| blocker | test cannot continue because precondition failed |
| performance | slow or unstable behavior |

## Summary Metrics

Report should include:

- total workflows tested
- passed workflows
- failed workflows
- blocked workflows
- bug count by severity
- screenshots captured
- known limitations

## Evidence Naming

Use stable names:

```text
screenshots/create-lead-step-03-before-save.png
screenshots/BUG-001-lead-save-loading.png
```

Avoid sensitive user data in file names.
