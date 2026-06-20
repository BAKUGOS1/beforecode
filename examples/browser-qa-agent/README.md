# Browser QA Agent Reference Pack

Browser QA Agent is a detailed BeforeCode reference pack for an AI-assisted browser testing tool. It uses Playwright-style browser automation to test user workflows, capture evidence, and produce QA reports.

## Product Summary

The product lets a QA user define a test target, sign-in instructions, workflows, and expected behavior. The agent then navigates the app, performs approved tests, captures screenshots, reports bugs, and generates a structured QA handoff.

## Primary Workflow

```text
User defines test scope
→ agent opens browser
→ signs in with approved test account
→ executes approved workflows
→ captures screenshots and traces
→ detects bugs and UX gaps
→ generates QA report
→ human reviews findings
```

## Document Map

| File | Purpose |
|---|---|
| `00-project-context.md` | Product context and testing boundaries |
| `01-open-questions.md` | Unknown test scope, data safety, output decisions |
| `03-prd.md` | Product requirements and acceptance criteria |
| `04-trd.md` | Architecture, runtime, browser engine, and data flow |
| `05-browser-workflow.md` | Agent workflow and browser behavior |
| `06-report-format.md` | Bug report, evidence, and summary schema |
| `07-safety-rules.md` | Account handling, destructive actions, privacy, and limits |
| `08-evaluation-plan.md` | Fixtures, scoring, and regression evaluation |
| `09-ai-handoff.md` | AI coding agent implementation instructions |

## What This Example Teaches

- How to define safe browser automation scope.
- How to document test-account handling without exposing secrets.
- How to structure bug reports with evidence.
- How to test CRUD workflows without destructive data loss.
- How to evaluate an AI QA agent like a product, not just a script.

## Recreate With BeforeCode

```bash
npx beforecode start --from examples/browser-qa-agent/00-project-context.md
```
