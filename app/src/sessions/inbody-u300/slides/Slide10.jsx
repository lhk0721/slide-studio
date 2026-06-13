import styles from './Slide10.module.css'
import imgSupply from '../assets/9.jpeg'
import imgDemand from '../assets/10.png'
import imgNoise from '../assets/11.png'

const trends = [
  {
    n: '①', cat: '경쟁 과열', en: 'SUPPLY',
    img: { alt: '이미지: 프리미엄 헬스장·체인 시설', slot: '축1 이미지', src: imgSupply },
    phenom: '헬스장 프리미엄화·체인화 —\n 시설·기구 군비경쟁, 대형 자본 중심 통합',
    metrics: [
      'PT 서비스 CAGR 12.3% — 멤버십의 4배 속도',
      '멤버십이 시장 80.75% 차지',
    ],
    reveal: '시설로는 차별화 불가 — 소비자는 ‘전문 코칭’에 지불 의향',
  },
  {
    n: '②', cat: '수요 폭증', en: 'DEMAND',
    img: { alt: '이미지: 온라인 코칭·앱 화면', slot: '축2 이미지', src: imgDemand },
    phenom: '온라인 코칭·디지털 피트니스로 수요 이동',
    metrics: [
      '글로벌 온라인 코칭 187억$(2024) \n → 521억$(2033, CAGR 13.2%)',
      '美 헬스장 등록 14% vs 디지털 건강관리 60%+',
    ],
    reveal: '소비자는 이미 ‘분석·피드백’에 돈을 쓴다',
  },
  {
    n: '③', cat: '정보 범람', en: 'NOISE',
    img: { alt: '이미지: SNS 피트니스 콘텐츠 피드', slot: '축3 이미지', src: imgNoise },
    phenom: '정보 콘텐츠 수요 폭증, 그러나 논문도 정보도 결론이 상충',
    metrics: [
      '#GymTok 750억 조회(2024) — 도달은 무한',
      '↳ 그러나 검증·개인화 기준은 0',
      '정보는 홍수, 결론은 상충 — 무엇이 맞는지 아무도 확신하지 못한다',
    ],
    reveal: '사실 트레이너도 모른다 — 혼란 자체가 수요 신호',
  },
]

export default function Slide10() {
  return (
    <div className={styles.slide}>
      <div className="s-hd">
        <div>
          <h2 className="s-hd-title">왜 지금인가 — 세 시장 동향이 한 점으로 수렴</h2>
          <div className="s-hd-sub">경쟁 과열 · 수요 폭증 · 정보 범람 — 같은 결핍을 가리킨다</div>
        </div>
        <span className="s-hd-section">04 · 시장 동향</span>
      </div>
      <div className="s-rule" />

      <div className="s-body">
        <div className={styles.layout}>

          <div className={styles.cards}>
            {trends.map((t) => (
              <div key={t.n} className={styles.card}>

                {/* 이미지가 있으면 표시, 없으면 placeholder (src 비우면 자리표시로 복귀) */}
                {t.img.src ? (
                  <img src={t.img.src} alt={t.img.alt} className={styles.img} />
                ) : (
                  <div className={styles.ph} data-slot={t.img.slot}>
                    <span className={styles.phIcon} aria-hidden="true">▣</span>
                    <span className={styles.phText}>{t.img.alt}</span>
                  </div>
                )}

                <div className={styles.cardHd}>
                  <span className={styles.num}>{t.n}</span>
                  <span className={styles.cat}>{t.cat}</span>
                  <span className={styles.en}>{t.en}</span>
                </div>

                <p className={styles.phenom}>{t.phenom}</p>

                <div className={styles.metrics}>
                  {t.metrics.map((m) => (
                    <div key={m} className={styles.metric}>{m}</div>
                  ))}
                </div>

                <div className={styles.reveal}>{t.reveal}</div>
              </div>
            ))}
          </div>

          <div className={styles.src}>
            출처: ① Mordor Intelligence(2025) · ② Dataintelo(2024)·Statista/Fitness On Demand(2024) · ③ Statista(2024)·WodGuru/Trainerize 인용
          </div>

        </div>
      </div>

      <div className={styles.converge}>
        공급은 차별화를, 수요는 분석을, 정보는 검증을 원한다 — <strong>셋의 교집합에 검증된 정량 분석이 없다</strong>
      </div>
    </div>
  )
}
