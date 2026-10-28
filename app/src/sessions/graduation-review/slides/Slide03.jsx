import Frame from '../components/Frame'
import styles from './Slide03.module.css'
import cycle from '../assets/fig02_cycle.png'

const stats = [
  { val: '80%', lbl: '5년 안에 문을 닫는\n국내 헬스장' },
  { val: '80%', lbl: '해마다 자리를 옮기는\n미국 트레이너' },
  { val: '1/2', lbl: '6개월 안에 그만두는\n신규 회원' },
]

export default function Slide03() {
  return (
    <Frame
      title="볼 수단이 없어 생긴 시장실패"
      sub="같은 원인으로 함께 지는 트레이너, 헬스장, 회원"
      section="01 · 문제"
      converge={<>품질을 가릴 수 없는 시장에 남는 것은 <strong>질 낮은 쪽</strong>. 레몬시장</>}
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
              <strong>하중 경로를 잴 수단의 부재.</strong> 지도의 근거는 구전 노하우와 각자의 감
            </li>
            <li>
              품질을 가릴 수 없는 시장. 헬스장은 트레이너를 <em>원가 절감</em> 대상으로,
              트레이너는 영업력으로, 회원은 더 싼 쪽으로
            </li>
            <li>시장실패의 비용과 부상 위험은 회원의 몫</li>
          </ul>
          <div className={`gr-stats ${styles.stats}`}>
            {stats.map((s) => (
              <div key={s.lbl} className="gr-stat">
                <span className="gr-stat-val">{s.val}</span>
                <span className="gr-stat-lbl">{s.lbl}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Frame>
  )
}
