import { readFileSync } from "node:fs";

const packageJsonUrl = new URL("../package.json", import.meta.url);
const packageJson = JSON.parse(readFileSync(packageJsonUrl, "utf8"));

export const VERSION = packageJson.version;
