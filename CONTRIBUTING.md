# Contributing to BeforeCode

Thank you for helping make software planning clearer and more useful.

## Ways to contribute

- Improve an existing template or checklist
- Add a complete, realistic example pack
- Strengthen acceptance criteria, edge cases, or security coverage
- Improve guides and AI prompts
- Report broken links, inconsistencies, or unclear wording
- Propose a new project-specific documentation track

## Before opening a change

1. Search existing issues and pull requests.
2. Open an issue for major structure, naming, or scope changes.
3. Keep one pull request focused on one logical improvement.
4. Do not include confidential project information or copied proprietary documents.

## Content standards

A contribution should be:

- Practical enough to use on a real project
- Specific about what the reader should write or decide
- Consistent with related templates and examples
- Written in clear international English
- Markdown-first and easy to diff
- Free of unexplained placeholders, fake claims, and promotional links
- Original or legally reusable with attribution where required

## Template standard

Strong templates normally include:

- Purpose and intended use
- Required inputs
- Structured sections
- Tables or examples where they improve clarity
- Acceptance, risk, edge-case, or verification guidance
- Completion criteria

## Example-pack standard

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

## File and style rules

- Use lowercase hyphen-separated filenames
- Use ATX headings (`#`, `##`, `###`)
- Keep heading levels sequential
- Use relative links inside the repository
- Use fenced blocks for diagrams, payloads, and commands
- Keep tables readable in raw Markdown
- Avoid decorative formatting that reduces scanability

## Pull request process

1. Create a descriptive branch such as `docs/improve-prd-template`.
2. Update related indexes when adding or renaming files.
3. Check internal links and cross-document consistency.
4. Complete the pull request checklist.
5. Respond to review feedback and keep discussion respectful.

## Commit examples

```text
docs: improve getting started workflow
template: add threat model template
checklist: expand API readiness checks
example: add e-commerce documentation pack
fix: correct broken relative links
```

## Review criteria

Maintainers review usefulness, correctness, consistency, clarity, maintainability, originality, and fit with BeforeCode's scope.

By participating, you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md). For security concerns, use [SECURITY.md](SECURITY.md) instead of a public issue.
