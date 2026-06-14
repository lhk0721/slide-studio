import styles from './Slide01.module.css'
import gymClosure from '../assets/gym-closure.webp'

// 표지 — 폐업한 한국 헬스장(그레이스케일 풀블리드) 위에 덱 타이틀.
// 시장실패의 한국 측 이미지. 사진 출처: 김포신문 보도사진(워터마크) — 외부 공개 시 이용 허락 확인 필요.
export default function Slide01() {
  return (
    <div className={styles.cover}>
      <img src={gymClosure} alt="법적 분쟁으로 한시적 폐쇄된 한국 헬스장 출입문" className={styles.bg} />
      <div className={styles.scrim} />
      <div className={styles.content}>
        <div className={styles.accentBar} />
        <span className={styles.eyebrow}>금융시장과 금융기관 · 발표</span>
        <h1 className={styles.title}>같은 충격, 다른 실패</h1>
        <p className={styles.sub}>{'코로나라는 동일한 충격,\n미국과 한국 피트니스 시장의 엇갈린 결말'}</p>
        <p className={styles.by}>발표자 이현규</p>
      </div>
    </div>
  )
}
