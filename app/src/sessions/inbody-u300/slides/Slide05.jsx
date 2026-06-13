import styles from './Slide05.module.css'

const cards = [
  {
    n: '①', person: '개인', en: 'END USER',
    flaw: '정보 비대칭·위험 요인이 산재한 시장 실패 비용을 \n 소비자가 온전히 전가받아 부담',
    shift: [
      '정량 분석·시각화로\n 운동 기전(왜 이 동작인가)부터 이해하는 올바른 시작',
      '내 몸의 부하·불균형을 데이터로 진단 \n→ 부상 위험 사전 예방',
    ],
    result: '운동 라이프타임 연장',
    resultSub: '이해와 성과가 지속 가능한 동기로',
  },
  {
    n: '②', person: '트레이너', en: 'PROFESSIONAL',
    flaw: '모방 학습·일률적 자세 주입 \n운동역학(핵심 차원)에서 벗어난 코칭, 자격증 경쟁·영업 전쟁',
    shift: [
      '운동역학 분석 데이터 · 스켈레톤 시각화 및  \nInBody 체성분·신체 데이터를 연계한 기전 기반 코칭',
      '2026년, 자격규제가 발의된 과도기 환경에서도 \n데이터 분석·성과로 전문성 입증',
    ],
    result: '트레이너의 전문직화',
    resultSub: '영업·외형이 아닌 데이터로 입증하는 전문성',
  },
  {
    n: '③', person: '헬스장 · 플랫폼', en: 'OPERATOR',
    flaw: '회원권 가격 왜곡(덤핑·락인) · 경쟁 포화\n인건비 절감·프리미엄 기구·시설 경쟁으로만 수렴한 악순환',
    shift: [
      '데이터 기반 플랫폼에서 쌓이는 자산 인프라의 무궁한 확장 가능성',
      '진입장벽을 낮춰 신규 소비자 유입↑, 부상 이탈↓ \n→ 업계 파이 방어·확대',
      '혁신으로 실패한 시장 구조를 새 균형으로 전환\n→  잃어버린 시장 신뢰 회복',
    ],
    result: '사업 모델의 자산화',
    resultSub: '단순 공간 제공·인력 중개를 넘어 새 사업 모델로 확장',
  },
]

const brokenLoop = ['진입장벽', '트레이너 의존', '역선택', '부상']

export default function Slide05() {
  return (
    <div className={styles.slide}>
      <div className="s-hd">
        <div>
          <h2 className="s-hd-title">실패한 시장의 세 주체를 동시에 바로 세운다</h2>
          <div className="s-hd-sub">개인 · 트레이너 · 운영자 — 가치사슬 전체</div>
        </div>
        <span className="s-hd-section">02 · 솔루션</span>
      </div>
      <div className="s-rule" />

      <div className="s-body">
        <div className={styles.layout}>

          <div className={styles.cards}>
            {cards.map((c) => (
              <div key={c.n} className={styles.card}>
                <div className={styles.cardHd}>
                  <span className={styles.num}>{c.n}</span>
                  <div className={styles.who}>
                    <div className={styles.person}>{c.person}</div>
                    <div className={styles.en}>{c.en}</div>
                  </div>
                </div>

                <div className={styles.flaw}>
                  <span className={styles.flawMark}>✕</span>
                  <span className={styles.flawText}>{c.flaw}</span>
                </div>

                <ul className={styles.shift}>
                  {c.shift.map((s) => <li key={s}>{s}</li>)}
                </ul>

                <div className={styles.result}>
                  <span className={styles.resultMain}>{c.result}</span>
                  <span className={styles.resultSub}>{c.resultSub}</span>
                </div>
              </div>
            ))}
          </div>

          {/* 03의 닫힌 자기강화 루프(↺)를 '끊어' 세 주체로 여는 대구 장치 */}
          <div className={styles.breakLoop}>
            <div className={styles.blDiagram}>
              <span className={styles.blTag}>03의 자기강화 루프</span>
              <div className={styles.blChain}>
                {brokenLoop.map((node, i) => (
                  <span key={node} className={styles.blNode}>
                    <span className={styles.blNum}>{String(i + 1).padStart(2, '0')}</span>
                    <span className={styles.blText}>{node}</span>
                    {i < brokenLoop.length - 1 && <span className={styles.blArrow}>→</span>}
                  </span>
                ))}
                <span className={styles.blReturn} aria-label="악순환 차단">↺</span>
                <span className={styles.blArrowOut}>⇒</span>
                <span className={styles.blOpen}>개인 · 트레이너 · 운영자</span>
              </div>
            </div>
            <div className={styles.blCap}>
              닫혀 있던 악순환이 열린다 <br /> <strong>정량 분석 역량이 세 주체에 동시 공급</strong>
            </div>
          </div>

        </div>
      </div>

      <div className={styles.converge}>
        하나의 데이터, <strong>산업의 구조적 결함을 제거한다.</strong>
      </div>
    </div>
  )
}
