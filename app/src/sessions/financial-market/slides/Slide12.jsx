import styles from './Slide12.module.css'

// 참고자료 — 데이터·이론 출처 정리 + 발표 전 검증 노트.
const refs = [
  { cat: '펠로톤 재무·공시', src: 'SEC EDGAR 「Form 10-K」 FY2020·FY2022 (CIK 0001639825)' },
  { cat: '시총·PSR·매출 추이', src: 'MacroTrends · stockanalysis.com (PTON)' },
  { cat: '강사 보수·감원', src: 'Bloomberg · CNN (2022.2.8)' },
  { cat: '서울 체력단련장 폐업', src: '서울 열린데이터광장 (OA-16142)' },
  { cat: '홈트 상표출원', src: '특허청 (2020.7) · KIPRIS' },
  { cat: '글로벌 피트니스 앱 시장', src: 'Grand View Research · The Business Research Company' },
  { cat: '헬스장 선불 멤버십 피해', src: '한국소비자원 · 서울경제' },
  { cat: '정보 비대칭·레몬시장 이론', src: 'Akerlof, G. A. (1970), QJE 84(3): 488–500' },
]

export default function Slide12() {
  return (
    <div className={styles.slide}>
      <div className="s-hd">
        <div>
          <h2 className="s-hd-title">참고자료</h2>
          <div className="s-hd-sub">데이터·이론 출처 및 발표 전 검증 체크리스트</div>
        </div>
        <span className="s-hd-section">부록 · REFERENCES</span>
      </div>
      <div className="s-rule" />

      <div className="s-body">
        <div className={styles.layout}>

          <div className={styles.refs}>
            {refs.map((r) => (
              <div key={r.cat} className={styles.ref}>
                <span className={styles.refCat}>{r.cat}</span>
                <span className={styles.refSrc}>{r.src}</span>
              </div>
            ))}
          </div>

          <p className={styles.note}>
            <strong>검증</strong> — 2026-06-14 기준 전 항목 1차/2차 출처 대조 완료.{'\n'}시점 의존 수치(현재 시총·유튜버 구독자)는 발표 시점에 재확인 권장.
          </p>

        </div>
      </div>
    </div>
  )
}
