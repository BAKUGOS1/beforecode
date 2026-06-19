export const PROJECT_TYPES = {
  small: ["project-brief", "prd", "build-plan", "qa-test-plan"],
  portfolio: ["project-brief", "ux-flows", "ui-system", "build-plan", "qa-test-plan"],
  saas: [
    "project-brief",
    "research-report",
    "prd",
    "ux-flows",
    "trd",
    "database-schema",
    "api-documentation",
    "permission-matrix",
    "qa-test-plan",
    "implementation-plan",
    "deployment-plan"
  ],
  crm: [
    "business-requirements",
    "research-report",
    "prd",
    "srs",
    "permission-matrix",
    "database-schema",
    "api-documentation",
    "qa-test-plan",
    "implementation-plan"
  ],
  "ai-agent": [
    "project-brief",
    "research-report",
    "prd",
    "trd",
    "database-schema",
    "api-documentation",
    "permission-matrix",
    "qa-test-plan",
    "implementation-plan",
    "deployment-plan"
  ],
  opensource: ["project-brief", "prd", "trd", "build-plan", "qa-test-plan", "deployment-plan"]
};

export function getProjectDocs(type) {
  return PROJECT_TYPES[type] || null;
}

export function getProjectTypes() {
  return Object.keys(PROJECT_TYPES);
}
