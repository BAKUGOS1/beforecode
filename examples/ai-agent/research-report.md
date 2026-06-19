# TaskPilot AI Agent Research Report

## 1. Research Objective

Define a production-oriented architecture for a human-supervised task agent with durable state, controlled tools, memory, evaluation, security, and observability.

## 2. Findings

### Explicit orchestration is preferable for consequential workflows

Agent frameworks increasingly separate high-level agent behavior from an orchestration runtime. LangGraph documents durable execution, persistence, streaming, and human-in-the-loop interrupts as runtime concerns. For TaskPilot, planning and tool routing should therefore be represented as explicit states rather than one unrestricted prompt loop.

### Human approval must be a persisted state

An approval request cannot live only in process memory. The run must checkpoint before pausing, expose the proposed action and risk, and resume from the same logical state after approve, reject, edit, or expiry.

### Durable execution requires replay-safe side effects

Persistence alone does not prevent duplicate actions. Every external mutation needs an idempotency key, an action ledger, a known retry policy, and verification after execution. Temporal's workflow guidance reinforces separating durable orchestration from failure-prone activities; TaskPilot adopts this principle without adding Temporal to the MVP runtime.

### Memory is not one database

The system needs distinct categories:

- Run state: exact workflow checkpoint
- Conversation context: current thread messages and summaries
- User memory: reviewed preferences and stable facts
- Knowledge sources: retrieved documents with provenance
- Operational history: immutable tool and policy events

Mixing these categories increases privacy, poisoning, and relevance risks.

### Tool security is an application control problem

Prompt instructions cannot be the only authorization layer. Tool access should be decided using authenticated identity, workspace, autonomy level, tool risk, arguments, destination, approval status, and budget. MCP authorization guidance also supports explicit resource-scoped authorization and avoiding unsafe token forwarding.

### Prompt injection is expected, not exceptional

OWASP identifies prompt injection as a primary LLM application risk. Retrieved webpages, files, emails, tool output, and memory must be treated as untrusted content. They may provide facts but cannot redefine system policy or grant permissions.

### Evaluation must cover trajectories, not only final text

A good final answer can hide unsafe or wasteful behavior. Evaluation should inspect plan quality, tool selection, policy compliance, evidence use, cost, latency, retries, and final outcome. Regression datasets are required before prompt, model, tool, or policy changes ship.

### Observability should use structured traces

OpenTelemetry defines GenAI-oriented semantic conventions for model and agent operations. TaskPilot should emit traceable run, model, tool, approval, retrieval, and policy events while redacting sensitive content by default.

## 3. Recommended Architecture

```text
Web client
→ API and authentication
→ Run service
→ Durable job queue and workers
→ LangGraph state machine
→ Model gateway
→ Policy engine
→ Tool gateway
→ External systems

Shared services:
PostgreSQL checkpoints and metadata
Object storage for artifacts
OpenTelemetry traces and metrics
Evaluation datasets and results
```

## 4. Key Architectural Decisions

1. Use one orchestrator agent for MVP; add specialist subagents only after evaluations show a need.
2. Use LangGraph for explicit graph state, checkpoints, interrupts, and resumption.
3. Use PostgreSQL as the system of record for runs, checkpoints, approvals, memory metadata, and action ledger.
4. Put authorization and approval checks in a deterministic policy engine outside the model.
5. Route every tool call through a typed tool gateway.
6. Require evidence and verifier checks before declaring success.
7. Keep model providers behind a gateway to support routing, fallback, and cost control.
8. Reserve Temporal for future multi-day, cross-service workflows where its operational value justifies a second orchestration layer.

## 5. References

Primary sources reviewed:

- OpenAI, A Practical Guide to Building Agents: https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/
- LangGraph Overview: https://docs.langchain.com/oss/python/langgraph/overview
- LangGraph Persistence: https://docs.langchain.com/oss/python/langgraph/persistence
- LangGraph Interrupts: https://docs.langchain.com/oss/python/langgraph/interrupts
- Temporal Failure and Error Handling: https://docs.temporal.io/encyclopedia/failures-and-error-handling
- OpenTelemetry GenAI Semantic Conventions: https://opentelemetry.io/docs/specs/semconv/gen-ai/
- OWASP LLM01 Prompt Injection: https://genai.owasp.org/llmrisk/llm01-prompt-injection/
- MCP Authorization Guidance: https://modelcontextprotocol.io/docs/tutorials/security/authorization

## 6. Research Conclusion

The reliable pattern is a bounded workflow system with an LLM inside it, not an LLM with unrestricted tools around it. TaskPilot should optimize for controllability, replay safety, evidence, and measurable task success before increasing autonomy.