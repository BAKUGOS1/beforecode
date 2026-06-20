# Open Questions

## Product

- Should v1 run as a CLI only or include a web dashboard?
- Should reports be Markdown-only, JSON-only, spreadsheet-compatible, or all three?
- Should screenshots be embedded in report output or linked as local files?
- Should the agent classify issues as bug, UX issue, feature gap, performance issue, or blocker?
- Should the agent support test plans written in Markdown?

## Browser Workflow

- Which workflows are approved for default testing?
- Should the agent auto-discover navigation or follow an explicit route list?
- Should it use visible text selectors, test IDs, or a hybrid selector strategy?
- Should mobile viewport testing be part of MVP?
- Should console/network monitoring be enabled by default?

## Safety

- Which actions are considered destructive for the target app?
- Should archive/restore be allowed by default while permanent delete is blocked?
- Should the agent require confirmation before submitting forms?
- What should happen if test account sign-in fails?
- Should the agent mask email, phone, or customer data in reports?

## Technical

- Where should screenshots be stored?
- Should traces be captured for every run or only on failure?
- Should output include machine-readable bug IDs?
- Should reports be deterministic for CI usage?
- What timeout and retry policy should be used per step?

## Evaluation

- What fixture apps should be used for regression testing?
- How do we score whether the agent found the correct bug?
- How do we test that the agent avoids destructive actions?
- How do we compare agent reports across versions?
