import { resolveOptions } from "../core/config.js";
import { checkProject } from "../core/checker.js";

export async function checkCommand(options, context) {
  const resolved = await resolveOptions(options, context.cwd);
  const result = await checkProject({
    cwd: context.cwd,
    projectType: resolved.projectType,
    docsPath: resolved.docsPath
  });

  console.log(`BeforeCode check: ${result.label}`);
  console.log("");

  for (const item of result.results) {
    console.log(`${item.found ? "✓" : "✗"} ${item.file}`);
  }

  if (result.missing.length) {
    console.log("");
    console.log("Missing:");
    for (const item of result.missing) {
      console.log(`- ${item.file}`);
    }
  }

  console.log("");
  console.log(`Readiness: ${result.score}%`);
}
