# Deck Creation Workflow — 공통 발표자료 제작 파이프라인

slide-studio에서 **발표자료(덱)를 만드는 공통 절차**. 모든 세션에 재사용되는 일반 워크플로이며, 특정 발표 전용이 아니다. 현재는 첫 파일럿(`financial-market` 세션을 실제로 만들어보는 과정)을 통해 **구체화되어가는 중**이라, 단계별로 "확정 / 초안 / 미정" 상태를 함께 표기한다.

## Document Relations

- Parent: `docs/agent-workflow/README.md`
- 추적 축(세션 vs 이슈)과의 관계: `docs/README.md`
- 단계별 상세 규칙:
  - Phase 1: `docs/agent-workflow/deck-discovery.md` (+ 참고 `deck-discovery-insights.md`)
  - Phase 3(콘텐츠 채우기): `docs/agent-workflow/deck-content.md`
  - Phase 4~5(슬라이드 작성): `docs/agent-workflow/slides-jsx-convention.md`
- 워크플로가 구체화되면(파일럿에서 배운 것) 이 문서와 해당 단계 문서를 같은 변경에서 갱신한다.

## 원칙

- **메시지 → 구조 → 콘텐츠 → 디자인 → 빌드 → 리허설** 순서. 디자인/슬라이드부터 만들지 않는다.
- 각 단계는 **구체적 산출물(아티팩트)**을 남기고, 다음 단계는 그 아티팩트를 입력으로 받는다.
- 단계 전환은 **사용자 명시 승인**으로만(슬라이드 워크플로의 Pre-Commit Gate와 동일 철학).

## 파이프라인 (6단계)

| Phase | 단계 | 목적 | 산출물 (위치) | 규칙 문서 | 구체화 상태 |
| --- | --- | --- | --- | --- | --- |
| 1 | **Discovery** | 반복 대화로 주제·목표 명확화 → 메시지 도출 | Deck Brief `docs/sessions/<id>/brief.md` | `deck-discovery.md` | ✅ 확정(스펙) |
| 2 | **Structure** | 메시지에서 스토리라인(슬라이드별 한 줄) 도출 | Brief의 storyline 표 → 코드상은 `app/src/sessions/<id>/slides/index.js`의 슬라이드 메타(`group`/`role`/`message`) | (Discovery에 포함, archetype) | 🟡 초안(Discovery에 흡수됨) |
| 3 | **Content** | 슬라이드별 근거·데이터·자산 저해상도로 채움 + 강도 등급·검증 | slide 메타 `body`/`assets`/evidence `grade` + 콘텐츠 워크벤치 `/:sessionId/content` | `deck-content.md` | 🟡 초안(워크벤치) |
| 4 | **Design** | 토큰(색·타이포·여백) 확정 후 슬라이드 디자인 | `app/src/tokens.css`·`shared.css`, `SlideNN.module.css` | `slides-jsx-convention.md` | 🟡 초안(토큰/규칙 존재) |
| 5 | **Build** | 슬라이드 컴포넌트 구현 | `app/src/sessions/<id>/slides/SlideNN.jsx` | `slides-jsx-convention.md` | 🟡 초안 |
| 6 | **Rehearse & Export** | 소리내어 줄이고, 4K PNG/ZIP로 내보내기 | `dist/` PNG/ZIP (ExportControls) | — | ⬜ 미정 |

> 상태 범례: ✅ 스펙 확정 · 🟡 초안/부분 · ⬜ 파일럿으로 구체화 예정.

## 단계 요약

1. **Discovery** — 막연한 출발을 사용자-LLM 대화로 좁혀 메시지(spine)·목표·근거를 Deck Brief에 채운다. 슬롯이 차면 구조가 따라 나온다. (상세·인터뷰 규율: `deck-discovery.md`)
2. **Structure** — `deck_type` archetype에 pillars를 매핑해 슬라이드별 한 줄 outline 생성 → 사용자가 반응해 확정. (현재는 Discovery 단계에 흡수)
3. **Content** — 각 슬라이드에 들어갈 근거·수치·도식의 핵심만 저해상도로 채우고(`body`), 필요한 자산(이미지·데이터)을 목록화·출처/라이선스 확인(`assets`), 근거 강도를 정직하게 등급화(`evidence.grade`)한다. 콘텐츠 워크벤치(`/:sessionId/content`)가 준비도와 Phase 4 게이트를 집계한다. (상세: `deck-content.md`)
4. **Design** — 먼저 토큰(단일 accent·타이포 스케일·여백·그리드)과 반복 패턴 컴포넌트를 정하고, 그 위에 개별 슬라이드를 얹는다.
5. **Build** — 가장 핵심/어려운 슬라이드 1~2장으로 톤을 확정한 뒤 나머지를 그 틀에 맞춰 제작. `dev` 서버로 즉시 확인.
6. **Rehearse & Export** — 소리내어 발표하며 분량을 줄이고(보통 20~30% 삭감), 4K PNG/ZIP로 내보내 투사 환경에서 가독성 점검.

## 핸드오프

```
Discovery(brief) → Structure(outline) → [scaffold] → Build(SlideNN.jsx) → Export(PNG/ZIP)
                                          ↑ outline → 슬라이드 stub 자동 생성(예정)
```

- 1~3단계 산출물은 `docs/sessions/<id>/`(추적·기획)에, 4~5단계는 `app/src/sessions/<id>/`(코드)에 산다.
- 단계 진행 중의 개별 작업은 이슈 단위로 `docs/issues/`에 로그한다.

## 리뷰 UI (검토)

발표 모드(한 장씩)와 별개로, **기획·검토용 리뷰 UI**가 앱 안에 있다. 검토는 사용자가 직접 해야 하므로 화면으로 제공한다.

- **슬라이드 메타**: 각 slide 엔트리(`slides/index.js`)에 렌더용 `component`/`title` 외에 검토용 메타 — `group`(내러티브 섹션), `role`(스토리 내 기능 한 줄), `message`(핵심 주장 한 줄), 선택적으로 `evidence[]`/`visual`/`notes` — 를 둔다. 발표 렌더와 검토 메타가 **단일 소스**다.
- **흐름 뷰 (`/:sessionId/overview`)**: `group` 순서를 레인으로 묶고 노드(번호·role·메시지)를 화살표로 이어 **스키마틱 내러티브 흐름**을 도식화. 지금 기획 단계에선 썸네일이 아니라 논리 흐름이 중요하다(썸네일 스토리보드는 편집 단계 과제).
- **인스펙터**: 흐름 뷰에서 노드를 클릭하면 우측 패널에 해당 슬라이드의 전체 메타가 펼쳐진다(Notion DB 행을 펼쳐 보는 것과 같은 역할).
- 데이터 소스는 **레포 내 메타**로 시작한다. Notion 등 외부는 탐험용이며, 동기화가 필요해지면 별도 과제로 붙인다.
- 슬라이드 컴포넌트 작성 규칙: `slides-jsx-convention.md`.

## 파일럿 메모

- 현재 워크플로는 `financial-market` 세션을 실제로 만들어보며 구체화하는 중이다. 파일럿에서 "이 단계엔 이런 산출물·규칙이 필요하다"가 드러나면 위 표의 상태를 올리고 해당 단계 문서를 신설/갱신한다.
- 파일럿 과정에서 나온 일반화 가능한 관찰은 단계 문서의 "인사이트 참고자료"로 분리해 둔다(예: `deck-discovery-insights.md`, `deck-content-insights.md`). 규칙과 사례 관찰을 섞지 않는다.
