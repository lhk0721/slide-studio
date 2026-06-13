# [DOCS] Deck discovery (Phase-1) spec
Parent: #<issue-number>

> 이슈 번호는 아직 GitHub 이슈가 없어 로컬 placeholder다. `gh issue create` 후 실제 번호로 정렬한다.

## Document Relations
- This document tracks the deck-discovery spec work unit.
- Spec artifact: `docs/agent-workflow/deck-discovery.md`
- Keep this file name aligned with the issue branch name once the real number exists.

## Summary
발표자료 제작 파이프라인 1단계(주제·목표 명확화)를 시스템화하기 위한 명세를 작성한다. 사용자-LLM 반복 대화로 Deck Brief 슬롯을 채우고, 그 부산물로 스토리라인을 생성하는 규칙(인터뷰 규율·슬롯 스키마·archetype·상태기계·산출물 경로)을 확정한다. `/new-deck` 커맨드와 scaffolder가 이 문서를 읽고 동작하도록 한다.

## Goal
- "과하게 주도하지 않으면서 끌어내는" 인터뷰 규율을 체크 가능한 규칙으로 박제.
- Deck Brief를 이 단계의 단일 산출물로 정의(슬롯 + confidence 상태).
- 명확화 → 구조 생성을 결정론적 핸드오프로 설계.

## Scope
- `docs/agent-workflow/deck-discovery.md` 신설.
- `docs/agent-workflow/deck-discovery-insights.md` 신설 (실제 discovery 대화 1건 관찰 → Phase-1 인사이트 참고자료).
- workflow 인덱스 연결: `agent-workflow/README.md`(children + read order), `AGENTS.md`(read order), `deck-discovery.md`(인사이트 링크).

## Out Of Scope
- `/new-deck` 슬래시 커맨드 구현 (다음 작업 단위).
- outline → 슬라이드 stub scaffolder 구현 (다음 작업 단위).
- 실제 financial-market Brief 작성.

## Done Criteria
- 슬롯 스키마·인터뷰 규율·archetype·상태기계·brief 템플릿이 한 문서에 정리됨.
- 사용자가 설계에 합의.

---

## Work Log

### docs: add deck-discovery phase-1 spec (#<issue-number>)

> 발표자료 제작 1단계(주제·목표 명확화)의 명세 신설 및 워크플로 인덱스 연결.

#### Changes
- `docs/agent-workflow/deck-discovery.md` 신설: Deck Brief 슬롯 스키마(8 슬롯 + storyline 파생), 인터뷰 규율(한 번에 한 질문·미러링·선택지 제시·왜 사다리·충돌 들추기·위임 허용), 슬롯별 비유도 질문 뱅크, 4 archetype, storyline 생성 규칙, 상태기계+핸드오프, brief 프론트매터/템플릿.
- `docs/agent-workflow/README.md`: children 목록 + read order에 deck-discovery 추가.
- `AGENTS.md`: 새 덱 시작 시 read order에 deck-discovery 추가.

#### Notes
- 다음 작업 단위 후보: `/new-deck` 커맨드, outline scaffolder.

### docs: add deck-discovery insights from observed conversation (#<issue-number>)

> 실제 사용자-Claude discovery 대화 1건을 관찰해 "결론을 효율적으로 끌어낸 방법"을 Phase-1 인사이트 참고자료로 정리. 규칙(spec)과 분리하고 과적합 경계를 명시.

#### Changes
- `docs/agent-workflow/deck-discovery-insights.md` 신설: 8개 효율 기법(메뉴 제시·숨은 평가기준·프레임 격상·사실 선검증·반례 흡수·근거 비대칭·scope 경고·아티팩트 수렴) + 안티패턴(제약 확정 전 과투자) + 과적합 경계.
- `docs/agent-workflow/deck-discovery.md`: Document Relations에 인사이트 링크 추가.

#### Notes
- 사용자가 실제 발표(국제시장과 금융기관)는 Notion에서 수동 진행 중 → slide-studio에는 그 덱 내용을 넣지 않음. 잠깐 작성했던 `docs/sessions/financial-market/brief.md`와 README/registry 실제 내용은 되돌려 placeholder로 복원.

### docs: add deck-workflow pipeline overview (#<issue-number>)

> 발표자료 제작 공통 파이프라인(6단계) 상위 개요 신설. Phase별 산출물·규칙 문서·구체화 상태를 한 표로. financial-market는 워크플로를 끌어내는 파일럿으로 명시(전용 아님).

#### Changes
- `docs/agent-workflow/deck-workflow.md` 신설: 6단계(Discovery→Structure→Content→Design→Build→Rehearse&Export) 표 + 단계 요약 + 핸드오프 + 파일럿 메모.
- `docs/agent-workflow/README.md`: children + read order에 deck-workflow 추가, insights도 children에 추가.

---

## Management Notes

### Follow-up Candidates
- `/new-deck` discovery 에이전트(슬래시 커맨드) 구현.
- outline → 슬라이드 stub scaffolder.
- financial-market 세션 Brief 실제 작성(시범 검증).

### References
- 출처 영감: 사용자-Claude 대화로 주제를 명확화하니 구조가 도출된 사례.
