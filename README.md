<div align="center">

<img src="assets/beforecode-banner.svg" alt="BeforeCode — context-first planning toolkit" width="100%" />

<br />

[![npm version](https://img.shields.io/npm/v/beforecode?color=cb3837&label=npm)](https://www.npmjs.com/package/beforecode)
[![npm downloads](https://img.shields.io/npm/dm/beforecode?color=2563eb&label=downloads)](https://www.npmjs.com/package/beforecode)
[![Node.js 18+](https://img.shields.io/badge/Node.js-18%2B-339933)](package.json)

[![License: MIT](https://img.shields.io/badge/License-MIT-111827)](LICENSE)
[![CLI test](https://github.com/BAKUGOS1/beforecode/actions/workflows/cli-test.yml/badge.svg)](https://github.com/BAKUGOS1/beforecode/actions/workflows/cli-test.yml)
[![GitHub stars](https://img.shields.io/github/stars/BAKUGOS1/beforecode?style=social)](https://github.com/BAKUGOS1/beforecode/stargazers)

**Context-first project planning toolkit for humans and AI coding agents.**

[Install](#install) · [Context-first flow](#context-first-flow) · [Commands](#commands) · [Project types](#project-types) · [Examples](#examples-and-references)

</div>

---

## Why BeforeCode?

BeforeCode creates a planning workspace that captures the real idea first, asks for missing context, and then generates build-ready Markdown documentation.

| Without BeforeCode | With BeforeCode |
|---|---|
| Generic docs | Context-aware docs |
| Missing decisions hidden | Missing decisions become open questions |
| PRD, TRD, QA drift apart | Docs share one source of truth |
| Build starts before scope is clear | Build starts from reviewed context |

## Install

Recommended project setup:

```bash
npm install --save-dev beforecode
npx beforecode start
```

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

## Context-first flow

<img src="assets/context-first-workflow.svg" alt="BeforeCode context-first workflow" width="100%" />

`beforecode start` captures your idea, target users, problem, MVP scope, out-of-scope items, technical preferences, and build mode before creating docs.

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
npx beforecode start
npx beforecode check
npx beforecode score
npx beforecode doctor
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
| `beforecode doctor` | Audit missing docs, shallow docs, config, and handoff readiness |
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

## Safety defaults

- Existing files are not overwritten unless `--force` is passed.
- `--dry-run` previews generated files without writing.
- Missing context is written as `TBD` instead of being invented.
- `.beforecoderc.json` saves project settings for future commands.

## Examples and references

- [Examples gallery](examples/README.md)
- [SaaS CRM Pro reference pack](examples/saas-crm-pro/README.md)
- [AI Video Editor reference pack](examples/ai-video-editor/README.md)
- [Browser QA Agent reference pack](examples/browser-qa-agent/README.md)
- [Example quality standard](examples/example-quality-standard.md)
- [CLI usage guide](docs/cli-usage.md)
- [Release runbook](docs/releasing.md)
- [Reference material](docs/references.md)

## Requirements

- Node.js 18 or later

## License

[MIT](LICENSE)

<div align="center">

**BeforeCode helps teams start with clarity before opening the editor.**

</div>
