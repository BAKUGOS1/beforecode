# AI Video Editor Reference Pack

AI Video Editor is a detailed BeforeCode reference pack for a browser-based AI video creation and editing platform. It is inspired by advanced product documentation patterns: product vision, PRD, TRD, workflow orchestration, AI agents, rendering, storage, API contracts, QA, and handoff.

## Product Summary

The product helps creators and teams generate, edit, review, and export short-form videos from scripts, uploads, templates, captions, and AI-generated scene suggestions.

## Primary Workflow

```text
User creates workspace project
→ uploads or writes source content
→ AI suggests scenes and captions
→ user edits timeline
→ render job is queued
→ preview is reviewed
→ final export is generated
```

## Document Map

| File | Purpose |
|---|---|
| `00-project-context.md` | Source-of-truth product context |
| `01-open-questions.md` | Product, technical, and rights decisions |
| `03-prd.md` | Product requirements and user workflows |
| `04-trd.md` | System architecture and module boundaries |
| `05-system-architecture.md` | C4-style architecture, services, and lifecycle |
| `06-agent-workflows.md` | AI planning, caption, scene, and review workflows |
| `07-rendering-pipeline.md` | Queue, FFmpeg/export, presets, failure states |
| `08-qa-regression-plan.md` | Regression suite for editor/rendering/AI |
| `09-ai-coding-handoff.md` | Safe implementation instructions for AI agents |

## What This Example Teaches

- How to document a complex AI product before implementation.
- How to separate editor UX, AI workflow, media storage, and rendering.
- How to define human review before export.
- How to write QA plans for timeline, captions, rendering, and failure states.
- How to prevent AI agents from inventing rights, rendering, or storage behavior.

## Recreate With BeforeCode

```bash
npx beforecode start --from examples/ai-video-editor/00-project-context.md
```
