import { join } from "node:path";
import { parseArgs } from "./args.js";
import { TEMPLATE_DIR, projectPath } from "./paths.js";
import { copyFileSafe, ensureDir, exists, writeJson } from "./fs-utils.js";
import { getProjectDocs, getProjectTypes } from "./project-types.js";
import { getTemplateFile, listTemplates } from "./template-map.js";

const VERSION = "0.1.0";

export async function runCli(argv) {
  const options = parseArgs(argv);
  const command = options._[0] || "help";

  if (options.version || command === "version") return printVersion();
  if (options.help || command === "help") return printHelp();
  if (command === "init") return initCommand(options);
  if (command === "add") return addCommand(options);
  if (command === "check") return checkCommand(options);
  if (command === "score") return scoreCommand(options);
  if (command === "list") return listCommand();

  throw new Error(`Unknown command: ${command}`);
}

function printVersion() {
  console.log(`beforecode ${VERSION}`);
}

function printHelp() {
  console.log(`BeforeCode CLI\n\nUsage:\n  beforecode init --type saas\n  beforecode add prd\n  beforecode check --type saas\n  beforecode score --type saas\n  beforecode list\n\nProject types:\n  ${getProjectTypes().join(", ")}\n`);
}

function listCommand() {
  console.log("Project types:");
  for (const type of getProjectTypes()) console.log(`- ${type}`);
  console.log("\nTemplates:");
  for (const item of listTemplates()) console.log(`- ${item}`);
}

async function initCommand(options) {
  const type = options.type || "small";
  const docs = getProjectDocs(type);
  if (!docs) throw new Error(`Unknown project type: ${type}`);

  const docsDir = projectPath(options.docs || "docs");
  await ensureDir(docsDir);

  const copied = [];
  const skipped = [];

  for (const name of docs) {
    const file = getTemplateFile(name);
    const source = join(TEMPLATE_DIR, file);
    const target = join(docsDir, numberedName(copied.length + skipped.length + 1, file));
    const result = await copyFileSafe(source, target, { force: Boolean(options.force) });
    if (result.copied) copied.push(target);
    if (result.skipped) skipped.push(target);
  }

  await writeJson(projectPath(".beforecoderc.json"), {
    projectType: type,
    docsPath: options.docs || "docs",
    generatedBy: "beforecode",
    version: VERSION
  });

  console.log(`BeforeCode initialized for ${type}.`);
  console.log(`Copied: ${copied.length}`);
  if (skipped.length) console.log(`Skipped existing files: ${skipped.length}`);
}

async function addCommand(options) {
  const name = options._[1];
  if (!name) throw new Error("Missing template name. Example: beforecode add prd");
  const file = getTemplateFile(name);
  if (!file) throw new Error(`Unknown template: ${name}`);
  const docsDir = projectPath(options.docs || "docs");
  const source = join(TEMPLATE_DIR, file);
  const target = join(docsDir, file);
  const result = await copyFileSafe(source, target, { force: Boolean(options.force) });
  console.log(result.copied ? `Added ${file}` : `Skipped existing ${file}`);
}

async function checkCommand(options) {
  const type = options.type || "small";
  const docs = getProjectDocs(type);
  if (!docs) throw new Error(`Unknown project type: ${type}`);
  const docsDir = projectPath(options.docs || "docs");
  let present = 0;
  console.log(`BeforeCode check: ${type}\n`);
  for (const name of docs) {
    const file = getTemplateFile(name);
    const expected = join(docsDir, file);
    const found = await exists(expected) || await exists(join(docsDir, numberedName(docs.indexOf(name) + 1, file)));
    if (found) present += 1;
    console.log(`${found ? "✓" : "✗"} ${file}`);
  }
  const score = Math.round((present / docs.length) * 100);
  console.log(`\nReadiness: ${score}%`);
}

async function scoreCommand(options) {
  return checkCommand(options);
}

function numberedName(index, file) {
  return `${String(index).padStart(2, "0")}-${file}`;
}
