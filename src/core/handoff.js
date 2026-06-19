import { join } from "node:path";
import { writeText } from "../fs-utils.js";

export async function generateHandoff({ cwd, projectName, projectType, docsPath, force = false, dryRun = false }) {
  const files = [
    {
      path: join(cwd, "AGENTS.md"),
      content: agentsContent({ projectName, projectType, docsPath })
    },
    {
      path: join(cwd, docsPath, "ai-handoff.md"),
      content: handoffContent({ projectName, projectType, docsPath })
    }
  ];

  if (dryRun) {
    return { dryRun: true, files, created: [], skipped: [] };
  }

  const created = [];
  const skipped = [];

  for (const file of files) {
    const result = await writeText(file.path, file.content, { force });
    if (result.written) created.push(file.path);
    if (result.skipped) skipped.push(file.path);
  }

  return { dryRun: false, files, created, skipped };
}

function agentsContent({ projectName, projectType, docsPath }) {
  return `# AGENTS.md

## Project

${projectName}

## Project type

${projectType}

## Source of truth

Read the approved documents in \`${docsPath}/\` before changing code.

## Required workflow

1. Inspect the repository.
2. Read product and technical docs.
3. Map work to requirements.
4. Keep changes inside the requested scope.
5. Run available checks.
6. Report what changed, how it was verified, and what remains.

## Approval required

Ask before destructive data changes, production deployment, new external services, permission changes, or undocumented scope expansion.
`;
}

function handoffContent({ projectName, projectType, docsPath }) {
  return `# AI Handoff

## Project

${projectName}

## Project type

${projectType}

## Documents

Use \`${docsPath}/\` as the source-of-truth folder.

## Build instruction

Implement only the current approved scope. If requirements conflict, stop and report the conflict before coding.

## Verification

After implementation, report tests run, files changed, risks, and any requirement that could not be completed.
`;
}
