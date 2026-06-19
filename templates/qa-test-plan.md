# QA Test Plan

## Document Control

| Field | Value |
|---|---|
| Release/build |  |
| QA owner |  |
| Environment |  |
| Status | Draft / Active / Complete |

## 1. Objective

Define product risks and what confidence this test cycle must establish.

## 2. Scope and Traceability

| Requirement/module | Included | Risk | Test coverage |
|---|---:|---|---|
|  | Yes / No | High / Medium / Low |  |

List out-of-scope areas and why they are excluded.

## 3. Test Strategy

Cover relevant functional, integration, contract, UI, validation, permission, security, accessibility, compatibility, migration, performance, recovery, and regression testing.

## 4. Environments and Test Data

Define environments, versions, browsers/devices, roles, integrations, seeded data, data isolation, and cleanup.

## 5. Entry Criteria

- Requirements and build are reviewable
- Environment and test accounts are available
- Blocking dependencies are operational
- Known limitations are documented

## 6. Test Cases

| ID | Requirement | Scenario | Preconditions | Steps | Expected result | Priority | Status |
|---|---|---|---|---|---|---|---|
| TC-001 | FR-001 |  |  |  |  | Critical | Not run |

Include positive, negative, boundary, empty, duplicate, concurrency, authorization, interruption, and recovery cases.

## 7. Automation Plan

| Layer | Tool | Coverage | CI trigger | Owner |
|---|---|---|---|---|
| Unit / API / E2E |  |  |  |  |

## 8. Non-Functional Targets

| Area | Target | Test method | Result |
|---|---|---|---|
| Performance |  |  |  |
| Accessibility |  |  |  |
| Security |  |  |  |
| Reliability |  |  |  |

## 9. Defect Management

```text
Title:
Build/environment:
Role/account:
Preconditions:
Steps:
Actual result:
Expected result:
Frequency:
Severity/priority:
Evidence and request ID:
```

Define severity, triage ownership, retest, reopen, accepted-risk, and regression rules.

## 10. Regression Suite

List workflows that must pass for every release and the data needed to run them.

## 11. Exit Criteria

- All critical cases pass
- No unresolved critical/high release-blocking defect
- Required regression and non-functional targets pass
- Accepted risks have owner and approval
- Evidence and final test summary are stored

## 12. Test Summary

Record executed/passed/failed/blocked counts, unresolved defects, risks, recommendation, and approvers.
