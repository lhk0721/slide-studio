# Handoff — 새 세션 Continue 브리핑

> 새 세션에서 이 파일을 읽고 이어서 작업한다. 항상 최신 상태만 유지(필요 시 덮어쓴다).
> 최종 갱신: 2026-06-13

## 시작 시
- `AGENTS.md` → `docs/agent-workflow/` 워크플로 준수. 파일 변경 직전 관리문서 게이트 재확인.
- 단일 `main` 모델. 관리문서는 `docs/issues/<type>/`(브랜치명으로 명명). 커밋 형식 `type: summary (#n)`.
- **push는 사용자가 명시 요청할 때만.**

## 레포/위치
- `slide-studio` (`github.com/lhk0721/slide-studio`, public) · 로컬 `C:\Users\neighbor\Documents\Code\Github\slide-studio`
- 구조: 단일 Vite React 앱(`app/`) + 세션별 디렉토리(`app/src/sessions/<id>/`). 세션 1개 = 발표자료 1건.
- HashRouter 라우트: `/`(Home) · `/:sessionId/overview`(리뷰) · `/:sessionId/:slideId`(발표).

## 현재 상태
- 브랜치 **`1-feature-review-ui`** (이슈 #1) · 마지막 커밋 `c977c5a`.
- `main`은 origin에 push됨(부트스트랩 + agent-workflow/deck docs). **이 브랜치는 미push.**

## 이번에 한 일 — 리뷰 UI
기획 단계 검토용 UI. 사용자가 직접 검토할 수 있도록 흐름 + 상세를 화면으로 제공.

- **슬라이드 메타 스키마** — 각 슬라이드 엔트리(`sessions/<id>/slides/index.js`)에 렌더용 `component`/`title` 외에 검토용 메타: `group`(내러티브 섹션) · `role`(스토리 내 기능) · `message`(핵심 주장) · 선택 `evidence[]` · `visual` · `notes`. 발표 렌더와 검토 메타가 단일 소스.
  - `inbody-u300` 17장: 실제 슬라이드 헤드라인 기반으로 채움. `financial-market`: 최소 placeholder.
- **흐름 뷰** `app/src/components/Overview.jsx` (+ `Overview.module.css`) — `group`을 레인으로 묶고 노드(번호·역할·메시지)를 `→`, 레인 사이 `↓`로 잇는 **스키마틱 내러티브 흐름도**(썸네일 아님). `body{overflow:hidden}` 고정 프레임을 `position:fixed;inset:0` 컨테이너로 탈출.
- **인스펙터** — Overview 우측 패널. 노드 클릭 시 전체 메타 펼침 + "발표 모드로" 링크. (읽기 전용)
- 진입 링크: `Home.jsx`(발표/개요), `Deck.jsx` 상단바(개요).
- 문서: `docs/agent-workflow/deck-workflow.md` "리뷰 UI" 섹션, `README.md` Read Order, 관리문서 `docs/issues/feature/1-feature-review-ui.md`.

## 확정된 방향
- 데이터 소스 = **레포 내 메타로 시작**(Notion은 사용자 탐험용, 동기화는 후속).
- 흐름 뷰 = **스키마틱**(썸네일 스토리보드는 편집 단계 후속).

## 검증 / 실행
- `cd app && npm run build` 통과.
- 보기: `cd app && npm run dev` → `#/inbody-u300/overview`.

## 다음 후보 (미정 — 사용자 선택)
1. 인스펙터에서 메타 **인라인 편집**(현재 읽기 전용) — "UI에서 마크업으로 작성"의 첫 단계.
2. 편집 단계용 **썸네일 스토리보드** 뷰(실제 슬라이드 축소 렌더).
3. 이 브랜치 push / PR(base `main`).

## 참고
- 관리문서 상세: `docs/issues/feature/1-feature-review-ui.md`
- 워크플로 개요: `docs/agent-workflow/deck-workflow.md`
