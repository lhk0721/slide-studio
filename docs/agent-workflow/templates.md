# Agent Workflow Templates

## Document Relations

- Parent index: `docs/agent-workflow/README.md`
- Related rule summaries:
  - `docs/agent-workflow/git-rules.md`
  - `docs/agent-workflow/documentation-rules.md`
- Related detailed git references:
  - `docs/agent-workflow/git-collaboration-convention.md`
  - `docs/agent-workflow/agent-commit-and-push-workflow.md`
- If a format or placeholder changes here, update the matching rule summaries and detailed git references together.

## Issue Placeholder

- Use `#<issue-number>` until GitHub assigns the real number.

## Branch Placeholder

- Use `<issue-number>-type-short-description` until GitHub assigns the real issue number.

## Branch Example

- `3-feature-session-router`

## Commit Message Template

```text
type: short summary (#<issue-number>)

- change item 1
- change item 2
- change item 3
```

## Issue Template

```text
[TYPE] Short work summary

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

## PR Title Template

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
```

## Issue Management Document Path Examples

- `docs/issues/feature/3-feature-session-router.md`
- `docs/issues/fix/12-fix-export-font-embed.md`
- `docs/issues/refactor/8-refactor-deck-session-aware.md`
- `docs/issues/docs/5-docs-session-authoring-guide.md`
- `docs/issues/chore/1-chore-bootstrap-slide-studio.md`
- `docs/issues/sub-issues/9-feature-financial-market-deck.md`

## Path Rule

- Use repository-relative paths in workflow docs, templates, and management documents.
- Do not write absolute local filesystem paths such as `C:/...` into reusable workflow rules.

## Matrix Sync Rule Template

Use this rule block at the top of a parent management document that has child plan documents, and at the top of each child plan document.

```md
## Matrix Sync Rule
- 부모 문서의 matrix는 하위 plan 문서들의 상태, 결정, 연동 위험을 요약한다.
- 하위 plan 문서의 상세 구현 항목이 외부 계약을 바꾸면 부모 matrix의 해당 row를 갱신한다.
- 부모 matrix에서 scope, priority, dependency, 상태가 바뀌면 관련 하위 plan 문서의 matrix도 갱신한다.
- 하위 plan 문서의 상태가 `결정 필요`, `구현 완료`, `검증 완료`, `보류`, `차단됨`으로 바뀌면 부모 row 상태와 `갱신 필요 사항`도 함께 재검토한다.
- 부모 matrix는 세부 구현의 source of truth가 아니라 통합 tracking index다. 세부 구현 source of truth는 하위 plan 문서다.
```

## Plan Integration Matrix Template

Use this matrix in a parent management document to track child plan documents as feature or architecture units. Do not duplicate child implementation details here.

```md
## Plan Integration Matrix

| ID | 구분 | 하위 문서 | 상태 | 결정된 방향 | 연동 대상 | 갱신 필요 사항 | 다음 액션 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| PLAN-01 | Feature or architecture unit | `child-plan.md` | 구현 필요 | Parent-level direction. | Related plans or systems | What must be synced when this row changes. | Next parent-level action |
```

## Implementation Status & Decision Matrix Template

Use this matrix in planning documents when a task needs explicit tracking of implementation layers, decisions, open questions, and next actions.

Status values:
- `결정 완료`: Direction is decided and no further judgment is needed.
- `결정 필요`: A direction must be chosen before implementation can proceed.
- `구현 필요`: Direction is clear enough and implementation remains.
- `구현 중`: Work is actively in progress and does not yet meet done criteria.
- `구현 완료`: Implementation is done, but verification may still remain.
- `검증 필요`: The result needs tests, runtime checks, data comparison, or review.
- `검증 완료`: The defined verification criteria passed.
- `보류`: Intentionally deferred from the current scope.
- `차단됨`: Progress is blocked by an external dependency, missing decision, data, permission, or environment issue.

Matrix rules:
- Use exactly one status value per row.
- If direction is decided but work remains, use `구현 필요` and record the decision in `결정된 방향`.
- Use `없음` in `결정 필요 사항` when no open decision remains.
- Keep `다음 액션` to one immediately executable step.
- Use repository-relative paths or section names in `참조`.

```md
## Implementation Status & Decision Matrix

| ID | 구분 | 레이어/단계 | 상태 | 결정된 방향 | 결정 필요 사항 | 다음 액션 | 참조 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| ITEM-01 | Short item name | Contract / Service / UI / Test / Future scope | 구현 필요 | Decided implementation direction. | 없음 | Next concrete action. | Related section or `path/to/file.jsx` |
| ITEM-02 | Deferred item | Future scope | 보류 | Why it is deferred. | 없음 | Create a follow-up issue when needed. | Related issue or planning note |
```

## Pre-Execution Gate Template

```text
Before any file edit, creation, move, or deletion, re-check whether the task belongs to tracked issue work.
If it does, open the matching management document first.
"Small task", "simple fix", "one-line change", and "quick cleanup" are not exceptions.
Only pure question-answer turns with no file changes are exempt.
If unsure, read `docs/agent-workflow/documentation-rules.md` again before changing files.
```

## Recent Active Context Template

```text
## Recent Active Context

- Last active work: `1-chore-bootstrap-slide-studio`
- Tracking doc: `docs/issues/chore/1-chore-bootstrap-slide-studio.md`
- Summary: one-line summary of what was in progress and where it was tracked.
- Use rule: treat this section as a resume hint only when the user's new work clearly matches the same issue or sub-issue. For simple questions, respond directly without switching work context.
```

## Issue Management Document Template

```text
# [TYPE] Short work summary
Parent: #<parent-issue-number-or-placeholder>

## Document Relations
- This document tracks one issue-sized work item.
- Keep this file name aligned with the issue branch name.
- Place this file under the matching issue-type directory.
- Update this document before each related commit.

## Summary
Short context for the issue-sized work item.

## Goal
- What this issue needs to achieve

## Scope
- Planned implementation or cleanup scope

## Out Of Scope
- Explicit non-goals

## Done Criteria
- Conditions that mark the issue complete

---

## Work Log

### type: short summary (#<issue-number>)

> One-line description of what changed and why

#### Scope
#### Changes
#### Verification
#### Notes

---

## Management Notes

### Follow-up Candidates
- Items deferred for later issues

### Notes
- Decisions, constraints, or risks worth preserving

### References
- Related issues, docs, or links
```
