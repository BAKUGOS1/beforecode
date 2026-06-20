import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, existsSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

const cli = process.cwd() + "/bin/beforecode.js";

test("add creates one template and check reports readiness", () => {
  const cwd = mkdtempSync(join(tmpdir(), "beforecode-add-"));

  try {
    execFileSync("node", [cli, "add", "prd"], {
      cwd,
      encoding: "utf8"
    });

    assert.ok(existsSync(join(cwd, "docs", "prd.md")));

    const check = execFileSync("node", [cli, "check", "--type", "small"], {
      cwd,
      encoding: "utf8"
    });

    assert.match(check, /prd.md/);
    assert.match(check, /Readiness:/);

    const score = execFileSync("node", [cli, "score", "--type", "small"], {
      cwd,
      encoding: "utf8"
    });

    assert.match(score, /Overall:/);
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
});

test("doctor reports missing and weak docs", () => {
  const cwd = mkdtempSync(join(tmpdir(), "beforecode-doctor-"));

  try {
    execFileSync("node", [cli, "init", "--type", "small", "--name", "Doctor Demo"], {
      cwd,
      encoding: "utf8"
    });

    writeFileSync(join(cwd, "docs", "01-project-brief.md"), "# Project Brief\n\nTBD\n", "utf8");

    const output = execFileSync("node", [cli, "doctor"], {
      cwd,
      encoding: "utf8"
    });

    assert.match(output, /BeforeCode doctor:/);
    assert.match(output, /Health:/);
    assert.match(output, /Docs needing attention:/);
    assert.match(output, /01-project-brief.md/);
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
});

test("handoff creates AGENTS.md", () => {
  const cwd = mkdtempSync(join(tmpdir(), "beforecode-handoff-"));

  try {
    execFileSync("node", [cli, "handoff", "--name", "Demo"], {
      cwd,
      encoding: "utf8"
    });

    assert.ok(existsSync(join(cwd, "AGENTS.md")));
    assert.ok(existsSync(join(cwd, "docs", "ai-handoff.md")));
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
});
