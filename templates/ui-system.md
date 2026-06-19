# UI System

## 1. Principles

Define visual, interaction, accessibility, and content principles that guide trade-offs.

## 2. Foundations

### Color

| Token | Light | Dark | Usage | Contrast requirement |
|---|---|---|---|---|
| color-bg |  |  |  |  |

### Typography

| Token | Font | Size/line | Weight | Usage |
|---|---|---|---|---|
| text-body |  |  |  |  |

### Spacing, radius, elevation, motion, iconography

Define token scales and usage rules. Avoid one-off values without rationale.

## 3. Layout

Document breakpoints, containers, grids, density, safe areas, and responsive priority.

## 4. Component Inventory

| Component | Variants | States | Accessibility | Owner/status |
|---|---|---|---|---|
| Button |  | Default/hover/focus/disabled/loading | Name, role, keyboard |  |

Cover forms, navigation, feedback, overlays, data display, tables, pagination, search/filter, and empty states.

## 5. Component Specification

For each important component define anatomy, properties, variants, states, behavior, validation, keyboard interaction, content limits, responsive behavior, and do/don't examples.

## 6. Content Design

Define voice, labels, capitalization, date/number/currency formats, error messages, confirmation language, and destructive-action wording.

## 7. Accessibility

Target standard, contrast, focus, semantics, screen-reader behavior, keyboard operation, touch targets, motion, zoom, and testing tools.

## 8. Theming and Brand

Define theme behavior, logo/mark clear space, color restrictions, imagery, and fallback behavior.

## 9. Implementation Mapping

Map design tokens and components to code packages, naming, versioning, ownership, and deprecation.

## 10. Quality Checklist

- Tokens replace repeated raw values
- Components include every required state
- Keyboard and screen-reader behavior are defined
- Responsive and localization stress cases are covered
- Design and code use matching names and variants
