import { join } from "node:path";
import { readText } from "../fs-utils.js";
import { getProjectTypes } from "../data/project-types.js";

const UNKNOWN = "TBD";

export function normalizeContext(input = {}) {
  const projectName = clean(input.projectName) || clean(input.name) || "Untitled Project";
  const rawIdea = clean(input.rawIdea) || clean(input.idea) || UNKNOWN;
  const problem = clean(input.problem) || UNKNOWN;
  const targetUsers = toList(input.targetUsers || input.users);
  const projectType = resolveProjectType(input.projectType || input.type, rawIdea);
  const mvpFeatures = toList(input.mvpFeatures || input.features);
  const outOfScope = toList(input.outOfScope || input.excluded);
  const techPreferences = toList(input.techPreferences || input.tech || input.stack);
  const aiBuildMode = clean(input.aiBuildMode || input.ai) || UNKNOWN;
  const deadline = clean(input.deadline) || UNKNOWN;

  return {
    projectName,
    rawIdea,
    problem,
    targetUsers,
    projectType,
    mvpFeatures,
    outOfScope,
    techPreferences,
    aiBuildMode,
    deadline
  };
}

export async function contextFromIdeaFile({ cwd, filePath, options = {} }) {
  if (!filePath) {
    throw new Error("Missing --from <file> path.");
  }

  const absolutePath = join(cwd, filePath);
  const rawIdea = await readText(absolutePath);

  return normalizeContext({
    projectName: options.name,
    projectType: options.type,
    rawIdea,
    problem: options.problem,
    targetUsers: options.users,
    mvpFeatures: options.features,
    outOfScope: options.out,
    techPreferences: options.tech,
    aiBuildMode: options.ai,
    deadline: options.deadline
  });
}

export function renderProjectContext(context) {
  const value = normalizeContext(context);

  return `# Project Context

This is the source-of-truth context for the project. BeforeCode generated the planning workspace from this file.

## Project Name

${value.projectName}

## Raw Idea

${value.rawIdea}

## Problem

${value.problem}

## Target Users

${formatList(value.targetUsers)}

## Project Type

${value.projectType}

## MVP Features

${formatList(value.mvpFeatures)}

## Out of Scope for v1

${formatList(value.outOfScope)}

## Tech Preferences

${formatList(value.techPreferences)}

## AI Build Mode

${value.aiBuildMode}

## Deadline or Launch Target

${value.deadline}

## BeforeCode Rule

Do not invent product details. If context is missing, mark it as TBD or add it to open questions.
`;
}

export function renderOpenQuestions(context) {
  const value = normalizeContext(context);
  const questions = buildOpenQuestions(value);

  return `# Open Questions

These questions should be answered before serious implementation starts. They exist to prevent AI agents and developers from inventing unconfirmed behavior.

## Product

${formatList(questions.product)}

## Users and UX

${formatList(questions.ux)}

## Technical

${formatList(questions.technical)}

## QA and Release

${formatList(questions.qa)}
`;
}

export function contextSummary(context) {
  const value = normalizeContext(context);

  return {
    projectName: value.projectName,
    projectType: value.projectType,
    hasIdea: value.rawIdea !== UNKNOWN,
    hasProblem: value.problem !== UNKNOWN,
    hasUsers: value.targetUsers.length > 0,
    hasFeatures: value.mvpFeatures.length > 0,
    aiBuildMode: value.aiBuildMode
  };
}

export function contextTemplateValues(context) {
  const value = normalizeContext(context);

  return {
    sourceContext: `Generated from docs/00-project-context.md. Do not invent missing requirements.`,
    idea: value.rawIdea,
    problem: value.problem,
    targetUsers: value.targetUsers.join(", ") || UNKNOWN,
    mvpFeatures: value.mvpFeatures.join(", ") || UNKNOWN,
    outOfScope: value.outOfScope.join(", ") || UNKNOWN,
    techPreferences: value.techPreferences.join(", ") || UNKNOWN,
    aiBuildMode: value.aiBuildMode,
    deadline: value.deadline
  };
}

function resolveProjectType(type, rawIdea) {
  const supported = getProjectTypes();
  const cleaned = clean(type)?.toLowerCase();

  if (cleaned && supported.includes(cleaned)) {
    return cleaned;
  }

  const idea = String(rawIdea || "").toLowerCase();

  if (idea.includes("crm") || idea.includes("lead") || idea.includes("deal")) return "crm";
  if (idea.includes("agent") || idea.includes("ai")) return "ai-agent";
  if (idea.includes("shop") || idea.includes("store") || idea.includes("marketplace")) return "ecommerce";
  if (idea.includes("mobile") || idea.includes("android") || idea.includes("ios")) return "mobile";
  if (idea.includes("portfolio")) return "portfolio";
  if (idea.includes("saas") || idea.includes("subscription")) return "saas";

  return cleaned || "small";
}

function buildOpenQuestions(context) {
  const product = [];
  const ux = [];
  const technical = [];
  const qa = [];

  if (context.rawIdea === UNKNOWN) product.push("What exactly are we building?");
  if (context.problem === UNKNOWN) product.push("What user or business problem does this solve?");
  if (context.mvpFeatures.length === 0) product.push("Which features are mandatory for MVP launch?");
  if (context.outOfScope.length === 0) product.push("What should be explicitly excluded from v1?");
  product.push("What is the primary success metric for v1?");

  if (context.targetUsers.length === 0) ux.push("Who are the primary users and secondary users?");
  ux.push("What is the first successful action a new user should complete?");
  ux.push("Which screens or flows are critical for MVP?");

  if (context.techPreferences.length === 0) technical.push("Which frontend, backend, database, and auth stack should be used?");
  technical.push("What data must be stored, protected, exported, or audited?");
  technical.push("Which integrations or third-party services are required?");

  qa.push("Which workflows must never break?");
  qa.push("What should be tested manually before release?");
  qa.push("What performance, security, or reliability constraints matter for v1?");

  return { product, ux, technical, qa };
}

function toList(value) {
  if (Array.isArray(value)) {
    return value.map(clean).filter(Boolean);
  }

  if (!value) return [];

  return String(value)
    .split(/[\n,]/)
    .map(clean)
    .filter(Boolean)
    .filter((item) => item.toLowerCase() !== "tbd");
}

function clean(value) {
  if (value === null || value === undefined) return "";
  return String(value).trim();
}

function formatList(items) {
  if (!items.length) return "- TBD";
  return items.map((item) => `- ${item}`).join("\n");
}
