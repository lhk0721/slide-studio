# [FEATURE] graduation-review 5장 결론 띠와 6장 화면 배치·문구

## Document Relations
- Issue: #13
- Branch: `13-feature-graduation-review-slide5-6` (base main `23e2f41`, PR #12 머지 뒤)
- 이전 작업: `docs/issues/feature/9-feature-graduation-review-drop-reserve.md`(#9, PR #10)
- Session doc: `docs/sessions/graduation-review/README.md`
- Code: `app/src/sessions/graduation-review/`

## Summary
5장(리그 하드웨어) 결론 띠는 "펄스 하나에 같은 순간의 세 사진. 계산은 전부 리그 안에서"였다. 사용자가 처리 흐름이 보이는 문구로 바꿨다. 6장(네 절차)은 네 화면을 합친 그림 한 장이라 아래 단계 칸과 줄이 맞지 않았다. 화면을 따로 잘라 단계 칸과 같은 4칸에 놓고, 화면 사이에 화살표를 넣고, 04 측정 칸을 배경 상자로 묶는다. 단계 설명과 결론 띠 문구는 사용자가 한 줄씩 정했다.

## Goal
- 5장 결론 띠가 동기 촬영, 병렬 추론, 초당 추론 수, 삼각측량, 후처리를 한 줄로 보인다.
- 6장 화면 i 가 단계 i 위에 왼쪽 끝을 맞춰 놓이고, 화면 사이에 화살표가 있다.
- 6장 04 측정 칸의 화면과 단계가 배경 상자 하나로 묶이고, 상자의 좌우 여백이 같다.

## Scope
- `slides/Slide05.jsx`, `Slide05.module.css`: 결론 띠 문구, 셔터 영상 밑 설명 줄과 `.shutterCap` 삭제.
- `slides/Slide06.jsx`, `Slide06.module.css`: 화면 줄과 단계 줄을 4칸 grid 하나로, 화살표, 측정 배경 상자, 단계 설명과 결론 띠 문구.
- `assets/fig07_screen_diag.jpg`, `fig07_screen_lens.jpg`, `fig07_screen_ext.jpg`, `fig07_screen_measure.jpg`: rack-tracker `docs/etc/graduation-review/figures/화면/g9_screens_b_row_48cm.jpg` 의 여섯 칸 가운데 1, 2, 3, 5번째 칸(진단, 렌즈 보정, 위치 보정, 측정)을 잘라 냄. 칸 경계는 rack-tracker `report/make_figures.py` 의 `SCREEN_CELLS` 와 같다.
- `assets/fig07_flow.jpg`: 쓰는 곳이 없어 삭제.

## Out Of Scope
- 같은 worktree 의 미커밋 변경 `Slide03.jsx`, `Slide03.module.css`, `Slide04.jsx` 는 이 작업이 아니다(주인 미확인).

## Done Criteria
- [x] 5장, 6장 결론 띠 한 줄, 캡처 확인.
- [x] 6장 화면과 단계 칸의 왼쪽 끝 맞춤, 캡처 확인.
- [x] 측정 상자 좌우 여백 12.0px, 12.3px(화면 기준) 측정, PNG 내보내기 확인.

---

## Work Log

### feat: 5장 결론 띠를 처리 흐름으로, 6장 화면을 단계 칸에 맞추고 측정 칸 강조 (#13)

> 5장 결론 띠를 처리 흐름으로 바꾸고 셔터 설명 줄을 지웠다. 6장은 화면 넷을 단계 칸과 같은 4칸에 놓고, 화살표와 측정 배경 상자를 넣고, 단계 설명과 결론 띠를 사용자 문구로 바꿨다.

- 5장 결론 띠: "카메라 3대 동기 촬영 · MediaPipe-PL-heavy 3개 병렬 추론 · **90 inferences/s** · 실시간 삼각측량 · 후처리". 90 은 카메라 3대 × 초당 30장이고, 묶음 하나의 추론(16.12ms)이 촬영 간격 33.3ms 안에 끝나 모든 묶음을 추론한다(rack-tracker 보고서 4-2).
- 5장 셔터 영상 밑 설명 줄 삭제. 영상 안에 롤링 셔터, 글로벌 셔터 이름표가 있다.
- 6장 배치: 화면 줄과 단계 줄을 `grid-template-columns: repeat(4, minmax(0, 1fr))` 인 grid 하나로 합쳤다. 화면은 칸 왼쪽에 붙고, 화살표(SVG)는 앞 화면 오른쪽 끝과 다음 칸 사이 가운데에 놓인다. 합친 그림의 화면 밑 이름표는 단계 제목과 겹쳐 뺐다.
- 6장 측정 상자: `--accent-soft` 배경, 테두리 없음. 측정 화면이 칸보다 좁아 상자 폭을 칸 폭으로 두면 오른쪽 여백이 커진다. 그래서 `useLayoutEffect` 의 `ResizeObserver` 가 화면 폭에 양쪽 여백(`--focus-pad`, 0.75rem)을 더해 상자 폭을 정한다.
- 6장 단계 설명: 01 진단 "Rig 상태 종합점검, / 카메라 동기화 검사, / TRG-STRB 100% 적중률 검사", 02 렌즈 보정 "새 카메라 / 렌즈 조절 / 충격 후" 와 "여러 거리와 기울기의 보드 사진으로 / 초점 거리와 왜곡계수 산출 / (카메라 개체별 고유 파라미터)", 03 위치 보정 "설치 직후 / 카메라가 움직인 뒤" 와 "바닥(world) 좌표계, 랙 좌표계, / 기준 카메라 위치 산출 후 / 보드 표본으로 C1·C2 상대 위치·방향 산출". 줄바꿈은 문자열의 `\n` 과 `.what` 의 `white-space: pre-line`.
- 6장 결론 띠: "선행조건(prerequisite) 관계, 동기 → 광학 → 기하 영점조절 후 **측정 운용**".
- 확인: `npm run shot graduation-review/5`, `graduation-review/6` 캡처로 결론 띠 한 줄과 넘침 없음을 봤다. 측정 상자의 좌우 여백은 화면에서 재어 12.0px, 12.3px 이고, 앱의 "이 슬라이드 저장" 으로 받은 4K PNG 에서도 상자가 같게 나온다.
