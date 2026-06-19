# Database Schema

## 1. Overview

Describe database technology, ownership, tenancy model, expected scale, consistency requirements, and source-of-truth boundaries.

## 2. Conventions

Define primary keys, naming, timestamps, timezone, money, enums, JSON usage, audit fields, and soft-delete policy.

## 3. Relationship Map

```text
entity_a 1 ── * entity_b
entity_b * ── 1 entity_c
```

Use Mermaid or a separate ERD when relationships are complex.

## 4. Entity Catalog

| Entity | Purpose | Owner | Retention |
|---|---|---|---|
|  |  |  |  |

## 5. Table Definitions

### table_name

**Purpose:**  
**Tenant/ownership:**  
**Expected volume:**

| Column | Type | Null | Default | Rules / references |
|---|---|---:|---|---|
| id | uuid | No | generated | Primary key |
| created_at | timestamptz | No | now() | UTC |
| updated_at | timestamptz | No | now() | Updated on mutation |

Constraints:

- Primary, foreign, unique, check, and exclusion constraints

Indexes:

| Index | Columns | Type | Query supported |
|---|---|---|---|
|  |  | B-tree / GIN / other |  |

Access rules:

- Who can select, insert, update, archive, restore, and delete?

## 6. Data Lifecycle

Define creation, mutation, versioning, archival, restoration, deletion, retention, export, and legal hold.

## 7. Transactions and Concurrency

List operations requiring transactions, locking, optimistic concurrency, idempotency, or reconciliation.

## 8. Migration Strategy

Describe forward/backward compatibility, backfills, zero-downtime changes, rollback/forward-fix, and migration verification.

## 9. Security and Privacy

Document tenant isolation, row/column controls, encryption, sensitive fields, masking, audit, and production access.

## 10. Backup and Recovery

Define backup frequency, restore testing, recovery point objective, and recovery time objective.

## 11. Query and Scale Review

List critical queries, expected cardinality, pagination approach, query-plan verification, and growth assumptions.

## Schema Acceptance

- Every relationship and ownership rule is explicit
- Constraints protect important invariants
- Critical queries have an index strategy
- Deletion and retention are defined
- Migrations and rollback risks are understood
