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

## 파일럿에서 식별한 시스템 고려사항

이 파일럿(콘텐츠·근거 검증·자산)에서 나온 **PPT 제작 시스템 설계 고려사항**은 세션 한정 todo가 아니라 일반화해 `docs/agent-workflow/deck-content-insights.md`에 정리했다 — 검증 라이프사이클, 에이전트 조사·주입, 정직성, 시점 의존 사실, 자산 라이선스, 데이터 vs 작도 분리, 게이트 일반화, provenance 구조화, **조달 주체 분류·준비도 자동 전파**, **단일 수치 선택·근거 보강 패스** 등.

financial-market 세션의 **구체적 잔여 작업**(자산 확보·단일 수치 확정·작도 등)은 별도 todo로 박아두지 않는다 — 콘텐츠 워크벤치(`/:sessionId/content`) 게이트가 무엇이 남았는지 실시간으로 보여주기 때문이다. 미검증 근거의 인앱 해소 플로우는 #3 참조.

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

### 2026-06-14 — 파일럿 인사이트(시스템 설계 고려사항) 문서화

이 파일럿(콘텐츠 + 근거 검증 + 자산)에서 드러난 **PPT 제작 시스템 구축 시 고려사항**을 일반화해 `deck-content-insights.md` 신설(규칙 아닌 참고, `deck-discovery-insights.md`와 같은 성격). 검증 라이프사이클·에이전트 조사주입·정직성·시점 의존 사실·자산 라이선스·데이터vs작도 분리·게이트 일반화·provenance 구조화 등 8개 고려사항 + 과적합 경계.

- `deck-content.md`·`deck-workflow.md`(파일럿 메모)에서 인사이트 문서 링크.
- 처음엔 잔여 작업을 financial-market 세션 한정 TODO로 적었으나, 사용자 의도(=시스템 설계 노트)에 맞춰 **자산·조사 항목까지 전부 일반화**해 인사이트 문서로 이관(고려사항 9·10 추가: 조달 주체 분류·준비도 자동 전파, 단일 수치 선택·근거 보강). 관리문서의 세션 TODO 섹션은 인사이트 문서 + 워크벤치 게이트를 가리키는 포인터로 교체. 세션 작업목록의 mis-scoped 항목(#5~#12)도 정리.

### 2026-06-14 — 게이트 보완 목록을 슬라이드 단위→구체 항목 단위로 세분화

대시보드 게이트가 슬라이드마다 "자산 미확보"로 뭉뚱그려 보여줘서, **무엇이 어떻게 부족한지** 파악이 안 된다는 피드백. 슬라이드 7장에 흩어진 자산 8건(확보 필요 1 + 확인 필요 7)이 7줄로만 보이던 문제.

- **`Content.jsx`**: per-slide `blockers`를 항목 단위 `todos`로 교체(`slideTodos(s, r)`가 본문 미작성·`status!=='have'` 자산·미검증 근거를 개별 항목으로 펼침). 카테고리 4그룹(본문 미작성 / 자산·확보 필요(need) / 자산·확인 필요(check) / 미검증 근거)으로 묶어 각 그룹에 건수 + "무엇을 어떻게" 한 줄 안내(`TODO_HINT`, 항목 단위 과한 추정은 피하고 카테고리 수준). 각 항목은 p번호·종류·설명·출처·라이선스를 그대로 노출.
- **게이트 배너**: "N개 슬라이드 보완 필요" → "N개 슬라이드 · 할 일 M건", 부제는 `자산 확보 필요 / 자산 확인 필요 / 미검증 근거 / 본문 미작성`을 분리 표기(8을 1+7로 분해).
- **CSS**: `.blockers*` 제거, `.todos`/`.todoGroup`/`.todoTag(_body/need/check/ev)`/`.todoItem` 등 추가. 항목이 늘어 사이드바 21rem→24rem.
- 검증: `npm run build` 통과, 헤드리스로 보완 목록(확보 필요 1·확인 필요 7, 각 출처·라이선스 노출)·게이트 문구 정상 확인.
- 설계 연결: 항목별 "조달 주체(에이전트/사람)" 자동 라우팅·준비도 자동 전파는 `deck-content-insights.md` 고려사항 #9로 일반화돼 있음(현재는 status/출처 텍스트로 사람이 판단). 항목 클릭→해소는 #3.

#### 후속: 보완 목록 ↔ 슬라이드 행 연결 (항목 클릭 → 스크롤·강조)

좌측 보완 목록(`.todos`)과 우측 슬라이드 행 리스트(`.list`)가 분리돼 있어, 사이드바 항목을 행에서 대조·확인할 수 없다는 피드백. 두 패널을 연결.

- **`Content.jsx`**: 보완 항목을 `<button>`으로 만들어 클릭 시 `jumpTo(id)` — 해당 행을 `scrollIntoView({block:'center'})`로 가져오고 `flashId` 상태로 1.6s 강조. 각 행에 `id="row-{id}"` 부여, `flashId` 일치 시 `.rowFlash` 클래스. (`useEffect`로 강조 타이머 정리.)
- **CSS**: `.todoItem`을 버튼으로(hover 배경·focus-visible 아웃라인), `.rowFlash` 키프레임(accent box-shadow → soft).
- 검증: 헤드리스로 보완 항목 8개 = 자산 8건 일치, p11 클릭 시 row-11 중앙 스크롤·강조 적용 확인. build 통과.

#### 후속: 워크벤치 ↔ 개요 인스펙터 연결 (`?slide=N` 딥링크)

콘텐츠 워크벤치와 개요 인스펙터(`/overview`의 `aside`)도 따로 놀아, 같은 슬라이드의 시각 계획·근거 인용·페이지 내용을 보려면 개요로 가서 노드를 다시 찾아 눌러야 했다(상단 "개요 ▦" 링크는 선택 슬라이드를 안 들고 감). 인스펙터 선택이 URL이 아니라 로컬 상태라 딥링크 불가였던 게 원인.

- **`Overview.jsx`**: 선택 상태를 URL 쿼리(`?slide=N`)와 동기화. `useSearchParams`로 `sel` 초기화(딥링크 진입 시 인스펙터 자동 오픈), `syncSelParam(id)` 헬퍼로 노드 클릭/닫기 시 URL 갱신(`replace`). HashRouter에서도 동작.
- **`Content.jsx`**: 각 슬라이드 행 헤더에 `개요 ↗` 링크(`/:sessionId/overview?slide={id}`) 추가 — 그 슬라이드의 인스펙터(시각 계획·본문·근거)로 바로 점프.
- **CSS**: `.rowLink`(행 헤더 보조 링크) 추가.
- 검증: 헤드리스로 ① `/overview?slide=7` 직접 진입 시 인스펙터 "슬라이드 7" 오픈, ② 콘텐츠 행 12개 모두 링크, row-11 클릭 시 `?slide=11`로 이동·인스펙터 "시사점 & 결론" 오픈 확인. build 통과.
- 결과: `보완 목록 → 슬라이드 행 → 개요 인스펙터(시각·본문·근거 전체)`가 한 줄로 이어짐.

#### 후속: 자산 상태에 `data-ready` 추가 (data-ready ≠ render-ready, insight #6)

보완 목록 충족 여부를 점검하니, 근거 검증 패스에서 수치·출처가 확정된 차트(p1·p4·p5·p7)가 여전히 `check`로 게이트를 막고 있었다. 데이터는 확보됐고 작도(Phase 4)만 남은 상태인데 status(`have`/`need`/`check`)가 "데이터 확보됨 vs 그려짐"을 구분 못 한 게 원인.

- **스키마**: asset status에 **`data-ready`**(데이터·소재 확보·확정, 작도만 Phase 4) 추가. 4단계 = `need`·`check`(차단) / `data-ready`·`have`(콘텐츠 완료). 게이트는 `data-ready`·`have`를 통과시키고 `need`·`check`만 막는다.
- **데이터 재분류**(`financial-market`): 수치 확정 차트 4건 + 자체 작도 도식/공공데이터 차트 5건 = 총 9건을 `data-ready`로(이전엔 일부가 `have`로 과대표기 — 그려진 건 0이라 `have`=0이 정직). check 3(시장규모 단일수치 미정·아이콘 라이선스 ×2), need 1(헬스장 실물 사진) 유지.
- **워크벤치(`Content.jsx`)**: `BLOCK_STATUS={need,check}`로 게이트/보완 목록 판정 변경, `STATUS_LABEL`에 `data-ready:'작도 대기'`, 자산 메트릭 `자산 준비 n/N`(확보·작도대기·확인·필요 분해), 게이트 부제에 `작도 대기 N(Phase 4)` 보조 표기. CSS `.st_data-ready`(파랑) 추가.
- **문서**: `deck-content.md`(status enum·게이트 정의·대시보드), 두 세션 스키마 주석, `deck-content-insights.md` #6에 파일럿 반영 기록.
- 검증: build 통과, 헤드리스로 게이트 "4개 슬라이드·할 일 4건", 자산 준비 9/13, 준비 완료 8/12, 보완 목록 확보필요1·확인필요3, 행에 작도대기 칩 9개 확인.
- 결과: 보완 목록 8→4건. 남은 차단은 단일 수치 결정 1·아이콘 라이선스 2·실물 사진 1로, 모두 콘텐츠 단계에서 실제로 사람이 결정/확보해야 하는 것만 남음.

#### 후속: 확인 필요(check) 자산 3건 확보 (check 3 → 0)

사용자 지시로 `check` 3건을 결정·확보. 모두 `data-ready`로 승격.

- **시장 규모 big-number(s2)**: 단일 수치 결정(insight #10). 웹 재확인 — Grand View Research 「Fitness App Market」 2026 약 **$13.92B**·CAGR 13.4%(→2033 $33.58B), 상한 TBRC 약 $22B. 발표용 hero 수치로 GVR $13.9B 채택·범위는 각주. asset source에 산식·출처 명기, body 첫 문구도 동기화.
- **아이콘 라이선스(s3·s11)**: 아이콘셋을 **Lucide(ISC, 무료 상업 이용·출처표기 불필요)** 로 확정. 두 자산 license 갱신.
- 검증: build 통과, 헤드리스로 게이트 "1개 슬라이드·할 일 1건", 확인 필요 0, data-ready 칩 12·check 0·need 1, 준비 완료 11/12 확인.
- 남은 차단: s1 헬스장 셔터 **실물 사진(need)** 1건 — 스톡 구매/직접 촬영이라 사람 몫(요청 시 무료 스톡 출처 제안 가능). 그 외 11/12 슬라이드는 콘텐츠 완료(작도만 Phase 4).

#### 후속: 조치 팝오버 + 이미지 업로드 (보완 항목 인라인 해소의 첫 조각)

보완 항목/자산을 클릭하면 **조치 UI가 뜨는 팝오버**를 추가. 향후 텍스트·출처·Agent 지시 등이 들어갈 자리로, 지금은 **이미지 업로드만 구현**.

- **트리거**: 슬라이드 행의 **자산 항목**(li, `role=button`) 클릭 시 팝오버 오픈 — 조치는 자산이 있는 그 자리에서. (대시보드 보완 목록 클릭은 해당 행 강조/이동으로 유지 — 같은 자산을 행에서 클릭하면 되므로 팝오버는 행 쪽에만 둔다.)
- **떠 있는 팝오버**(`Content.jsx`): `position:fixed`로 클릭 요소 rect 기준 배치(뷰포트 클램프), **레이아웃을 밀지 않음**(헤드리스로 list scrollHeight 불변 확인). 백드롭 클릭·Esc로 닫힘. 헤더에 대상 라벨 + "행으로 ↘"(jumpTo).
- **조치 탭**: 이미지(활성) / 텍스트·출처·Agent 지시(자리표시, aria-disabled "준비 중").
- **이미지 업로드**: 자산 항목 대상. 파일 선택 → `fileToDataUrl`로 긴 변 1600px·JPEG 0.85 축소 → `localStorage`(`slide-studio:asset-images:<sessionId>`, 키 `slideId:assetIdx`)에 보관. 미리보기·다시 업로드·제거. 첨부 시 행 자산에 썸네일·보완 목록 항목에 🖼 표시. **메타(status)는 자동 변경 안 함**(메타는 코드 소유, 워크벤치 read-only — 안내문 명시).
- **CSS**: `.popBackdrop/.popover/.popTabs/.popDrop/.popPreview/...`, 자산 li 클릭 가능(hover/focus), `.assetThumb`.
- 검증: build 통과, 헤드리스로 자산 클릭→팝오버(fixed)·이미지 업로드→미리보기·localStorage 키 생성·행 썸네일·무리플로우·todo 버튼 트리거 모두 확인.
- 비고: 텍스트/출처/Agent 지시 조치, 그리고 첨부로 status 자동 해소(예: 사진 업로드 시 need→have 제안)는 후속(#3 인앱 해소 플로우와 연계).

#### 후속: 이미지 드롭존 드래그&드롭 (영역 밖 드롭 + 화면 dim)

이미지 업로드를 드래그&드롭으로도 받게 함.

- **window 레벨 수신**(`Content.jsx`): 자산 팝오버가 열린 동안 `dragenter/over/leave/drop`을 window에서 듣는다. 파일 드래그면 `dragging` on → **드롭존(팝오버)만 위로 띄우고 화면 전체를 dim**(`.dragDim` z45 pointer-events:none, 팝오버 z50). enter/leave는 depth 카운터로 플리커 방지.
- **영역 밖 드롭 허용**: window `drop`에서 받으므로 드롭존 밖 어디에 놓아도 현재 자산(`slideId:assetIdx`)에 업로드. 이미지 타입만 허용.
- 드래그 중 드롭존 강조(`.popDropActive`)·문구 전환("여기에 놓으세요 — 화면 어디에 놓아도 됩니다"). 저장은 함수형 setState로 바꿔 window 핸들러 stale closure 방지.
- 검증: build 통과, 헤드리스로 합성 DragEvent(File)로 dragenter→dim·드롭존 active, (드롭존 밖)drop→미리보기·dim 해제·localStorage 키 생성 확인.

#### 후속: 업로드 이미지 그레이스케일 옵션 (무채색 톤)

업로드 이미지를 무채색 와이어프레임 톤에 맞춰 **그레이스케일(회색조, 1비트 흑백 아님)** 로 넣는 임시 옵션.

- **변환**(`Content.jsx`): `fileToDataUrl(file, { grayscale })`가 캔버스 `ctx.filter='grayscale(1)'`로 변환(8비트 회색조). 기존 dataURL용 `dataUrlToGrayscale`도 추가(되돌리기 불가).
- **UI**: 팝오버에 "흑백(그레이스케일)로 넣기" 체크박스(기본 켬). 클릭 업로드·드롭·다시 업로드 모두 적용. 기존 이미지엔 "흑백 변환" 버튼. 드롭 핸들러는 `grayscaleRef`로 최신값 참조(window stale closure 방지).
- 검증: build 통과, 헤드리스로 빨강(255,0,0) 업로드 시 켬→[54,54,54](r=g=b, 2진 아님)·끔→[255,0,0] 색 유지 확인.

#### 용어 수정: 과당경쟁 → 과잉경쟁

`financial-market` 콘텐츠 용어 통일. 슬라이드 8(제목·role·message·body)과 종합/결론(슬라이드 10·11 body) 등 6곳 일괄 치환. build 통과.

### 2026-06-14 — Phase 4(Design) 진입: 세션별 토큰 override 아키텍처 도입 (디자인 시스템 단계 1·2)

콘텐츠가 준비돼 Phase 4(Design)로 넘어가며, 그 첫 결정인 **세션별 테마 override 아키텍처**를 잠그고 코드 훅을 깔았다. 사용자 선택 = **세션별 토큰 파일 완전 분리**(shared.css만 공유). 단 "분리해도 두 덱이 `:root` 충돌하므로 scope는 여전히 필요" 보정을 반영해, 각 세션 토큰을 `[data-theme="<id>"]` 로 스코프하고 그 속성을 슬라이드가 렌더되는 모든 곳에 스탬프했다. 디자인 결정(색·폰트 등)은 없이 회귀 위험만 있는 순수 구조 작업으로 한정.

- **세션 토큰 분리**: 전역 `tokens.css`의 `:root` 디자인 토큰 전체를 세션별 파일로 이전 — `sessions/inbody-u300/tokens.css`(`[data-theme="inbody-u300"]`), `sessions/financial-market/tokens.css`(`[data-theme="financial-market"]`). **두 파일 모두 현재는 base의 verbatim 복사**라 화면 변화 0. financial-market 파일에는 "accent·surface·font·density만 디자인 단계에서 *여기서* 결정, 타이포 스케일·여백·그리드·radius는 base와 동일 유지(불변)" 규율을 주석으로 박음.
- **base = 앱-셸 폴백**: `src/tokens.css`의 `:root`는 세션 없는 표면(`<body>` 캔버스 · Home 세션 피커) 전용 폴백으로 재정의(값 불변 → 회귀 0). 헤더 주석에 "덱 디자인 토큰은 각 세션 파일이 소유, 새 세션은 자기 토큰 파일을 반드시 ship해야 하며 폴백에서 덱 테마를 상속하지 않는다" 명시.
- **data-theme 스탬프**: `Deck.jsx`(`.wrapper`)·`Overview.jsx`(`.screen`)·`Content.jsx`(`.screen`) 루트에 `data-theme={sessionId}` — 덱·개요·콘텐츠 chrome 및 콘텐츠 팝오버(`.screen` 자손)까지 CSS 변수 **인접 상속**으로 해당 세션 토큰을 해석. 두 덱은 서로의 토큰을 보지 않는다.
- **export 경로**: 오프스크린 stage엔 `.deck` 조상이 없어 `var(--…)`가 셸 폴백으로 새는 문제 → `exportSlides.jsx`의 `withOffscreenSlide`/`slideToPngBlob`/`downloadSlide`/`downloadAllSlides`에 `theme` 인자를 스레딩해 `stage.dataset.theme` 설정. `ExportControls`·`Deck`에서 `theme={sessionId}` 전달.
- **로딩**: 각 세션 `slides/index.js` 상단에 co-located `import '../tokens.css'`(세션 모듈 로드 시 전역 부착, 속성으로만 적용).
- 검증: `npm run build` 통과(CSS 93.67kB — 토큰 세트 중복으로 증가, 정상). 값이 원본 verbatim 복사라 회귀 0(이 환경에 헤드리스 브라우저 없어 런타임 캡처는 생략 — 변경 성격상 정적 보장: 인접 상속으로 덱은 세션 파일에서, 셸은 폴백에서 동일 값 해석).
- **다음 단계**(이번 커밋 아님): 3) financial-market 실제 테마 값 결정(accent 1개 등) · 4) 이 덱의 반복 패턴 카탈로그 확정 · 산출물 `docs/sessions/financial-market/design.md`(잠근 토큰 델타 + 패턴 + 변수 계약).

### 2026-06-14 — Phase 4 단계 시스템화 + financial-market accent(Oxblood) 결정·기록

디자인 시스템 단계를 **재사용 가능한 명세**로 박고, 그 첫 적용(단일 accent)을 **제시한 선택지까지 포함해** 기록했다. "이 과정을 새 라우트포인트의 시스템으로" 요청 반영 — 즉흥 결정이 아니라 *선택지 제시 → 사용자 확정 → provenance 기록*을 재현 가능한 단계로 고정.

- **단계 명세 신설**: `docs/agent-workflow/deck-design.md`(Phase 4 "헌법") — 결정 항목 순서, override 아키텍처(전역 1회 결정), 변수 계약·불변 블록, **결정 메커니즘(선택지로 되돌려준다)**, 패턴 카탈로그, 산출물/exit gate, `design.md` 템플릿. 향후 디자인 워크벤치 라우트(`/:sessionId/design`) 가능성 메모.
- **세션 결정 기록**: `docs/sessions/financial-market/design.md` 신설 — D1(override 아키텍처: 선택지 3개 중 "완전 분리" 채택 + 보정)·D2(accent: Petrol Teal·Slate Navy·Amber·**Oxblood** 4개 중 Oxblood 채택, 탈락지 포함) 결정 로그, 잠근 토큰 델타 표, 변수 계약, 패턴 카탈로그(후보), 상태.
- **accent 적용**: `sessions/financial-market/tokens.css` `--accent: #7A2230`/`--accent-soft: #F1E3E5`(Oxblood). 불변 토큰 그대로. 표지 eyebrow·deckTitle·워크벤치 chrome에 반영. build 통과.
- **레지스트리 갱신**: `deck-workflow.md`(Phase 4 행·요약·관계를 `deck-design.md`로), `agent-workflow/README.md`(child docs + read order에 `deck-content.md`·`deck-design.md` 등록), `docs/sessions/README.md`(financial-market 상태), `docs/sessions/financial-market/README.md`(stale placeholder → 현재 상태: 콘텐츠 완료·디자인 진행).
- **남은 단계**: 패턴 카탈로그 확정(2단 대조·타임라인·출처 캡션) → `design.md` 패턴/계약 마감 → Phase 5 개별 슬라이드.

### 2026-06-14 — Phase 4 패턴 카탈로그 확정 (design.md D3)

step 4(이 덱 반복 패턴 + shared 승격 여부 결정)를 `design.md`에 D3로 잠금. 12장 메타에서 반복 빈도를 도출해 거처를 결정.

- **2단 대조(US/KR, s3·s6·s9·s10·s11)** → 기존 `col-grid g2` + `col-cat` 재사용(새 클래스 X).
- **분기 흐름도(s2 부분·s10 풀)** → 세션-로컬 컴포넌트 `DivergenceFlow`(app-wide X, bespoke 도식).
- **출처 캡션(대부분)** → app-wide `shared.css` 신규 `.s-source` 1개(기존 토큰만 → 변수 계약 변화 0).
- metric/차트+캡션 → 기존 `.metric` + 아키타입 조합.
- **승격 결론**: app-wide 신규는 `.s-source` 1개뿐(시스템에도 "보더보다 여백" — 클래스 남발 금지). **구현은 build-first**: s10(종합)부터 톤 확립 후 승격, speculative 선작성 금지.
- `design.md` status `tokens-locked`→`patterns-locked`. 승인 게이트 통과 → Phase 5 착수(s10부터).

### 2026-06-14 — Phase 5 첫 슬라이드 s10(종합) + 헤드리스 자가검수 루프 도입

Phase 5(Build) 착수. 가장 정의적인 s10(종합)부터 만들어 세 패턴(분기 흐름도·2단 대조·출처 캡션)을 확립. 동시에, "만들고 끝내지 않고 렌더를 캡처해 스스로 트집 잡는" **자가검수 루프**를 도구+규칙으로 시스템화(사용자 요청).

- **s10 슬라이드**: `Slide10.jsx`/`.module.css` 신규, index.js에 `component` 연결. 구조 = 공통 충격(중앙) → accent 분기선 → 대칭 2단 비교(미국/한국) → 트레이너 운명 페이오프 pill → 결론 한 줄 → 출처. 단일 강조(oxblood: 분기·페이오프·결론), 보더 없음.
  - **정렬 1차 결함→수정**: 처음엔 분기선이 컬럼 중심을 가리키는데 텍스트는 좌측정렬, 두 레인이 독립이라 행 미정렬. → 공유 그리드(행 라벨을 `grid-column:1/-1` 중앙 축)로 재설계해 분기선↔헤드, 좌우 단계 행을 정렬.
- **`.s-source` 승격**(D3 카탈로그 실행): inbody 슬라이드들이 매번 중복하던 출처 각주를 app-wide `shared.css .s-source` 1개로. 기존 토큰만 사용 → 변수 계약 변화 0.
- **A. 헤드리스 캡처 도구**: `playwright`(devDep) + `app/scripts/shot.mjs`(`npm run shot <session>/<slide>`) — Vite 개발서버를 스스로 띄워 `[data-deck-frame]`(1280×720 프레임)만 PNG 캡처. `Deck.jsx` 프레임에 `data-deck-frame` 훅 추가. 산출물 `shot-*.png`는 `.gitignore`.
  - 실제로 s10을 캡처·확인하여 위 정렬 수정을 검증(추론이 아니라 렌더 대조). **흐름도 컴포넌트 추출(`DivergenceFlow`)은 두 번째 소비자 s2 빌드 시** (build-first).
- **B. 자가검수 규칙**: `slides-jsx-convention.md`에 "Build→렌더 캡처→체크리스트→수정" 루프 + 체크리스트(정렬·단일 강조·보더보다 여백·프레임 오버플로우·`\n`·export 패리티) 신설. "검증 못 했으면 명시" 정직성 규칙 포함.
- 남은 작업: s2(분기 흐름도 부분 버전) 빌드 시 `DivergenceFlow` 추출 → 나머지 슬라이드.

### 2026-06-14 — s2(문제 제기) + DivergenceFlow 추출 (분기 흐름도 두 번째 소비자)

분기 흐름도의 두 번째 소비자 s2를 빌드하며 build-first대로 공용 컴포넌트를 추출.

- **`DivergenceFlow` 추출**(세션-로컬 컴포넌트, D3대로): 공통 충격 노드 + accent 분기선(SVG, 240·760/1000) + 두 컬럼 중심 헤드(`col-cat accent` 재사용). `shockSub` 옵션(s2의 시장규모 서브라인). 헤드 아래 본문은 각 슬라이드가 동일한 `1fr 1fr · column-gap 3.5rem` 그리드로 이어 컬럼 정렬.
- **s10 리팩터**: 인라인 shock/fork/head 마크업·CSS를 `DivergenceFlow` 호출로 교체. 캡처로 회귀 없음 확인(렌더 동일).
- **s2 빌드**: 분기 흐름도(부분) → 두 결말(거대 자본 거품→붕괴 / 파편화→폐업, 헤드와 accent 틱으로 연결) → 큰 "왜?" 훅(단일 강조). 출처(.s-source) GVR·TBRC.
  - **자가검수 1차→수정**: 첫 캡처에서 콘텐츠가 세로로 떠 빈 공간 과다 → 결말을 키우고 헤드↔결말 accent 틱 추가, "왜?"를 2줄 포컬(muted 리드 + oxblood 대문 질문)로 만들어 세로 균형·집중도 개선. 재캡처로 확인.
- 캡처 도구(`npm run shot`)로 s2·s10 둘 다 렌더 대조 후 커밋. 진행: 9/12 슬라이드 컴포넌트 남음(현재 1·2·10 구현).

### 2026-06-14 — s4(미국 ①) + "차트+캡션" 아키타입 확립 + 캡처 도구 견고화

미국 3부작(4·5·6)의 첫 장 s4로 차트+캡션 레이아웃 아키타입을 확립.

- **s4 슬라이드**: 펠로톤 시총 급등 곡선(인라인 SVG, 급등 구간 accent-soft 음영 + 정점 493억$ 라벨) | 캡션(PSR 7.9→16.7배 metric + takeaway). 차트가 hero 수치(493억$)를 소유, 캡션은 보완 사실(PSR)을 ink로 — 단일 accent 초점.
  - **자가검수 1차→수정**: 첫 캡처에서 "493억$"가 차트·캡션 양쪽에 중복 → 캡션의 493억$ 제거, PSR을 ink metric으로 바꿔 중복 제거·강조 일원화.
- **차트+캡션 아키타입**: `.layout`(차트 ~1.55 : 캡션 1) + 차트 SVG(클래스 기반 fill/stroke → 내보내기 보존) + `.metric` 재사용 + `.s-source`. 카탈로그대로 새 shared 클래스 없이 조합. s5·s7·s8이 이 틀을 잇는다.
- **캡처 도구 견고화**: `shot.mjs` 의 `waitUntil`을 `networkidle`→`commit`(Vite HMR 웹소켓이 networkidle/load를 무한 대기시키는 문제) + 프레임 셀렉터 대기 45s(빌드 16s까지 느려지는 고부하 상황 대응). 이제 안정적으로 캡처.

### 2026-06-14 — s5·s6 (미국 ②③) — 미국 3부작 완성

차트+캡션 아키타입으로 미국 사례 3장(4·5·6) 완성.

- **s5(거품이 꺼지다)**: 정점↔현재 막대(493억$ → 약 24억$) + 점선 −95% 붕괴 주석(accent hero) | 2,800명 감원 metric(ink) + takeaway.
- **s6(트레이너 보호)**: Asset vs Cost 구조도 — 잘라낸 비용(본사 20%·마케팅·물류, 중립 목록) | 지킨 자산(트레이너·강사진, 연 최대 50만$, accent-soft 카드). 결론: 트레이너=핵심 자산. s9(한국, 트레이너=비용)와 대비 복선.
  - **자가검수→수정**: asset 카드가 `align-self:stretch`로 전체 높이를 채워 빈 박스가 큼 → 콘텐츠 높이로 줄이고 양 컬럼 중앙 정렬, 강조는 크기 아닌 accent-soft 채움으로.
- 각 슬라이드 캡처로 렌더 대조(s4 493억$ 중복·s6 카드 높이를 자가검수로 잡음). 진행: 1·2·4·5·6·10 구현(6/12), 남음 3·7·8·9·11·12.

### 2026-06-14 — s7·s8·s9 (한국 ①②③) — 한국 3부작(미국 대칭) 완성

미국에서 만든 패턴을 한국 사례에 대칭 적용해 3장 완성.

- **s7(파편화)** ↔ s4: 출원인 유형 도넛(개인 48%·기업 39%·기타 13%, 개인 accent) + 유튜버 약 300만 metric(ink). 차트+캡션.
- **s8(과잉경쟁·폐업)** ↔ s5: 서울 체력단련장 폐업 141→259개 막대 + 점선 +84% 상승(accent hero) + 987건 선불 먹튀 metric(ink). s5의 붕괴를 상승으로 대칭.
- **s9(레몬화)** ↔ s6: 인과 체인(구조→전이→결과→레몬시장 accent 카드) + 결론 "미국과 정반대 — 구조가 만든 레몬시장" + 정직성 노트(단일 통계 대신 구조적 추론+방증). s6의 트레이너=자산을 비용으로 반전.
- 셋 다 캡처 자가검수 통과(정렬·단일 accent·프레임·`\n`→pre-line). 진행: 1·2·4·5·6·7·8·9·10 구현(9/12), 남음 3·11·12.

### 2026-06-14 — s3·s11·s12 — financial-market 덱 12/12 완성

남은 3장을 빌드해 전 슬라이드 구현 완료(Phase 5 Build 종료).

- **s3(분석 틀)**: 두 분석 렌즈(자본 배분 비효율→거품 / 정보 비대칭→레몬시장, accent) + 미국=자본시장·한국=소상공인 설정. s4·s7 분기 전 프레임.
- **s11(시사점)**: 3 시사점 아이콘 카드(분기·저울·방패 인라인 SVG, ISC 라이선스 — Lucide 계열 단순 라인) + 클로징 "구조가 운명을 가른다".
- **s12(참고자료)**: 8개 출처 2단 목록(좌측 hairline) + 2026-06-14 검증 노트.
- 셋 다 캡처 자가검수 통과. **financial-market 12/12 구현 완료** — 발표/개요/콘텐츠/내보내기 전 경로 동작.

### 2026-06-14 — 표지 사진 삽입 (그레이스케일 풀블리드)

- **표지(s1) 갱신**: 옛 placeholder("금융시장과 금융기관")를 실제 덱 타이틀("같은 충격, 다른 실패")로 교체하고, 폐업 헬스장 사진을 **그레이스케일 풀블리드**로 삽입. 사진을 세션 자산으로 이전(`assets/gym-closure.webp`), CSS `filter: grayscale(1)` + 좌측 스크림으로 타이틀 가독성, oxblood accent bar로 단일 강조 유지. 캡처 자가검수 통과.
  - **자산 정직성**: 사진에 **김포신문 워터마크**(보도사진) → s1 asset의 source/license에 명시("외부 공개/배포 시 이용 허락·출처표기 확인 필요"), status `need`→`have`. 콘텐츠 게이트의 마지막 차단 자산 해소(단, 라이선스 caveat 남김).

### 2026-06-14 — 슬라이드 줄바꿈·정렬 다듬기 (폴리시 패스)

전 슬라이드 가독성·정렬 폴리시(빌드/캡처 자가검수 기반).

- **줄바꿈**: 본문/결론/설명 텍스트에 의도적 `\n`을 넣고, 렌더하는 클래스에 `white-space: pre-line` 적용(s1 `.sub`, s2 `.askBig`, s4~s8 `.take`, s6·s9·s10 `.verdict`, s11 `.cardDesc`, s12 `.note`). `\n`은 데이터로, 표시는 CSS로(convention 준수).
- **정렬·문구**: s2 문구 톤 조정('정반대의 결말'→'다른 양상의 결말'), s3 미국↔한국 설정을 렌즈 카드와 동일 2열 그리드로 맞춰 ①→미국 / ②→한국 정렬.
- build 통과.

### 2026-06-14 — 작업방식 복기 + 자가검수 체크리스트 보강 (문서화)

- **작업방식 복기**: `deck-build-insights.md` 신설 — Phase 4~5를 실제로 수행한 방식을 자동화 참고로 정리(자가검수 루프=최대 자동화 가치 / 선택지로 결정 / build-first+2nd-consumer 추출 / 미러 슬라이드 / 패턴 라이브러리 / 자동화 vs 사람 게이트 / 자가검수가 잡은 실제 결함 사례). `agent-workflow/README.md`·`deck-workflow.md`에 등록.
- **체크리스트 보강**: `slides-jsx-convention.md` 자가검수에 항목 추가 — ① 카드 내부 정렬(카드끼리 대칭 ≠ 카드 내부 정렬), ② 가독성(여백 넉넉한데 텍스트가 최소치면 타입 스케일 ↑), ③ "수정 후 재캡처는 바뀐 부분만이 아니라 슬라이드 전체를 체크리스트로 다시 본다"(한 곳 수정이 다른 정렬을 어긋내는 실제 사례 반영).
