import { parseArgs } from "./args.js";
import { getProjectTypes } from "./data/project-types.js";
import { startCommand } from "./commands/start.js";
import { initCommand } from "./commands/init.js";
import { addCommand } from "./commands/add.js";
import { checkCommand } from "./commands/check.js";
import { scoreCommand } from "./commands/score.js";
import { doctorCommand } from "./commands/doctor.js";
import { handoffCommand } from "./commands/handoff.js";
import { listCommand } from "./commands/list.js";

const VERSION = "0.2.0";

export async function runCli(argv, context = { cwd: process.cwd() }) {
  const options = parseArgs(argv);
  const command = options._[0] || "help";

  if (options.version || command === "version") {
    return printVersion();
  }

  if (options.help || command === "help") {
    return printHelp();
  }

  if (command === "start") return startCommand(options, context);
  if (command === "init") return initCommand(options, context);
  if (command === "add") return addCommand(options, context);
  if (command === "check") return checkCommand(options, context);
  if (command === "score") return scoreCommand(options, context);
  if (command === "doctor") return doctorCommand(options, context);
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
  beforecode start
  beforecode start --from idea.md
  beforecode start --idea "CRM for small teams" --type saas
  beforecode init --type saas
  beforecode add prd
  beforecode check --type saas
  beforecode score --type saas
  beforecode doctor --type saas
  beforecode handoff
  beforecode list

Options:
  --type <type>       Project type
  --docs <path>       Documentation folder
  --name <name>       Project name
  --from <file>       Read project idea/context from a Markdown file
  --idea <text>       Provide idea text without interactive prompts
  --features <list>   Comma-separated MVP features
  --users <list>      Comma-separated target users
  --force             Replace existing generated files
  --dry-run           Preview changes without writing files
  --version           Show version

Project types:
  ${getProjectTypes().join(", ")}
`);
}
