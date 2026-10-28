import Frame from '../components/Frame'
import styles from './Slide04.module.css'
import mono from '../assets/fig04_monocular.jpg'

const rows = [
  ['연구실 모션캡처', '전신 3D 관절', '가장 높음', '불가. 카메라 수십 대, 전용 공간'],
  ['단안 카메라 앱과 장치', '관절, 횟수, 성공 여부', '낮음(깊이 추정)', '가능. 촬영 환경 표준화 불가'],
  ['기계식 측정 기구', '정해진 궤적의 토크', '높음', '기구별 설치. 프리웨이트 불가'],
  ['리그', '전신 3D 관절, 하중 경로', 'MPJPE 3.63cm', '파워랙 부착(카메라 3대)'],
]

export default function Slide04() {
  return (
    <Frame
      title="기존 솔루션의 한계"
      sub="헬스장에 못 들이는 모션캡처, 깊이가 없는 단안 앱, 프리웨이트가 아닌 기계식 기구"
      section="02 · 기존 솔루션"
      converge={<>하중 경로를 재면서 헬스장에 들어가는 것은 <strong>리그</strong>뿐</>}
    >
      <div className={`gr-body tight ${styles.body}`}>
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

        <div className={styles.monoWrap}>
          <div className="gr-tag">단안 카메라 앱과 장치의 한계</div>
          <div className={styles.monoRow}>
            <img src={mono} alt="단안 카메라 앱의 한계 패널 넷" className={styles.mono} />
            <div className={styles.monoText}>
              사진 한 장에 깊이는 없음. 3D 자세는 인체 비율로 채운 추정값이라
              무게중심이 관절에서 몇 cm 벗어났는지 알 수 없음. 결과는 횟수 세기와 각도 판정까지,{' '}
              <em>하중 경로 산출 불가</em>
            </div>
          </div>
        </div>
      </div>
    </Frame>
  )
}
