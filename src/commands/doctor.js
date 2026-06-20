import { resolveOptions } from "../core/config.js";
import { doctorProject } from "../core/doctor.js";

export async function doctorCommand(options, context) {
  const resolved = await resolveOptions(options, context.cwd);
  const result = await doctorProject({
    cwd: context.cwd,
    projectType: resolved.projectType,
    docsPath: resolved.docsPath
  });

  console.log(`BeforeCode doctor: ${result.label}`);
  console.log(`Docs folder: ${result.docsPath}`);
  console.log(`Health: ${result.health}%`);
  console.log("");

  printCheck(result.hasConfig, `${result.configFile} exists`);
  printCheck(result.missing.length === 0, `Required docs present: ${result.present.length}/${result.required.length}`);
  printCheck(result.weakDocs.length === 0, `Docs with enough content: ${result.foundDocs.length - result.weakDocs.length}/${result.foundDocs.length}`);
  printCheck(result.hasAgents && result.hasHandoff, "AI handoff files exist");

  if (result.missing.length) {
    console.log("");
    console.log("Missing required docs:");
    for (const item of result.missing) {
      console.log(`- ${item.file}`);
    }
  }

  if (result.weakDocs.length) {
    console.log("");
    console.log("Docs needing attention:");
    for (const item of result.weakDocs) {
      console.log(`- ${item.actualFile}: ${item.reasons.join(", ")}`);
    }
  }

  console.log("");
  console.log("Next steps:");
  result.recommendations.forEach((recommendation, index) => {
    console.log(`${index + 1}. ${recommendation}`);
  });
}

function printCheck(pass, label) {
  console.log(`${pass ? "✓" : "!"} ${label}`);
}
