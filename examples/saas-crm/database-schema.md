# MiniCRM Database Schema

## 1. Database Overview

MiniCRM uses PostgreSQL with UUID keys, workspace-based multi-tenancy, Row Level Security, foreign keys, audit timestamps, and soft deletion for business records.

## 2. Relationship Map

```text
users → workspace_members ← workspaces
workspaces → pipelines → pipeline_stages
workspaces → leads → contacts
workspaces → deals → contacts
leads/contacts/deals → activities
all important mutations → audit_logs
```

## 3. Core Tables

### workspaces

| Column | Type | Rules |
|---|---|---|
| id | uuid | Primary key |
| name | text | Required |
| slug | text | Unique, required |
| timezone | text | Default UTC |
| currency_code | char(3) | Default USD |
| created_by | uuid | References auth user |
| created_at | timestamptz | Required |
| updated_at | timestamptz | Required |

### workspace_members

| Column | Type | Rules |
|---|---|---|
| id | uuid | Primary key |
| workspace_id | uuid | FK, required |
| user_id | uuid | FK, required |
| role | text | owner, manager, member |
| status | text | invited, active, deactivated |
| joined_at | timestamptz | Nullable |
| created_at | timestamptz | Required |

Constraint: unique `(workspace_id, user_id)`.

### workspace_invitations

| Column | Type | Rules |
|---|---|---|
| id | uuid | Primary key |
| workspace_id | uuid | FK, required |
| email | citext | Required |
| role | text | manager or member |
| token_hash | text | Unique, required |
| expires_at | timestamptz | Required |
| accepted_at | timestamptz | Nullable |
| invited_by | uuid | Required |

### leads

| Column | Type | Rules |
|---|---|---|
| id | uuid | Primary key |
| workspace_id | uuid | FK, required |
| first_name | text | Required |
| last_name | text | Nullable |
| email | citext | Nullable |
| phone | text | Nullable |
| company_name | text | Nullable |
| source | text | Nullable |
| status | text | new, contacted, qualified, unqualified, converted |
| owner_id | uuid | Active workspace member |
| estimated_value_minor | bigint | Minimum 0 |
| next_follow_up_at | timestamptz | Nullable |
| converted_contact_id | uuid | Nullable FK |
| converted_deal_id | uuid | Nullable FK |
| archived_at | timestamptz | Nullable |
| archived_by | uuid | Nullable |
| created_by | uuid | Required |
| created_at | timestamptz | Required |
| updated_at | timestamptz | Required |

Constraint: email or phone must be present.

### contacts

| Column | Type | Rules |
|---|---|---|
| id | uuid | Primary key |
| workspace_id | uuid | FK, required |
| first_name | text | Required |
| last_name | text | Nullable |
| email | citext | Nullable |
| phone | text | Nullable |
| company_name | text | Nullable |
| job_title | text | Nullable |
| owner_id | uuid | Active member |
| source_lead_id | uuid | Nullable FK |
| archived_at | timestamptz | Nullable |
| created_by | uuid | Required |
| created_at | timestamptz | Required |
| updated_at | timestamptz | Required |

### pipelines

| Column | Type | Rules |
|---|---|---|
| id | uuid | Primary key |
| workspace_id | uuid | FK, required |
| name | text | Required |
| is_default | boolean | Default false |
| created_at | timestamptz | Required |

### pipeline_stages

| Column | Type | Rules |
|---|---|---|
| id | uuid | Primary key |
| workspace_id | uuid | FK, required |
| pipeline_id | uuid | FK, required |
| name | text | Required |
| position | integer | Required, minimum 0 |
| probability | integer | 0–100 |
| created_at | timestamptz | Required |

Constraint: unique `(pipeline_id, position)`.

### deals

| Column | Type | Rules |
|---|---|---|
| id | uuid | Primary key |
| workspace_id | uuid | FK, required |
| pipeline_id | uuid | FK, required |
| stage_id | uuid | FK, required |
| contact_id | uuid | Nullable FK |
| source_lead_id | uuid | Nullable FK |
| title | text | Required |
| value_minor | bigint | Minimum 0 |
| currency_code | char(3) | Required |
| status | text | open, won, lost |
| owner_id | uuid | Active member |
| expected_close_date | date | Nullable |
| closed_at | timestamptz | Nullable |
| loss_reason | text | Nullable |
| archived_at | timestamptz | Nullable |
| created_by | uuid | Required |
| created_at | timestamptz | Required |
| updated_at | timestamptz | Required |

### activities

| Column | Type | Rules |
|---|---|---|
| id | uuid | Primary key |
| workspace_id | uuid | FK, required |
| activity_type | text | note, call, meeting, email, task |
| subject | text | Required |
| description | text | Nullable |
| lead_id | uuid | Nullable FK |
| contact_id | uuid | Nullable FK |
| deal_id | uuid | Nullable FK |
| owner_id | uuid | Active member |
| due_at | timestamptz | Nullable |
| completed_at | timestamptz | Nullable |
| created_by | uuid | Required |
| created_at | timestamptz | Required |
| updated_at | timestamptz | Required |

Constraint: at least one related lead, contact, or deal is required unless the activity is workspace-level.

### audit_logs

| Column | Type | Rules |
|---|---|---|
| id | uuid | Primary key |
| workspace_id | uuid | FK, required |
| actor_id | uuid | Nullable for system actions |
| entity_type | text | Required |
| entity_id | uuid | Required |
| action | text | Required |
| changes | jsonb | Redacted change summary |
| created_at | timestamptz | Required |

## 4. Recommended Indexes

```text
workspace_members(user_id, status)
leads(workspace_id, archived_at, created_at desc)
leads(workspace_id, owner_id, status)
leads(workspace_id, next_follow_up_at)
contacts(workspace_id, email)
deals(workspace_id, status, stage_id)
deals(workspace_id, owner_id, expected_close_date)
activities(workspace_id, owner_id, due_at)
activities(workspace_id, deal_id, created_at desc)
audit_logs(workspace_id, entity_type, entity_id, created_at desc)
```

Add trigram or full-text indexes only after search behavior and query plans justify them.

## 5. RLS Policy Model

- Select requires active membership in the record workspace
- Insert requires active membership and permitted role
- Update checks workspace membership, role, and record ownership rules
- Workspace and role administration is owner-only
- Pipeline configuration is owner or manager
- Audit logs are append-only through trusted functions

## 6. Deletion Rules

- Leads, contacts, deals, and activities use archive-first behavior
- Permanent deletion is owner-only and should be rare
- Pipeline stages with deals cannot be deleted without reassignment
- Member deactivation preserves historical ownership references

## 7. Transactional Operations

Lead conversion, invitation acceptance, and deal close operations run in database transactions and produce audit records.

## 8. Data Retention and Privacy

- Store only necessary customer data
- Do not write secrets or credentials to audit logs
- Workspace deletion requires an explicit confirmation and retention policy
- Export and deletion capabilities should be added before regulated production use