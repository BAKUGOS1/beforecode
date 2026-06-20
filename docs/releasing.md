# Release Runbook

## Before npm publish

1. Verify package name and owner.
2. Run `npm test`.
3. Run `npm pack --dry-run`.
4. Install packed tarball in a temporary project.
5. Run CLI smoke tests.
6. Publish manually from a protected GitHub workflow or trusted environment.

Never share npm tokens in chat.
