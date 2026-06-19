# Audit Implementation Against Documentation

```text
Read the repository and the approved project documents before making changes.

Treat the documents as the intended behavior, but report when implementation evidence suggests they are stale or conflicting.

Audit:
- Requirements and acceptance criteria coverage
- UX states and critical workflows
- Architecture and module boundaries
- Database schema, migrations, constraints, and indexes
- API contracts, authorization, errors, pagination, and idempotency
- Roles and permission enforcement
- Security, privacy, secrets, audit, and tenant isolation
- Tests, observability, deployment, and rollback readiness
- Performance and accessibility targets

For each finding provide:
- Severity
- Requirement/document reference
- Repository evidence with file paths
- Actual vs expected behavior
- Risk
- Recommended fix

Return:
1. Coverage summary
2. Completed requirements
3. Missing or partial requirements
4. Bugs and conflicts
5. Security and reliability risks
6. Test gaps
7. Prioritized implementation plan

Do not implement fixes unless explicitly asked. Do not claim completion without repository evidence.
```
