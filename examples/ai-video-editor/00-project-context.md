# Project Context

## Project Name

ClipForge AI

## Raw Idea

Build an AI-native browser video editor for short-form content. Users should create a project, add script or uploaded media, get AI scene/caption suggestions, edit a timeline, preview output, and export final videos for social platforms.

## Problem

Short-form video production is slow because teams switch between writing tools, asset folders, caption tools, video editors, and export pipelines. AI tools can generate pieces, but the workflow often lacks review, timeline control, rights tracking, and reliable rendering.

## Target Users

- Creator: makes social clips from scripts, webinars, or raw footage.
- Marketing team: creates campaign videos with brand presets.
- Editor: adjusts timeline, captions, music, cuts, and exports.
- Reviewer: approves content before final export.
- Admin: manages workspace, brand kit, templates, and credits.

## Project Type

saas

## MVP Scope

- Workspace and project creation.
- Script input and media upload.
- AI scene outline generation.
- Caption generation and editing.
- Timeline with scenes, clips, text overlays, and audio layers.
- Brand presets for fonts, colors, logo, and export style.
- Preview render and final export queue.
- Human review before final export.
- Export presets for vertical short-form video.
- Project asset library.

## Out of Scope for v1

- Full professional NLE feature parity.
- Real-time multiplayer editing.
- Marketplace for templates/plugins.
- Stock asset licensing engine.
- Native desktop app.
- Long-form advanced color grading.
- Autonomous publishing to social platforms.

## Tech Preferences

- Next.js frontend.
- Timeline state stored as JSON project document.
- Object storage for uploads and render outputs.
- Postgres for workspaces, projects, assets, render jobs, and approvals.
- Queue-based rendering service.
- FFmpeg-based rendering pipeline.
- AI workflows separated from rendering workflows.

## Business Rules

- Final export requires human approval in v1.
- AI suggestions are drafts, not final content.
- Uploaded media must remain linked to the project and workspace.
- Render jobs must be retryable and traceable.
- Exported output must record preset, resolution, duration, and source project version.
- Unknown rights/license status must block final export until resolved.

## Success Criteria

- User can generate first draft video from script in under 10 minutes.
- Preview render completes reliably for videos under 60 seconds.
- Captions remain editable after AI generation.
- Render failures show actionable messages.
- AI-generated scenes never overwrite user edits without confirmation.

## BeforeCode Rule

Do not invent licensing, rendering, storage, or approval behavior. If it is not defined, mark it as TBD or add an open question.
