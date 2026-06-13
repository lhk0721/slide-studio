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

### 2026-06-13 — 오버뷰를 분기 흐름도로 재작성 + 인지공학 인스펙터/근거 드로어

리뷰 UI(Overview)를 전면 재작성. 기존 레인+화살표 도식을 **React Flow + dagre 분기 DAG**로 교체하고, 인스펙터를 인지공학 원칙에 따라 재구성.

- **흐름도**: 슬라이드 메타의 `next`(분기/합류 엣지, 생략 시 선형 id+1)로 DAG 구성. dagre로 자동 배치, 다이어그램이 페이지 전체를 차지(고정 프레임 탈출). **가로(LR)/세로(TB) 토글**(가로 기본 — 화면비·분기 폭 고려), `onInit`에서 흐름축 시작점 정렬·교차축 중앙 정렬로 초기 뷰포트 프레이밍(상단/좌측에 붙던 문제 해결), 미니맵(현재 구역 표시)·컨트롤.
- **섹션 영역 시각화**: 내러티브 흐름 단위(group)를 "조용한 영역 + 막 제목"으로 — 멤버 2개 이상 그룹만 테두리 없는 옅은 색(채도 7%) 영역 + 번호 막 제목을 노드 뒤(zIndex 0)에 깔고, 단일 노드 그룹은 박스 없이 카드 태그로만 표시. 흐름=figure, 영역=ground.
- **인스펙터 재구성**: 평평한 7-필드 목록을 읽기 우선순위 순서의 4개 라벨 청크로 — ① 정체성(번호·섹션 색 배지·역할 칩·제목) ② 핵심 메시지(accent 강조, figure) ③ 시각 계획(16:9 액자형 placeholder + visual 텍스트에서 위치 자동 추출 칩) ④ 근거·통계(요약 + 자세히 보기) ⑤ 발표 노트.
- **근거 자세히보기 드로어**: 근거 섹션의 "자세히 보기" → 인스펙터 왼쪽으로 상세 드로어가 펼쳐져 통계별 카드(수치·출처·검증)를 표시. 다른 슬라이드 선택 시 자동 접힘.
- **evidence 스키마 확장**: `evidence` 항목을 문자열 또는 `{ stat, source?, verify? }` 객체로 허용. 객체면 드로어에서 수치·출처·검증으로 펼쳐지고, 문자열은 자연스럽게 폴백. inbody는 문자열 유지(폴백 검증), 스키마 주석에 `next`/구조화 evidence 명기.
- 검증: `npm run build` 통과, 헤드리스 렌더로 inbody(17장·섹션6) 가로/세로 + 인스펙터·드로어·문자열 폴백 정상, JS 에러 없음.

### 2026-06-13 — financial-market 내러티브 메타 이식 (Notion) + 세션 메타

Notion 기획 트래커(발표 슬라이드 DB)의 "같은 충격, 다른 실패 — 미·한 피트니스 시장 비교" 12장을 `financial-market` 세션 메타로 이식.

- 도입→문제 제기→분석 틀→(미국 사례·한국 사례 분기)→종합→결론→부록 구조로 group/role/message/evidence/visual/notes 채움.
- 분석 틀(3)→미국(4)·한국(7) 분기, 미국(6)·한국(9)→종합(10) 합류를 `next`로 표현.
- 통계는 `{ stat, source, verify }` 구조로 정리(출처·검증 메모를 근거 항목에 귀속) — 인스펙터 자세히보기 드로어에서 펼쳐짐. (슬라이드 9~12는 요약·참고 성격이라 문자열 유지 → 혼합 모드 검증)
- 세션 목록(`sessions/index.js`)의 financial-market 제목·설명을 발표 주제에 맞게 갱신.
- 이 메타는 향후 LLM/동기화로 Notion 내용을 자동 갱신하는 것을 목표로 한다.
- 검증: 헤드리스 렌더로 financial-market(12장·섹션2) 흐름도/분기·합류·인스펙터·구조화 근거 드로어 정상.

### 2026-06-14 — 인스펙터 강화: 시각계획 와이어프레임 · 근거 인용·링크 · 페이지 내용

인스펙터의 `시각 계획`을 일반 아이콘에서 **저해상도 콘텐츠 실루엣(와이어프레임)**으로 바꾸고, 근거 드로어에 **클릭 가능한 출처 인용**을, 시각 계획 아래에 **페이지 내용(본문 초안)** 섹션을 추가. (Phase 3 콘텐츠 단계의 사전 정지작업 성격.)

- **시각 계획 와이어프레임**: `visual` 메모를 휴리스틱 분석(`scanKinds`)해 16:9 흰 캔버스에 그린다 — 글=회색 줄, 인포그래픽=무채색 도형(선·막대·도넛·2×2 그리드·도식+화살표), 사진=빗금 박스+사진 글리프. 좌/우·vs 비교 표현이면 2열 분할, 위치 칩(좌·우 등) 유지.
- **근거 출처 인용·링크**: evidence 스키마에 `url?` 추가(`{ stat, source?, url?, verify? }`). `source`는 슬라이드 각주체 인용구로 충실히 작성, `url`이 있으면 드로어 출처가 새 탭 링크(↗)가 된다. url 없으면 텍스트 폴백.
- **페이지 내용 섹션**: slide 메타에 `body?: string[]`(각 항목=한 줄/불릿) 추가. 시각 계획 아래 "페이지 내용" 섹션에 실제 슬라이드 본문 초안을 표시(그룹 색 마커, 첫 줄 강조).
- **financial-market 데이터**: 슬라이드 2·4·5·6·7·8·12 출처를 발행처·「자료명」·시점 인용구로 재작성하고 웹 검색으로 확인한 canonical URL 연결(MacroTrends·stockanalysis·SEC EDGAR·Bloomberg·서울 열린데이터광장 OA-16142·KIPRIS·Grand View·Akerlof DOI). 12장 전체에 `body` 본문 초안 작성. 슬라이드 2의 "209억$"는 Grand View 실제 전망(2026년 약 109억$)과 불일치 — 거짓 출처 대신 `verify`/노트에 재확정 필요로 명시(정직성).
- inbody-u300 스키마 주석에 `url`/`body` 문서화.
- 검증: `npm run build` 통과, 헤드리스로 와이어프레임 7종(선·막대·도넛·그리드·도식·텍스트·사진)·출처 링크 href·target·페이지 내용 섹션 정상, JS 에러 없음.
