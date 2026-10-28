import Frame from '../components/Frame'
import styles from './Slide13.module.css'
import paths from '../assets/fig22_two_paths.png'
import tail from '../assets/fig23_tail_accuracy.png'

export default function Slide13() {
  return (
    <Frame
      title="확정값 지연의 이유"
      sub="20초 구간을 한꺼번에 다시 산출"
      section="예비 2 · 질의응답"
      converge={<>학습 모델 초기값으로 <strong>2차례</strong>. 지연 22~28초에서 18~19초</>}
    >
      <div className="gr-body tight">
        <div className="gr-col center gr-grow">
          <span className="gr-reserve-tag">Q&amp;A 2</span>
          <ul className="gr-points">
            <li><strong>화면값</strong>: 프레임마다 삼각측량한 값. 251ms 뒤 화면 표시</li>
            <li><strong>확정값</strong>: 20초(묶음 600개) 구간을 한꺼번에 다시 산출한 값. 재투영 항, 가속도 항, 뼈 길이 항의 에너지를 L-BFGS 로 최소화</li>
            <li>학습 모델(Transformer)의 초기값으로 2차례면 충분. <em>MPJPE 4.45cm에서 3.63cm</em></li>
          </ul>
        </div>
        <div className={`gr-col ${styles.figs}`}>
          <div className="gr-fig">
            <img src={paths} alt="화면값과 확정값의 두 경로" />
          </div>
          <div className="gr-fig">
            <img src={tail} alt="다듬기 방식별 MPJPE" />
          </div>
        </div>
      </div>
    </Frame>
  )
}
