# MiniCRM QA Test Plan

## 1. Objective

Verify that MiniCRM's core sales workflows are correct, secure, responsive, and usable for workspace owners, managers, and members.

## 2. Included Scope

- Authentication and session behavior
- Workspace onboarding and invitations
- Role-based permissions
- Lead CRUD, search, filtering, archive, restore, and import
- Lead conversion
- Contact management
- Deal pipeline and close actions
- Activities and reminders
- Dashboard summaries
- Responsive states and accessibility smoke checks
- Cross-workspace isolation

## 3. Out of Scope

- Billing
- Native mobile applications
- Email/calendar synchronization
- Large enterprise load testing
- Third-party marketplace integrations

## 4. Test Environments

| Environment | Purpose |
|---|---|
| Local | Developer checks |
| Staging | Full functional and regression testing |
| Production | Post-release smoke testing only |

Test roles: owner, manager, member, deactivated member, and user from another workspace.

## 5. Entry Criteria

- Testable build deployed
- Migrations applied
- Seed users and data available
- Major APIs operational
- Requirements and known limitations shared

## 6. Core Test Cases

| ID | Module | Scenario | Expected Result | Priority |
|---|---|---|---|---|
| AUTH-001 | Auth | Sign in with valid credentials | User reaches active workspace | Critical |
| AUTH-002 | Auth | Access protected route while signed out | Redirect to sign-in | Critical |
| WS-001 | Workspace | Create workspace | Owner membership and defaults created | Critical |
| WS-002 | Team | Owner invites member | Valid invitation created | High |
| PERM-001 | Permissions | Member opens owner settings | Access denied | Critical |
| PERM-002 | Security | User requests another workspace record | Generic not-found/forbidden response; no data leak | Critical |
| LEAD-001 | Leads | Create lead with valid data | Lead saved and listed | Critical |
| LEAD-002 | Leads | Submit without email and phone | Validation prevents save | High |
| LEAD-003 | Leads | Create probable duplicate | Duplicate warning shown | High |
| LEAD-004 | Leads | Search and filter leads | Correct records and clear-filter action | High |
| LEAD-005 | Leads | Archive and restore lead | Default list hides then restores record | High |
| CONV-001 | Conversion | Convert qualified lead | Contact and deal created atomically | Critical |
| CONV-002 | Conversion | Convert same lead twice | Second action rejected without duplicates | Critical |
| DEAL-001 | Deals | Move deal to another stage | Stage and history update | Critical |
| DEAL-002 | Deals | Mark deal won | Status, close time, and dashboard update | Critical |
| DEAL-003 | Deals | Mark deal lost with reason | Deal closes and reason persists | High |
| ACT-001 | Activities | Create due task | Task appears on record and activity list | High |
| ACT-002 | Activities | Complete overdue task | Completion recorded and overdue state removed | High |
| DASH-001 | Dashboard | Compare cards with source records | Totals match permission-scoped data | Critical |
| IMP-001 | Import | Import valid and invalid CSV rows | Preview and final summary are accurate | High |
| UI-001 | Responsive | Complete lead creation on mobile width | No blocked or hidden controls | High |
| A11Y-001 | Accessibility | Navigate core form by keyboard | Logical focus and visible focus indicator | High |

## 7. Negative and Edge Coverage

- Expired or reused invitation
- Deactivated member with existing session
- Very long names and descriptions
- Invalid email, phone, date, currency, and negative values
- Double-click on create and conversion actions
- Network interruption during mutation
- Stale deal update from two browser sessions
- Empty, single-record, and high-volume list states
- Archived related records
- Pipeline stage deletion while deals exist
- CSV with unknown columns, duplicate rows, malformed encoding, and excessive size

## 8. Security Tests

- Change workspace ID in requests
- Change owner ID to a user outside the workspace
- Attempt owner-only mutations as manager and member
- Verify archived records remain workspace-protected
- Confirm service credentials are absent from browser assets
- Check unsafe HTML is rendered as text
- Verify errors do not reveal SQL, stack traces, or record existence

## 9. Performance Smoke Targets

| Action | Target |
|---|---:|
| Main list page | ≤ 3 seconds |
| Search/filter | ≤ 2 seconds |
| Save/update/archive | ≤ 3 seconds |
| Dashboard | ≤ 3 seconds |
| Lead conversion | ≤ 3 seconds |

Run with realistic seeded data and record environment details.

## 10. Regression Suite

Required before release:

1. Sign in and workspace access
2. Lead create, update, search, archive, and restore
3. Lead conversion
4. Deal stage update, win, and loss
5. Activity create and complete
6. Dashboard accuracy
7. Owner, manager, member permission checks
8. Cross-workspace isolation
9. Mobile core workflow

## 11. Bug Report Format

```text
Title:
Environment/build:
Role/workspace:
Preconditions:
Steps to reproduce:
Actual result:
Expected result:
Frequency:
Severity and priority:
Evidence:
Logs/request ID:
```

## 12. Exit Criteria

- 100% critical test cases executed and passed
- At least 95% high-priority cases passed
- No open critical defects
- No open high-severity security or data-integrity defects
- Medium defects have documented acceptance or release plan
- Performance smoke targets pass for core actions
- Regression evidence is attached to the release record