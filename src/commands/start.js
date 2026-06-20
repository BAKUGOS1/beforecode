import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { relative } from "node:path";
import { resolveOptions } from "../core/config.js";
import { contextFromIdeaFile, normalizeContext } from "../core/context.js";
import { createPlanningWorkspace } from "../core/workspace.js";

export async function startCommand(options, context) {
  const resolved = await resolveOptions(options, context.cwd);
  const projectContext = await resolveProjectContext(options, context.cwd, resolved);

  const result = await createPlanningWorkspace({
    cwd: context.cwd,
    docsPath: resolved.docsPath,
    force: resolved.force,
    dryRun: resolved.dryRun,
    context: projectContext
  });

  if (result.dryRun) {
    console.log("BeforeCode dry run: context-first workspace");
    for (const item of result.planned) {
      console.log(`would create ${relative(context.cwd, item.target)}`);
    }
    return;
  }

  console.log("BeforeCode context captured");
  console.log(`Project: ${result.context.projectName}`);
  console.log(`Project type: ${result.context.projectType}`);
  console.log(`Docs path: ${result.docsPath}`);
  console.log(`Created: ${result.created.length}`);
  console.log(`Skipped: ${result.skipped.length}`);
  console.log("");
  console.log("Next steps:");
  console.log("1. Review docs/00-project-context.md");
  console.log("2. Answer docs/01-open-questions.md");
  console.log("3. Run npx beforecode score");
  console.log("4. Run npx beforecode handoff");
}

async function resolveProjectContext(options, cwd, resolved) {
  if (options.from) {
    return contextFromIdeaFile({ cwd, filePath: options.from, options });
  }

  const inlineContext = normalizeContext({
    projectName: options.name || resolved.projectName,
    projectType: options.type,
    rawIdea: options.idea,
    problem: options.problem,
    targetUsers: options.users,
    mvpFeatures: options.features,
    outOfScope: options.out,
    techPreferences: options.tech,
    aiBuildMode: options.ai,
    deadline: options.deadline
  });

  if (hasUsefulInlineContext(options)) {
    return inlineContext;
  }

  if (!input.isTTY) {
    throw new Error("beforecode start needs an interactive terminal. Use --from idea.md or pass --idea.");
  }

  return promptForContext(inlineContext);
}

function hasUsefulInlineContext(options) {
  return Boolean(options.idea || options.problem || options.users || options.features || options.tech || options.from);
}

async function promptForContext(defaults) {
  const rl = createInterface({ input, output });

  try {
    console.log("BeforeCode start");
    console.log("Let's capture your project context before generating docs.");
    console.log("");

    const projectName = await ask(rl, "Project name", defaults.projectName);
    const rawIdea = await ask(rl, "What are you building?", defaults.rawIdea);
    const targetUsers = await ask(rl, "Who is it for?", defaults.targetUsers.join(", "));
    const problem = await ask(rl, "What problem does it solve?", defaults.problem);
    const projectType = await ask(rl, "Project type", defaults.projectType);
    const mvpFeatures = await ask(rl, "Must-have MVP features, comma separated", defaults.mvpFeatures.join(", "));
    const outOfScope = await ask(rl, "Out of scope for v1, comma separated", defaults.outOfScope.join(", "));
    const techPreferences = await ask(rl, "Tech preferences, comma separated", defaults.techPreferences.join(", "));
    const aiBuildMode = await ask(rl, "Will an AI coding agent build this?", defaults.aiBuildMode);
    const deadline = await ask(rl, "Deadline or launch target", defaults.deadline);

    return normalizeContext({
      projectName,
      rawIdea,
      targetUsers,
      problem,
      projectType,
      mvpFeatures,
      outOfScope,
      techPreferences,
      aiBuildMode,
      deadline
    });
  } finally {
    rl.close();
  }
}

async function ask(rl, label, defaultValue) {
  const value = await rl.question(`${label}${defaultValue && defaultValue !== "TBD" ? ` [${defaultValue}]` : ""}: `);
  return value.trim() || defaultValue;
}
