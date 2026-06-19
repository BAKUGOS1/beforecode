# BeforeCode CLI PRD

## Overview

BeforeCode CLI turns the Markdown toolkit into a project-integrated generator.

Users can run one command inside any software project and generate the right documentation set for the project type.

## Goal

Make BeforeCode usable without manual copying from GitHub.

## Target Users

- Developers starting a new project
- Existing project maintainers adding documentation
- AI coding users preparing source-of-truth docs
- Students creating structured project documentation

## MVP Commands

| Command | Purpose |
|---|---|
| `beforecode init --type saas` | Generate a documentation set for a project type |
| `beforecode add prd` | Add one template to the project |
| `beforecode check --type saas` | Check required docs for a project type |
| `beforecode score --type saas` | Show readiness score |
| `beforecode handoff` | Generate AI handoff files |
| `beforecode list` | Show supported project types and templates |

## Supported Project Types

- small
- portfolio
- saas
- crm
- ecommerce
- mobile
- ai-agent
- opensource

## Success Criteria

- CLI can run with Node 18 or later
- CLI can generate docs into a local `docs/` folder
- CLI does not overwrite files unless `--force` is used
- CLI supports `--dry-run`
- CLI creates `.beforecoderc.json`
- CLI can check missing docs
- CLI can generate a basic AI handoff package
- CLI can run tests with Node built-in test runner
- CLI works with `npx beforecode` after package publishing

## Non-goals for MVP

- No web UI
- No remote API
- No AI generation inside CLI
- No npm publishing automation yet
- No TypeScript build step yet
