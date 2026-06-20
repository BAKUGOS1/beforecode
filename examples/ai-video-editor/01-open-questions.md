# Open Questions

## Product

- What exact video formats and aspect ratios are required for v1?
- Should the editor support only vertical 9:16 exports or also 1:1 and 16:9?
- Should brand presets be workspace-level or project-level?
- What approval states are needed: draft, review, approved, exported?
- Should export consume credits, subscription quota, or remain free in MVP?
- Should uploaded audio/music require manual rights confirmation?

## Editor UX

- Should the timeline support drag-and-drop scene ordering in v1?
- Should captions be edited inline on canvas or in a side panel?
- Should preview render be required before final export?
- How should failed AI generation be retried?
- What should happen when user edits an AI-generated scene?

## AI Workflow

- Which AI tasks are available in v1: script outline, scene suggestions, captions, title generation, thumbnail ideas?
- Can AI rewrite user text automatically or only suggest changes?
- Should AI output include confidence or reasoning notes?
- Should every AI output be stored for audit/replay?
- What content safety filters are required?

## Rendering and Storage

- Where should raw uploads and outputs be stored?
- How long should preview renders be retained?
- Should render jobs run on serverless functions, containers, or external workers?
- What is the max video duration in v1?
- What retry policy should render jobs use?

## QA and Release

- Which fixture videos should be used for regression tests?
- What is the maximum acceptable preview render time?
- How should caption timing accuracy be verified?
- What failure states must be manually tested before release?
