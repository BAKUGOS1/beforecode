export const TEMPLATE_FILES = {
  "project-brief": "project-brief.md",
  "research-report": "research-report.md",
  "business-requirements": "business-requirements.md",
  prd: "prd.md",
  srs: "srs.md",
  "release-scope": "release-scope.md",
  "ux-flows": "ux-flows.md",
  "ui-system": "ui-system.md",
  "permission-matrix": "permission-matrix.md",
  trd: "trd.md",
  "database-schema": "database-schema.md",
  "api-documentation": "api-documentation.md",
  "decision-record": "decision-record.md",
  "implementation-plan": "implementation-plan.md",
  "build-plan": "build-plan.md",
  "qa-test-plan": "qa-test-plan.md",
  "deployment-plan": "deployment-plan.md"
};

export function getTemplateFile(name) {
  return TEMPLATE_FILES[name] || null;
}

export function listTemplates() {
  return Object.keys(TEMPLATE_FILES).sort();
}
