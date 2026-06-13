import styles from './Slide11.module.css'
import themImg from '../assets/5.png'

const rows = [
  {
    axis: '촬영 환경',
    en: 'SETUP',
    them: '고정되지 않은 촬영 환경 — 재현성 저하',
    us: '파워랙 고정 거치 · 캘리브레이션된 다시점 \n— 재현 가능',
  },
  {
    axis: '차원',
    en: 'DIMENSION',
    them: '단시점 — 깊이 정보 소실',
    us: '다시점 삼각측량 3D — 깊이·회전 복원',
  },
  {
    axis: '평가 기준',
    en: 'STANDARD',
    them: '개발자 지정 일률적 임계값',
    us: '개인 골격·ROM 기반 맞춤 모델',
  },
  {
    axis: '분석 깊이',
    en: 'ANALYSIS',
    them: '자세 성공/실패 · 동작 이벤트 이진 분류',
    us: '전관절 시계열 역학 분석 (4D)',
    emph: true,
  },
]

export default function Slide11() {
  return (
    <div className={styles.slide}>
      <div className="s-hd">
        <div>
          <h2 className="s-hd-title">기존 솔루션 한계 ① — 통제되지 않은 단시점, 이진 판정에 그친다</h2>
          <div className="s-hd-sub">
            휴대폰 삼각대 거치 단시점 앱 — 환경 · 차원 · 기준 · 분석 깊이 모두에서 한계
          </div>
        </div>
        <span className="s-hd-section">05 · 경쟁</span>
      </div>
      <div className="s-rule" />

      <div className="s-body">
        <div className={styles.layout}>
          <figure className={styles.themImgWrap}>
            <img className={styles.themImg} src={themImg} alt="기존 솔루션" />
            <figcaption className={styles.themImgCap}>
              기존 솔루션 ① <br /> 삼각대 거치식 단시점 촬영
            </figcaption>
          </figure>
          <div className={styles.table}>
          <div className={styles.headRow}>
            <div className={styles.axisHead} />
            <div className={styles.themHead}>기존 솔루션 ① · 단시점 앱</div>
            <div className={styles.usHead}>RACK TRACKER</div>
          </div>
          {rows.map((r) => (
            <div
              key={r.axis}
              className={r.emph ? `${styles.row} ${styles.rowStrong}` : styles.row}
            >
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

      <div className={styles.converge}>
        환경 · 차원 · 기준 · 분석 깊이 — 네 층위 모두에서 다르다. <strong>이진 판정과 역학 분석의 격차.</strong>
      </div>
    </div>
  )
}
