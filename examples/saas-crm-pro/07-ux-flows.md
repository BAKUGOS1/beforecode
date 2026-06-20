# UX Flows and Screen Inventory

## Source Context

This UX document maps the CRM product requirements to screens, flows, and interaction states.

## Navigation Model

Primary navigation:

- Dashboard
- Leads
- Deals
- Activities
- Reports
- Settings

Secondary navigation in Settings:

- Users
- Roles
- Sources
- Pipeline Stages
- Import/Export if added later

## Core Screens

| Screen | Purpose | Primary Users |
|---|---|---|
| Dashboard | Overview of pipeline, overdue follow-ups, and lead activity | owner, manager |
| Lead List | Search, filter, sort, create, archive, and open leads | all roles except restricted viewer |
| Lead Detail | Inspect contact, timeline, notes, activities, conversion action | owner, manager, sales rep |
| Deal Pipeline | See and move deals by stage | owner, manager, sales rep |
| Activity View | Today/overdue/completed follow-up list | sales rep, manager |
| Settings | Configure users, roles, sources, stages | owner, admin |

## Lead Creation Flow

```text
User opens Lead List
→ clicks New Lead
→ form opens in drawer/modal
→ user enters required contact details
→ validation runs
→ duplicate check runs
→ lead is saved
→ detail drawer opens or lead appears highlighted in table
```

Required states:

- empty form
- validation error
- duplicate warning
- saving state
- success state
- permission error

## Lead Detail Flow

Lead detail should show:

- contact information
- owner and status
- source and tags
- estimated value
- next follow-up
- timeline entries
- notes and activities
- convert to deal action
- archive action if permitted

## Follow-up Flow

```text
Sales rep opens lead
→ clicks Schedule Follow-up
→ selects date/time and note
→ follow-up appears in timeline
→ dashboard/activity view shows due item
→ if date passes, item becomes overdue
```

UX rule: overdue state must be visible without opening every lead.

## Lead-to-Deal Conversion Flow

```text
Lead detail
→ Convert to Deal
→ confirm stage/value/close date
→ create deal
→ update lead status to converted
→ show linked deal in lead detail
```

Do not silently delete or hide the original lead after conversion.

## Table UX Requirements

- Search input visible above table.
- Filters should include owner, status, source, and follow-up state.
- Page size options: 25, 50, 100.
- Empty state should guide user to create first lead.
- Loading state should use skeleton rows.
- Mobile view should collapse into cards or horizontal-safe table.

## Error and Empty States

| State | Message Intent |
|---|---|
| No leads | Explain how to create first lead |
| No filter results | Offer clear filters action |
| Permission denied | Explain access limitation without leaking data |
| Save failed | Preserve entered form data |
| Duplicate found | Show safe duplicate warning |

## UX Risks

- Too many table filters can overwhelm small teams.
- Drawer-only detail view may be weak for deep records.
- Mobile lead table can become unreadable if not designed early.
- Pipeline drag-and-drop should not be added before basic stage update is stable.
