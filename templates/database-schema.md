# Database Schema

## 1. Database Overview

Describe the database choice and purpose.

## 2. Entities

List main entities.

```text
users
projects
tasks
settings
activity_logs
```

## 3. Tables

### Table: users

| Column | Type | Required | Notes |
|---|---|---|---|
| id | uuid | yes | primary key |
| name | text | yes | user name |
| email | text | yes | unique |
| created_at | timestamp | yes | creation time |

## 4. Relationships

Describe table relationships.

## 5. Indexes

List indexes for search and performance.

## 6. Constraints

List unique, required, and validation rules.

## 7. Audit Fields

Recommended fields:

```text
created_at
updated_at
created_by
updated_by
```

## 8. Soft Delete

Define whether deleted records should be archived or permanently removed.
