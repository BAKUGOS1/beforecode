# Launch Readiness Checklist

## Product and Scope

- [ ] Release scope and target users are approved
- [ ] Must-have acceptance criteria pass
- [ ] Out-of-scope items and known limitations are documented
- [ ] User-facing help, onboarding, and communication are ready

## Quality

- [ ] Critical regression suite passes
- [ ] No unresolved critical/high release-blocking defect
- [ ] Supported browsers/devices/platforms are verified
- [ ] Accessibility target is checked
- [ ] Performance and reliability targets pass

## Security and Privacy

- [ ] Authorization and tenant-isolation tests pass
- [ ] Secrets, production access, and connector scopes are reviewed
- [ ] Security scans and threat-model actions are complete
- [ ] Privacy, retention, export, and deletion requirements are ready
- [ ] Vulnerability reporting path exists

## Data and Migration

- [ ] Production backup and restore plan are verified
- [ ] Migrations and backfills were tested on representative data
- [ ] Compatibility and rollback/forward-fix plans are documented
- [ ] Data-integrity verification queries are prepared

## Operations

- [ ] Dashboards, logs, traces, and alerts are active
- [ ] On-call/support owners and escalation path are known
- [ ] Capacity, quotas, rate limits, and third-party dependencies are reviewed
- [ ] Incident and rollback runbooks are accessible
- [ ] Status and health checks are verified

## Deployment

- [ ] Immutable release version/artifact is selected
- [ ] Environment configuration is reviewed without exposing secrets
- [ ] Feature flags and staged rollout are configured
- [ ] Stop conditions and rollback authority are explicit
- [ ] Post-deployment smoke tests are assigned

## Community and Documentation

- [ ] README, setup, API, deployment, and release notes are current
- [ ] License, contribution, code of conduct, support, and security files exist
- [ ] Issue and pull request workflows are ready
- [ ] Repository description, topics, and social preview are configured

## Go/No-Go

| Decision | Owner | Evidence/condition | Time |
|---|---|---|---|
| Go / No-go / Conditional |  |  |  |
