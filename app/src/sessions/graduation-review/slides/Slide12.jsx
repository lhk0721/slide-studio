import styles from './Slide12.module.css'
import qr from '../assets/qr_racktracker.svg'

export default function Slide12() {
  return (
    <div className={styles.slide}>
      {/* 배너와 같은 QR(https://racktracker.dev/). 원본은 저장소 밖 졸프 폴더의 QR_racktracker.dev_2026-10-24.
          흰 여백도 QR 의 일부라 자르거나 겹치지 않는다 */}
      <img className={styles.qr} src={qr} alt="racktracker.dev QR 코드" />
      <div className={styles.url}>racktracker.dev</div>
    </div>
  )
}
