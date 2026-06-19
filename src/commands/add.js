import { resolveOptions } from "../core/config.js";
import { addTemplate } from "../core/generator.js";

export async function addCommand(options, context) {
  const templateName = options._[1];

  if (!templateName) {
    throw new Error("Missing template name. Example: beforecode add prd");
  }

  const resolved = await resolveOptions(options, context.cwd);
  const result = await addTemplate({
    cwd: context.cwd,
    templateName,
    docsPath: resolved.docsPath,
    force: resolved.force,
    dryRun: resolved.dryRun
  });

  if (result.dryRun) {
    console.log(`would create ${result.target}`);
  } else if (result.created) {
    console.log(`Added ${templateName}`);
  } else {
    console.log(`Skipped existing ${templateName}`);
  }
}
