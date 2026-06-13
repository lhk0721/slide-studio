import styles from './Slide07.module.css'

const track = [
  { k: 'STEP 0–1', v: '검증' },
  { k: 'STEP 2', v: '플랫폼', cur: true },
  { k: 'STEP 3', v: '공간 확장' },
]

const layers = [
  {
    name: 'AI · 자동 분석',
    def: '시계열 스켈레톤 데이터 + 정량 분석 지표 기반 초개인화 피드백',
    items: [
      '위험 요인 분석 · 성과 개선 피드백',
      '논문 · 이론 근거 맞춤 프로그램: \n유연성 / 보디빌딩 근비대 / 파워리프팅 / 불균형 보상 · 교정',
      '목적별 초개인화 처방',
    ],
    hi: true,
  },
  {
    name: '트레이너 · 전문 코칭',
    def: 'PT에 특화된 차별화 SaaS — 전문 코칭 온톨로지 제공',
    items: [
      '정량 분석 지표 · 3D 오버레이 시각화 · 추적 리포트',
      '회원 성과 관리 · 신체 분석 데이터 통합',
      '의학 진료 · 스캔 연계',
    ],
    hi: true,
  },
  {
    name: '커뮤니티 · 소셜',
    def: '4D 스켈레톤 · 키네틱 데이터 기반 대체 불가 피트니스 커뮤니티',
    items: [
      '세션 데이터 기록 · 트래킹 서비스',
      '챌린지 · 파워리프팅 컴페티션 · 토론',
      '인플루언서 · 피트니스 SNS · 마켓플레이스',
    ],
    hi: false,
  },
]

export default function Slide07() {
  return (
    <div className={styles.slide}>
      <div className="s-hd">
        <div>
          <h2 className="s-hd-title">점유율 위에 데이터 플랫폼을 얹는다</h2>
          <div className="s-hd-sub">검증된 점유율 → 데이터 플랫폼 → 공간 · 종목 확장</div>
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

          {/* STEP 2 헤드라인 배너 */}
          <div className={styles.axis}>
            <div className={styles.axisLead}>
              <strong>Seed 투자 유치</strong>로 양산 · 기술 고도화 · 플랫폼 구축
            </div>
            <div className={styles.axisMain}>
              그 위에서 헬스장 장비로 모은 <strong>세션 데이터</strong>를 플랫폼 가치로 전환
            </div>
          </div>

          {/* 공통 소스 → 3 레이어로 분기 */}
          <div className={styles.source}>
            <span className={styles.sourceLbl}>헬스장 세션 데이터</span>
            <span className={styles.sourceData}>시계열 4D 스켈레톤 · ROM · 키네틱 분석 · 정량 지표</span>
          </div>
          <div className={styles.branch}>
            {layers.map((l) => <span key={l.name} className={styles.branchArm}>↓</span>)}
          </div>

          {/* 3 레이어 카드 */}
          <div className={styles.cards}>
            {layers.map((l) => (
              <div key={l.name} className={`${styles.card} ${l.hi ? styles.cardHi : ''}`}>
                <div className={styles.cardName}>{l.name}</div>
                <div className={styles.cardDef}>{l.def}</div>
                <ul className={styles.cardList}>
                  {l.items.map((it) => <li key={it}>{it}</li>)}
                </ul>
              </div>
            ))}
          </div>

          {/* 파편화 근거 — 카드 바로 아래 */}
          <div className={styles.frag}>
            <span className={styles.fragStat}>
              Instagram #fitness 약 3억 880만 게시물 <em>(iqhashtags, 2026.3)</em> · Reddit r/Fitness 1,000만+ <em>(makeuseof)</em> · DAU 1.16억 <em>(backlinko, 2025 Q3)</em><br />
              dcinside 헬갤 정량 측정 불가 · 분산 구조 <em>(나무위키)</em> · 글로벌 피트니스 시장 657억 달러 <em>(dashsocial, 2025)</em>
            </span>
            <span className={styles.fragConc}>
              공통적으로 극도로 파편화 — ‘분산된 개인’이 아닌 ‘체육관 거점’을 타깃하는 B2B 논리를 뒷받침
            </span>
          </div>

        </div>
      </div>

      <div className={styles.lockin}>
        자동화 · 전문 코칭으로 <strong>PT 시장 혁신</strong> · 분산된 피트니스 커뮤니티를 <strong>흡수 · 통합</strong>
      </div>
    </div>
  )
}
