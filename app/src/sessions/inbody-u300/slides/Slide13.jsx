import { Fragment } from 'react'
import styles from './Slide13.module.css'

// 각 행 = '업계의 이 문제를, InBody는 이렇게 풀었다' (좌→우 1:1 대응)
const rows = [
  {
    problem: '측정·기준 없이 경험과 영업에 의존하는 PT 업계',
    answer: '체성분 분석으로 세계 최고의 기계 — ‘새로운 측정 기준’을 글로벌 표준으로',
  },
  {
    problem: '깊이 대신 판매로 수렴, 만족\n고가의 대량 PT 세션 일회성 판매에 치중,\n 저가 회원권·기본급 없는 인센티브제로 인건비 절감\n',
    answer: '업계 최고 수준의 이익률 — 깊이가 곧 수익이 됨을 증명',
  },
  {
    problem: '안전·품질은 등한시 — 부상 위험이 전적으로 소비자에게 전가',
    answer: '품질 만족도에 대한 타협 없는 집착',
  },
  {
    problem: '외형·언변에 치중, 본질(개인 신체 해석)을 외면',
    answer: '“외면보다 내면” — 보이는 것이 아닌, 측정되는 본질에 집중',
  },
]

export default function Slide13() {
  return (
    <div className={styles.slide}>
      <div className="s-hd">
        <div>
          <h2 className="s-hd-title">우리가 닮고자 하는 회사 — InBody</h2>
          <div className="s-hd-sub">같은 문제를 보았고, 같은 방식으로 풀어왔다</div>
        </div>
        <span className="s-hd-section">06 · InBody 시너지</span>
      </div>
      <div className="s-rule" />

      <div className="s-body">
        <div className={styles.resonance}>

          {/* 좌(문제) ↔ 우(InBody의 해법) 1:1 행 대응 매트릭스 */}
          <div className={styles.matrix}>
            <div className={`${styles.head} ${styles.headLeft}`}>우리가 마주한 현실</div>
            <div className={styles.headMid}>InBody는 이미 풀었다</div>
            <div className={`${styles.head} ${styles.headRight}`}>InBody가 증명한 길</div>

            {rows.map((r, i) => (
              <Fragment key={i}>
                <div className={`${styles.cell} ${styles.problem}`}>{r.problem}</div>
                <div className={styles.conn} aria-hidden="true">→</div>
                <div className={`${styles.cell} ${styles.answer}`}>{r.answer}</div>
              </Fragment>
            ))}
          </div>

          {/* 깔때기 — 네 행이 하나의 기준으로 수렴 */}
          <div className={styles.funnel} aria-hidden="true">
            <span className={styles.chev}>▾</span>
          </div>
          <div className={styles.shared}>
            두 길이 가리키는 하나의 기준 —{' '}
            <strong>개인 신체 구조를 반영한 ‘물리학적 해석과 데이터’</strong>
          </div>
          <div className={styles.note}>
            ※ 창업 계기 — 중량 스쿼트 부상 경험: “중요한 것은 관절 정렬로 모멘트암 관리, 물리학적 해석”
          </div>

        </div>
      </div>

      <div className={styles.converge}>
        InBody가 ‘체성분’에 새 기준을 세웠듯, <strong>우리는 ‘움직임’에 새 기준</strong>을 세운다
        — 외면(영업)이 아닌 <strong>내면(데이터)</strong>으로 경쟁하는 시장으로.
      </div>
    </div>
  )
}
