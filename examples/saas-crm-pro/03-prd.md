# Product Requirements Document

## Source Context

Source-of-truth file: `00-project-context.md`.

This PRD converts the CRM context into testable product requirements. Missing product decisions are tracked in `01-open-questions.md`.

## Product Vision

SaaS CRM Pro gives small service businesses a simple, reliable system to manage leads, follow-ups, deals, and team ownership without enterprise CRM complexity.

## Goals

- Make every inbound lead visible, owned, and actionable.
- Reduce missed follow-ups through clear next-action tracking.
- Give managers pipeline visibility without spreadsheet exports.
- Ensure AI coding agents implement only approved scope.
- Keep v1 lightweight enough to ship in weeks, not months.

## Non-goals

- The product is not an accounting system.
- The product is not a marketing automation platform in v1.
- The product does not include AI scoring in v1.
- The product does not require native mobile apps in v1.

## Personas

| Persona | Primary Need | Pain Today |
|---|---|---|
| Owner | Revenue and pipeline visibility | No reliable single dashboard |
| Admin | Configure users, roles, sources, stages | Setup is scattered or manual |
| Manager | Track team follow-ups and stuck deals | Follow-up ownership is unclear |
| Sales Rep | Work assigned leads quickly | Lead data lives in too many places |
| Viewer | Read status and reports | Needs visibility without edit access |

## Functional Requirements

| ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| FR-001 | Create a lead with required contact fields | Must | Name and phone are required; invalid data blocks save |
| FR-002 | Assign lead owner | Must | Admin/manager can assign; sales rep sees assigned leads |
| FR-003 | Search leads | Must | Search supports name, phone, email where configured |
| FR-004 | Filter leads | Must | Filter by owner, status, source, tag, and overdue state |
| FR-005 | Sort and paginate lead table | Must | User can sort by created date, value, and follow-up date |
| FR-006 | View lead detail | Must | Detail shows contact, status, source, value, owner, notes, timeline |
| FR-007 | Add note/activity | Must | Note appears in timeline with author and timestamp |
| FR-008 | Schedule follow-up | Must | Follow-up date is saved and overdue state is visible |
| FR-009 | Convert lead to deal | Must | Deal preserves source, owner, value, and linked lead |
| FR-010 | Move deal stage | Should | Stage update persists and audit/timeline record is created |
| FR-011 | Archive and restore lead | Must | Archived lead leaves active list and can be restored by permitted users |
| FR-012 | Manage sources and stages | Should | Admin can add/edit values used in forms |
| FR-013 | Enforce roles | Must | Unauthorized users cannot view or edit restricted records |

## Business Rules

- Lead phone number is required.
- Duplicate checks are scoped by organization.
- A lead can have one primary owner in v1.
- Archive is reversible; hard delete is not exposed in v1 UI.
- Conversion from lead to deal should not delete the lead.
- Stage changes and ownership changes are auditable.
- Viewer role cannot create, edit, archive, or convert records.

## Non-functional Requirements

| ID | Requirement | Target |
|---|---|---|
| NFR-001 | Lead table load time | Under 3 seconds with 1,000 records |
| NFR-002 | Search/filter response | Under 2 seconds for indexed fields |
| NFR-003 | Tenant isolation | 100 percent RLS coverage for business tables |
| NFR-004 | Form validation | All mutation forms use schema validation |
| NFR-005 | Auditability | Ownership/status/stage changes are logged |
| NFR-006 | Accessibility | Core flows usable through keyboard navigation |

## MVP Acceptance Flow

```text
Admin creates organization settings
→ manager invites sales rep
→ sales rep creates lead
→ manager assigns owner
→ sales rep schedules follow-up
→ sales rep adds notes
→ lead is converted to deal
→ manager moves deal stage
→ owner reviews pipeline
```

## Release Criteria

- All P0 QA cases pass.
- No cross-organization data access is possible.
- Lead-to-deal conversion preserves required data.
- Table performance meets baseline targets.
- AI handoff has clear allowed and blocked changes.
