# [FEATURE] graduation-review 10장 결론 띠를 관절별 하중 분배로 바꿈

## Document Relations
- Issue: #21
- Branch: `21-feature-graduation-review-slide10-converge` (base main `8f02055`, PR #20 머지 뒤)
- 이전 작업: `docs/issues/feature/19-feature-graduation-review-slide9-converge.md`(#19, PR #20)
- Session doc: `docs/sessions/graduation-review/README.md`
- Code: `app/src/sessions/graduation-review/`

## Summary
10장 아래 결론 띠 "무게가 어디로 갔는가. 무게중심, 관절 하중, 근육까지" 는 구어 문구다. 사용자가 전문 용어로 바꾸자고 했고, 콜론으로 나눈 문구는 빼자고 했다. 새 문구는 2장 띠의 질문("수직 저항 무게중심에 대하여, 관절들의 지지 구조와 담당 근육군이 어떻게 작용했는가?")에 같은 용어로 답한다.

## Goal
- 10장 결론 띠가 "수직 저항 무게중심에서 담당 근육군까지, 관절별 하중 분배 산출" 이다.

## Scope
- `slides/Slide10.jsx`: 결론 띠(`converge`) 문구.
- `slides/index.js`: 10장 `message` 를 같은 뜻으로.

## Out Of Scope
- 10장 본문의 "원인", "결과", "해석" 항목.
- 다른 worktree(`slide-studio-4-graduation`)의 미커밋 변경 `Slide03`~`Slide06`.

## Done Criteria
- [x] 10장 캡처에서 새 결론 띠가 한 줄에 들어간다.
- [x] `index.js` 10장 설명에 "무게가 어디로 갔는가" 가 남지 않는다.

---

## Work Log

### feat: 10장 결론 띠를 관절별 하중 분배로 바꿈 (#21)

> 10장 결론 띠의 구어 문구를 2장 질문과 같은 전문 용어로 바꿨다.

- 10장 결론 띠: "무게가 어디로 갔는가. 무게중심, 관절 하중, 근육까지" 를 "수직 저항 무게중심에서 담당 근육군까지, 관절별 하중 분배 산출" 로. 강조는 "관절별 하중 분배".
- `index.js`: 10장 `message` 를 "수직 저항 무게중심에서 담당 근육군까지, 관절별 하중 분배를 산출한다" 로.
- 확인: `npm run shot graduation-review/10` 캡처에서 결론 띠가 한 줄에 들어간다.
