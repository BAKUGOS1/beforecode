import { join } from "node:path";
import { exists, readText, writeText } from "../fs-utils.js";

export const CONFIG_FILE = ".beforecoderc.json";

export async function readConfig(cwd) {
  const path = join(cwd, CONFIG_FILE);

  if (!await exists(path)) {
    return null;
  }

  try {
    return JSON.parse(await readText(path));
  } catch {
    throw new Error(`${CONFIG_FILE} exists but is not valid JSON.`);
  }
}

export async function writeConfig(cwd, config, { force = true } = {}) {
  const path = join(cwd, CONFIG_FILE);
  return writeText(path, `${JSON.stringify(config, null, 2)}\n`, { force });
}

export async function resolveOptions(options, cwd) {
  const config = await readConfig(cwd);

  return {
    projectName: options.name || config?.projectName || "Untitled Project",
    projectType: options.type || config?.projectType || "small",
    docsPath: options.docs || config?.docsPath || "docs",
    force: Boolean(options.force),
    dryRun: Boolean(options["dry-run"])
  };
}
