# Agent Workflow Docs

## Document Relations

- Parent entry point: `AGENTS.md`
- This document is the workflow index for agents and points to the smallest next document to read.
- Child documents:
  - `docs/agent-workflow/git-rules.md`
  - `docs/agent-workflow/git-collaboration-convention.md`
  - `docs/agent-workflow/agent-commit-and-push-workflow.md`
  - `docs/agent-workflow/documentation-rules.md`
  - `docs/agent-workflow/templates.md`
  - `docs/agent-workflow/deck-workflow.md`
  - `docs/agent-workflow/slides-jsx-convention.md`
  - `docs/agent-workflow/deck-discovery.md`
  - `docs/agent-workflow/deck-discovery-insights.md`
  - `docs/agent-workflow/deck-content.md`
  - `docs/agent-workflow/deck-design.md`
  - `docs/agent-workflow/deck-build-insights.md`
- If you change scope, ownership, or cross-document rules here, update the child docs together.

## Purpose

- Keep `AGENTS.md` short.
- Allow `AGENTS.md` to carry a minimal recent-work resume hint without replacing the normal issue and management-document lookup flow.
- Let agents open only the detailed document needed for the current task.
- Separate durable workflow rules from issue-specific management documents.

## Read Order

- At session startup: `AGENTS.md`
- At session startup: `docs/agent-workflow/documentation-rules.md`
- At session startup when git work is expected: `docs/agent-workflow/git-rules.md`
- Before any file edit, creation, move, or deletion: `AGENTS.md` `## Pre-Execution Gate`
- Before any file edit, creation, move, or deletion: `docs/agent-workflow/documentation-rules.md`
- Before commit, push, or PR work: `docs/agent-workflow/git-collaboration-convention.md`
- Before commit, push, or PR work: `docs/agent-workflow/agent-commit-and-push-workflow.md`
- For placeholders, naming formats, and reusable examples: `docs/agent-workflow/templates.md`
- Before editing deck slide components (`app/src/sessions/<id>/slides/SlideNN.jsx`/`.module.css`): `docs/agent-workflow/slides-jsx-convention.md`
- For the end-to-end deck creation pipeline (6 phases, overview): `docs/agent-workflow/deck-workflow.md`
- For the review UI (슬라이드 메타 스키마 · 흐름도 · 인스펙터): `docs/agent-workflow/deck-workflow.md` → "리뷰 UI (검토)"
- When starting a new deck (clarifying topic/goal before any slide exists): `docs/agent-workflow/deck-discovery.md`
- Before locking a deck's design system (tokens · single accent · per-session `[data-theme]` override · repeating patterns), or before editing `app/src/sessions/<id>/tokens.css`: `docs/agent-workflow/deck-design.md`
- Before running an external CLI that writes non-ASCII content on Windows (e.g., `ntn` for the Notion tracker): `docs/agent-workflow/agent-commit-and-push-workflow.md` → "Windows Shell & UTF-8"

## Scope

- These docs are the primary agent-oriented workflow references.
- `docs/issues/` is the repository-local home for issue-sized management documents.
- `docs/sessions/` tracks per-presentation (session) planning and progress.
- See `docs/README.md` for how the session axis and the issue axis relate.
