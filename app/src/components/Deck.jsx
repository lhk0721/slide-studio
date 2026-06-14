import { useParams, useNavigate, Navigate, Link } from 'react-router-dom'
import { useEffect, useCallback } from 'react'
import { getSession } from '../sessions'
import SlideNav from './SlideNav'
import ExportControls from './ExportControls'
import styles from './Deck.module.css'

export default function Deck() {
  const { sessionId, slideId } = useParams()
  const navigate = useNavigate()

  const session = getSession(sessionId)
  const slides = session?.slides ?? []
  const N = slides.length
  const cur = Math.max(1, Math.min(N || 1, parseInt(slideId) || 1))

  const go = useCallback(
    (n) => {
      if (!session) return
      const next = Math.max(1, Math.min(N, n))
      navigate(`/${sessionId}/${next}`)
    },
    [navigate, sessionId, N, session]
  )

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') go(cur + 1)
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   go(cur - 1)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [cur, go])

  // Unknown session id → back to the picker.
  if (!session) return <Navigate to="/" replace />

  const SlideComponent = slides[cur - 1]?.component

  return (
    <div className={styles.wrapper} data-theme={sessionId}>
      <div className={styles.topbar}>
        <Link to="/" className={styles.back}>← 세션 목록</Link>
        <span className={styles.deckTitle}>{session.title}</span>
        <Link to={`/${sessionId}/overview`} className={styles.back}>개요 ▦</Link>
      </div>

      <div className={styles.navWrap}>
        <button
          className={styles.navBtn}
          onClick={() => go(cur - 1)}
          disabled={cur === 1}
        >
          &#8249;
        </button>

        <div className={styles.deck}>
          {SlideComponent && <SlideComponent />}
        </div>

        <button
          className={styles.navBtn}
          onClick={() => go(cur + 1)}
          disabled={cur === N}
        >
          &#8250;
        </button>
      </div>

      <SlideNav cur={cur} total={N} onGo={go} />

      <ExportControls
        slides={slides}
        cur={cur}
        total={N}
        zipName={`${sessionId}-slides.zip`}
        theme={sessionId}
      />
    </div>
  )
}
