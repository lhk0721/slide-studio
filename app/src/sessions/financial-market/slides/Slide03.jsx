import styles from './Slide03.module.css'

// 분석 틀 — 시장실패(자원 비효율 배분)를 '자본 조달 구조'로 해석. 두 렌즈 → 두 시장실패 유형.
// 이 틀로 미국(자본시장 주도)·한국(소상공인 주도)을 본다. next: [4,7] 분기.
const lenses = [
  { k: '렌즈 ① · 자본 배분의 비효율', big: '거품', desc: '밸류에이션이 펀더멘털과 분리되며 형성' },
  { k: '렌즈 ② · 정보 비대칭', big: '레몬시장', desc: '품질 하향 · 신뢰 붕괴 (Akerlof, 1970)' },
]

export default function Slide03() {
  return (
    <div className={styles.slide}>
      <div className="s-hd">
        <div>
          <h2 className="s-hd-title">분석 틀 — 시장실패와 자본 조달</h2>
          <div className="s-hd-sub">시장실패를 ‘자본이 어떤 구조로 조달·배분됐는가’로 본다</div>
        </div>
        <span className="s-hd-section">분석 틀 · FRAMEWORK</span>
      </div>
      <div className="s-rule" />

      <div className="s-body">
        <div className={styles.layout}>

          <p className={styles.intro}>
            시장실패 = 자원의 비효율적 배분.{'\n'}그 원인을 <strong>자본이 어떤 구조로 조달·배분됐는가</strong>로 해석한다.
          </p>

          <div className={styles.lenses}>
            {lenses.map((l) => (
              <div key={l.big} className={styles.lensCard}>
                <span className={styles.lensK}>{l.k}</span>
                <span className={styles.lensBig}>{l.big}</span>
                <span className={styles.lensDesc}>{l.desc}</span>
              </div>
            ))}
          </div>

          <div className={styles.map}>
            <span className={styles.mapItem}><strong>미국</strong> = 자본시장 주도 (VC·IPO)</span>
            <span className={styles.mapItem}><strong>한국</strong> = 소상공인·콘텐츠 주도</span>
          </div>

        </div>
      </div>

      <div className="s-source">
        이론 — Akerlof, G. A. (1970) 「The Market for ‘Lemons’」, QJE 84(3)
      </div>
    </div>
  )
}
