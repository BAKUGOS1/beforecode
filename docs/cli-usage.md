# CLI Usage

BeforeCode CLI generates project documentation inside an existing or new software project.

## Local usage from the repository

```bash
npm install
node ./bin/beforecode.js help
node ./bin/beforecode.js list
```

## Recommended context-first start

Install BeforeCode in your project:

```bash
npm install --save-dev beforecode
npx beforecode start
```

`beforecode start` asks for project context before generating docs. This prevents generic demo documentation and creates a planning workspace from the user's real idea.

Use a prepared idea file:

```bash
beforecode start --from idea.md
```

Preview without writing files:

```bash
beforecode start --from idea.md --dry-run
```

## Advanced quick-template mode

```bash
beforecode init --type saas
```

Use a custom docs folder:

```bash
beforecode init --type ai-agent --docs project-docs
```

Preview without writing files:

```bash
beforecode init --type saas --dry-run
```

Replace existing generated files intentionally:

```bash
beforecode init --type saas --force
```

## Add one template

```bash
beforecode add prd
beforecode add api-documentation
beforecode add qa-test-plan
```

## Check readiness

```bash
beforecode check --type saas
```

If `.beforecoderc.json` exists, the CLI can read the project type and docs path automatically:

```bash
beforecode check
```

## Score readiness

```bash
beforecode score --type saas
```

The MVP score is based on whether required files exist. Later versions can inspect sections and traceability.

## Diagnose project health

```bash
beforecode doctor --type saas
```

If `.beforecoderc.json` exists, the command can infer the project type and docs path:

```bash
beforecode doctor
```

`doctor` audits:

- Missing required documents for the selected project type.
- Documents that still look shallow or placeholder-heavy.
- Whether `.beforecoderc.json` exists.
- Whether `AGENTS.md` and `docs/ai-handoff.md` exist.
- Suggested next steps before implementation.

## Generate AI handoff files

```bash
beforecode handoff
```

This creates:

```text
AGENTS.md
docs/ai-handoff.md
```

## Supported project types

- small
- portfolio
- saas
- crm
- ecommerce
- mobile
- ai-agent
- opensource

## Safe behavior

The CLI does not overwrite files by default. Use `--force` only when replacing existing generated files is intentional.
