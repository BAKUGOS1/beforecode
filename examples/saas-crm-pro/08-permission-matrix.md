# Permission Matrix

## Source Context

Permissions are based on roles defined in `00-project-context.md`. Final enforcement must be implemented through application checks and Supabase RLS.

## Roles

| Role | Description |
|---|---|
| Owner | Full account control and billing/organization authority |
| Admin | Operational admin for users, settings, and configuration |
| Manager | Team pipeline visibility and ownership reassignment |
| Sales Rep | Works assigned leads and deals |
| Viewer | Read-only visibility where allowed |

## Access Matrix

| Capability | Owner | Admin | Manager | Sales Rep | Viewer |
|---|---:|---:|---:|---:|---:|
| View dashboard | yes | yes | yes | limited | yes |
| Create lead | yes | yes | yes | yes | no |
| View all organization leads | yes | yes | yes | no | configurable |
| View assigned leads | yes | yes | yes | yes | configurable |
| Edit assigned lead | yes | yes | yes | yes | no |
| Reassign lead owner | yes | yes | yes | no | no |
| Archive lead | yes | yes | yes | own only TBD | no |
| Restore archived lead | yes | yes | yes | no | no |
| Add note/activity | yes | yes | yes | yes | no |
| Convert lead to deal | yes | yes | yes | yes | no |
| Move deal stage | yes | yes | yes | assigned only | no |
| Manage sources/stages | yes | yes | no | no | no |
| Invite users | yes | yes | no | no | no |
| Change roles | yes | limited | no | no | no |
| Export data | yes | yes | no | no | no |

## Ownership Rules

- Sales reps can work leads assigned to them.
- Managers can review and reassign leads for their organization in v1.
- Owner and admin can perform settings-level actions.
- Viewer role should never perform mutations.

## Audit Requirements

Audit these events:

- lead owner changed
- lead status changed
- lead archived/restored
- deal stage changed
- user role changed
- data export requested

## RLS Enforcement Notes

- All business tables must include organization scoping.
- RLS policies should deny by default.
- Role checks should rely on server-validated profile membership.
- Client-side hiding is not enough; server and database enforcement are required.

## Open Permission Questions

- Should managers see all organization leads or only team leads?
- Can sales reps archive their own leads?
- Should viewer access be global read-only or report-only?
- Should admins be allowed to change owner role? Recommendation: no.
