# Technical Requirements Document

## Source Context

Source-of-truth: `00-project-context.md`, `03-prd.md`, and `07-rendering-pipeline.md`.

## Architecture Overview

```text
Next.js app
→ project/editor API
→ AI workflow service
→ render queue
→ render worker
→ object storage
→ project metadata database
```

## Core Modules

| Module | Responsibility |
|---|---|
| Workspace | users, teams, projects, brand presets |
| Assets | uploads, metadata, rights status, storage pointers |
| Editor | timeline JSON, scenes, overlays, captions, revisions |
| AI Workflow | script analysis, scene suggestions, caption generation |
| Rendering | preview and final export jobs |
| Approval | review state, comments, final export gate |
| Billing/Credits | TBD for v1; do not implement unless approved |

## Data Flow

```text
User adds script or media
→ asset/project records created
→ AI workflow creates draft scenes/captions
→ user edits timeline
→ preview render job references project revision
→ reviewer approves
→ final render job creates export asset
```

## Timeline Model

Timeline should be represented as a structured JSON document:

```json
{
  "version": 1,
  "durationMs": 45000,
  "aspectRatio": "9:16",
  "scenes": [],
  "audio": [],
  "captions": [],
  "overlays": []
}
```

## Storage Strategy

| Asset Type | Storage Location | Retention |
|---|---|---|
| Raw upload | object storage | until deleted by project owner |
| AI draft metadata | database | project lifetime |
| Preview render | object storage | short retention, configurable |
| Final export | object storage | project lifetime or plan limit |
| Captions | database JSON + optional VTT/SRT export | project lifetime |

## Rendering Strategy

- Preview renders use lower bitrate/resolution.
- Final renders use selected export preset.
- Render jobs are asynchronous and status-driven.
- Each render references an immutable project revision.
- Failed jobs store error reason and can be retried.

## AI Workflow Strategy

AI output must be stored as draft suggestions. User edits are source-of-truth after acceptance.

AI workflows:

- script to scene outline
- scene to caption draft
- caption cleanup
- title and hook suggestions
- review checklist suggestions

## Key Risks

- Rendering inside serverless environments can time out.
- AI output may not align with brand or rights constraints.
- Timeline JSON can become hard to migrate if unversioned.
- Preview and final render mismatch can damage trust.
- Large uploads require clear limits and resumable upload strategy.

## Implementation Order

1. Workspace/project schema.
2. Asset upload and metadata.
3. Timeline JSON editor model.
4. AI scene outline generation.
5. Caption generation and editing.
6. Preview render queue.
7. Approval workflow.
8. Final export pipeline.
9. Regression test fixtures.
