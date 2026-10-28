import styles from './Slide05.module.css'

// 미국 ② 거품이 꺼지다 — 금리 정상화로 밸류에이션 붕괴, 대규모 구조조정.
// 차트+캡션: 정점↔현재 막대(493억$ → 약 24억$, −95%) | 감원 metric + takeaway.
export default function Slide05() {
  return (
    <div className={styles.slide}>
      <div className="s-hd">
        <div>
          <h2 className="s-hd-title">미국 ② — 거품이 꺼지다</h2>
          <div className="s-hd-sub">금리 정상화로 밸류에이션 붕괴, 대규모 구조조정</div>
        </div>
        <span className="s-hd-section">미국 사례 · 02</span>
      </div>
      <div className="s-rule" />

      <div className="s-body">
        <div className={styles.layout}>

          <div className={styles.chart}>
            <svg viewBox="0 0 600 330" preserveAspectRatio="xMidYMid meet" role="img"
              aria-label="펠로톤 시가총액 정점 493억$에서 현재 약 24억$로 약 95% 증발">
              <line className={styles.axis} x1="60" y1="285" x2="560" y2="285" />

              <rect className={styles.barGhost} x="120" y="55" width="120" height="230" />
              <text className={styles.barVal} x="180" y="42" textAnchor="middle">493억$</text>
              <text className={styles.barLbl} x="180" y="308" textAnchor="middle">2021.1 정점</text>

              <rect className={styles.barAccent} x="380" y="263" width="120" height="22" />
              <text className={styles.barVal} x="440" y="252" textAnchor="middle">약 24억$</text>
              <text className={styles.barLbl} x="440" y="308" textAnchor="middle">2026.6 현재</text>

              <path className={styles.drop} d="M246 72 C322 96 322 250 374 262" />
              <text className={styles.dropVal} x="312" y="178" textAnchor="middle">−95%</text>
            </svg>
          </div>

          <div className={styles.side}>
            <div className="metric">
              <span className="metric-val">2,800명</span>
              <span className="metric-lbl">2022년 전사 감원 (CNN·Bloomberg)</span>
            </div>
            <p className={styles.take}>{'2022년 금리 정상화와 함께 밸류에이션이 붕괴.\n매출도 FY2020 약 18억$ 이후 감소세\n— 전형적 금융 거품 사이클.'}</p>
          </div>

        </div>
      </div>

      <div className="s-source">
        출처 — stockanalysis.com (시총) · SEC EDGAR 「Form 10-K」(FY2020 매출) · CNN·Bloomberg (2022 감원)
      </div>
    </div>
  )
}
