import styles from './DivergenceFlow.module.css'

// 분기 흐름도 — 공통 충격 → accent 분기선 → 두 컬럼 중심의 헤드.
// s2(문제 제기, 부분)·s10(종합, 풀)이 공유하는 상단 분기 헤더.
// 헤드 아래 본문은 각 슬라이드가 동일한 2단(1fr 1fr, column-gap 3.5rem)
// 그리드로 이어 붙여 컬럼을 정렬한다.
export default function DivergenceFlow({ shockKicker, shockText, shockSub, heads }) {
  return (
    <div className={styles.flow}>
      <div className={styles.shock}>
        <span className={styles.shockK}>{shockKicker}</span>
        <span className={styles.shockT}>{shockText}</span>
        {shockSub && <span className={styles.shockSub}>{shockSub}</span>}
      </div>

      <div className={styles.fork}>
        <svg viewBox="0 0 1000 48" preserveAspectRatio="none" aria-hidden="true">
          <path className={styles.forkPath} d="M500 2 L500 18 M500 18 L240 46 M500 18 L760 46" />
          <circle className={styles.forkDot} cx="500" cy="2" r="5" />
          <circle className={styles.forkDot} cx="240" cy="46" r="5" />
          <circle className={styles.forkDot} cx="760" cy="46" r="5" />
        </svg>
      </div>

      <div className={styles.heads}>
        {heads.map((h) => (
          <div key={h} className={`col-cat accent ${styles.head}`}>{h}</div>
        ))}
      </div>
    </div>
  )
}
