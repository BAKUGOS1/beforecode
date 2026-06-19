# Technical Readiness Checklist

## Architecture

- [ ] System context, components, responsibilities, and trust boundaries are documented
- [ ] Product requirements trace to technical responses and verification
- [ ] State ownership and source-of-truth boundaries are clear
- [ ] Build-versus-buy and major trade-offs have decision records
- [ ] Scale, cost, and operational assumptions are visible

## Data and APIs

- [ ] Schema, constraints, indexes, transactions, and retention are planned
- [ ] Tenant isolation and record ownership are enforced server-side
- [ ] APIs define auth, errors, pagination, idempotency, and versioning
- [ ] Migrations, backfills, compatibility, and rollback are testable
- [ ] Critical queries and data-volume assumptions are reviewed

## Security and Reliability

- [ ] Threat boundaries and sensitive data are identified
- [ ] Secrets, encryption, validation, dependencies, and audit are covered
- [ ] Timeouts, retries, queues, duplicate delivery, and recovery are defined
- [ ] Backup, restore, disaster recovery, and degraded modes are planned
- [ ] Abuse, rate, upload, and external-call protections are considered

## Delivery and Operations

- [ ] Environments and configuration ownership are defined
- [ ] CI/CD gates and deployment strategy are documented
- [ ] Logs, metrics, traces, alerts, and correlation IDs are planned
- [ ] Testing covers contracts, migrations, security, performance, and failures
- [ ] Rollout and rollback stop conditions are explicit

## Approval

- [ ] Technical owner accepts known trade-offs
- [ ] Security/data/operations reviewers approve relevant sections
- [ ] No unresolved decision blocks the first implementation phase
