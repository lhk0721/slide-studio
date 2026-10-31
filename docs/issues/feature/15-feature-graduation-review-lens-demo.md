# [FEATURE] graduation-review 7장 렌즈 보정 시연 토막 교체(녹화 A 08:40~09:20, 3배속)

## Document Relations
- Issue: #15
- Branch: `15-feature-graduation-review-lens-demo` (base main `4ada0b5`, PR #14 머지 뒤)
- 이전 작업: `docs/issues/feature/13-feature-graduation-review-slide5-6.md`(#13, PR #14)
- Session doc: `docs/sessions/graduation-review/README.md`
- Code: `app/src/sessions/graduation-review/`
- 함께 바뀐 곳: rack-tracker #651(심사 시연 영상) 10 장면이 같은 구간을 4배속으로 쓴다

## Summary
7장(렌즈 보정) 오른쪽 시연 토막은 녹화 A 의 렌즈 보정 촬영 13초였다. 사용자가 보드를 여러 기울기로 바꿔 가며 찍는 08:40~09:20 구간(24/38 에서 27/38 까지)으로 바꾸고, 길면 빨리감기하라고 했다. 40초를 3배속으로 돌려 왼쪽 애니메이션(13.2초)과 길이를 맞췄다.

## Goal
- 7장 시연 토막이 보드 자세를 바꿔 가는 촬영 장면을 보이고, 왼쪽 애니메이션과 길이가 맞는다.
- 빨리감기 배속이 캡션에 드러난다(8장 "표본 8배속" 과 같은 표기).

## Scope
- `app/public/graduation-review/demo_lens.mp4`: 녹화 A(rack-tracker `docs/etc/graduation-review/raw/videos/Screen_Recording_20261018_185004_Fully Kiosk Browser.mp4`, 저장소에 넣지 않은 원본) 08:40~09:20 을 3배속으로. 8장 `demo_ext.mp4` 와 같은 600×960, 60fps.
- `slides/Slide07.jsx`: 시연 캡션 "리그 화면 · 렌즈 보정 촬영 3배속".

## Out Of Scope
- 다른 worktree(`slide-studio-4-graduation`)의 미커밋 변경 `Slide03`~`Slide06` 은 이 작업이 아니다(주인 미확인).

## Done Criteria
- [x] 7장 캡처에서 새 토막이 오른쪽 칸 전체 높이로 나온다.
- [x] 토막 길이 13.33초, 왼쪽 애니메이션 13.2초.
- [x] 캡션이 한 줄이고 넘침이 없다.

---

## Work Log

### feat: 7장 렌즈 보정 시연 토막을 녹화 A 08:40~09:20 3배속으로 교체 (#15)

> 7장 오른쪽 시연 토막을 보드 자세를 바꿔 가며 찍는 40초 구간의 3배속으로 바꾸고, 캡션에 배속을 붙였다.

- 토막: 녹화 A 의 520~560초를 `setpts=PTS/3` 으로 3배속, 60fps, 600×960(lanczos), libx264 crf 20, faststart. 길이 13.33초, 1.87MB. 이전 토막은 474×760, 13.0초였다.

  ```bash
  ffmpeg -ss 520 -t 40 -i "<녹화 A>" -an -vf "setpts=PTS/3,fps=60,scale=600:960:flags=lanczos" \
    -c:v libx264 -crf 20 -preset slow -pix_fmt yuv420p -movflags +faststart app/public/graduation-review/demo_lens.mp4
  ```

- 캡션: "리그 화면 · 렌즈 보정 촬영" 을 "리그 화면 · 렌즈 보정 촬영 3배속" 으로.
- 확인: `npm run shot graduation-review/7` 캡처에서 새 토막이 오른쪽 칸 전체 높이로 나오고 캡션이 한 줄이다.
