import { Fragment } from 'react'
import styles from './Slide10.module.css'
import DivergenceFlow from '../components/DivergenceFlow'

// 종합(클라이맥스) — 같은 충격이 자본 조달 구조 차이를 거쳐 서로 다른 시장실패로.
// 패턴: 분기 흐름도(DivergenceFlow, 풀) + 대칭 2단 대조(US/KR) + 출처 캡션(.s-source).
// 행 라벨(구조·시장실패·운명)은 두 컬럼을 가로지르는 중앙 축으로 두어 좌우 행을 정렬한다.
const rows = [
  { k: '구조', us: '자본시장 주도 — 펠로톤·ClassPass에 집중', kr: '소상공인·콘텐츠 주도 — 개인·중소·유튜버로 분산' },
  { k: '시장실패', us: '밸류에이션 거품 → 붕괴 (시총 −95%)', kr: '과잉경쟁·박리다매 → 폐업 (서울 141→259)' },
]
const fate = { k: '트레이너의 운명', us: '트레이너 = 자산 (감원에서도 보호)', kr: '트레이너 = 비용 (저임금·레몬화)' }

export default function Slide10() {
  return (
    <div className={styles.slide}>
      <div className="s-hd">
        <div>
          <h2 className="s-hd-title">종합 — 구조가 운명을 가른다</h2>
          <div className="s-hd-sub">같은 충격·같은 산업, 그러나 자본 조달 구조가 결말을 갈랐다</div>
        </div>
        <span className="s-hd-section">종합 · SYNTHESIS</span>
      </div>
      <div className="s-rule" />

      <div className="s-body">
        <div className={styles.layout}>
          <DivergenceFlow
            shockKicker="공통 충격"
            shockText="코로나19 — 전 세계 피트니스 수요 급증"
            heads={['미국', '한국']}
          />

          {/* 대칭 2단 비교 — DivergenceFlow 헤드와 같은 1fr 1fr 그리드라 컬럼 정렬 */}
          <div className={styles.grid}>
            {rows.map((r) => (
              <Fragment key={r.k}>
                <div className={styles.kicker}>{r.k}</div>
                <p className={styles.cell}>{r.us}</p>
                <p className={styles.cell}>{r.kr}</p>
              </Fragment>
            ))}

            <div className={styles.kicker}>{fate.k}</div>
            <span className={styles.fate}>{fate.us}</span>
            <span className={styles.fate}>{fate.kr}</span>
          </div>
        </div>
      </div>

      <div className={styles.verdict}>
        같은 충격, 같은 산업.{'\n'}그러나 <strong>자본 조달 구조가 실패의 형태와 인적자본의 운명을 갈랐다.</strong>
      </div>

      <div className="s-source">
        앞 슬라이드(4~9) 근거 압축 — 미국: MacroTrends·SEC 10-K·Bloomberg/CNN(감원·강사 보호) / 한국: 서울 열린데이터·특허청·한국소비자원
      </div>
    </div>
  )
}
