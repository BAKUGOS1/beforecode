# CLI Usage

BeforeCode CLI generates project documentation inside an existing or new software project. It requires Node.js 18 or later.

## Install From GitHub

Until the package is published to npm, install the current stable code directly from `main`:

```bash
npm install --save-dev github:BAKUGOS1/beforecode#main
```

Then run:

```bash
npx beforecode help
npx beforecode list
```

This keeps BeforeCode project-local and records it in `devDependencies`.

## One-Time Use Without Keeping the Dependency

```bash
npm install --no-save github:BAKUGOS1/beforecode#main
npx beforecode init --type saas --name "My Project"
```

## Local Usage From a Repository Clone

```bash
git clone https://github.com/BAKUGOS1/beforecode.git
cd beforecode
npm install
node ./bin/beforecode.js help
node ./bin/beforecode.js list
```

## Generate a Documentation Set

Run inside the target project:

```bash
npx beforecode init --type saas --name "My SaaS"
```

Use a custom docs folder:

```bash
npx beforecode init --type ai-agent --name "Task Agent" --docs project-docs
```

Preview without writing files:

```bash
npx beforecode init --type saas --dry-run
```

Replace existing generated files intentionally:

```bash
npx beforecode init --type saas --force
```

The CLI does not overwrite files by default. Review generated documents before using `--force`.

## Add One Template

```bash
npx beforecode add prd
npx beforecode add api-documentation
npx beforecode add qa-test-plan
```

## Check Readiness

```bash
npx beforecode check --type saas
```

If `.beforecoderc.json` exists, the CLI reads the project type and docs path automatically:

```bash
npx beforecode check
```

## Score Readiness

```bash
npx beforecode score --type saas
```

The MVP score checks whether the recommended documents exist. It does not yet grade document quality or requirement traceability.

## Generate AI Handoff Files

```bash
npx beforecode handoff --name "My Project"
```

This creates:

```text
AGENTS.md
docs/ai-handoff.md
```

Existing files are preserved unless `--force` is supplied.

## Supported Project Types

- `small`
- `portfolio`
- `saas`
- `crm`
- `ecommerce`
- `mobile`
- `ai-agent`
- `opensource`

## Update BeforeCode

```bash
npm install --save-dev github:BAKUGOS1/beforecode#main
```

## Remove BeforeCode

```bash
npm uninstall beforecode
```

Generated documentation remains in the project after uninstalling the CLI.

## Future npm Installation

After the package is published to npm, the planned installation will be:

```bash
npm install --save-dev beforecode
npx beforecode init --type saas
```
