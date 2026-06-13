import styles from './Slide03.module.css'

const loop = [
  '소비자 진입 장벽',
  '트레이너 의존',
  '역선택 · 저품질 매칭',
  '부상 · "운동은 위험"',
]

export default function Slide03() {
  return (
    <div className={styles.slide}>
      <div className="s-hd">
        <div>
          <h2 className="s-hd-title">정량 분석의 부재 — 피트니스 산업의 구조적 시장 실패</h2>
          <div className="s-hd-sub">소비자는 스스로 분석 · 학습할 수 없어 트레이너에 의존하지만, 트레이너도 분석하지 못한다 — 악순환</div>
        </div>
        <span className="s-hd-section">01 · 문제</span>
      </div>
      <div className="s-rule" />

      <div className="s-body">
        <div className={styles.layout}>

          {/* 양측 결손 */}
          <div className={styles.sides}>
            <div className={styles.side}>
              <div className={styles.sideTag}>수요측 · 소비자</div>
              <div className={styles.sideHead}>자가 학습 · 교정 수단의 부재</div>
              <p className={styles.sideBody}>
                정보는 과잉, 기준은 부재. 각 결론이 상충하는 온라인정보와 논문 속에서<br />
                자신에게 맞는 프로토콜을 학습하지 못하고, 위험요인조차 포착하기 어렵다. <br />
                헬스장을 서성이거나, 부상과 성과 부진 끝에 3개월 내 이탈.
              </p>
              <div className={styles.stat}>
                <span className={styles.statVal}>63%</span>
                <span className={styles.statLbl}>신규 회원 3개월 내 이탈</span>
              </div>
            </div>

            <div className={styles.side}>
              <div className={styles.sideTag}>공급측 · 트레이너 · 헬스장(인력 중개자)</div>
              <div className={styles.sideHead}>시장이 전문성을 보상하지 않는다</div>
              <p className={styles.sideBody}>
                진입장벽도 자격 규제도 전무한 가운데, 정량적 역학 분석에 기반한 지도 수단조차 없다.<br /> 지도는 운동 강제와 횟수 세기, 경험적 지식에 대한 모방 전수에 그치며,<br /> 
                영업력이 실력을 대신하는 유일한 신호가 되었다.  <br />무급 인센티브제 프리랜서 채용이 표준이 되어, 언제든 대체 가능한 소모품으로 전락했다.
                
              </p>
              <div className={styles.stat}>
                <span className={styles.statVal}>80%</span>
                <span className={styles.statLbl}>트레이너 연간 이직률</span>
              </div>
            </div>
          </div>

          {/* 자기강화 루프 */}
          <div className={styles.loopWrap}>
            <div className={styles.loopCap}>자기강화 루프</div>
            <div className={styles.loopRow}>
              {loop.map((node, i) => (
                <div key={node} className={styles.loopNode}>
                  <span className={styles.loopNum}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={styles.loopText}>{node}</span>
                  {i < loop.length - 1 && <span className={styles.loopArrow}>→</span>}
                </div>
              ))}
            </div>
            <div className={styles.loopReturn}>
              <span className={styles.loopReturnLbl}>↺ 다시 진입 장벽으로 — 시장이 스스로 회복하지 못한다</span>
            </div>

            <div className={styles.sources}>
              <span>63% · Sperandei et al., <em>J. Sci. Med. Sport</em> 19(11), 2016 (헬스장 회원 5,240명 실측 · 12개월 이상 잔존 4% 미만)</span>
              <span>80% · IDEA Health &amp; Fitness / American Spa, 2020 · Club Automation, 2024 (평균 재직 약 12개월)</span>
            </div>
          </div>

        </div>
      </div>

      <div className={styles.converge}>
        공통 뿌리 = <strong>양측 모두에게 없는 정량 분석 역량
        </strong>
      </div>
    </div>
  )
}
