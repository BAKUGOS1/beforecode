# Project Context

## Project Name

SaaS CRM Pro

## Raw Idea

Build a multi-tenant CRM for small and mid-sized service businesses. The product should help teams manage leads, deals, activities, ownership, and follow-ups from one clean web dashboard.

## Problem

Sales teams often lose track of leads because data lives in spreadsheets, phone calls, WhatsApp chats, emails, and personal reminders. Managers cannot see who owns each lead, which follow-ups are overdue, or which deals are close to closing. Existing enterprise CRMs are too complex for small teams and require heavy setup.

## Target Users

- Owner: business owner who wants pipeline visibility and revenue control.
- Admin: person responsible for users, sources, pipeline stages, and settings.
- Manager: sales lead who monitors team performance and stuck deals.
- Sales Representative: user who creates leads, logs activities, follows up, and converts opportunities.
- Viewer: read-only user who can inspect dashboards and reports.

## Project Type

saas

## MVP Scope

- Organization-based multi-tenancy.
- User authentication and role-based access.
- Lead CRUD with owner, source, status, value, tags, and next follow-up.
- Search, sorting, filters, and pagination on lead table.
- Lead detail page or drawer with timeline, notes, calls, tasks, and status history.
- Follow-up scheduling with overdue indicators.
- Convert lead into deal.
- Deal pipeline with stages and expected close date.
- Archive-first delete with restore option.
- Basic settings for sources, stages, users, and roles.
- QA-ready seed data for at least 100 records.

## Out of Scope for v1

- Native mobile applications.
- Advanced marketing automation.
- Built-in email campaign sending.
- AI lead scoring.
- Accounting, invoice, GST, or payment modules.
- Marketplace integrations.
- Complex territory management.

## Tech Preferences

- Next.js with JavaScript/JSX, not TypeScript.
- shadcn/ui components.
- React Hook Form with Zod validation.
- TanStack Query for server state.
- Supabase Postgres, Auth, JWT, and RLS.
- Light mode first.
- Separate API or server-action layer for business logic.

## Business Rules

- Every business record belongs to one organization.
- Leads are archived before deletion.
- Duplicate detection is scoped inside the same organization.
- Phone number is required for lead creation.
- A lead can have one primary owner in v1.
- Only managers and admins can reassign another user's lead.
- Conversion should preserve lead source, value, owner, and notes.
- Deal stage changes should create timeline/audit records.

## Success Criteria

- A sales rep can create and follow up on a lead in under one minute.
- A manager can identify overdue follow-ups without exporting data.
- Lead list loads within 3 seconds for 1,000 records.
- Search and filters respond within 2 seconds for indexed fields.
- RLS tests prove users cannot access other organizations' data.

## BeforeCode Rule

Do not invent behavior that is not in this context. If a decision is missing, add it to `01-open-questions.md`.
