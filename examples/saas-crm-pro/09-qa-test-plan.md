# QA Test Plan

## Source Context

QA validates the workflows, permissions, data integrity, and release gates defined in the PRD/TRD/ERD/API docs.

## Testing Strategy

Test through UI for critical workflows and through API/database checks for security and data integrity. Use seeded data for volume and duplicate scenarios.

## P0 Release Blockers

| Test | Expected Result |
|---|---|
| Create valid lead | Lead appears in table and detail view |
| Required field validation | Save is blocked and error is shown |
| Duplicate phone inside organization | Duplicate warning or block appears |
| Cross-organization read attempt | Access denied through RLS |
| Sales rep views assigned lead | Assigned lead is visible |
| Sales rep views unassigned private lead | Record is not visible |
| Add note/activity | Timeline updates correctly |
| Schedule follow-up | Due and overdue states work |
| Convert lead to deal | Deal created with owner/source/value preserved |
| Archive lead | Lead leaves active list and remains restorable |
| Restore lead | Lead returns to active list |

## P1 Regression Tests

- Search by name, phone, and email.
- Filter by owner, source, status, and overdue state.
- Sort by created date, value, and next follow-up.
- Paginate through lead table.
- Change deal stage and reload page.
- Add/edit source in settings.
- Invite user and assign role.
- Manager dashboard shows expected counts.

## Negative Tests

| Scenario | Expected Behavior |
|---|---|
| Invalid email | Field validation error |
| Empty owner when required | Save blocked |
| Convert already converted lead | Safe error, no duplicate deal |
| Archive record without permission | Access denied |
| Update role as manager | Access denied |
| Delete through direct API call | Blocked unless explicitly supported |
| Invalid organization ID in payload | Ignored or rejected |

## Performance Tests

| Area | Dataset | Target |
|---|---:|---:|
| Lead table initial load | 1,000 leads | under 3 seconds |
| Search by phone/name | 1,000 leads | under 2 seconds |
| Filter by owner/status | 1,000 leads | under 2 seconds |
| Save lead | normal network | under 3 seconds |

## Evidence Requirements

For each release candidate, collect:

- test summary
- failed cases
- screenshots of core flows
- RLS/security test notes
- browser/device coverage
- known issues and accepted risks

## Release Gate

The build should not ship if any P0 workflow fails, if RLS leaks data, if lead-to-deal conversion loses data, or if table performance misses target by more than 50 percent.
