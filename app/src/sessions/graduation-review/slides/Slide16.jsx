import Frame from '../components/Frame'
import styles from './Slide16.module.css'

const rows = [
  ['깊이', '인체 비율로 추정', '삼각측량으로 측정'],
  ['촬영 환경', '휴대폰 자리마다 다름', '파워랙 고정 카메라 3대, 글로벌 셔터'],
  ['가려짐', '한 대라 못 채움', '남은 두 대로 산출'],
  ['재는 것', '횟수, 각도', '하중 경로'],
]

export default function Slide16() {
  return (
    <Frame
      title="단안 앱과의 차이"
      sub="깊이, 촬영 환경, 재는 것의 차이"
      section="예비 5 · 질의응답"
      converge={<>단안 앱은 <strong>횟수와 각도</strong>, 리그는 <strong>하중 경로</strong></>}
    >
      <div className={`gr-body tight ${styles.body}`}>
        <span className="gr-reserve-tag">Q&amp;A 5</span>
        <table className={`gr-table ${styles.table}`}>
          <thead>
            <tr>
              <th>항목</th>
              <th>단안 카메라 앱과 장치</th>
              <th className={styles.rig}>리그</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]}>
                <td>{r[0]}</td>
                <td>{r[1]}</td>
                <td className={styles.rig}>{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Frame>
  )
}
