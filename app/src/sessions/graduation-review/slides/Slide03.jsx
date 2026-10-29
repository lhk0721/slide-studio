import Frame from '../components/Frame'
import styles from './Slide03.module.css'
import panoptic from '../assets/panoptic_dome.jpg'
import monoApp from '../assets/fig03_mono_app.jpg'
import jitter from '../assets/fig04_jitter.jpg'
import depth from '../assets/fig04_depth.jpg'

const rows = [
  ['연구실 모션캡처', '전신 3D 관절', '가장 높음', '불가. 카메라 수십 대, 전용 공간'],
  ['단안 카메라 앱과 장치', '관절, 횟수, 성공 여부', '낮음(깊이 추정)', '가능. 촬영 환경 표준화 불가'],
  ['기계식 측정 기구', '정해진 궤적의 토크', '높음', '기구별 설치. 프리웨이트 불가'],
  ['리그', '전신 3D 관절, 하중 경로', 'MPJPE 3.63cm', '파워랙 부착(카메라 3대)'],
]

// left: the lab dome · right: the phone app between panels 1–2 of report fig. 4
const groups = [
  {
    tag: '연구실 모션캡처',
    photos: [[panoptic, 'Panoptic 돔(CMU)']],
  },
  {
    tag: '단안 카메라 앱과 장치의 한계 · 하중 경로 산출 불가',
    photos: [
      [jitter, '관절 떨림'],
      [monoApp, '휴대폰 한 대의 앱'],
      [depth, '인체 비율로 추정한 깊이'],
    ],
  },
]

export default function Slide03() {
  return (
    <Frame
      title="기존 솔루션의 한계"
      sub="헬스장에 못 들이는 모션캡처, 깊이가 없는 단안 앱, 프리웨이트가 아닌 기계식 기구"
      section="02 · 기존 솔루션"
      converge={<>하중 경로를 재면서 헬스장에 들어가는 것은 <strong>리그</strong>뿐</>}
    >
      <div className={`gr-body tight ${styles.body}`}>
        <div className={styles.photoRow}>
          {groups.map((g, i) => (
            <div key={g.tag} className={i === 0 ? `${styles.group} ${styles.grow}` : styles.group}>
              <div className={styles.block}>
                <div className="gr-tag">{g.tag}</div>
                <div className={styles.pair}>
                  {g.photos.map(([src, cap]) => (
                    <figure key={cap} className={styles.photo}>
                      <img src={src} alt={cap} />
                      <figcaption className="gr-cap">{cap}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <table className="gr-table">
          <thead>
            <tr>
              <th>솔루션</th>
              <th>측정 항목</th>
              <th>정확도</th>
              <th>헬스장 설치</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r[0]} className={i === rows.length - 1 ? 'hl' : undefined}>
                {r.map((c) => <td key={c}>{c}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Frame>
  )
}
