import Frame from '../components/Frame'
import styles from './Slide03.module.css'
import panoptic from '../assets/panoptic_dome.jpg'

// one row per comparison point; columns are the lab dome and the phone app at the right
const rows = [
  ['측정 항목', '전신 3D 관절', '화면상 각도, 횟수, 성공/실패 이진 판정'],
  ['정확도', '가장 높음', '낮음(인체 비율로 깊이 추정)'],
  ['헬스장 설치', '불가. 카메라 수십 대, 전용 공간', '가능. 촬영 환경 표준화 불가'],
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
        <div className={styles.left}>
          <figure className={styles.photo}>
            <img src={panoptic} alt="Panoptic 돔(CMU)" />
            <figcaption className="gr-cap">Panoptic 돔(CMU)</figcaption>
          </figure>

          <table className="gr-table">
            <thead>
              <tr>
                <th>항목</th>
                <th>연구실 모션캡처</th>
                <th>단안 카메라 앱과 장치</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r[0]}>
                  {r.map((c) => <td key={c}>{c}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* the phone app's joints on wrong depths: right from the phone, lying back from the side */}
        <video
          className={styles.mono}
          src="/graduation-review/anim_mono_depth.mp4"
          autoPlay muted loop playsInline
        />
      </div>
    </Frame>
  )
}
