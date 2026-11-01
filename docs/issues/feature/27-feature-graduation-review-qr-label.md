# [FEATURE] graduation-review 12장 QR 아래에 배너와 같은 이름표 추가

## Document Relations
- Issue: #27
- Branch: `27-feature-graduation-review-qr-label` (base main `552404d`, PR #26 머지 뒤)
- 이전 작업: `docs/issues/feature/25-feature-graduation-review-qr-slide.md`(#25, PR #26)
- Session doc: `docs/sessions/graduation-review/README.md`
- Code: `app/src/sessions/graduation-review/`

## Summary
#25 에서는 racktracker.dev 에 보고서·발표 자료 페이지가 없다고 보고 QR 아래 이름표를 뺐다. 그때 주소 끝 `/` 없이 `/report`, `/slides` 를 열어 404 를 받았기 때문이다. 실제로는 `/report/`(PDF 포함)와 `/slides/` 가 이미 열린다. 사용자가 배너와 같은 이름표 「Project Report, PT slide」 를 붙이기로 골랐다.

## Goal
- 12장 주소 아래에 「Project Report, PT slide」 가 있다.

## Scope
- `slides/Slide12.jsx`, `Slide12.module.css`: 이름표 한 줄(본문 크기, 회색).
- `slides/index.js`: 12장 `visual`.

## Out Of Scope
- QR 이 가리키는 주소. 그대로 `https://racktracker.dev/` 다.
- PowerPoint 판.

## Done Criteria
- [x] 12장 캡처에서 주소 아래에 이름표가 보이고 QR 크기는 그대로다.
- [x] 캡처한 화면의 QR 을 읽으면 https://racktracker.dev/ 가 나온다.

---

## Work Log

### feat: 12장 QR 아래에 배너와 같은 이름표 추가 (#27)

> 12장 주소 아래에 「Project Report, PT slide」 를 붙였다.

- `Slide12`: 주소 아래에 이름표 한 줄(`--fs-body`, `--muted`). QR 크기(36rem)는 그대로.
- `index.js`: 12장 `visual` 에 이름표.
- 확인: `npm run shot graduation-review/12` 캡처에서 이름표가 주소 아래에 보이고, 캡처를 OpenCV 로 읽으면 `https://racktracker.dev/` 가 나온다. `/report/`, `/report/RackTracker_Project_Report.pdf`, `/slides/` 모두 200.
