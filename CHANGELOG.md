# Changelog

## 0.2.0

- Added `beforecode doctor` project health audit command.
- Doctor checks missing required docs, shallow or placeholder-heavy docs, `.beforecoderc.json`, and AI handoff readiness.
- Updated README and CLI usage docs for the doctor workflow.
- Added doctor command tests and package smoke verification.

## 0.1.0

- Initial release.
- CLI commands: `init`, `add`, `check`, `score`, `handoff`, `list`.
- 8 project types: small, portfolio, saas, crm, ecommerce, mobile, ai-agent, opensource.
- 17 document templates generated from `templates/` folder.
- 6 readiness checklists in `checklists/`.
- AI prompts for ChatGPT and Codex in `prompts/`.
- `.beforecoderc.json` config file for project persistence.
- `--dry-run` and `--force` safety flags.
- Category-based readiness scoring for product, experience, engineering, quality, and delivery.
- `AGENTS.md` and `ai-handoff.md` generation for AI coding agents.
- Zero runtime dependencies.
- GitHub Actions workflows for CI, docs quality, and npm publish.
