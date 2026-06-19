# TaskPilot Memory Plan

## 1. Memory Objectives

Improve continuity and relevance without turning untrusted history into permanent authority or exposing data across users and workspaces.

## 2. Memory Types

### Working State

Exact current run state stored in checkpoints. This is operational state, not semantic memory.

### Conversation Summary

Compressed current-thread context used to control token growth. Original messages remain separately auditable according to retention policy.

### Episodic Memory

A structured summary of a completed run: goal, outcome, decisions, artifacts, feedback, and provenance.

### Semantic Memory

Stable user-approved facts and preferences such as preferred output style or recurring project constraints.

### Knowledge Sources

Workspace documents and indexed content retrieved at run time with access checks and citations.

## 3. Memory Record

```text
memory_id
workspace_id
subject_id
type
content
source_refs
confidence
sensitivity
created_by
review_status
created_at
expires_at
supersedes_id
```

## 4. Write Policy

A memory candidate is written only when:

- It is useful beyond the current run
- Source and subject are known
- It does not conflict with higher-trust memory
- Sensitive-data policy permits storage
- Confidence threshold is met
- User approval is obtained when required

Raw retrieved instructions are never promoted automatically.

## 5. Retrieval Policy

Retrieval filters by tenant, subject, type, sensitivity, expiry, and task relevance. Results include provenance and confidence. The model is told that memory may be outdated and must not treat it as permission.

## 6. Conflict Handling

- Newer verified memory can supersede older memory
- Conflicts remain visible until resolved
- User corrections have higher priority than model inference
- Workspace policy outranks personal preference

## 7. Privacy and Retention

Users can view, edit, delete, and export their memory. Admins define retention by category. Deleting a source should invalidate derived memory where required.

## 8. Poisoning Controls

- Separate content from instructions
- Require provenance
- Restrict memory writes to trusted service code
- Scan for embedded prompt injection patterns
- Evaluate retrieved memory against current policy
- Monitor unusual memory creation rates

## 9. Quality Metrics

- Retrieval precision
- User correction rate
- Stale-memory rate
- Memory-assisted task improvement
- Cross-tenant leakage incidents
- Unsupported memory write rate