import styles from './Slide04.module.css'

// 미국 ① 자본이 몰리다 — VC·공모시장 자본이 펠로톤에 집중, 밸류에이션이 펀더멘털과 분리.
// 차트+캡션 아키타입: 시총 급등 곡선(SVG, 급등 구간 음영) | metric 캡션.
// 시총 추이(억$): 2019 IPO ~80 → 2021.1 정점 493 (Phase 3 data-ready, MacroTrends).
const pts = [[60, 242], [180, 227], [300, 165], [400, 83], [500, 43]]
const line = 'M' + pts.map((p) => p.join(' ')).join(' L')
const area = `${line} L${pts.at(-1)[0]} 280 L${pts[0][0]} 280 Z`
const peak = pts.at(-1)

export default function Slide04() {
  return (
    <div className={styles.slide}>
      <div className="s-hd">
        <div>
          <h2 className="s-hd-title">미국 ① — 자본이 몰리다</h2>
          <div className="s-hd-sub">VC·공모시장 자본이 펠로톤에 집중되며 거품이 형성됐다</div>
        </div>
        <span className="s-hd-section">미국 사례 · 01</span>
      </div>
      <div className="s-rule" />

      <div className="s-body">
        <div className={styles.layout}>

          <div className={styles.chart}>
            <svg viewBox="0 0 600 320" preserveAspectRatio="xMidYMid meet" role="img"
              aria-label="펠로톤 시가총액 추이 — 2019 IPO에서 2021년 1월 정점 493억$까지 급등">
              <line className={styles.axis} x1="40" y1="280" x2="585" y2="280" />
              <path className={styles.area} d={area} />
              <path className={styles.line} d={line} />
              <circle className={styles.dot} cx={peak[0]} cy={peak[1]} r="6" />
              <text className={styles.peakVal} x={peak[0] - 12} y={peak[1] - 16} textAnchor="end">493억$</text>
              <text className={styles.peakLbl} x={peak[0] - 12} y={peak[1] + 4} textAnchor="end">2021.1 정점</text>
              <text className={styles.axisLbl} x="48" y="300">2019 IPO</text>
              <text className={styles.axisLbl} x="500" y="300" textAnchor="middle">2021</text>
            </svg>
          </div>

          <div className={styles.side}>
            <div className="metric">
              <span className="metric-val">7.9 → 16.7배</span>
              <span className="metric-lbl">PSR(주가매출비율): IPO → 정점 — 가격이 매출과 분리</span>
            </div>
            <p className={styles.take}>VC·공모시장이 ‘팬데믹 = 구조적 전환’ 서사에 베팅. 가격이 매출보다 빠르게 팽창하며 밸류에이션이 펀더멘털에서 멀어지는 전형적 거품 형성.</p>
          </div>

        </div>
      </div>

      <div className="s-source">
        출처 — MacroTrends 「Peloton Market Cap」 · stockanalysis.com 「PTON Statistics」 (시총·PSR 추이)
      </div>
    </div>
  )
}
