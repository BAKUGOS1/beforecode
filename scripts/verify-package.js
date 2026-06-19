import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const nodeCommand = process.execPath;
const workspace = mkdtempSync(join(tmpdir(), "beforecode-package-"));

try {
  const packOutput = execFileSync(
    npmCommand,
    ["pack", "--json", "--ignore-scripts", "--pack-destination", workspace],
    { cwd: packageRoot, encoding: "utf8" }
  );
  const [packResult] = JSON.parse(packOutput);
  const includedFiles = new Set(packResult.files.map((file) => file.path));
  const requiredFiles = [
    "bin/beforecode.js",
    "src/cli.js",
    "src/version.js",
    "templates/project-brief.md",
    "package.json",
    "README.md",
    "LICENSE"
  ];

  for (const file of requiredFiles) {
    if (!includedFiles.has(file)) {
      throw new Error(`Packed package is missing required file: ${file}`);
    }
  }

  const consumer = join(workspace, "consumer");
  writeFileSync(
    join(workspace, "consumer-package.json"),
    JSON.stringify({ name: "beforecode-package-verification", private: true }, null, 2)
  );
  execFileSync(process.execPath, ["-e", `
    const fs = require("node:fs");
    fs.mkdirSync(${JSON.stringify(consumer)}, { recursive: true });
    fs.copyFileSync(${JSON.stringify(join(workspace, "consumer-package.json"))}, ${JSON.stringify(join(consumer, "package.json"))});
  `]);

  const tarball = join(workspace, packResult.filename);
  execFileSync(
    npmCommand,
    ["install", "--ignore-scripts", "--no-audit", "--no-fund", tarball],
    { cwd: consumer, stdio: "pipe" }
  );

  const installedCli = join(consumer, "node_modules", "beforecode", "bin", "beforecode.js");
  const versionOutput = execFileSync(nodeCommand, [installedCli, "--version"], {
    cwd: consumer,
    encoding: "utf8"
  });
  const packageJson = JSON.parse(readFileSync(join(packageRoot, "package.json"), "utf8"));

  if (!versionOutput.includes(packageJson.version)) {
    throw new Error(`Installed CLI reported an unexpected version: ${versionOutput.trim()}`);
  }

  execFileSync(
    nodeCommand,
    [installedCli, "init", "--type", "small", "--name", "Package Test", "--docs", "plan"],
    { cwd: consumer, stdio: "pipe" }
  );

  if (!existsSync(join(consumer, "plan", "01-project-brief.md"))) {
    throw new Error("Installed CLI did not generate the expected project brief");
  }

  if (!existsSync(join(consumer, ".beforecoderc.json"))) {
    throw new Error("Installed CLI did not generate its configuration file");
  }

  console.log(`Verified ${packResult.filename}`);
  console.log(`Packed files: ${packResult.entryCount}`);
  console.log(`Package size: ${packResult.size} bytes`);
} finally {
  rmSync(workspace, { recursive: true, force: true });
}
