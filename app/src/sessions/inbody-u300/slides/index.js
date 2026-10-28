import '../tokens.css' // deck design tokens, scoped to [data-theme="inbody-u300"]
import Slide01 from './Slide01'
import Slide02 from './Slide02'
import Slide03 from './Slide03'
import Slide04 from './Slide04'
import Slide05 from './Slide05'
import Slide06 from './Slide06'
import Slide07 from './Slide07'
import Slide08 from './Slide08'
import Slide09 from './Slide09'
import Slide10 from './Slide10'
import Slide11 from './Slide11'
import Slide12 from './Slide12'
import Slide13 from './Slide13'
import Slide14 from './Slide14'
import Slide15 from './Slide15'
import Slide16 from './Slide16'
import Slide17 from './Slide17'

// ─────────────────────────────────────────────────────────────
//  SLIDE META — one entry per slide. Drives BOTH the deck render
//  (`component`) and the review UI (Overview flow + Inspector).
//   id        slide number (1-based)
//   title     short tab/nav label
//   component the React slide
//   group     narrative section — lanes in the flow diagram
//   role      function in the storyline (one line)
//   message   the single claim the slide makes (one line)
//   evidence  supporting points/data (optional). Each item is a
//             string OR { stat, source?, url?, verify?, grade? }; objects
//             expand into 수치·출처·검증 in the inspector "자세히 보기" drawer.
//             source는 슬라이드 각주체 인용구로, url이 있으면 출처가 링크가 된다.
//             grade('strong'|'medium'|'weak')는 Phase 3 콘텐츠 워크벤치의
//             근거 강도, verify가 있으면 미검증으로 집계된다.
//   assets    Phase 3 필요 자산 목록 (optional, []). 각 항목은
//             { kind, desc, source?, license?, status }. 콘텐츠 워크벤치에서 집계.
//             status: 'need'(미확보) | 'check'(출처·라이선스·수치 확인필요)
//                   | 'data-ready'(데이터·소재 확보·확정, 작도만 Phase 4에 남음)
//                   | 'have'(완전 확보/제작완료).
//             게이트는 data-ready·have를 "콘텐츠 완료"로 통과시키고
//             need·check만 차단한다(data-ready ≠ render-ready, insight #6).
//   visual    key visual element note (optional)
//   body      실제 슬라이드에 들어갈 본문/문구 초안 (선택, string[]).
//             각 항목이 한 줄/불릿으로 인스펙터 "페이지 내용" 섹션에 표시된다.
//   notes     speaker note (optional)
//   next      flow-diagram edges: id[] this slide points to. Omit for
//             linear order (→ id+1); set only for branches/merges.
// ─────────────────────────────────────────────────────────────
const slides = [
  {
    id: 1, title: '타이틀', component: Slide01,
    group: '도입', role: '표지',
    message: 'TRACKER — 모션캡쳐 스튜디오 피치덱',
    visual: '브랜드 타이틀(텍스트 중심)',
  },
  {
    id: 2, title: '문제 ① 부상·성과', component: Slide02,
    group: '문제', role: '문제 제기',
    message: '부상도 성과도, 결국 3D 관절 부하의 문제다',
  },
  {
    id: 3, title: '문제 ② 시장 실패', component: Slide03,
    group: '문제', role: '시장 실패',
    message: '정량 분석의 부재 — 피트니스 산업의 구조적 시장 실패',
  },
  {
    id: 4, title: '솔루션·핵심기술', component: Slide04,
    group: '솔루션', role: '해법·핵심기술',
    message: '다시점 비전AI로 3D 실시간 스켈레톤 복원 — 초개인화 분석의 시작',
  },
  {
    id: 5, title: '시장 가치', component: Slide05,
    group: '가치', role: '가치 제안',
    message: '실패한 시장의 세 주체를 동시에 바로 세운다',
  },
  {
    id: 6, title: '비즈니스 모델 ① 검증·락인', component: Slide06,
    group: '비즈니스 모델', role: '검증·락인',
    message: '작게 검증하고, 데이터로 락인한다',
  },
  {
    id: 7, title: '비즈니스 모델 ② 플랫폼 확장', component: Slide07,
    group: '비즈니스 모델', role: '플랫폼 확장',
    message: '점유율 위에 데이터 플랫폼을 얹는다',
  },
  {
    id: 8, title: '비즈니스 모델 ③ 공간 확장', component: Slide08,
    group: '비즈니스 모델', role: '공간 확장',
    message: '검증된 엔진을 공간과 종목으로 넓힌다',
  },
  {
    id: 9, title: '시장 규모·GTM', component: Slide09,
    group: '시장', role: '시장 규모·확장 경로',
    message: '크고 성장하는 시장, 명확한 확장 경로',
  },
  {
    id: 10, title: 'Why Now · 시장 동향', component: Slide10,
    group: '시장', role: '타이밍',
    message: '왜 지금인가 — 세 시장 동향이 한 점으로 수렴',
  },
  {
    id: 11, title: '경쟁 ① 앱·단시점', component: Slide11,
    group: '경쟁', role: '경쟁 한계 ①',
    message: '기존 솔루션 한계 ① — 통제되지 않은 단시점, 이진 판정에 그친다',
  },
  {
    id: 12, title: '경쟁 ② 론픽·토크', component: Slide12,
    group: '경쟁', role: '경쟁 한계 ②',
    message: '‘토크’는 재지만 ‘움직임’은 못 본다',
  },
  {
    id: 13, title: 'InBody 시너지 ① 가치·철학', component: Slide13,
    group: 'InBody 시너지', role: '가치·철학',
    message: '우리가 닮고자 하는 회사 — InBody',
  },
  {
    id: 14, title: 'InBody 시너지 ② 기술', component: Slide14,
    group: 'InBody 시너지', role: '기술 상보성',
    message: 'InBody는 ‘몸의 구성’을, 우리는 ‘몸의 움직임’을 잰다',
    visual: 'SMPL 인체 메쉬 + 스켈레톤 키포인트 도식',
  },
  {
    id: 15, title: 'InBody 시너지 ③ 인프라·자본', component: Slide15,
    group: 'InBody 시너지', role: '인프라·자본',
    message: 'InBody·블루포인트, STEP 0부터 함께여야 하는 이유',
    visual: '제공 ↔ 필요 매트릭스(인프라·투자)',
  },
  {
    id: 16, title: '팀', component: Slide16,
    group: '마무리', role: '팀',
    message: '실행하는 팀, 받쳐주는 전문 자원',
    visual: '핵심 3인 증명사진 + 파트너 로고(상명대·NVIDIA·WENIV)',
  },
  {
    id: 17, title: '비전·요청', component: Slide17,
    group: '마무리', role: '비전·요청',
    message: '피트니스 산업의 미래를 데이터로 다시 쓰겠습니다',
    visual: '아날로그 헬스장 흑백 전경 사진',
  },
]

export default slides
