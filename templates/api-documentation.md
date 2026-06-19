# API Documentation

## 1. API Overview

| Field | Value |
|---|---|
| Base URL |  |
| Version |  |
| Protocol/format | REST/JSON, GraphQL, RPC, events |
| Authentication |  |
| Owner |  |

Describe audience, trust boundary, stability, and compatibility policy.

## 2. Conventions

Define naming, identifiers, timestamps, money, nullable fields, envelopes, request IDs, idempotency keys, and content limits.

## 3. Authentication and Authorization

Document credential type, token lifetime, scopes/roles, tenant resolution, resource ownership, and forbidden behavior. UI hiding is not authorization.

## 4. Standard Errors

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request contains invalid fields.",
    "requestId": "req_123",
    "fields": {}
  }
}
```

| Code | HTTP status | Retryable | Meaning |
|---|---:|---:|---|
| VALIDATION_ERROR | 400 | No | Invalid input |
| UNAUTHENTICATED | 401 | No | Missing/invalid identity |
| FORBIDDEN | 403 | No | Permission denied |
| NOT_FOUND | 404 | No | Resource unavailable |
| CONFLICT | 409 | Maybe | Duplicate or stale state |
| RATE_LIMITED | 429 | Yes | Limit exceeded |
| INTERNAL_ERROR | 500 | Maybe | Unexpected failure |

## 5. Pagination, Filtering, and Sorting

Define cursor/offset behavior, defaults, maximum page size, stable ordering, allowed filters, search semantics, and invalid-field handling.

## 6. Endpoint Catalog

| Method | Path | Purpose | Permission |
|---|---|---|---|
| GET | `/resources` | List resources |  |

## 7. Endpoint Template

### Endpoint name

```http
POST /api/v1/resources
```

**Purpose:**  
**Permission:**  
**Idempotency:**  
**Rate limit:**

Path/query parameters:

| Name | Type | Required | Rules |
|---|---|---:|---|
|  |  |  |  |

Request:

```json
{}
```

Success response:

```json
{
  "data": {}
}
```

Errors and edge cases:

| Condition | Status/code | Client action |
|---|---|---|
|  |  |  |

## 8. Webhooks and Events

Define event names, payload versioning, signature verification, retries, ordering, duplicates, replay, and dead-letter behavior.

## 9. Security and Data Handling

Document validation, output encoding, secret handling, sensitive fields, audit, CORS/origins, file uploads, SSRF controls, and abuse/rate protections.

## 10. Versioning and Deprecation

Define breaking changes, notice period, migration guide, sunset headers, and supported versions.

## API Acceptance

- Contracts match product, database, and permission documents
- Every endpoint has authorization and error behavior
- Retries and side effects are safe
- Pagination and compatibility are deterministic
- Examples pass contract tests or schema validation
