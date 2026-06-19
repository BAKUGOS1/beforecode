# MiniCRM Product Requirements Document

## 1. Product Overview

MiniCRM is a responsive SaaS application for small teams to manage leads, contacts, deals, and sales activities. The product prioritizes fast setup, clear ownership, and simple workflows over enterprise-level customization.

## 2. Product Principles

- Keep common actions obvious and fast
- Preserve a complete customer history
- Scope every record to a workspace
- Prevent accidental data loss
- Provide useful defaults before customization
- Make permissions understandable

## 3. Personas

### Workspace Owner

Creates the workspace, manages members and settings, and has full access.

### Sales Manager

Reviews team performance, assigns records, manages pipeline stages, and accesses all sales records.

### Sales Member

Creates and manages assigned records, records activities, and progresses deals.

## 4. Information Architecture

```text
Dashboard
Leads
Contacts
Deals
Activities
Team
Settings
```

## 5. Functional Requirements

### FR-001 Authentication

Users can sign up, sign in, sign out, request a password reset, and maintain a secure session.

Acceptance criteria:

- Valid users can access their workspace
- Invalid credentials show a safe, useful error
- Protected routes redirect unauthenticated users
- Signing out invalidates the local session

### FR-002 Workspace Onboarding

A new user can create a workspace and becomes its owner.

Acceptance criteria:

- Workspace name is required
- A URL-safe workspace slug is generated
- Owner membership is created automatically
- The user reaches an onboarding checklist after creation

### FR-003 Team Management

Owners can invite, deactivate, and change roles for team members. Managers can view members but cannot transfer ownership.

### FR-004 Lead Management

Users can create, view, edit, assign, archive, restore, search, filter, sort, and paginate leads.

Required lead fields:

- First name
- Last name
- Email or phone
- Company
- Source
- Status
- Owner
- Estimated value
- Next follow-up date

Rules:

- At least one contact method is required
- Email is normalized to lowercase
- Phone is stored in normalized form where possible
- Potential duplicates trigger a warning without silently merging records
- Archived leads are excluded from default lists

### FR-005 Lead Conversion

A qualified lead can be converted into a contact and deal.

Acceptance criteria:

- User selects pipeline, stage, title, value, and expected close date
- Existing matching contact can be selected instead of creating a duplicate
- Conversion is atomic
- Original lead remains available with converted status and links
- Conversion event appears in activity history

### FR-006 Contact Management

Users can manage people and their company, communication details, owner, notes, related deals, and activity timeline.

### FR-007 Deal Pipeline

Users can create deals and move them through ordered pipeline stages.

Deal statuses:

```text
open
won
lost
```

Acceptance criteria:

- Each deal belongs to a pipeline and stage
- Stage changes are recorded
- Won and lost actions require confirmation
- Lost deals may include a loss reason
- Pipeline board and table show consistent data

### FR-008 Activities

Users can create notes, calls, meetings, emails, and tasks related to a lead, contact, or deal.

Acceptance criteria:

- Activities contain type, subject, owner, due date, status, and optional description
- Tasks can be marked complete
- Overdue open tasks are visually identified
- Timeline displays newest events first

### FR-009 Dashboard

Dashboard shows:

- Total active leads
- New leads in selected period
- Open deal count and value
- Won deal value
- Overdue activities
- Deals by stage
- Recent activity

Filters include date range and owner where permitted.

### FR-010 Search and Filters

Users can search by person, company, email, phone, and deal title. List filters are reflected in the URL when practical and can be cleared in one action.

### FR-011 Import

Managers and owners can import leads from CSV using a preview and column-mapping flow.

Acceptance criteria:

- Invalid rows are identified before import
- Import summary reports created, skipped, and failed rows
- Maximum MVP import size is documented and enforced

### FR-012 Roles and Permissions

| Capability | Owner | Manager | Member |
|---|---:|---:|---:|
| Manage workspace | Yes | No | No |
| Manage roles | Yes | No | No |
| Manage pipeline stages | Yes | Yes | No |
| View all sales records | Yes | Yes | No |
| View assigned/shared records | Yes | Yes | Yes |
| Create records | Yes | Yes | Yes |
| Archive own/assigned records | Yes | Yes | Yes |
| Permanent deletion | Yes | No | No |

### FR-013 Settings

Workspace settings include name, timezone, currency, lead sources, pipeline stages, and loss reasons.

### FR-014 Auditability

Important create, update, assignment, conversion, stage, archive, restore, and permission events are attributable to a user and timestamp.

## 6. UX Requirements

- Desktop layout uses sidebar navigation
- Mobile layout uses compact navigation and stacked forms
- Forms preserve entered values after recoverable validation errors
- Destructive actions require confirmation
- Every list has loading, empty, filtered-empty, error, and populated states
- Keyboard focus is visible
- Labels do not rely only on color

## 7. Non-Functional Requirements

### Performance

- Initial authenticated page load: target under 3 seconds
- Search/filter response: target under 2 seconds
- Save/update actions: target under 3 seconds
- Lists use server-side pagination

### Security

- All data access is workspace-scoped
- Authorization is enforced server-side
- Passwords are handled by the authentication provider
- Sensitive configuration remains server-side
- Inputs are validated before persistence
- Rate limits apply to authentication and import actions

### Reliability

- Conversion and stage-closing operations use database transactions
- User-facing errors include a retry path when safe
- Important mutations are idempotent where duplicate submission is possible

### Accessibility

Target WCAG 2.1 AA for core workflows, including semantic labels, keyboard operation, contrast, and focus management.

### Browser Support

Latest two stable versions of Chrome, Edge, Firefox, and Safari.

## 8. Analytics Events

```text
workspace_created
lead_created
lead_import_completed
lead_converted
deal_stage_changed
deal_won
deal_lost
activity_completed
member_invited
```

Analytics must not include unnecessary personal customer data.

## 9. MVP Release Criteria

- All high-priority functional requirements implemented
- No unresolved critical or high-severity security defects
- Lead-to-deal workflow passes end-to-end testing
- Permission matrix passes automated and manual checks
- Core pages meet smoke performance targets
- Setup, deployment, and known-limit documentation is complete

## 10. Future Scope

- Subscription billing
- Multiple pipelines
- Email and calendar synchronization
- Workflow automation
- Custom fields
- Advanced reports
- Public API and webhooks
- AI assistance and lead scoring