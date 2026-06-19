# CLI Usage

## Install locally from the repository

```bash
npm install
node ./bin/beforecode.js help
```

## Generate docs for a SaaS project

```bash
beforecode init --type saas
```

This creates a `docs/` folder with the recommended SaaS documentation set.

## Generate docs in a custom folder

```bash
beforecode init --type ai-agent --docs project-docs
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

## Score readiness

```bash
beforecode score --type saas
```

## List options

```bash
beforecode list
```

## Supported project types

- small
- portfolio
- saas
- crm
- ai-agent
- opensource

## Notes

The CLI does not overwrite files by default. Use `--force` only when you intentionally want to replace existing generated files.
