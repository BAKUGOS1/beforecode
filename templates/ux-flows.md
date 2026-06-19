# UX Flows

## 1. Experience Objective

State the user outcome, primary persona, platform, and usability constraints.

## 2. Information Architecture

Describe navigation hierarchy, primary objects, routes/screens, global actions, and entry points.

## 3. Critical Journey Catalog

| Journey | Persona | Trigger | Success outcome | Priority |
|---|---|---|---|---|
|  |  |  |  |  |

## 4. Flow Template

### Flow name

**Goal:**  
**Actor:**  
**Entry points:**  
**Preconditions:**  
**Permissions:**

```text
Start → Input → Validation → Decision → Action → Confirmation
                         └→ Error → Recovery
```

| Step | Screen/state | User action | System response | Analytics |
|---:|---|---|---|---|
| 1 |  |  |  |  |

Alternative and failure paths:

- Validation failure
- Permission denied
- Empty data
- Network interruption
- Duplicate action
- Conflict/stale data
- Cancel/back navigation

Completion criteria:

- User-visible success
- Persisted system state
- Next recommended action

## 5. Cross-Cutting States

Define loading, skeleton, empty, filtered-empty, error, offline, partial success, success, disabled, archived, and destructive confirmation states.

## 6. Forms and Validation

Define field order, defaults, required/optional fields, inline errors, server errors, data preservation, autosave, and duplicate submission behavior.

## 7. Responsive Behavior

Describe what reflows, collapses, scrolls, becomes a drawer, or changes priority on mobile/tablet/desktop.

## 8. Accessibility

Document keyboard path, focus management, labels, error announcement, contrast, touch targets, reduced motion, and non-color indicators.

## 9. Open Questions and Handoff

Link wireframes, prototypes, PRD requirements, API dependencies, analytics events, and unresolved design decisions.
