# Third-Party Policy

This repository does not keep vendored external source trees as standing storage.

## Rules

- Runtime dependencies should come from package managers and lockfiles (`app/package.json` + `app/package-lock.json`).
- Do not keep large forked source trees in this repository only for occasional code reading.
- If upstream internals need to be inspected, clone the upstream or a fresh fork outside this repository when needed.
- Do not record developer-specific absolute paths in repository docs.

## Assets

- Session images live under `app/src/sessions/<id>/assets/` and are imported by that session's slides.
- Keep unused or oversized source images out of the committed tree; prefer the smallest asset that holds up at 4K export.

## Current Status

- No active vendored third-party source tree is required in this repository.
- External implementation references should point to package-managed dependencies or upstream source locations.
