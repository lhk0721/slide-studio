# [FEATURE] graduation-review 예비 12~20장 삭제

## Document Relations
- Issue: #9
- Branch: `9-feature-graduation-review-drop-reserve` (base `c2a58fd`, `6-feature-graduation-review-media` 의 끝. 내용은 main `dbadcd4` 와 같다)
- 이전 작업: `docs/issues/feature/4-feature-graduation-review-deck.md`(#4, PR #5), `docs/issues/feature/6-feature-graduation-review-media.md`(#6, PR #7·#8)
- Session doc: `docs/sessions/graduation-review/README.md`
- Code: `app/src/sessions/graduation-review/`

## Summary
덱 첫 판(#4)은 본편 11장 뒤에 질의응답용 예비 9장(12~20장)을 두었다. 사용자 결정으로 예비 장을 모두 빼고 본편 11장만 남긴다.

## Goal
- 덱이 11장으로 열리고, 11장 다음으로 넘어가지 않는다.

## Scope
- `slides/Slide12.jsx`~`Slide20.jsx`, `Slide13.module.css`, `Slide16.module.css`, `Slide20.module.css`: 삭제.
- `components/Reserve.jsx`, `Reserve.module.css`: 예비 장에서만 쓰던 틀이라 삭제.
- `slides/index.js`: 12~20장의 import 와 메타 삭제.
- `app/src/sessions/index.js`: 세션 설명에서 예비 9장 삭제.
- `docs/sessions/graduation-review/README.md`: 장 표와 설명, 예비 6장 단가 메모 삭제.

## Out Of Scope
- 예비 장이 쓰던 그림(`assets/fig14_calib_board.jpg`, `fig16_rig_os.png`, `fig22_two_paths.png`, `fig23_tail_accuracy.png`, `fig24_load_path.png`, `fig26_datasets.jpg`, `fig27_panoptic_cameras.jpg`, `table4_jetson.png`)는 남긴다. `assets/trim_figures.py` 와 `make_load_path.py` 가 이 파일 이름을 쓴다.
- `app/package.json` 의 `katex` 는 남긴다.
- 같은 worktree 의 미커밋 변경(`Slide03`, `Slide04`, `make_load_path.py`, `load_path_arms.png`)은 이 작업이 아니다.

## Done Criteria
- [x] 예비 장 파일과 메타 삭제.
- [x] `npm run shot graduation-review/11` 로 11장이 그대로인 것, `graduation-review/12` 가 11장을 여는 것을 확인.

---

## Work Log

### feat: 예비 12~20장을 빼고 본편 11장만 남김 (#9)

> 질의응답용 예비 9장과 그 장에서만 쓰던 `Reserve` 틀을 지웠다. 덱은 본편 1~11장이다.

- `slides/Slide12.jsx`~`Slide20.jsx` 와 CSS 셋, `components/Reserve.jsx`·`Reserve.module.css` 삭제.
- `slides/index.js` 에서 import 9줄과 메타 9개를 빼고, 머리 주석의 예비 장 설명을 지웠다.
- 세션 설명과 세션 문서의 장 표를 11장으로 줄였다.
- 그림 파일과 `katex` 는 그림 스크립트가 쓰므로 남겼다.
- 확인: dev server 에서 두 `index.js` 모듈이 200 으로 변환되고, `npm run shot graduation-review/11` 캡처가 그대로다. `graduation-review/12` 는 11장을 연다.
