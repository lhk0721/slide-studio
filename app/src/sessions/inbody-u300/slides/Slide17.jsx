import styles from './Slide17.module.css'
import analogGym from '../assets/goldsgym.webp'

const roadmap = ['파워랙', '전 종목', '재활·의료', 'InBody 글로벌 헬스케어']

export default function Slide17() {
  return (
    <div className={styles.slide}>
      {/* 좌: 비전 + Ask */}
      <div className={styles.main}>
        <div className={styles.section}>08 · 비전 · 요청</div>

        <div className={styles.closing}>
          3차 산업혁명조차 비껴간 산업,<br />
          <strong>데이터로 다시 쓰겠습니다.</strong>
        </div>

        <div className={styles.roadmap}>
          {roadmap.map((r, i) => (
            <span key={r} className={styles.roadStep}>
              {r}{i < roadmap.length - 1 && <span className={styles.roadArrow}>→</span>}
            </span>
          ))}
        </div>

        <div className={styles.ask}>
          <div className={styles.askLbl}>CONVICTION</div>
          <div className={styles.askText}>
          저희가 그리는 그림이 <strong>피트니스 산업의 미래</strong>가 될 것입니다. <br />
            그 미래를 먼저 보았고, 이제 그 <strong>주역</strong>이 되겠습니다.
          </div>
        </div>
      </div>

      {/* 우: 기존 아날로그 헬스장 전경 (흑백) */}
      <div className={styles.imgCol}>
        <img src={analogGym} alt="기존 아날로그 헬스장 전경" className={styles.analogGym} />
      </div>
    </div>
  )
}
