# [FEATURE] graduation-review 9장 오른쪽 칸에 측정 중 화면 합성 영상(10-27 세션 기록, 세트 3 전체)

## Document Relations
- Issue: #28
- Branch: `28-feature-graduation-review-slide9-measure` (base main `552404d`, PR #26 머지 뒤)
- 이전 작업: `docs/issues/feature/19-feature-graduation-review-slide9-converge.md`(#19, PR #20)
- Session doc: `docs/sessions/graduation-review/README.md`
- Code: `app/src/sessions/graduation-review/`
- 함께 쓴 곳: rack-tracker #651(심사 시연 영상) 16 장면의 합성 도구 `docs/etc/demo-video/2026-10-31-demo-script/cover/live/`

## Summary
9장(측정 ① 삼각측량) 오른쪽 칸은 "측정 중 화면 녹화 예정" 자리표시로 비어 있었다. 측정 세트는 카메라 영상을 저장하지 않아 리그 화면을 그대로 녹화할 수 없다. 시연 영상 16 장면과 같은 방법으로, 10-27 전효원 세션 세트 3 의 저장 기록(NX 의 3D 관절, 지표, 2D 관절과 PC 가 같은 시각에 받아 둔 카메라 미리보기)을 합성해 측정 중 화면을 만들었다. 덱 칸이 세로(474×760)라 가로 판(960×540)을 세로로 다시 배치했고, 세트 3 전체 10회에 "세트 종료" 상태 2초를 붙였다.

## Goal
- 9장 오른쪽 칸에 측정 중 화면이 세트 시작부터 세트 종료까지 이어져 되풀이된다.
- 화면 구성이 시연 영상 16 장면과 같다(카메라 3대 사진 위 2D 관절 33개, 키오스크 3D 뷰어의 3D 관절, 지표, rep 수).

## Scope
- `app/public/graduation-review/demo_measure.mp4`: 948×1520, 30fps, 41.4초. 세트 3 rep 1~10(12:49:52~12:50:33), 마지막 rep 끝(39.4초)부터 알약이 "세트 종료" 로 바뀌어 2초.
- `slides/Slide09.jsx`: `placeholder` 대신 `demo="/graduation-review/demo_measure.mp4"`. 캡션 "리그 화면 · 측정 중" 은 그대로.

## Out Of Scope
- 합성 도구와 소스 기록은 저장소에 넣지 않는다. 도구는 rack-tracker #651 `cover/live/` 의 세로 판 사본(`live_tall.html`, `make_live_tall.py`, `capture_live_tall.cjs`)이고, 소스 기록은 사용자 PC 의 `Videos\애니메이션_영상_2026-10-27\시연영상_16x9\소스_16측정중\` 와 `Documents\측정녹화_2026-10-27_전효원\` 에 있다.
- racktracker.dev 의 `/slides/` 는 이 덱을 빌드해 넣은 사본이라 머지 뒤 랜딩 저장소에서 다시 빌드해야 한다(landing 쪽 작업).

## Done Criteria
- [x] 9장 캡처에서 영상이 오른쪽 칸 전체 높이로 나오고 자리표시가 사라진다.
- [x] 영상이 41초 동안 세트 시작부터 세트 종료까지 이어진다(마지막 2초 "세트 종료").
- [x] 캡션이 한 줄이고 넘침이 없다.

---

## Work Log

### feat: 9장 오른쪽 칸에 측정 중 화면 합성 영상 — 10-27 세션 기록 세트 3 전체와 세트 종료 (#28)

> 9장 오른쪽 자리표시를 10-27 전효원 세션 세트 3 의 저장 기록으로 합성한 세로 측정 중 화면(41.4초)으로 바꿨다.

- 합성 방법은 rack-tracker #651 16 장면과 같다. 카메라 사진은 PC 가 같은 시각에 받아 둔 미리보기(600×960 JPEG 와 벽시계 `frames.jsonl`), 3D 관절과 지표와 2D 관절은 NX 세션 기록(`03_skeleton.json`, `03_metrics.json`, `03_obs.npz`)이고, 두 시계의 차는 원본과 같이 +0.5초다. 사진과 프레임의 시각 차는 최대 62ms.
- 세로 판 배치(474×760 CSS px, deviceScaleFactor 2): 위에 상태 알약과 "전효원 · 스쿼트 · 바 30kg · 세트 3", 카메라 3대 사진(142×227) 위 2D 관절 33개, 아래 322px 부터 키오스크 3D 뷰어(`tracker3d.js` 사본, 474×438). 뷰어 시점은 골반 평균(35.9, 80, 23.3)을 보고 radius ×2.4, phi 1.15. 폭이 좁아 뷰어 왼쪽 아래 범례 "바닥 cm · 높이는 바닥에서" 가 부하 줄과 겹쳐서 범례만 뺐다.
- 구간은 세트 3 rep 1 시작 1초 전(12:49:52.259)부터 rep 10 끝 2초 뒤(12:50:33.657)까지 41.40초, 1242 프레임. rep 10 끝(39.4초)부터 알약이 "측정 중"(초록) 에서 "세트 종료"(회색) 로 바뀐다. 묶기는 ffmpeg libx264 crf 16, preset slow, yuv420p, faststart. 결과 948×1520, 30fps, 20.0MB.
- `Slide09.jsx`: `placeholder="측정 중 화면 녹화 예정"` 을 `demo="/graduation-review/demo_measure.mp4"` 로.
- 확인: `npm run shot graduation-review/9` 캡처에서 영상이 오른쪽 칸 전체 높이로 나오고 자리표시가 없으며 캡션 "리그 화면 · 측정 중" 이 한 줄이다. 영상 프레임 0, 320, 640, 1180, 1241 을 눈으로 봤다(선 자세, 바닥, rep 5, rep 9, 세트 종료).
- 도구 사본과 로그는 저장소 밖 스크래치패드(`deck9/cover/live/`)에 있고, 원본 영상은 사용자 PC 의 `Videos\애니메이션_영상_2026-10-27\시연영상_16x9\measure_live_tall.mp4` 다.
