# Rendering Pipeline

## Source Context

Rendering converts a timeline revision into preview or final video output. It must be asynchronous, retryable, and traceable.

## Render Types

| Type | Purpose | Quality |
|---|---|---|
| Preview | Fast review before approval | lower bitrate/resolution |
| Final Export | Deliverable file | selected preset quality |
| Thumbnail | Cover image or preview card | image output |

## Pipeline

```text
Create render job
→ validate project revision
→ resolve assets
→ prepare render manifest
→ run renderer/FFmpeg
→ upload output
→ update job status
→ notify UI
```

## Render Manifest

A render worker should receive a manifest, not raw uncontrolled project state:

```json
{
  "jobId": "uuid",
  "projectRevisionId": "uuid",
  "type": "preview",
  "aspectRatio": "9:16",
  "resolution": "1080x1920",
  "durationMs": 45000,
  "assets": [],
  "timeline": {},
  "outputTarget": "storage://..."
}
```

## Status Model

| Status | Meaning |
|---|---|
| `queued` | waiting for worker |
| `preparing` | manifest and assets resolving |
| `rendering` | render process active |
| `uploading` | output moving to storage |
| `completed` | output ready |
| `failed` | failed with reason |
| `cancelled` | user/system cancelled job |

## Failure States

| Failure | User Message |
|---|---|
| unsupported format | File format is not supported for rendering |
| missing asset | One or more timeline assets are unavailable |
| timeout | Render exceeded time limit; try shorter video or retry |
| rights blocked | Final export blocked because asset rights are unresolved |
| worker error | Render failed; retry or contact support |

## Export Presets

| Preset | Aspect | Resolution | Use Case |
|---|---|---|---|
| Short Vertical | 9:16 | 1080x1920 | Reels, Shorts, TikTok |
| Square Social | 1:1 | 1080x1080 | feed posts |
| Wide Preview | 16:9 | 1280x720 | internal preview |

## QA Requirements

- Render a 15-second timeline.
- Render a 60-second timeline.
- Render with captions enabled.
- Render with missing asset and confirm safe failure.
- Retry failed preview job.
- Confirm final export records project revision.

## Open Decisions

- Final v1 max duration.
- Worker runtime provider.
- Preview retention duration.
- Whether final export consumes credits.
