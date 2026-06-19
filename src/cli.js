import { parseArgs } from "./args.js";
import { getProjectTypes } from "./data/project-types.js";
import { initCommand } from "./commands/init.js";
import { addCommand } from "./commands/add.js";
import { checkCommand } from "./commands/check.js";
import { scoreCommand } from "./commands/score.js";
import { handoffCommand } from "./commands/handoff.js";
import { listCommand } from "./commands/list.js";

const VERSION = "0.1.0";

export async function runCli(argv, context = { cwd: process.cwd() }) {
  const options = parseArgs(argv);
  const command = options._[0] || "help";

  if (options.version || command === "version") {
    return printVersion();
  }

  if (options.help || command === "help") {
    return printHelp();
  }

  if (command === "init") return initCommand(options, context);
  if (command === "add") return addCommand(options, context);
  if (command === "check") return checkCommand(options, context);
  if (command === "score") return scoreCommand(options, context);
  if (command === "handoff") return handoffCommand(options, context);
  if (command === "list") return listCommand(options, context);

  throw new Error(`Unknown command: ${command}`);
}

function printVersion() {
  console.log(`beforecode ${VERSION}`);
}

function printHelp() {
  console.log(`BeforeCode CLI

Usage:
  beforecode init --type saas
  beforecode init --type ai-agent --docs project-docs
  beforecode add prd
  beforecode check --type saas
  beforecode score --type saas
  beforecode handoff
  beforecode list

Options:
  --type <type>       Project type
  --docs <path>       Documentation folder
  --name <name>       Project name
  --force             Replace existing generated files
  --dry-run           Preview changes without writing files
  --version           Show version

Project types:
  ${getProjectTypes().join(", ")}
`);
}
