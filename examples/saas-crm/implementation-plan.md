# MiniCRM Implementation Plan

## 1. Delivery Goal

Deliver the documented MVP as a secure responsive web application with complete lead-to-deal workflow, workspace permissions, activities, dashboard reporting, automated critical-path tests, and reproducible deployment.

## 2. Source of Truth

Implementation follows:

- `project-brief.md`
- `prd.md`
- `trd.md`
- `database-schema.md`
- `api-documentation.md`
- `qa-test-plan.md`

Conflicts should be resolved in the documents before code is changed.

## 3. Build Phases

### Phase 0: Project Setup

- Initialize frontend and environment configuration
- Configure linting, formatting, testing, and CI
- Establish feature-based folder structure
- Create shared UI primitives and application shell
- Document local setup

Exit: clean install, build, test, and preview commands work.

### Phase 1: Database and Access Foundation

- Create workspace, membership, invitation, pipeline, and stage migrations
- Add tenant tables and indexes
- Enable RLS and write policy tests
- Seed default pipeline stages
- Add audit helper functions

Exit: users cannot access data outside active workspace membership.

### Phase 2: Authentication and Onboarding

- Build sign-up, sign-in, password reset, and sign-out flows
- Add protected routes and session restoration
- Build workspace creation and onboarding checklist
- Add invitation acceptance

Exit: owner can create workspace and member can join by valid invitation.

### Phase 3: Lead Management

- Build lead list, pagination, search, filters, and sorting
- Build create/edit forms with Zod validation
- Add duplicate warning
- Add archive and restore
- Add lead detail timeline shell

Exit: lead CRUD and record states pass QA cases.

### Phase 4: Contacts and Conversion

- Build contacts list and detail pages
- Implement transactional lead conversion function
- Add existing-contact selection
- Create conversion audit and activity events

Exit: one conversion produces one valid contact/deal result and cannot duplicate on retry.

### Phase 5: Deal Pipeline

- Build pipeline board and table fallback
- Add stage movement and optimistic conflict handling
- Add win/loss flows and loss reason
- Add deal detail and history

Exit: deal status and pipeline summaries remain consistent.

### Phase 6: Activities

- Build notes, calls, meetings, emails, and tasks
- Add due, overdue, complete, and timeline states
- Link activities to leads, contacts, and deals

Exit: activity lists and record timelines show correct permission-scoped data.

### Phase 7: Dashboard and Search

- Implement KPI and grouped stage queries
- Add date and owner filters
- Add global search
- Validate dashboard totals against source records

Exit: dashboard and search meet correctness and smoke performance targets.

### Phase 8: Team, Settings, and Import

- Add member list, invitation, role, and deactivation controls
- Add workspace, currency, timezone, pipeline, source, and loss-reason settings
- Add CSV upload, mapping, preview, batch import, and summary

Exit: permissions and import edge cases pass.

### Phase 9: Quality and Release

- Complete responsive and accessibility pass
- Add Playwright critical-path suite
- Run RLS and cross-workspace security tests
- Profile slow queries and verify indexes
- Complete staging regression and production checklist
- Finalize README, environment, migration, and rollback docs

Exit: QA exit criteria are satisfied.

## 4. Dependency Order

```text
Project setup
→ Database + RLS
→ Authentication + workspace
→ Leads
→ Contacts + conversion
→ Deals
→ Activities
→ Dashboard + search
→ Team/settings/import
→ Release hardening
```

## 5. Milestones

| Milestone | Deliverable |
|---|---|
| M1 | Running shell, CI, schema foundation |
| M2 | Authentication, onboarding, workspace isolation |
| M3 | Lead management complete |
| M4 | Lead conversion and contacts complete |
| M5 | Deal pipeline and activities complete |
| M6 | Dashboard, search, team, settings, import complete |
| M7 | Security, regression, documentation, and release |

## 6. Definition of Done per Feature

- Requirement and acceptance criteria implemented
- Loading, empty, error, success, and permission states handled
- Client validation and database constraints aligned
- Authorization verified server-side
- Unit/integration tests added where valuable
- Critical UI flow covered by end-to-end test
- Documentation updated
- No unresolved critical defect

## 7. Risk Controls

| Risk | Control |
|---|---|
| RLS errors | Policy tests before feature UI work |
| Conversion duplicates | Transaction, row lock, and conflict test |
| Slow lists | Pagination, indexes, selected columns, query review |
| Pipeline drag issues | Table fallback and server-authoritative stage update |
| Import instability | File cap, preview, batching, row-level error summary |
| Scope expansion | PRD out-of-scope review at every milestone |

## 8. Release Checklist

- Migrations reviewed and applied to staging
- CI green on release commit
- Critical Playwright suite passed
- Manual permission matrix passed
- Performance smoke results recorded
- Environment values verified
- Backup and rollback steps confirmed
- Production deployment verified with smoke tests
- Known issues and release notes published