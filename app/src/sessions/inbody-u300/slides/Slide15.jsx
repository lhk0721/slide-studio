import styles from './Slide15.module.css'

const cols = [
  {
    cat: '인프라',
    en: 'INFRASTRUCTURE',
    give: 'InBody — 연구개발·생산·판매·유통을 아우르는 완성형 헬스케어 인프라',
    need: '양산·하드웨어 실증 노하우 (프로토타입 → 제품화)',
  },
  {
    cat: '검증 · 네트워크',
    en: 'VALIDATION',
    give: 'InBody 인프라 활용 PoC + 의료·피트니스 유통망, 전략적 파트너십',
    need: 'STEP 0 파일럿(단일 헬스장·파워랙) \n검증 과정 컨설팅, 도입 채널 다각화',
  },
  {
    cat: '자본',
    en: 'CAPITAL',
    give: 'InBody·블루포인트 — 100억 규모 전용 펀드, PoC 우수기업 투자 검토, TIPS 연계',
    need: 'Seed 라운드 \n양산·기술 고도화·플랫폼 구축의 종잣돈',
  },
]

export default function Slide15() {
  return (
    <div className={styles.slide}>
      <div className="s-hd">
        <div>
          <h2 className="s-hd-title">InBody·블루포인트, STEP 0부터 함께여야 하는 이유</h2>
          <div className="s-hd-sub">검증 · 인프라 · 자본 — 우리가 가장 작은 단위부터 필요로 하는 것</div>
        </div>
        <span className="s-hd-section">06 · InBody 시너지</span>
      </div>
      <div className="s-rule" />

      <div className="s-body">
        <div className={styles.matrix}>
          {/* 상단 블록 공통 헤더 — 1회 */}
          <div className={styles.giveHeader}>InBody · 블루포인트가 제공</div>

          {/* 상단(제공) 행 — 카테고리 + 중립색 카드, 높이 통일 */}
          <div className={styles.giveRow}>
            {cols.map((c) => (
              <div key={c.cat} className={styles.giveCell}>
                <div className={styles.catRow}>
                  <span className={styles.cat}>{c.cat}</span>
                  <span className={styles.catEn}>{c.en}</span>
                </div>
                <div className={styles.give}>{c.give}</div>
              </div>
            ))}
          </div>

          {/* 세 카드를 가로지르는 구분선 + 가운데 라벨 1회 */}
          <div className={styles.divider}>
            <span className={styles.divChip}>↓ 우리 STEP 0의 필요 ↓</span>
          </div>

          {/* 하단(필요) 행 — accent 카드, 높이 통일 */}
          <div className={styles.needRow}>
            {cols.map((c) => (
              <div key={c.cat} className={styles.need}>{c.need}</div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.converge}>
        단순 투자가 아니라 <strong>‘PoC → 양산 → 글로벌 유통’</strong>을 한 번에 잇는 파트너
        — 그래서 <strong>STEP 0부터 InBody와 함께</strong>한다.
      </div>
    </div>
  )
}
