import styles from './Slide14.module.css'
import meshImg from '../assets/13.png'

const steps = [
  'InBody가 개인의 체성분·부위별 근육량·골격 분포를 측정',
  '이 데이터를 SMPL 기반 인체 메쉬의 형상 파라미터(shape prior)·골격 분포 제약으로 주입',
  '개인화된 메쉬가 다시점 3D 스켈레톤 추출의 사전 제약 → 추정 정밀도·재현성 향상',
]

const expand = [
  '근육 분포 ↔ 실제 부하 분산의 인과 분석',
  '체성분 변화 추적 + 움직임 개선의 연결된 코칭',
  '두 데이터가 쌓일수록 개인 모델 정밀도·예측력 향상',
]

export default function Slide14() {
  return (
    <div className={styles.slide}>
      <div className="s-hd">
        <div>
          <h2 className="s-hd-title">InBody는 ‘몸의 구성’을, 우리는 ‘몸의 움직임’을 잰다</h2>
          <div className="s-hd-sub">
            체성분이 스켈레톤 추출의 ‘제약 조건’이 될 때, 정밀도가 한 차원 올라간다
          </div>
        </div>
        <span className="s-hd-section">06 · InBody 시너지</span>
      </div>
      <div className="s-rule" />

      <div className="s-body">
        <div className={styles.layout}>
          {/* 좌: SMPL 메쉬 + 스켈레톤 키포인트 */}
          <figure className={styles.figWrap}>
            <img
              src={meshImg}
              alt="SMPL 인체 메쉬에 부위별 체성분(색)과 스켈레톤 관절 키포인트(번호)를 매핑한 도식"
              className={styles.figImg}
            />
            <figcaption className={styles.figCap}>
              SMPL 인체 메쉬 × 체성분(부위별 색) × 스켈레톤 관절 키포인트 · 출처: Loper et al., SIGGRAPH Asia 2015.
            </figcaption>
          </figure>

          {/* 우: 작동 원리 */}
          <div className={styles.right}>
            <span className={styles.roadmap}>ROADMAP · 라이선스 확보 후 도입</span>

            <div className={styles.lead}>
              InBody 체성분 데이터를 <strong>‘가중치’</strong>로 활용해, 스켈레톤 추출 이전 단계의
              인체 메쉬 모델링을 <strong>개인화</strong>한다.
            </div>

            <ol className={styles.steps}>
              {steps.map((s, i) => (
                <li key={s} className={styles.step}>
                  <span className={styles.stepNum}>{i + 1}</span>
                  <span className={styles.stepText}>{s}</span>
                </li>
              ))}
            </ol>

            <div className={styles.summary}>
              “평균 신체 모델이 아닌, <strong>개인 체성분으로 구속된 메쉬</strong> — 추론의 출발점부터 개인화”
            </div>

            <div className={styles.expandWrap}>
              <div className={styles.expandCat}>확장 가능성</div>
              <ul className={styles.expandList}>
                {expand.map((e) => (
                  <li key={e}>{e}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.converge}>
        체성분은 스켈레톤 추출의 <strong>‘제약’</strong>이 되고, 움직임은 체성분에 <strong>‘맥락’</strong>을 준다
        — 단방향이 아닌 상호 강화.
      </div>
    </div>
  )
}
