import { useCallback, useMemo, useRef, useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Panel,
  Handle,
  Position,
  MarkerType,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import dagre from '@dagrejs/dagre'
import { getSession } from '../sessions'
import styles from './Overview.module.css'

const NODE_W = 232
const NODE_H = 112
const SEC_PAD = 16 // section box padding around its members
const SEC_LABEL_H = 26 // top strip reserved for the act title

// Distinct order of appearance → stable group index → color.
const GROUP_COLORS = ['#971B2F', '#1F6FB2', '#2E8B57', '#B26A00', '#6A4C93', '#0E7C86']

function hexToRgba(hex, a) {
  const n = parseInt(hex.replace('#', ''), 16)
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`
}

// Order-of-appearance map: group → { color, ord }.
function groupMeta(slides) {
  const map = {}
  let i = 0
  for (const s of slides) {
    const g = s.group || '기타'
    if (!(g in map)) {
      map[g] = { color: GROUP_COLORS[i % GROUP_COLORS.length], ord: i + 1 }
      i++
    }
  }
  return map
}

// Evidence items are strings or { stat, source?, verify? } — normalize.
function evItem(e) {
  return typeof e === 'string' ? { stat: e } : e
}
function hasDetail(evidence) {
  return (evidence || []).some((e) => typeof e !== 'string' && (e.source || e.verify))
}

// Heuristic placement hint from the visual note — where the image sits.
const POS_HINTS = [
  [/(좌|왼)/, '좌'],
  [/(우|오른)/, '우'],
  [/(상단|위쪽|맨\s*위)/, '상단'],
  [/(하단|아래)/, '하단'],
  [/(중앙|가운데)/, '중앙'],
  [/(배경|풀\s*블리드|full)/i, '배경'],
  [/(전면|풀\s*스크린)/, '전면'],
]
function visualPosition(visual) {
  if (!visual) return null
  const hits = []
  for (const [re, label] of POS_HINTS) if (re.test(visual) && !hits.includes(label)) hits.push(label)
  return hits.length ? hits.join('·') : null
}

// ── 시각 계획 와이어프레임 ──────────────────────────────────────
//  visual 메모에서 콘텐츠 구조의 "실루엣"을 추론해 저해상도로 그린다.
//   · 글        → 흰 배경 위 회색 줄
//   · 인포그래픽 → 무채색 도형(막대/선/도넛/도식/그리드)
//   · 사진 영역  → 빗금친 네모박스 + 사진 글리프
const WF = { w: 160, h: 90 } // 16:9 viewBox

// visual 텍스트에서 등장 순서대로 도형 종류를 수집(텍스트는 기본값).
function scanKinds(t) {
  const defs = [
    ['photo', /(증명\s*사진|전경|셔터|사진|로고)/],
    ['donut', /도넛/],
    ['bar', /막대/],
    ['line', /(곡선|꺾은선|추세선)/],
    ['grid', /(매트릭스|2\s*[×xX]\s*2|아이콘\s*카드|카드|아이콘|2칸)/],
    ['diagram', /(다이어그램|도식|구조도|분기|플로우|화살표)/],
  ]
  const found = []
  for (const [k, re] of defs) {
    const m = re.exec(t)
    if (m) found.push([k, m.index])
  }
  found.sort((a, b) => a[1] - b[1])
  return found.map((x) => x[0])
}

// 하나의 콘텐츠 도형을 (x,y,w,h) 영역 안에 무채색으로 그린다.
function WfElement({ kind, x, y, w, h }) {
  switch (kind) {
    case 'photo':
      return (
        <g>
          <rect x={x} y={y} width={w} height={h} rx={3} fill="url(#wfHatch)" stroke="#b4bcc2" strokeWidth={1.2} />
          <g stroke="#8b939b" strokeWidth={1.6} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <circle cx={x + w * 0.32} cy={y + h * 0.34} r={Math.min(w, h) * 0.06} fill="#8b939b" stroke="none" />
            <path
              d={`M ${x + w * 0.14} ${y + h * 0.8} L ${x + w * 0.4} ${y + h * 0.48} L ${x + w * 0.56} ${y + h * 0.66} L ${x + w * 0.74} ${y + h * 0.42} L ${x + w * 0.88} ${y + h * 0.8}`}
            />
          </g>
        </g>
      )
    case 'bar': {
      const n = 4
      const base = y + h - 4
      const slot = w / n
      const bw = slot * 0.5
      const hs = [0.5, 0.82, 0.6, 0.95]
      return (
        <g>
          <line x1={x} y1={base} x2={x + w} y2={base} stroke="#c4ccd2" strokeWidth={1} />
          {hs.map((f, i) => {
            const bh = (h - 8) * f
            return <rect key={i} x={x + slot * i + (slot - bw) / 2} y={base - bh} width={bw} height={bh} rx={1.5} fill="#9aa3ab" />
          })}
        </g>
      )
    }
    case 'line': {
      const vals = [0.74, 0.5, 0.62, 0.32, 0.16]
      const pts = vals.map((v, i) => `${x + (w * i) / (vals.length - 1)},${y + h * v}`).join(' ')
      return (
        <g fill="none">
          <line x1={x} y1={y + h - 3} x2={x + w} y2={y + h - 3} stroke="#c4ccd2" strokeWidth={1} />
          <polyline points={pts} stroke="#8b939b" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )
    }
    case 'donut': {
      const cx = x + w / 2
      const cy = y + h / 2
      const r = Math.min(w, h) * 0.32
      const sw = r * 0.6
      const circ = 2 * Math.PI * r
      return (
        <g fill="none">
          <circle cx={cx} cy={cy} r={r} stroke="#dde2e6" strokeWidth={sw} />
          <circle
            cx={cx}
            cy={cy}
            r={r}
            stroke="#9aa3ab"
            strokeWidth={sw}
            strokeDasharray={`${circ * 0.35} ${circ}`}
            transform={`rotate(-90 ${cx} ${cy})`}
          />
        </g>
      )
    }
    case 'grid': {
      const g = 6
      const cw = (w - g) / 2
      const ch = (h - g) / 2
      const cells = [[0, 0], [1, 0], [0, 1], [1, 1]]
      return (
        <g>
          {cells.map(([cxi, cyi], i) => (
            <rect
              key={i}
              x={x + cxi * (cw + g)}
              y={y + cyi * (ch + g)}
              width={cw}
              height={ch}
              rx={2}
              fill="#eef1f3"
              stroke="#aab2b9"
              strokeWidth={1}
            />
          ))}
        </g>
      )
    }
    case 'diagram': {
      const bw = w * 0.32
      const bh = Math.min(h * 0.5, 26)
      const by = y + (h - bh) / 2
      const rx2 = x + w - bw
      return (
        <g>
          <rect x={x} y={by} width={bw} height={bh} rx={3} fill="#eef1f3" stroke="#aab2b9" strokeWidth={1} />
          <rect x={rx2} y={by} width={bw} height={bh} rx={3} fill="#eef1f3" stroke="#aab2b9" strokeWidth={1} />
          <g stroke="#9aa3ab" strokeWidth={1.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <line x1={x + bw} y1={by + bh / 2} x2={rx2 - 3} y2={by + bh / 2} />
            <path d={`M ${rx2 - 6} ${by + bh / 2 - 3} L ${rx2 - 2} ${by + bh / 2} L ${rx2 - 6} ${by + bh / 2 + 3}`} />
          </g>
        </g>
      )
    }
    case 'text':
    default: {
      const ws = [1, 0.86, 0.62]
      return (
        <g>
          {ws.map((f, i) => (
            <rect key={i} x={x} y={y + 6 + i * 10} width={w * f} height={4.5} rx={2.25} fill={i === 0 ? '#cfd5da' : '#e0e4e8'} />
          ))}
        </g>
      )
    }
  }
}

// 16:9 캔버스에 제목 줄 + 콘텐츠(1~2열) 실루엣을 그린다.
function Wireframe({ visual, pos }) {
  const full = /(배경|전면|풀\s*블리드|풀\s*스크린|full)/i.test(`${pos || ''} ${visual}`)
  const kinds = scanKinds(visual)
  const cols = kinds.length ? kinds.slice(0, 2) : ['text']
  const P = 8
  const gap = 8
  const cTop = 30
  const cBot = WF.h - P
  const cL = P
  const cR = WF.w - P
  return (
    <svg className={styles.wf} viewBox={`0 0 ${WF.w} ${WF.h}`} role="img" aria-label="슬라이드 콘텐츠 구조 미리보기">
      <defs>
        <pattern id="wfHatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="6" height="6" fill="#f0f2f4" />
          <line x1="0" y1="0" x2="0" y2="6" stroke="#c6ced4" strokeWidth="1.3" />
        </pattern>
      </defs>
      <rect x="0" y="0" width={WF.w} height={WF.h} fill="#fff" />

      {full ? (
        <>
          <WfElement kind="photo" x={3} y={3} w={WF.w - 6} h={WF.h - 6} />
          <rect x={P} y={WF.h - 24} width={92} height={6} rx={3} fill="#fff" opacity="0.9" />
          <rect x={P} y={WF.h - 14} width={56} height={4} rx={2} fill="#fff" opacity="0.75" />
        </>
      ) : (
        <>
          {/* 제목·본문 = 회색 줄 */}
          <rect x={P} y={10} width={96} height={6} rx={3} fill="#cfd5da" />
          <rect x={P} y={20} width={58} height={4} rx={2} fill="#e0e4e8" />
          {/* 콘텐츠: 1열 채움 또는 2열 분할 */}
          {cols.map((kind, i) => {
            const cw = cols.length === 2 ? (cR - cL - gap) / 2 : cR - cL
            const cx = cL + i * (cw + gap)
            return <WfElement key={i} kind={kind} x={cx} y={cTop} w={cw} h={cBot - cTop} />
          })}
        </>
      )}
    </svg>
  )
}

// One edge per `next` target; default to the next slide number when omitted.
function buildEdges(slides) {
  const ids = new Set(slides.map((s) => s.id))
  const edges = []
  for (const s of slides) {
    const targets = s.next ?? (ids.has(s.id + 1) ? [s.id + 1] : [])
    for (const t of targets) {
      if (!ids.has(t)) continue
      edges.push({
        id: `${s.id}-${t}`,
        source: String(s.id),
        target: String(t),
        type: 'smoothstep',
        markerEnd: { type: MarkerType.ArrowClosed, width: 16, height: 16 },
      })
    }
  }
  return edges
}

// dagre computes (x,y) for the DAG; React Flow renders at those coords.
// Returns slide nodes + section background nodes + content bounds.
// `dir` = 'LR' (horizontal, default) | 'TB' (vertical).
function layout(slides, edges, gmeta, dir) {
  const g = new dagre.graphlib.Graph()
  g.setDefaultEdgeLabel(() => ({}))
  g.setGraph({ rankdir: dir, nodesep: 56, ranksep: 88 })
  for (const s of slides) g.setNode(String(s.id), { width: NODE_W, height: NODE_H })
  for (const e of edges) g.setEdge(e.source, e.target)
  dagre.layout(g)

  // group → member count (sections with ≥2 members get a tinted region).
  const counts = {}
  for (const s of slides) counts[s.group || '기타'] = (counts[s.group || '기타'] || 0) + 1

  const slideNodes = slides.map((s) => {
    const { x, y } = g.node(String(s.id))
    const grp = s.group || '기타'
    return {
      id: String(s.id),
      type: 'slide',
      position: { x: x - NODE_W / 2, y: y - NODE_H / 2 },
      zIndex: 1,
      data: { slide: s, color: gmeta[grp].color, dir, showTag: counts[grp] < 2 },
    }
  })

  // Content bounds (slide cards only) — used to frame the initial viewport.
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
  for (const n of slideNodes) {
    minX = Math.min(minX, n.position.x)
    minY = Math.min(minY, n.position.y)
    maxX = Math.max(maxX, n.position.x + NODE_W)
    maxY = Math.max(maxY, n.position.y + NODE_H)
  }

  // Section regions: union bbox per multi-node group, borderless tint + title.
  const byGroup = {}
  for (const n of slideNodes) {
    const grp = n.data.slide.group || '기타'
    const b = (byGroup[grp] ??= { x1: Infinity, y1: Infinity, x2: -Infinity, y2: -Infinity })
    b.x1 = Math.min(b.x1, n.position.x)
    b.y1 = Math.min(b.y1, n.position.y)
    b.x2 = Math.max(b.x2, n.position.x + NODE_W)
    b.y2 = Math.max(b.y2, n.position.y + NODE_H)
  }
  const sectionNodes = Object.entries(byGroup)
    .filter(([grp]) => counts[grp] >= 2)
    .map(([grp, b]) => {
      const { color, ord } = gmeta[grp]
      return {
        id: `sec:${grp}`,
        type: 'section',
        position: { x: b.x1 - SEC_PAD, y: b.y1 - SEC_PAD - SEC_LABEL_H },
        draggable: false,
        selectable: false,
        connectable: false,
        focusable: false,
        zIndex: 0,
        style: {
          width: b.x2 - b.x1 + SEC_PAD * 2,
          height: b.y2 - b.y1 + SEC_PAD * 2 + SEC_LABEL_H,
        },
        data: { label: `${ord}. ${grp}`, color, bg: hexToRgba(color, 0.07) },
      }
    })

  return { nodes: [...sectionNodes, ...slideNodes], bounds: { minX, minY, maxX, maxY } }
}

// Borderless tinted region behind a section's slides + act title.
function SectionNode({ data }) {
  return (
    <div className={styles.section} style={{ background: data.bg, '--group-color': data.color }}>
      <span className={styles.sectionLabel}>{data.label}</span>
    </div>
  )
}

// Custom node = the same num/role/message card as the inspector list.
function SlideNode({ data, selected }) {
  const { slide: s, color, dir, showTag } = data
  const tPos = dir === 'LR' ? Position.Left : Position.Top
  const sPos = dir === 'LR' ? Position.Right : Position.Bottom
  return (
    <div
      className={`${styles.node} ${selected ? styles.nodeSel : ''}`}
      style={{ '--group-color': color, width: NODE_W, height: NODE_H }}
    >
      <Handle type="target" position={tPos} className={styles.handle} />
      <div className={styles.nodeHead}>
        <span className={styles.num}>{s.id}</span>
        {showTag && <span className={styles.groupTag}>{s.group}</span>}
      </div>
      {s.role && <span className={styles.role}>{s.role}</span>}
      <span className={styles.msg}>{s.message || s.title}</span>
      <Handle type="source" position={sPos} className={styles.handle} />
    </div>
  )
}

const nodeTypes = { slide: SlideNode, section: SectionNode }

export default function Overview() {
  const { sessionId } = useParams()
  const session = getSession(sessionId)
  const [sel, setSel] = useState(null)
  const [detail, setDetail] = useState(false) // 근거 자세히보기 드로어
  const [dir, setDir] = useState('LR') // 'LR' 가로 · 'TB' 세로
  const mainRef = useRef(null)

  const { baseNodes, edges, bounds, gmeta } = useMemo(() => {
    const slides = session?.slides ?? []
    const gmeta = groupMeta(slides)
    const edges = buildEdges(slides)
    const { nodes, bounds } = layout(slides, edges, gmeta, dir)
    return { baseNodes: nodes, edges, bounds, gmeta }
  }, [session, dir])

  // Flag selection on slide nodes without recomputing the dagre layout.
  const nodes = useMemo(
    () => baseNodes.map((n) => (n.type === 'slide' ? { ...n, selected: sel === n.id } : n)),
    [baseNodes, sel]
  )

  const onNodeClick = useCallback((_e, node) => {
    if (node.type !== 'slide') return
    setSel(node.id)
    setDetail(false) // 슬라이드를 새로 고르면 드로어는 접고 시작
  }, [])

  const closeInspector = useCallback(() => {
    setSel(null)
    setDetail(false)
  }, [])

  // Frame the graph: flow axis starts at the lead edge, cross axis centered.
  const onInit = useCallback(
    (instance) => {
      const el = mainRef.current
      if (!el) return
      const cw = el.clientWidth
      const ch = el.clientHeight
      const zoom = 0.9
      const { minX, minY, maxX, maxY } = bounds
      const cx = (minX + maxX) / 2
      const cy = (minY + maxY) / 2
      let x, y
      if (dir === 'LR') {
        x = 64 - minX * zoom
        y = ch / 2 - cy * zoom
      } else {
        y = 104 - minY * zoom
        x = cw / 2 - cx * zoom
      }
      instance.setViewport({ x, y, zoom })
    },
    [bounds, dir]
  )

  // Unknown session id → back to the picker.
  if (!session) return <Navigate to="/" replace />

  const slides = session.slides
  const selSlide = slides.find((s) => String(s.id) === sel) || null
  const selGroup = selSlide ? selSlide.group || '기타' : null
  const selColor = selGroup ? gmeta[selGroup]?.color : null
  const selOrd = selGroup ? gmeta[selGroup]?.ord : null
  const selPos = selSlide ? visualPosition(selSlide.visual) : null
  const evidence = selSlide?.evidence ?? []
  const canDetail = hasDetail(evidence)
  const drawerOpen = !!(selSlide && detail && evidence.length > 0)

  return (
    <div className={styles.screen}>
      <main className={styles.main} ref={mainRef}>
        <ReactFlow
          key={dir}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onInit={onInit}
          onNodeClick={onNodeClick}
          onPaneClick={closeInspector}
          minZoom={0.25}
          maxZoom={1.6}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable
          proOptions={{ hideAttribution: true }}
        >
          <Background gap={22} color="rgba(16,24,32,.05)" />

          <Panel position="top-left" className={styles.topbar}>
            <Link to="/" className={styles.back}>← 세션 목록</Link>
            <div className={styles.titleWrap}>
              <h1 className={styles.title}>{session.title}</h1>
              <span className={styles.sub}>{slides.length}장 · 내러티브 흐름</span>
            </div>
          </Panel>

          <Panel position="top-right" className={styles.actions}>
            <div className={styles.toggle} role="group" aria-label="흐름 방향">
              <button
                type="button"
                className={`${styles.toggleBtn} ${dir === 'LR' ? styles.toggleOn : ''}`}
                onClick={() => setDir('LR')}
              >
                가로
              </button>
              <button
                type="button"
                className={`${styles.toggleBtn} ${dir === 'TB' ? styles.toggleOn : ''}`}
                onClick={() => setDir('TB')}
              >
                세로
              </button>
            </div>
            <Link to={`/${sessionId}/1`} className={styles.present}>발표 모드 →</Link>
          </Panel>

          <Controls showInteractive={false} />
          <MiniMap
            pannable
            zoomable
            nodeColor={(n) => n.data?.color || '#5A636D'}
            nodeStrokeColor={(n) => n.data?.color || '#5A636D'}
            nodeStrokeWidth={6}
            nodeBorderRadius={3}
            maskColor="rgba(16,24,32,.20)"
            className={styles.minimap}
          />
        </ReactFlow>
      </main>

      {/* 근거 자세히보기 — 인스펙터 왼쪽으로 밀려 열리는 드로어 */}
      {drawerOpen && (
        <aside className={styles.drawer} aria-label="근거 자세히보기">
          <div className={styles.drawerHead}>
            <div>
              <span className={styles.drawerKicker}>근거 · 통계 자세히</span>
              <p className={styles.drawerSub}>
                슬라이드 {selSlide.id} · {selSlide.title}
              </p>
            </div>
            <button
              type="button"
              className={styles.close}
              onClick={() => setDetail(false)}
              aria-label="자세히보기 닫기"
            >
              ✕
            </button>
          </div>
          <ul className={styles.evCards}>
            {evidence.map((e, i) => {
              const it = evItem(e)
              return (
                <li key={i} className={styles.evCard} style={{ '--group-color': selColor }}>
                  <p className={styles.evStat}>{it.stat}</p>
                  {it.source && (
                    <div className={styles.evMeta}>
                      <span className={styles.evMetaLabel}>출처</span>
                      {it.url ? (
                        <a
                          className={styles.evCite}
                          href={it.url}
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          <span className={styles.evCiteText}>{it.source}</span>
                          <svg className={styles.evExt} viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M14 4h6v6M20 4l-9 9M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
                          </svg>
                        </a>
                      ) : (
                        <span className={styles.evMetaText}>{it.source}</span>
                      )}
                    </div>
                  )}
                  {it.verify && (
                    <div className={`${styles.evMeta} ${styles.evVerify}`}>
                      <span className={styles.evMetaLabel}>검증</span>
                      <span className={styles.evMetaText}>{it.verify}</span>
                    </div>
                  )}
                </li>
              )
            })}
          </ul>
        </aside>
      )}

      {selSlide && (
        <aside className={styles.inspector}>
          {/* ① 정체성 — 번호·섹션·역할·제목 */}
          <div className={styles.inspHead}>
            <div className={styles.inspId}>
              <span className={styles.inspNum}>슬라이드 {selSlide.id}</span>
              {selGroup && (
                <span className={styles.secBadge} style={{ '--group-color': selColor }}>
                  {selOrd}. {selSlide.group}
                </span>
              )}
            </div>
            <button
              type="button"
              className={styles.close}
              onClick={closeInspector}
              aria-label="닫기"
            >
              ✕
            </button>
          </div>
          <h2 className={styles.inspTitle}>{selSlide.title}</h2>
          {selSlide.role && <span className={styles.roleChip}>{selSlide.role}</span>}

          {/* ② 핵심 메시지 — 가장 큰 비중 */}
          {selSlide.message && (
            <section className={styles.block}>
              <h3 className={styles.blockLabel}>핵심 메시지</h3>
              <p className={styles.message} style={{ '--group-color': selColor }}>
                {selSlide.message}
              </p>
            </section>
          )}

          {/* ③ 시각 계획 — 콘텐츠 구조 실루엣(와이어프레임) + 위치·설명 */}
          {selSlide.visual && (
            <section className={styles.block}>
              <h3 className={styles.blockLabel}>시각 계획</h3>
              <div className={styles.imgFrame}>
                <Wireframe visual={selSlide.visual} pos={selPos} />
                {selPos && <span className={styles.posChip}>{selPos}</span>}
              </div>
              <p className={styles.imgCaption}>{selSlide.visual}</p>
            </section>
          )}

          {/* ③-2 페이지 내용 — 실제 슬라이드에 들어갈 본문 초안 */}
          {selSlide.body?.length > 0 && (
            <section className={styles.block}>
              <h3 className={styles.blockLabel}>페이지 내용</h3>
              <ul className={styles.bodyList} style={{ '--group-color': selColor }}>
                {selSlide.body.map((line, i) => (
                  <li key={i} className={styles.bodyItem}>{line}</li>
                ))}
              </ul>
            </section>
          )}

          {/* ④ 근거·통계 — 요약 + 자세히보기 */}
          {evidence.length > 0 && (
            <section className={styles.block}>
              <div className={styles.blockHead}>
                <h3 className={styles.blockLabel}>
                  근거 · 통계 <span className={styles.count}>{evidence.length}</span>
                </h3>
                {canDetail && (
                  <button
                    type="button"
                    className={`${styles.detailBtn} ${detail ? styles.detailOn : ''}`}
                    onClick={() => setDetail((d) => !d)}
                    aria-expanded={detail}
                  >
                    {detail ? '닫기' : '자세히 보기 →'}
                  </button>
                )}
              </div>
              <ul className={styles.evList}>
                {evidence.map((e, i) => {
                  const it = evItem(e)
                  return (
                    <li key={i} className={styles.evRow}>
                      <span className={styles.evRowStat}>{it.stat}</span>
                      {it.source && <span className={styles.evRowSrc}>{it.source}</span>}
                    </li>
                  )
                })}
              </ul>
            </section>
          )}

          {/* ⑤ 발표 노트 — 전달 레이어 */}
          {selSlide.notes && (
            <section className={styles.block}>
              <h3 className={styles.blockLabel}>발표 노트</h3>
              <p className={styles.notes}>{selSlide.notes}</p>
            </section>
          )}

          <Link to={`/${sessionId}/${selSlide.id}`} className={styles.openSlide}>
            이 슬라이드 발표 모드로 →
          </Link>
        </aside>
      )}
    </div>
  )
}
