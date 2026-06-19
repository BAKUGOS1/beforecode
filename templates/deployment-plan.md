# Deployment Plan

## 1. Release Overview

| Field | Value |
|---|---|
| Release/version |  |
| Owner |  |
| Window |  |
| Risk level |  |
| Rollback authority |  |

Describe user impact and major changes.

## 2. Environments

| Environment | Purpose | Data policy | Access | Deployment source |
|---|---|---|---|---|
| Local |  |  |  |  |
| Staging |  |  |  |  |
| Production |  |  |  |  |

## 3. Preconditions

- CI and required reviews pass
- Release artifact/version is immutable
- Secrets and configuration are verified
- Backup/restore and migration plans are reviewed
- Support, monitoring, and communication are ready

## 4. Configuration and Secrets

List variable name, owner, environment, source, rotation, and whether it is required. Never include secret values.

## 5. Database and Data Migration

Define migration order, compatibility window, backup, lock/downtime risk, backfill, verification queries, and forward-fix/rollback.

## 6. Deployment Steps

| Step | Action | Owner | Expected evidence | Stop condition |
|---:|---|---|---|---|
| 1 |  |  |  |  |

## 7. Rollout Strategy

Describe feature flags, canary/staged percentage, tenant/user targeting, duration, and promotion criteria.

## 8. Verification

Cover health checks, authentication, critical workflows, permissions, integrations, data integrity, logs, metrics, and performance.

## 9. Rollback

Define triggers, decision owner, application rollback, database response, configuration rollback, user communication, and post-rollback checks.

## 10. Monitoring and Incident Response

List dashboards, alerts, thresholds, on-call owner, incident channel, and correlation identifiers.

## 11. Completion

Record deployment time, version, verification evidence, incidents, accepted risks, and follow-up actions.
