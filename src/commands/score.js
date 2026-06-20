import { resolveOptions } from "../core/config.js";
import { scoreProject } from "../core/scorer.js";

export async function scoreCommand(options, context) {
  const resolved = await resolveOptions(options, context.cwd);
  const result = await scoreProject({
    cwd: context.cwd,
    projectType: resolved.projectType,
    docsPath: resolved.docsPath
  });

  console.log(`BeforeCode readiness score: ${result.label}`);
  console.log("");

  for (const [category, score] of Object.entries(result.categories)) {
    console.log(`${label(category)}: ${score}%`);
  }

  console.log("");
  console.log(`Overall: ${result.score}%`);

  if (result.score < 70) {
    console.log("Status: Needs more documentation before full build.");
  } else if (result.score < 90) {
    console.log("Status: Good start, but review missing areas.");
  } else {
    console.log("Status: Ready for implementation review.");
  }
}

function label(value) {
  return value.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
}
