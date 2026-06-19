import { getProjectTypes, getProjectType } from "../data/project-types.js";
import { listTemplates } from "../data/templates.js";

export function listCommand(options) {
  const mode = options._[1] || "all";

  if (mode === "all" || mode === "types") {
    console.log("Project types:");
    for (const type of getProjectTypes()) {
      console.log(`- ${type}: ${getProjectType(type).label}`);
    }
  }

  if (mode === "all") {
    console.log("");
  }

  if (mode === "all" || mode === "templates") {
    console.log("Templates:");
    for (const template of listTemplates()) {
      console.log(`- ${template}`);
    }
  }
}
