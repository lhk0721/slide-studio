import { useMemo } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import { getSession } from '../sessions'
import styles from './Content.module.css'

// ── Phase 3 콘텐츠 워크벤치 ──────────────────────────────────────
//  슬라이드 메타(slides/index.js)를 입력으로, 콘텐츠 단계의 준비도를 집계한다:
//  ① 저해상도 본문(body) 작성 ② 필요 자산(assets) 확보·출처·라이선스
//  ③ 근거(evidence) 강도 등급(비대칭 전략) + 검증 상태. → Phase 4 게이트.

// Overview와 같은 등장순서 그룹 색 (배지용).
const GROUP_COLORS = ['#971B2F', '#1F6FB2', '#2E8B57', '#B26A00', '#6A4C93', '#0E7C86']
function groupColors(slides) {
  const map = {}
  let i = 0
  for (const s of slides) {
    const g = s.group || '기타'
    if (!(g in map)) map[g] = GROUP_COLORS[i++ % GROUP_COLORS.length]
  }
  return map
}

const isObjEv = (e) => typeof e !== 'string'
const evItem = (e) => (typeof e === 'string' ? { stat: e } : e)
const isUnverified = (e) => isObjEv(e) && !!e.verify

// 강도는 작성자가 명시한 grade만 집계한다(정직성). 추정하지 않는다.
//  · grade 있음        → 강/중/약 (논증 강도)
//  · 객체인데 grade 없음 → '참고'(출처/서지, 강도 미평가)
//  · 문자열            → '논증'(등급 없는 추론)
function evGrade(e) {
  return isObjEv(e) ? e.grade || null : null
}

const GRADE_LABEL = { strong: '강', medium: '중', weak: '약' }
const STATUS_LABEL = { have: '확보', need: '필요', check: '확인필요' }

// 슬라이드 한 장의 준비도 + 집계 단위.
function reviewSlide(s) {
  const hasBody = (s.body?.length ?? 0) > 0
  const assets = s.assets ?? []
  const assetBlock = assets.filter((a) => a.status !== 'have').length
  const evidence = s.evidence ?? []
  const objEv = evidence.filter(isObjEv)
  const unverified = objEv.filter(isUnverified).length
  const grades = { strong: 0, medium: 0, weak: 0 }
  for (const e of objEv) {
    const g = evGrade(e)
    if (g) grades[g] += 1
  }
  const bodyOk = hasBody
  const assetOk = assetBlock === 0
  const evidenceOk = unverified === 0
  return {
    hasBody, assets, evidence, objEv, unverified, grades,
    bodyOk, assetOk, evidenceOk,
    ready: bodyOk && assetOk && evidenceOk,
  }
}

function Metric({ label, value, sub, tone }) {
  return (
    <div className={`${styles.metric} ${tone ? styles[tone] : ''}`}>
      <span className={styles.metricValue}>{value}</span>
      <span className={styles.metricLabel}>{label}</span>
      {sub && <span className={styles.metricSub}>{sub}</span>}
    </div>
  )
}

export default function Content() {
  const { sessionId } = useParams()
  const session = getSession(sessionId)

  const agg = useMemo(() => {
    const slides = session?.slides ?? []
    const colors = groupColors(slides)
    const rows = slides.map((s) => ({ slide: s, r: reviewSlide(s), color: colors[s.group || '기타'] }))
    const total = slides.length
    const bodyDone = rows.filter((x) => x.r.hasBody).length
    const assetsAll = rows.flatMap((x) => x.r.assets)
    const byStatus = { have: 0, need: 0, check: 0 }
    for (const a of assetsAll) byStatus[a.status] = (byStatus[a.status] || 0) + 1
    const grades = { strong: 0, medium: 0, weak: 0 }
    for (const x of rows) for (const k of ['strong', 'medium', 'weak']) grades[k] += x.r.grades[k]
    const unverified = rows.reduce((n, x) => n + x.r.unverified, 0)
    const readySlides = rows.filter((x) => x.r.ready).length
    const blockers = rows
      .filter((x) => !x.r.ready)
      .map((x) => {
        const why = []
        if (!x.r.bodyOk) why.push('본문 미작성')
        if (!x.r.assetOk) why.push('자산 미확보')
        if (!x.r.evidenceOk) why.push(`미검증 근거 ${x.r.unverified}`)
        return { id: x.slide.id, title: x.slide.title, why: why.join(' · ') }
      })
    return {
      rows, total, bodyDone, assetsAll, byStatus, grades, unverified,
      readySlides, blockers, ready: total > 0 && readySlides === total,
    }
  }, [session])

  if (!session) return <Navigate to="/" replace />
  const { rows } = agg
  const assetsTotal = agg.assetsAll.length

  return (
    <div className={styles.screen}>
      <header className={styles.top}>
        <div className={styles.nav}>
          <Link to="/" className={styles.back}>← 세션 목록</Link>
          <Link to={`/${sessionId}/overview`} className={styles.back}>개요 ▦</Link>
        </div>
        <div className={styles.titleWrap}>
          <h1 className={styles.title}>{session.title}</h1>
          <span className={styles.sub}>Phase 3 · 콘텐츠 준비 ({agg.total}장)</span>
        </div>
        <Link to={`/${sessionId}/1`} className={styles.present}>발표 모드 →</Link>
      </header>

      <div className={styles.body}>
        {/* 준비도 대시보드 + Phase 4 게이트 */}
        <section className={styles.dash}>
          <div className={`${styles.gate} ${agg.ready ? styles.gateOk : styles.gateBlock}`}>
            {agg.ready ? (
              <>
                <span className={styles.gateIcon}>✓</span>
                <div>
                  <p className={styles.gateTitle}>Phase 4(Design)로 넘어갈 준비 완료</p>
                  <p className={styles.gateSub}>모든 슬라이드의 본문·자산·근거가 확정됐습니다.</p>
                </div>
              </>
            ) : (
              <>
                <span className={styles.gateIcon}>!</span>
                <div>
                  <p className={styles.gateTitle}>
                    아직 준비 안 됨 — {agg.total - agg.readySlides}개 슬라이드 보완 필요
                  </p>
                  <p className={styles.gateSub}>
                    미확보 자산 {agg.byStatus.need + agg.byStatus.check} · 미검증 근거 {agg.unverified} · 본문 미작성 {agg.total - agg.bodyDone}
                  </p>
                </div>
              </>
            )}
          </div>

          <div className={styles.metrics}>
            <Metric label="본문 작성" value={`${agg.bodyDone}/${agg.total}`} />
            <Metric
              label="자산 확보"
              value={`${agg.byStatus.have}/${assetsTotal}`}
              sub={`필요 ${agg.byStatus.need} · 확인 ${agg.byStatus.check}`}
            />
            <Metric
              label="근거 강도"
              value={`강 ${agg.grades.strong} · 중 ${agg.grades.medium} · 약 ${agg.grades.weak}`}
            />
            <Metric label="미검증 근거" value={agg.unverified} tone={agg.unverified ? 'warn' : undefined} />
            <Metric
              label="준비 완료"
              value={`${agg.readySlides}/${agg.total}`}
              tone={agg.ready ? 'ok' : undefined}
            />
          </div>

          {agg.blockers.length > 0 && (
            <ul className={styles.blockers}>
              {agg.blockers.map((b) => (
                <li key={b.id} className={styles.blockerItem}>
                  <span className={styles.blockerNum}>{b.id}</span>
                  <span className={styles.blockerTitle}>{b.title}</span>
                  <span className={styles.blockerWhy}>{b.why}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* 슬라이드별 콘텐츠 행 */}
        <ul className={styles.list}>
          {rows.map(({ slide: s, r, color }) => (
            <li key={s.id} className={styles.row}>
              <div className={styles.rowHead}>
                <span className={styles.num}>{s.id}</span>
                <span className={styles.rowTitle}>{s.title}</span>
                <span className={styles.groupBadge} style={{ '--group-color': color }}>{s.group}</span>
                <span
                  className={`${styles.readyDot} ${r.ready ? styles.dotOk : styles.dotBlock}`}
                  title={r.ready ? '준비 완료' : '보완 필요'}
                />
              </div>

              <div className={styles.cols}>
                {/* 본문 (저해상도 콘텐츠) */}
                <div className={styles.col}>
                  <h4 className={styles.colLabel}>
                    본문 <span className={r.hasBody ? styles.okMark : styles.noMark}>{r.hasBody ? '✓' : '미작성'}</span>
                  </h4>
                  {r.hasBody ? (
                    <ul className={styles.bodyList}>
                      {s.body.map((line, i) => <li key={i} className={styles.bodyItem}>{line}</li>)}
                    </ul>
                  ) : (
                    <p className={styles.empty}>저해상도 본문을 채워야 합니다.</p>
                  )}
                </div>

                {/* 자산 (출처·라이선스·상태) */}
                <div className={styles.col}>
                  <h4 className={styles.colLabel}>자산 <span className={styles.count}>{r.assets.length}</span></h4>
                  {r.assets.length ? (
                    <ul className={styles.assetList}>
                      {r.assets.map((a, i) => (
                        <li key={i} className={styles.asset}>
                          <span className={`${styles.statusChip} ${styles['st_' + a.status]}`}>
                            {STATUS_LABEL[a.status] || a.status}
                          </span>
                          <div className={styles.assetBody}>
                            <p className={styles.assetDesc}>
                              <span className={styles.assetKind}>{a.kind}</span>{a.desc}
                            </p>
                            {a.source && <p className={styles.assetMeta}>출처 · {a.source}</p>}
                            {a.license && <p className={styles.assetMeta}>라이선스 · {a.license}</p>}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className={styles.empty}>필요 자산 없음</p>
                  )}
                </div>

                {/* 근거 (강도 + 검증) */}
                <div className={styles.col}>
                  <h4 className={styles.colLabel}>근거 <span className={styles.count}>{r.evidence.length}</span></h4>
                  {r.evidence.length ? (
                    <ul className={styles.evList}>
                      {r.evidence.map((e, i) => {
                        const it = evItem(e)
                        const g = evGrade(e)
                        return (
                          <li key={i} className={styles.ev}>
                            {g ? (
                              <span className={`${styles.gradeChip} ${styles['gr_' + g]}`}>{GRADE_LABEL[g]}</span>
                            ) : (
                              <span className={styles.gradeNone}>{isObjEv(e) ? '참고' : '논증'}</span>
                            )}
                            <span className={styles.evStat}>{it.stat}</span>
                            {isUnverified(e) && <span className={styles.unv}>미검증</span>}
                          </li>
                        )
                      })}
                    </ul>
                  ) : (
                    <p className={styles.empty}>근거 없음</p>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
