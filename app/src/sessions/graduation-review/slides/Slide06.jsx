import { useLayoutEffect, useRef } from 'react'
import Frame from '../components/Frame'
import styles from './Slide06.module.css'
import diag from '../assets/fig07_screen_diag.jpg'
import lens from '../assets/fig07_screen_lens.jpg'
import ext from '../assets/fig07_screen_ext.jpg'
import measure from '../assets/fig07_screen_measure.jpg'

const steps = [
  { n: '01', k: '진단', img: diag, when: '리그를 켜거나 선을 건드린 뒤', what: 'Rig 상태 종합점검,\n카메라 동기화 검사,\nTRG-STRB 100% 적중률 검사' },
  { n: '02', k: '렌즈 보정', img: lens, when: '새 카메라 / 렌즈 조절 / 충격 후', what: '여러 거리와 기울기의 보드 사진으로\n초점 거리와 왜곡계수 산출\n(카메라 개체별 고유 파라미터)' },
  { n: '03', k: '위치 보정', img: ext, when: '설치 직후 / 카메라가 움직인 뒤', what: '바닥(world) 좌표계, 랙 좌표계,\n기준 카메라 위치 산출 후\n보드 표본으로 C1·C2 상대 위치·방향 산출' },
  { n: '04', k: '측정', img: measure, when: '진단 통과와 두 보정 뒤', what: '세트 단위의 관절 복원과 하중 경로 산출' },
]

export default function Slide06() {
  // The 측정 screen is narrower than its column, so the focus box takes the
  // screen's width plus the same padding on both sides, not the column's width.
  const lastScreen = useRef(null)
  const focus = useRef(null)
  useLayoutEffect(() => {
    const img = lastScreen.current
    const box = focus.current
    const ro = new ResizeObserver(() => {
      box.style.width = `calc(${img.offsetWidth}px + 2 * var(--focus-pad))`
    })
    ro.observe(img)
    return () => ro.disconnect()
  }, [])

  return (
    <Frame
      title="운용절차"
      sub="태블릿 앱 하나에 이어지는 진단, 렌즈 보정, 위치 보정, 측정"
      section="04 · 리그"
      converge={<>선행조건(prerequisite) 관계, 동기 → 광학 → 기하 영점조절 후 <strong>측정 운용</strong></>}
    >
      <div className={`gr-body tight ${styles.body}`}>
        {/* one 4-column grid: screens on row 1, steps on row 2, so screen i sits over step i.
            .focus spans both rows of the last column to group 측정 */}
        <div className={styles.grid}>
          <div ref={focus} className={styles.focus} aria-hidden="true" />
          {steps.map((s, i) => (
            <div key={`screen-${s.n}`} className={styles.screen} style={{ gridColumn: i + 1 }}>
              <img
                ref={i === steps.length - 1 ? lastScreen : undefined}
                src={s.img}
                alt={`${s.k} 태블릿 화면`}
                className={styles.fig}
              />
              {i < steps.length - 1 && (
                <svg className={styles.arrow} viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4 12h15M13 6l6 6-6 6" />
                </svg>
              )}
            </div>
          ))}
          {steps.map((s, i) => (
            <div key={`step-${s.n}`} className={styles.step} style={{ gridColumn: i + 1 }}>
              <div className={styles.stepHd}>
                <span className={styles.num}>{s.n}</span>
                <span className={styles.name}>{s.k}</span>
              </div>
              <div className={styles.when}>{s.when}</div>
              <div className={styles.what}>{s.what}</div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  )
}
