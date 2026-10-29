import Frame from '../components/Frame'
import styles from './Slide05.module.css'
import rigPhoto from '../assets/fig05_rig_photo.jpg'
import partCamera from '../assets/fig06_part_camera.jpg'
import partTrigger from '../assets/fig06_part_trigger.jpg'
import partJetson from '../assets/fig06_part_jetson.jpg'
import partCables from '../assets/fig06_part_cables.jpg'

// report fig. 6, one photo per part, captions as in the report
const parts = [
  [partCamera, '카메라와 하우징'],
  [partTrigger, '트리거 보드'],
  [partJetson, '연산 장비\n(Jetson Orin NX)'],
  [partCables, '노출 신호 선과\nUSB 선'],
]

const items = [
  { k: '카메라 3대', v: '글로벌 셔터, 1920×1200, 초당 30장. 파워랙 기둥에 세로 장착' },
  { k: '트리거 보드', v: '펄스 하나에 같은 순간의 세 사진. 노출 시각 차 0.12ms' },
  { k: '연산 장비', v: 'Jetson Orin NX 16GB 한 대. 관절 추론, 삼각측량, 하중 계산을 리그 안에서 완결' },
  { k: '태블릿', v: 'USB 선 하나의 폐쇄망. 사진과 3D 관절의 외부 유출 없음' },
]

export default function Slide05() {
  return (
    <Frame
      title="리그 하드웨어"
      sub="파워랙에 붙이는 카메라 3대, 결과는 태블릿"
      section="04 · 리그"
      converge={<>펄스 하나에 <strong>같은 순간의 세 사진</strong>. 계산은 전부 리그 안에서</>}
    >
      <div className="gr-body tight">
        <div className={styles.figs}>
          <div className={`gr-fig ${styles.photo}`}>
            <img src={rigPhoto} alt="파워랙 모형에 설치한 리그" />
          </div>
          <div className={styles.parts}>
            {parts.map(([src, cap]) => (
              <figure key={cap} className={styles.part}>
                <img src={src} alt={cap} />
                <figcaption>{cap}</figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className={`gr-col ${styles.right}`}>
          <dl className={styles.list}>
            {items.map((it) => (
              <div key={it.k} className={styles.item}>
                <dt>{it.k}</dt>
                <dd>{it.v}</dd>
              </div>
            ))}
          </dl>
          <div className={styles.shutter}>
            <video
              className={styles.shutterVideo}
              src="/graduation-review/anim_shutter_prop.mp4"
              autoPlay muted loop playsInline
            />
            <div className={styles.shutterCap}>
              왼쪽 롤링 셔터는 휘어 찍힌 날개, 오른쪽 <strong>글로벌 셔터</strong>는 곧은 날개
            </div>
          </div>
        </div>
      </div>
    </Frame>
  )
}
