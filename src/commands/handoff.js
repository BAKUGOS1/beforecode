import { resolveOptions } from "../core/config.js";
import { generateHandoff } from "../core/handoff.js";

export async function handoffCommand(options, context) {
  const resolved = await resolveOptions(options, context.cwd);
  const result = await generateHandoff({ cwd: context.cwd, ...resolved });

  if (result.dryRun) {
    console.log("BeforeCode handoff dry run");
    for (const file of result.files) {
      console.log(`would create ${file.path}`);
    }
    return;
  }

  console.log("BeforeCode AI handoff generated");
  console.log(`Created: ${result.created.length}`);
  console.log(`Skipped: ${result.skipped.length}`);
}
