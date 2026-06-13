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
          <li key={s.id} className={styles.card}>
            <span className={styles.cardTitle}>{s.title}</span>
            <span className={styles.cardDesc}>{s.description}</span>
            <span className={styles.cardMeta}>{s.slides.length} slides · /{s.id}</span>
            <div className={styles.actions}>
              <Link to={`/${s.id}/1`} className={styles.actionPrimary}>발표 →</Link>
              <Link to={`/${s.id}/overview`} className={styles.action}>개요 ▦</Link>
              <Link to={`/${s.id}/content`} className={styles.action}>콘텐츠 ☑</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
