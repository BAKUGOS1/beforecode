# AI Coding Handoff

## Project

ClipForge AI

## Source-of-truth Docs

Read these before implementation:

1. `00-project-context.md`
2. `03-prd.md`
3. `04-trd.md`
4. `05-system-architecture.md`
5. `06-agent-workflows.md`
6. `07-rendering-pipeline.md`
7. `08-qa-regression-plan.md`

## Allowed Implementation Scope

AI coding agents may implement:

- workspace and project records
- asset metadata
- timeline JSON model
- scene and caption draft workflow boundaries
- render job status model
- preview/final export state handling
- review/approval gate
- QA fixtures and tests

## Blocked Scope

Do not implement without approval:

- direct social publishing
- stock licensing marketplace
- autonomous final export without human approval
- billing or credits logic
- native desktop app
- external worker infrastructure provisioning
- unreviewed AI content safety policy

## Stop Conditions

Stop and ask for review if:

- render provider is unclear
- asset rights behavior is unclear
- timeline schema conflicts with rendering needs
- AI workflow would overwrite user edits
- a requested feature adds publishing, billing, or licensing behavior

## Required Output After Changes

- files changed
- workflows implemented
- tests run
- rendering assumptions
- unresolved open questions
- risks introduced

## Verification Checklist

- Timeline edits persist.
- Caption edits persist.
- Preview render job can be created.
- Final export is blocked until approval.
- Render failure state is user-visible.
- AI output remains draft until user accepts it.
