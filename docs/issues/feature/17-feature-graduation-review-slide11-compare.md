# [FEATURE] graduation-review 11장 InstantHMR 비교를 PA-MPJPE 로 밝히고 할 수 있다/없다 비교 표

## Document Relations
- Issue: #17
- Branch: `17-feature-graduation-review-slide11-compare` (base main `2e653dd`, PR #16 머지 뒤)
- 이전 작업: `docs/issues/feature/15-feature-graduation-review-lens-demo.md`(#15, PR #16)
- Session doc: `docs/sessions/graduation-review/README.md`
- Code: `app/src/sessions/graduation-review/`
- 함께 바뀐 곳: rack-tracker #651(심사 시연 영상) 19 장면이 같은 비교 표를 쓴다

## Summary
11장의 InstantHMR 비교 숫자 "2.0배 작은 관절 위치 오차"는 실제로 PA-MPJPE 다. PA-MPJPE 는 관절끼리의 상대 위치, 곧 자세의 모양이 얼마나 맞는지를 잰 값이다. InstantHMR 은 표준화된 공간 좌표계에 3D 관절을 복원하지 못해 MPJPE 를 잴 수 없고, 그래서 PA-MPJPE 로만 비교했다. 사용자가 이것을 슬라이드에 밝히고, 랙 트래커는 할 수 있고 InstantHMR 은 못 하는 것을 비교 표로 보이고, 리포트 카드 사진은 빼자고 했다.

## Goal
- InstantHMR 과 견준 숫자마다 PA-MPJPE(자세 모양 오차)임이 드러난다.
- 비교 표에서 표준화된 공간 좌표계 위 3D 관절은 랙 트래커만 할 수 있고, MPJPE 는 InstantHMR 쪽을 잴 수 없음이 보인다.

## Scope
- `slides/Slide11.jsx`: 숫자 줄의 InstantHMR 비교 두 칸을 퍼센트와 PA-MPJPE 라벨로, 막대 그림 캡션을 "자세 모양 오차 PA-MPJPE(cm)와 무릎 각도 오차(°)" 로, 오른쪽 지난 세션 보기와 리포트 카드 사진을 비교 표와 PA-MPJPE 설명으로.
- `slides/Slide11.module.css`: 비교 표(가운데 정렬, 랙 트래커 칸 강조색, 할 수 있다/없다 원 표시), 설명 문단.

## Out Of Scope
- `assets/fig25_session_review.jpg` 파일 자체는 지우지 않는다(다른 곳에서 쓸 수 있다).
- 다른 worktree(`slide-studio-4-graduation`)의 미커밋 변경 `Slide03`~`Slide06` 은 이 작업이 아니다(주인 미확인).

## Done Criteria
- [x] 11장 캡처에서 비교 표와 설명이 오른쪽 칸에 넘침 없이 들어간다.
- [x] 숫자 줄과 막대 그림 캡션의 InstantHMR 비교가 PA-MPJPE 로 적혀 있다.

---

## Work Log

### feat: 11장 InstantHMR 비교를 PA-MPJPE 로 밝히고 할 수 있다/없다 비교 표로 리포트 카드 사진을 바꿈 (#17)

> 11장의 InstantHMR 비교가 자세 모양(PA-MPJPE)만 견준 값임을 밝히고, 오른쪽 사진 자리에 랙 트래커와 InstantHMR 의 비교 표를 넣었다.

- 숫자 줄: "2.0배 / 단안 모델 InstantHMR 보다 작은 관절 위치 오차" 를 "49% / InstantHMR 보다 작은 자세 모양 오차 PA-MPJPE" 로, "2.1배 / InstantHMR 보다 작은 무릎 각도 오차" 를 "53%" 로. 49% = (7.19 − 3.65) ÷ 7.19, 53% = (10.07 − 4.76) ÷ 10.07(rack-tracker Project Report 7-3). 시연 영상 대사("49% 작았습니다")와 표기를 맞췄다.
- 막대 그림 캡션: "관절 위치 오차(cm)와 무릎 각도 오차(°)" 를 "자세 모양 오차 PA-MPJPE(cm)와 무릎 각도 오차(°)" 로. 그림의 세로축도 PA-MPJPE 다.
- 비교 표(오른쪽 칸, `gr-table`): 항목 / 랙 트래커(카메라 3대) / InstantHMR(카메라 한 대). 표준화된 공간 좌표계 위 3D 관절(가능 / 불가, 강조 줄), 관절 위치 오차 MPJPE(3.63cm / 잴 수 없음), 자세 모양 오차 PA-MPJPE(3.65cm / 7.19cm), 무릎 각도 오차(4.76° / 10.07°). 가능과 불가는 원 안의 체크와 X(SVG)로 그린다. 머리글은 `gr-table` 의 대문자 바꿈을 꺼서 "InstantHMR" 표기를 지킨다.
- 표 아래 설명: "PA-MPJPE: 관절끼리의 상대 위치, 곧 자세 모양의 오차." 와 "InstantHMR 은 표준화된 공간 좌표계에 3D 관절을 복원하지 못해 이 값으로만 비교" 두 줄.
- 오른쪽의 지난 세션 보기와 리포트 카드 사진(`fig25_session_review.jpg`) import 를 뺐다.
- 확인: `npm run shot graduation-review/11` 캡처에서 표와 설명이 넘침 없이 들어가고, 설명의 "PA-MPJPE" 가 줄 끝에서 끊기지 않는다.
