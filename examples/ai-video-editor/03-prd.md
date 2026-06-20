# Product Requirements Document

## Source Context

Source-of-truth: `00-project-context.md`.

## Product Vision

ClipForge AI helps creators and teams move from idea/script to reviewed short-form video through an AI-assisted but human-controlled editing workflow.

## Goals

- Reduce first-draft video creation time.
- Keep timeline control in the user's hands.
- Make AI scene and caption generation reviewable.
- Provide reliable preview and final render flows.
- Track assets, approvals, and export metadata.

## Non-goals

- Not a full professional desktop editor in v1.
- No autonomous social publishing in MVP.
- No marketplace or plugin ecosystem in v1.
- No advanced stock licensing system in v1.

## Personas

| Persona | Need | Success Signal |
|---|---|---|
| Creator | Fast draft from script or upload | First preview in under 10 minutes |
| Marketing team | Brand-consistent videos | Brand preset applies correctly |
| Editor | Timeline and caption control | Can edit scenes without AI overwriting work |
| Reviewer | Approve before export | Clear review state before final render |
| Admin | Manage workspace and brand kit | Team can reuse presets |

## Functional Requirements

| ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| FR-001 | Create workspace project | Must | Project stores title, owner, status, and settings |
| FR-002 | Add script or media upload | Must | User can add source input and see it in project assets |
| FR-003 | Generate scene outline | Must | AI creates editable scene draft from script/source |
| FR-004 | Generate captions | Must | Captions are editable and attached to timeline segments |
| FR-005 | Edit timeline | Must | User can reorder scenes and update text overlays |
| FR-006 | Apply brand preset | Should | Font, color, logo, and layout preset apply to scenes |
| FR-007 | Preview render | Must | User can generate low-resolution preview job |
| FR-008 | Review and approve | Must | Final export is blocked until approval state is met |
| FR-009 | Final export | Must | Export job creates downloadable video output |
| FR-010 | Render failure handling | Must | Failed jobs show status, reason, and retry option |

## Business Rules

- AI output is draft content.
- Human approval is required before final export.
- Asset rights status must be known before final export.
- Timeline edits create a new project revision.
- Render jobs reference a specific project revision.
- Failed render jobs can retry but should not duplicate final assets.

## Non-functional Requirements

| ID | Requirement | Target |
|---|---|---|
| NFR-001 | Preview render reliability | 95 percent success for supported videos under 60 seconds |
| NFR-002 | Caption edit persistence | Caption edits persist after reload |
| NFR-003 | Export traceability | Output records project revision, preset, and render job ID |
| NFR-004 | Upload safety | Unsupported formats show clear error before render |
| NFR-005 | AI safety | AI suggestions never replace user edits without confirmation |

## Release Criteria

- Script-to-preview flow works end-to-end.
- Caption generation and editing are stable.
- Render queue supports retry and failure states.
- Final export requires approval.
- QA fixtures cover short, medium, failed upload, and failed render cases.
