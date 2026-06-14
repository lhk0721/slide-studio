# Session: financial-market — 같은 충격, 다른 실패 (미·한 피트니스 시장 비교)

## Document Relations

- Parent index: `docs/sessions/README.md`
- Code: `app/src/sessions/financial-market/`
- Route: `/financial-market/1` (발표) · `/financial-market/overview` (흐름) · `/financial-market/content` (콘텐츠 워크벤치)
- 디자인 결정 기록: `docs/sessions/financial-market/design.md`
- 이슈(작업 로그): `docs/issues/feature/2-feature-content-workbench.md`

## Summary

동일한 코로나 충격이 **자본 조달 구조 차이**를 거쳐 미국(자본시장 거품·붕괴)과 한국(파편화·폐업)의 서로 다른 시장실패로 귀결된 과정을 비교하는 발표(국제시장과 금융기관, 발표자 이현규). Notion 기획 트래커에서 내러티브 메타를 이식했다.

## 청중 / 목적

- 청중: 강의 평가자/수강생 (학술 발표).
- 목적: "시장실패는 하나의 형태가 아니라 구조의 함수다"를 미·한 피트니스 사례 비교로 논증.

## 슬라이드 구성 (12)

| # | 제목 | 그룹 | 상태 |
| --- | --- | --- | --- |
| 1 | 표지 | 도입 | 구현 완료 |
| 2 | 문제 제기 — 같은 출발, 다른 결말 | 문제 제기 | 구현 완료 |
| 3 | 분석 틀 — 시장실패와 자본 조달 | 분석 틀 | 구현 완료 |
| 4 | 미국 ① — 자본이 몰리다 | 미국 사례 | 구현 완료 |
| 5 | 미국 ② — 거품이 꺼지다 | 미국 사례 | 구현 완료 |
| 6 | 미국 ③ — 그런데 트레이너는 살아남았다 | 미국 사례 | 구현 완료 |
| 7 | 한국 ① — 거품 대신 파편화 | 한국 사례 | 구현 완료 |
| 8 | 한국 ② — 과잉경쟁과 오프라인 붕괴 | 한국 사례 | 구현 완료 |
| 9 | 한국 ③ — 트레이너는 비용으로 남았다 | 한국 사례 | 구현 완료 |
| 10 | 종합 — 구조가 운명을 가른다 | 종합 | 구현 완료 |
| 11 | 시사점 & 결론 | 결론 | 구현 완료 |
| 12 | 참고자료 | 부록 | 구현 완료 |

> 슬라이드 순서·메타의 source of truth는 `app/src/sessions/financial-market/slides/index.js`.

## 진행 상태 (파이프라인)

- Phase 1~2 (Discovery/Structure): ✅ (Notion 이식 메타)
- Phase 3 (Content): ✅ 게이트 통과 — 준비 완료 11/12, 미검증 근거 0. 남은 차단: s1 헬스장 셔터 실물 사진(`need`) 1건. (상세: `docs/issues/feature/2-feature-content-workbench.md`)
- Phase 4 (Design): ✅ — override 아키텍처·단일 accent(Oxblood)·패턴 카탈로그 확정. (상세: `design.md`)
- Phase 5 (Build): ✅ 12/12 구현 완료 — DivergenceFlow·차트+캡션·Asset/Cost·인과 체인 등 패턴으로. 자가검수 루프(`npm run shot`)로 각 장 렌더 대조.

## 자산 / 디자인 메모

- 자산 목록·출처·라이선스·상태는 slide 메타 `assets[]`와 콘텐츠 워크벤치(`/financial-market/content`)가 단일 소스로 집계.
- 디자인 토큰: 이 세션은 `app/src/sessions/financial-market/tokens.css`(`[data-theme="financial-market"]`)를 소유한다. 단일 accent = Oxblood `#7A2230`(InBody Red와 의도적 구분). 불변 토큰(타이포·여백·그리드)은 base와 동일. (근거·탈락 선택지: `design.md`)
