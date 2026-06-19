import { access, copyFile, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname } from "node:path";

export async function ensureDir(path) {
  await mkdir(path, { recursive: true });
}

export async function exists(path) {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

export async function readText(path) {
  return readFile(path, "utf8");
}

export async function readDirSafe(path) {
  try {
    return await readdir(path);
  } catch {
    return [];
  }
}

export async function writeText(path, content, { force = false } = {}) {
  if (!force && await exists(path)) {
    return { written: false, skipped: true, path };
  }

  await ensureDir(dirname(path));
  await writeFile(path, content, "utf8");
  return { written: true, skipped: false, path };
}

export async function copyFileSafe(source, target, { force = false } = {}) {
  if (!force && await exists(target)) {
    return { copied: false, skipped: true, target };
  }

  await ensureDir(dirname(target));
  await copyFile(source, target);
  return { copied: true, skipped: false, target };
}
