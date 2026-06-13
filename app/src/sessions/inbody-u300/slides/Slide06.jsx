import styles from './Slide06.module.css'

const track = [
  { k: 'STEP 0–1', v: '검증', cur: true },
  { k: 'STEP 2', v: '플랫폼' },
  { k: 'STEP 3', v: '공간 확장' },
]

const steps = [
  {
    n: 'STEP 0',
    title: '최소 검증 단위 · PoC',
    rows: [
      { k: '구성', v: '파워랙 마운트 액션캠 + 스트리밍용 SFF + AWS EC2' },
      { k: '범위', v: '단일 헬스장 1곳 · 파워랙 1대 파일럿' },
      { k: '진입점', v: '단일 카메라 앱의 한계를 겪으며 PT에 활용 중인 헬스장 (대표 네트워크 활용)' },
      { k: '측정 지표', v: '월별 GMV · 사용자 만족도 · PT 도입 의향', hi: true },
    ],
  },
  {
    n: 'STEP 1',
    title: '도입 검증',
    rows: [
      { k: '확보', v: '헬스장 의사결정자의 도입 비용 · 구매 사이클 · 레퍼런스 케이스' },
    ],
  },
]

const tiers = [
  {
    label: '진입', sub: 'ONE-TIME', hi: false,
    name: 'B2B 라이선스', val: '100~200만 원',
    desc: '기존 파워랙에 SFF · RGB 센서 배치 — 신규 랙 설치 불필요',
  },
  {
    label: '핵심', sub: 'RECURRING · MRR', hi: true,
    name: '트레이너 SaaS 구독', val: '월 50~150만 원',
    desc: '예측 가능한 구독 매출의 본진',
  },
]

export default function Slide06() {
  return (
    <div className={styles.slide}>
      <div className="s-hd">
        <div>
          <h2 className="s-hd-title">작게 검증하고, 데이터로 락인한다</h2>
          <div className="s-hd-sub">가장 작은 단위로 시작 → 정량 지표로 측정 → 전환 비용으로 락인</div>
        </div>
        <span className="s-hd-section">03 · 비즈니스 모델</span>
      </div>
      <div className="s-rule" />

      <div className="s-body">
        <div className={styles.layout}>

          {/* STEP 연속성 트랙 */}
          <div className={styles.track}>
            {track.map((t, i) => (
              <div key={t.k} className={styles.trackItem}>
                <span className={`${styles.trackPill} ${t.cur ? styles.trackPillCur : ''}`}>
                  <span className={styles.trackK}>{t.k}</span>
                  <span className={styles.trackV}>{t.v}</span>
                </span>
                {i < track.length - 1 && <span className={styles.trackSep}>→</span>}
              </div>
            ))}
          </div>

          {/* 전략 축 배너 */}
          <div className={styles.axis}>
            <div className={styles.axisMain}>
              헬스장 하드웨어 <strong>B2B 라이선스</strong>
              <span className={styles.axisX}>×</span>
              트레이너 <strong>SaaS 구독</strong>
            </div>
            <div className={styles.axisSub}>두 축으로 시작해 시장 점유율을 먼저 확보한다</div>
          </div>

          <div className={styles.cols}>

            {/* 좌: 검증 흐름 */}
            <div className={styles.col}>
              <div className={styles.colCat}>검증 단계</div>
              <div className={styles.steps}>
                {steps.map((s, i) => (
                  <div key={s.n} className={styles.stepWrap}>
                    <div className={styles.step}>
                      <div className={styles.stepHead}>
                        <span className={styles.stepNum}>{s.n}</span>
                        <span className={styles.stepTitle}>{s.title}</span>
                      </div>
                      <div className={styles.stepRows}>
                        {s.rows.map((r) => (
                          <div key={r.k} className={`${styles.stepRow} ${r.hi ? styles.stepRowHi : ''}`}>
                            <span className={styles.stepKey}>{r.k}</span>
                            <span className={styles.stepVal}>{r.v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {i < steps.length - 1 && <span className={styles.stepArrow}>↓</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* 우: 초기 수익 구조 */}
            <div className={styles.col}>
              <div className={styles.colHead}>
                <div className={styles.colCat}>초기 수익 구조</div>
                <div className={styles.note}>※ 단가는 PoC 이전 ‘목표 가설’ 값</div>
              </div>
              <div className={styles.tiers}>
                {tiers.map((t) => (
                  <div key={t.label} className={`${styles.tier} ${t.hi ? styles.tierHi : ''}`}>
                    <div className={styles.tierHead}>
                      <span className={styles.tierLabel}>{t.label}</span>
                      <span className={styles.tierSub}>{t.sub}</span>
                    </div>
                    <div className={styles.tierName}>{t.name}</div>
                    <div className={styles.tierVal}>
                      <span className={styles.tierGoal}>목표</span>{t.val}
                    </div>
                    <div className={styles.tierDesc}>{t.desc}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className={styles.lockin}>
        데이터가 쌓일수록 전환 비용 <strong>↑↑</strong> — 단순 이관으로 대체 불가
      </div>
    </div>
  )
}
