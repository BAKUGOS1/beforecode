# Build From Approved Documentation

```text
Read the repository instructions and all approved project documents before editing code.

Source-of-truth order:
1. Explicit user instruction for this task
2. Approved change/decision records
3. PRD and acceptance criteria
4. TRD and security architecture
5. Database and API specifications
6. UX/UI, permission, QA, deployment, and implementation plans

Before implementation:
- Summarize the requested outcome
- Map it to requirement IDs and acceptance criteria
- Inspect the existing repository and identify affected files
- Report conflicts, missing requirements, unsafe assumptions, and unrelated existing changes
- Produce a bounded build plan with verification steps

During implementation:
- Work in dependency order and preserve existing user changes
- Enforce permissions, validation, and data rules server-side
- Handle loading, empty, error, permission, conflict, and recovery states
- Keep migrations and API changes backward compatible where required
- Add or update tests with the feature
- Do not add undocumented features or make external/destructive changes without authorization
- Update documentation when an approved implementation decision changes it

Before completion:
- Run relevant lint, tests, build, migration, and targeted QA checks
- Compare the implementation with acceptance criteria
- Report changed files, verification evidence, remaining risks, and follow-up work
- Never claim a requirement is complete without code or test evidence

If a material product or architecture decision is missing, stop at the decision boundary and ask a focused question.
```
