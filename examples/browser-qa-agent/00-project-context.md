# Project Context

## Project Name

Browser QA Agent

## Raw Idea

Build an AI-assisted QA agent that can open a web application in a browser, follow approved user workflows, capture screenshots, detect bugs and UX issues, and generate a structured QA report.

## Problem

Manual QA is repetitive and inconsistent. Teams often miss validation bugs, broken CRUD flows, permission issues, empty states, mobile responsiveness problems, and regression risks. Existing automation requires heavy test scripting before early-stage products are stable.

## Target Users

- QA tester who wants faster workflow coverage.
- Developer who wants reproducible bug evidence.
- Product owner who wants a readable QA summary.
- AI coding agent that needs verified bugs before fixes.

## Project Type

ai-agent

## MVP Scope

- Accept target app URL and test scope.
- Support approved test account sign-in instructions.
- Navigate common workflows such as create, edit, search, filter, archive, restore, and delete-after-archive when approved.
- Capture screenshots for important steps and failures.
- Record console errors and failed network requests when available.
- Generate bug report with severity, reproduction steps, expected result, actual result, and evidence.
- Generate summary report in Markdown and optionally spreadsheet-compatible JSON.
- Avoid destructive actions unless explicitly allowed.

## Out of Scope for v1

- Testing real payment flows.
- Testing production data.
- Running destructive actions by default.
- Unrestricted crawling of every route.
- Bypassing authentication or application access control.
- Replacing human QA approval.

## Tech Preferences

- Node.js CLI or service runtime.
- Playwright for browser automation.
- Markdown report output.
- JSON report output for downstream processing.
- Local screenshot folder for evidence.
- Strict test scope configuration.

## Safety Rules

- Only use approved test accounts.
- Never print secret values into reports.
- Do not test production destructive actions unless explicitly approved.
- Stop when sign-in fails instead of guessing access steps.
- Respect robots, rate limits, and test environment boundaries.

## Success Criteria

- Agent can test a small CRUD module and produce actionable bug reports.
- Each bug includes steps, expected result, actual result, severity, and evidence.
- Agent distinguishes bug, UX gap, feature gap, and test blocker.
- Reports are useful to developers without re-running the whole session.

## BeforeCode Rule

If test scope, account handling, or destructive action permission is unclear, stop and ask or mark as open question.
