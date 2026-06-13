# Issues — 관리 문서 홈

이슈 단위(커밋 단위) 작업의 관리 문서(work log)를 보관한다. 한 이슈 = 한 파일.

## 규칙

- 파일명은 이슈 브랜치명과 일치시킨다: `<issue-number>-<type>-<short-description>.md`.
- 이슈 타입 디렉토리 아래에 둔다: `feature/` `fix/` `refactor/` `docs/` `chore/` `test/` `ci/` `perf/`.
- 더 넓은 이슈의 하위 작업은 `sub-issues/` 에 둔다.
- 여러 하위 plan 문서를 묶는 상위 추적 문서는 `umbrella/` 에 둘 수 있다.
- 관리 문서 양식은 `docs/agent-workflow/templates.md` 의 *Issue Management Document Template* 을 사용한다.
- 커밋 직전 해당 관리 문서를 갱신한다. (`scripts/check-management-doc-update.ps1 -Staged` 로 확인)

## 세션과의 관계

- 작업이 특정 발표자료(세션)를 진전시키면, 관리 문서에서 그 세션(`docs/sessions/<id>/`)을 참조한다.
- 세션 자체의 기획/진행은 `docs/sessions/<id>/` 가, 개별 작업 로그는 여기(`docs/issues/`)가 담당한다.
