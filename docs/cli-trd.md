# BeforeCode CLI TRD

## Overview

The CLI is a zero-dependency Node.js tool that copies BeforeCode templates into a project and checks documentation readiness.

## Runtime

- Node.js 18+
- ECMAScript modules
- Built-in filesystem APIs
- Node built-in test runner

## Entry Point

```text
bin/beforecode.js
```

## Source Layout

```text
src/cli.js
src/commands/
src/core/
src/data/
src/args.js
src/fs-utils.js
src/paths.js
```

## Commands

- `init` generates a docs set
- `add` copies one template
- `check` checks required docs
- `score` shows readiness score
- `handoff` creates AI handoff files
- `list` shows supported options

## Safety Rules

- Do not overwrite files by default
- Use `--force` to replace existing files
- Use `--dry-run` to preview changes
- Generate `.beforecoderc.json` for future checks

## Test Strategy

Use Node's built-in test runner.

```bash
npm test
```

## Future Scope

- Interactive prompts
- Template variables beyond basic fields
- Section-level scoring
- Traceability scoring
- npm publishing workflow
