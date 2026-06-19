import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SRC_DIR = dirname(fileURLToPath(import.meta.url));
export const PACKAGE_ROOT = resolve(SRC_DIR, "..");
export const TEMPLATE_DIR = join(PACKAGE_ROOT, "templates");
export const PROMPT_DIR = join(PACKAGE_ROOT, "prompts");

export function projectPath(...parts) {
  return resolve(process.cwd(), ...parts);
}
