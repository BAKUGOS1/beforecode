# MiniCRM Example Documentation Pack

MiniCRM is a complete SaaS CRM example showing how the BeforeCode templates connect from product idea to implementation and QA.

## Recommended Reading Order

1. [Project Brief](project-brief.md) — problem, audience, MVP boundaries, and success measures
2. [PRD](prd.md) — product requirements, workflows, permissions, and acceptance criteria
3. [TRD](trd.md) — stack, architecture, security, testing, and deployment requirements
4. [Database Schema](database-schema.md) — tables, relationships, constraints, indexes, and RLS model
5. [API Documentation](api-documentation.md) — endpoints, payloads, errors, filtering, and API rules
6. [QA Test Plan](qa-test-plan.md) — functional, security, regression, responsive, and performance coverage
7. [Implementation Plan](implementation-plan.md) — ordered delivery phases, milestones, risks, and definition of done

## Main Workflow

```text
Workspace onboarding
→ Lead capture and assignment
→ Activity tracking
→ Lead qualification
→ Contact and deal conversion
→ Pipeline progression
→ Won/lost closure
→ Dashboard review
```

## Architecture Summary

```text
React application
→ Supabase Auth
→ PostgreSQL API and transactional functions
→ Row Level Security
→ Workspace-scoped CRM data
```

## How to Use This Example

- Read it as a reference documentation pack
- Copy individual files when starting a similar project
- Replace MiniCRM-specific assumptions with your product decisions
- Keep IDs, permissions, field names, and workflow rules consistent across every document
- Review the complete pack before giving it to an AI coding agent or development team

This example describes an MVP reference architecture. It is not a finished application or a substitute for project-specific security, legal, and compliance review.