# Agent Git Rules

## Document Relations

- Parent index: `docs/agent-workflow/README.md`
- Primary detailed references:
  - `docs/agent-workflow/git-collaboration-convention.md`
  - `docs/agent-workflow/agent-commit-and-push-workflow.md`
- Related template reference: `docs/agent-workflow/templates.md`
- If branch, commit, push, or PR rules change here, update the detailed primary docs and template reference together.

## Repository Git Model

- Single remote `origin`. Default branch is `main`.
- Standard work happens on feature branches off `main`, merged back through a PR targeting `main`.
- There is no fork/upstream split and no long-lived `develop` branch in this repository.

## Git Startup Checklist

- Check whether an existing open GitHub issue already matches the requested work, or note when GitHub issue lookup is unavailable.
- After the GitHub issue check, search for the matching management document under `docs/issues/` and `docs/issues/sub-issues/`.
- Before any file edit, file creation, file move, or file deletion, re-run the management-document check from `AGENTS.md` and `docs/agent-workflow/documentation-rules.md`.
- Do not skip that check because the change looks small or simple.
- Confirm the current branch matches the intended work.
- Confirm the changed files match the requested scope.
- Read the linked detailed primary docs before commit, push, or PR work.

## Branch Rules

- Use `issue-number-type-short-description` for standard work branches.
- Use placeholders such as `<issue-number>-type-short-description` until the real issue number exists.
- Create standard work branches from the latest `main`.
- Keep repository structure changes, such as top-level directory renames or shared module moves, in their own branch and PR before stacking feature work on that layout.
- If feature work was started on an unmerged structure-change branch, reapply the needed feature commits onto the updated `main` baseline instead of continuing to extend the mixed branch.
- Keep `release/*` and `hotfix/*` as separate exception branches when that workflow is explicitly needed.

## Commit Rules

- Before any commit, update the management document that matches the work.
- Treat a missing management-document update as a workflow error even for one-line or quick fixes.
- Use repository-relative paths in commit messages, logs, and workflow documents when referencing repository files or directories.
- Use the repository commit message format from the collaboration convention.
- On Windows, prefer `git commit -F <message-file>` over inline multi-line `git commit -m`.
- Do not finalize issue numbers in commit messages before GitHub has assigned them.

## Push And PR Rules

- Verify the remote and target branch before push or PR preparation.
- Do not push directly to `main`.
- Push feature branches to `origin` and open a PR targeting `main`.
- Keep PR title and body aligned with repository templates.
- Keep placeholder issue numbers until the real issue number exists.
- Create a draft PR once the branch is ready for its first pushable checkpoint, then keep the draft PR body aligned with the management document as work continues.
