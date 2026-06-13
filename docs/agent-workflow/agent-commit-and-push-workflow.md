# Agent Commit And Push Workflow

## Document Relations

- Parent index: `docs/agent-workflow/README.md`
- Related entry point: `AGENTS.md`
- Related collaboration convention: `docs/agent-workflow/git-collaboration-convention.md`
- Related documentation rules: `docs/agent-workflow/documentation-rules.md`
- Related templates: `docs/agent-workflow/templates.md`
- If commit, push, PR, or management-document execution steps change here, update the collaboration convention, documentation rules, and templates in the same change.

## Purpose

- Describe the concrete execution order agents should follow before issue creation, commit, push, and PR preparation.
- Keep the step-by-step git execution workflow in `docs/agent-workflow/` as the primary source of truth.

## Startup Sequence

1. Read `docs/agent-workflow/git-collaboration-convention.md`.
2. Read `docs/agent-workflow/git-rules.md`.
3. Read `docs/agent-workflow/documentation-rules.md`.
4. Read this document.
5. Confirm the current branch, changed files, and recent commit format match the requested scope.
6. Immediately before any file edit, creation, move, or deletion, re-run the management-document check instead of relying only on startup reads.

## Issue Discovery And Creation

1. Check whether an existing open GitHub issue already matches the requested work.
2. If GitHub issue lookup is unavailable, say so briefly and continue with local management-document discovery.
3. Compare the candidate issue title, goal, done criteria, related documents, and branch context against the current task.
4. Reuse the issue only when it is clearly the same work item.
5. Do not reuse an issue only because the title is similar.
6. If separate tracking would be clearer, create a new issue.
7. If no suitable issue exists, try creating a new issue with `gh issue create`.
8. If issue creation is unavailable, say so and prepare an issue title and body draft that can be posted immediately.
9. If issue matching is ambiguous, report the candidate issues and your reasoning to the user instead of creating a new issue by guesswork.

## Management Document Setup

1. After the GitHub issue check, search for an existing matching management document under `docs/issues/` and `docs/issues/sub-issues/`.
2. When resuming or continuing work, prefer the existing matching management document before creating a new one.
3. Re-check that matching document immediately before any file edit, file creation, file move, or file deletion.
4. Do not skip that re-check because the change looks small, simple, or quick.
5. Once an issue number is confirmed, create or update the management document named after the issue branch.
6. Place the file under the matching issue-type directory, such as `docs/issues/feature/`, `fix/`, `refactor/`, `docs/`, or `chore/`. Use `docs/issues/sub-issues/` for scoped child tasks under a broader tracked issue.
7. Use the issue branch name as the file name.
8. Keep the issue title, issue number, branch name, directory type, and management document file name aligned.
9. If a placeholder management document exists, rename or update it once the real issue number is known.
10. Use repository-relative paths in management documents so local workspace path changes do not invalidate the workflow.

## Base Branch And Structure Changes

1. Before starting or extending feature work, fetch the latest `main`.
2. If the work depends on repository structure changes, finish and merge the structure-change PR first.
3. After that PR merges, fetch the updated `main` and create or realign the feature branch from that merged baseline.
4. Do not keep stacking feature commits on an unmerged structure-change branch except for an explicitly short-lived experiment.
5. If feature commits already accumulated on the structure-change branch, reapply only the needed feature commits onto the updated `main` baseline.
6. Do not reset or directly push `main` to publish accumulated feature work.

## Commit Message Rules

- Follow the repository commit format from `docs/agent-workflow/git-collaboration-convention.md`.
- Use a placeholder such as `#<issue-number>` until GitHub assigns the real number.
- Before commit, update the management document that matches the work.
- Add one `##` work-log section per commit-sized unit in the management document, using the commit title as the section title.
- Treat lower headings such as `### Scope`, `### Changes`, `### Verification`, and `### Notes` as optional helpers, not mandatory structure.

## Recommended Commit Flow On Windows

- Do not rely on complex multi-line `git commit -m` usage for structured commit bodies.
- Prefer writing the commit message into a temporary file and using `git commit -F <message-file>`.
- After commit, remove the temporary file if it is no longer needed.
- To enable the repository pre-commit check, set `git config core.hooksPath .githooks`.

## Windows Shell, UTF-8 & Notion CLI (`ntn`)

- **Notion access = the `ntn` CLI** (official Notion CLI, Beta), installed as an npm-global bin named **`ntn`** — NOT `notion`/`notion-cli`, so a search for "notion" misses it; **search and invoke as `ntn`**. Auth via `ntn login` (OS keychain) or the `NOTION_API_TOKEN` env var; verify with `ntn whoami`. Each target page/DB must be **shared with the integration** in Notion (page ••• → Connections) or calls return `404 object_not_found`. Read: `ntn pages get <id>` (page) / `ntn datasources resolve|query <id>` (database); write: `ntn pages update <id> < file.md`.
- Windows PowerShell (5.1) corrupts non-ASCII text (e.g., Korean) when piping it to a native executable (`... | & tool`) or passing it as a multi-line argument: it re-encodes the stream to the console code page and writes mojibake (깨진 `?` 글자) to the target.
- `.cmd`/batch shims (e.g., npm-installed CLIs like `ntn`) additionally mangle multi-line argument values such as `--content "<multi-line>"`, which can leave the tool waiting on stdin or sending broken text.
- Rule: to send non-ASCII content to an external CLI, write it to a **UTF-8 (no BOM) file** and feed that file via **Git Bash with raw stdin redirection** — `tool subcommand <id> < content.md` — not via a PowerShell pipe or an inline multi-line argument.
- Always **read the result back** and confirm the non-ASCII text is intact before treating the write as done.
- Same principle as `git commit -F <message-file>`: prefer file + stdin over inline multi-line args.
- Concrete case (Notion CLI `ntn`, used for the Notion workflow tracker): update a page with Korean content via `ntn pages update <id> < page.md` **in Git Bash**. Do NOT use `Get-Content page.md | & ntn ...` or `ntn ... --content $multilineString` in PowerShell — both corrupted the page in practice.

## Push Rules

- Confirm the checked-out branch is the intended work branch.
- Push to `origin`.
- Push the current branch name directly. Do not push to `main`.
- Make the first push once the branch reaches a meaningful checkpoint that is worth review context.

```bash
git push origin <current-branch>
```

## PR Draft Rules

- Use the PR title format from `docs/agent-workflow/git-collaboration-convention.md`.
- Use the PR description template from `docs/agent-workflow/git-collaboration-convention.md`.
- Keep placeholders in both title and body until the real issue number exists.
- Open a draft PR after the first pushable checkpoint.
- Confirm the target branch is `main` before opening the PR.
- Keep the PR summary aligned with the management document log.
- Update the draft PR body as additional commits land.

## Final Check List

- The current branch name matches repository rules.
- The issue number comes from a confirmed existing issue or a newly created issue.
- The management document file name matches the issue branch name.
- The management document directory matches the issue type.
- The branch base includes any merged repository structure changes that the work depends on.
- The pre-execution management-document gate was re-checked before file edits.
- The staged files match the requested scope.
- The management document for this work is updated.
- The staged changes pass `scripts/check-management-doc-update.ps1 -Staged`.
- The commit message format matches repository rules.
- The push target is `origin`.
- The PR base branch is `main`.
