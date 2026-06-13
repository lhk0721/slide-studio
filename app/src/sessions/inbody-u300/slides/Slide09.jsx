import styles from './Slide09.module.css'

// 0-baseline bar chart — value/100 * 120px height, baseline y=140
const bars = [
  { year: '2024', val: 31.9, solid: true },
  { year: '2027', val: 43, solid: false },
  { year: '2030', val: 61, solid: false },
  { year: '2035', val: 94, solid: true },
]
const BASE = 140, SPAN = 120, MAX = 100
const xs = [22, 90, 158, 226]

export default function Slide09() {
  return (
    <div className={styles.slide}>
      <div className="s-hd">
        <div>
          <h2 className="s-hd-title">크고 성장하는 시장, 명확한 확장 경로</h2>
          <div className="s-hd-sub">국내 31.9억$ → 글로벌 1,120억$</div>
        </div>
        <span className="s-hd-section">04 · 시장</span>
      </div>
      <div className="s-rule" />

      <div className="s-body">
        <div className={styles.layout}>

          {/* 좌: 국내 성장 */}
          <div className={styles.col}>
            <div className={styles.colCat}>국내 피트니스 시장</div>
            <div className={styles.metricRow}>
              <div className={styles.metricBlock}>
                <span className={styles.metricYear}>2024</span>
                <span className={styles.metricVal}>31.9억$</span>
              </div>
              <span className={styles.metricArrow}>→</span>
              <div className={styles.metricBlock}>
                <span className={styles.metricYear}>2035</span>
                <span className={`${styles.metricVal} ${styles.accent}`}>94억$</span>
              </div>
              <div className={styles.cagr}>CAGR<strong>10.3%</strong></div>
            </div>

            <svg className={styles.chart} viewBox="0 0 268 168" xmlns="http://www.w3.org/2000/svg">
              <line className={styles.axis} x1="14" y1={BASE} x2="262" y2={BASE} />
              <text className={styles.axisZero} x="10" y={BASE + 4} textAnchor="end">0</text>
              {bars.map((b, i) => {
                const h = (b.val / MAX) * SPAN
                return (
                  <g key={b.year}>
                    <rect
                      className={b.solid ? styles.barSolid : styles.barSoft}
                      x={xs[i]} y={BASE - h} width="40" height={h} rx="2"
                    />
                    <text className={styles.barYear} x={xs[i] + 20} y={BASE + 16} textAnchor="middle">{b.year}</text>
                    <text className={styles.barVal} x={xs[i] + 20} y={BASE - h - 6} textAnchor="middle">{b.val}</text>
                  </g>
                )
              })}
            </svg>
            <div className={styles.src}>출처: Spherical Insights · 중간값 추산</div>
          </div>

          {/* 우: 동심원 확장 */}
          <div className={`${styles.col} ${styles.colRings}`}>
            <div className={styles.colCat}>글로벌 시장 규모</div>
            <svg className={styles.rings} viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg">
              <circle className={styles.ringOuter} cx="150" cy="130" r="122" />
              <circle className={styles.ringMid} cx="150" cy="130" r="78" />
              <circle className={styles.ringInner} cx="150" cy="130" r="38" />
              <text className={styles.ringCore} x="150" y="126" textAnchor="middle">한국</text>
              <text className={styles.ringCoreSub} x="150" y="142" textAnchor="middle">진입 시장</text>

              <line className={styles.lead} x1="240" y1="62" x2="290" y2="40" />
              <text className={styles.ringLbl} x="296" y="36">글로벌</text>
              <text className={styles.ringLblSub} x="296" y="52">1,120억$</text>

              <line className={styles.lead} x1="225" y1="108" x2="290" y2="96" />
              <text className={styles.ringLbl} x="296" y="92">미국</text>
              <text className={styles.ringLblSub} x="296" y="108">370억$</text>

              <line className={styles.lead} x1="188" y1="130" x2="290" y2="150" />
              <text className={styles.ringLblAccent} x="296" y="146">한국</text>
              <text className={styles.ringLblSub} x="296" y="162">31.9억$</text>
            </svg>
            <div className={styles.gtm}>
              한국시장에서 검증 <span className={styles.gtmArrow}>→</span> 미국 진출 <span className={styles.gtmArrow}>→</span> <strong>글로벌 표준</strong>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
