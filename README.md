<div align="center">

# BeforeCode

**Plan first. Build with confidence.**

Spec-first project planning toolkit and CLI for humans and AI coding agents.

[![npm](https://img.shields.io/npm/v/beforecode?color=cb3837)](https://www.npmjs.com/package/beforecode)
[![Node.js 18+](https://img.shields.io/badge/Node.js-18%2B-339933)](package.json)
[![License: MIT](https://img.shields.io/badge/License-MIT-111827)](LICENSE)

[Install](#install) · [Workflow](#workflow) · [Commands](#commands) · [Project types](#project-types) · [Examples](#examples) · [References](docs/references.md)

</div>

---

BeforeCode helps you turn an idea into a build-ready documentation system before implementation starts. It captures project context first, then generates connected Markdown documents for product requirements, UX, architecture, database, API, QA, deployment, and AI coding handoff.

## Install

Recommended project setup:

```bash
npm install --save-dev beforecode
npx beforecode start
```

`beforecode start` asks for your idea, target users, problem, MVP scope, out-of-scope items, technical preferences, and build mode before it creates docs.

Use without installing:

```bash
npx beforecode start
```

Use a prepared idea file:

```bash
npx beforecode start --from idea.md
```

Advanced quick-template mode:

```bash
npx beforecode init --type saas --name "My App"
```

## Workflow

```mermaid
flowchart LR
    Idea[Idea] --> Context[Project context]
    Context --> Questions[Open questions]
    Questions --> Requirements[Requirements]
    Requirements --> UX[UX and permissions]
    UX --> Architecture[Architecture]
    Architecture --> Data[Database and API]
    Data --> QA[QA readiness]
    QA --> Build[Implementation]
    Build --> Release[Release]
```

The documents are intentionally connected:

```mermaid
flowchart TD
    Context[00 Project Context] --> Questions[01 Open Questions]
    Context --> Brief[Project Brief]
    Questions --> PRD[PRD / SRS]
    Brief --> PRD
    PRD --> UX[UX Flows]
    PRD --> Access[Permission Matrix]
    PRD --> TRD[Technical Requirements]
    UX --> TRD
    Access --> TRD
    TRD --> DB[Database Schema]
    TRD --> API[API Documentation]
    DB --> API
    PRD --> QA[QA Test Plan]
    API --> QA
    QA --> Plan[Implementation Plan]
```

## Quick start

```bash
# Capture context and generate a planning workspace
npx beforecode start

# Check which docs are present
npx beforecode check

# Show readiness score by category
npx beforecode score

# Run a project health audit
npx beforecode doctor

# Generate AI coding agent handoff files
npx beforecode handoff --name "My App"
```

Generated structure:

```text
your-project/
├── .beforecoderc.json
└── docs/
    ├── 00-project-context.md
    ├── 01-open-questions.md
    ├── 03-project-brief.md
    ├── 04-research-report.md
    ├── 05-prd.md
    ├── 06-ux-flows.md
    ├── 07-trd.md
    └── ...
```

## Commands

| Command | Description |
|---|---|
| `beforecode start` | Capture project context first, then generate docs |
| `beforecode start --from idea.md` | Generate docs from an idea/context file |
| `beforecode init --type <type>` | Advanced quick-template mode |
| `beforecode add <template>` | Add a single template |
| `beforecode check` | Check which docs exist |
| `beforecode score` | Show readiness by category |
| `beforecode doctor` | Audit missing docs, weak docs, config, and AI handoff readiness |
| `beforecode handoff` | Generate `AGENTS.md` and AI handoff docs |
| `beforecode list` | Show project types and templates |

## Project types

| Type | Best for |
|---|---|
| `small` | Prototype or small app |
| `portfolio` | Portfolio or personal website |
| `saas` | Multi-user SaaS product |
| `crm` | CRM, ERP, or operations system |
| `ecommerce` | Store or marketplace |
| `mobile` | Mobile application |
| `ai-agent` | Tool-using or autonomous AI agent |
| `opensource` | Public library, CLI, or developer tool |

## What is included

- Context-first planning flow that avoids random demo docs.
- 17 document templates: PRD, TRD, SRS, database schema, API docs, QA plan, release scope, and more.
- Readiness checklists for product, API, technical, QA, launch, and pre-build review.
- AI prompts for documentation generation, audit, testing, and build handoff.
- Example packs for SaaS CRM and AI agent planning.
- Zero runtime dependencies.

## Safety defaults

- Existing files are not overwritten unless `--force` is passed.
- `--dry-run` previews generated files without writing.
- `.beforecoderc.json` saves project settings for future commands.
- Generated docs are starter structures; final product, security, legal, and architecture decisions remain human-owned.
- Missing context is written as `TBD` instead of being invented.

## Examples and references

- [SaaS CRM example](examples/saas-crm/README.md)
- [AI agent example](examples/ai-agent/README.md)
- [CLI usage guide](docs/cli-usage.md)
- [Release runbook](docs/releasing.md)
- [Reference material](docs/references.md)

## Requirements

- Node.js 18 or later

## License

[MIT](LICENSE)

<div align="center">

If BeforeCode helps your project, star the repository and share the workflow.

</div>
