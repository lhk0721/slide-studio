import styles from './Slide08.module.css'

// 한국 ② 과잉경쟁과 오프라인 붕괴 — 박리다매·과잉경쟁 → 대규모 폐업.
// 차트+캡션(미국 s5 대칭, 상승): 서울 체력단련장 폐업 추이 막대 | 선불 먹튀 metric.
export default function Slide08() {
  return (
    <div className={styles.slide}>
      <div className="s-hd">
        <div>
          <h2 className="s-hd-title">한국 ② — 과잉경쟁과 오프라인 붕괴</h2>
          <div className="s-hd-sub">분산된 시장은 박리다매·과잉경쟁으로, 오프라인은 폐업으로</div>
        </div>
        <span className="s-hd-section">한국 사례 · 02</span>
      </div>
      <div className="s-rule" />

      <div className="s-body">
        <div className={styles.layout}>

          <div className={styles.chart}>
            <svg viewBox="0 0 600 330" preserveAspectRatio="xMidYMid meet" role="img"
              aria-label="서울 체력단련장 폐업 2019년 141개에서 2021년 259개로 약 84% 증가">
              <line className={styles.axis} x1="60" y1="285" x2="560" y2="285" />

              <rect className={styles.barGhost} x="130" y="165" width="120" height="120" />
              <text className={styles.barVal} x="190" y="152" textAnchor="middle">141개</text>
              <text className={styles.barLbl} x="190" y="308" textAnchor="middle">2019</text>

              <rect className={styles.barAccent} x="380" y="65" width="120" height="220" />
              <text className={styles.barVal} x="440" y="52" textAnchor="middle">259개</text>
              <text className={styles.barLbl} x="440" y="308" textAnchor="middle">2021</text>

              <path className={styles.rise} d="M252 158 C 322 128 322 84 374 74" />
              <text className={styles.riseVal} x="306" y="128" textAnchor="middle">+84%</text>
            </svg>
          </div>

          <div className={styles.side}>
            <div className="metric">
              <span className="metric-val">987건</span>
              <span className="metric-lbl">폐업 선불거래 피해구제 (2020~25.8) — 체육시설 70%+</span>
            </div>
            <p className={styles.take}>선불 멤버십 + 출혈 경쟁 + ‘먹튀’ 리스크. 소상공인 시장의 구조적 취약성이 대규모 폐업으로 드러났다.</p>
          </div>

        </div>
      </div>

      <div className="s-source">
        출처 — 서울 열린데이터광장 「체력단련장업 인허가」(OA-16142) · 한국소비자원·서울경제 (선불 피해)
      </div>
    </div>
  )
}
