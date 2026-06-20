# System Architecture

## Architecture Type

ClipForge AI uses a modular SaaS architecture with a separate rendering worker path. The editor must stay responsive while AI and render jobs run asynchronously.

## C4-Level Context

```text
Creator/Editor/Reviewer
→ Web App
→ App API
→ Database
→ Object Storage
→ AI Provider
→ Render Worker
```

## Services and Responsibilities

| Service | Responsibility |
|---|---|
| Web App | editor UI, project screens, review screens |
| App API | auth, project CRUD, timeline updates, job creation |
| AI Workflow Service | scene/caption/title suggestions |
| Render Queue | stores pending/running/failed/completed render jobs |
| Render Worker | executes FFmpeg or rendering engine jobs |
| Object Storage | raw media, previews, exports, thumbnails |
| Database | metadata, timelines, approvals, audit records |

## Database Entities

| Entity | Purpose |
|---|---|
| `workspaces` | tenant boundary |
| `workspace_members` | roles and membership |
| `projects` | video project record |
| `project_revisions` | immutable timeline snapshots |
| `assets` | raw uploads, generated media, exports |
| `ai_runs` | AI prompt/input/output metadata |
| `render_jobs` | preview/final render job state |
| `approvals` | human review and export approval |
| `brand_presets` | fonts, colors, logo, style rules |

## Render Job Lifecycle

```text
queued → preparing → rendering → uploading → completed
                 ↘ failed → retry queued
```

## Project Revision Rule

A render job must point to a specific project revision. This prevents final export from changing if the user edits the project while rendering is in progress.

## Observability

Track:

- AI run status and duration
- render job queue time
- render job execution time
- failure reason
- export file size and duration
- approval state changes

## Security Boundaries

- Users can access only workspace projects they belong to.
- Raw uploads and exports should use signed URLs.
- AI provider keys must never reach the client.
- Render workers should process only approved job payloads.
- Final export blocked if rights status is unknown.

## Scaling Notes

- Start with a single worker queue.
- Add job priority later for paid plans.
- Add resumable upload only when file-size requirements justify it.
- Add cache for repeated previews after timeline diffing exists.
