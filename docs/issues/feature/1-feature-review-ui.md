---
issue: 1
branch: 1-feature-review-ui
type: feature
---

# [FEATURE] Deck review UI — 스키마틱 내러티브 흐름도 + 슬라이드별 인스펙터

## Document Relations
- Place under `docs/issues/feature/`
- Update before each related commit
- Workflow context: `docs/agent-workflow/deck-workflow.md` (Phase 2 Structure / Phase 6 Rehearse의 검토 단계)
- Session tracking: `docs/sessions/<id>/README.md`

## Summary
발표 모드(한 장씩 넘김)만 있던 앱에 **기획·검토용 리뷰 UI**를 추가한다. (1) 전체 슬라이드의 논리 흐름을 그룹·화살표로 도식화한 **스키마틱 내러티브 흐름도(Overview)**, (2) 한 슬라이드의 핵심메시지·근거·시각요소·발표노트를 펼쳐보는 **인스펙터(Inspector)**. Notion에서 사용자가 하던 "흐름(DB 행) + 상세(행 펼침)" 검토를 앱 안에서 재현한다.

## Goal
- 슬라이드 메타 스키마(`group`/`role`/`message`/`evidence`/`visual`/`notes`)를 세션 slide 레지스트리에 도입 — 발표(렌더)와 검토(메타) 모두를 같은 소스로 구동
- `/:sessionId/overview` 라우트: 그룹별 레인 + 노드(번호·role·메시지) + 화살표로 내러티브 흐름 도식화
- 노드 클릭 → 우측 인스펙터에 상세 메타 표시 + "발표 모드로" 이동
- inbody-u300 메타 채움(시연), financial-market 최소 메타

## Decisions
- **데이터 소스 = 레포 내 메타**로 시작. Notion은 사용자의 탐험용일 뿐, 동기화는 후속.
- **흐름 뷰 = 스키마틱 흐름도**. 썸네일 스토리보드는 편집 단계용이라 후속 과제로 분리.

## Scope
- `app/src/sessions/inbody-u300/slides/index.js`, `app/src/sessions/financial-market/slides/index.js` (메타 추가)
- `app/src/components/Overview.jsx` + `Overview.module.css` (신규)
- `app/src/App.jsx` (라우트), `app/src/components/Deck.jsx` (개요 링크), `app/src/components/Home.jsx` (개요 링크)
- `docs/agent-workflow/deck-workflow.md`, `docs/agent-workflow/README.md`

## Out of Scope
- 썸네일 스토리보드(실제 슬라이드 축소 렌더) — 편집 단계 과제
- Notion ↔ 메타 동기화 스크립트
- 인스펙터에서 메타를 편집/저장하는 기능

---

## Work Log

### 2026-06-13 — 슬라이드 메타 스키마 + 리뷰 UI(흐름도·인스펙터)

기획 단계 검토를 위한 리뷰 UI 도입. 슬라이드 레지스트리를 `{id,title,component}`에서 내러티브 메타를 포함하도록 확장하고, 그 메타로 구동되는 Overview(스키마틱 흐름도)와 Inspector(상세)를 추가.

- **메타 스키마**: 각 slide 엔트리에 `group`(내러티브 섹션), `role`(스토리 내 기능 한 줄), `message`(핵심 주장 한 줄), `evidence`(근거 목록, 선택), `visual`(시각 요소 메모, 선택), `notes`(발표 노트, 선택)를 추가. 기존 `title`/`component`는 유지(하위호환). 발표 렌더와 검토 메타가 단일 소스.
- **Overview(`/:sessionId/overview`)**: `group` 순서를 보존해 레인으로 묶고, 레인 안에서 노드를 가로 배치(→), 레인 사이는 세로 연결(↓)로 내러티브 흐름을 도식화. 썸네일이 아니라 번호·role·메시지 텍스트 노드. body의 고정 프레임 레이아웃을 벗어나도록 자체 스크롤 컨테이너 사용.
- **Inspector**: 노드 클릭 시 우측 패널에 선택 슬라이드의 전체 메타 표시(번호/제목/group/role/message/evidence/visual/notes) + "발표 모드로" 링크.
- **inbody-u300 메타**: 17장 전부 실제 헤드라인 기반으로 group/role/message 채움(시각 요소는 알려진 장만). 흐름도가 도입→문제→솔루션→가치→BM→시장→경쟁→InBody 시너지→마무리로 읽히도록 그룹핑.
- **financial-market**: 1장 placeholder 메타.
- **진입 링크**: Home 카드와 Deck 상단바에 "개요" 링크 추가, Overview에서 "발표 모드" 링크.
- 문서: `deck-workflow.md`에 메타 스키마가 Phase 2(Structure) outline의 코드상 산출물 위치임을 명기, `README.md` Read Order에 리뷰 UI 항목 추가.

### 2026-06-13 — Continue 핸드오프 파일 추가

새 세션에서 이어서 작업할 수 있도록 `docs/HANDOFF.md`(현 상태 브리핑) 신규. 시작 절차·레포 구조·현재 브랜치/커밋·리뷰 UI 작업 내역·확정 방향·다음 후보를 한 파일에 정리(항상 최신만 유지).

### 2026-06-13 — 흐름도 라이브러리 도입 (React Flow + dagre)

스키마틱 흐름 뷰를 직접 그린 레인/화살표 CSS에서 그래프 라이브러리 기반으로 전환하기 위해 의존성 추가. `@xyflow/react`(노드·엣지 렌더), `@dagrejs/dagre`(DAG 자동 레이아웃). React Flow는 레이아웃을 계산하지 않으므로 dagre가 (x,y)를 산출하고 React Flow가 그 좌표로 그린다.
