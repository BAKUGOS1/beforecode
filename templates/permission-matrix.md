# Permission Matrix

## 1. Authorization Model

Describe tenant/workspace boundaries, role hierarchy, record ownership, sharing, inheritance, and whether access is RBAC, ABAC, or mixed.

## 2. Roles

| Role | Purpose | Assignment authority | Constraints |
|---|---|---|---|
|  |  |  |  |

## 3. Resource Actions

Use explicit actions rather than one generic access flag.

| Resource/action | Owner | Admin | Manager | Member | Guest |
|---|---:|---:|---:|---:|---:|
| View list |  |  |  |  |  |
| View details |  |  |  |  |  |
| Create |  |  |  |  |  |
| Update own |  |  |  |  |  |
| Update any |  |  |  |  |  |
| Archive/restore |  |  |  |  |  |
| Permanently delete |  |  |  |  |  |
| Export |  |  |  |  |  |

Use `Allow`, `Deny`, `Own`, `Assigned`, `Team`, or a named condition.

## 4. Field-Level Restrictions

| Resource.field | Read roles | Write roles | Masking/rule |
|---|---|---|---|
|  |  |  |  |

## 5. State-Based Rules

Document how status, archival, approval, lock, or ownership changes permissions.

## 6. Administrative Operations

Define role assignment, ownership transfer, impersonation, connector management, audit access, and destructive workspace actions.

## 7. Enforcement

State where each rule is enforced: database/RLS, API policy, service, or external system. UI visibility is not a security control.

## 8. Audit Requirements

List permission, ownership, export, delete, and sensitive-read events that must be recorded.

## 9. Authorization Tests

For each sensitive action, test allowed role, denied role, cross-tenant ID, deactivated user, stale session, and direct API call.
