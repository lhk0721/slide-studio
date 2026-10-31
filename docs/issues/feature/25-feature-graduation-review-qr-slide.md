# [FEATURE] graduation-review 마지막에 racktracker.dev QR 슬라이드 추가

## Document Relations
- Issue: #25
- Branch: `25-feature-graduation-review-qr-slide` (base main `aa54c88`, PR #24 머지 뒤)
- 이전 작업: `docs/issues/feature/23-feature-graduation-review-slide6-title.md`(#23, PR #24)
- Session doc: `docs/sessions/graduation-review/README.md`
- Code: `app/src/sessions/graduation-review/`

## Summary
사용자가 마지막 슬라이드 뒤에 QR 을 크게 넣은 장을 하나 더 달라고 했다. 발표가 끝나고 질의응답 동안 띄워 둔다. QR 은 배너에 쓴 것과 같은 판(가운데 로고, https://racktracker.dev/)이다. 원본은 저장소 밖 졸프 폴더의 `QR_racktracker.dev_2026-10-24` 이고, 그 폴더 안내문이 발표자료용으로 지정한 판이다.

## Goal
- 12장이 QR 하나와 주소 `racktracker.dev` 만 있는 장이다.

## Scope
- `slides/Slide12.jsx`, `Slide12.module.css`: 새 슬라이드. Frame 없이 흰 바탕 가운데에 QR(36rem)과 주소.
- `assets/qr_racktracker.svg`: 원본 `racktracker-qr-logo-center_100mm.svg` 사본. 벡터라 화면 크기와 상관없이 선명하다.
- `slides/index.js`: 12장 등록, 머리 주석에 12장의 쓰임.
- `docs/sessions/graduation-review/README.md`: 구성 표에 12장, 6장 제목을 "운용절차" 로(#23 에서 빠뜨림).

## Out Of Scope
- QR 아래 이름표 「Project Report, PT slide」. racktracker.dev 에 보고서·슬라이드 하위 페이지가 아직 없다.
- PowerPoint 판(PNG 배경)에 12장 넣기.

## Done Criteria
- [x] 12장 캡처에서 QR 이 화면 높이 대부분을 차지한다.
- [x] 캡처한 화면의 QR 을 읽으면 https://racktracker.dev/ 가 나온다.

---

## Work Log

### feat: 마지막에 racktracker.dev QR 슬라이드 추가 (#25)

> 11장 뒤에 QR 하나와 주소만 있는 12장을 더했다.

- `Slide12`: Frame 없이 흰 바탕 가운데에 QR(36rem)과 주소 `racktracker.dev`. QR 은 배너와 같은 가운데 로고 판의 SVG 사본(`assets/qr_racktracker.svg`).
- `index.js`: 12장 등록(group "마무리"), 머리 주석에 "12 = 질의응답 동안 띄워 두는 QR".
- 세션 README: 구성 표 12장, 6장 제목 "운용절차".
- 확인: `npm run shot graduation-review/12` 캡처에서 QR 이 화면 높이의 약 2/3 을 차지하고, 캡처를 OpenCV 로 읽으면 `https://racktracker.dev/` 가 나온다.
