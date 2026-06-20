# Technical Requirements Document

## Source Context

Source-of-truth: `00-project-context.md` and `03-prd.md`.

## Architecture Recommendation

```text
Next.js app
→ route handlers/server actions
→ validation layer
→ Supabase client/server SDK
→ Supabase Postgres with RLS
→ audit and activity timeline
```

## Architectural Principles

- Keep business logic outside UI components.
- Validate every mutation with Zod before database write.
- Use RLS as the final security boundary.
- Do not expose service role keys to browser code.
- Prefer archive-first workflows for destructive actions.
- Keep tenant isolation obvious in schema and tests.

## Modules

| Module | Responsibility |
|---|---|
| Auth | login, session, organization membership |
| Leads | lead CRUD, filters, duplicate checks, archive/restore |
| Activities | notes, calls, follow-ups, timeline events |
| Deals | conversion, pipeline stages, expected close date |
| Settings | users, roles, sources, tags, stages |
| Audit | ownership, status, role, and stage change logs |
| Reports | simple pipeline and overdue follow-up views |

## Data Flow

```text
User action
→ form schema validation
→ permission check
→ database mutation
→ audit/timeline write
→ query invalidation
→ UI refresh
```

## State Management

- Use local UI state for drawers, filters, modals, and table controls.
- Use TanStack Query for server state, cache invalidation, and loading/error states.
- Keep table query state shareable through URL params if feasible.

## Error Handling

| Error Type | Handling |
|---|---|
| Validation error | Field-level message near input |
| Permission error | Clear access message, no sensitive data leaked |
| Duplicate lead | Show existing matching record if user has access |
| Network error | Retry option and non-destructive failure state |
| RLS rejection | Generic security-safe error in UI, detailed server log |

## Security Notes

- RLS policies must be written before real tenant data exists.
- Organization ID must never be trusted from client input alone.
- Role escalation is admin-only and audited.
- Export actions must be owner/admin-only.
- Sensitive fields should be masked for viewer role if required.

## Implementation Order

1. Supabase schema and seed data.
2. Auth and organization membership.
3. RLS policies and tests.
4. Lead create/edit/list/detail.
5. Activity timeline and follow-up scheduling.
6. Deal conversion and pipeline stage movement.
7. Settings for sources/stages/users.
8. QA test fixtures and release audit.

## Key Risks

- Weak RLS policies causing data leakage.
- Unindexed filters slowing table performance.
- Overcomplicated CRM scope delaying MVP.
- Duplicate rules blocking legitimate leads.
- AI agent adding unapproved modules such as billing or AI scoring.
