import styles from './Slide02.module.css'
import DivergenceFlow from '../components/DivergenceFlow'

// 문제 제기 — 같은 출발(코로나 충격·거대 시장), 정반대의 결말. "왜?"로 분석을 연다.
// 패턴: 분기 흐름도(DivergenceFlow, 부분 — 충격→두 결말) + 출처 캡션(.s-source).
const outcomes = [
  '거대 자본의 거품 → 붕괴',   // 미국 (좌)
  '시장의 파편화 → 폐업',       // 한국 (우)
]

export default function Slide02() {
  return (
    <div className={styles.slide}>
      <div className="s-hd">
        <div>
          <h2 className="s-hd-title">문제 제기 — 같은 출발, 다른 결말</h2>
          <div className="s-hd-sub">코로나가 똑같이 끌어올린 수요, 그러나 갈린 결말</div>
        </div>
        <span className="s-hd-section">문제 제기 · PROBLEM</span>
      </div>
      <div className="s-rule" />

      <div className="s-body">
        <div className={styles.layout}>
          <DivergenceFlow
            shockKicker="공통 충격"
            shockText="코로나19 — 전 세계 피트니스 수요 급증"
            shockSub="글로벌 피트니스 앱 시장 약 $13.9B (2026, GVR) · 기관별 $14~22B"
            heads={['미국', '한국']}
          />

          <div className={styles.outcomes}>
            {outcomes.map((o) => (
              <p key={o} className={styles.outcome}>{o}</p>
            ))}
          </div>

          <div className={styles.ask}>
            <span className={styles.askLead}>같은 출발선, 정반대의 결말</span>
            <span className={styles.askBig}>왜 같은 충격이 서로 다른 실패로 이어졌는가?</span>
          </div>
        </div>
      </div>

      <div className="s-source">
        출처 — Grand View Research·The Business Research Company 「Fitness App Market」 (2026 전망, 기관별 약 $14~22B)
      </div>
    </div>
  )
}
