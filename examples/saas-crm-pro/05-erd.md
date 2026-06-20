# Entity Relationship Design

## Source Context

This ERD supports the SaaS CRM Pro MVP defined in `03-prd.md`.

## Relationship Summary

```text
organizations 1─* profiles
organizations 1─* leads
organizations 1─* deals
leads 1─* activities
leads 1─0..1 deals
profiles 1─* assigned leads
profiles 1─* activities
```

## Core Tables

### `organizations`

| Field | Type | Notes |
|---|---|---|
| `id` | uuid | primary key |
| `name` | text | required |
| `slug` | text | unique |
| `created_at` | timestamptz | default now |

### `profiles`

| Field | Type | Notes |
|---|---|---|
| `id` | uuid | maps to auth user id |
| `organization_id` | uuid | FK organizations |
| `full_name` | text | required |
| `role` | text | owner, admin, manager, sales_rep, viewer |
| `is_active` | boolean | default true |
| `created_at` | timestamptz | default now |

### `leads`

| Field | Type | Notes |
|---|---|---|
| `id` | uuid | primary key |
| `organization_id` | uuid | FK organizations, required |
| `owner_id` | uuid | FK profiles |
| `name` | text | required |
| `phone` | text | required |
| `email` | text | optional |
| `source_id` | uuid | FK lead_sources |
| `status` | text | new, contacted, qualified, lost, converted |
| `value` | numeric | optional estimated value |
| `next_follow_up_at` | timestamptz | optional |
| `archived_at` | timestamptz | null means active |
| `created_at` | timestamptz | default now |
| `updated_at` | timestamptz | updated on mutation |

### `activities`

| Field | Type | Notes |
|---|---|---|
| `id` | uuid | primary key |
| `organization_id` | uuid | FK organizations |
| `lead_id` | uuid | FK leads |
| `actor_id` | uuid | FK profiles |
| `type` | text | note, call, task, status_change, owner_change |
| `body` | text | optional note content |
| `due_at` | timestamptz | for tasks/follow-ups |
| `completed_at` | timestamptz | optional |
| `metadata` | jsonb | structured change data |
| `created_at` | timestamptz | default now |

### `deals`

| Field | Type | Notes |
|---|---|---|
| `id` | uuid | primary key |
| `organization_id` | uuid | FK organizations |
| `lead_id` | uuid | FK leads, unique for v1 |
| `owner_id` | uuid | FK profiles |
| `stage_id` | uuid | FK pipeline_stages |
| `value` | numeric | copied from lead unless edited |
| `expected_close_date` | date | optional |
| `created_at` | timestamptz | default now |
| `updated_at` | timestamptz | updated on mutation |

## Configuration Tables

| Table | Purpose |
|---|---|
| `lead_sources` | website, referral, phone, WhatsApp, manual |
| `pipeline_stages` | new, qualified, proposal, negotiation, won, lost |
| `tags` | optional controlled labels |
| `audit_logs` | immutable sensitive changes |

## Recommended Indexes

- `leads(organization_id, owner_id)`
- `leads(organization_id, status)`
- `leads(organization_id, source_id)`
- `leads(organization_id, next_follow_up_at)`
- `leads(organization_id, archived_at)`
- `activities(organization_id, lead_id, created_at)`
- `deals(organization_id, stage_id)`

## RLS Notes

- Every query must be scoped to the current user's organization.
- Owner/admin can access all records in the organization.
- Manager access may be all organization records in v1 unless teams are added.
- Sales reps can access assigned leads and linked activities/deals.
- Viewers can read allowed records but cannot mutate.

## Open Data Decisions

- Whether team-level access is needed in v1.
- Whether phone numbers should be normalized before duplicate checks.
- Whether tags are free-form or admin-managed.
