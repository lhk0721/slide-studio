# [FEATURE] 졸업작품 심사 발표 덱(graduation-review 세션)
Parent: #4

## Document Relations
- Issue: #4
- Branch: `4-feature-graduation-review-deck` (base `00fee23`, `2-feature-content-workbench` 의 끝. `main` 에는 세션별 토큰 scoping 과 `shot.mjs` 가 아직 없어 그 branch 위에서 시작했다)
- Session doc: `docs/sessions/graduation-review/README.md`
- Code: `app/src/sessions/graduation-review/`
- 원고: rack-tracker 저장소 `docs/etc/graduation-review/slides/outline.md`(장 구성, 시간, 영상 구간), `slides.md`(장마다 글과 그림)

## Summary
11-03 졸업작품 심사 발표(3분, 질의응답 2분)용 덱을 `graduation-review` 세션으로 만든다. 디자인 시스템은 `inbody-u300` 세션의 것(InBody 3-color 토큰, `shared.css` 헤더와 본문 패턴, 1280×720 프레임)을 그대로 가져온다. 본편 11장과 예비 9장이고, 7~10장은 왼쪽에 산출 원리 애니메이션, 오른쪽에 리그 시연 영상을 같은 길이로 나란히 튼다.

## Goal
- 20장이 `/graduation-review/<n>` 에서 렌더된다.
- 장마다 `npm run shot` 캡처를 자가검수 체크리스트로 본다.
- 애니메이션과 시연 영상이 7, 8, 10장에서 나란히 재생된다. 9장 시연 영상은 리그에서 측정 중 화면을 녹화한 뒤 바꾼다.

## Scope
- `app/src/sessions/graduation-review/tokens.css`: `inbody-u300/tokens.css` 복제, selector 만 `[data-theme="graduation-review"]`.
- `app/src/sessions/graduation-review/deck.css`: 이 세션의 공통 배치(그림 + 글, 영상 둘 + 글, 수치 줄, 하단 결론 띠). class 는 `gr-` 접두.
- `app/src/sessions/graduation-review/slides/`: `index.js` 메타 20개, `Slide01`~`Slide20`.
- `app/src/sessions/graduation-review/assets/`: 보고서 그림 17장(rack-tracker #635 `report/figures/` 2026-10-28 판).
- `app/public/graduation-review/`: 애니메이션 클립 5개와 시연 영상 4개(mp4, 1280 폭 또는 760 높이로 다시 인코딩).
- `app/src/sessions/index.js` 등록, `docs/sessions/README.md` 행, `docs/sessions/graduation-review/README.md`.

## Out Of Scope
- 발표 대본(rack-tracker 쪽 원고에서 쓴다).
- PowerPoint 파일. 덱의 PNG 내보내기로 만들고 영상은 PowerPoint 에서 따로 넣는다.
- 측정 중 화면 녹화(리그 실기).

## Done Criteria
- [x] 20장 렌더, 장마다 캡처 자가검수.
- [x] 7, 8, 10장 영상 나란히 재생.
- [x] 세션 추적 문서, 레지스트리, 이 문서 갱신.

---

## Work Log

### feat: graduation-review 세션, inbody-u300 디자인 시스템으로 본편 11장과 예비 9장 (#4)

> 졸업작품 발표 덱의 세션을 만들고, inbody-u300 디자인 시스템을 가져와 20장을 쓴다. 7~10장은 산출 원리 애니메이션과 리그 시연 영상을 나란히 튼다.

#### Changes
- `app/src/sessions/graduation-review/tokens.css`: `inbody-u300/tokens.css` 복제, selector 만 `[data-theme="graduation-review"]`.
- `app/src/sessions/graduation-review/deck.css`: 이 세션의 공통 배치. `gr-` 접두 class(본문 두 열, 그림과 캡션, 불릿, 숫자 타일, 하단 결론 띠, 영상 한 쌍, 비교표, 예비 장 태그).
- `app/src/sessions/graduation-review/components/`: `Frame.jsx`(헤더와 결론 띠), `MediaPair.jsx`(애니메이션 + 시연 영상, 시연이 없으면 자리표시), `Reserve.jsx`(예비 장의 글 + 그림 한 장).
- `app/src/sessions/graduation-review/slides/`: `index.js` 메타 20개, `Slide01`~`Slide20` 과 module.css. 20장 수식은 `katex` 로 그린다(`app/package.json` 에 `katex@0.16.11` 추가).
- `app/src/sessions/graduation-review/assets/`: 보고서 그림 17장(rack-tracker #635 `report/figures/` 2026-10-28 판). 생성 그림 11장은 `trim_figures.py` 로 흰 여백을 잘라 슬라이드에서 크게 보이게 했다. 사진과 화면 캡처는 그대로다.
- `app/public/graduation-review/`: 애니메이션 클립 5개(렌즈 K 산출 13초, 위치 결과 파일 13초, 측정 삼각측량 10초, 측정 지표 20초, 셔터 프로펠러 6초)와 시연 영상 4개(진단 10초, 렌즈 보정 촬영 13초, 위치 보정 세 토막 14초, 세션 보기 20초). 1280 폭 또는 760 높이, H.264, 무음. 합계 3.8MB.
- `app/src/sessions/index.js` 등록, `docs/sessions/README.md` 행, `docs/sessions/graduation-review/README.md`.
- 슬라이드 문구는 `ko-ui-text` 로 검수했다. 제목과 내용 모두 명사형이고, rack-tracker `ui-text.glossary.md` 를 따른다("산출", "검사", 단위 뒤 조사 붙임).

#### Verification
- `npm run shot graduation-review/<n>` 으로 20장을 두 번 캡처해 자가검수 체크리스트(정렬, 가독성, 단일 강조, 여백, 프레임, 줄바꿈)를 봤다. 첫 캡처에서 고친 것: 7~10장 영상 쌍이 왼쪽으로 몰림(가운데 정렬), 예비 장의 Q&A 태그가 가로로 늘어남(`align-self`), 11장 배치(숫자 타일을 윗줄로), 2장 X-ray 와 3장 도식이 작음(그림 여백 잘라냄).
- 영상 9개는 `ffprobe` 로 길이와 크기를 확인했다. 위치 보정 세 토막은 녹화가 가변 프레임이라 처음 10.9초로 짧게 나와 `fps=30` 을 넣어 13.7초로 맞췄다.
- 9장 오른쪽은 측정 중 화면 녹화가 없어 자리표시다.

### feat: 1장 팀원과 지도교수, 2장을 대리 지표 문제 정의와 관절별 모멘트 암 그림으로 (#4)

> 1장 빈칸을 졸업 전시 배너 2차 시안대로 채우고, 2장을 "기존 KPI 는 대리 지표" 문제 정의로 다시 쓴다. 2장 그림은 X-ray 와 지렛대 도식 대신 실제 세트의 관절별 모멘트 암이다.

#### Changes
- `slides/Slide01.jsx`: 팀원(이현규, 이지원, 신은수, 장효인, 전효원)과 지도교수(윤희남 교수님)를 배너 2차 시안대로 채움. 부제를 "3D 골격을 실시간 측량하는 리그(Rig)"로. 같은 파일의 왼쪽 영상 교체는 다른 작업이라 이 commit 에 넣지 않았다.
- `slides/Slide02.jsx`, `Slide02.module.css`: 제목 "대리 지표에 머문 KPI". 글 넷(진짜 목표, 대리 지표, '정답 자세'는 없다, 3차원 하중 경로의 시계열 동역학 분석 수단 필요)을 소제목 한 줄과 설명 한 줄로 쓴다. 결론 띠는 질문형. X-ray 와 지렛대 SVG 를 빼고 하중 경로 그림을 왼쪽 큰 칸에 둔다.
- `assets/make_load_path.py`, `assets/data/fig24_squat_bottom.json`, `assets/load_path_arms.png`: 보고서 그림 24(rack-tracker #635 `make_figures.py`)의 슬라이드판. 같은 프레임(세션 20261012-115120 반복 3, 바 100kg)에서 바닥 눈금 숫자를 빼고, 관절 이름 옆에 무게중심선까지의 거리(`arm_cm` 반올림, 허리 10, 골반 13, 무릎 16, 발목 10cm)를 적고, 글자를 키웠다. 데이터 파일은 보고서 것의 사본이다.
- `docs/sessions/graduation-review/README.md`: Notes 에서 1장 빈칸을 지움.

#### Verification
- `npm run shot graduation-review/1`, `graduation-review/2` 캡처로 줄바꿈과 겹침을 봤다. 그림 라벨이 앞쪽 다리 선을 가려, 라벨을 다리 바깥과 무게중심선 아래로 옮겼다.

## Management Notes

### Follow-up Candidates
- 9장 시연 영상(측정 중 화면)을 리그 녹화로 바꾸기.
- 영상 자막 없는 판이 필요하면 애니메이션 아티팩트에서 다시 뽑기.
- 2장: "3차원"과 "3D" 표기 통일, 화면에 "모멘트 암"의 정의가 없음(글 4 와 캡션만 씀). `fig01_xray.jpg` 는 이제 어느 장도 쓰지 않는다.

### Notes
- 영상 원본은 저장소 밖이다. 애니메이션은 `C:\Users\neighbor\Videos\애니메이션_영상_2026-10-27\`, 시연 녹화는 rack-tracker `docs/etc/graduation-review/raw/videos/`(commit 하지 않는 폴더). 여기에는 다시 인코딩한 사본만 둔다.
- 시연 녹화의 구간(렌즈 보정 7분 20초부터 13초, 위치 보정 세 토막, 세션 보기 15초부터 20초)은 90초 간격으로 훑어 잡은 값이라 바꿀 수 있다.

### References
- rack-tracker `docs/etc/graduation-review/report/project-report.md`(#635)
- `docs/agent-workflow/slides-jsx-convention.md`
