# TaskPilot API Documentation

## 1. Conventions

Base path:

```text
/api/v1
```

All tenant routes require authentication and active workspace membership. Mutations accept an optional client idempotency key.

## 2. Standard Error

```json
{
  "error": {
    "code": "STATE_CONFLICT",
    "message": "The run changed before this action was applied.",
    "requestId": "req_123",
    "details": {}
  }
}
```

## 3. Task and Run Endpoints

| Method | Path | Purpose |
|---|---|---|
| POST | `/workspaces/:workspaceId/tasks` | Create task |
| GET | `/workspaces/:workspaceId/tasks/:taskId` | Get task |
| POST | `/workspaces/:workspaceId/tasks/:taskId/runs` | Start run |
| GET | `/workspaces/:workspaceId/runs` | List runs |
| GET | `/workspaces/:workspaceId/runs/:runId` | Get run state |
| GET | `/workspaces/:workspaceId/runs/:runId/events` | Paginated timeline |
| POST | `/workspaces/:workspaceId/runs/:runId/pause` | Request pause |
| POST | `/workspaces/:workspaceId/runs/:runId/resume` | Resume paused run |
| POST | `/workspaces/:workspaceId/runs/:runId/cancel` | Cancel run |
| POST | `/workspaces/:workspaceId/runs/:runId/clarifications` | Provide requested input |

### Create Task

```json
{
  "title": "Research authentication options",
  "goal": "Compare suitable authentication architectures for the MVP.",
  "expectedOutput": "Decision memo with evidence",
  "constraints": ["Use primary sources", "No external writes"],
  "autonomyLevel": "observe",
  "budget": {
    "maxSteps": 20,
    "maxToolCalls": 30,
    "maxDurationSeconds": 1800
  }
}
```

### Start Run

```json
{
  "contextRefs": ["artifact_uuid"],
  "modelRoute": "default-reasoning",
  "requirePlanApproval": true
}
```

Response: `202 Accepted` with run ID and queued status.

## 4. Plan Endpoints

| Method | Path | Purpose |
|---|---|---|
| GET | `/runs/:runId/plan` | Get current plan version |
| POST | `/runs/:runId/plan/approve` | Approve plan |
| POST | `/runs/:runId/plan/reject` | Reject with feedback |
| POST | `/runs/:runId/plan/edit` | Submit edited plan |

All plan mutations require expected run state version.

## 5. Approval Endpoints

| Method | Path | Purpose |
|---|---|---|
| GET | `/workspaces/:workspaceId/approvals` | List pending approvals |
| GET | `/approvals/:approvalId` | Get approval details |
| POST | `/approvals/:approvalId/approve` | Approve exact action |
| POST | `/approvals/:approvalId/reject` | Reject action |
| POST | `/approvals/:approvalId/approve-edited` | Approve revised arguments |

Approval request:

```json
{
  "expectedActionHash": "sha256-value",
  "expectedRunVersion": 18,
  "comment": "Approved for this destination only"
}
```

Stale or changed action hashes return `409`.

## 6. Artifact, Evidence, and Memory

| Method | Path | Purpose |
|---|---|---|
| GET | `/runs/:runId/artifacts` | List run artifacts |
| GET | `/runs/:runId/evidence` | List evidence metadata |
| GET | `/workspaces/:workspaceId/memories` | Search reviewed memories |
| PATCH | `/memories/:memoryId` | Edit/review memory |
| DELETE | `/memories/:memoryId` | Delete memory |

Object downloads use short-lived authorized URLs or streamed responses.

## 7. Feedback and Evaluation

| Method | Path | Purpose |
|---|---|---|
| POST | `/runs/:runId/feedback` | Record user outcome feedback |
| POST | `/admin/evaluations` | Start evaluation job |
| GET | `/admin/evaluations/:evaluationId` | Get evaluation report |

## 8. Streaming

Run updates may use Server-Sent Events:

```text
GET /api/v1/runs/:runId/stream
```

Events contain IDs, types, timestamps, run version, and sanitized payload. Clients reconnect with the last event ID.

## 9. Error Codes

```text
VALIDATION_ERROR
UNAUTHENTICATED
FORBIDDEN
NOT_FOUND
STATE_CONFLICT
APPROVAL_REQUIRED
APPROVAL_EXPIRED
POLICY_DENIED
BUDGET_EXCEEDED
TOOL_FAILED
ACTION_UNCERTAIN
RATE_LIMITED
INTERNAL_ERROR
```

## 10. API Safety Rules

- Never accept client claims that an action is approved
- Never expose raw secrets, connector tokens, hidden prompts, or unrestricted checkpoint blobs
- Verify workspace membership for nested resource IDs
- Require optimistic concurrency for state-changing run actions
- Rate limit creation, approval, connector, and evaluation routes
- Audit administrative and approval mutations