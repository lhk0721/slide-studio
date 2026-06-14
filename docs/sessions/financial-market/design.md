---
session_id: financial-market
phase: design
status: tokens-locked
---

# Design Spec: 같은 충격, 다른 실패 — 미·한 피트니스 시장 비교

Phase 4(Design) 결정 기록. 규칙은 `docs/agent-workflow/deck-design.md`. 콘텐츠(Phase 3)가 게이트를 통과(준비 완료 11/12, 미검증 0)한 뒤 진입했다. 이 문서는 **무엇을 정했고, 어떤 선택지 중에서 골랐는지**를 provenance로 남긴다.

## Document Relations

- Parent index: `docs/sessions/README.md`
- 단계 규칙: `docs/agent-workflow/deck-design.md`
- 콘텐츠 단계: `docs/issues/feature/2-feature-content-workbench.md`
- 코드: `app/src/sessions/financial-market/tokens.css`, `app/src/sessions/financial-market/slides/`
- Route: `/financial-market/1` (발표) · `/financial-market/content` (콘텐츠 워크벤치)

---

## 결정 로그

### D1 — 세션별 테마 override 아키텍처 (2026-06-14)

- **질문**: 세션(덱)마다 테마가 다를 때 토큰을 어떻게 분리/override할까. (이게 정해져야 `tokens.css` scope·`Deck.jsx` 훅·전역 기본값이 결정됨)
- **선택지** (제시한 4개 — 추천 1개 + Other):
  1. **전역 중립화 + 세션 override** (추천) — `tokens.css`를 브랜드 중립 기본값으로 빼고, InBody·financial-market 둘 다 `sessions/<id>/tokens.css`에서 `.deck[data-theme]`로 override. 가장 깔끔/확장적이지만 inbody-u300도 손대야 함.
  2. **전역=InBody 유지 + 신규 세션만 override** — base는 InBody인 채, financial-market만 override. inbody 무수정·위험 적음. 단 "기본값=특정 브랜드" 비대칭이 남음.
  3. **세션별 토큰 파일 완전 분리** — `shared.css`(패턴)만 공유, 토큰은 세션마다 독립 파일. 자유도 최대지만 "한 회사가 만든 일관성"·전역 불변(타이포·그리드)을 코드가 강제 못함.
- **결정**: **3 (완전 분리)**.
- **보정(LLM 제안)**: ① 완전 분리여도 두 덱 `:root`가 충돌하므로 `[data-theme="<id>"]` 스코프는 **여전히 필요**. ② 일관성을 코드가 강제 못 하므로 **변수 계약 + 불변 권장 블록**으로 메움(`deck-design.md` §2). ③ base는 세션 없는 표면(body·Home) 전용 폴백으로 재정의.
- **구현**: 커밋 `e895db7` — 세션별 `tokens.css`(scoped), `data-theme` 스탬프(Deck/Overview/Content/export stage), base=앱-셸 폴백. 두 세션 토큰은 진입 시점엔 base verbatim 복사라 회귀 0.

### D2 — 단일 accent (2026-06-14)

- **질문**: financial-market 덱의 단일 accent(`--accent`/`--accent-soft`). 주제(시장 실패·자본·붕괴)에 맞고 InBody Red와 분리. 불변 토큰은 그대로.
- **선택지** (제시한 4개 — 추천 1개 + Other, 모두 흰 배경 AA 충족):
  1. **Petrol Teal** `#0F6E78` / soft `#E3EFF0` (추천) — 분석·금융 톤, 빨강과 확실히 분리, 차분한 권위. 데이터 차트에도 잘 붙음.
  2. **Slate Navy** `#1D4E89` / soft `#E5EAF2` — 전통적 금융·신뢰, 가장 보수적·안전. 단 블루는 흔해 개성 약함.
  3. **Amber / Ochre** `#A85D00` / soft `#F4EBDD` — 경고·실패 뉘앙스(주제와 직결), 따뜻하고 개성 강함. 차트 하강 구간 강조에 자연스러움.
  4. **Oxblood / Burgundy** `#7A2230` / soft `#F1E3E5` — 진중한 학술 적색. (⚠ InBody Red `#971B2F`와 같은 적색 계열이라 차별화 의도엔 덜 맞음.)
- **결정**: **4 (Oxblood `#7A2230` / soft `#F1E3E5`)**. 진중한 학술 인상 우선. 적색 계열 근접은 인지하고 채택(InBody Red와는 의도적으로 다른 깊은 oxblood로 구분).
- **구현**: `sessions/financial-market/tokens.css`의 `--accent`/`--accent-soft`만 변경. 불변 토큰(타이포·여백·그리드·radius·잉크·surface) 그대로. 표지 eyebrow(`Slide01.module.css`)·Deck deckTitle·개요/콘텐츠 chrome에 반영.

---

## 잠근 토큰 (base 대비 델타)

| 토큰 | base (앱-셸 폴백) | 이 덱 | 비고 |
| --- | --- | --- | --- |
| `--accent` | `#971B2F` | `#7A2230` | D2 — Oxblood |
| `--accent-soft` | `#F4E7E9` | `#F1E3E5` | D2 — Oxblood soft |

> 그 외 모든 토큰(surface·잉크 ramp·타이포 스케일·폰트 weight·여백·그리드·radius)은 **base와 동일**(불변 유지).

## 변수 계약

표준 계약 준수 — `deck-design.md` §2의 변수 목록을 모두 정의한다(`tokens.css`가 base 전체 세트를 갖고 있어 누락 없음).

## 패턴 카탈로그

- **재사용(shared.css)**: `s-hd` 헤더 · `col-grid g2/g3` · `metric` · `blist` · `chip` · `s-foot`.
- **이 덱 고유 (후보, 미확정)**: 2단 대조 블록(미국/한국) · 충격→조달구조→실패 타임라인/흐름 · 출처 캡션. → 2개 이상 슬라이드 반복 시 `shared.css` 승격 판단.
- **레이아웃 아키타입 (후보)**: cover · 섹션 디바이더 · 2단 비교 · metric 쇼케이스 · 차트+캡션 · 클로징.

## 상태

- override 아키텍처: ✅ 확정 (D1, `e895db7`)
- 단일 accent: ✅ 확정 (D2)
- 불변 토큰 유지: ✅
- 패턴 카탈로그: ⬜ 진행 예정
- 개별 슬라이드 (Phase 5 Build): ⬜ (현재 Slide01 표지만 존재)
