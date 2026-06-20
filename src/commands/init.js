import { relative } from "node:path";
import { resolveOptions } from "../core/config.js";
import { initProject } from "../core/generator.js";

export async function initCommand(options, context) {
  const resolved = await resolveOptions(options, context.cwd);
  const result = await initProject({ cwd: context.cwd, ...resolved });

  if (result.dryRun) {
    console.log(`BeforeCode dry run: ${result.label}`);
    for (const item of result.planned) {
      console.log(`would create ${relative(context.cwd, item.target)}`);
    }
    return;
  }

  console.log("BeforeCode initialized");
  console.log(`Project type: ${result.label}`);
  console.log(`Docs path: ${result.docsPath}`);
  console.log(`Created: ${result.created.length}`);
  console.log(`Skipped: ${result.skipped.length}`);
  console.log("Config: .beforecoderc.json");
}

