import { Fragment } from 'react'
import styles from './Slide09.module.css'

// 한국 ③ 트레이너는 비용으로 남았다 — 자산으로 안을 플랫폼이 없자 박리다매 압력이
// 인력시장으로 전이 → 저임금·고이직·품질 하향(레몬시장). 미국 s6(트레이너=자산)의 거울.
const steps = [
  { k: '구조', t: '거대 자본 플랫폼 부재' },
  { k: '전이', t: '박리다매 압력이\n인력시장으로' },
  { k: '결과', t: '저임금 · 고이직' },
  { k: '레몬시장', t: '품질 하향 · 신뢰 붕괴', lemon: true },
]

export default function Slide09() {
  return (
    <div className={styles.slide}>
      <div className="s-hd">
        <div>
          <h2 className="s-hd-title">한국 ③ — 트레이너는 비용으로 남았다</h2>
          <div className="s-hd-sub">자산으로 안을 플랫폼이 없자, 압력이 그대로 인력시장으로 전이됐다</div>
        </div>
        <span className="s-hd-section">한국 사례 · 03</span>
      </div>
      <div className="s-rule" />

      <div className="s-body">
        <div className={styles.layout}>
          <div className={styles.flow}>
            {steps.map((s, i) => (
              <Fragment key={s.k}>
                <div className={`${styles.step} ${s.lemon ? styles.lemon : ''}`}>
                  <span className={styles.stepK}>{s.k}</span>
                  <span className={styles.stepT}>{s.t}</span>
                </div>
                {i < steps.length - 1 && <span className={styles.arrow} aria-hidden="true">→</span>}
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.verdict}>
        미국이 트레이너를 자산으로 보호한 것과 <strong>정반대 — 구조가 만든 레몬시장</strong>. (정량은 폐업·이직 등 방증으로 보강)
      </div>

      <div className="s-source">
        근거 — 단일 통계 대신 구조적 추론 + 폐업·이직 등 방증(정직하게 제시) · 이론: Akerlof(1970) 레몬시장
      </div>
    </div>
  )
}
