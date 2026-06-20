# BeforeCode CLI Handoff Pack

This ZIP contains the CLI implementation files for the `beforecode` repository.

## How to use in an AI IDE

1. Open your cloned `BAKUGOS1/beforecode` repository in the AI IDE.
2. Extract this ZIP into the repository root.
3. Allow files to overwrite existing CLI-related files only.
4. Keep the existing `templates/`, `checklists/`, `prompts/`, `assets/`, `examples/`, and repo docs unless the AI IDE intentionally updates them.
5. Run:

```bash
npm install
npm test
node ./bin/beforecode.js help
node ./bin/beforecode.js list
node ./bin/beforecode.js init --type saas --docs tmp-docs
node ./bin/beforecode.js check --type saas --docs tmp-docs
```

## Important

This pack assumes the main repository already has the real `templates/` folder. The CLI reads templates from `templates/`, so do not delete that folder.

## Publish preparation

Before publishing to npm, verify:

```bash
npm pack --dry-run
npm test
```

Then publish only from a clean repo state.

Do not paste npm tokens into any AI chat.
