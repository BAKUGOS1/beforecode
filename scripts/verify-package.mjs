import { execFileSync } from "node:child_process";

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

execFileSync(npmCommand, ["test"], { stdio: "inherit", shell: true });
execFileSync("node", ["./bin/beforecode.js", "help"], { stdio: "inherit" });
execFileSync("node", ["./bin/beforecode.js", "list"], { stdio: "inherit" });
console.log("Package verification passed.");
