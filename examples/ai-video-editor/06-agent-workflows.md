# AI Agent Workflows

## Source Context

AI features in ClipForge AI are assistant workflows, not autonomous content publishers. Human review remains required before final export.

## Agent Roles

| Agent | Responsibility | Output |
|---|---|---|
| Script Analyst | Extracts story beats, hooks, and sections | scene outline draft |
| Scene Planner | Converts beats into visual scenes | editable scene cards |
| Caption Assistant | Generates captions and timing hints | caption draft |
| Brand Reviewer | Checks tone against brand preset | review notes |
| Export Assistant | Suggests export preset based on target platform | preset recommendation |

## Script-to-Scene Workflow

```text
User submits script
→ Script Analyst extracts hook, key points, CTA
→ Scene Planner creates draft scenes
→ user reviews and edits scenes
→ accepted scenes become timeline draft
```

## Caption Workflow

```text
Source audio or script
→ caption draft generated
→ user edits text and timing
→ captions stored in timeline revision
→ render worker burns or overlays captions based on preset
```

## Human Review Rules

- AI output must be visibly marked as draft.
- User edits override AI suggestions.
- AI cannot publish or export final video without approval state.
- AI cannot claim asset rights are cleared unless source metadata confirms it.

## Prompt Input Contract

AI workflows may use:

- project title
- script text
- uploaded transcript
- target platform
- brand preset
- selected tone
- approved asset metadata

AI workflows must not use:

- private workspace data from unrelated projects
- secret keys
- unapproved external URLs
- assets with unknown rights for final export claims

## Failure Handling

| Failure | Response |
|---|---|
| AI timeout | Show retry and keep user content safe |
| Empty script | Ask for source text before generation |
| Unsafe or unsupported request | Refuse and explain required review |
| Low-quality output | Allow regenerate and manual edit |
| Conflicting brand rules | Ask reviewer to choose rule priority |

## Audit Requirements

Store for each AI run:

- workflow type
- input summary
- model/provider name if available
- status
- output draft
- user who accepted or rejected output
- timestamp

## Evaluation Criteria

- Scene outline maps to script points.
- Captions are editable and not treated as final by default.
- AI never overwrites accepted user edits without confirmation.
- AI does not fabricate rights or licensing status.
