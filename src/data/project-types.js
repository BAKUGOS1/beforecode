export const PROJECT_TYPES = {
  small: {
    label: "Small app",
    documents: ["project-brief", "prd", "build-plan", "qa-test-plan"]
  },
  portfolio: {
    label: "Portfolio",
    documents: ["project-brief", "ux-flows", "ui-system", "build-plan", "qa-test-plan"]
  },
  saas: {
    label: "SaaS product",
    documents: [
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
    ]
  },
  crm: {
    label: "CRM or operations system",
    documents: [
      "business-requirements",
      "research-report",
      "prd",
      "srs",
      "permission-matrix",
      "database-schema",
      "api-documentation",
      "qa-test-plan",
      "implementation-plan"
    ]
  },
  ecommerce: {
    label: "E-commerce or marketplace",
    documents: [
      "project-brief",
      "research-report",
      "business-requirements",
      "prd",
      "ux-flows",
      "trd",
      "database-schema",
      "api-documentation",
      "permission-matrix",
      "qa-test-plan",
      "deployment-plan"
    ]
  },
  mobile: {
    label: "Mobile app",
    documents: [
      "project-brief",
      "prd",
      "ux-flows",
      "api-documentation",
      "permission-matrix",
      "qa-test-plan",
      "implementation-plan",
      "deployment-plan"
    ]
  },
  "ai-agent": {
    label: "AI agent",
    documents: [
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
    ]
  },
  opensource: {
    label: "Open-source tool",
    documents: ["project-brief", "prd", "trd", "build-plan", "qa-test-plan", "deployment-plan"]
  }
};

export function getProjectType(type) {
  return PROJECT_TYPES[type] || null;
}

export function getProjectDocs(type) {
  return getProjectType(type)?.documents || null;
}

export function getProjectTypes() {
  return Object.keys(PROJECT_TYPES);
}
