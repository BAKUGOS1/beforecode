import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, existsSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

test("add creates one template and check reports readiness", () => {
  const cwd = mkdtempSync(join(tmpdir(), "beforecode-add-"));

  try {
    execFileSync("node", [process.cwd() + "/bin/beforecode.js", "add", "prd"], {
      cwd,
      encoding: "utf8"
    });

    assert.ok(existsSync(join(cwd, "docs", "prd.md")));

    const check = execFileSync("node", [process.cwd() + "/bin/beforecode.js", "check", "--type", "small"], {
      cwd,
      encoding: "utf8"
    });

    assert.match(check, /prd.md/);
    assert.match(check, /Readiness:/);

    const score = execFileSync("node", [process.cwd() + "/bin/beforecode.js", "score", "--type", "small"], {
      cwd,
      encoding: "utf8"
    });

    assert.match(score, /Overall:/);
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
});

test("handoff creates AGENTS.md", () => {
  const cwd = mkdtempSync(join(tmpdir(), "beforecode-handoff-"));

  try {
    execFileSync("node", [process.cwd() + "/bin/beforecode.js", "handoff", "--name", "Demo"], {
      cwd,
      encoding: "utf8"
    });

    assert.ok(existsSync(join(cwd, "AGENTS.md")));
    assert.ok(existsSync(join(cwd, "docs", "ai-handoff.md")));
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
});
