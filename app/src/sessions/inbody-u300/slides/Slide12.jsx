import styles from './Slide12.module.css'
import themImg from '../assets/12.png'

const rows = [
  {
    axis: '측정 원천',
    en: 'SOURCE',
    them: '기구 내장 센서 — 풀리·베어링·등속성 저항',
    us: '카메라 기반 3D 스켈레톤 — 몸 자체를 측정',
  },
  {
    axis: '측정 대상',
    en: 'TARGET',
    them: '기구에 가해진 힘·토크 (최종 출력값)',
    us: '전관절의 3D 궤적·역학 (시계열 4D)',
  },
  {
    axis: '적용 범위',
    en: 'SCOPE',
    them: '해당 머신 위 운동에 한정',
    us: '기존 파워랙·프리웨이트 전반, 종목 확장 가능',
  },
]

export default function Slide12() {
  return (
    <div className={styles.slide}>
      <div className="s-hd">
        <div>
          <h2 className="s-hd-title">기존 솔루션 한계 ② — ‘토크’는 재지만 ‘움직임’은 못 본다</h2>
          <div className="s-hd-sub">
            로보틱스 머신(론픽 등) — 정량 분석 수요를 입증했으나, 측정 대상이 다르다
          </div>
        </div>
        <span className="s-hd-section">05 · 경쟁</span>
      </div>
      <div className="s-rule" />

      <div className="s-body">
        <div className={styles.layout}>
          {/* 좌: 론픽 머신 이미지 */}
          <figure className={styles.themImgWrap}>
            <img className={styles.themImg} src={themImg} alt="론픽 스마트풀리 파워랙 머신" />
            <figcaption className={styles.themImgCap}>
              로보틱스 머신 <br /> 기구 내장 센서로 힘·<span className={styles.torque}>토크 ‘측정’</span>
            </figcaption>
          </figure>

          {/* 우: 인정 → 대비 표 */}
          <div className={styles.right}>
            {/* 인정 먼저 — 시장 검증 */}
            <div className={styles.credit}>
              <div className={styles.creditLead}>
                로보틱스 머신은 <strong>정량 분석 수요를 시장에서 입증</strong>했다 — 의료·스포츠·시니어 시설 납품, 시리즈A 유치
              </div>
              <div className={styles.creditEvidence}>
                부산대병원 · 삼성라이온즈 · KB여자농구 납품 &nbsp;/&nbsp; 강남구 등 지자체 시니어 AI 헬스시설 &nbsp;/&nbsp; 41억 시리즈A
              </div>
            </div>

            <div className={styles.table}>
              <div className={styles.headRow}>
                <div className={styles.axisHead} />
                <div className={styles.themHead}>기존 솔루션 ② · 론픽</div>
                <div className={styles.usHead}>RACK TRACKER</div>
              </div>
              {rows.map((r) => (
                <div key={r.axis} className={styles.row}>
                  <div className={styles.axisCell}>
                    <span className={styles.axisName}>{r.axis}</span>
                    <span className={styles.axisEn}>{r.en}</span>
                  </div>
                  <div className={styles.themCell}>
                    <span className={styles.themMark}>✕</span>{r.them}
                  </div>
                  <div className={styles.usCell}>
                    <span className={styles.usMark}>→</span>{r.us}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.converge}>
        론픽은 <strong>‘기구를 통과한 힘’</strong>을 재고, RACK TRACKER는 <strong>‘몸이 만든 움직임’</strong>을 잰다 — 측정 대상 자체가 다르다.
      </div>
    </div>
  )
}
