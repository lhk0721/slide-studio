# Agent Entry Point

## Recent Active Context

- Last active work: `1-chore-bootstrap-slide-studio`
- Tracking doc: `docs/issues/chore/1-chore-bootstrap-slide-studio.md`
- Summary: slide-studio 레포 부트스트랩. 단일 Vite React 앱(`app/`) + 세션별 슬라이드 디렉토리(`app/src/sessions/<id>/`) 구조 확립. rack-tracker에서 InBody U+300 피치덱을 `inbody-u300` 세션으로 이식하고, `financial-market` 세션을 신설. agent/문서 워크플로 자산 이식.
- Use rule: treat this section as a resume hint only when the user's new work clearly matches the same issue or sub-issue. For simple questions, respond directly without switching work context.

## Document Relations

- This is the agent entry point for this repository.
- Read this file first, then open only the linked detail documents needed for the current task.

## Start Here

- Treat repository documents as source of truth for workflow and tracking rules.
- This repository builds presentation decks as code: one Vite React app under `app/`, one deck per **session** under `app/src/sessions/<session-id>/`.
- Read `docs/README.md` for the whole-process tracking map (sessions vs. issues).
- For agent workflow overview, read `docs/agent-workflow/README.md`.
- For git, branch, commit, push, and PR rules, read `docs/agent-workflow/git-rules.md`, then open the linked detailed git document only when needed.
- For management-document updates and cleanup logging rules, read `docs/agent-workflow/documentation-rules.md`.
- For issue, branch, commit, PR, and management-document templates, read `docs/agent-workflow/templates.md`.
- Before editing deck slide components (`app/src/sessions/<id>/slides/SlideNN.jsx`/`.module.css`), read `docs/agent-workflow/slides-jsx-convention.md`.

## Pre-Execution Gate

- Before any file edit, file creation, file move, or file deletion, re-check whether the task belongs to a tracked issue or sub-issue.
- If the task belongs to tracked work, open the matching management document under `docs/issues/` or `docs/issues/sub-issues/` before editing files.
- Treat this gate as separate from the session-start read order. Reading `AGENTS.md` once at startup does not satisfy the pre-execution check.
- "Small task", "simple fix", "one-line change", and "quick cleanup" are not exceptions to this gate.
- Only pure question-answer turns with no file changes are exempt.
- If the match or logging duty is unclear, read `docs/agent-workflow/documentation-rules.md` again before making changes.

## Pre-Commit Review Gate

- After completing a work unit, show the user a summary of changed files and request explicit approval before writing the management-document log or committing.
- Write the log and commit only after the user approves.
- Do not log or commit without explicit approval.
- Commit immediately after each approved work unit. Do not accumulate changes across multiple work units and commit later.

## Core Rules

- Read `## Recent Active Context` as a lightweight hint, not as a substitute for issue or management-document discovery.
- When a user requests work, first check whether a reusable open GitHub issue already matches the task.
- After the GitHub issue check, search the repository management documents for the matching work item before choosing where to log progress.
- When the user asks to continue, resume, or update existing work, first search under `docs/issues/` and `docs/issues/sub-issues/` for a clearly matching management document.
- If a matching management document exists, use it as the primary local tracking context and keep the GitHub issue, branch, commit, and PR context aligned with it.
- Reuse an existing issue only when it is clearly the same work item. If separate tracking would be cleaner, create a new issue.
- If a matching live issue exists, use that real issue number for the branch name, management document, and commit or PR drafts.
- If no suitable issue exists, try creating one with `gh issue create`.
- If issue creation is unavailable, say so and prepare an issue title and body draft that can be posted immediately.
- Do not guess GitHub issue numbers before an existing issue is confirmed or a new issue is created.
- Use repository-relative paths in workflow rules and management documents. Do not depend on absolute paths that may change with the local workspace.
- Do not revert user changes unless explicitly asked.
- Do not make destructive history edits unless explicitly asked.
