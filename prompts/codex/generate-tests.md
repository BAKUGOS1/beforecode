# Generate Tests From Requirements

```text
Read the PRD, TRD, permission matrix, API/database documents, QA plan, and relevant implementation before creating tests.

Build a traceability map from requirement IDs and acceptance criteria to tests.

Cover where relevant:
- Happy paths
- Required and invalid inputs
- Boundary values
- Empty and filtered-empty states
- Permissions, ownership, role changes, and cross-tenant access
- Duplicate submission and idempotency
- Concurrent and stale updates
- Timeouts, retries, partial failures, and recovery
- Archive, restore, delete, and retention
- API contracts and database constraints
- Accessibility and responsive critical flows
- Security and regression risks

Rules:
- Prefer deterministic tests and stable fixtures
- Test observable behavior, not implementation details
- Use realistic but non-sensitive data
- Do not mock the behavior being validated
- Add negative tests for every sensitive operation
- Keep each test independent and explain required environment assumptions

Return:
1. Coverage and traceability summary
2. Proposed test layers and files
3. Implemented tests
4. Commands run and results
5. Requirements still lacking testable behavior
6. Remaining manual QA cases
```
