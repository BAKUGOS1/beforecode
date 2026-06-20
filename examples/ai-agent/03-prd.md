# Product Requirements Document

## Source Context

Generated from `00-project-context.md`. Missing agent authority, tool scope, or safety rules must remain open questions.

## Overview

TaskPilot is an AI planning agent that converts approved project documentation into scoped implementation tasks, acceptance criteria, and handoff notes.

## Goals

- Reduce vague prompts before AI-assisted coding.
- Make missing requirements visible before implementation.
- Produce structured tasks that map back to project docs.
- Separate confirmed facts, assumptions, and open questions.
- Keep tool usage explicit and reviewable.

## Non-goals

- No autonomous production deployment in v1.
- No direct secret access.
- No unrestricted repository mutation.
- No persistent long-term memory in v1.

## Personas

| Persona | Need | Success Signal |
|---|---|---|
| Product owner | Turn scope into clear implementation tasks | Can review tasks without reading every doc again |
| Engineering lead | Confirm readiness and risk | Can see assumptions, risks, and dependencies |
| Coding agent | Receive bounded implementation instructions | Can implement without guessing scope |
| QA reviewer | Understand acceptance criteria | Can test each task against source requirements |

## MVP Requirements

| ID | Requirement | Priority | Acceptance Criteria |
|---|---|---|---|
| FR-001 | Read project context from Markdown files | Must | Agent can summarize project scope with source references |
| FR-002 | Detect missing requirements | Must | Output contains open questions instead of invented answers |
| FR-003 | Generate implementation tasks | Must | Each task includes scope, files likely affected, and acceptance criteria |
| FR-004 | Separate assumptions from facts | Must | Output has distinct confirmed facts and assumptions sections |
| FR-005 | Enforce tool allowlist | Must | Agent refuses or stops when a tool is not approved |
| FR-006 | Generate handoff notes | Should | Handoff includes task order, risks, and verification plan |

## Success Metrics

- At least 90 percent of generated tasks are traceable to source docs.
- Zero critical invented requirements in evaluation fixtures.
- Human reviewer can approve or reject a task plan within 10 minutes.
- Agent stops on missing critical context instead of generating unsafe implementation steps.
