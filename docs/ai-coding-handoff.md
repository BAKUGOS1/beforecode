# AI Coding Handoff

Use this guide when giving project documents to an AI coding tool.

## Source files

Prepare these files first:

- Project Brief
- PRD
- TRD
- Database Schema
- API Documentation
- QA Test Plan
- Build Plan

## Handoff rule

The documents should be the source of truth. The implementation should follow the planned scope.

## Recommended prompt

```text
Read the project documents first.

Use them as the source of truth.

Build the project phase by phase.

Do not add extra features unless they are clearly required by the documents.

If a requirement is missing, explain the missing detail before continuing.
```

## Review prompt

```text
Review the current project against the PRD, TRD, and QA plan.

List completed items, missing items, bugs, risks, and next steps.
```
