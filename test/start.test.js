import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { runCli } from "../src/cli.js";

async function withTempProject(fn) {
  const cwd = await mkdtemp(join(tmpdir(), "beforecode-"));
  try {
    await fn(cwd);
  } finally {
    await rm(cwd, { recursive: true, force: true });
  }
}

test("start creates context-first docs from inline context", async () => {
  await withTempProject(async (cwd) => {
    await runCli([
      "start",
      "--name",
      "Client Portal",
      "--type",
      "saas",
      "--idea",
      "Client portal for service businesses",
      "--problem",
      "Clients need one place to track work",
      "--users",
      "admins, clients",
      "--features",
      "login, dashboard, messages"
    ], { cwd });

    const context = await readFile(join(cwd, "docs", "00-project-context.md"), "utf8");
    const questions = await readFile(join(cwd, "docs", "01-open-questions.md"), "utf8");
    const prd = await readFile(join(cwd, "docs", "05-prd.md"), "utf8");
    const config = JSON.parse(await readFile(join(cwd, ".beforecoderc.json"), "utf8"));

    assert.match(context, /Client Portal/);
    assert.match(context, /Client portal for service businesses/);
    assert.match(questions, /Open Questions/);
    assert.match(prd, /Client portal for service businesses/);
    assert.equal(config.workflow, "context-first");
  });
});

test("start can read context from an idea file", async () => {
  await withTempProject(async (cwd) => {
    await writeFile(join(cwd, "idea.md"), "Build a CRM for small teams that tracks leads and follow-ups.", "utf8");

    await runCli(["start", "--from", "idea.md", "--name", "LeadDesk"], { cwd });

    const context = await readFile(join(cwd, "docs", "00-project-context.md"), "utf8");
    assert.match(context, /LeadDesk/);
    assert.match(context, /tracks leads and follow-ups/);
  });
});
