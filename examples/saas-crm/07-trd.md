# Technical Requirements Document

## Source Context

Generated from `00-project-context.md`. This TRD defines a practical v1 architecture for the MiniCRM example.

## Recommended Architecture

```text
Browser client
→ App routes and server actions/API handlers
→ Supabase Auth
→ Supabase Postgres with RLS
→ Storage/logging integrations as needed
```

## Application Modules

| Module | Responsibility |
|---|---|
| Auth | Sign in, session handling, organization membership |
| Leads | Lead CRUD, search, filters, ownership, archive/restore |
| Activities | Notes, calls, follow-ups, timeline events |
| Deals | Deal creation, pipeline stage updates, value tracking |
| Settings | Users, sources, roles, pipeline stages |
| Audit | Track sensitive updates such as owner and status changes |

## Suggested Data Model

| Table | Purpose | Key Fields |
|---|---|---|
| `organizations` | Tenant boundary | `id`, `name`, `created_at` |
| `profiles` | User profile and role | `id`, `organization_id`, `role`, `name` |
| `leads` | Lead records | `id`, `organization_id`, `owner_id`, `name`, `phone`, `status`, `source`, `value` |
| `activities` | Timeline entries | `id`, `lead_id`, `type`, `note`, `due_at`, `completed_at` |
| `deals` | Converted opportunities | `id`, `lead_id`, `stage`, `value`, `close_date` |
| `audit_logs` | Sensitive changes | `actor_id`, `entity_type`, `entity_id`, `action`, `metadata` |

## Access Control

- Every business table must include `organization_id` directly or through a strict parent relation.
- Sales users can read and update their own assigned leads.
- Managers can read team leads and deals.
- Admins can manage settings and users.
- Service-role access is not allowed from browser code.

## API Boundaries

| Endpoint or Action | Purpose |
|---|---|
| `createLead` | Validate and create lead |
| `updateLead` | Update allowed lead fields |
| `archiveLead` | Soft archive a lead |
| `addActivity` | Add note, call, task, or follow-up |
| `convertLeadToDeal` | Create deal from qualified lead |
| `updateDealStage` | Move deal through pipeline |

## Engineering Risks

- Duplicate phone/email logic can create false positives if not scoped by organization.
- RLS policies must be tested before real data is added.
- Search and filter queries need indexes before the lead table grows.
- Timeline data can become noisy if notes, calls, and system events are not typed clearly.

## Implementation Order

1. Data model and RLS policies
2. Authentication and organization membership
3. Lead CRUD with validation
4. Lead table search/filter/pagination
5. Lead detail drawer and timeline
6. Follow-up scheduling
7. Lead-to-deal conversion
8. QA pass and seed data
