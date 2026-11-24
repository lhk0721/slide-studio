# [FEATURE] graduation-review 덱을 ICG 중간 성과공유회 발표용 15장으로

## Document Relations
- Issue: #33
- Branch: `33-feature-graduation-review-icg-interim` (base main `8d67118`, PR #32 머지 뒤)
- 이전 작업: `docs/issues/feature/30-feature-graduation-review-slide11-wording.md`(#30, PR #31), #27(QR 이름표, PR #32)
- Session doc: `docs/sessions/graduation-review/README.md`
- Code: `app/src/sessions/graduation-review/`

## Summary
졸업작품 심사 덱(12장)을 ICG 분야 실증기반 연구 프로그램 중간 성과공유회(2026-11-24) 발표용으로 고쳤다. 표지를 프로그램에 맞추고, 졸업작품 검증(단안 카메라 앱과의 비교)과 ICG 실증연구(OpenCap 도구와의 비교)를 같은 틀의 두 장으로 나란히 세웠다. 덱은 15장이 됐다. 세션 이름은 `graduation-review` 그대로다.

## Goal
- 한 덱으로 졸업작품 결과와 ICG 실증연구 계획을 이어서 발표한다.

## Scope
- 1장 표지, 3~6장 줄바꿈과 문구, 9장 애니메이션, 11~15장.
- 2장, 7~8장, 10장은 그대로다.

## Done Criteria
- [x] 15장 모두 캡처에서 넘침이 없다.
- [x] pptx 판이 같은 내용으로 나온다.

---

## Work Log

### feat: 덱을 ICG 중간 성과공유회 발표용 15장으로 (#33)

> 표지를 ICG 프로그램에 맞추고, 비교검증을 두 쌍(단안 카메라 앱, OpenCap 도구)으로 넓혔다.

- 1장: 위 글 "ICG 분야 실증기반 연구 프로그램 · 중간 성과공유회 2026. 11. 24", 과제명 "파워랙 다시점 카메라 리그의 스쿼트 하중 경로 정확도 검증", 첫 칸 Program "실증연구형, 바이오·헬스케어", 팀원 두 명(이현규 팀장, 허현승).
- 3장: 표의 "상용화" 행을 "한계" 행으로 바꾸고 칸마다 세 줄로 적었다. 4장: 셋째 항목 강조. 5장: 항목 설명을 두 줄로. 6장: 04 측정 칸 문구 "0.033초마다 3D 관절 복원, 하중 경로 산출, 운동 역학 분석". 이 넷은 10-29~30에 작업 트리에 남아 있던 수정이고, 11-01 pptx 판부터 화면에 들어가 있었다.
- 9장: `anim_measure_tri.mp4`를 프레임별 burst 판(16초, 1676×728 60fps)으로 교체했다. 연속 프레임 구간이 초당 30번 가까이까지 빨라진다. 회색 몸은 그려진 골격 프레임의 자세를 따른다.
- 11장(새로): "단안 카메라 앱과의 비교검증". 왼쪽 gold standard(Fit3D, 마커 모션캡처), 오른쪽 RackTracker(다시점 삼각측량)와 InstantHMR(단안 추정). 두 방식 위에 "차이점" 이름표.
- 12장(옛 11장): 제목 "비교검증 결과". 숫자 줄을 그림 아래로 내리고 "251ms 화면값 지연"을 뺐다.
- 13장(새로): "OpenCap 도구와의 비교검증". 11장과 같은 틀이다. 왼쪽 gold standard 영상 `opencap_gold.mp4`(OpenCap 검증 데이터의 스쿼트, 마커 모션캡처 + 지면반력판), 오른쪽 RackTracker 설계도와 OpenCap 도구 사진. 두 방식 위에 "공통점 · 다시점 삼각측량" 이름표.
- 14장(새로): "OpenCap 도구와 RackTracker의 차이" 표 8줄. 카메라와 카메라 동기 두 줄만 행 배경으로 강조했다. 출처는 rack-tracker `docs/etc/opencap-validation/opencap-racktracker-comparison.md`의 비교 요약이다.
- 15장(옛 12장): QR.
- 화면 글과 장 목록의 "랙 트래커" 14곳을 "RackTracker"로 바꿨다.
- 그림 다섯 장(`fig29`~`fig33`)을 `assets/`에 더했다.
- 확인: `npm run shot graduation-review/<n>`으로 11~14장을 찍어 넘침이 없음을 봤다. pptx 판은 `Documents\graduation-review-pptx\RackTracker_ICG_2026-11-23.pptx`(15장, 영상 12개)다.

### 남은 것
- 14장 "시간 차 0.2ms 미만"은 실측 0.16ms를 올려 적은 값이다(5장은 0.12ms). OpenCap의 8ms는 문헌값이다.
- 2~10장과 12장의 부제와 결론 띠는 졸업작품 심사 때 문구 그대로다.
