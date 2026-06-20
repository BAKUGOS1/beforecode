import { join } from "node:path";
import { ensureDir, writeText } from "../fs-utils.js";
import { writeConfig } from "./config.js";
import { initProject } from "./generator.js";
import { contextSummary, normalizeContext, renderOpenQuestions, renderProjectContext } from "./context.js";

const VERSION = "0.2.0";

export async function createPlanningWorkspace({ cwd, docsPath = "docs", force = false, dryRun = false, context }) {
  const projectContext = normalizeContext(context);
  const docsDir = join(cwd, docsPath);
  const contextFiles = getContextFiles(cwd, docsPath, projectContext);

  const initPreview = await initProject({
    cwd,
    projectName: projectContext.projectName,
    projectType: projectContext.projectType,
    docsPath,
    force,
    dryRun: true,
    indexOffset: 2,
    context: projectContext
  });

  const planned = [...contextFiles, ...initPreview.planned];

  if (dryRun) {
    return { dryRun: true, context: projectContext, docsPath, planned, created: [], skipped: [] };
  }

  await ensureDir(docsDir);

  const created = [];
  const skipped = [];

  for (const file of contextFiles) {
    const result = await writeText(file.target, file.content, { force });
    if (result.written) created.push(file.target);
    if (result.skipped) skipped.push(file.target);
  }

  const generated = await initProject({
    cwd,
    projectName: projectContext.projectName,
    projectType: projectContext.projectType,
    docsPath,
    force,
    dryRun: false,
    indexOffset: 2,
    context: projectContext,
    additionalDocuments: contextFiles.map((file) => file.file),
    extraConfig: {
      workflow: "context-first",
      context: contextSummary(projectContext)
    }
  });

  created.push(...generated.created);
  skipped.push(...generated.skipped);

  await writeConfig(cwd, {
    projectName: projectContext.projectName,
    projectType: projectContext.projectType,
    docsPath,
    createdBy: "beforecode",
    version: VERSION,
    workflow: "context-first",
    context: contextSummary(projectContext),
    documents: [
      ...contextFiles.map((file) => file.file),
      ...generated.planned.map((item) => item.target.split(/[\\/]/).pop())
    ]
  });

  return { dryRun: false, context: projectContext, docsPath, planned, created, skipped };
}

function getContextFiles(cwd, docsPath, projectContext) {
  const docsDir = join(cwd, docsPath);

  return [
    {
      target: join(docsDir, "00-project-context.md"),
      file: "00-project-context.md",
      content: renderProjectContext(projectContext)
    },
    {
      target: join(docsDir, "01-open-questions.md"),
      file: "01-open-questions.md",
      content: renderOpenQuestions(projectContext)
    }
  ];
}
