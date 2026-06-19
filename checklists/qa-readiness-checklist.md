# QA Readiness Checklist

## Requirements and Build

- [ ] Testable build and version are available
- [ ] Requirements and acceptance criteria are approved and traceable
- [ ] Known limitations and changed areas are documented
- [ ] Critical workflows and release risks are prioritized

## Environment and Data

- [ ] Test environment matches required production behavior
- [ ] Roles, accounts, integrations, devices, and browsers are available
- [ ] Valid, invalid, empty, boundary, duplicate, and high-volume data exist
- [ ] Test data is isolated, non-sensitive, and resettable

## Coverage

- [ ] Functional, permission, validation, error, and recovery cases are included
- [ ] Integration, API contract, migration, and regression coverage exists
- [ ] Security, accessibility, performance, and compatibility targets are testable
- [ ] Concurrent, stale-state, duplicate-action, and interruption cases are covered
- [ ] Critical automated tests run in CI

## Defect and Evidence Process

- [ ] Severity, priority, triage, retest, and reopen rules are defined
- [ ] Evidence format includes build, role, data, request ID, and screenshots/logs
- [ ] Release-blocking criteria and accepted-risk authority are explicit
- [ ] Final test summary owner and storage location are known

## Entry Decision

- [ ] Blocking dependencies are operational
- [ ] QA owner accepts remaining environment limitations
- [ ] Testing can begin without guessing expected behavior
