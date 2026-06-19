import { checkProject } from "./checker.js";

const CATEGORIES = {
  product: ["project-brief.md", "research-report.md", "business-requirements.md", "prd.md", "srs.md"],
  experience: ["ux-flows.md", "ui-system.md", "permission-matrix.md"],
  engineering: ["trd.md", "database-schema.md", "api-documentation.md"],
  quality: ["qa-test-plan.md"],
  delivery: ["implementation-plan.md", "build-plan.md", "deployment-plan.md"]
};

export async function scoreProject(options) {
  const check = await checkProject(options);
  const categories = {};

  for (const [name, files] of Object.entries(CATEGORIES)) {
    const relevant = check.results.filter((item) => files.includes(item.file));

    if (!relevant.length) {
      continue;
    }

    const present = relevant.filter((item) => item.found).length;
    categories[name] = Math.round((present / relevant.length) * 100);
  }

  return {
    ...check,
    categories
  };
}
