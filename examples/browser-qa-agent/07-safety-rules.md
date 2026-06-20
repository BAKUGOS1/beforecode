# Safety Rules

## Source Context

The Browser QA Agent must be useful without becoming dangerous. The default mode is non-destructive and scoped.

## Allowed by Default

- Navigate approved target URL.
- Use approved test account sign-in instructions.
- Create temporary test records when the workflow requires it.
- Edit temporary or explicitly approved records.
- Archive and restore test records if approved.
- Capture screenshots and browser errors.
- Generate Markdown and JSON reports.

## Blocked by Default

- Permanent deletion.
- Payment submission.
- Production email or SMS sending.
- Accessing unrelated accounts or organizations.
- Bypassing sign-in or permissions.
- Exporting sensitive production data.
- Crawling all routes without a test scope.
- Running against production unless explicitly approved.

## Stop Conditions

The agent must stop when:

- Sign-in fails.
- Test scope is unclear.
- A workflow requires a destructive action not in allowed actions.
- The app displays sensitive data that should not be captured.
- The target environment appears to be production and production testing is not approved.
- Required selector or page state cannot be found after retries.

## Privacy Rules

- Do not print secret values into logs or reports.
- Mask sensitive values in report summaries where possible.
- Do not store screenshots outside the configured output folder.
- Do not upload evidence to external services by default.

## Human Review Requirements

Human review is required before:

- enabling destructive actions
- running against production
- exporting data
- testing payment flows
- testing notification sending
- expanding route discovery beyond approved scope

## Safe Default Policy

When uncertain, mark the issue as `needs-review` and continue only if the next step is safe. Otherwise stop the run and explain the blocker.
