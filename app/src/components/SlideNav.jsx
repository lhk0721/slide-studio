import styles from './SlideNav.module.css'

export default function SlideNav({ cur, total, onGo }) {
  return (
    <div className={styles.bottom}>
      <span className={styles.hint}>← → 키보드 이동</span>
      <div className={styles.dots}>
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`${styles.dot} ${i + 1 === cur ? styles.active : ''}`}
            onClick={() => onGo(i + 1)}
          />
        ))}
      </div>
      <span className={styles.counter}>{cur} / {total}</span>
    </div>
  )
}
