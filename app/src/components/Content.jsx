import { useEffect, useMemo, useRef, useState } from 'react'
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
// 자산 상태. data-ready/have는 콘텐츠 단계 완료(작도는 Phase 4), need/check가 차단.
//  data-ready ≠ render-ready: 데이터·소재는 확보·확정됐고 작도만 남은 상태(insight #6).
const STATUS_LABEL = { have: '확보', 'data-ready': '작도 대기', need: '필요', check: '확인필요' }
const BLOCK_STATUS = new Set(['need', 'check']) // 콘텐츠 게이트를 막는 상태

// 슬라이드 한 장의 준비도 + 집계 단위.
function reviewSlide(s) {
  const hasBody = (s.body?.length ?? 0) > 0
  const assets = s.assets ?? []
  const assetBlock = assets.filter((a) => BLOCK_STATUS.has(a.status)).length
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

// "자산 미확보"로 뭉뚱그리지 않고, 슬라이드의 부족분을 구체적 항목으로 펼친다.
//  · 본문 미작성 1건
//  · status !== 'have' 자산을 항목별로(필요/확인필요 + 종류·설명·출처)
//  · 미검증 근거를 항목별로(수치·확인 지시문)
function slideTodos(s, r) {
  const out = []
  if (!r.bodyOk) out.push({ type: 'body' })
  r.assets.forEach((a, idx) => {
    if (!BLOCK_STATUS.has(a.status)) return // have / data-ready 는 보완 대상 아님
    out.push({ type: 'asset', idx, status: a.status, kind: a.kind, desc: a.desc, source: a.source, license: a.license })
  })
  for (const e of r.evidence) {
    if (isUnverified(e)) out.push({ type: 'ev', desc: evItem(e).stat, verify: evItem(e).verify })
  }
  return out
}

// 카테고리별 "무엇을 어떻게" 한 줄 안내(항목 단위 과한 추정은 피하고 카테고리 수준으로).
const TODO_HINT = {
  body: '저해상도 본문(글머리표)을 채운다',
  need: '실물 제작·촬영·구매로 확보한다',
  check: '출처·라이선스·수치를 확정한다',
  ev: '1차 출처로 대조해 검증한다',
}

// 업로드 이미지를 긴 변 기준 maxEdge로 줄여 dataURL로 변환(localStorage 용량 보호).
//  grayscale=true면 1비트 흑백이 아니라 그레이스케일(회색조) 필터로 변환한다.
function fileToDataUrl(file, { maxEdge = 1600, grayscale = false } = {}) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = reject
    reader.onload = () => {
      const img = new Image()
      img.onerror = reject
      img.onload = () => {
        const scale = Math.min(1, maxEdge / Math.max(img.width, img.height))
        // grayscale이면 캔버스를 반드시 거쳐야 하므로 원본-유지 최적화는 건너뛴다.
        if (scale === 1 && file.size < 600_000 && !grayscale) return resolve(reader.result)
        const w = Math.round(img.width * scale)
        const h = Math.round(img.height * scale)
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext('2d')
        if (grayscale) ctx.filter = 'grayscale(1)'
        ctx.drawImage(img, 0, 0, w, h)
        resolve(canvas.toDataURL('image/jpeg', 0.85))
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}

// 이미 보관된 dataURL을 그레이스케일로 한 번 변환(색 정보는 잃는다 — 되돌리기 불가).
function dataUrlToGrayscale(dataUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onerror = reject
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.filter = 'grayscale(1)'
      ctx.drawImage(img, 0, 0)
      resolve(canvas.toDataURL('image/jpeg', 0.9))
    }
    img.src = dataUrl
  })
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

  // 보완 목록(좌측) ↔ 슬라이드 행(우측) 연결: 항목 클릭 시 해당 행으로 스크롤 + 잠깐 강조.
  const [flashId, setFlashId] = useState(null)
  useEffect(() => {
    if (flashId == null) return
    const t = setTimeout(() => setFlashId(null), 1600)
    return () => clearTimeout(t)
  }, [flashId])
  const jumpTo = (id) => {
    document.getElementById(`row-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setFlashId(id)
  }

  // ── 조치 팝오버 + 첨부 이미지(로컬 보관) ──────────────────────────
  //  보완 항목/자산을 클릭하면 떠 있는 팝오버로 조치 UI를 연다(레이아웃을 밀지 않음).
  //  현재 구현된 조치는 이미지 업로드뿐. 텍스트·출처·Agent 지시는 자리만 둔다.
  //  메타(slides/index.js)는 코드 소유라 워크벤치에서 못 고치므로, 첨부 이미지는
  //  localStorage에 세션별로 보관한다(아직 status를 자동으로 바꾸지는 않는다).
  const IMG_STORE = `slide-studio:asset-images:${sessionId}`
  const [images, setImages] = useState(() => {
    try { return JSON.parse(localStorage.getItem(IMG_STORE)) || {} } catch { return {} }
  })
  const persistImages = (updater) => {
    setImages((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      try {
        localStorage.setItem(IMG_STORE, JSON.stringify(next))
      } catch {
        alert('브라우저 저장 공간이 가득 찼습니다 — 이미지가 너무 큽니다.')
      }
      return next
    })
  }
  const setAssetImage = (key, dataUrl) => persistImages((prev) => ({ ...prev, [key]: dataUrl }))
  const removeAssetImage = (key) =>
    persistImages((prev) => {
      const next = { ...prev }
      delete next[key]
      return next
    })

  // 업로드 이미지를 그레이스케일(무채색)로 넣을지. 기본 켬. 드롭 핸들러가 최신값을
  //  읽을 수 있도록 ref에도 동기화한다(window 리스너의 stale closure 방지).
  const [grayscale, setGrayscale] = useState(true)
  const grayscaleRef = useRef(grayscale)
  useEffect(() => { grayscaleRef.current = grayscale }, [grayscale])

  const [popover, setPopover] = useState(null) // { rect, target:{type, slideId, assetIdx?, label} }
  const openPopover = (e, target) => {
    e.preventDefault()
    e.stopPropagation()
    setPopover({ rect: e.currentTarget.getBoundingClientRect(), target })
  }
  const closePopover = () => setPopover(null)
  useEffect(() => {
    if (!popover) return
    const onKey = (e) => e.key === 'Escape' && closePopover()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [popover])

  // 드래그&드롭: 자산 팝오버가 열려 있는 동안 파일을 끌어오면 화면 전체를 dim하고,
  //  드롭존 밖 어디에 놓아도 현재 자산에 업로드한다(window 레벨에서 받는다).
  const [dragging, setDragging] = useState(false)
  useEffect(() => {
    setDragging(false)
    const target = popover?.target
    if (!(target && target.type === 'asset' && target.assetIdx != null)) return
    const key = `${target.slideId}:${target.assetIdx}`
    const hasFiles = (e) => Array.from(e.dataTransfer?.types || []).includes('Files')
    let depth = 0
    const onEnter = (e) => {
      if (!hasFiles(e)) return
      e.preventDefault()
      depth += 1
      setDragging(true)
    }
    const onOver = (e) => {
      if (!hasFiles(e)) return
      e.preventDefault()
      if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy'
    }
    const onLeave = (e) => {
      if (!hasFiles(e)) return
      depth = Math.max(0, depth - 1)
      if (depth === 0) setDragging(false)
    }
    const onDrop = async (e) => {
      if (!hasFiles(e)) return
      e.preventDefault()
      depth = 0
      setDragging(false)
      const file = e.dataTransfer.files?.[0]
      if (!file) return
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드할 수 있습니다.')
        return
      }
      try {
        const url = await fileToDataUrl(file, { grayscale: grayscaleRef.current })
        setAssetImage(key, url)
      } catch {
        alert('이미지를 읽지 못했습니다.')
      }
    }
    window.addEventListener('dragenter', onEnter)
    window.addEventListener('dragover', onOver)
    window.addEventListener('dragleave', onLeave)
    window.addEventListener('drop', onDrop)
    return () => {
      window.removeEventListener('dragenter', onEnter)
      window.removeEventListener('dragover', onOver)
      window.removeEventListener('dragleave', onLeave)
      window.removeEventListener('drop', onDrop)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popover])

  const agg = useMemo(() => {
    const slides = session?.slides ?? []
    const colors = groupColors(slides)
    const rows = slides.map((s) => ({ slide: s, r: reviewSlide(s), color: colors[s.group || '기타'] }))
    const total = slides.length
    const bodyDone = rows.filter((x) => x.r.hasBody).length
    const assetsAll = rows.flatMap((x) => x.r.assets)
    const byStatus = { have: 0, 'data-ready': 0, need: 0, check: 0 }
    for (const a of assetsAll) byStatus[a.status] = (byStatus[a.status] || 0) + 1
    const assetReady = byStatus.have + byStatus['data-ready'] // 콘텐츠 단계 완료(작도만 남음 포함)
    const grades = { strong: 0, medium: 0, weak: 0 }
    for (const x of rows) for (const k of ['strong', 'medium', 'weak']) grades[k] += x.r.grades[k]
    const unverified = rows.reduce((n, x) => n + x.r.unverified, 0)
    const readySlides = rows.filter((x) => x.r.ready).length
    // 보완해야 할 것을 슬라이드 단위가 아니라 구체적 "항목" 단위로 펼친다.
    const todos = rows.flatMap((x) =>
      slideTodos(x.slide, x.r).map((t) => ({ ...t, id: x.slide.id, title: x.slide.title })),
    )
    const todoGroups = [
      { key: 'body', label: '본문 미작성', items: todos.filter((t) => t.type === 'body') },
      { key: 'need', label: '자산 · 확보 필요', items: todos.filter((t) => t.type === 'asset' && t.status === 'need') },
      { key: 'check', label: '자산 · 확인 필요', items: todos.filter((t) => t.type === 'asset' && t.status === 'check') },
      { key: 'ev', label: '미검증 근거', items: todos.filter((t) => t.type === 'ev') },
    ].filter((g) => g.items.length > 0)
    return {
      rows, total, bodyDone, assetsAll, byStatus, assetReady, grades, unverified,
      readySlides, todos, todoGroups, ready: total > 0 && readySlides === total,
    }
  }, [session])

  if (!session) return <Navigate to="/" replace />
  const { rows } = agg
  const assetsTotal = agg.assetsAll.length
  // 자산 메트릭 하위 설명: 확보(완제)·작도대기·확인·필요 중 0이 아닌 것만.
  const assetSub = [
    agg.byStatus.have ? `확보 ${agg.byStatus.have}` : null,
    agg.byStatus['data-ready'] ? `작도대기 ${agg.byStatus['data-ready']}` : null,
    agg.byStatus.check ? `확인 ${agg.byStatus.check}` : null,
    agg.byStatus.need ? `필요 ${agg.byStatus.need}` : null,
  ].filter(Boolean).join(' · ')

  return (
    <div className={styles.screen} data-theme={sessionId}>
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
                    아직 준비 안 됨 — {agg.total - agg.readySlides}개 슬라이드 · 할 일 {agg.todos.length}건
                  </p>
                  <p className={styles.gateSub}>
                    자산 확보 필요 {agg.byStatus.need} · 자산 확인 필요 {agg.byStatus.check} · 미검증 근거 {agg.unverified} · 본문 미작성 {agg.total - agg.bodyDone}
                    <span className={styles.gateAside}> · 작도 대기 {agg.byStatus['data-ready']}(Phase 4)</span>
                  </p>
                </div>
              </>
            )}
          </div>

          <div className={styles.metrics}>
            <Metric label="본문 작성" value={`${agg.bodyDone}/${agg.total}`} />
            <Metric
              label="자산 준비"
              value={`${agg.assetReady}/${assetsTotal}`}
              sub={assetSub}
              tone={agg.assetReady === assetsTotal ? 'ok' : undefined}
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

          {agg.todoGroups.length > 0 && (
            <div className={styles.todos}>
              <p className={styles.todosHead}>보완 목록 — 구체적으로 무엇이 부족한가</p>
              {agg.todoGroups.map((g) => (
                <div key={g.key} className={styles.todoGroup}>
                  <p className={styles.todoGroupHead}>
                    <span className={`${styles.todoTag} ${styles['tag_' + g.key]}`}>{g.label}</span>
                    <span className={styles.todoCount}>{g.items.length}</span>
                    <span className={styles.todoHint}>{TODO_HINT[g.key]}</span>
                  </p>
                  <ul className={styles.todoList}>
                    {g.items.map((t, i) => (
                      <li key={`${t.id}-${i}`}>
                        <button type="button" className={styles.todoItem} onClick={() => jumpTo(t.id)}>
                        {images[`${t.id}:${t.idx}`] && <span className={styles.todoAttached} title="이미지 첨부됨">🖼</span>}
                        <span className={styles.todoSlide}>p{t.id}</span>
                        <span className={styles.todoBody}>
                          {t.type === 'body' && <span className={styles.todoDesc}>{t.title} — 본문 글머리표</span>}
                          {t.type === 'asset' && (
                            <>
                              <span className={styles.todoDesc}>
                                <span className={styles.todoKind}>{t.kind}</span>{t.desc}
                              </span>
                              {t.source && <span className={styles.todoMeta}>출처 · {t.source}</span>}
                              {t.license && <span className={styles.todoMeta}>라이선스 · {t.license}</span>}
                            </>
                          )}
                          {t.type === 'ev' && (
                            <>
                              <span className={styles.todoDesc}>{t.desc}</span>
                              {t.verify && <span className={styles.todoMeta}>확인 · {t.verify}</span>}
                            </>
                          )}
                        </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 슬라이드별 콘텐츠 행 */}
        <ul className={styles.list}>
          {rows.map(({ slide: s, r, color }) => (
            <li
              key={s.id}
              id={`row-${s.id}`}
              className={`${styles.row} ${flashId === s.id ? styles.rowFlash : ''}`}
            >
              <div className={styles.rowHead}>
                <span className={styles.num}>{s.id}</span>
                <span className={styles.rowTitle}>{s.title}</span>
                <span className={styles.groupBadge} style={{ '--group-color': color }}>{s.group}</span>
                <span
                  className={`${styles.readyDot} ${r.ready ? styles.dotOk : styles.dotBlock}`}
                  title={r.ready ? '준비 완료' : '보완 필요'}
                />
                <Link
                  to={`/${sessionId}/overview?slide=${s.id}`}
                  className={styles.rowLink}
                  title="개요 인스펙터에서 시각 계획·근거와 함께 보기"
                >
                  개요 ↗
                </Link>
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
                        <li
                          key={i}
                          className={styles.asset}
                          role="button"
                          tabIndex={0}
                          title="클릭해서 조치(이미지 업로드 등)"
                          onClick={(e) => openPopover(e, { type: 'asset', slideId: s.id, assetIdx: i, label: `${a.kind} · ${a.desc}` })}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') openPopover(e, { type: 'asset', slideId: s.id, assetIdx: i, label: `${a.kind} · ${a.desc}` })
                          }}
                        >
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
                          {images[`${s.id}:${i}`] && (
                            <img className={styles.assetThumb} src={images[`${s.id}:${i}`]} alt="첨부 이미지" />
                          )}
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

      {popover && (() => {
        const { rect, target } = popover
        const W = 300
        const Hest = 320
        const left = Math.max(12, Math.min(rect.left, window.innerWidth - W - 12))
        let top = rect.bottom + 8
        if (top + Hest > window.innerHeight) top = Math.max(12, rect.top - Hest - 8)
        const isAsset = target.type === 'asset' && target.assetIdx != null
        const key = isAsset ? `${target.slideId}:${target.assetIdx}` : null
        const onPick = async (e) => {
          const file = e.target.files?.[0]
          if (!file) return
          try {
            const url = await fileToDataUrl(file, { grayscale })
            setAssetImage(key, url)
          } catch {
            alert('이미지를 읽지 못했습니다.')
          }
        }
        const toGrayscale = async () => {
          try {
            setAssetImage(key, await dataUrlToGrayscale(images[key]))
          } catch {
            alert('변환에 실패했습니다.')
          }
        }
        return (
          <>
            <div className={styles.popBackdrop} onClick={closePopover} />
            {dragging && <div className={styles.dragDim} />}
            <div className={`${styles.popover} ${dragging ? styles.popoverDrag : ''}`} style={{ top, left, width: W }} role="dialog">
              <div className={styles.popHead}>
                <span className={styles.popLabel}>p{target.slideId} · {target.label}</span>
                <button type="button" className={styles.popClose} onClick={closePopover} aria-label="닫기">✕</button>
              </div>

              {/* 조치 탭 — 지금은 이미지만 동작, 나머지는 자리표시 */}
              <div className={styles.popTabs}>
                <span className={`${styles.popTab} ${styles.popTabActive}`}>이미지</span>
                <span className={styles.popTab} aria-disabled title="준비 중">텍스트</span>
                <span className={styles.popTab} aria-disabled title="준비 중">출처</span>
                <span className={styles.popTab} aria-disabled title="준비 중">Agent 지시</span>
              </div>

              {isAsset ? (
                <div className={styles.popBody}>
                  <label className={styles.popCheck}>
                    <input type="checkbox" checked={grayscale} onChange={(e) => setGrayscale(e.target.checked)} />
                    흑백(그레이스케일)로 넣기
                  </label>
                  {images[key] ? (
                    <>
                      <img className={styles.popPreview} src={images[key]} alt="첨부 이미지" />
                      <div className={styles.popActions}>
                        <label className={styles.popBtn}>
                          다시 업로드
                          <input type="file" accept="image/*" hidden onChange={onPick} />
                        </label>
                        <button type="button" className={styles.popBtnGhost} onClick={toGrayscale}>
                          흑백 변환
                        </button>
                        <button type="button" className={styles.popBtnGhost} onClick={() => removeAssetImage(key)}>
                          제거
                        </button>
                      </div>
                    </>
                  ) : (
                    <label className={`${styles.popDrop} ${dragging ? styles.popDropActive : ''}`}>
                      <input type="file" accept="image/*" hidden onChange={onPick} />
                      <span className={styles.popDropIcon}>{dragging ? '↓' : '＋'}</span>
                      <span>{dragging ? '여기에 놓으세요 — 화면 어디에 놓아도 됩니다' : '클릭하거나 이미지를 끌어다 놓기'}</span>
                      <span className={styles.popDropHint}>PNG · JPG (긴 변 1600px로 축소 저장)</span>
                    </label>
                  )}
                  <p className={styles.popNote}>
                    이미지는 이 브라우저에 임시 보관됩니다. 메타(status)는 자동으로 바뀌지 않습니다.
                  </p>
                </div>
              ) : (
                <div className={styles.popBody}>
                  <p className={styles.popNote}>
                    이미지 업로드는 자산 항목에 적용됩니다. 이 항목({target.type === 'body' ? '본문' : '근거'})의
                    텍스트 작성·Agent 지시는 준비 중입니다.
                  </p>
                </div>
              )}

              <button type="button" className={styles.popJump} onClick={() => { jumpTo(target.slideId); closePopover() }}>
                슬라이드 행으로 ↘
              </button>
            </div>
          </>
        )
      })()}
    </div>
  )
}
