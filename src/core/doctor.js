import { join } from "node:path";
import { checkProject } from "./checker.js";
import { CONFIG_FILE, readConfig } from "./config.js";
import { exists, readDirSafe, readText } from "../fs-utils.js";

const PLACEHOLDER_PATTERNS = [
  /\bTBD\b/i,
  /\bTODO\b/i,
  /Describe /i,
  /Define /i,
  /What system/i,
  /\|\s*\|/,
  /\|\s*\|\s*\|/
];

export async function doctorProject({ cwd, projectType, docsPath }) {
  const config = await readConfig(cwd);
  const check = await checkProject({ cwd, projectType, docsPath });
  const docsDir = join(cwd, docsPath);
  const files = await readDirSafe(docsDir);
  const foundDocs = [];

  for (const item of check.results.filter((result) => result.found)) {
    const actualFile = files.find((file) => file === item.file || file.endsWith(`-${item.file}`));

    if (!actualFile) continue;

    const path = join(docsDir, actualFile);
    const content = await readText(path);
    const audit = inspectDocument(content);

    foundDocs.push({
      ...item,
      actualFile,
      path,
      ...audit
    });
  }

  const weakDocs = foundDocs.filter((doc) => doc.status !== "ready");
  const agentsPath = join(cwd, "AGENTS.md");
  const handoffPath = join(docsDir, "ai-handoff.md");
  const hasAgents = await exists(agentsPath);
  const hasHandoff = await exists(handoffPath);
  const hasConfig = Boolean(config);
  const health = calculateHealth({
    requiredCount: check.results.length,
    missingCount: check.missing.length,
    weakCount: weakDocs.length,
    hasConfig,
    hasAgents,
    hasHandoff
  });

  return {
    projectType,
    label: check.label,
    docsPath,
    configFile: CONFIG_FILE,
    hasConfig,
    hasAgents,
    hasHandoff,
    required: check.results,
    present: check.present,
    missing: check.missing,
    foundDocs,
    weakDocs,
    health,
    recommendations: buildRecommendations({
      missing: check.missing,
      weakDocs,
      hasConfig,
      hasAgents,
      hasHandoff,
      docsPath,
      projectType
    })
  };
}

function inspectDocument(content) {
  const trimmed = content.trim();
  const lines = trimmed ? trimmed.split(/\r?\n/) : [];
  const wordCount = (trimmed.match(/[A-Za-z0-9]+/g) || []).length;
  const placeholderHits = PLACEHOLDER_PATTERNS.filter((pattern) => pattern.test(content)).length;
  const status = wordCount < 120 || placeholderHits > 0 ? "needs-work" : "ready";
  const reasons = [];

  if (wordCount < 120) {
    reasons.push("low content depth");
  }

  if (placeholderHits > 0) {
    reasons.push("placeholder content remains");
  }

  return {
    status,
    wordCount,
    lineCount: lines.length,
    placeholderHits,
    reasons
  };
}

function calculateHealth({ requiredCount, missingCount, weakCount, hasConfig, hasAgents, hasHandoff }) {
  const missingPenalty = requiredCount ? Math.round((missingCount / requiredCount) * 45) : 0;
  const weakPenalty = Math.min(30, weakCount * 4);
  const configPenalty = hasConfig ? 0 : 10;
  const handoffPenalty = hasAgents && hasHandoff ? 0 : 15;

  return Math.max(0, 100 - missingPenalty - weakPenalty - configPenalty - handoffPenalty);
}

function buildRecommendations({ missing, weakDocs, hasConfig, hasAgents, hasHandoff, docsPath, projectType }) {
  const recommendations = [];

  if (missing.length) {
    recommendations.push(`Run beforecode init --type ${projectType} --docs ${docsPath} to generate missing required docs.`);
  }

  if (weakDocs.length) {
    recommendations.push("Replace placeholders and shallow sections in the docs needing attention.");
  }

  if (!hasConfig) {
    recommendations.push("Run beforecode init once so .beforecoderc.json can save the project type and docs folder.");
  }

  if (!hasAgents || !hasHandoff) {
    recommendations.push("Run beforecode handoff to create AGENTS.md and docs/ai-handoff.md before using AI coding agents.");
  }

  if (!recommendations.length) {
    recommendations.push("Project documentation looks ready for implementation review.");
  }

  return recommendations;
}
