import { useState } from 'react'
import { downloadSlide, downloadAllSlides } from '../utils/exportSlides'
import styles from './ExportControls.module.css'

const PIXEL_RATIO = 3 // 1280×720 → 3840×2160 (4K) PPT background

export default function ExportControls({ slides, cur, total, zipName = 'slides.zip', theme }) {
  const [busy, setBusy] = useState(null) // 'one' | 'all' | null
  const [progress, setProgress] = useState('')

  const handleOne = async () => {
    if (busy) return
    setBusy('one')
    setProgress('')
    try {
      await downloadSlide(slides, cur - 1, { pixelRatio: PIXEL_RATIO, theme })
    } catch (e) {
      console.error(e)
      setProgress('내보내기 실패 — 콘솔 확인')
    } finally {
      setBusy(null)
    }
  }

  const handleAll = async () => {
    if (busy) return
    setBusy('all')
    setProgress(`0 / ${total}`)
    try {
      await downloadAllSlides(slides, {
        pixelRatio: PIXEL_RATIO,
        zipName,
        theme,
        onProgress: (done, t) => setProgress(`${done} / ${t}`),
      })
      setProgress('완료 — ZIP 저장됨')
    } catch (e) {
      console.error(e)
      setProgress('내보내기 실패 — 콘솔 확인')
    } finally {
      setBusy(null)
    }
  }

  return (
    <div className={styles.bar}>
      <button
        className={styles.btn}
        onClick={handleOne}
        disabled={!!busy}
        title={`현재 슬라이드(${cur})를 4K PNG로 저장`}
      >
        {busy === 'one' ? '내보내는 중…' : `이 슬라이드 저장 (${cur})`}
      </button>
      <button
        className={`${styles.btn} ${styles.primary}`}
        onClick={handleAll}
        disabled={!!busy}
        title="전체 슬라이드를 4K PNG로 묶어 ZIP 저장"
      >
        {busy === 'all' ? '내보내는 중…' : '전체 ZIP 저장'}
      </button>
      <span className={styles.meta}>
        {busy === 'all' && progress
          ? progress
          : progress || '4K · 3840×2160 PNG'}
      </span>
    </div>
  )
}
