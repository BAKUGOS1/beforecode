# AI Coding Handoff

## Project

SaaS CRM Pro

## Source-of-truth docs

Read these before changing code:

1. `00-project-context.md`
2. `03-prd.md`
3. `04-trd.md`
4. `05-erd.md`
5. `06-api-spec.md`
6. `08-permission-matrix.md`
7. `09-qa-test-plan.md`

## Approved Scope

The AI coding agent may implement:

- lead CRUD
- activity timeline
- follow-up scheduling
- lead-to-deal conversion
- deal pipeline basics
- organization-scoped RLS policies
- role-based UI and server checks
- settings for users, sources, and stages
- QA seed data and tests

## Blocked Scope

Do not implement without new approval:

- billing or subscriptions
- AI lead scoring
- email campaign sending
- native mobile app
- accounting or invoice module
- production data migration
- destructive hard delete
- service-role key usage in browser code

## Stop Conditions

Stop and ask for review if:

- requirements conflict across docs
- permission behavior is unclear
- RLS policy cannot be safely defined
- a feature requires secret keys or production data
- user requests scope not listed in the PRD

## Required Implementation Summary

After changes, report:

- files changed
- requirements implemented
- tests run
- risks or missing decisions
- any TBD items that still block release

## Verification Checklist

- Lead creation validation works.
- Duplicate handling is scoped by organization.
- Sales rep cannot access another organization's data.
- Lead conversion preserves owner/source/value.
- Archive and restore are reversible.
- `beforecode doctor` can still read the project docs.
