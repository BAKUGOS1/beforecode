# Contributing to BeforeCode

Thank you for helping make software planning clearer and more useful.

## Repository Workflow

The maintainer uses a lightweight trunk-based workflow:

- `main` is the single maintained branch and must remain usable
- Small, reviewed, independently verifiable changes may be committed directly to `main`
- Run the relevant checks before considering a direct-main change complete
- Keep each commit focused and use a clear conventional-style message
- Do not leave temporary feature branches after work is integrated
- Use a temporary branch only when GitHub requires one for an external contribution or when an unusually risky change needs isolated review

External contributors should normally fork the repository and open a focused pull request because they cannot write directly to `main`.

## Documentation Ownership

The repository maintainer owns the root `README.md` and release-facing documentation.

Update the README in the same change whenever any of these change:

- Installation method or runtime requirement
- CLI command, flag, output, or safety behavior
- Supported project type or generated document set
- Repository structure or primary navigation
- Public release status, package availability, or roadmap claim
- Main workflow, diagram, example pack, or user-facing limitation

Contributors own documentation for the behavior they change. A feature is incomplete when its setup, usage, verification, migration, or limitation is undocumented.

## Ways to Contribute

- Improve an existing template or checklist
- Add a complete, realistic example pack
- Strengthen acceptance criteria, edge cases, or security coverage
- Improve guides, CLI behavior, diagrams, and AI prompts
- Report broken links, inconsistencies, or unclear wording
- Propose a new project-specific documentation track

## Before Opening a Change

1. Search existing files, issues, and pull requests.
2. Open an issue for major structure, naming, CLI contract, or scope changes.
3. Keep one commit or pull request focused on one logical improvement.
4. Do not include confidential project information or copied proprietary documents.

## Content Standards

A contribution should be:

- Practical enough to use on a real project
- Specific about what the reader should write or decide
- Consistent with related templates and examples
- Written in clear international English
- Markdown-first and easy to diff
- Free of unexplained placeholders, fake claims, and promotional links
- Original or legally reusable with attribution where required

## Template Standard

Strong templates normally include:

- Purpose and intended use
- Required inputs
- Structured sections
- Tables or examples where they improve clarity
- Acceptance, risk, edge-case, or verification guidance
- Completion criteria

## Diagram Standard

Use GitHub-native Mermaid for editable flows, dependency graphs, sequences, states, and architecture overviews. Keep diagrams small enough to understand at README width and explain their core meaning in nearby prose.

Use SVG for branded static assets. Do not use screenshots for information that should stay editable and version-controlled.

## Example-Pack Standard

A new example pack should contain a `README.md`, use one consistent product, and keep names, roles, IDs, requirements, architecture, data, API, and QA rules aligned across documents.

Minimum recommended pack:

```text
project-brief.md
prd.md
trd.md
database-schema.md
api-documentation.md
qa-test-plan.md
implementation-plan.md
README.md
```

## CLI Change Standard

CLI changes should:

- Preserve files by default
- Keep `--force` and `--dry-run` behavior predictable
- Support Node.js 18 or later
- Include or update automated tests
- Keep `package.json`, help output, README, usage docs, and version references aligned
- Pass `npm test` and relevant command smoke tests

## File and Style Rules

- Use lowercase hyphen-separated filenames
- Use ATX headings (`#`, `##`, `###`)
- Keep heading levels sequential
- Use relative links inside the repository
- Use fenced blocks for diagrams, payloads, and commands
- Keep tables readable in raw Markdown
- Avoid decorative formatting that reduces scanability

## Required Checks

Documentation changes are checked by the Documentation Quality GitHub Actions workflow.

CLI changes should also pass:

```bash
npm test
node ./bin/beforecode.js help
node ./bin/beforecode.js list
```

## Commit Examples

```text
docs: improve getting started workflow
template: add threat model template
checklist: expand API readiness checks
example: add e-commerce documentation pack
feat(cli): add interactive project selection
fix(cli): preserve config during template add
fix: correct broken relative links
```

## Review Criteria

Maintainers review usefulness, correctness, consistency, clarity, maintainability, originality, safety, and fit with BeforeCode's scope.

By participating, you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md). For security concerns, use [SECURITY.md](SECURITY.md) instead of a public issue.
