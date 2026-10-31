# Session: graduation-review(졸업작품 심사 발표 덱)

## Document Relations

- Parent index: `docs/sessions/README.md`
- Code: `app/src/sessions/graduation-review/`
- Route: `/graduation-review/1`
- Work log: `docs/issues/feature/4-feature-graduation-review-deck.md`
- 원고: rack-tracker 저장소 `docs/etc/graduation-review/slides/outline.md`, `slides.md`

## Summary

2026-11-03 졸업작품 심사의 발표(3분)와 질의응답(2분)에 쓰는 덱이다. 디자인 시스템은 `inbody-u300` 세션의 것을 그대로 쓴다. 본편 11장, 180초다. 질의응답용 예비 장은 두지 않고, 끝에 racktracker.dev QR 한 장(12장)을 띄워 둔다.

## 청중 / 목적

- 청중: 이 프로젝트를 처음 보는 공학 전공 심사위원 3명. 같은 주제의 팀이 앞 타임에 발표한다.
- 목적: 왜 재야 하는가(2~4장) → 무엇으로 재는가(5~6장) → 어떻게 재는가(7~10장) → 얼마나 맞는가(11장). 2장이 "무게가 가는 길"로 열고 10장이 하중 경로로 닫는다.

## 슬라이드 구성 (12)

| # | 제목 | 초 | 상태 |
| --- | --- | --- | --- |
| 1 | 타이틀 | 5 | 작성 |
| 2 | 다친 뒤 알게 된 것 | 20 | 작성 |
| 3 | 기존 솔루션의 한계 | 25 | 작성 |
| 4 | 시장 실패로 이어진 정량 분석 수단 부재 | 15 | 작성 |
| 5 | 리그 하드웨어 | 25 | 작성 |
| 6 | 운용절차 | 10 | 작성 |
| 7 | 렌즈 보정 (애니메이션 + 시연) | 15 | 작성 |
| 8 | 위치 보정 (애니메이션 + 시연) | 15 | 작성 |
| 9 | 측정 ① 삼각측량 (애니메이션 + 시연 자리) | 15 | 작성 |
| 10 | 측정 ② 하중 경로 (애니메이션 + 시연) | 20 | 작성 |
| 11 | 검증과 마무리 | 15 | 작성 |
| 12 | QR (질의응답 동안) | 0 | 작성 |

> 슬라이드 순서의 source of truth 는 `app/src/sessions/graduation-review/slides/index.js`.

## 자산 메모

- 그림: `assets/` 의 보고서 그림 17장. rack-tracker #635 `docs/etc/graduation-review/report/figures/`(2026-10-28 판)에서 복사했고, 다시 만드는 명령은 그쪽 `make_figures.py` 다. 생성 그림 11장은 복사한 뒤 `assets/trim_figures.py` 로 흰 여백을 잘랐다. 새로 복사하면 다시 돌린다.
- 영상: `app/public/graduation-review/`. 애니메이션 클립 5개(렌즈 K 산출 13초, 위치 결과 파일 13초, 측정 삼각측량 10초, 측정 지표 20초, 셔터 프로펠러 6초)와 시연 영상 4개(진단 10초, 렌즈 보정 촬영 13초, 위치 보정 세 토막 14초, 세션 보기 20초). 원본은 저장소 밖이다. 애니메이션은 자막이 박힌 판이다.
- 슬라이드의 영상은 `<video autoPlay muted loop playsInline>` 이고, PNG 내보내기에는 첫 프레임만 남는다.

## 문구 규칙

- 제목, 부제, 불릿, 결론 띠 모두 명사형이다. 서술형 어미("~한다", "~이다")는 쓰지 않는다.
- 용어는 rack-tracker `ui-text.glossary.md` 를 따른다. K 와 R·t 는 "산출", 진단은 "검사", 단위 뒤 조사는 붙인다("4px를").
- 7~10장의 영상 캡션은 이름만 적는다("산출 원리 · K 산출", "리그 화면 · 렌즈 보정 촬영"). 무엇이 움직이는지는 발표자가 말한다.

## Notes

- 측정 중 화면 녹화는 아직 없다. 9장 오른쪽은 자리만 잡아 두었다.
- 애니메이션의 자막 없는 판이 필요하면 아티팩트에서 다시 뽑는다(rack-tracker `docs/etc/graduation-review/slides/outline.md` 4절).
