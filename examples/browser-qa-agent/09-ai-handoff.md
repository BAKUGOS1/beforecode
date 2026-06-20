# AI Coding Handoff

## Project

Browser QA Agent

## Source-of-truth Docs

Read these before implementation:

1. `00-project-context.md`
2. `03-prd.md`
3. `04-trd.md`
4. `05-browser-workflow.md`
5. `06-report-format.md`
6. `07-safety-rules.md`
7. `08-evaluation-plan.md`

## Allowed Implementation Scope

AI coding agents may implement:

- run configuration schema
- browser runner lifecycle
- scoped workflow executor
- screenshot capture
- browser error capture
- Markdown report writer
- JSON report writer
- safety guard for blocked actions
- evaluation fixtures

## Blocked Scope

Do not implement without approval:

- sign-in bypass behavior
- destructive production actions
- payment-flow automation
- exporting production data
- unrestricted crawler behavior
- external upload of screenshots or traces
- hidden storage of test-account details

## Stop Conditions

Stop and ask for review if:

- test target appears to be production and production testing is not approved
- sign-in fails
- workflow needs a blocked action
- report would expose sensitive data
- target app behavior is unclear after retries
- requested workflow is outside configured scope

## Required Output After Changes

- files changed
- workflows implemented
- safety rules enforced
- tests run
- fixture results
- known risks
- open questions

## Verification Checklist

- Agent can run a safe fixture workflow.
- Report includes evidence paths.
- Destructive actions are blocked by default.
- Failed sign-in becomes a blocker, not a guessed workaround.
- JSON output matches report schema.
