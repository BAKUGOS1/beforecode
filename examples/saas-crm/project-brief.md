# MiniCRM Project Brief

## Project Summary

MiniCRM is a lightweight, multi-user SaaS CRM for small businesses that need a clear way to manage leads, deals, contacts, and follow-up activities without relying on spreadsheets.

## Problem

Small sales teams often store customer information across spreadsheets, notes, email, and messaging apps. This causes duplicate records, missed follow-ups, unclear ownership, and poor visibility into the sales pipeline.

## Target Users

- Small business owners
- Sales representatives
- Sales managers
- Freelancers and consultants
- Small agencies

## Product Goal

Help a small team capture leads, assign ownership, track conversations, convert qualified leads into deals, and understand pipeline health from one simple workspace.

## Value Proposition

- Faster lead capture and follow-up
- One source of truth for customer information
- Clear deal stages and ownership
- Less operational complexity than enterprise CRMs
- Quick onboarding for non-technical users

## MVP Features

1. Email-based authentication
2. Workspace and team membership
3. Lead creation, editing, assignment, search, filtering, and archiving
4. Lead conversion into a contact and deal
5. Deal pipeline with configurable stages
6. Notes, calls, meetings, emails, and tasks as activities
7. Dashboard with lead, deal, activity, and pipeline summaries
8. Role-based access for owner, manager, and member
9. Audit fields and activity history

## Primary Workflow

```text
Sign up → Create workspace → Invite team → Add lead → Assign owner
→ Record activities → Qualify lead → Convert to deal → Move deal stages
→ Mark won or lost → Review dashboard
```

## MVP Boundaries

### Included

- Responsive web application
- One active workspace per user in the MVP interface
- Manual data entry
- Basic CSV lead import
- Global search across leads, contacts, and deals
- Soft deletion and archive flows

### Not Included

- Billing and subscriptions
- Marketing automation
- Email inbox synchronization
- Telephony integration
- Marketplace and plugins
- Custom report builder
- Native mobile applications
- AI lead scoring

## Success Metrics

- A new user can create a workspace and first lead within five minutes
- At least 90% of core workflow QA cases pass before release
- Standard list pages load within three seconds under expected MVP volume
- Search and filters respond within two seconds
- No critical authorization or cross-workspace data exposure defects
- Users can complete lead-to-deal conversion without documentation

## Key Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Scope grows toward enterprise CRM | Delayed MVP | Enforce documented out-of-scope list |
| Duplicate customer records | Poor data quality | Normalize email/phone and warn on duplicates |
| Incorrect permissions | Data exposure | Workspace-scoped queries and automated access tests |
| Complex pipeline UI | Low usability | Start with a simple stage board and list fallback |
| Weak adoption | Product fails to replace spreadsheets | Optimize onboarding and common workflows |

## Assumptions

- Teams contain 1–25 active users during MVP
- Each workspace contains up to 50,000 leads and 20,000 deals
- Users primarily access the application through modern desktop and mobile browsers
- English is the initial product language

## Release Definition

The MVP is ready when authentication, workspace access, lead management, conversion, deal tracking, activities, dashboard summaries, permissions, responsive behavior, and documented QA exit criteria are complete.