import styles from './Slide01.module.css'

export default function Slide01() {
  return (
    <div className={styles.cover}>
      <span className={styles.eyebrow}>FINANCIAL MARKETS · 발표자료</span>
      <h1 className={styles.title}>금융시장과 금융기관</h1>
      <p className={styles.sub}>{'시장 구조 · 기관의 역할 · 상호작용\n— 작성 예정 —'}</p>
    </div>
  )
}
