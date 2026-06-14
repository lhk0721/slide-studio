import styles from './Slide11.module.css'

// 시사점 & 결론 — 시장실패는 구조의 함수다. 3개 시사점 아이콘 카드 + 클로징.
// 아이콘은 인라인 SVG(Lucide 계열 단순 라인, ISC). 단일 accent 스트로크.
const cards = [
  {
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle className={styles.iconDot} cx="12" cy="5" r="2.1" />
        <path className={styles.iconPath} d="M12 7.2 V11 M12 11 L6 18 M12 11 L18 18" />
        <circle className={styles.iconDot} cx="6" cy="18.6" r="1.7" />
        <circle className={styles.iconDot} cx="18" cy="18.6" r="1.7" />
      </svg>
    ),
    title: '구조가 형태를 가른다',
    desc: '시장실패는 하나의 형태가 아니라 자본 조달 구조의 함수다.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path className={styles.iconPath} d="M12 4 V17 M9 20 H15 M11 17 H13 M4 8 H20 M4 8 L2 12.5 M4 8 L6 12.5 M20 8 L18 12.5 M20 8 L22 12.5" />
      </svg>
    ),
    title: '처방도 구조별로',
    desc: '미국형 = 자본시장 규율 / 한국형 = 소상공인 보호·계약 투명성.',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path className={styles.iconPath} d="M12 3 L20 6 V12 C20 17 16.5 20 12 21 C7.5 20 4 17 4 12 V6 Z" />
        <path className={styles.iconPath} d="M9 12 L11 14 L15.5 9.5" />
      </svg>
    ),
    title: '인적자본은 구조가 지킨다',
    desc: '인적자본은 ‘자산으로 인식되는 구조’에서만 보호된다.',
  },
]

export default function Slide11() {
  return (
    <div className={styles.slide}>
      <div className="s-hd">
        <div>
          <h2 className="s-hd-title">시사점 &amp; 결론</h2>
          <div className="s-hd-sub">시장실패는 하나의 형태가 아니라 구조의 함수다</div>
        </div>
        <span className="s-hd-section">결론 · CONCLUSION</span>
      </div>
      <div className="s-rule" />

      <div className="s-body">
        <div className={styles.layout}>

          <div className={styles.cards}>
            {cards.map((c) => (
              <div key={c.title} className={styles.card}>
                <span className={styles.icon}>{c.icon}</span>
                <span className={styles.cardTitle}>{c.title}</span>
                <span className={styles.cardDesc}>{c.desc}</span>
              </div>
            ))}
          </div>

          <p className={styles.close}>
            같은 충격, 다른 실패 — 결국 <strong>구조가 운명을 가른다</strong>.
          </p>

        </div>
      </div>
    </div>
  )
}
