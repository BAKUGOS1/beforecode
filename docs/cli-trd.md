# BeforeCode CLI TRD

## Overview

The CLI is a zero-dependency Node.js tool that copies BeforeCode templates into a project.

## Runtime

- Node.js 18+
- ECMAScript modules
- Built-in filesystem APIs

## Entry Point

```text
bin/beforecode.js
```

## Source Layout

```text
src/cli.js
src/project-types.js
src/template-map.js
src/fs-utils.js
src/args.js
src/paths.js
```

## Commands

- `init` generates a docs set
- `add` copies one template
- `check` checks required docs
- `score` shows readiness score
- `list` shows supported options

## Safety Rules

- Do not overwrite files by default
- Use `--force` to replace existing files
- Generate `.beforecoderc.json` for future checks

## Future Scope

- Interactive prompts
- Template variables
- Better scoring
- Test suite
- npm publishing
- AI handoff generation
