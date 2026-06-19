# MiniCRM Technical Requirements Document

## 1. Technical Objective

Build a secure, maintainable, responsive SaaS CRM that supports workspace isolation, role-based access, lead-to-deal conversion, activity tracking, and predictable performance at MVP scale.

## 2. Reference Stack

| Layer | Choice | Reason |
|---|---|---|
| Frontend | React with JavaScript | Broad ecosystem and reusable UI patterns |
| Build tool | Vite | Fast development and simple SPA build |
| UI | Tailwind CSS and shadcn/ui-style components | Consistent accessible primitives |
| Forms | React Hook Form | Efficient form state management |
| Validation | Zod | Shared declarative validation rules |
| Data fetching | TanStack Query | Caching, mutation, and server-state handling |
| Backend | Supabase | Managed Postgres, Auth, Storage, and APIs |
| Database | PostgreSQL | Relational integrity and transaction support |
| Testing | Vitest and Playwright | Unit, integration, and end-to-end coverage |
| Hosting | Vercel plus Supabase | Simple managed MVP deployment |

The example is architecture-focused; teams may replace individual technologies while preserving requirements and boundaries.

## 3. System Context

```text
Browser
  → React application
  → Supabase Auth
  → PostgREST / RPC functions
  → PostgreSQL with RLS
  → Audit and activity records
```

## 4. Frontend Architecture

```text
src/
  app/
  components/
    ui/
    common/
  features/
    auth/
    dashboard/
    leads/
    contacts/
    deals/
    activities/
    team/
    settings/
  hooks/
  lib/
  routes/
  schemas/
  styles/
  test/
```

Rules:

- Feature modules own screens, queries, mutations, and feature components
- Shared UI primitives contain no business rules
- Zod schemas are the validation source for forms
- Query keys include workspace and relevant filters
- Route-level error boundaries handle unexpected failures

## 5. Backend Boundaries

Standard CRUD may use the generated database API when RLS fully protects access. Multi-table business operations use database functions.

Required transactional functions:

- `convert_lead_to_deal`
- `mark_deal_won`
- `mark_deal_lost`
- `accept_workspace_invitation`
- `restore_archived_record` where cross-table effects exist

## 6. Authentication and Session

- Email/password authentication for MVP
- Secure provider-managed password storage
- Session restored on application load
- Protected routes require an authenticated user and active membership
- Deactivated membership blocks workspace data access
- Invitation acceptance verifies token, email, expiry, and workspace

## 7. Multi-Tenancy

Every business table includes `workspace_id`.

Isolation requirements:

- RLS enabled on all workspace-owned tables
- Policies verify active membership in the same workspace
- Role checks are performed in database policies or trusted functions
- Client-provided `workspace_id` is never trusted without membership validation
- Service-role credentials are never exposed to the browser

## 8. Authorization Model

Roles:

```text
owner > manager > member
```

Authorization is checked for every mutation. UI visibility improves usability but is not a security boundary.

## 9. Data Integrity

- UUID primary keys
- Foreign keys for all relationships
- UTC timestamps stored with timezone
- Currency values stored as integer minor units
- Enumerated values enforced through checks or lookup tables
- Soft deletion uses `archived_at` and `archived_by`
- Optimistic concurrency may use `updated_at` in mutation predicates

## 10. Lead Conversion Transaction

```text
Validate membership and permission
→ Lock lead
→ Reject already-converted lead
→ Find or create contact
→ Create deal
→ Update lead status and conversion links
→ Create activity/audit events
→ Commit transaction
```

Any failed step rolls back the complete operation.

## 11. API and Query Design

- Use server-side pagination with a default limit of 25 and maximum of 100
- Allow only documented sort fields
- Escape and normalize search input
- Avoid unrestricted table scans
- Return stable error codes for validation, permission, conflict, and not-found states
- Use debounced search in the client

## 12. Performance Strategy

- Composite indexes start with `workspace_id`
- Index active list filters, owners, statuses, stages, and due dates
- Dashboard queries use database views or RPC functions
- Large lists select only needed columns
- Activity timeline loads incrementally
- CSV import is capped in MVP and processed in batches

## 13. Security Controls

- Row Level Security on all tenant tables
- Zod validation in the client and database constraints on persistence
- Rate limiting for authentication, invitations, and imports
- Sanitized text rendering
- No secrets in frontend environment variables
- Audit permission and ownership changes
- Dependency and migration review before release

## 14. Error Handling

Error response categories:

```text
VALIDATION_ERROR
UNAUTHENTICATED
FORBIDDEN
NOT_FOUND
CONFLICT
RATE_LIMITED
INTERNAL_ERROR
```

The UI maps categories to clear messages and does not expose internal stack traces.

## 15. Observability

Minimum production signals:

- Client exception reporting
- Database and function error logs
- Authentication failure trends
- Slow query review
- Import and conversion failure counts
- Deployment health checks

Avoid logging access tokens, passwords, or unnecessary customer data.

## 16. Testing Strategy

- Unit tests for validation and pure business rules
- Integration tests for database functions and RLS policies
- Component tests for complex forms and state handling
- Playwright tests for onboarding, lead CRUD, conversion, pipeline, activities, and permissions
- Migration tests against a clean database

## 17. Environments

```text
local → staging → production
```

Each environment has separate database credentials, auth configuration, and allowed origins. Production migrations are versioned and applied through a controlled release process.

## 18. Deployment Requirements

- CI runs linting, tests, and production build
- Database migrations run before application promotion
- Staging smoke tests pass before production
- Rollback includes frontend redeploy and forward-fix database migration strategy
- Environment variables are documented without secret values

## 19. Technical Acceptance Criteria

- Cross-workspace access tests fail safely
- Core RPC operations are transactional
- Main list queries use appropriate indexes
- No service credentials are shipped to the client
- Automated tests cover critical workflows
- Fresh environment setup is reproducible from repository documentation