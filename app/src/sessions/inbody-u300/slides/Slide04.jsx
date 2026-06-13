import styles from './Slide04.module.css'
import demoImg from '../assets/7.png'

const tech = [
  {
    badge: '기술 ① · 측정',
    title: '전관절 3D 운동역학 분석',
    en: 'WHOLE-JOINT 3D KINETICS',
    desc: '파워랙에 부착된 다각도 RGB 카메라로 마커 바디수트 없이 스켈레톤을 실시간 추출하여 \n 관절 간 부하 전이와 동작 구간별 토크 프로파일(모멘트암 변화)을 실시간으로 추적,\n보이지 않던 관절 모멘트의 흐름을 데이터로 만든다.',
    maps: '부상 방지 — 관절 모멘트 쏠림 측정',
  },
  {
    badge: '기술 ② · 분석',
    title: '초개인화 평가 모델',
    en: 'HYPER-PERSONALIZED MODEL',
    desc: '개인의 골격 비율 · 관절축 · 가동범위를 기준으로\n 수직저항 무게중심에 대한 각 관절의 부하와 토크를 평가한다. \n모멘트암이 사람마다 다르니, 최적 정렬도 사람마다 다르다.',
    maps: '성과 개선 — 개인별 토크 최적 정렬',
  },
]

const axes = ['시간 · 실시간', '공간 · 3D', '개체 · 개인화']

export default function Slide04() {
  return (
    <div className={styles.slide}>
      <div className="s-hd">
        <div>
          <h2 className="s-hd-title">다시점 비전AI 3D 실시간 스켈레톤 복원, 데이터 기반 초개인화 분석의 시작</h2>
          <div className="s-hd-sub">부상·성과 = 3D 관절 모멘트(부하·토크)를 정면으로 측정</div>
        </div>
        <span className="s-hd-section">02 · 솔루션</span>
      </div>
      <div className="s-rule" />

      <div className="s-body">
        <div className={styles.layout}>

          {/* 좌: 데모 */}
          <div className={styles.demoCol}>
            <figcaption className={styles.demoTag}>
              <span className={styles.demoTagBadge}>MVP v2</span>
              <span className={styles.demoTagDesc}>
                검증 범위: 실시간 3D 스켈레톤(시간축 포함 4D) 복원추출, 멀티쓰레드 파이프라인 구축 (개발 완료)
              </span>
            </figcaption>
            <div className={styles.demoFrame}>
              <img src={demoImg} alt="MVP v2 3D 분석 화면" className={styles.demoImg} />
            </div>
          </div>

          {/* 우: 기술 2카드 + 측정축 */}
          <div className={styles.techCol}>
            {tech.map((t) => (
              <div key={t.badge} className={styles.techCard}>
                <div className={styles.techBadge}>{t.badge}</div>
                <div className={styles.techTitle}>{t.title}</div>
                <div className={styles.techEn}>{t.en}</div>
                <p className={styles.techDesc}>{t.desc}</p>
                <div className={styles.techMaps}>
                  <span className={styles.mapsArrow}>→</span>{t.maps}
                </div>
              </div>
            ))}

            <div className={styles.axesRow}>
              <span className={styles.axesLbl}>측정 역량</span>
              <div className={styles.axesItems}>
                {axes.map((a) => <span key={a} className={styles.axisChip}>{a}</span>)}
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className={styles.converge}>
        측정된 모멘트를 개인 기준으로 해석할 때, 부상 위험과 성과가 <strong>단일 파이프라인</strong>에서 동시에 드러난다.
      </div>
    </div>
  )
}
