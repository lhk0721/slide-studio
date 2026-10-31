# [FEATURE] graduation-review 9장·11장 결론 띠 문구를 바로잡음

## Document Relations
- Issue: #19
- Branch: `19-feature-graduation-review-slide9-converge` (base main `619c2e8`, PR #18 머지 뒤)
- 이전 작업: `docs/issues/feature/17-feature-graduation-review-slide11-compare.md`(#17, PR #18)
- Session doc: `docs/sessions/graduation-review/README.md`
- Code: `app/src/sessions/graduation-review/`

## Summary
9장과 11장 아래 결론 띠의 문구를 바꾼다. 9장의 "한 대가 가려도 남은 두 대로 산출" 은 카메라 한 대가 통째로 가려지는 것처럼 읽히고, 무엇을 산출하는지가 빠져 있다. 실제로 가려지는 것은 한 카메라 화면 속 관절이고, 삼각측량은 관절마다 시점 둘 이상이 남으면 3D 관절을 산출한다(rack-tracker `backend/service/batch_multiview_triangulation.py`). 11장의 부스 안내는 사용자가 다른 내용으로 바꾸자고 했다.

## Goal
- 9장 결론 띠가 관절 단위 판정과 산출 대상을 말한다.
- 11장 결론 띠가 검증 결론, 곧 표준화된 공간 좌표계 위 3D 관절이 관절 하중 산출의 바탕이라는 것을 말한다.

## Scope
- `slides/Slide09.jsx`: 결론 띠를 "관절마다 두 대만 보여도 3D 관절 산출" 로.
- `slides/Slide11.jsx`: 결론 띠를 "단안 모델이 못 하는 표준화된 공간 좌표계 위 3D 관절, 관절 하중 산출의 바탕" 으로.
- `slides/index.js`: 9장 `message` 와 `body` 마지막 줄, 11장 `role` 과 `body` 마지막 줄을 새 문구에 맞춘다.

## Out Of Scope
- 다른 worktree(`slide-studio-4-graduation`)의 미커밋 변경 `Slide03`~`Slide06` 은 이 작업이 아니다(주인 미확인).
- rack-tracker #651 시연 영상 15 장면 대사의 같은 문구는 그쪽 issue 에서 다룬다.

## Done Criteria
- [x] 9장과 11장 캡처에서 새 결론 띠가 한 줄에 들어간다.
- [x] `index.js` 의 9장·11장 설명과 슬라이드 문구가 같은 뜻이다.

---

## Work Log

### feat: 9장·11장 결론 띠 문구를 관절마다 두 대 기준과 검증 결론으로 바꿈 (#19)

> 9장 결론 띠가 관절 단위 판정과 산출 대상을 말하게 하고, 11장의 부스 안내를 검증 결론으로 바꿨다.

- 9장 결론 띠: "한 대가 가려도 남은 두 대로 산출" 을 "관절마다 두 대만 보여도 3D 관절 산출" 로. 강조는 "두 대".
- 11장 결론 띠: "부스 9번, 리그 실물 측정 체험" 을 "단안 모델이 못 하는 표준화된 공간 좌표계 위 3D 관절, 관절 하중 산출의 바탕" 으로. 강조는 비교 표 강조 줄과 같은 "표준화된 공간 좌표계 위 3D 관절".
- `index.js`: 9장 `message` 를 "세 광선이 만나는 점이 3D 관절이고, 관절마다 두 대만 보여도 산출한다" 로, `body` 마지막 줄을 "관절마다 두 대만 보여도 3D 관절을 산출한다" 로. 11장 `role` 을 "정확도 · 마무리" 로, `body` 마지막 줄을 11장 결론 띠와 같은 뜻으로.
- 확인: `npm run shot graduation-review/9`, `graduation-review/11` 캡처에서 두 결론 띠가 한 줄에 들어간다.
- 남은 것: `index.js` 11장 `message`·`body` 둘째 줄·`visual` 에 PR #18 이전 내용("2배", "2.0배, 2.1배", "그림 25")이 남아 있다. 이번 작업 범위 밖이다.
