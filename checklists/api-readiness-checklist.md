# API Readiness Checklist

## Contract

- [ ] Audience, base URL, protocol, and version are defined
- [ ] Every endpoint has purpose, permission, inputs, output, and errors
- [ ] Request and response examples match the schema
- [ ] Naming, timestamps, money, nullability, and IDs are consistent
- [ ] Breaking-change and deprecation policy is documented

## Authorization and Security

- [ ] Authentication and token/session lifecycle are defined
- [ ] Tenant and record authorization is enforced server-side
- [ ] Sensitive fields and secrets are never exposed unnecessarily
- [ ] Input validation, output encoding, upload, and URL-fetch risks are addressed
- [ ] Rate limits and abuse controls exist for sensitive endpoints
- [ ] Audit events cover administrative and sensitive actions

## Correctness and Reliability

- [ ] Side-effecting requests define idempotency behavior
- [ ] Timeouts and retryable/non-retryable errors are classified
- [ ] Concurrency and stale-update conflicts are handled
- [ ] Multi-step mutations define transaction/rollback behavior
- [ ] Webhooks/events define signatures, retries, ordering, and duplicates

## Lists and Scale

- [ ] Pagination has stable ordering, defaults, and maximum size
- [ ] Filters, sorting, and search fields are allowlisted
- [ ] Critical query volume and performance assumptions are reviewed
- [ ] Payload and file size limits are defined

## Developer Experience

- [ ] Error codes are stable and actionable
- [ ] Correlation/request IDs are available
- [ ] Contract tests or schema validation run in CI
- [ ] Changelog and migration guidance exist for consumers
- [ ] Examples contain no real credentials or private data

## Release Evidence

- [ ] Permission tests pass
- [ ] Negative and boundary tests pass
- [ ] API documentation matches deployed behavior
- [ ] Monitoring and alerts cover failures and latency
- [ ] Owners approve unresolved risks
