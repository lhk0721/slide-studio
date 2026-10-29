import Frame from '../components/Frame'
import styles from './Slide04.module.css'
import cycle from '../assets/fig02_cycle.png'

const stats = [
  { val: '81.6%', lbl: '5년 안에 문을 닫는\n국내 헬스장', src: '중소벤처기업부, 2020' },
  { val: '80%', lbl: '해마다 자리를 옮기는\n미국 트레이너', src: 'American Spa, 업계 추정' },
  { val: '50%', lbl: '6개월 안에 그만두는\n신규 회원', src: 'IHRSA, 2020' },
]

export default function Slide04() {
  return (
    <Frame
      title="시장 실패로 이어진 정량 분석 수단 부재"
      sub="세 시장 참여자의 lose-lose 루프"
      section="03 · 시장실패"
      converge={<>품질을 가릴 수 없는 시장에 남는 것은 <strong>질 낮은 쪽</strong>, 전형적인 레몬시장</>}
    >
      <div className="gr-body">
        <div className={`gr-col ${styles.left}`}>
          <div className="gr-fig">
            <img src={cycle} alt="세 참여자의 악순환 도식" />
          </div>
        </div>

        <div className="gr-col center gr-grow">
          <ul className="gr-points">
            <li>
              <strong>80년째 그대로인 지도 방식</strong>
              <br />
              트레이너 간 구전 노하우와 감, 대리 지표(proxy metric)의 주객전도
            </li>
            <li>
              <strong>증명할 수 없는 지도 품질</strong>
              <br />
              사업주는 인건비 절감, 트레이너는 영업직화, 회원은 최저가 선택과 시장 이탈
            </li>
            <li>회원(소비자)에게 전가되는 시장실패의 비용과 부상 위험</li>
          </ul>
          <div className={`gr-stats ${styles.stats}`}>
            {stats.map((s) => (
              <div key={s.lbl} className="gr-stat">
                <span className="gr-stat-val">{s.val}</span>
                <span className="gr-stat-lbl">{s.lbl}</span>
                <span className={styles.src}>{s.src}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  )
}
