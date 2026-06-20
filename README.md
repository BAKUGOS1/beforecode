# BeforeCode

Spec-first project planning toolkit for humans and AI coding agents.

Generate structured Markdown documentation packs before writing a single line of code.

## Install

```bash
npm install -g beforecode
```

Or use without installing:

```bash
npx beforecode init --type saas
```

## Quick start

```bash
# Generate a full documentation set for a SaaS project
beforecode init --type saas --name "My App"

# Check which docs are present
beforecode check

# See readiness score by category
beforecode score

# Generate AI coding agent handoff files
beforecode handoff --name "My App"
```

## Commands

| Command | Description |
|---------|-------------|
| `beforecode init --type <type>` | Generate a numbered doc set |
| `beforecode add <template>` | Add a single template |
| `beforecode check` | Check which docs exist |
| `beforecode score` | Show readiness by category |
| `beforecode handoff` | Generate `AGENTS.md` and `ai-handoff.md` |
| `beforecode list` | Show project types and templates |

## Options

| Flag | Description |
|------|-------------|
| `--type <type>` | Project type (saas, crm, mobile, etc.) |
| `--name <name>` | Project name |
| `--docs <path>` | Documentation folder (default: `docs`) |
| `--force` | Overwrite existing files |
| `--dry-run` | Preview without writing |
| `--version` | Show version |

## Project types

- **small** — Small app
- **portfolio** — Portfolio site
- **saas** — SaaS product
- **crm** — CRM or operations system
- **ecommerce** — E-commerce or marketplace
- **mobile** — Mobile app
- **ai-agent** — AI agent
- **opensource** — Open-source tool

## How it works

1. Run `beforecode init --type saas` in your project.
2. Numbered Markdown files are created in `docs/` from templates.
3. A `.beforecoderc.json` config is saved so future commands auto-detect your project.
4. Fill in the docs with your product requirements, technical design, and test plans.
5. Run `beforecode check` and `beforecode score` to track completeness.
6. Run `beforecode handoff` to generate `AGENTS.md` for AI coding agents.

## What's included

- **17 document templates** — PRD, TRD, SRS, database schema, API docs, and more.
- **6 readiness checklists** — Pre-build, PRD review, QA, API, technical, and launch.
- **AI prompts** — Ready-made prompts for ChatGPT and Codex-style agents.
- **Example packs** — Complete reference documentation for SaaS CRM and AI Agent projects.

## Safe defaults

- Files are never overwritten unless you pass `--force`.
- `--dry-run` lets you preview before writing.
- Zero dependencies — runs on Node.js built-ins only.

## Requirements

- Node.js 18 or later

## License

[MIT](LICENSE)
