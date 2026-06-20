# Open Questions

These questions define the safe operating boundary for TaskPilot before implementation starts.

## Product

- Should the agent only create plans, or can it also modify repository files?
- Who approves generated implementation tasks before coding starts?
- What output format is required for downstream coding tools?
- Should the agent support one project at a time or multiple workspaces?

## Users and UX

- Is the primary interface a CLI, web UI, chat UI, or GitHub comment workflow?
- Should users answer missing questions interactively?
- How should the agent display uncertainty and assumptions?
- What should happen when docs conflict with each other?

## Technical

- Which tools are allowed in v1?
- Should the agent read only local files or also connected sources?
- Should parsed context be cached?
- What is the maximum file size or token budget per run?
- Should generated tasks be written as Markdown, JSON, or both?

## QA and Evaluation

- What examples will be used as evaluation fixtures?
- How do we test that the agent does not invent requirements?
- What is the failure behavior if project context is incomplete?
- How do we compare output quality across versions?
