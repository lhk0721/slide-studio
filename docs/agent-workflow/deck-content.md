# Deck Content — 저해상도 콘텐츠 채우기 단계 명세

발표자료 제작 파이프라인의 **3단계(Content)** 규칙. 구조(스토리라인)가 확정된 뒤, 디자인·빌드로 넘어가기 전에 **각 슬라이드의 알맹이**(본문·자산·근거)를 저해상도로 확정한다. 디자인은 하지 않는다.

## Document Relations

- Parent: `docs/agent-workflow/deck-workflow.md` (6단계 파이프라인의 Phase 3)
- 선행: `deck-discovery.md`(Phase 1~2 Brief/Structure) — Brief의 `pillars`/`evidence`가 입력
- 후행: `slides-jsx-convention.md`(Phase 4~5 디자인/빌드)
- 인사이트 참고(사례 관찰·시스템 설계 고려사항, 규칙 아님): `docs/agent-workflow/deck-content-insights.md`
- 코드 산출물: `app/src/sessions/<id>/slides/index.js` slide 메타, 워크벤치 `app/src/components/Content.jsx`

## 핵심 원리

> 디자인이 아니라 **알맹이를 먼저 닫는다.** 없는 데이터에 레이아웃을 맞추면 후반 비용이 폭증한다. 사실·근거는 구조를 확정하기 전에 검증하고, 근거 강도를 정직하게 등급화해 강한 데이터에 무게중심을 싣는다(비대칭 전략).

## 1. Phase 3 산출물 (slide 메타 확장)

Phase 1~2의 `group`/`role`/`message`에 더해, 각 slide 엔트리에 다음을 채운다.

| 필드 | 의미 | 형태 |
| --- | --- | --- |
| `body` | 실제 슬라이드에 들어갈 **저해상도 본문**(글머리표) | `string[]` |
| `evidence` | 근거/수치. 문자열 또는 객체 | `(string \| { stat, source?, url?, verify?, grade? })[]` |
| `assets` | 필요한 시각·데이터 **자산 목록** | `{ kind, desc, source?, license?, status }[]` |

- `evidence.grade`: `'strong' \| 'medium' \| 'weak'` — **작성자가 명시한** 근거 강도. 추정하지 않는다.
- `evidence.verify`: 값이 있으면 "미검증/확인 필요"로 집계된다.
- `assets.status`: `'need'`(미확보) · `'check'`(출처·라이선스·수치 확인필요) · `'data-ready'`(데이터·소재 확보·확정, **작도만 Phase 4에 남음**) · `'have'`(완전 확보/제작완료).
  - **data-ready ≠ render-ready**(insight #6): 콘텐츠 단계 산출물은 "차트 입력 데이터셋·도식 구조 확정"까지이고 실제 작도는 Phase 4다. 근거 검증으로 수치·출처가 확정된 차트는 `check`가 아니라 `data-ready`로 둔다. 자체 작도 도식도 구조가 정해지면 `data-ready`.

## 2. 작업 규율

- **저해상도만**: 문장 다듬기·디자인 금지. 주장-증거-자산의 뼈대만.
- **근거 강도 정직 등급화**: 각 근거를 강/중/약으로 매긴다. 강한 근거에 슬라이드 무게를 싣고, 약한 근거는 약한 채로 둔다(부풀리지 않는다).
- **사실 우선 검증**: 출처를 1차 출처까지 좁히고, 수치·인용을 확인한다. 출처를 못 맞추면 거짓으로 메우지 말고 `verify`로 남긴다.
- **자산은 출처·라이선스까지**: 쓸 이미지/데이터를 목록화하고 확보 상태와 라이선스를 기록한다. `need`/`check`가 남으면 빌드로 넘어가지 않는다(`data-ready`/`have`는 콘텐츠 단계 완료로 본다 — 작도는 Phase 4).
- **반례로 직관 검증**: 직관은 반례를 찾아 깨보고, 깨지면 더 강한 논제로 흡수한다.

## 3. 콘텐츠 워크벤치 (`/:sessionId/content`)

검토는 사람이 해야 하므로 화면으로 집계한다. slide 메타를 입력으로:

- **준비도 대시보드**: 본문 작성 n/N · 자산 준비 n/N(확보·작도대기·확인·필요 분해) · 근거 강도 분포(강·중·약) · 미검증 근거 수 · 준비 완료 슬라이드 n/N.
- **Phase 4 게이트**: 모든 슬라이드가 (본문 작성 ✓ · 자산이 전부 `data-ready` 또는 `have` · 미검증 근거 0)이면 Design 단계로 넘어갈 수 있다. `need`/`check`가 하나라도 남으면 보완 목록(구체 항목별로 무엇이 왜 막혔는지)을 보여준다.
- **보완 목록**: 차단 항목을 슬라이드 단위가 아니라 **구체 항목 단위**로(본문 미작성 / 자산·확보 필요 / 자산·확인 필요 / 미검증 근거) 펼치고, 각 항목을 클릭하면 해당 슬라이드 행으로 점프한다.
- **슬라이드별 행**: 본문 / 자산(상태 칩) / 근거(강도 칩 + 미검증 배지)를 한 줄에. 행에서 그 슬라이드의 개요 인스펙터(`?slide=N`)로 바로 이동.

> grade 미평가 객체는 '참고'(출처/서지), 문자열 근거는 '논증'으로 표시되며 강도 분포에는 집계하지 않는다.

## 4. 핸드오프

```
Structure(outline/메타) → Content(body·assets·evidence+grade 채움) → [게이트] → Design
```

- 게이트는 **사용자 명시 승인**으로만 넘어간다(파이프라인 공통 철학).
- 이 단계의 파일 변경도 `docs/issues/`의 관리 문서에 커밋 단위로 기록한다(`documentation-rules.md`).
