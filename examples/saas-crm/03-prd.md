# Product Requirements Document

## Source Context

Generated from `00-project-context.md`. Missing details must remain open questions instead of being invented.

## Overview

MiniCRM is a lightweight SaaS CRM for small service businesses. It helps teams capture leads, assign owners, track follow-ups, and convert qualified leads into deals.

## Goals

- Reduce missed follow-ups by making ownership and next action visible.
- Give managers a clear view of lead status and deal pipeline.
- Keep CRM setup simple enough for non-technical small teams.
- Provide a clean documentation base for AI-assisted implementation.

## Non-goals

- No built-in email campaign system in v1.
- No invoice, accounting, or payment module.
- No native mobile app in v1.
- No AI scoring in v1.

## Personas

| Persona | Need | Success Signal |
|---|---|---|
| Sales representative | Track assigned leads and daily follow-ups | No overdue follow-up is missed |
| Sales manager | Review team pipeline and stuck leads | Can identify owner, stage, and next action quickly |
| Admin | Configure users, sources, and pipeline stages | Can onboard team without developer help |

## MVP Requirements

| ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| FR-001 | Create lead with required contact and source fields | Must | Missing required fields block save with clear validation |
| FR-002 | Search and filter leads | Must | User can filter by owner, source, status, and follow-up state |
| FR-003 | Add notes to lead timeline | Must | Notes appear chronologically on the lead detail screen |
| FR-004 | Schedule follow-up | Must | Follow-up date/time can be set and overdue items are visible |
| FR-005 | Convert lead to deal | Must | Qualified lead creates a deal and preserves source context |
| FR-006 | Move deal across stages | Should | Deal stage changes are saved and visible in pipeline |
| FR-007 | Role-based access | Must | Sales reps cannot access other teams unless permitted |

## Non-functional Requirements

| ID | Requirement | Target |
|---|---|---|
| NFR-001 | Table performance | Lead list loads within 3 seconds for 1,000 records |
| NFR-002 | Tenant isolation | Users can only access records from their organization |
| NFR-003 | Validation | All create/update forms use schema validation |
| NFR-004 | Auditability | Owner and status changes are logged |

## Release Criteria

- Core lead workflow passes QA from create to conversion.
- Manager can review pipeline without data leakage.
- All required fields and duplicate checks are tested.
- `beforecode doctor` does not report missing critical docs.
