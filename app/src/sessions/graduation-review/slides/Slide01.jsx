import styles from './Slide01.module.css'
import rigImg from '../assets/fig05_rig.jpg'

export default function Slide01() {
  return (
    <div className={styles.slide}>
      {/* 좌: 파워랙 모형에 설치한 리그(그림 5 의 오른쪽 사진 부분) */}
      <div className={styles.deco}>
        <img src={rigImg} alt="파워랙 모형에 설치한 리그" className={styles.img} />
      </div>

      {/* 우: 텍스트 */}
      <div className={styles.body}>
        <div className={styles.eyebrow}>졸업작품 심사 &nbsp;·&nbsp; 2026. 11. 03</div>
        <div className={styles.main}>
          다시점 삼각측량과<br />소형 연산 장비를 이용한<br />파워랙의 모션캡처 스튜디오화
        </div>
        <div className={styles.rule} />
        <div className={styles.sub}>
          <span>
            <span className={styles.accent}>RackTracker</span>, 3D 골격을 실시간 측량하는 리그(Rig)
          </span>
        </div>
        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <span className={styles.metaLbl}>Team</span>
            <span className={styles.metaVal}>RackLabs</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLbl}>Members</span>
            <span className={styles.metaVal}>이현규, 이지원, 신은수, 장효인, 전효원</span>
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
