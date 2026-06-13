# Agent Git Collaboration Convention

## Document Relations

- Parent index: `docs/agent-workflow/README.md`
- Related entry point: `AGENTS.md`
- Related git execution guide: `docs/agent-workflow/agent-commit-and-push-workflow.md`
- Related documentation rules: `docs/agent-workflow/documentation-rules.md`
- Related templates: `docs/agent-workflow/templates.md`
- If branch, issue, commit, PR, or placeholder rules change here, update the execution guide, documentation rules, and templates in the same change.

## Purpose

- Define the repository-wide rules for issues, branches, commits, pushes, and pull requests.
- Keep agent-facing git rules in `docs/agent-workflow/` as the primary source of truth.

## Repository Git Model

- Single remote `origin`. Default branch `main`.
- Feature branches are created from `main` and merged back via PR targeting `main`.
- No fork/upstream split and no long-lived `develop` branch.

## Issue Rules

- Treat one GitHub issue as one task or scoped work item.
- Start implementation from an issue whenever that workflow is available.
- When a user requests work, first check whether a reusable live issue already matches the task.
- Existing issue checks should prioritize open issues.
- If GitHub issue lookup is unavailable, say so briefly and continue with the local management-document search instead of guessing.
- Reuse an existing issue only when the title, goal, done criteria, related documents, and branch context show that it is materially the same work item.
- Do not reuse an issue just because the title is similar.
- If separate tracking would make the issue, management document, or PR clearer, prefer creating a new issue.
- If a reusable live issue exists, use that real issue number for the branch name, management document, and commit or PR drafts.
- If no suitable issue exists, try creating a new issue with `gh issue create`.
- If issue creation is unavailable, say so and prepare an issue title and body draft that can be posted immediately.
- If the issue match is ambiguous, do not create a new issue by guesswork. Report the candidate issues and your reasoning to the user briefly.
- Do not guess a GitHub issue number before the issue or PR exists.
- Use `#<issue-number>` as the placeholder in drafts until GitHub assigns the real number.

## Issue Title Format

```text
[TYPE] Short work summary
```

## Issue Types

| Type | Description |
| --- | --- |
| feature | New feature work |
| fix | Bug fix |
| refactor | Internal structure improvement |
| docs | Documentation work |
| test | Test work |
| chore | Setup, environment, or maintenance work |
| ci | CI/CD work |
| perf | Performance work |

## Issue Description Template

```text
## Goal
Explain why this work is needed.

## Scope
- Item to implement or fix
- Main behavior or code changes

## Done Criteria
- Conditions that mark the work complete

## References
Related links or documents
```

## Branch Rules

- Standard work branches use `issue-number-type-short-description`.
- Until the real issue number exists, use `<issue-number>-type-short-description`.
- Create standard work branches from `main`.
- Before creating or extending a feature branch, fetch the latest `main` and confirm the branch base includes any recently merged repository-structure changes.
- Keep `release/*` and `hotfix/*` branches as exception flows from `main` when explicitly needed.
- Once a real issue number exists, rename any placeholder draft branch or draft document to the real issue branch name.

## Repository Structure Change Rules

- Treat repository structure changes as their own work unit before feature development when they rename, move, archive, remove, or split top-level project directories or shared module boundaries.
- Merge the structure-change branch into `main` first through the normal PR flow.
- Do not keep building feature work on top of an unmerged structure-change branch unless the task is explicitly a short-lived experiment.
- After the structure-change PR merges, fetch the updated `main` and create or realign feature branches on top of that merged baseline.
- If feature work has already accumulated on the structure-change branch, stop extending that branch and reapply only the needed feature commits onto the updated `main` baseline.
- Do not reset `main` to a feature branch in order to publish accumulated work.

## Branch Examples

```text
1-chore-bootstrap-slide-studio
3-feature-session-router
12-fix-export-font-embed
release/1.0.0
hotfix/15-broken-asset-path
```

## Management Document Rules

- Create or update one issue management document per issue-tracked work item.
- After the GitHub issue check, search for an existing matching management document under `docs/issues/` and `docs/issues/sub-issues/` before creating a new one.
- When resuming existing work, prefer the already-matching management document as the primary local tracking context.
- Re-run that management-document check immediately before any file edit, file creation, file move, or file deletion.
- Do not create exceptions for "small task", "simple fix", "one-line change", or similar labels.
- Place the document under an issue-type directory such as `docs/issues/feature/`, `fix/`, `refactor/`, `docs/`, or `chore/`. Use `docs/issues/sub-issues/` for scoped child tasks under a broader tracked issue.
- Use the issue branch name as the file name.
- Keep the issue title, issue number, branch name, directory type, and management document file name aligned.
- Use repository-relative paths in workflow docs and management documents, not absolute local filesystem paths.

## Commit Rules

- Before any commit, read this document and `docs/agent-workflow/agent-commit-and-push-workflow.md`.
- Before any commit, update the management document that matches the work.
- Treat the management-document update as required for commit-sized work regardless of implementation size.
- Use the commit message format below.
- Keep placeholder issue numbers until the real issue number exists.
- Use the commit title as the `##` heading of the corresponding work-log entry in the management document.
- Keep only the `##` work-log heading mandatory. Add lower headings only when they help readability.

## Commit Message Format

```text
type: short summary (#<issue-number>)

- change item 1
- change item 2
- change item 3
```

## Commit Types

| Type | Description |
| --- | --- |
| feat | New feature |
| fix | Bug fix |
| docs | Documentation changes |
| style | Formatting-only change |
| refactor | Internal code change without behavior change |
| perf | Performance improvement |
| test | Test changes |
| build | Build configuration change |
| ci | CI configuration change |
| chore | Maintenance work |
| revert | Revert of a prior commit |
| repo | Repository structure changes (archiving, moving, removing directories) |

## Pull Request Rules

- Standard work PRs target `main`.
- `release/*` and `hotfix/*` PRs target `main` when that workflow is explicitly needed.
- Use the PR title format below.
- Keep placeholder issue numbers in PR drafts until the real issue number exists.
- Open a draft PR once the branch reaches the first pushable checkpoint.
- Keep the PR title and body aligned with the issue and management document.

## PR Title Format

```text
[TYPE] Short work summary (#<issue-number>)
```

## PR Description Template

```text
## Related Issue
Closes #<issue-number>

## Work Summary
- Main implementation or fixes
- Important changes

## Change Details
- Structure or module changes
- API or behavior changes

## Test Method
1. How to run
2. What scenario was checked

## Screenshots / Results
Optional
```

## Collaboration Workflow

1. Check whether an existing open issue already matches the requested work.
2. If GitHub issue lookup is unavailable, note that constraint and continue without guessing issue numbers.
3. Search for an existing matching management document under `docs/issues/` and `docs/issues/sub-issues/`.
4. Reuse the issue and management document only when they clearly describe the same work item. Otherwise create a new issue with `gh issue create` when available.
5. Create or update the issue management document under the matching issue-type directory.
6. Create the work branch from `main`.
7. If the work depends on repository structure changes, merge those structure changes first, fetch the updated `main`, then start or realign the feature branch from that baseline.
8. Do the local work on that branch.
9. Update the matching management document before each commit.
10. Commit with the repository commit format and log that commit in the management document.
11. Push the current branch to `origin` once it reaches the first meaningful checkpoint.
12. Open a draft PR from `origin/<current-branch>` to `main`.
13. Keep the draft PR body updated as commits and management-document logs accumulate.
14. Sync the branch with the latest `main` before final review and merge.
15. Address review comments and merge with the agreed method.

## Merge Rules

- Require review before merge when the repository workflow uses PR review.
- Prefer squash merge unless the task explicitly needs another merge strategy.
- Remove the merged work branch when it is no longer needed.

## Forbidden Actions

- Do not push directly to `main`.
- Do not bypass PR-based merge flow when the repository expects a PR.
- Do not use force-push unless the workflow explicitly allows it.
