import Frame from '../components/Frame'
import styles from './Slide14.module.css'

// rack-tracker docs/etc/opencap-validation/opencap-racktracker-comparison.md 의 비교 요약에서 핵심만.
// key: 실증실험의 오차 해석에서 따져야 하는 차이(행 배경으로만 강조)
const rows = [
  { item: '3D 관절 산출', opencap: '다시점 삼각측량', ours: '다시점 삼각측량' },
  { item: '카메라', opencap: '아이폰 여러 대, 롤링 셔터', ours: '산업용 카메라 3대, 글로벌 셔터', key: true },
  { item: '카메라 동기', opencap: '촬영 뒤 계산으로 맞춤,\n시간 차 최대 약 8ms', ours: '트리거 신호 하나로 동시 노출,\n시간 차 0.2ms 미만', key: true },
  { item: '카메라 보정', opencap: '쓸 때마다 체커보드로 다시', ours: '설치할 때 한 번, 파워랙에 고정' },
  { item: '연산 환경', opencap: '영상을 클라우드 서버로 올려 계산,\n촬영 뒤 후처리', ours: '리그 안 소형 연산 장비(Jetson Orin NX) 한 대,\n폐쇄망에서 실시간 계산' },
  { item: '힘 계산', opencap: '근육 구동 시뮬레이션,\n스쿼트 하나에 약 35분', ours: '역동역학 식을 프레임마다 직접 계산,\n90초 세트 하나에 5.4초' },
  { item: '근육 단위 결과', opencap: '있음', ours: '없음' },
  { item: '지면반력판 검증', opencap: '있음(10명)', ours: '이번 실증연구에서 수행' },
]

export default function Slide14() {
  return (
    <Frame
      title="OpenCap 도구와 RackTracker의 차이"
      sub="같은 삼각측량, 다른 하드웨어와 계산 방식"
      section="07 · 실증연구"
    >
      <div className={`gr-body tight ${styles.body}`}>
        <table className={`gr-table ${styles.table}`}>
          <thead>
            <tr>
              <th>항목</th>
              <th>OpenCap 도구</th>
              <th>RackTracker</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.item} className={r.key ? styles.key : undefined}>
                <td>{r.item}</td>
                <td className={styles.opencap}>{r.opencap}</td>
                <td className={styles.ours}>{r.ours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Frame>
  )
}
