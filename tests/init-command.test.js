import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdtempSync, existsSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

test("init creates SaaS docs and config", () => {
  const cwd = mkdtempSync(join(tmpdir(), "beforecode-init-"));

  try {
    const output = execFileSync("node", [process.cwd() + "/bin/beforecode.js", "init", "--type", "saas"], {
      cwd,
      encoding: "utf8"
    });

    assert.match(output, /BeforeCode initialized/);
    assert.ok(existsSync(join(cwd, "docs", "01-project-brief.md")));
    assert.ok(existsSync(join(cwd, "docs", "03-prd.md")));
    assert.ok(existsSync(join(cwd, ".beforecoderc.json")));
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
});

test("dry run does not create files", () => {
  const cwd = mkdtempSync(join(tmpdir(), "beforecode-dry-"));

  try {
    const output = execFileSync("node", [process.cwd() + "/bin/beforecode.js", "init", "--type", "small", "--dry-run"], {
      cwd,
      encoding: "utf8"
    });

    assert.match(output, /dry run/);
    assert.equal(existsSync(join(cwd, "docs")), false);
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
});
