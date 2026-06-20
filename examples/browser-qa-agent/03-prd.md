# Product Requirements Document

## Source Context

Source-of-truth: `00-project-context.md`.

## Product Vision

Browser QA Agent helps teams test important web workflows faster by combining browser automation, AI observation, evidence capture, and structured reporting.

## Goals

- Reduce repetitive manual QA effort.
- Produce developer-ready bug reports.
- Capture screenshots and technical evidence during testing.
- Keep destructive testing disabled by default.
- Make AI QA runs reproducible and reviewable.

## Non-goals

- The agent does not bypass authentication.
- The agent does not test production destructive flows by default.
- The agent does not replace human release approval.
- The agent does not guarantee full route coverage without a defined scope.

## Personas

| Persona | Need | Success Signal |
|---|---|---|
| QA tester | Fast coverage of repetitive workflows | Can review report instead of repeating all steps |
| Developer | Clear reproduction steps | Can fix issue without asking for missing evidence |
| Product owner | Readable risk summary | Can understand release readiness quickly |
| AI coding agent | Verified bug context | Can fix only confirmed issues |

## Functional Requirements

| ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| FR-001 | Accept target URL and test scope | Must | Run config defines target, workflows, and allowed actions |
| FR-002 | Sign in with approved test account | Must | Agent stops safely if sign-in fails |
| FR-003 | Execute scoped workflow steps | Must | Agent follows approved task list and records progress |
| FR-004 | Capture screenshot evidence | Must | Screenshots saved for key steps and failures |
| FR-005 | Detect visible UI failures | Must | Broken states are included in report with evidence |
| FR-006 | Capture console/network errors | Should | Errors are included when browser APIs expose them |
| FR-007 | Generate bug report | Must | Each bug has severity, steps, expected, actual, evidence |
| FR-008 | Generate run summary | Must | Report includes passed flows, failed flows, blockers, risks |
| FR-009 | Classify issue type | Should | Report labels bug, UX issue, feature gap, or blocker |
| FR-010 | Enforce safety rules | Must | Destructive or out-of-scope action is skipped or blocked |

## Report Quality Requirements

A useful bug must include:

- title
- severity
- module
- environment
- reproduction steps
- expected result
- actual result
- screenshot/evidence path
- suggested owner or next action

## Release Criteria

- Agent can run a scoped test on a fixture app.
- Agent produces a readable Markdown report.
- Agent stores screenshot evidence.
- Agent blocks unapproved destructive actions.
- Evaluation plan passes fixture tests.
