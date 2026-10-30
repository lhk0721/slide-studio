# [FEATURE] graduation-review 2장 하중 그림과 10장 문구·영상을 다리별 하중으로

## Document Relations
- Issue: #11
- Branch: `11-feature-graduation-review-leg-loads` (base `fc030c4`, main = PR #10 머지)
- 이전 작업: `docs/issues/feature/6-feature-graduation-review-media.md`(#6, 7~10장 카메라 이동판 영상), `docs/issues/feature/9-feature-graduation-review-drop-reserve.md`(#9)
- 바깥 근거: rack-tracker-forked #649(리그 관절 하중을 다리별 3D 역동역학으로), 「측정 산출 원리」 아티팩트 KgVS2RWS…(2026-10-30 V2)
- Session doc: `docs/sessions/graduation-review/README.md`
- Code: `app/src/sessions/graduation-review/`

## Summary
리그가 관절 하중을 두 다리를 합쳐 앞뒤 거리만 곱하던 방식에서, 바닥 힘을 두 발에 나눠 다리마다 계산하는 방식으로 바뀌었다(rack-tracker #649). 덱의 하중 설명 세 곳을 그 방식에 맞춘다.

## Goal
- 2장 그림이 무게중심(몸+바), 두 발이 받는 몫, 다리마다 발목·무릎·골반에서 그 발 힘의 선까지의 모멘트 팔을 보인다.
- 10장 문구와 영상이 다리별 하중을 말하고 보인다.

## Scope
- `assets/make_load_path.py`, `load_path_arms.png`: 두 발의 압력 중심(무게중심 연직선이 두 발 사이에 떨어지는 자리로 몫을 나누고, 두 발이 같은 앞뒤 지점을 누른다고 둠), 바닥 힘 화살표와 그 선, `왼발 48%` · `오른발 52%`, 다리별 화살표(그 발의 선까지), 허리는 무게중심 선까지, 이름표 `무게중심(몸+바)`.
- `slides/Slide02.jsx`: 그림 설명과 alt.
- `slides/Slide10.jsx`: 원인(앞뒤 쏠림, 두 발이 받는 몫), 결과(다리마다 그 발이 받는 힘 × 앞뒤·안팎 거리, 허리는 위쪽 무게로, 몸 각 부분의 가속도와 회전까지).
- `app/public/graduation-review/anim_measure_load.mp4`: 아티팩트 V2 를 카메라 이동판으로 다시 찍음(20.4초, 하중 비트는 정면 쪽 비스듬한 시점).

## Out Of Scope
- 10장 오른쪽 시연 영상(`demo_replay.mp4`, 태블릿 화면 녹화): 리그 화면이 바뀐 뒤(NX 배포 뒤) 다시 녹화해야 한다.
- 같은 worktree 의 미커밋 `Slide03`, `Slide04` 변경: 이 작업이 아니다(누구 것인지 사용자 확인 중).

## Done Criteria
- [ ] 2장 그림과 10장 문구·영상 교체.
- [ ] `npm run shot graduation-review/2`, `graduation-review/10` 확인.

---

## Work Log

### feat: 2장 하중 그림과 10장 문구·영상을 다리별 하중으로 (#11)

> 리그 #649 의 다리별 관절 하중에 맞춰 덱의 하중 설명 세 곳을 바꿨다.

- `make_load_path.py`: 관절 중점 네 개에서 무게중심 선까지 긋던 화살표를 지우고, 두 발의 압력 중심, 바닥 힘 화살표와 그 선, 두 발 몫, 다리마다 발목·무릎·골반에서 그 발의 선까지 화살표를 그린다. 허리만 무게중심 선까지. 이 파일에는 커밋 전부터 있던 미커밋 변경(관절 열 개의 노랑·검정 과녁, 무게중심 이름표 지시선 — 지금 덱에 보이던 판)이 함께 들어간다.
- `Slide02.jsx`: 그림 설명 `리그로 잰 다리별 모멘트 암과 두 발 몫(스쿼트 바닥 자세, 바 100kg)`.
- `Slide10.jsx`: 원인·결과 두 줄.
- `anim_measure_load.mp4`: `C:\Users\neighbor\Videos\애니메이션_영상_2026-10-27\덱_7-10장_카메라이동\소스\measure4v2.json` 으로 다시 찍음(원본 페이지 사본 `_만든도구\measure-principle.index.html` 을 V2 로 바꾸고 V1 은 `.v1.html` 로 남김). 원본 크기판은 `측정_04_랙좌표_지표_카메라이동_V2_60fps_2514x1092.mp4`.

**Verification**
- `npm run shot graduation-review/2`: 그림의 두 발 몫과 다리별 화살표, 설명 한 줄이 칸 안에 들어감.
- `npm run shot graduation-review/10`: 결과 줄이 두 줄로 감김, 영상 첫 장면 정상.
- 영상 smoke(하중 비트 9.0~14.7초 여섯 장): 정면 쪽 시점에서 바, 두 다리, 두 발의 바닥 힘과 몫 이름표가 보임.
