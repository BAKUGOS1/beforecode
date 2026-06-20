# Project Context

## Project Name

TaskPilot

## Raw Idea

Build an AI task planning agent that reads approved project documentation, identifies missing requirements, turns scope into implementation tasks, and creates a handoff for human developers or coding agents.

## Problem

Teams often give AI coding tools vague prompts, which leads to guessed requirements, broad code changes, missing QA, and weak traceability between product intent and implementation work.

## Target Users

- Product owner who wants scope translated into implementation tasks
- Engineering lead who reviews technical readiness
- Developer or coding agent that needs a safe handoff
- QA reviewer who needs clear acceptance criteria

## Project Type

ai-agent

## MVP Features

- Ingest project context from Markdown docs
- Identify missing decisions and unresolved questions
- Produce scoped implementation tasks
- Generate acceptance criteria per task
- Create AI coding handoff notes
- Refuse to invent requirements when context is missing
- Record assumptions separately from confirmed facts

## Out of Scope for v1

- Autonomous production deployment
- Direct database mutation
- Secret access
- Unrestricted browser automation
- Long-term autonomous memory
- Multi-agent orchestration

## Tech Preferences

- Node.js CLI or service runtime
- Markdown as source-of-truth input
- JSON task output for downstream tools
- Local-first execution by default
- Explicit tool allowlist

## AI Build Mode

Yes. The system itself is an AI-agent planning product, so safety boundaries and stopping conditions must be documented before implementation.

## Deadline or Launch Target

Internal alpha in two weeks.

## BeforeCode Rule

Do not invent product details. If context is missing, mark it as TBD or add it to open questions.
