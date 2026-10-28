import Frame from '../components/Frame'
import styles from './Slide11.module.css'
import acc from '../assets/fig28_instanthmr.png'
import review from '../assets/fig25_session_review.jpg'

const stats = [
  { val: '3.63', unit: 'cm', lbl: '관절 위치 오차 MPJPE\nFit3D 8샘플' },
  { val: '2.0', unit: '배', lbl: '단안 모델 InstantHMR 보다\n작은 관절 위치 오차' },
  { val: '2.1', unit: '배', lbl: 'InstantHMR 보다\n작은 무릎 각도 오차' },
  { val: '251', unit: 'ms', lbl: '화면값 지연' },
]

export default function Slide11() {
  return (
    <Frame
      title="검증과 마무리"
      sub="마커 모션캡처 정답(Fit3D)과의 비교, 단안 모델과의 비교"
      section="05 · 검증"
      converge={<>부스 <strong>9번</strong>, 리그 실물 측정 체험</>}
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
              <img src={acc} alt="삼각측량만, L-BFGS 다듬기, InstantHMR 의 오차 막대" />
            </div>
            <div className="gr-cap">관절 위치 오차(cm)와 무릎 각도 오차(°)</div>
          </div>
          <div className="gr-col gr-grow">
            <div className="gr-fig">
              <img src={review} alt="지난 세션 보기 화면" />
            </div>
            <div className="gr-cap">지난 세션 보기. 근육군 색, 세트 시계열, 리포트 카드</div>
          </div>
        </div>
      </div>
    </Frame>
  )
}
