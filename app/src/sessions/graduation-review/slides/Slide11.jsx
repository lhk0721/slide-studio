import Frame from '../components/Frame'
import styles from './Slide11.module.css'
import pair from './Slide13.module.css'
import fit3d from '../assets/fig29_fit3d_squat.jpg'
import tri from '../assets/fig30_triangulation.jpg'
import ihmr from '../assets/fig31_instanthmr_demo.jpg'

// 13장과 짝을 이루는 틀: 왼쪽은 gold standard, 오른쪽 둘은 그 정답에 견준 두 방식.
// 여기서는 두 방식이 다르고(차이점), 13장에서는 같다(공통점)
const methods = [
  {
    tag: 'RackTracker',
    img: tri,
    alt: '카메라 세 대에서 나온 광선이 관절마다 만나 골격이 되는 장면',
    name: '다시점 삼각측량',
    desc: '동기 촬영한 카메라 3대의 2D 관절을 광선으로 이어,\n광선이 만나는 점을 실제 공간의 3D 관절로 산출',
    accent: true,
  },
  {
    tag: 'InstantHMR',
    img: ihmr,
    alt: 'InstantHMR 시연 화면. 사진 한 장 위에 겹친 2D 관절',
    name: '단안 추정',
    desc: '카메라 한 대의 사진에서 학습 모델이 3D 관절을 추정.\n깊이와 실제 크기는 추정값',
  },
]

export default function Slide11() {
  return (
    <Frame
      title="단안 카메라 앱과의 비교검증"
      sub="gold standard(마커 모션캡처)에 견준 두 방식 · 졸업작품 검증"
      section="06 · 검증"
      converge={<>정답은 <strong>마커 모션캡처</strong>, 3D 관절 위치의 정확도 검증</>}
    >
      <div className={`gr-body tight ${styles.body}`}>
        <div className={`gr-col ${styles.truth}`}>
          <div className="gr-tag">Gold standard</div>
          <div className={styles.photo}>
            <img src={fit3d} alt="몸에 반사 마커를 붙이고 바벨 스쿼트를 하는 Fit3D 데이터셋의 피험자" />
          </div>
          <div className={styles.name}>마커 모션캡처</div>
          <p className={styles.desc}>
            Fit3D 데이터셋.<br />
            마커와 적외선 카메라로 잰 스쿼트 기록.<br />
            마커로 잰 3D 관절을<br />
            관절 위치의 정답으로 사용
          </p>
        </div>
        <div className={styles.vs} aria-hidden="true" />
        <div className={`gr-grow ${pair.pair}`}>
          <div className={pair.common}><span>차이점 · 다시점 삼각측량과 단안 추정</span></div>
          <div className={pair.cols}>
            {methods.map((m) => (
              <div key={m.tag} className={`gr-col gr-grow ${styles.method}`}>
                <div className={`gr-tag${m.accent ? ' accent' : ''}`}>{m.tag}</div>
                <div className={styles.photo}>
                  <img src={m.img} alt={m.alt} />
                </div>
                <div className={`${styles.name}${m.accent ? ` ${styles.ours}` : ''}`}>{m.name}</div>
                <p className={styles.desc}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.credit}>
        사진: Fit3D 데이터셋 · InstantHMR 시연 영상(github.com/Naturalpad-studio/InstantHMR, Apache-2.0)
      </div>
    </Frame>
  )
}
