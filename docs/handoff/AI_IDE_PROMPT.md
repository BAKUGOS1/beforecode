You are working in the `BAKUGOS1/beforecode` repository.

Task: apply and verify the BeforeCode CLI MVP from the extracted handoff files.

Rules:
- Keep package name as `beforecode`.
- Preserve the existing template library.
- Do not remove docs, examples, checklists, prompts, or assets.
- Verify Node.js 18+ compatibility.
- Run `npm test`.
- Run CLI smoke tests:
  - `node ./bin/beforecode.js help`
  - `node ./bin/beforecode.js list`
  - `node ./bin/beforecode.js init --type saas --docs tmp-docs`
  - `node ./bin/beforecode.js check --type saas --docs tmp-docs`
  - `node ./bin/beforecode.js handoff --name Demo --docs tmp-docs`
- Fix any issue with the smallest safe change.
- Keep commits clean and meaningful.

Expected CLI commands:
- `beforecode init`
- `beforecode add`
- `beforecode check`
- `beforecode score`
- `beforecode handoff`
- `beforecode list`

Expected project types:
- small
- portfolio
- saas
- crm
- ecommerce
- mobile
- ai-agent
- opensource
