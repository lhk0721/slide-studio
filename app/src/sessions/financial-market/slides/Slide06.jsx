import styles from './Slide06.module.css'

// 미국 ③ 그런데 트레이너는 살아남았다 — 비용 압박에도 트레이너는 보호(핵심 자산).
// Asset vs Cost 구조도: 잘라낸 비용(중립 목록) | 지킨 자산(accent 카드 + 보수 콜아웃).
// 한국 사례(s9 트레이너=비용)와의 대비를 위한 복선.
const costs = ['본사 인력 약 20%', '마케팅 축소', '물류: 창고 축소 → 3PL ($800M 절감)']

export default function Slide06() {
  return (
    <div className={styles.slide}>
      <div className="s-hd">
        <div>
          <h2 className="s-hd-title">미국 ③ — 그런데 트레이너는 살아남았다</h2>
          <div className="s-hd-sub">극심한 비용 압박에도 트레이너는 보호받았다</div>
        </div>
        <span className="s-hd-section">미국 사례 · 03</span>
      </div>
      <div className="s-rule" />

      <div className="s-body">
        <div className={styles.layout}>

          <div className={styles.cost}>
            <div className="col-cat">잘라낸 비용 · COST</div>
            {costs.map((c) => (
              <div key={c} className={styles.costItem}>{c}</div>
            ))}
          </div>

          <div className={styles.asset}>
            <div className="col-cat accent">지킨 자산 · ASSET</div>
            <div className={styles.assetName}>트레이너 · 강사진</div>
            <div className={styles.assetMetric}>연 최대 50만$</div>
            <div className={styles.assetMetricLbl}>스타 강사 보수 — 대규모 감원에서 제외</div>
          </div>

        </div>
      </div>

      <div className={styles.verdict}>
        트레이너는 비용이 아니라{'\n'}<strong>구독 가치의 원천 — 핵심 자산</strong>이기 때문.
      </div>

      <div className="s-source">
        출처 — CNN 「Peloton … cutting 2,800 jobs」 · Bloomberg (강사 보수·감원 제외, 2022.2.8)
      </div>
    </div>
  )
}
