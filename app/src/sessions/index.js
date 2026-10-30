// ═══════════════════════════════════════════
//  SESSION REGISTRY
//  One entry per presentation (deck). Each session owns its own slide
//  array under `sessions/<id>/slides/` and assets under `sessions/<id>/assets/`.
//  The single app routes between sessions at `/:sessionId/:slideId`.
//
//  To add a new deck:
//   1. Create `sessions/<new-id>/slides/` (SlideNN.jsx + index.js) and `assets/`.
//   2. Import its slide list here and append one entry below.
// ═══════════════════════════════════════════
import inbodySlides from './inbody-u300/slides'
import financialSlides from './financial-market/slides'
import graduationSlides from './graduation-review/slides'

const sessions = [
  {
    id: 'inbody-u300',
    title: 'InBody · U+300 피치덱',
    description: 'AI 라이브 무브먼트 코칭 — InBody 전략적 파트너십 피치덱.',
    slides: inbodySlides,
  },
  {
    id: 'financial-market',
    title: '같은 충격, 다른 실패 — 미·한 피트니스 시장 비교',
    description: '국제시장과 금융기관 발표. 동일한 코로나 충격이 자본 조달 구조 차이로 서로 다른 시장실패에 이른 과정을 미국·한국 피트니스 시장으로 비교.',
    slides: financialSlides,
  },
  {
    id: 'graduation-review',
    title: 'RackTracker · 졸업작품 심사 발표',
    description: '다시점 삼각측량과 소형 연산 장비를 이용한 파워랙의 모션캡처 스튜디오화 — 3분 발표 11장.',
    slides: graduationSlides,
  },
]

export const getSession = (id) => sessions.find((s) => s.id === id)

export default sessions
