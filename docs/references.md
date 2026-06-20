# References

This page lists the external standards, official docs, and reference material used to guide BeforeCode's CLI, documentation, release process, and repository workflow.

BeforeCode does not require these resources to use the CLI. They are included so contributors can understand the decisions behind the project and keep future changes aligned with established practices.

## Package and Release References

| Area | Reference | Why it matters |
|---|---|---|
| npm package publishing | [Creating and publishing unscoped public packages](https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages/) | Defines how public unscoped packages such as `beforecode` are published. |
| npm provenance | [Generating provenance statements](https://docs.npmjs.com/generating-provenance-statements/) | Guides supply-chain metadata for packages published from CI. |
| npm trusted publishing | [Trusted publishing for npm packages](https://docs.npmjs.com/trusted-publishers/) | Recommended future release path to avoid long-lived npm tokens. |
| Semantic versioning | [Semantic Versioning 2.0.0](https://semver.org/) | Versioning model for published releases and breaking changes. |
| Changelog format | [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) | Structure for readable release history. |

## GitHub and Automation References

| Area | Reference | Why it matters |
|---|---|---|
| Workflow syntax | [GitHub Actions workflow syntax](https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax) | Source of truth for CI and manual release workflow configuration. |
| Manual workflow runs | [Triggering a workflow](https://docs.github.com/en/actions/how-tos/writing-workflows/choosing-when-your-workflow-runs/triggering-a-workflow) | Used for the protected manual release workflow. |
| Workflow secrets | [Using secrets in GitHub Actions](https://docs.github.com/en/actions/how-tos/writing-workflows/choosing-what-your-workflow-does/using-secrets-in-github-actions) | Guides safe handling of npm tokens and other credentials. |

## Documentation and Diagram References

| Area | Reference | Why it matters |
|---|---|---|
| Markdown syntax | [Markdown Guide basic syntax](https://www.markdownguide.org/basic-syntax/) | Baseline syntax for portable Markdown templates. |
| Mermaid diagrams | [Mermaid flowchart syntax](https://mermaid.js.org/syntax/flowchart.html) | Used for editable workflow and dependency diagrams in Markdown. |
| Markdown linting | [markdownlint rules](https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md) | Keeps repository documentation consistent and CI-friendly. |

## Security and Quality References

| Area | Reference | Why it matters |
|---|---|---|
| Application security review | [OWASP ASVS](https://owasp.org/www-project-application-security-verification-standard/) | Useful reference when teams expand security requirements and QA checklists. |
| npm package security | [npm audit reports](https://docs.npmjs.com/about-audit-reports/) | Reference for dependency and package security review. |
| GitHub security policy | [Adding a security policy](https://docs.github.com/en/code-security/getting-started/adding-a-security-policy-to-your-repository) | Helps contributors report issues responsibly. |

## BeforeCode-Specific Usage

Use these references when changing:

- `package.json`, release workflow, npm publishing, or provenance behavior.
- Markdown templates, examples, checklists, or README diagrams.
- CLI commands that generate docs or affect AI handoff files.
- Release notes, changelog entries, and version bumps.
- Security, QA, and launch-readiness documents.

If a reference conflicts with actual repository behavior, update the implementation first or document the reason for the exception.
