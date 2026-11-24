import Frame from '../components/Frame'
import base from './Slide11.module.css'
import styles from './Slide13.module.css'
import rack from '../assets/fig32_rack_design.jpg'
import opencap from '../assets/fig33_opencap_tool.jpg'

// 11장과 같은 틀: 왼쪽은 정답(gold standard), 오른쪽 둘은 그 정답에 견줄 두 방식.
// 두 방식은 삼각측량이 같아서 한 묶음 이름표로 묶는다
const methods = [
  {
    tag: 'RackTracker',
    img: rack,
    fit: 'contain',
    alt: '파워랙 기둥에 카메라 세 대를 단 RackTracker 설계도',
    name: '파워랙 고정 설치',
    desc: '글로벌 셔터 카메라 3대를 파워랙에 고정,\n트리거 신호 하나로 동기 촬영',
    accent: true,
  },
  {
    tag: 'OpenCap 도구',
    img: opencap,
    alt: '삼각대에 세운 아이폰 여러 대로 동작을 찍는 OpenCap 도구',
    name: '스마트폰 여러 대',
    desc: '삼각대에 세운 아이폰 여러 대로 촬영,\n촬영 뒤 계산으로 동기',
  },
]

export default function Slide13() {
  return (
    <Frame
      title="OpenCap 도구와의 비교검증"
      sub="gold standard(마커 모션캡처와 지면반력판)에 견줄 두 방식 · ICG 실증연구"
      section="07 · 실증연구"
      converge={<>정답은 마커 모션캡처에 <strong>지면반력판</strong>을 더해, 역동역학 분석까지 검증</>}
    >
      <div className={`gr-body tight ${base.body}`}>
        <div className={`gr-col ${base.truth}`}>
          <div className="gr-tag">Gold standard</div>
          <div className={`${base.photo} ${styles.tall}`}>
            <video src="/graduation-review/opencap_gold.mp4" autoPlay muted loop playsInline />
          </div>
          <div className={base.name}>마커 모션캡처 + 지면반력판</div>
          <p className={base.desc}>
            OpenCap 검증 데이터.<br />
            마커와 지면반력판으로 함께 잰 스쿼트 기록.<br />
            지면반력판으로 잰 바닥 힘을<br />
            역동역학 분석의 정답으로 사용
          </p>
        </div>
        <div className={base.vs} aria-hidden="true" />
        <div className={`gr-grow ${styles.pair}`}>
          <div className={styles.common}><span>공통점 · 다시점 삼각측량</span></div>
          <div className={styles.cols}>
            {methods.map((m) => (
              <div key={m.tag} className={`gr-col gr-grow ${base.method}`}>
                <div className={`gr-tag${m.accent ? ' accent' : ''}`}>{m.tag}</div>
                <div className={`${base.photo} ${m.fit === 'contain' ? styles.contain : ''}`}>
                  <img src={m.img} alt={m.alt} />
                </div>
                <div className={`${base.name}${m.accent ? ` ${base.ours}` : ''}`}>{m.name}</div>
                <p className={base.desc}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={base.credit}>
        영상: OpenCap 검증 데이터(Uhlrich 외 2023) · 사진: OpenCap 홈페이지
      </div>
    </Frame>
  )
}
