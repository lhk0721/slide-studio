# Docs — 전 과정 추적 인덱스

이 디렉토리는 slide-studio의 **전체 진행 과정**을 추적한다. 두 개의 직교하는 축으로 나뉜다.

## 두 추적 축

| 축 | 위치 | 단위 | 목적 |
| --- | --- | --- | --- |
| **세션(발표자료)** | `docs/sessions/<id>/` | 발표자료 1건 | 기획·메시지·슬라이드 구성·진행 상태 추적 |
| **이슈(작업)** | `docs/issues/<type>/` | 커밋 단위 작업 | 구현/수정/문서 작업의 관리 문서(work log) |

- 코드(슬라이드)는 `app/src/sessions/<id>/` 에 있고, 그 세션의 **기획/진행**은 `docs/sessions/<id>/` 가 추적한다. 둘은 같은 `id`로 짝을 이룬다.
- 한 세션을 진행하는 도중의 개별 작업(슬라이드 추가, 컴포넌트 리팩터 등)은 `docs/issues/` 의 관리 문서로 커밋 단위로 기록한다.

## 디렉토리

- `docs/agent-workflow/` — 에이전트/협업 워크플로 규칙(진입은 `agent-workflow/README.md`).
- `docs/repository-layout/` — 저장소 레이아웃과 자산 정책.
- `docs/sessions/` — 발표자료(세션)별 진행 추적.
- `docs/issues/` — 이슈 단위 관리 문서 (`feature/` `fix/` `refactor/` `docs/` `chore/` `test/` `ci/` `perf/` + `sub-issues/` + `umbrella/`).

## 읽는 순서 (에이전트)

1. `AGENTS.md`
2. `docs/agent-workflow/documentation-rules.md`
3. git 작업이 예상되면 `docs/agent-workflow/git-rules.md`
4. 파일 변경 직전 — `AGENTS.md` `## Pre-Execution Gate` + `documentation-rules.md`
