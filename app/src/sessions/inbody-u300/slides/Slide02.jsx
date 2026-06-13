import styles from './Slide02.module.css'
import demoImg from '../assets/1..png'

export default function Slide02() {
  return (
    <div className={styles.slide}>
      <div className="s-hd">
        <div>
          <h2 className="s-hd-title">부상도 성과도, 결국 3D 관절 부하의 문제다</h2>
          <div className="s-hd-sub">보이지 않는 무게중심·관절 부하를 측정해야 풀린다</div>
        </div>
        <span className="s-hd-section">01 · 문제</span>
      </div>
      <div className="s-rule" />

      <div className="s-body">
        <div className={styles.layout}>

          {/* 좌: 부상 방지 · 운동 성과 */}
          <div className={styles.axis}>
            <div className={styles.axisTag}>A · 부상 방지 · 운동 성과</div>
            <div className={styles.axisHead}>물리학적 피드백 수단 전무</div>
            <p className={styles.axisBody}>
            무게중심이 정위치를 벗어나면, 지렛대 길이(모멘트 암)가 <br />
            늘어나 특정 관절에 토크가 집중되어 부상이 발생한다.
            </p>
            <p className={styles.axisKey}>
            일률적 · 심미적 · 경험적 자세 주입이 아닌 
            <br />운동역학 · 하중 분석 피드백 수단 필요
            </p>
          </div>

          {/* 중앙: MVP v1 실측 분석 화면 */}
          <div className={styles.figureWrap}>
            <div className={styles.figFrame}>
              <img
                className={styles.figure}
                src={demoImg}
                alt="MVP v1 백스쿼트 2D 스켈레톤·관절 각도 분석"
              />
            </div>
            <figcaption className={styles.figCaption}>
              <span className={styles.figTag}>MVP v1</span>
              <span className={styles.figDesc}>
                검증 범위: 단일카메라 2D 시계열<br />
                스켈레톤 추출 및 데이터 분석
              </span>
            </figcaption>
          </div>

          {/* 우: 개인화 */}
          <div className={styles.axis}>
            <div className={styles.axisTag}>B · 개인화</div>
            <div className={styles.axisHead}>개인마다 다른 분절 길이, 관절 정렬, 가동범위 </div>
            <p className={styles.axisBody}>
            개인 신체 비율과 가동범위에 따라 <br /> 무게중심 · 관절 정렬이 다르게 조정되어야 한다
            </p>
            <p className={styles.axisKey}>
            같은 동작이라도 개인의 분절 정렬에 맞춰야 
            <br />
            부상 위험을 낮추고 역학적 효율을 높일 수 있다.
            </p>
          </div>

        </div>
      </div>

      <div className={styles.converge}>
        육안으로는 무게중심도 관절 부하도 보이지 않는다 —
        <strong>운동역학 · 하중 분석을 위해서는 계측과 정량적 피드백이 필요하다.</strong>
      </div>
    </div>
  )
}
