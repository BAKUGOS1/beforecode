<div align="center">

<img src="assets/beforecode-banner.svg" alt="BeforeCode — Plan first. Build with confidence." width="100%" />

# BeforeCode

**Plan first. Build with confidence.**

**A spec-first software planning toolkit and CLI for humans and AI coding agents.**

[![License: MIT](https://img.shields.io/badge/License-MIT-111827.svg)](LICENSE)
[![Node.js 18+](https://img.shields.io/badge/Node.js-18%2B-339933.svg)](package.json)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-7c3aed.svg)](CONTRIBUTING.md)
[![Docs](https://img.shields.io/badge/docs-ready-0891b2.svg)](docs/getting-started.md)

[Install CLI](#install-the-cli) · [Get started](docs/getting-started.md) · [Browse templates](templates/README.md) · [See examples](examples/README.md) · [Roadmap](docs/roadmap.md)

</div>

---

BeforeCode helps you turn an idea into a build-ready source of truth before implementation begins. It combines product requirements, technical architecture, database and API planning, permissions, UX, QA, deployment, and AI handoff in one practical Markdown workflow.

```text
Idea → Research → Requirements → Architecture → Data → API → QA → Implementation
```

## Install the CLI

Requires Node.js 18 or later. Until the package is published to npm, install the current stable CLI directly from `main` inside your project:

```bash
npm install --save-dev github:BAKUGOS1/beforecode#main
```

Generate the recommended docs for a SaaS project:

```bash
npx beforecode init --type saas --name "My SaaS"
```

Useful commands:

```bash
npx beforecode list
npx beforecode check
npx beforecode score
npx beforecode handoff --name "My SaaS"
```

The CLI preserves existing files by default. Use `--dry-run` to preview and `--force` only when replacement is intentional. Read the full [CLI usage guide](docs/cli-usage.md).

## Why BeforeCode?

Projects rarely become difficult because typing code is slow. They become difficult because requirements are incomplete, decisions conflict, edge cases appear late, and AI coding tools receive weak context.

BeforeCode gives teams a repeatable way to answer:

- What are we building, for whom, and why?
- What belongs in the MVP—and what does not?
- How should the system, database, API, permissions, and UX work?
- What must be tested before release?
- What context should a developer or AI coding agent receive?

## What You Get

| Area | Included |
|---|---|
| Product | Project brief, research, BRD, PRD, SRS, release scope |
| Experience | UX flows, UI system, roles and permission matrix |
| Engineering | TRD, database schema, API docs, decision records |
| Delivery | Implementation plan, build plan, deployment plan |
| Quality | PRD, technical, API, QA, pre-build, and launch checklists |
| AI handoff | Prompts and generated instructions for coding agents |
| CLI | Generate, add, check, score, and prepare handoff files |
| Examples | Complete SaaS CRM and production-oriented AI agent packs |

## Quick Start

### 1. Choose a Documentation Track

| Project | Recommended starting set |
|---|---|
| Small app | Project Brief → PRD → Build Plan → QA |
| SaaS | Research → PRD → TRD → Database → API → QA → Deployment |
| CRM/ERP | BRD → PRD → SRS → Permissions → Data → API → QA |
| AI agent | PRD → TRD → Workflow → Tools → Memory → Evals → Threat Model |
| Open source | Brief → Roadmap → README → Contributing → Release Checklist |

See the complete [project type guide](docs/project-types.md).

### 2. Generate or Copy Templates

Recommended CLI method:

```bash
npx beforecode init --type ai-agent --name "My Agent"
```

Manual method:

```bash
git clone https://github.com/BAKUGOS1/beforecode.git
cp -R beforecode/templates ./project-docs
```

### 3. Complete Documents in Decision Order

Start with facts and decisions. Write measurable acceptance criteria. Link related requirements across product, technical, data, API, and QA documents.

### 4. Review Readiness

Use the [checklists](checklists/README.md) before implementation and release.

### 5. Hand Off to Development or an AI Agent

```bash
npx beforecode handoff --name "My Project"
```

Use the [AI coding handoff guide](docs/ai-coding-handoff.md) and keep approved documents as the source of truth.

## Complete Examples

### MiniCRM — SaaS CRM

A complete multi-tenant CRM pack covering product requirements, architecture, PostgreSQL schema, API contracts, permissions, QA, and phased delivery.

[Open MiniCRM pack →](examples/saas-crm/README.md)

### TaskPilot — AI Agent

A researched agent architecture covering durable execution, checkpoints, approval gates, tool security, memory, evaluation, observability, threat modeling, and implementation.

[Open TaskPilot pack →](examples/ai-agent/README.md)

## Repository Map

```text
beforecode/
├── bin/           CLI executable
├── src/           CLI commands, core logic, and project presets
├── tests/         Node.js test suite
├── docs/          Usage guides and project workflow
├── templates/     Reusable planning documents
├── checklists/    Quality and readiness gates
├── prompts/       AI-assisted documentation and build prompts
├── examples/      Complete reference documentation packs
└── .github/       Contribution and quality automation
```

## Design Principles

- **Practical over ceremonial** — every document should support a real decision.
- **Specific over vague** — requirements need owners, rules, limits, and acceptance criteria.
- **Traceable by default** — product, technical, API, database, and QA decisions should agree.
- **AI-friendly, human-owned** — AI can accelerate documentation; people approve scope and risk.
- **Progressive depth** — small projects use a few files; complex systems use the full pack.
- **Safe by default** — the CLI preserves existing files unless replacement is explicit.
- **Markdown-first** — portable, reviewable, version-controlled, and tool-independent.

## Project Status

The core template library, CLI MVP, and two complete example packs are ready for use. The npm package has not been published yet, so installation currently uses the GitHub `main` branch.

See the [roadmap](docs/roadmap.md), [CLI roadmap](docs/cli-roadmap.md), and [changelog](CHANGELOG.md).

## Contributing

Contributions are welcome—especially stronger templates, real example packs, CLI improvements, clearer acceptance criteria, and better review checklists.

Read [CONTRIBUTING.md](CONTRIBUTING.md), follow the [Code of Conduct](CODE_OF_CONDUCT.md), and use the issue templates before opening a pull request.

## Security

Please do not report security concerns through public issues. Follow [SECURITY.md](SECURITY.md).

## License

Released under the [MIT License](LICENSE).

<div align="center">

If BeforeCode helps your project, consider starring the repository and sharing the workflow.

</div>
