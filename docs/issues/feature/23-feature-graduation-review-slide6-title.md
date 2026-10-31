# [FEATURE] graduation-review 6장 제목을 운용절차로 바꿈

## Document Relations
- Issue: #23
- Branch: `23-feature-graduation-review-slide6-title` (base main `fad9435`, PR #22 머지 뒤)
- 이전 작업: `docs/issues/feature/21-feature-graduation-review-slide10-converge.md`(#21, PR #22)
- Session doc: `docs/sessions/graduation-review/README.md`
- Code: `app/src/sessions/graduation-review/`

## Summary
6장 제목 "네 절차" 에 "운용절차" 라는 말을 넣자고 사용자가 정했다. 제목은 "운용절차" 하나로 한다. 7~10장 위쪽 section 표시도 "05 · 네 절차 ①~④" 였으므로 같이 바꿔, 덱 안에서 이름이 하나가 되게 한다.

## Goal
- 6장 제목이 "운용절차" 다.
- 7~10장 section 표시가 "05 · 운용절차 ①~④" 다.

## Scope
- `slides/Slide06.jsx`: 제목(`title`).
- `slides/Slide07.jsx`~`Slide10.jsx`: `section`.
- `slides/index.js`: 6장 `title`·`visual`, 7~10장 `group`.

## Out Of Scope
- 6장 결론 띠의 "측정 운용". 제목과 "운용" 이 겹치지만 이번에는 그대로 둔다.
- 다른 worktree(`slide-studio-4-graduation`)의 미커밋 변경 `Slide03`.
- PowerPoint 판(PNG 배경) 다시 뽑기.

## Done Criteria
- [x] 6장, 7장 캡처에서 새 제목과 section 표시가 보인다.
- [x] `graduation-review` 세션 코드에 "네 절차" 가 남지 않는다.

---

## Work Log

### feat: 6장 제목을 운용절차로 바꿈 (#23)

> 6장 제목과 7~10장 section 표시를 "운용절차" 로 맞췄다.

- 6장 제목: "네 절차" 를 "운용절차" 로.
- 7~10장 section: "05 · 네 절차 ①~④" 를 "05 · 운용절차 ①~④" 로.
- `index.js`: 6장 `title` 을 "운용절차", `visual` 을 "운용절차 네 단계의 태블릿 화면(보고서 그림 7)", 7~10장 `group` 을 "운용절차" 로.
- 확인: `npm run shot graduation-review/6`, `graduation-review/7` 캡처에서 새 제목과 section 표시가 보인다. 세션 코드에 "네 절차" 가 남지 않는다.
