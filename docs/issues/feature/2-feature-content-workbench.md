---
issue: 2
branch: 2-feature-content-workbench
type: feature
---

# [FEATURE] Phase 3 콘텐츠 워크벤치 — 자산 체크리스트 · 근거 강도 등급 · 준비도 게이트

## Document Relations
- Place under `docs/issues/feature/`
- Update before each related commit
- Workflow context: `docs/agent-workflow/deck-workflow.md` (Phase 3 Content — 현재 ⬜ 미정)
- 선행 작업: `docs/issues/feature/1-feature-review-ui.md` (Phase 1~2 리뷰 UI). 본 작업은 그 슬라이드 메타 위에 Phase 3 레이어를 얹는다.
- Session tracking: `docs/sessions/<id>/README.md`

## Summary
덱 파이프라인 **Phase 3 (Content)** 를 전용 화면으로 시스템화한다. 리뷰 UI(#1)가 메시지·구조(Phase 1~2)를 코드화했다면, 본 작업은 Phase 3의 실제 작업 — 저해상도 콘텐츠 확정, **필요 자산 목록화(출처·라이선스)**, **근거 강도 등급화(비대칭 전략)**, 사실 검증 — 을 `/:sessionId/content` 워크벤치로 제공하고, Phase 4(Design)로 넘어가는 **준비도 게이트**를 보여준다.

## Goal
- slide 메타에 Phase-3 필드 추가: `assets[]`(kind/desc/source/license/status), evidence 항목 강도(`grade`)·검증 상태.
- `/:sessionId/content`: 슬라이드별 본문/자산/근거를 한눈에 + 덱 전체 준비도 대시보드(Phase 4 게이트).
- `financial-market` 파일럿으로 자산/근거 등급 채움.
- `deck-workflow.md` Phase 3 상태 ⬜→🟡, Phase-3 규칙 문서 신설(`deck-content.md`).

## Decisions
- **데이터 소스 = slide 메타 단일 소스** 유지(렌더·리뷰·콘텐츠 공유).
- **전용 라우트**(인스펙터 확장 아님) — 준비도 게이트/대시보드가 핵심이라 별도 화면이 맞다.
- 브랜치는 미병합 #1 위에 스택(현 시점 main에는 Phase 1~2 기반이 없음). #1 병합 시 main으로 리베이스.

## Scope
- `app/src/components/Content.jsx` + `Content.module.css` (신규)
- `app/src/App.jsx` (라우트), 진입 링크(Overview/Home/Deck)
- `app/src/sessions/financial-market/slides/index.js` (assets/grade 채움), `inbody-u300/slides/index.js` (스키마 주석)
- `docs/agent-workflow/deck-workflow.md`, `docs/agent-workflow/deck-content.md`(신규)

## Out of Scope
- 자산을 실제로 업로드/관리하는 파일 스토리지 — 목록·상태만.
- 콘텐츠를 워크벤치에서 인라인 편집/저장 — 표시·집계만(편집은 메타 직접 수정).
- Phase 4(Design) 토큰/슬라이드 빌드.

---

## TODO — financial-market 콘텐츠 완성 (잔여 상호작용)

워크벤치 게이트가 가리키는 잔여 작업. 근거 검증은 완료(미검증 0), 남은 차단 사유는 자산뿐.
주체별로 구분 — 세션 작업목록(Task #5~#12)과 동기화.

**A. 에이전트 자율 (조사·주입 가능)**
- [ ] 글로벌 시장 수치 단일 출처·기준연도·수치 확정 → evidence/body 주입 (현재 범위 $14~22B만 확인). (Task #5)
- [ ] 차트용 데이터셋 수집·정리: 펠로톤 시총/PSR 시계열, 서울 폐업 연도별, 상표출원 출원인 유형 비율 → 작도 입력. (Task #6)
- [ ] 근거 보강 조사 후보 정리(선택): ClassPass·churn, 한국 필라테스/PT 폐업·이직 등. 약한 근거 보강 판단. (Task #7)

**B. 에이전트 + 사용자 결정**
- [ ] 아이콘 라이선스·세트 결정 (s3 2×2, s11 시사점 카드) → 결정 시 자산 check→have. (Task #8)
- [ ] 데이터 확정 차트 자산(s2·s4·s7) status check→have 전환 여부 (올리면 준비완료 5→8/12). (Task #9)

**C. 사용자만 가능**
- [ ] 한국 헬스장 셔터 사진 확보 — 촬영/스톡 + 상업용 라이선스 (s1, 유일한 'need'). (Task #10)
- [ ] 발표 직전 펠로톤 현재 시총 재확인 (시점 의존, 현재 2026-06-14 기준 확정). (Task #11)

**D. Phase 4~5로 이월 (콘텐츠 단계 이후)**
- [ ] 확보 자산 실제 작도(SlideNN.jsx) — 디자인 토큰 확정 후. (Task #12)

> 미검증 근거의 인앱 확인·해소 플로우는 별도 #3 참조.

---

## Work Log

### 2026-06-14 — Phase 3 콘텐츠 워크벤치 신설 (데이터 모델 + 라우트 + 문서)

덱 파이프라인 Phase 3(Content)를 전용 화면으로 시스템화. slide 메타에 자산/근거강도 필드를 더하고, `/:sessionId/content` 워크벤치로 준비도와 Phase 4 게이트를 집계.

- **데이터 모델**: slide 메타에 `assets[]`(`{ kind, desc, source?, license?, status }`, status: have/need/check) 추가, evidence 객체에 `grade`(strong/medium/weak) 추가. 발표·리뷰·콘텐츠가 단일 소스 유지.
- **워크벤치(`/:sessionId/content`)**: `Content.jsx`/`.module.css` 신규. ① 준비도 대시보드(본문 n/N·자산 확보/필요/확인·근거 강도 분포·미검증 수·준비 완료 n/N) + Phase 4 게이트(미준비 시 보완 목록), ② 슬라이드별 본문/자산(상태 칩)/근거(강도 칩+미검증 배지) 3열. 강도는 작성자 명시 grade만 집계(추정 안 함) — 정직성, 미평가 객체는 '참고', 문자열은 '논증'.
- **라우트·진입**: `App.jsx`에 `/:sessionId/content` 추가, Home 카드·Overview 액션에 "콘텐츠 ☑" 링크.
- **financial-market 파일럿**: 12장에 assets 채우고 evidence에 grade 부여(강7·중3·약3, 미검증 8). 현재 준비 완료 3/12 — 자산 미확보(need/check)·미검증 근거가 게이트를 막는 상태가 정상 노출됨.
- **문서**: `deck-content.md` 신설(Phase 3 명세), `deck-workflow.md` Phase 3 상태 ⬜→🟡 + 요약/상세규칙 링크 갱신. inbody-u300 스키마 주석에 assets/grade 문서화.
- **브랜치 메모**: 미병합 #1(리뷰 UI) 위에 스택. #1 병합 시 main으로 리베이스.
- 검증: `npm run build` 통과, 헤드리스로 워크벤치 집계(게이트·메트릭·블로커·3열) 정상, JS 에러 없음.

### 2026-06-14 — 근거 미검증 항목 웹 검증 패스 (8건 → 4건 해소)

financial-market의 `verify`(미검증) 8건 중 웹으로 확인 가능한 4건을 1차 출처 대조로 확정/수정. 사용자만 재현 가능한 4건은 verify 유지.

- **해소(4)**:
  - 글로벌 시장: "2018 24억$→2026 209억$(9배)"는 단일 출처로 확인 불가(2026 전망이 기관별 $14B GVR ~ $22B TBRC로 편차 큼). 거짓 단정 대신 **출처 있는 범위 표현**으로 정정, verify 제거(약 등급 유지). body 문구도 동기화.
  - PSR 16.7배: **산식 확정** — 정점 시총 약 493억$ ÷ 당시 TTM 매출 약 29.5억$ ≈ 16.7배(FY2021 연매출 $4.02B 기준이면 약 12배). source에 산식 명기, verify 제거.
  - 감원 구성: **확정**(CNN 2022.2.8) — 본사 약 20%·마케팅·물류(창고 축소→3PL, $800M 절감), 강사진 제외. grade medium→**strong**, verify 제거.
  - 선불 멤버십: 정성 근거 → **정량화**(한국소비자원: 폐업 선불 피해구제 2020~25.8 약 987건/2.1억원, 체육시설 70%+·헬스장 35.6%·필라테스 33.8%, 92% 환불분쟁). grade weak→**medium**, 서울경제 보도 url, verify 제거.
- **유지(4, 사용자/시점 의존)**: 현재 시총(발표 직전 재확인) · 상표출원 비율(KIPRIS 재현) · 유튜버 구독자(스냅샷 시점) · 서울 폐업 수치(데이터셋 재집계). 슬라이드 12 검증 노트도 잔여 4건으로 갱신.
- 슬라이드 12 참고자료에 CNN(감원)·TBRC(시장)·한국소비자원/서울경제(선불) 반영.
- 결과: 워크벤치 미검증 8→4, 준비완료 3→4/12, 강도 강8·중3·약2. build 통과, JS 에러 없음.
- **후속 과제**: 미검증 항목을 사용자가 워크벤치에서 직접 확인·해소(verify 제거/수치 수정/강도 변경)하는 인터랙티브 플로우 → GitHub **#3** 「콘텐츠 워크벤치 — 미검증 근거 사용자 확인·해소 플로우」로 등록. 현재 워크벤치는 read-only(표시만), 해소는 메타 직접 편집.

### 2026-06-14 — 잔여 미검증 4건 2026-06-14 기준 검증 (미검증 4 → 0)

사용자/시점 의존이라 남겨 뒀던 4건을 오늘 기준으로 웹 대조해 전부 해소.

- **현재 시총**: 2026-06 출처별 약 $1.97B(MacroTrends)~$2.49B(companiesmarketcap) 확인 → "약 20~25억$ (2026-06-14 기준)"로 명시, source에 "발표 시점 재확인 권장" 표기, verify 제거(시점 의존이라 날짜 박음).
- **상표출원 48/39%**: 특허청 2020.7 발표(홈트 상품 상표출원 2015~2019) — 개인 813건(48%)·기업 677건(39%, 중소 565건 33%), 2019년 506건(5년 126%↑). 머니투데이 보도로 확정. KIPRIS 재현 불필요. grade medium→strong, verify 제거.
- **유튜버**: 김계란(피지컬갤러리) 약 300만 구독자(2026-06) 확인, 더스쿠프 「…유튜버들이 뜬 시장의 비밀」 출처. grade weak→medium, verify 제거.
- **서울 폐업 141→259**: 서울 열린데이터 + 더스쿠프 보도로 교차확인. verify 제거.
- 슬라이드 12 검증 노트를 "2026-06-14 기준 전 항목 대조 완료"로 갱신.
- 결과: 워크벤치 미검증 4→**0**, 강도 강9·중3·약1, 준비완료 5/12. 남은 게이트 차단 사유는 자산(확보/확인)뿐. build 통과, JS 에러 없음.
