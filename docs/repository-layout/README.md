# Repository Layout

## Document Relations

- Parent index: `docs/README.md`
- Related policy: `docs/repository-layout/third-party-policy.md`

## Top-Level Layout

```
slide-studio/
├─ app/            # single Vite React app — all decks route here
├─ docs/           # whole-process tracking (workflow rules, sessions, issues)
├─ scripts/        # PowerShell checks for commit/push/management-doc rules
├─ .githooks/      # git hooks wiring the scripts (commit-msg, pre-commit, pre-push)
├─ AGENTS.md       # agent entry point
├─ CLAUDE.md       # Claude-specific instruction shim → AGENTS.md
└─ README.md       # human-facing overview + how to run
```

## Single App, Many Sessions

- This repository keeps **one** React app under `app/`. It does not create a separate app per presentation.
- Each presentation deck is a **session** under `app/src/sessions/<session-id>/`:
  - `slides/` — `SlideNN.jsx` + `SlideNN.module.css` + `index.js` (slide order)
  - `assets/` — images used only by that session
- Sessions are registered in `app/src/sessions/index.js` and routed at `/:sessionId/:slideId`.
- Shared, deck-agnostic pieces live once at `app/src/`:
  - `components/` — `Deck`, `SlideNav`, `ExportControls`, `Home`
  - `utils/exportSlides.jsx` — slide → 4K PNG / ZIP export (takes the active session's slides as an argument)
  - `tokens.css` / `shared.css` — design tokens and common slide classes

### Why single-app

- One dependency set, one build, one export pipeline shared across every deck.
- Adding a deck is additive: a new `sessions/<id>/` folder plus one registry line.
- Cross-deck reuse (components, tokens, export) is direct, not copy-paste.

### Per-session isolation guidance

- Keep session-specific styling inside that session's `SlideNN.module.css`, not in shared files.
- If a session needs a different theme, override design-token values within that session's styles rather than mutating `tokens.css` globally.

## Tracking vs. Code

- `app/src/sessions/<id>/` holds the **code** for a deck.
- `docs/sessions/<id>/` holds the **planning and progress** for that same deck.
- `docs/issues/<type>/` holds commit-sized **work logs**, which reference the owning session.
