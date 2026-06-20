# API Specification

## Source Context

This API spec maps PRD requirements to implementation boundaries. It can be implemented through Next.js route handlers, server actions, or another backend API layer.

## API Principles

- Every mutation validates input through a schema.
- Every request checks organization membership.
- Server derives `organization_id` from authenticated session, not client trust.
- Permission failures must not leak whether another organization's record exists.
- Archive operations are reversible in v1.

## Lead Actions

### `createLead`

Purpose: create a lead inside the current organization.

Required input:

```json
{
  "name": "Rohan Sharma",
  "phone": "+919999999999",
  "email": "rohan@example.com",
  "sourceId": "uuid",
  "ownerId": "uuid",
  "value": 25000,
  "tags": ["high-intent"]
}
```

Validation:

- `name` required.
- `phone` required and normalized before duplicate check.
- `ownerId` must belong to same organization.
- `sourceId` must belong to same organization.

Errors:

| Code | Meaning |
|---|---|
| `VALIDATION_ERROR` | Required or invalid field |
| `DUPLICATE_LEAD` | Matching phone/email inside organization |
| `FORBIDDEN` | User cannot create or assign owner |

### `updateLead`

Allowed fields:

- name
- phone
- email
- ownerId
- status
- sourceId
- value
- tags
- nextFollowUpAt

Business rules:

- Sales rep can update assigned lead fields except owner if policy blocks reassignment.
- Manager/admin can reassign owner.
- Owner/status changes create audit/timeline records.

### `archiveLead`

Input:

```json
{
  "leadId": "uuid",
  "reason": "duplicate or inactive"
}
```

Expected behavior:

- Sets `archived_at`.
- Adds activity record.
- Leaves linked deal untouched.

### `restoreLead`

Expected behavior:

- Clears `archived_at` if user has permission.
- Adds activity record.

## Activity Actions

### `addActivity`

Types:

- `note`
- `call`
- `task`
- `follow_up`

Required for follow-up:

- `dueAt`
- `leadId`
- `ownerId` or actor defaults

### `completeActivity`

Expected behavior:

- Sets `completed_at`.
- Adds timeline update.

## Deal Actions

### `convertLeadToDeal`

Input:

```json
{
  "leadId": "uuid",
  "stageId": "uuid",
  "expectedCloseDate": "2026-07-30"
}
```

Expected behavior:

- Creates one deal linked to lead.
- Copies owner, source, and value.
- Marks lead status as converted.
- Adds audit and timeline events.

### `updateDealStage`

Expected behavior:

- Changes stage.
- Logs previous and next stage.
- Updates pipeline view.

## Settings Actions

| Action | Role | Purpose |
|---|---|---|
| `createLeadSource` | admin, owner | Add source option |
| `updatePipelineStage` | admin, owner | Edit stage label/order |
| `inviteUser` | admin, owner | Add team member |
| `updateUserRole` | owner | Change user permission level |

## Response Shape

Successful mutation:

```json
{
  "ok": true,
  "data": {},
  "message": "Saved"
}
```

Failed mutation:

```json
{
  "ok": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Phone number is required",
    "fieldErrors": {
      "phone": "Required"
    }
  }
}
```

## API QA Requirements

- Test duplicate lead creation.
- Test cross-organization access attempts.
- Test role restrictions for owner changes.
- Test conversion idempotency.
- Test archive/restore state transitions.
