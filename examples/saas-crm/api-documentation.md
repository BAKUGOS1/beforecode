# MiniCRM API Documentation

## 1. API Conventions

Base path:

```text
/api/v1
```

All requests require an authenticated session unless marked public. Workspace access is verified server-side.

Standard success envelope:

```json
{
  "data": {},
  "meta": {}
}
```

Standard error envelope:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request contains invalid fields.",
    "fields": {}
  }
}
```

## 2. Pagination, Filtering, and Sorting

List query parameters:

```text
page=1
limit=25
search=
sort=created_at
direction=desc
```

Maximum `limit` is 100. Invalid sort fields return `400`.

## 3. Authentication

Authentication may be provided directly by the selected auth platform. Application routes still verify the authenticated user and active workspace membership.

## 4. Workspace Endpoints

| Method | Path | Purpose | Role |
|---|---|---|---|
| POST | `/workspaces` | Create workspace | Authenticated user |
| GET | `/workspaces/:id` | Get workspace | Member |
| PATCH | `/workspaces/:id` | Update settings | Owner |
| GET | `/workspaces/:id/members` | List members | Member |
| POST | `/workspaces/:id/invitations` | Invite member | Owner |
| PATCH | `/workspaces/:id/members/:memberId` | Change role/status | Owner |

## 5. Lead Endpoints

| Method | Path | Purpose |
|---|---|---|
| GET | `/workspaces/:workspaceId/leads` | List leads |
| POST | `/workspaces/:workspaceId/leads` | Create lead |
| GET | `/workspaces/:workspaceId/leads/:leadId` | Get lead details |
| PATCH | `/workspaces/:workspaceId/leads/:leadId` | Update lead |
| POST | `/workspaces/:workspaceId/leads/:leadId/archive` | Archive lead |
| POST | `/workspaces/:workspaceId/leads/:leadId/restore` | Restore lead |
| POST | `/workspaces/:workspaceId/leads/:leadId/convert` | Convert lead |
| POST | `/workspaces/:workspaceId/leads/import` | Import CSV leads |

### Create Lead

```http
POST /api/v1/workspaces/{workspaceId}/leads
```

Request:

```json
{
  "firstName": "Aarav",
  "lastName": "Shah",
  "email": "aarav@example.com",
  "phone": "+919876543210",
  "companyName": "Acme Studio",
  "source": "referral",
  "ownerId": "member-uuid",
  "estimatedValueMinor": 2500000,
  "nextFollowUpAt": "2026-06-25T05:30:00Z"
}
```

Response: `201 Created` with the created lead.

Possible errors: `VALIDATION_ERROR`, `DUPLICATE_WARNING`, `FORBIDDEN`.

### Convert Lead

```http
POST /api/v1/workspaces/{workspaceId}/leads/{leadId}/convert
```

Request:

```json
{
  "pipelineId": "pipeline-uuid",
  "stageId": "stage-uuid",
  "dealTitle": "Acme Studio Website Project",
  "valueMinor": 2500000,
  "currencyCode": "INR",
  "expectedCloseDate": "2026-07-31",
  "existingContactId": null
}
```

Response:

```json
{
  "data": {
    "leadId": "lead-uuid",
    "contactId": "contact-uuid",
    "dealId": "deal-uuid"
  }
}
```

The operation is atomic. Re-converting the same lead returns `409 CONFLICT`.

## 6. Contact Endpoints

| Method | Path | Purpose |
|---|---|---|
| GET | `/workspaces/:workspaceId/contacts` | List contacts |
| POST | `/workspaces/:workspaceId/contacts` | Create contact |
| GET | `/workspaces/:workspaceId/contacts/:contactId` | Get contact |
| PATCH | `/workspaces/:workspaceId/contacts/:contactId` | Update contact |
| POST | `/workspaces/:workspaceId/contacts/:contactId/archive` | Archive contact |

## 7. Deal Endpoints

| Method | Path | Purpose |
|---|---|---|
| GET | `/workspaces/:workspaceId/deals` | List or board data |
| POST | `/workspaces/:workspaceId/deals` | Create deal |
| GET | `/workspaces/:workspaceId/deals/:dealId` | Get deal |
| PATCH | `/workspaces/:workspaceId/deals/:dealId` | Update deal |
| PATCH | `/workspaces/:workspaceId/deals/:dealId/stage` | Move stage |
| POST | `/workspaces/:workspaceId/deals/:dealId/win` | Mark won |
| POST | `/workspaces/:workspaceId/deals/:dealId/lose` | Mark lost |

Stage update request:

```json
{
  "stageId": "stage-uuid",
  "expectedUpdatedAt": "2026-06-19T10:00:00Z"
}
```

An outdated `expectedUpdatedAt` returns `409 CONFLICT`.

## 8. Activity Endpoints

| Method | Path | Purpose |
|---|---|---|
| GET | `/workspaces/:workspaceId/activities` | List activities |
| POST | `/workspaces/:workspaceId/activities` | Create activity |
| PATCH | `/workspaces/:workspaceId/activities/:activityId` | Update activity |
| POST | `/workspaces/:workspaceId/activities/:activityId/complete` | Complete task |

## 9. Dashboard Endpoint

```http
GET /api/v1/workspaces/{workspaceId}/dashboard?from=2026-06-01&to=2026-06-30&ownerId=
```

Returns KPI totals, deals by stage, overdue activity count, and recent activity. Member results are permission-scoped.

## 10. Search Endpoint

```http
GET /api/v1/workspaces/{workspaceId}/search?q=acme&types=lead,contact,deal&limit=10
```

Search requires at least two characters and returns grouped, permission-filtered results.

## 11. Status Codes

| Code | Usage |
|---|---|
| 200 | Successful read or update |
| 201 | Resource created |
| 204 | Successful action with no body |
| 400 | Validation or malformed request |
| 401 | Missing or invalid session |
| 403 | Insufficient permission |
| 404 | Resource not found in accessible scope |
| 409 | Duplicate or stale-state conflict |
| 413 | Import exceeds allowed size |
| 429 | Rate limit exceeded |
| 500 | Unexpected server error |

## 12. API Quality Rules

- Never reveal whether an inaccessible cross-workspace resource exists
- Validate IDs, filters, body fields, and allowed transitions
- Use transactions for multi-table mutations
- Include request correlation IDs in server logs
- Do not return internal database errors directly
- Version breaking changes under a new API version