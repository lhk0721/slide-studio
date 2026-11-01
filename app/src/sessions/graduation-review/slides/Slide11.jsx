import Frame from '../components/Frame'
import styles from './Slide11.module.css'
import acc from '../assets/fig28_instanthmr.png'

const stats = [
  { val: '3.63', unit: 'cm', lbl: '관절 위치 오차 MPJPE\nFit3D 8샘플' },
  { val: '49', unit: '%', lbl: 'InstantHMR 보다 작은\n자세 모양 오차 PA-MPJPE' },
  { val: '53', unit: '%', lbl: 'InstantHMR 보다 작은\n무릎 각도 오차' },
  { val: '251', unit: 'ms', lbl: '화면값 지연' },
]

// 랙 트래커는 할 수 있고 InstantHMR 은 못 하는 것. true/false 는 할 수 있다/없다 표시
const compare = [
  { item: '표준화된 공간 좌표계 위 3D 관절', ours: true, ihmr: false, hl: true },
  { item: '관절 위치 오차 MPJPE', ours: '3.63cm', ihmr: '잴 수 없음' },
  { item: '자세 모양 오차 PA-MPJPE', ours: '3.65cm', ihmr: '7.19cm' },
  { item: '무릎 각도 오차', ours: '4.76°', ihmr: '10.07°' },
]

function Mark({ ok }) {
  return (
    <svg className={ok ? styles.yes : styles.no} viewBox="0 0 24 24" role="img" aria-label={ok ? '가능' : '불가'}>
      <circle cx="12" cy="12" r="12" />
      {ok
        ? <path d="M6.5 12.5l3.6 3.6 7.4-7.6" />
        : <path d="M8 8l8 8M16 8l-8 8" />}
    </svg>
  )
}

const cell = (v) => (typeof v === 'boolean' ? <Mark ok={v} /> : v)

export default function Slide11() {
  return (
    <Frame
      title="검증과 마무리"
      sub="마커 모션캡처 정답(Fit3D)과의 비교, 단안 모델과의 비교"
      section="06 · 검증"
      converge={<>단안 모델은 자세 모양까지, 랙 트래커는 <strong>실제 공간의 3D 관절</strong>과 관절 하중까지</>}
    >
      <div className={`gr-body tight ${styles.body}`}>
        <div className="gr-stats">
          {stats.map((s) => (
            <div key={s.lbl} className="gr-stat">
              <span className="gr-stat-val">{s.val}<small>{s.unit}</small></span>
              <span className="gr-stat-lbl">{s.lbl}</span>
            </div>
          ))}
        </div>
        <div className={styles.figs}>
          <div className={`gr-col ${styles.chart}`}>
            <div className="gr-fig">
              <img src={acc} alt="삼각측량만, L-BFGS 다듬기, InstantHMR 의 자세 모양 오차와 무릎 각도 오차 막대" />
            </div>
            <div className="gr-cap">자세 모양 오차 PA-MPJPE(cm)와 무릎 각도 오차(°)</div>
          </div>
          <div className={`gr-col gr-grow center ${styles.right}`}>
            <table className={`gr-table ${styles.table}`}>
              <thead>
                <tr>
                  <th>항목</th>
                  <th>랙 트래커(카메라 3대)</th>
                  <th>InstantHMR(카메라 한 대)</th>
                </tr>
              </thead>
              <tbody>
                {compare.map((r) => (
                  <tr key={r.item} className={r.hl ? 'hl' : undefined}>
                    <td>{r.item}</td>
                    <td className={styles.ours}>{cell(r.ours)}</td>
                    <td className={styles.ihmr}>{cell(r.ihmr)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className={styles.note}>
              PA-MPJPE: 관절끼리의 상대 위치, 곧 자세 모양의 오차.<br />
              InstantHMR 은 표준화된 공간 좌표계에 3D 관절을 복원하지 못해 이 값으로만 비교
            </p>
          </div>
        </div>
      </div>
    </Frame>
  )
}
