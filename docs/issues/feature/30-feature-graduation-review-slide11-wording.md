# [FEATURE] graduation-review 11장 결론 띠 문구를 자연스럽게

## Document Relations
- Issue: #30
- Branch: `30-feature-graduation-review-slide11-wording` (base main `dec0c1d`, PR #29 머지 뒤)
- 이전 작업: `docs/issues/feature/19-feature-graduation-review-slide9-converge.md`(#19, PR #20), `docs/issues/feature/17-feature-graduation-review-slide11-compare.md`(#17, PR #18)
- Session doc: `docs/sessions/graduation-review/README.md`
- Code: `app/src/sessions/graduation-review/`

## Summary
11장 결론 띠 "단안 모델이 못 하는 표준화된 공간 좌표계 위 3D 관절, 관절 하중 산출의 바탕" 은 관형절을 겹쳐 쌓은 문구라 읽기 어렵다고 사용자가 지적했다. 표의 두 열(랙 트래커, InstantHMR)을 그대로 맞세우는 말 "단안 모델은 자세 모양까지, 랙 트래커는 실제 공간의 3D 관절과 관절 하중까지" 로 바꿨다.

## Goal
- 결론 띠가 표의 내용을 한 번에 읽히는 말로 요약한다.

## Scope
- `slides/Slide11.jsx` 의 `converge` 문구만. 표 행 "표준화된 공간 좌표계 위 3D 관절" 과 각주는 그대로.

## Done Criteria
- [x] 11장 캡처에서 결론 띠가 한 줄이고 넘침이 없다.

---

## Work Log

### feat: 11장 결론 띠를 표의 두 열을 맞세우는 말로 바꿈 (#30)

> "단안 모델이 못 하는 표준화된 공간 좌표계 위 3D 관절, 관절 하중 산출의 바탕" 을 "단안 모델은 자세 모양까지, 랙 트래커는 실제 공간의 3D 관절과 관절 하중까지" 로.

- 강조는 "실제 공간의 3D 관절". 표 행의 "표준화된 공간 좌표계 위 3D 관절" 을 결론 띠에서는 쉬운 말로 받았다.
- 확인: `npm run shot graduation-review/11` 캡처에서 결론 띠가 한 줄이다.
