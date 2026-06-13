---
issue: 2
branch: 2-feature-content-workbench
type: feature
---

# [FEATURE] Phase 3 콘텐츠 워크벤치 — 자산 체크리스트 · 근거 강도 등급 · 준비도 게이트

## Document Relations
- Place under `docs/issues/feature/`
- Update before each related commit
- Workflow context: `docs/agent-workflow/deck-workflow.md` (Phase 3 Content — 현재 ⬜ 미정)
- 선행 작업: `docs/issues/feature/1-feature-review-ui.md` (Phase 1~2 리뷰 UI). 본 작업은 그 슬라이드 메타 위에 Phase 3 레이어를 얹는다.
- Session tracking: `docs/sessions/<id>/README.md`

## Summary
덱 파이프라인 **Phase 3 (Content)** 를 전용 화면으로 시스템화한다. 리뷰 UI(#1)가 메시지·구조(Phase 1~2)를 코드화했다면, 본 작업은 Phase 3의 실제 작업 — 저해상도 콘텐츠 확정, **필요 자산 목록화(출처·라이선스)**, **근거 강도 등급화(비대칭 전략)**, 사실 검증 — 을 `/:sessionId/content` 워크벤치로 제공하고, Phase 4(Design)로 넘어가는 **준비도 게이트**를 보여준다.

## Goal
- slide 메타에 Phase-3 필드 추가: `assets[]`(kind/desc/source/license/status), evidence 항목 강도(`grade`)·검증 상태.
- `/:sessionId/content`: 슬라이드별 본문/자산/근거를 한눈에 + 덱 전체 준비도 대시보드(Phase 4 게이트).
- `financial-market` 파일럿으로 자산/근거 등급 채움.
- `deck-workflow.md` Phase 3 상태 ⬜→🟡, Phase-3 규칙 문서 신설(`deck-content.md`).

## Decisions
- **데이터 소스 = slide 메타 단일 소스** 유지(렌더·리뷰·콘텐츠 공유).
- **전용 라우트**(인스펙터 확장 아님) — 준비도 게이트/대시보드가 핵심이라 별도 화면이 맞다.
- 브랜치는 미병합 #1 위에 스택(현 시점 main에는 Phase 1~2 기반이 없음). #1 병합 시 main으로 리베이스.

## Scope
- `app/src/components/Content.jsx` + `Content.module.css` (신규)
- `app/src/App.jsx` (라우트), 진입 링크(Overview/Home/Deck)
- `app/src/sessions/financial-market/slides/index.js` (assets/grade 채움), `inbody-u300/slides/index.js` (스키마 주석)
- `docs/agent-workflow/deck-workflow.md`, `docs/agent-workflow/deck-content.md`(신규)

## Out of Scope
- 자산을 실제로 업로드/관리하는 파일 스토리지 — 목록·상태만.
- 콘텐츠를 워크벤치에서 인라인 편집/저장 — 표시·집계만(편집은 메타 직접 수정).
- Phase 4(Design) 토큰/슬라이드 빌드.

---

## Work Log

### 2026-06-14 — Phase 3 콘텐츠 워크벤치 신설 (데이터 모델 + 라우트 + 문서)

덱 파이프라인 Phase 3(Content)를 전용 화면으로 시스템화. slide 메타에 자산/근거강도 필드를 더하고, `/:sessionId/content` 워크벤치로 준비도와 Phase 4 게이트를 집계.

- **데이터 모델**: slide 메타에 `assets[]`(`{ kind, desc, source?, license?, status }`, status: have/need/check) 추가, evidence 객체에 `grade`(strong/medium/weak) 추가. 발표·리뷰·콘텐츠가 단일 소스 유지.
- **워크벤치(`/:sessionId/content`)**: `Content.jsx`/`.module.css` 신규. ① 준비도 대시보드(본문 n/N·자산 확보/필요/확인·근거 강도 분포·미검증 수·준비 완료 n/N) + Phase 4 게이트(미준비 시 보완 목록), ② 슬라이드별 본문/자산(상태 칩)/근거(강도 칩+미검증 배지) 3열. 강도는 작성자 명시 grade만 집계(추정 안 함) — 정직성, 미평가 객체는 '참고', 문자열은 '논증'.
- **라우트·진입**: `App.jsx`에 `/:sessionId/content` 추가, Home 카드·Overview 액션에 "콘텐츠 ☑" 링크.
- **financial-market 파일럿**: 12장에 assets 채우고 evidence에 grade 부여(강7·중3·약3, 미검증 8). 현재 준비 완료 3/12 — 자산 미확보(need/check)·미검증 근거가 게이트를 막는 상태가 정상 노출됨.
- **문서**: `deck-content.md` 신설(Phase 3 명세), `deck-workflow.md` Phase 3 상태 ⬜→🟡 + 요약/상세규칙 링크 갱신. inbody-u300 스키마 주석에 assets/grade 문서화.
- **브랜치 메모**: 미병합 #1(리뷰 UI) 위에 스택. #1 병합 시 main으로 리베이스.
- 검증: `npm run build` 통과, 헤드리스로 워크벤치 집계(게이트·메트릭·블로커·3열) 정상, JS 에러 없음.
