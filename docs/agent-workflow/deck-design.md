# Deck Design — 디자인 시스템 단계 명세 (Phase 4)

발표자료 제작 파이프라인의 **4단계(Design)** 규칙. 콘텐츠(Phase 3)가 게이트를 통과한 뒤, 개별 슬라이드를 그리기 **전에** 이 덱의 **디자인 시스템**(토큰 + 반복 패턴)을 먼저 잠근다. 이 문서는 그 단계의 "헌법"이다 — 무엇을 어떤 순서로 결정하고, 결정을 어떻게 끌어내며(선택지 제시), 무엇을 산출물로 남기는지.

## Document Relations

- Parent: `docs/agent-workflow/deck-workflow.md` (6단계 파이프라인의 Phase 4)
- 선행: `deck-content.md`(Phase 3) — 콘텐츠 워크벤치 게이트(`/:sessionId/content`)가 통과 상태여야 입력으로 받는다.
- 후행: `slides-jsx-convention.md`(Phase 5 Build) — 잠근 토큰·패턴 위에 `SlideNN.jsx`/`.module.css`를 얹는다.
- 산출물: `docs/sessions/<id>/design.md`(이 단계의 Design Spec — 잠근 토큰 델타 + 패턴 카탈로그 + 변수 계약 + 결정 로그), `app/src/sessions/<id>/tokens.css`(실제 override).
- 공용 자산: `app/src/shared.css`(공통 슬라이드 패턴), `app/src/tokens.css`(앱-셸 폴백 토큰).

## 핵심 원리

> **전역 디자인 시스템을 매 덱 새로 만들지 않는다.** 공용 패턴(`shared.css`)은 이미 있다. 이 단계는 그 위에서 **이 덱의 토큰 델타**와 **이 덱이 필요한 반복 패턴**만 결정하고, 규율을 점검 가능한 형태로 박은 뒤, 산출물로 닫는다. Discovery가 `brief.md`로 닫히듯 Design은 `design.md`로 닫힌다.

규율 두 줄을 초반에 고정하면 후반 정리 비용이 급감한다:
- **보더보다 여백** — 구분은 거터·여백으로, 선/박스는 최소(헤더 밑 hairline 1개 수준).
- **한 슬라이드 한 강조** — accent는 한 덱에 1색, 한 화면에 강조 1곳.

---

## 1. 결정 항목 (이 단계에서 잠그는 것)

순서대로 잠근다. 각 항목은 상태를 가진다: `미정` → `제시`(선택지 제시·확인 대기) → `확정`(사용자 명시 승인).

| # | 결정 | 사는 곳 | 비고 |
| --- | --- | --- | --- |
| 0 | **override 아키텍처** | 전역(아래 §2) | 레포 전체에 한 번. 새 세션은 골격을 따른다 |
| 1 | **토큰 델타** — 단일 accent · surface · 폰트 · 밀도 | `sessions/<id>/tokens.css` | 색·폰트·밀도만 세션마다 갈라진다 |
| 2 | **불변 토큰 유지 확인** — 타이포 스케일 · 여백 스텝 · 그리드 · radius | (변경 안 함) | 갈라지면 `design.md`에 이유를 기록 |
| 3 | **반복 패턴 카탈로그** — 헤더 · 2/3단 그리드 · metric 블록 · 이 덱 고유 패턴 | `shared.css`(승격) 또는 `SlideNN.module.css` | §5 |
| 4 | **규율 고정** — 보더보다 여백 · 한 슬라이드 한 강조 | `slides-jsx-convention.md` 체크리스트 | |
| 5 | **산출물** — `design.md` + `tokens.css` | `docs/sessions/<id>/`, `app/src/sessions/<id>/` | §6 (exit gate) |

---

## 2. override 아키텍처 (전역 1회 결정 — 이미 잠금)

세션(덱)마다 테마가 다를 수 있으므로, **토큰을 세션별로 소유**하되 두 덱이 서로의 토큰을 보지 않게 스코프한다. 레포 전체 골격은 다음으로 잠겼다(첫 파일럿 `financial-market`에서 결정, 커밋 `e895db7`):

- **세션별 토큰 파일 완전 분리**: 각 덱의 디자인 토큰 전체를 `app/src/sessions/<id>/tokens.css`에 둔다. 공유하는 것은 패턴(`shared.css`)뿐.
- **`[data-theme="<id>"]` 스코프**: 세션 토큰은 `:root`가 아니라 `[data-theme="<id>"] { … }`로 감싼다(분리해도 두 덱의 `:root`가 충돌하므로 스코프는 필수). 슬라이드가 렌더되는 모든 곳이 이 속성을 단다:
  - `Deck.jsx`(`.wrapper`) · `Overview.jsx`/`Content.jsx`(`.screen`) 루트에 `data-theme={sessionId}`.
  - **내보내기**: 오프스크린 stage엔 `.deck` 조상이 없어 `var(--…)`가 폴백으로 샌다 → `exportSlides.jsx`가 `theme`을 받아 `stage.dataset.theme`을 설정.
  - 인접 상속(트리 근접성)으로 덱 서브트리는 그 세션 토큰을, 세션 없는 표면(`<body>`·Home 피커)은 폴백을 해석한다.
- **base = 앱-셸 폴백**: `app/src/tokens.css`의 `:root`는 **세션 없는 표면 전용** 폴백이다. 덱 디자인 토큰을 소유하지 않는다. **새 세션은 자기 `tokens.css`를 반드시 ship**해야 하며, 폴백에서 덱 테마를 상속하지 않는다.
- **로딩**: 각 세션 `slides/index.js` 상단에서 `import '../tokens.css'`(co-located).

### 변수 계약 (consistency를 코드가 강제 못 하는 것의 안전망)

완전 분리의 유일한 리스크는 "타이포·그리드까지 세션마다 갈라져도 코드가 못 막는다"이다. 두 장치로 메운다:

1. **변수 계약**: `shared.css`가 의존하는 변수 목록을 "모든 세션 `tokens.css`가 반드시 정의하는 인터페이스"로 본다. 누락하면 패턴이 깨지므로 이것이 사실상의 안전망이다. (현재 계약: `--bg/-2/-3` · `--card` · `--page` · `--text/-sub/-muted/-rule/-ghost` · `--ink-rgb` · `--accent/-soft` · `--glass` · `--border-soft/-hair` · `--hint` · `--vignette-*` · `--shadow-*` · `--fs-display/-title/-heading/-body/-caption` · `--fw-*` · `--W/-H/-gx/-radius`)
2. **불변 권장 블록**: 타이포 스케일 · 여백 스텝 · 그리드 · radius는 base에서 그대로 복사하고, `design.md`에 "base에서 바꾼 토큰과 이유"만 기록한다. → 색·폰트·밀도만 갈라지고 골격은 유지됨이 리뷰로 보인다.

---

## 3. 토큰 결정 규율

- **단일 accent**: 한 덱에 강조색 1개. 브랜드/세션 톤에 맞추되 다른 덱과 분명히 갈라지게. 흰 배경에서 키 숫자·라벨·deckTitle용으로 쓰이므로 **AA 대비** 확보. `--accent-soft`(≈8% 틴트)는 chip/soft 배경용.
- **색·폰트·밀도만 override**, 골격(타이포·여백·그리드·radius)은 불변. 폰트는 Pretendard 변수 유지(한글 글리프 + 내보내기 data-URL 임베드). 바꾸면 내보내기 영향 확인.
- 비교/대조 덱이라도 "미국색 vs 한국색"으로 가르지 않는다 — 그건 "한 슬라이드 한 강조" 위반. 대조는 레이아웃(좌/우)·잉크 농담으로, accent는 1색 유지.

---

## 4. 결정 메커니즘 — 선택지로 되돌려준다 (재현 가능)

Discovery의 "결론이 아니라 선택지" 규율을 디자인 결정에 그대로 적용한다.

- LLM이 색·아키텍처를 **임의로 확정하지 않는다.** 후보 N개(2~4)를 제시하고 사용자가 반응·선택한다.
- 각 후보는 **추천 1개를 맨 앞**에 두고(라벨에 "(추천)"), 근거/트레이드오프와 **프리뷰**(색이면 hex + 사용처 목업, 아키텍처면 코드 스케치)를 함께 준다.
- 각 결정은 **사용자 명시 승인**으로만 잠근다(Pre-Commit Gate 철학).
- 잠근 결정은 `design.md`의 **결정 로그**에 선택 + **탈락 선택지까지** 기록한다(provenance — 왜 다른 길로 안 갔는지가 후반 재논의를 막는다).

---

## 5. 패턴 카탈로그

- **재사용 우선**: `shared.css`의 공통 패턴(`s-hd` 헤더 · `col-grid g2/g3/g4` · `metric` · `blist` · `chip` · `s-foot`)을 먼저 쓴다.
- 이 덱이 추가로 필요한 **반복 패턴만** 식별한다(예: 비교 덱이면 2단 대조 블록 · 타임라인/흐름 · 출처 캡션). 2개 이상 슬라이드에서 반복되면 `shared.css`로 승격, 한 슬라이드 전용이면 `SlideNN.module.css`에 둔다.
- **슬라이드 레이아웃 아키타입 목록**을 미리 정한다(cover · 섹션 디바이더 · 2단 비교 · metric 쇼케이스 · 차트+캡션 · 클로징). 개별 슬라이드는 이 목록의 인스턴스가 된다.

---

## 6. 산출물 & exit gate

- **`docs/sessions/<id>/design.md`**: 잠근 토큰 델타 + 패턴 카탈로그 + 변수 계약 + 결정 로그(선택+탈락지).
- **`app/src/sessions/<id>/tokens.css`**: 실제 override(`[data-theme="<id>"]`).
- (필요 시) `shared.css`에 승격된 공용 패턴.
- **exit gate**: 위 산출물에 대해 **사용자 명시 승인** → Phase 5(개별 슬라이드 빌드) 착수. 상태기계:

```
content-gate 통과 → 토큰 델타 확정 → 패턴 카탈로그 확정 → design.md 승인 → build(SlideNN)
```

- 이 단계의 파일 변경도 `docs/issues/`의 관리 문서에 커밋 단위로 기록한다(`documentation-rules.md`).

### 향후 (라우트 가능성)

Phase 3가 콘텐츠 워크벤치(`/:sessionId/content`)라는 라우트로 시스템화됐듯, Phase 4도 **디자인 워크벤치 라우트**(예: `/:sessionId/design` — 토큰 미리보기·대비 점검·패턴 카탈로그 뷰)로 확장될 수 있다. 지금은 `design.md` + 선택지 메커니즘으로 시작하고, 파일럿에서 화면이 필요해지면 별도 과제로 붙인다.

---

## 7. design.md 템플릿

```md
---
session_id: <id>
phase: design
status: in-progress | tokens-locked | patterns-locked | design-confirmed
---

# Design Spec: <세션 제목>

## 결정 로그
### D1 — <결정 이름> (<날짜>)
- 질문: <무엇을 정했나>
- 선택지: <후보들 + (추천) 표시 + 핵심 트레이드오프>
- 결정: <선택> — <근거>. (탈락: <왜 안 갔는지 한 줄>)
- 구현: <커밋/파일>

## 잠근 토큰 (base 대비 델타)
| 토큰 | base | 이 덱 | 비고 |
| --- | --- | --- | --- |
| --accent | … | … | … |
(델타만; 불변 토큰은 "base와 동일"로 생략)

## 변수 계약
- 이 덱 tokens.css가 정의해야 하는 변수(= shared.css 의존): <목록 또는 "표준 계약 준수">

## 패턴 카탈로그
- 재사용(shared.css): <쓰는 것>
- 이 덱 고유: <패턴 → shared 승격 / 세션 module>
- 레이아웃 아키타입: <목록>

## 상태
- override 아키텍처 / accent / 불변 토큰 / 패턴 카탈로그 / 개별 슬라이드(Phase 5)
```
