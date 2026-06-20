# QA Test Plan

## Testing Goal

Verify that MiniCRM supports the complete MVP sales workflow without data leakage, broken validation, or missed follow-up visibility.

## Critical Workflows

| Flow | Expected Result | Priority |
|---|---|---|
| Create lead with required fields | Lead appears in list and detail screen | P0 |
| Create lead with missing phone/name | Form blocks save and shows field errors | P0 |
| Search by name or phone | Matching leads appear within expected time | P1 |
| Filter by owner/status/source | Table returns correct scoped records | P1 |
| Add note to lead | Note appears in timeline with author and time | P0 |
| Schedule follow-up | Follow-up appears in activity list and overdue state works | P0 |
| Convert lead to deal | Deal is created and linked to source lead | P0 |
| Move deal stage | New stage persists after reload | P1 |
| Sales rep access check | Rep cannot see another user's private leads | P0 |
| Manager access check | Manager can review team pipeline | P0 |

## Negative Tests

- Duplicate phone number inside same organization.
- Invalid email format.
- Empty owner assignment.
- Unauthorized user tries to update another user's lead.
- Archived lead should not appear in default active list.
- Deal conversion attempted twice for the same lead.

## Performance Checks

| Area | Target |
|---|---|
| Lead table load | Under 3 seconds with 1,000 seeded records |
| Search and filter | Under 2 seconds for indexed fields |
| Save/update action | Under 3 seconds on normal network |

## Release Gate

The release should not ship if any P0 test fails, if RLS tests leak records, or if the lead-to-deal conversion loses owner/source/value data.
