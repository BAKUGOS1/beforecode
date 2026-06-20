# QA Regression Plan

## Goal

Validate editor, AI, asset, approval, and rendering workflows before shipping the AI Video Editor MVP.

## P0 Tests

| Area | Test | Expected Result |
|---|---|---|
| Project | Create project | Project appears in workspace list |
| Script | Add script | Script is saved and available to AI workflow |
| AI | Generate scene outline | Editable scene draft is created |
| Captions | Generate captions | Captions appear and can be edited |
| Timeline | Reorder scenes | Order persists after reload |
| Preview | Start preview render | Render job enters queue and completes |
| Approval | Final export before approval | Export is blocked |
| Final Export | Export approved project | Output is created and downloadable |
| Failure | Missing asset render | Job fails safely with reason |
| Rights | Unknown asset rights | Final export is blocked |

## P1 Tests

- Apply brand preset.
- Edit text overlay.
- Regenerate captions without losing accepted edits.
- Retry failed render job.
- Download final export.
- View render status after refresh.
- Cancel queued preview job.

## Regression Fixtures

| Fixture | Purpose |
|---|---|
| 15-second script-only project | AI scene and caption generation |
| 60-second uploaded video | render timing and captions |
| Unsupported media file | validation and failure state |
| Missing asset reference | safe render failure |
| Unknown rights asset | final export blocking |
| Edited AI draft | verify AI does not overwrite manual edits |

## Performance Targets

| Workflow | Target |
|---|---|
| Project load | under 3 seconds |
| Timeline edit save | under 1 second perceived response |
| AI scene draft | TBD based on provider |
| Preview render | TBD by max duration and worker provider |

## Release Gate

The MVP should not ship if final export bypasses approval, captions are lost after reload, render jobs cannot be retried, or rights-blocked assets can export.
