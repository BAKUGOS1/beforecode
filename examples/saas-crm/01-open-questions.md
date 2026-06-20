# Open Questions

These questions prevent the team or an AI coding agent from inventing requirements during implementation.

## Product

- What exact lead statuses should exist in v1?
- Can one lead be assigned to multiple owners, or only one?
- What should happen if a duplicate phone number is entered?
- Should archived leads be restorable?
- Which fields are mandatory during lead creation?

## Users and UX

- Should managers see all leads or only leads from their team?
- What is the default table view for sales representatives?
- Should lead conversion open a deal form or convert instantly?
- What notifications should appear for overdue follow-ups?

## Technical

- Should tenant isolation be implemented through `organization_id` on every table?
- Should notes and activities be separate tables or one unified timeline table?
- Which fields need database indexes for search and filters?
- What audit events are required for ownership and status changes?

## QA and Release

- Which workflows are release blockers if broken?
- What dataset size should be used for table performance testing?
- Should import/export be part of v1 or v1.1?
- What browser and screen sizes must be tested before launch?
