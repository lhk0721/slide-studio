import { Link } from 'react-router-dom'
import sessions from '../sessions'
import styles from './Home.module.css'

export default function Home() {
  return (
    <div className={styles.home}>
      <header className={styles.head}>
        <h1 className={styles.brand}>slide-studio</h1>
        <p className={styles.tagline}>코드로 만드는 발표 덱 — 세션을 선택하세요</p>
      </header>

      <ul className={styles.list}>
        {sessions.map((s) => (
          <li key={s.id}>
            <Link to={`/${s.id}/1`} className={styles.card}>
              <span className={styles.cardTitle}>{s.title}</span>
              <span className={styles.cardDesc}>{s.description}</span>
              <span className={styles.cardMeta}>{s.slides.length} slides · /{s.id}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
