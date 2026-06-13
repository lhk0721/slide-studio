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

const sessions = [
  {
    id: 'inbody-u300',
    title: 'InBody · U+300 피치덱',
    description: 'AI 라이브 무브먼트 코칭 — InBody 전략적 파트너십 피치덱.',
    slides: inbodySlides,
  },
  {
    id: 'financial-market',
    title: '금융시장·금융기관 발표',
    description: '금융시장과 금융기관 구조·역할 발표자료 (작성 예정).',
    slides: financialSlides,
  },
]

export const getSession = (id) => sessions.find((s) => s.id === id)

export default sessions
