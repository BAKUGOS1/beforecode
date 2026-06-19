# AI Prompt Library

These prompts help create and review documentation, but generated output must be verified against real project context.

## Available prompts

### Documentation

- [Generate PRD](chatgpt/generate-prd.md) — turn an approved project brief into a detailed PRD
- [Review documentation](chatgpt/review-documentation.md) — find gaps, conflicts, and weak acceptance criteria

### Implementation

- [Build from docs](codex/build-from-docs.md) — hand approved specifications to an AI coding agent
- [Generate tests](codex/generate-tests.md) — create tests from requirements and QA coverage
- [Audit implementation](codex/audit-against-docs.md) — compare an existing repository with its source-of-truth documents

## Safe usage

1. Give the model only the documents and repository access it needs.
2. Mark approved documents as the source of truth.
3. Require the model to report conflicts and missing requirements.
4. Review architecture, security, privacy, destructive actions, and external writes manually.
5. Run tests and inspect changes before merge or deployment.
6. Update documentation when an approved implementation decision changes.

Prompts are tool-independent. Adjust terminology for the AI coding system you use.
