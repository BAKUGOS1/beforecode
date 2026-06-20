import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";

test("help command prints usage", () => {
  const output = execFileSync("node", ["./bin/beforecode.js", "help"], { encoding: "utf8" });
  assert.match(output, /BeforeCode CLI/);
  assert.match(output, /beforecode init --type saas/);
  assert.match(output, /beforecode doctor --type saas/);
});

test("list command prints project types", () => {
  const output = execFileSync("node", ["./bin/beforecode.js", "list"], { encoding: "utf8" });
  assert.match(output, /Project types:/);
  assert.match(output, /saas/);
  assert.match(output, /Templates:/);
});
