import styles from './Slide01.module.css'

export default function Slide01() {
  return (
    <div className={styles.slide}>
      {/* 좌: 리그 배치 설계도를 글자 없이 12초에 한 바퀴 돌린 영상(60fps). 원본과 다시 만드는 소스는 저장소 밖 Videos 의 애니메이션 폴더 */}
      <div className={styles.deco}>
        <video className={styles.media} src="/graduation-review/rig_spin.mp4" autoPlay muted loop playsInline />
      </div>

      {/* 우: 텍스트 */}
      <div className={styles.body}>
        <div className={styles.eyebrow}>ICG 분야 실증기반 연구 프로그램 &nbsp;·&nbsp; 중간 성과공유회 2026. 11. 24</div>
        <div className={styles.main}>
          파워랙 다시점 카메라 리그의<br />스쿼트 하중 경로<br />정확도 검증
        </div>
        <div className={styles.rule} />
        <div className={styles.sub}>
          <span>
            <span className={styles.accent}>RackTracker</span>, 3D 골격을 실시간 측량하는 리그(Rig)
          </span>
        </div>
        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <span className={styles.metaLbl}>Program</span>
            <span className={styles.metaVal}>실증연구형, 바이오·헬스케어</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLbl}>Members</span>
            <span className={styles.metaVal}>이현규(팀장), 허현승</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLbl}>Advisor</span>
            <span className={styles.metaVal}>윤희남 교수님</span>
          </div>
        </div>
      </div>
    </div>
  )
}
