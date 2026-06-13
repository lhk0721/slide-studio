import { Fragment, useMemo, useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { getSession } from '../sessions'
import styles from './Overview.module.css'

// Collapse the ordered slide list into consecutive same-`group` lanes,
// preserving slide order — these become the rows of the flow diagram.
function groupLanes(slides) {
  const lanes = []
  for (const s of slides) {
    const g = s.group || '기타'
    const last = lanes[lanes.length - 1]
    if (last && last.group === g) last.items.push(s)
    else lanes.push({ group: g, items: [s] })
  }
  return lanes
}

function Field({ label, children }) {
  if (children == null || children === '') return null
  return (
    <div className={styles.field}>
      <dt className={styles.fieldLabel}>{label}</dt>
      <dd className={styles.fieldValue}>{children}</dd>
    </div>
  )
}

export default function Overview() {
  const { sessionId } = useParams()
  const session = getSession(sessionId)
  const [sel, setSel] = useState(null)
  const lanes = useMemo(() => groupLanes(session?.slides ?? []), [session])

  // Unknown session id → back to the picker.
  if (!session) return <Navigate to="/" replace />

  const slides = session.slides
  const selSlide = slides.find((s) => s.id === sel) || null

  return (
    <div className={styles.screen}>
      <main className={styles.main}>
        <header className={styles.head}>
          <Link to="/" className={styles.back}>← 세션 목록</Link>
          <div className={styles.titleWrap}>
            <h1 className={styles.title}>{session.title}</h1>
            <span className={styles.sub}>{slides.length}장 · 내러티브 흐름</span>
          </div>
          <Link to={`/${sessionId}/1`} className={styles.present}>발표 모드 →</Link>
        </header>

        <div className={styles.flow}>
          {lanes.map((lane, li) => (
            <Fragment key={li}>
              <section className={styles.lane}>
                <div className={styles.laneLabel}>{lane.group}</div>
                <div className={styles.nodes}>
                  {lane.items.map((s, ni) => (
                    <Fragment key={s.id}>
                      <button
                        type="button"
                        className={`${styles.node} ${sel === s.id ? styles.nodeSel : ''}`}
                        onClick={() => setSel(s.id)}
                      >
                        <span className={styles.num}>{s.id}</span>
                        {s.role && <span className={styles.role}>{s.role}</span>}
                        <span className={styles.msg}>{s.message || s.title}</span>
                      </button>
                      {ni < lane.items.length - 1 && (
                        <span className={styles.arrow} aria-hidden="true">→</span>
                      )}
                    </Fragment>
                  ))}
                </div>
              </section>
              {li < lanes.length - 1 && (
                <div className={styles.down} aria-hidden="true">↓</div>
              )}
            </Fragment>
          ))}
        </div>
      </main>

      {selSlide && (
        <aside className={styles.inspector}>
          <div className={styles.inspHead}>
            <span className={styles.inspNum}>슬라이드 {selSlide.id}</span>
            <button
              type="button"
              className={styles.close}
              onClick={() => setSel(null)}
              aria-label="닫기"
            >
              ✕
            </button>
          </div>
          <h2 className={styles.inspTitle}>{selSlide.title}</h2>
          <dl className={styles.meta}>
            <Field label="그룹">{selSlide.group}</Field>
            <Field label="역할">{selSlide.role}</Field>
            <Field label="핵심 메시지">{selSlide.message}</Field>
            <Field label="시각 요소">{selSlide.visual}</Field>
            <Field label="발표 노트">{selSlide.notes}</Field>
            {selSlide.evidence?.length > 0 && (
              <div className={styles.field}>
                <dt className={styles.fieldLabel}>근거</dt>
                <dd className={styles.fieldValue}>
                  <ul className={styles.evidence}>
                    {selSlide.evidence.map((e, i) => <li key={i}>{e}</li>)}
                  </ul>
                </dd>
              </div>
            )}
          </dl>
          <Link to={`/${sessionId}/${selSlide.id}`} className={styles.openSlide}>
            이 슬라이드 발표 모드로 →
          </Link>
        </aside>
      )}
    </div>
  )
}
