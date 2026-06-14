import styles from './Slide07.module.css'

// 한국 ① 거품 대신 파편화 — 진입장벽이 낮아 자본이 분산(개인·중소·유튜버).
// 차트+캡션(미국 s4 대칭): 출원인 유형 도넛 | 유튜버 metric + takeaway.
// 홈트 상표출원(2015~2019): 개인 48% · 기업 39%(중소 33%) · 기타 13% (특허청).
const C = 534.07 // 2πr, r=85
const seg = (pct) => `${(pct * C).toFixed(1)} ${(C - pct * C).toFixed(1)}`

export default function Slide07() {
  return (
    <div className={styles.slide}>
      <div className="s-hd">
        <div>
          <h2 className="s-hd-title">한국 ① — 거품 대신 파편화</h2>
          <div className="s-hd-sub">진입장벽이 낮아 자본이 한 곳에 모이지 못하고 분산됐다</div>
        </div>
        <span className="s-hd-section">한국 사례 · 01</span>
      </div>
      <div className="s-rule" />

      <div className="s-body">
        <div className={styles.layout}>

          <div className={styles.chart}>
            <svg viewBox="0 0 240 240" role="img"
              aria-label="홈트 상표출원 출원인 유형 — 개인 48%, 기업 39%, 기타 13%">
              <g transform="rotate(-90 120 120)">
                <circle className={`${styles.seg} ${styles.segA}`} cx="120" cy="120" r="85" strokeDasharray={seg(0.48)} strokeDashoffset="0" />
                <circle className={`${styles.seg} ${styles.segB}`} cx="120" cy="120" r="85" strokeDasharray={seg(0.39)} strokeDashoffset={(-0.48 * C).toFixed(1)} />
                <circle className={`${styles.seg} ${styles.segC}`} cx="120" cy="120" r="85" strokeDasharray={seg(0.13)} strokeDashoffset={(-0.87 * C).toFixed(1)} />
              </g>
              <text className={styles.donutBig} x="120" y="116" textAnchor="middle">48%</text>
              <text className={styles.donutSm} x="120" y="140" textAnchor="middle">개인 출원</text>
            </svg>

            <div className={styles.legend}>
              <span><i className={`${styles.dotA}`} />개인 48%</span>
              <span><i className={`${styles.dotB}`} />기업 39%</span>
              <span><i className={`${styles.dotC}`} />기타 13%</span>
            </div>
          </div>

          <div className={styles.side}>
            <div className="metric">
              <span className="metric-val">약 300만</span>
              <span className="metric-lbl">무료 운동 유튜버 김계란 구독자 — 콘텐츠로도 분산</span>
            </div>
            <p className={styles.take}>{'거대 자본 플랫폼이 형성되지 못하고,\n개인·중소기업·유튜버로 분산.\n거품 대신 ‘파편화’가 일어났다.'}</p>
          </div>

        </div>
      </div>

      <div className="s-source">
        출처 — 특허청 (2020.7, 홈트 상품 상표출원 분석) · 더스쿠프 (운동 유튜버) · 채널 공개 구독자 수
      </div>
    </div>
  )
}
