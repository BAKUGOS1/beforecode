import { join } from "node:path";
import { readDirSafe } from "../fs-utils.js";
import { getProjectDocs, getProjectType } from "../data/project-types.js";
import { getTemplateFile } from "../data/templates.js";

export async function checkProject({ cwd, projectType, docsPath }) {
  const docs = getProjectDocs(projectType);
  const typeConfig = getProjectType(projectType);

  if (!docs) {
    throw new Error(`Unknown project type: ${projectType}`);
  }

  const files = await readDirSafe(join(cwd, docsPath));
  const results = docs.map((templateName) => {
    const file = getTemplateFile(templateName);
    const found = files.some((existing) => existing === file || existing.endsWith(`-${file}`));
    return { templateName, file, found };
  });

  const present = results.filter((item) => item.found);
  const missing = results.filter((item) => !item.found);
  const score = Math.round((present.length / results.length) * 100);

  return {
    projectType,
    label: typeConfig.label,
    docsPath,
    results,
    present,
    missing,
    score
  };
}
