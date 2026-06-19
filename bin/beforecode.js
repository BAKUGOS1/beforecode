#!/usr/bin/env node

import { runCli } from "../src/cli.js";

runCli(process.argv.slice(2)).catch((error) => {
  console.error(`BeforeCode error: ${error.message}`);
  process.exit(1);
});
