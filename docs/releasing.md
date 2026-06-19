# Release Runbook

This runbook covers validation, first publication, and later releases of the BeforeCode npm package.

## Package Identity

The public package name is the unscoped name `beforecode`.

- Install name: `beforecode`
- CLI command: `beforecode`
- Initial npm owner: user `bakugos1`
- Source repository: `BAKUGOS1/beforecode`

The npm organization named `beforecode` does not reserve or own the unscoped package. It is relevant only to scoped package names such as `@beforecode/example`. Do not change `package.json` to `@beforecode/beforecode` unless the project intentionally adopts a scoped package in a future breaking distribution change.

## Release Principles

- `package.json` is the version source of truth.
- Every release must pass tests and packed-install verification.
- Publishing is manual and protected; a normal push to `main` never publishes.
- Public releases should include npm provenance.
- A published package version is immutable and must never be reused.

## Before the First npm Publish

1. Confirm that the exact unscoped package name `beforecode` is available on npm immediately before publishing.
2. Confirm that npm user `bakugos1` will own the first release.
3. Enable two-factor authentication on the `bakugos1` npm account.
4. Create a protected GitHub environment named `npm`.
5. Add required reviewers to that environment.
6. For the first publish, create a granular npm token restricted to the `beforecode` package when npm allows that selection, with the minimum publish permissions and a short expiry.
7. Add the token as the `NPM_TOKEN` secret on the GitHub `npm` environment, not as a repository file or plain repository secret.
8. After the package exists, configure npm trusted publishing for repository `BAKUGOS1/beforecode` and workflow `.github/workflows/release.yml`.
9. Remove the long-lived token when trusted publishing works.

Do not place npm credentials in repository files, command examples, issues, chat messages, screenshots, or workflow logs.

## Validate a Candidate

Run locally:

```bash
npm test
npm run verify:package
npm pack --dry-run
```

The package verification script creates a tarball, checks required files, installs it into a temporary consumer project, runs the installed CLI, and generates a small documentation set.

You can also run the `Release package` workflow with `publish` left disabled. This performs validation without contacting the npm publish endpoint.

## Prepare a Version

1. Choose a semantic version.
2. Update `package.json`.
3. Move relevant notes from `Unreleased` into a dated changelog section.
4. Confirm the CLI reports the same version:

```bash
node ./bin/beforecode.js --version
```

5. Re-run package validation.
6. Commit the release preparation to `main`.

## Publish

1. Open GitHub Actions.
2. Select `Release package`.
3. Run the workflow with `publish` enabled.
4. Approve the protected `npm` environment deployment.
5. Verify the npm package page, version, provenance, files, README, and install command.
6. Install the published package in a clean temporary project.
7. Create a matching Git tag and GitHub release only after npm publication succeeds.

## Post-release Verification

```bash
npm install --save-dev beforecode@<version>
npx beforecode --version
npx beforecode init --type small --dry-run
```

Check that:

- The npm package links to the correct repository.
- Provenance points to the expected workflow and commit.
- The README installation instructions match the published state.
- The changelog and roadmap reflect the release.
- No secret remains that is no longer required.

## Failed Release

Do not retry with the same version if npm accepted the package. Inspect npm before changing anything. If the version was published incorrectly, deprecate it when appropriate, fix the repository, increment the patch version, validate again, and publish the new version.
