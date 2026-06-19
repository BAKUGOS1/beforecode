# API Documentation

## 1. API Overview

Describe the API purpose and base URL.

## 2. Endpoint Format

Use this structure for every endpoint.

### Endpoint Name

```text
GET /api/resource
```

### Purpose

Describe what this endpoint does.

### Request Body

```json
{
  "name": "Example"
}
```

### Success Response

```json
{
  "success": true,
  "data": {}
}
```

### Error Response

```json
{
  "success": false,
  "message": "Something went wrong"
}
```

## 3. Pagination

Define page, limit, cursor, or offset rules.

## 4. Filtering and Sorting

Define available filters and sort fields.

## 5. Status Codes

| Code | Meaning |
|---|---|
| 200 | Success |
| 201 | Created |
| 400 | Invalid request |
| 404 | Not found |
| 500 | Server error |
