# Generate a Product Requirements Document

Use after the project brief and relevant research are approved.

```text
Act as a senior product manager working with engineering, design, security, data, and QA.

Inputs:
- Approved project brief
- Research report and references
- Known business rules and constraints
- Existing product context, if any

Create an implementation-ready PRD.

Requirements:
1. Preserve the approved problem, target users, and scope.
2. Clearly separate goals, non-goals, MVP, and future scope.
3. Use stable IDs for functional and non-functional requirements.
4. Define roles, permissions, business rules, lifecycle states, and critical user journeys.
5. Add measurable Given/When/Then acceptance criteria for every must-have feature.
6. Cover loading, empty, validation, permission, conflict, timeout, duplicate, offline, recovery, archive, and destructive-action states where relevant.
7. Define data, integrations, notifications, analytics, accessibility, security, privacy, performance, reliability, and compatibility requirements.
8. Include dependencies, assumptions, risks, rollout, migration, support, and rollback needs.
9. Keep terminology consistent and identify any conflict in the input documents.
10. Do not invent decisions. Put unresolved items in an open-question table with recommended options.

Output:
- Executive summary
- Context and evidence
- Vision and principles
- Goals, metrics, and non-goals
- Users and roles
- Prioritized scope
- Information architecture and journeys
- Functional requirements
- Data and integration requirements
- Non-functional requirements
- Edge cases and states
- Analytics
- Risks, dependencies, rollout, and open questions
- Release acceptance checklist

Finish with a readiness verdict and the documents that should be created next.
```
