# npm Publish Guide

Package name: `beforecode`

## Pre-publish checks

```bash
npm install
npm test
node ./bin/beforecode.js help
node ./bin/beforecode.js list
node ./bin/beforecode.js init --type saas --docs tmp-docs
node ./bin/beforecode.js check --type saas --docs tmp-docs
npm pack --dry-run
```

## Publish

If npm account permissions are ready:

```bash
npm login
npm publish --access public
```

If using GitHub Actions trusted publishing, configure npm trusted publisher first and use the release workflow.

Do not share npm tokens or passwords with AI tools.
