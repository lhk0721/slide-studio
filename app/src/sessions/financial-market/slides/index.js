import '../tokens.css' // deck design tokens, scoped to [data-theme="financial-market"]
import Slide01 from './Slide01'
import Slide02 from './Slide02'
import Slide04 from './Slide04'
import Slide10 from './Slide10'

// ─────────────────────────────────────────────────────────────
//  SLIDE META — 발표 "같은 충격, 다른 실패" (국제시장과 금융기관).
//  Notion 기획 트래커(발표 슬라이드 DB)에서 이식한 내러티브 메타.
//  스키마는 inbody-u300/slides/index.js 주석 참고
//  (group/role/message/evidence/visual/body/notes/assets).
//
//  evidence 항목은 문자열 또는 { stat, source?, url?, verify?, grade? } 객체.
//  객체면 인스펙터 "자세히 보기" 드로어에서 수치·출처(인용)·검증으로 펼쳐진다.
//  source는 실제 슬라이드에 적을 각주체 인용구로 충실히 쓰고, url이 있으면
//  드로어의 출처가 클릭 가능한 링크(↗)가 된다.
//  grade('strong'|'medium'|'weak')는 Phase 3 콘텐츠 워크벤치의 근거 강도(비대칭
//  전략)이고, verify가 있으면 "미검증/확인 필요"로 집계된다.
//
//  assets[]는 Phase 3에서 그 슬라이드에 필요한 시각/데이터 자산 목록:
//    { kind, desc, source?, license?, status }
//    status: 'need'(미확보) | 'check'(출처·라이선스·수치 확인필요)
//          | 'data-ready'(데이터·소재 확보·확정, 작도만 Phase 4에 남음)
//          | 'have'(완전 확보/제작완료).
//  콘텐츠 워크벤치(/:sessionId/content)에서 집계되며, 게이트는 data-ready·have를
//  "콘텐츠 완료"로 통과시키고 need·check만 차단한다(data-ready ≠ render-ready, insight #6).
//
//  `component`는 실제로 만든 슬라이드만 연결한다. 아직 안 만든 장은
//  메타만 채워 두면 리뷰 UI(Overview·Inspector)에는 보이고,
//  발표 모드에서는 빈 화면으로 표시된다(Deck는 component 없으면 skip).
//
//  `next`는 흐름도(Overview)의 분기/합류 엣지. 생략하면 다음 번호로
//  선형 연결된다. 분기/합류가 있을 때만 명시한다.
//
//  ※ 이 메타는 Notion 기획(Phase 1 발굴 → Phase 2 구조)의 산출물이다.
//    추후 LLM/동기화로 Notion 내용을 이 배열로 자동 갱신하는 것을 목표로 한다.
// ─────────────────────────────────────────────────────────────
const slides = [
  {
    id: 1, title: '표지', component: Slide01,
    group: '도입', role: '표지',
    message: '동일한 코로나 충격이 자본 조달 구조 차이를 거쳐 서로 다른 시장실패로 귀결된다',
    visual: '좌: 펠로톤 주가 폭락 곡선 / 우: 한국 헬스장 셔터 내림 (또는 미니멀 타이틀)',
    body: [
      '같은 충격, 다른 실패',
      '— 코로나라는 동일한 충격, 미국과 한국 피트니스 시장의 엇갈린 결말',
      '국제시장과 금융기관 | 발표자 이현규',
    ],
    assets: [
      { kind: 'chart', desc: '펠로톤 주가/시총 폭락 곡선', source: 'MacroTrends (PTON)', license: '데이터 인용 + 자체 작도', status: 'data-ready' },
      { kind: 'photo', desc: '한국 헬스장 셔터 내림 사진', source: '미정(스톡/직접 촬영)', license: '상업용 라이선스 확인 필요', status: 'need' },
    ],
    notes: '발표자 이현규 · 국제시장과 금융기관',
  },
  {
    id: 2, title: '문제 제기 — 같은 출발, 다른 결말', component: Slide02,
    group: '문제 제기', role: '문제 제기',
    message: '코로나는 전 세계 피트니스 수요를 똑같이 끌어올렸지만, 미국과 한국의 결과는 갈렸다 — 왜?',
    evidence: [
      {
        stat: '글로벌 피트니스 앱 시장은 팬데믹 이후 급성장 — 2026년 전망 기관별 약 $14B(Grand View)~$22B(TBRC)로 편차',
        source: 'Grand View Research 「Fitness App Market Report」(2026 약 $13.9B) · The Business Research Company 「Fitness App Global Market Report 2026」(약 $22B) — 기관별 전망 상이',
        url: 'https://www.thebusinessresearchcompany.com/report/fitness-app-global-market-report',
        grade: 'weak',
      },
    ],
    visual: '공통 충격 → 시장 구조 분기 (다이어그램 상단 2칸, big-number 훅)',
    body: [
      '코로나19는 전 세계 피트니스 수요를 동시에 끌어올렸다.',
      '글로벌 피트니스 앱 시장 약 $13.9B(2026, GVR)로 급성장 — 기관별 약 $14~22B.',
      '그러나 같은 출발선에서 미국과 한국의 결말은 정반대였다.',
      '미국 — 거대 자본의 거품과 붕괴 / 한국 — 시장의 파편화와 폐업.',
      '왜 같은 충격이 서로 다른 실패로 이어졌는가?',
    ],
    assets: [
      { kind: 'diagram', desc: '공통 충격 → 시장 분기 다이어그램', source: '자체 작도', status: 'data-ready' },
      { kind: 'data', desc: '시장 규모 big-number — 약 $13.9B (2026, GVR 기준)', source: 'Grand View Research 「Fitness App Market」: 2026 약 $13.92B·CAGR 13.4%(→2033 $33.58B). 발표용 단일 수치로 GVR 채택, 상한 TBRC 약 $22B는 각주 범위 표기', license: '수치 인용', status: 'data-ready' },
    ],
  },
  {
    id: 3, title: '분석 틀 — 시장실패와 자본 조달', next: [4, 7],
    group: '분석 틀', role: '분석 틀',
    message: "시장실패(자원의 비효율적 배분)를 '자본이 어떤 구조로 조달·배분됐는가'로 해석한다",
    evidence: [
      '① 자본 배분의 비효율(거품): 밸류에이션이 펀더멘털과 분리',
      '② 정보 비대칭·레몬시장(인력시장): 품질 하향·신뢰 붕괴',
    ],
    visual: '미국=자본시장 주도(VC/IPO) vs 한국=소상공인·콘텐츠 주도, 2×2 아이콘 대비',
    body: [
      '시장실패란 자원이 비효율적으로 배분되는 상태를 말한다.',
      '이 발표는 그 원인을 “자본이 어떤 구조로 조달·배분됐는가”로 본다.',
      '① 자본 배분의 비효율(거품): 밸류에이션이 펀더멘털과 분리된다.',
      '② 정보 비대칭·레몬시장: 품질 하향과 신뢰 붕괴(Akerlof, 1970).',
      '미국은 자본시장(VC·IPO)이, 한국은 소상공인·콘텐츠가 시장을 주도했다.',
    ],
    assets: [
      { kind: 'diagram', desc: '미국 vs 한국 2×2 아이콘 대비', source: '자체 작도', license: 'Lucide 아이콘 (ISC, 무료 상업 이용·출처표기 불필요)', status: 'data-ready' },
    ],
    notes: '출처: Akerlof(1970) The Market for Lemons',
  },
  {
    id: 4, title: '미국 ① — 자본이 몰리다', component: Slide04,
    group: '미국 사례', role: '자본 집중(거품 형성)',
    message: 'VC·공모시장 자본이 펠로톤·ClassPass에 집중되며 밸류에이션이 펀더멘털과 분리됐다',
    evidence: [
      {
        stat: '펠로톤 시가총액 2021년 1월 정점 약 493억$',
        source: 'MacroTrends, 「Peloton Interactive Market Cap 2018–2025 (PTON)」 — 월별 시가총액 추이',
        url: 'https://www.macrotrends.net/stocks/charts/PTON/peloton-interactive/market-cap',
        grade: 'strong',
      },
      {
        stat: 'PSR(주가매출비율): IPO 시 7.9배 → 정점 약 16.7배',
        source: 'stockanalysis.com 「PTON Statistics」 — 정점 시총 약 493억$ ÷ 당시 TTM 매출 약 29.5억$ ≈ 16.7배 (FY2021 연매출 $4.02B 기준이면 약 12배)',
        url: 'https://stockanalysis.com/stocks/pton/',
        grade: 'medium',
      },
    ],
    visual: '시총 또는 PSR 추이 곡선 (급등 구간 음영 강조)',
    body: [
      '2019–2021년, 미국 피트니스에 자본이 폭발적으로 몰렸다.',
      '펠로톤 시가총액은 2021년 1월 약 493억$로 정점을 찍었다.',
      'VC·공모시장은 “팬데믹 = 구조적 전환”이라는 서사에 베팅했다.',
      'PSR(주가매출비율) IPO 7.9배 → 정점 16.7배 — 가격이 매출보다 빠르게 팽창.',
      '밸류에이션이 펀더멘털에서 멀어지는 전형적 거품 형성.',
    ],
    assets: [
      { kind: 'chart', desc: '펠로톤 시총/PSR 추이 곡선 (급등 음영)', source: 'MacroTrends · stockanalysis', license: '데이터 인용 + 자체 작도', status: 'data-ready' },
    ],
  },
  {
    id: 5, title: '미국 ② — 거품이 꺼지다',
    group: '미국 사례', role: '거품 붕괴',
    message: '금리 정상화로 밸류에이션이 붕괴, 대규모 구조조정 — 전형적 금융 거품 사이클',
    evidence: [
      {
        stat: '시총 고점(약 493억$) 대비 약 95% 증발 → 2026.6 현재 약 20~25억$ (2026-06-14 기준, 출처별 약 19.7~24.9억$)',
        source: 'companiesmarketcap·MacroTrends·stockanalysis (2026-06 시가총액) — 변동성 큼, 발표 시점 재확인 권장',
        url: 'https://companiesmarketcap.com/peloton/marketcap/',
        grade: 'strong',
      },
      {
        stat: '매출: FY2020 약 18억$ 이후 감소세',
        source: 'Peloton Interactive, 「Form 10-K (FY2020, 회계연도 2020.6.30)」, SEC EDGAR',
        url: 'https://www.sec.gov/Archives/edgar/data/1639825/000163982520000122/pton-20200630.htm',
        grade: 'strong',
      },
      {
        stat: '2022년 전사 약 2,800명 감원',
        source: 'Bloomberg, 「Peloton’s Famous Instructors … Escape Layoffs」 (2022.2.8) — 전사 약 2,800명 감원 발표',
        url: 'https://www.bloomberg.com/news/articles/2022-02-08/peloton-instructors-making-up-to-500-000-a-year-escape-cuts',
        grade: 'strong',
      },
    ],
    visual: '슬라이드 4 곡선의 붕괴 구간 / 고점↔현재 막대 대비(493억 vs 약 24억)',
    body: [
      '2022년 금리 정상화와 함께 밸류에이션이 붕괴했다.',
      '시가총액은 고점 대비 약 95% 증발 (2026.6 현재 약 20~25억$).',
      '매출도 FY2020 약 18억$ 이후 감소세로 전환.',
      '2022년 전사 약 2,800명 감원 — 전형적 금융 거품 사이클.',
    ],
    assets: [
      { kind: 'chart', desc: '붕괴 구간 곡선 + 고점↔현재 막대 대비', source: 'stockanalysis · SEC 10-K', license: '데이터 인용 + 자체 작도', status: 'data-ready' },
    ],
  },
  {
    id: 6, title: '미국 ③ — 그런데 트레이너는 살아남았다', next: [10],
    group: '미국 사례', role: '반전 — 트레이너 보호',
    message: '극심한 비용 압박에도 트레이너는 보호 — 구독 가치의 원천(핵심 자산)이기 때문',
    evidence: [
      {
        stat: '스타 강사 연 최대 50만$ 보수',
        source: 'Bloomberg, 「Peloton’s Famous Instructors, Who Can Make Upwards of $500,000 a Year, Escape Layoffs」 (2022.2.8)',
        url: 'https://www.bloomberg.com/news/articles/2022-02-08/peloton-instructors-making-up-to-500-000-a-year-escape-cuts',
        grade: 'strong',
      },
      {
        stat: '대규모 감원에서 강사진(instructor)은 제외',
        source: 'Bloomberg (2022.2.8) — 강사진은 감원 대상에서 보호되었다고 보도',
        url: 'https://www.bloomberg.com/news/articles/2022-02-08/peloton-instructors-making-up-to-500-000-a-year-escape-cuts',
        grade: 'strong',
      },
      {
        stat: '감원은 본사 직군(약 20%)·마케팅·물류(창고 축소→3PL)에 집중, 강사진은 제외',
        source: 'CNN 「Peloton is replacing its CEO and cutting 2,800 jobs」 (2022.2.8) — 본사 약 20% 감축·물류 창고 축소($800M 절감), 공동창업자 John Foley 주주서한',
        url: 'https://www.cnn.com/2022/02/08/business/peloton-layoffs-new-ceo',
        grade: 'strong',
      },
    ],
    visual: '"비용↓ 핵심자산 보호" 구조도(Asset vs Cost) + 강사 보수 콜아웃',
    body: [
      '그런데 극심한 비용 압박 속에서도 “강사(instructor)”는 보호받았다.',
      '스타 강사의 보수는 연 최대 50만$ 수준.',
      '대규모 감원에서도 강사진은 감원 대상에서 제외됐다.',
      '이유: 강사는 구독 가치의 원천 — 비용이 아니라 핵심 자산이기 때문.',
      '(한국 사례와의 대비를 위한 복선)',
    ],
    assets: [
      { kind: 'diagram', desc: 'Asset vs Cost 구조도 + 강사 보수 콜아웃', source: '자체 작도 / Bloomberg 인용', status: 'data-ready' },
    ],
    notes: '한국 대비를 위한 복선',
  },
  {
    id: 7, title: '한국 ① — 거품 대신 파편화',
    group: '한국 사례', role: '파편화',
    message: '진입장벽이 낮아 자본이 한 곳에 모이지 못하고 개인사업자·중소기업·유튜버로 분산됐다',
    evidence: [
      {
        stat: '홈트레이닝 상품 상표출원(2015~2019): 개인 813건(48%) / 기업 677건(39%, 중소기업 565건 33%) — 2019년 506건으로 5년 새 126%↑',
        source: '특허청 (2020.7 발표, 홈트레이닝 관련 상품 상표출원 분석) · 머니투데이 보도',
        url: 'https://news.mt.co.kr/mtview.php?no=2020071912008226880',
        grade: 'strong',
      },
      {
        stat: '무료 운동 유튜버 부상 — 김계란(피지컬갤러리) 약 300만 구독자 등 (2026-06 기준)',
        source: '더스쿠프 「김계란·핏블리… 이 유튜버들이 뜬 시장의 비밀」 · 채널 공개 구독자 수',
        url: 'https://www.thescoop.co.kr/news/articleView.html?idxno=56373',
        grade: 'medium',
      },
    ],
    visual: '미국=소수 거대 플랫폼 vs 한국=다수 점(파편화) 분포 대비 / 출원 비율 도넛',
    body: [
      '한국에는 펠로톤 같은 거대 자본 플랫폼이 형성되지 않았다.',
      '진입장벽이 낮아 자본이 한 곳에 모이지 못했다.',
      '홈트 상표출원: 약 48% 개인 / 39% 기업(그중 33% 중소기업).',
      '무료 운동 유튜버(김계란·핏블리 등)로 콘텐츠가 분산.',
      '거품 대신 “파편화”가 일어났다.',
    ],
    assets: [
      { kind: 'chart', desc: '상표출원 출원인 유형 도넛 + 분포 대비', source: '특허청 KIPRIS', license: '데이터 인용 + 자체 작도', status: 'data-ready' },
    ],
  },
  {
    id: 8, title: '한국 ② — 과잉경쟁과 오프라인 붕괴',
    group: '한국 사례', role: '과잉경쟁·오프라인 붕괴',
    message: '분산된 시장은 박리다매·과잉경쟁으로, 오프라인은 대규모 폐업으로 — 소상공인 시장의 취약성',
    evidence: [
      {
        stat: '서울 체력단련장 폐업: 2019년 141개 → 2021년 259개 (코로나 전후 급증)',
        source: '서울 열린데이터광장 「서울시 체력단련장업 인허가 정보」(OA-16142, 폐업일 기준) · 더스쿠프 보도로 교차확인',
        url: 'https://data.seoul.go.kr/dataList/datasetView.do?serviceKind=1&currentPageNo=1&srvType=A&infId=OA-16142',
        grade: 'strong',
      },
      {
        stat: '선불 멤버십 ‘먹튀’ 피해 — 폐업 관련 선불거래 피해구제 2020~2025.8 약 987건(피해액 약 2.1억원), 체육시설업 70%+(헬스장 35.6%·필라테스 33.8%), 92%가 해지·환불 분쟁',
        source: '한국소비자원(폐업 선불거래 피해구제 통계) · 서울경제 「선불 받더니 폐업 ‘먹튀’…헬스장·필라테스 최다」 보도',
        url: 'https://www.sedaily.com/NewsView/2GZ6BUUBFT',
        grade: 'medium',
      },
    ],
    visual: '폐업 추이 막대그래프(2019→2020→2021)',
    body: [
      '분산된 시장은 박리다매·과잉경쟁으로 흘렀다.',
      '선불 멤버십 구조 + 출혈 경쟁 + “먹튀” 리스크.',
      '서울 체력단련장 폐업: 2019년 141개 → 2021년 259개.',
      '오프라인은 대규모 폐업으로 — 소상공인 시장의 구조적 취약성.',
    ],
    assets: [
      { kind: 'chart', desc: '서울 체력단련장 폐업 추이 막대그래프', source: '서울 열린데이터광장 OA-16142', license: '공공데이터(자유 이용)', status: 'data-ready' },
    ],
  },
  {
    id: 9, title: '한국 ③ — 트레이너는 비용으로 남았다', next: [10],
    group: '한국 사례', role: '트레이너 = 비용(레몬화)',
    message: '트레이너를 핵심 자산으로 안을 거대 자본 플랫폼이 없어, 박리다매 압력이 인력시장으로 전이 → 저임금·고이직·품질 하향(레몬시장)',
    evidence: [
      '단일 통계보다 구조적 추론 + 폐업률·이직 등 방증으로 제시',
      '미국(펠로톤 수치)과 비대칭적으로, 한국은 구조가 만든 결과로 논증',
    ],
    visual: '슬라이드 6과 짝: 자산(US) vs 비용(KR) 대비 도식 + "박리다매 압력→인력시장" 화살표',
    body: [
      '트레이너를 “자산”으로 끌어안을 거대 자본 플랫폼이 없었다.',
      '박리다매 압력이 그대로 인력시장으로 전이됐다.',
      '저임금·고이직 → 품질 하향과 신뢰 붕괴(레몬시장).',
      '미국이 강사를 핵심 자산으로 보호한 것과 정반대의 결과.',
      '(정량은 폐업·이직 등 방증으로 정직하게 보강)',
    ],
    assets: [
      { kind: 'diagram', desc: '자산(US) vs 비용(KR) 대비 도식 + 화살표', source: '자체 작도', status: 'data-ready' },
    ],
    notes: '정량 근거는 폐업/이직 등 주변 지표로 보강(정직하게 제시)',
  },
  {
    id: 10, title: '종합 — 구조가 운명을 가른다', component: Slide10,
    group: '종합', role: '종합(클라이맥스)',
    message: '같은 충격·같은 산업인데 자본 조달 구조가 실패의 형태와 인적자본의 운명을 갈랐다',
    evidence: [
      '미국: 자본시장 거품·붕괴 / 트레이너 보호',
      '한국: 소상공인 과잉경쟁·폐업 / 트레이너 레몬화',
    ],
    visual: '전체 분기 다이어그램 풀버전 — 공통 충격 → (미/한) 구조 분기 → 서로 다른 시장실패 (좌/우 대칭)',
    body: [
      '같은 충격, 같은 산업 — 그러나 자본 조달 구조가 운명을 갈랐다.',
      '미국: 자본시장 거품·붕괴 / 강사는 자산으로 보호.',
      '한국: 소상공인 과잉경쟁·폐업 / 트레이너는 비용으로 레몬화.',
      '시장실패의 “형태”와 인적자본의 “운명”이 모두 구조에서 갈렸다.',
    ],
    assets: [
      { kind: 'diagram', desc: '전체 분기 다이어그램 풀버전(좌/우 대칭)', source: '자체 작도', status: 'data-ready' },
    ],
    notes: '앞 슬라이드(4~9) 핵심 수치·근거 압축',
  },
  {
    id: 11, title: '시사점 & 결론',
    group: '결론', role: '시사점·결론',
    message: '시장실패는 하나의 형태가 아니라 구조의 함수다',
    evidence: [
      '동일 산업도 자본 조달 방식이 다르면 정책 처방도 달라야 (미국=자본시장 규율 / 한국=소상공인 보호·계약 투명성)',
      "인적자본은 '자산으로 인식되는 구조'에서만 보호된다",
    ],
    visual: '3개 시사점 아이콘 카드',
    body: [
      '시장실패는 하나의 형태가 아니라 “구조의 함수”다.',
      '동일 산업도 자본 조달 방식이 다르면 정책 처방도 달라야 한다.',
      '미국형 — 자본시장 규율 / 한국형 — 소상공인 보호·계약 투명성.',
      '인적자본은 “자산으로 인식되는 구조”에서만 보호된다.',
    ],
    assets: [
      { kind: 'image', desc: '3개 시사점 아이콘 카드', source: '자체 작도', license: 'Lucide 아이콘 (ISC, 무료 상업 이용·출처표기 불필요)', status: 'data-ready' },
    ],
  },
  {
    id: 12, title: '참고자료',
    group: '부록', role: '참고자료',
    message: '출처 정리 및 발표 전 검증 체크리스트',
    body: [
      '본 발표의 데이터·이론 출처는 아래와 같다. (드로어에서 링크 확인)',
      '세부 수치는 발표 직전 최신값으로 갱신·검증한다.',
    ],
    evidence: [
      {
        stat: '펠로톤 재무·공시 (시총·PSR·매출)',
        source: 'Peloton Interactive, 「Form 10-K」(FY2020·FY2022), SEC EDGAR (CIK 0001639825)',
        url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001639825&type=10-K',
      },
      {
        stat: '시총·PSR·매출 추이 데이터',
        source: 'MacroTrends 「Peloton Market Cap」 / stockanalysis.com 「PTON Statistics」',
        url: 'https://www.macrotrends.net/stocks/charts/PTON/peloton-interactive/market-cap',
      },
      {
        stat: '강사 보수·감원 보도',
        source: 'Bloomberg 「Peloton’s Famous Instructors … Escape Layoffs」(강사 보수) · CNN 「Peloton is replacing its CEO and cutting 2,800 jobs」(감원·CEO 교체) (2022.2.8)',
        url: 'https://www.cnn.com/2022/02/08/business/peloton-layoffs-new-ceo',
      },
      {
        stat: '서울 체력단련장 폐업 통계',
        source: '서울 열린데이터광장, 「서울시 체력단련장업 인허가 정보」(OA-16142)',
        url: 'https://data.seoul.go.kr/dataList/datasetView.do?serviceKind=1&currentPageNo=1&srvType=A&infId=OA-16142',
      },
      {
        stat: '홈트 상표출원 통계',
        source: '특허청 KIPRIS 특허정보검색서비스(상표 검색)',
        url: 'https://www.kipris.or.kr/kportal/search/search_trademark.do',
      },
      {
        stat: '글로벌 피트니스 앱 시장 전망',
        source: 'Grand View Research / The Business Research Company 「Fitness App Market Report」 (2026 전망, 기관별 상이)',
        url: 'https://www.grandviewresearch.com/industry-analysis/fitness-app-market',
      },
      {
        stat: '헬스장 선불 멤버십 피해 통계',
        source: '한국소비자원(폐업 선불거래 피해구제) · 서울경제 보도 (체육시설업 ‘먹튀’ 피해)',
        url: 'https://www.sedaily.com/NewsView/2GZ6BUUBFT',
      },
      {
        stat: '정보 비대칭·레몬시장 이론',
        source: 'Akerlof, G. A. (1970) 「The Market for ‘Lemons’: Quality Uncertainty and the Market Mechanism」, QJE 84(3): 488–500',
        url: 'https://doi.org/10.2307/1879431',
      },
    ],
    notes:
      '검증: 2026-06-14 기준 전 항목 1차/2차 출처 대조 완료. 시점 의존 수치(현재 시총·유튜버 구독자)는 발표 시점에 재확인 권장.',
  },
]

export default slides
