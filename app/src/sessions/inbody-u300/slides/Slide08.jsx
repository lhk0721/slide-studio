import styles from './Slide08.module.css'

const track = [
  { k: 'STEP 0–1', v: '검증' },
  { k: 'STEP 2', v: '플랫폼' },
  { k: 'STEP 3', v: '공간 확장', cur: true },
]

const axes = [
  {
    n: '축 1',
    cat: '공간 확장',
    from: '파워랙 1대',
    to: '헬스장 공간 전체',
    basis: [
      '천장 마운팅레일 다중 카메라 → markerless 모션캡처',
      '다중 객체 추적 → 동시 운동 회원 개별 식별 · 분석',
    ],
    // 결과: 앞부분(맥락) + hi(성과 키워드) — 강조 키워드를 행 끝에 통일 배치
    result: [
      { pre: '머신 · 유산소 · 프리스페이스까지', hi: '단일 인프라로 커버' },
      { pre: '공간 점유 · 동선 · 혼잡도 등', hi: '운영 데이터 확보' },
    ],
  },
  {
    n: '축 2',
    cat: '종목 확장',
    from: '웨이트',
    to: '전 종목',
    basis: [
      '동일 4D 스켈레톤 파이프라인 — 종목별 모델만 추가 학습',
      '신규 종목 = 데이터 · 모델 교체, 하드웨어 변경 없음 → 낮은 한계비용',
    ],
    result: [
      { pre: '골프 스윙 · 역도 · 필라테스 · 요가 · 야구 · 러닝 등', hi: '종목별 분석 SaaS' },
      { pre: '', hi: '전신 동작을 동반한 모든 종목으로 확장' },
    ],
    upmarket: '엘리트 체육 트레이닝 · 시니어 헬스케어 · 재활 / 교정 (SaMD 방향)',
  },
]

export default function Slide08() {
  return (
    <div className={styles.slide}>
      <div className="s-hd">
        <div>
          <h2 className="s-hd-title">검증된 엔진을, 공간 자체와 다양한 종목으로 넓힌다</h2>
          <div className="s-hd-sub">STEP 3 비전 — Series A 라운드로 스케일업, 검증된 엔진을 공간 · 종목 · 시장으로 확장</div>
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

          {/* 핵심 전제 — 두 축을 떠받치는 공통 토대 (Slide06 accent-soft 센터 배너) */}
          <div className={styles.premise}>
            <div className={styles.premiseLead}>핵심 전제 · 하나의 엔진, 두 방향 확장</div>
            <div className={styles.premiseMain}>
              <strong>공간이 넓어져도</strong>, <strong>종목이 바뀌어도</strong> 분석 파이프라인은 동일
            </div>
          </div>

          {/* 공통 전제 → 두 축으로 분기 (Slide06 '공통 소스 → 분기' 시각 어휘 재사용) */}
          <div className={styles.branch}>
            <span className={styles.branchArm}>↓</span>
            <span className={styles.branchArm}>↓</span>
          </div>

          {/* 축 1·2 — 주력 비전 (공간·종목) */}
          <div className={styles.axes}>
            {axes.map((a) => (
              <div key={a.n} className={styles.axis}>
                <div className={styles.axisCat}>
                  <span className={styles.axisN}>{a.n}</span> · {a.cat}
                </div>
                <div className={styles.axisHead}>
                  <span>{a.from}</span>
                  <span className={styles.axisArrow}>→</span>
                  <span className={styles.axisHeadHi}>{a.to}</span>
                </div>
                <div className={styles.axisRow}>
                  <span className={`${styles.axisRowLbl} ${styles.axisRowLblBasis}`}>근거</span>
                  <ul className={styles.axisList}>
                    {a.basis.map((b) => (
                      <li key={b} className={styles.basisItem}>{b}</li>
                    ))}
                  </ul>
                </div>
                <div className={styles.axisRow}>
                  <span className={`${styles.axisRowLbl} ${styles.axisRowLblResult}`}>결과</span>
                  <ul className={styles.axisList}>
                    {a.result.map((r, i) => (
                      <li key={i} className={styles.resultItem}>
                        {r.pre && `${r.pre} → `}<strong>{r.hi}</strong>
                      </li>
                    ))}
                  </ul>
                </div>
                {a.upmarket && (
                  <div className={styles.upmarket}>
                    <span className={styles.upmarketLbl}>상위 시장</span>
                    <span>{a.upmarket}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>

      <div className={styles.lockin}>
        검증된 점유율 위에서, <strong>공간 · 종목 · 시장</strong>으로 확장축을 연다
      </div>
    </div>
  )
}
