import styles from './Slide01.module.css'
import heroImg from '../assets/2-2.png'

export default function Slide01() {
  return (
    <div className={styles.slide}>
      {/* 좌: 이미지 데코 */}
      <div className={styles.deco}>
        <img src={heroImg} alt="선수 스쿼트 자세 분석" className={styles.img} />
      </div>

      {/* 우: 텍스트 */}
      <div className={styles.body}>
        <div className={styles.eyebrow}>Pitch Deck &nbsp;·&nbsp; 2026</div>
        <div className={styles.main}>RACK<br />TRACKER</div>
        <div className={styles.rule} />
        <div className={styles.sub}>
          <span>
            파워랙을 <span className={styles.accent}>모션캡쳐 스튜디오</span>로
          </span>
          <span>
            운동의 물리학을 <span className={styles.accent}>데이터</span>로
          </span>
        </div>
        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <span className={styles.metaLbl}>Date</span>
            <span className={styles.metaVal}>2026. 05. 25</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.metaLbl}>Presenter</span>
            <span className={styles.metaVal}>이현규 / RackVenture</span>
          </div>
        </div>
      </div>
    </div>
  )
}
