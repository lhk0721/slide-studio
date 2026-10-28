import Frame from '../components/Frame'
import styles from './Slide06.module.css'
import flow from '../assets/fig07_flow.jpg'

const steps = [
  { n: '01', k: '진단', when: '리그를 켜거나 선을 건드린 뒤', what: '하드웨어와 카메라 동기의 자동 검사. STROBE 900/900' },
  { n: '02', k: '렌즈 보정', when: '카메라를 달거나 바꿨을 때', what: '여러 거리와 기울기의 보드 사진으로 초점 거리와 왜곡 산출' },
  { n: '03', k: '위치 보정', when: '설치 직후, 카메라가 움직인 뒤', what: '같은 보드를 찍은 세 카메라의 서로 위치와 방향 산출' },
  { n: '04', k: '측정', when: '진단 통과와 두 보정 뒤', what: '세트 단위의 관절 복원과 하중 경로 산출' },
]

export default function Slide06() {
  return (
    <Frame
      title="네 절차"
      sub="태블릿 앱 하나에 이어지는 진단, 렌즈 보정, 위치 보정, 측정"
      section="03 · 리그"
      converge={<>진단 통과와 두 보정 뒤에 열리는 <strong>측정</strong></>}
    >
      <div className={`gr-body tight ${styles.body}`}>
        <div className={styles.figWrap}>
          <img src={flow} alt="네 절차의 태블릿 화면" className={styles.fig} />
        </div>
        <div className={styles.steps}>
          {steps.map((s) => (
            <div key={s.n} className={styles.step}>
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
