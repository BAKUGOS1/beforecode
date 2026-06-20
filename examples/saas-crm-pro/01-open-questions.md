# Open Questions

This file exists to prevent product, technical, or AI implementation assumptions from being silently invented.

## Product Decisions

- Should lead statuses be fixed globally or configurable per organization?
- Should a lead support multiple phone numbers or only one primary phone number?
- Should duplicate detection check phone, email, or both?
- Can a lead be converted to more than one deal?
- Should archived leads still appear in global search?
- Should tags be free-form text or admin-managed values?
- Should deal value be required during conversion?
- Should import/export be included in v1 or delayed to v1.1?

## UX Decisions

- Should lead detail open in a drawer, full page, or both?
- What is the default lead table filter for sales representatives?
- Should overdue follow-ups appear as badges, separate view, or dashboard card?
- Should manager dashboards include charts in v1 or only data tables?
- What empty states should appear for new organizations?
- Should bulk actions be available in MVP?

## Technical Decisions

- Should business logic live in server actions or route handlers?
- Should activities be one polymorphic table or separate notes/tasks/calls tables?
- Should soft delete use `archived_at`, `deleted_at`, or both?
- What fields need full-text search?
- Should audit logs store raw previous values or structured metadata only?
- Should RLS policies permit manager team access through a `teams` table in v1?

## Security and Compliance Decisions

- What is the required password policy?
- Should organization owners be able to export all lead data?
- How long should audit logs be retained?
- Should admins be able to impersonate users? Recommendation: no for v1.
- Should PII fields like phone and email be masked for viewers?

## QA Decisions

- What record volume should be used as the performance baseline: 1,000, 10,000, or 50,000 leads?
- Which browsers must be tested for release?
- Should mobile table UX be tested as a blocker?
- Which workflows are P0 release blockers?
