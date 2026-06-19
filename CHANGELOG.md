# Changelog

All notable changes to BeforeCode are documented here.

The project follows a lightweight version of Keep a Changelog and intends to use semantic versioning for published releases.

## Unreleased

### Added

- Zero-dependency Node.js CLI with `init`, `add`, `check`, `score`, `handoff`, and `list` commands
- Project-type presets for small, portfolio, SaaS, CRM, e-commerce, mobile, AI agent, and open-source projects
- Safe file generation with dry-run and explicit force modes
- `.beforecoderc.json` project configuration
- AI handoff generation for `AGENTS.md` and project instructions
- CLI tests and GitHub Actions validation
- Packed-package verification in a clean temporary consumer project
- Protected manual npm release workflow with provenance configuration
- Release runbook covering first publish, trusted publishing, validation, and recovery
- Professional repository navigation and community health files
- Complete TaskPilot AI agent documentation pack
- Complete MiniCRM SaaS CRM documentation pack
- Template, checklist, prompt, and example indexes

### Changed

- Repositioned BeforeCode as a spec-first planning toolkit for humans and AI coding agents
- Expanded launch, API, build, and AI handoff guidance
- Adopted a lightweight direct-to-`main` maintainer workflow with mandatory checks
- Documented installation directly from the GitHub `main` branch before npm publication
- Made `package.json` the single version source for CLI output and generated configuration
- Hardened npm package metadata, included files, repository links, and public publish settings

### Fixed

- Replaced incomplete license text with the full MIT License
- Removed the temporary repository setup note
- Prevented CLI and generated configuration versions from drifting apart

## 0.1.0 — 2026-06-19

### Added

- Initial Markdown template library
- Documentation workflow and project-type guide
- Core readiness checklists
- Starter AI prompt library
- SaaS CRM and AI agent example foundations
