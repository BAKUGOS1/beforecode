import { join } from "node:path";
import { TEMPLATE_DIR } from "../paths.js";
import { ensureDir, exists, readText, writeText } from "../fs-utils.js";
import { getProjectDocs, getProjectType } from "../data/project-types.js";
import { getTemplateFile } from "../data/templates.js";
import { VERSION } from "../version.js";
import { writeConfig } from "./config.js";

export async function initProject({ cwd, projectName, projectType, docsPath, force = false, dryRun = false }) {
  const docs = getProjectDocs(projectType);
  const typeConfig = getProjectType(projectType);

  if (!docs) {
    throw new Error(`Unknown project type: ${projectType}`);
  }

  const docsDir = join(cwd, docsPath);
  const planned = docs.map((templateName, index) => {
    const file = getTemplateFile(templateName);
    return {
      templateName,
      file,
      target: join(docsDir, numberedName(index + 1, file))
    };
  });

  if (dryRun) {
    return {
      dryRun: true,
      projectType,
      label: typeConfig.label,
      docsPath,
      planned,
      created: [],
      skipped: []
    };
  }

  await ensureDir(docsDir);

  const created = [];
  const skipped = [];

  for (const item of planned) {
    if (!force && await exists(item.target)) {
      skipped.push(item.target);
      continue;
    }

    const source = join(TEMPLATE_DIR, item.file);
    const content = renderTemplate(await readText(source), {
      projectName,
      projectType,
      docsPath,
      templateName: item.templateName
    });

    await writeText(item.target, content, { force: true });
    created.push(item.target);
  }

  await writeConfig(cwd, {
    projectName,
    projectType,
    docsPath,
    createdBy: "beforecode",
    version: VERSION,
    documents: planned.map((item) => item.target.split(/[\\/]/).pop())
  });

  return {
    dryRun: false,
    projectType,
    label: typeConfig.label,
    docsPath,
    planned,
    created,
    skipped
  };
}

export async function addTemplate({ cwd, templateName, docsPath, force = false, dryRun = false }) {
  const file = getTemplateFile(templateName);

  if (!file) {
    throw new Error(`Unknown template: ${templateName}`);
  }

  const target = join(cwd, docsPath, file);
  const source = join(TEMPLATE_DIR, file);

  if (dryRun) {
    return { dryRun: true, target, created: false, skipped: false };
  }

  if (!force && await exists(target)) {
    return { dryRun: false, target, created: false, skipped: true };
  }

  await writeText(target, await readText(source), { force: true });
  return { dryRun: false, target, created: true, skipped: false };
}

function numberedName(index, file) {
  return `${String(index).padStart(2, "0")}-${file}`;
}

function renderTemplate(content, values) {
  return content
    .replaceAll("{{projectName}}", values.projectName)
    .replaceAll("{{projectType}}", values.projectType)
    .replaceAll("{{docsPath}}", values.docsPath)
    .replaceAll("{{templateName}}", values.templateName);
}
