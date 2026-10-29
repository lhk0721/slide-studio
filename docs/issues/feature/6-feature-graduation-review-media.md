# [FEATURE] graduation-review 1장 리그 회전 영상, 7~10장 애니메이션 확대와 카메라 이동판
Parent: #6

## Document Relations
- Issue: #6
- Branch: `6-feature-graduation-review-media` (base `af0f1d2`, `4-feature-graduation-review-deck` 의 끝. PR #5 머지 뒤 branch 4 에 commit 하나가 더 있었고, 이 작업의 1장 파일은 그 commit 을 바탕으로 고쳐져 있어 그 위에서 시작했다)
- 이전 작업: `docs/issues/feature/4-feature-graduation-review-deck.md`(#4, PR #5)
- Session doc: `docs/sessions/graduation-review/README.md`
- Code: `app/src/sessions/graduation-review/`

## Summary
덱 첫 판(#4)의 1장 왼쪽은 리그 사진이었고, 7~10장은 위에 영상 한 쌍(애니메이션 576×360, 시연 224×360), 아래에 글 세 줄이었다. 애니메이션은 3D 장면 전체를 고정 시점으로 찍은 원본을 줄인 것이라 덱 칸에서는 움직이는 부분이 너무 작아 보이지 않았다. 1장 왼쪽은 리그 설계도가 도는 영상으로 바꾼다. 7~10장은 애니메이션 칸을 키우고, 장면마다 카메라가 움직이는 곳으로 다가가는 판으로 다시 찍는다. 8장 위치 보정은 바닥 앵커만 보여 주던 것을 랙 앵커와 검산 코너까지 넓힌다.

## Goal
- 1장 왼쪽 칸에 글자 없는 리그 설계도 회전 영상.
- 7~10장 애니메이션이 칸을 채우고, 움직이는 곳이 화면에서 크게 보인다.
- 8장 두 영상에 바닥 앵커, 랙 앵커, 검산 코너가 나온다.

## Scope
- `slides/Slide01.jsx`, `Slide01.module.css`: 왼쪽 칸 영상.
- `components/MediaPair.jsx`, `deck.css`(gr-media 절), `slides/Media.module.css`: 7~10장 배치.
- `slides/Slide07.jsx`~`Slide10.jsx`: `MediaPair` 부분.
- `app/public/graduation-review/`: mp4.

## Out Of Scope
- 7~10장의 단계 번호("05 · 네 절차"), 3~6장, 11장, `slides/index.js`, 세션 문서의 장 순서. 같은 working tree 에서 다른 작업이 고치는 중이라 이 issue 에 넣지 않는다.
- 8장 글 세 줄과 결론 띠 문구.
- 9장 오른쪽 측정 중 화면 녹화(리그 실기).

## Done Criteria
- [x] 1장 회전 영상.
- [x] 7~10장 애니메이션 칸 확대, 시연 영상은 오른쪽에 본문 높이 전체.
- [x] 애니메이션 넷을 카메라 이동판으로 교체, 8장 시연 영상 다시 자르기.
- [x] 1장, 7~10장 캡처 확인.

---

## Work Log

### feat: 1장 리그 설계도 회전 영상, 7~10장 애니메이션 칸 확대와 카메라 이동판 영상 (#6)

> 1장 왼쪽을 리그 설계도 회전 영상으로 바꾸고, 7~10장은 애니메이션을 크게, 시연 영상을 오른쪽에 세로로 길게 둔다. 애니메이션 넷은 카메라가 움직이는 곳으로 다가가는 판으로 다시 찍고, 8장은 바닥 앵커, 랙 앵커, 검산 코너를 담는다.

#### Changes
- `slides/Slide01.jsx`, `Slide01.module.css`: 왼쪽 칸의 리그 사진을 `rig_spin.mp4` 로 바꿨다. 리그 배치 설계도를 글자 없이 12초에 한 바퀴 돌린 영상이고, 832×1440 60fps 다. 칸(416×720)과 같은 비율로 찍어 `object-fit: contain` 으로 넣고, 흰 바탕은 `mix-blend-mode: multiply` 로 섞어 슬라이드 그라디언트가 비치게 했다. 처음에는 GIF 였는데 50fps 가 한계이고 70MB 를 넘어 mp4 로 바꿨다. `fig05_rig.jpg` 는 5장이 계속 쓴다.
- `components/MediaPair.jsx`: `children` 을 받는다. 왼쪽 열(`.gr-media-main`)에 애니메이션과 캡션, 그 아래 children(글 목록)을 두고, 오른쪽 열(`.gr-media-item.side`)에 시연 영상이나 자리표시를 둔다.
- `deck.css` gr-media 절: 영상의 고정 높이(360px)와 고정 폭을 없애고 flex 로 칸을 채운다. 오른쪽 열은 폭 18.5rem 고정이다. `aspect-ratio` 는 column flex 가 늘린 높이로 폭을 구하지 못해 쓰지 않았다.
- `slides/Media.module.css`: 위아래 배치 규칙을 지우고, 글 목록이 줄어들지 않게 했다.
- `slides/Slide07.jsx`~`Slide10.jsx`: 글 목록을 `MediaPair` 의 children 으로 옮겼다. 8장은 애니메이션을 `anim_ext_anchor.mp4` 로 바꾸고, 캡션을 "산출 원리 · 바닥 앵커, 랙 앵커, 검산 코너"와 "리그 화면 · 바닥 앵커, 랙 앵커, 검산 코너, 표본 촬영, 리포트"로 고쳤다. 캡션의 "검산 코너"는 애니메이션 이름표와 같은 말이다. 같은 파일의 단계 번호 변경은 다른 작업이라 넣지 않았다.
- `app/public/graduation-review/` 애니메이션: 원본 애니메이션 페이지의 사본에서 자막과 축 눈금 글자를 숨기고, 비트마다 카메라(바라보는 점, 방위각, 앙각, 거리, 화각)를 정해 1/60초마다 찍었다. 칸 크기 838×364 의 3배로 그려 1676×728 60fps 로 묶었고, 끝 장면은 1초 멈춘다.
  - `anim_lens_k.mp4`(7장, 13.2초): 검출 픽셀과 재투영 점의 어긋남, 맞추며 휘는 격자, 주점과 초점 거리.
  - `anim_ext_anchor.mp4`(8장, 17.8초, 새 파일): 원본 위치 보정의 1단계와 2단계. 바닥 보드를 보는 기준 카메라, 카메라 자세와 기준 카메라 벡터, 랙 앞 두 코너의 보드, 랙 원점, 검산 코너와 "차이 0.64cm". 2단계는 가까운 기둥이 가리지 않게 멀리서 화각 24°로 찍었다.
  - `anim_measure_tri.mp4`(9장, 10초): 무릎 관절에서 만나는 세 광선, 관절 33개, 골격.
  - `anim_measure_load.mp4`(10장, 20초): 바닥과 랙 원점, 옆에서 본 골반 높이와 무릎 각도, 무게중심과 모멘트 암, 반복.
  - `anim_ext_result.mp4`(위치 보정 4단계, 결과 파일)는 8장이 1, 2단계로 바뀌어 지웠다.
- `demo_ext.mp4`(8장 시연, 24.5초, 600×960 60fps): 태블릿 화면 녹화에서 다섯 장면을 잘라 이었다. 바닥 앵커(713.5~717.5초), 앞 왼쪽 앵커 코너(778.5~783초), 앞 오른쪽 검산 코너와 "랙 앵커 저장됨"(814~821.5초), 표본 촬영(897~901초), 리포트(1047~1051초).

#### Verification
- 개발 서버에서 영상 칸을 재 보니 7~10장 애니메이션 칸은 838×363, 시연 칸은 296×468 이었다. 애니메이션은 이 비율로 찍어 잘리지 않는다.
- 1장과 7~10장을 캡처해 봤다. 8장 캡션 둘은 각각 한 줄에 들어간다.
- 영상마다 일정 간격으로 프레임을 뽑아 한 장에 붙여, 카메라가 움직이는 곳을 따라가는지 봤다.
- 영상 여섯은 `ffprobe` 로 크기, 길이, 60fps 를 확인했다.

## Management Notes

### Follow-up Candidates
- 8장 글 세 줄과 결론 띠에는 랙 앵커와 검산 코너가 없다. 결론 띠의 "검산 차이 0.18°, 0.35cm"는 C1–C2 쌍 검산 값이고, 시연 화면의 검산 코너 잔차는 0.23cm 다.

### Notes
- 영상 원본과 다시 만드는 소스는 저장소 밖 `Videos\애니메이션_영상_2026-10-27\` 에 있다. 1장은 `리그설계도_회전\`, 7~10장은 `덱_7-10장_카메라이동\`(PPT 용 2514×1092 원본)이고, 각 폴더의 `소스\` 에 캡처 도구(`capture-cam.mjs`), 설정 파일, 시연 자르기 스크립트(`cut_demo_ext.py`)가 있다. 여기에는 다시 인코딩한 사본만 둔다.
- 8장 시연 녹화 원본은 rack-tracker `docs/etc/graduation-review/raw/videos/`(commit 하지 않는 폴더)의 2026-10-18 태블릿 화면 녹화다.
