import Frame from '../components/Frame'
import styles from './Slide02.module.css'
import xray from '../assets/fig01_xray.jpg'

/* 지렛대 도식: 같은 무게, 거리가 두 배면 모멘트도 두 배 */
function Lever() {
  const rows = [
    { y: 40, arm: 150, label: '거리 d', moment: '모멘트 ×1', strong: false },
    { y: 112, arm: 300, label: '거리 2d', moment: '모멘트 ×2', strong: true },
  ]
  return (
    <svg className={styles.lever} viewBox="0 0 560 150" aria-label="모멘트는 무게 곱하기 거리">
      {rows.map((r) => (
        <g key={r.y}>
          {/* 관절 */}
          <circle cx="24" cy={r.y} r="7" className={styles.joint} />
          {/* 팔 */}
          <line x1="24" y1={r.y} x2={24 + r.arm} y2={r.y} className={styles.arm} />
          {/* 무게 */}
          <rect x={24 + r.arm - 11} y={r.y - 11} width="22" height="22" rx="3" className={styles.weight} />
          <line x1={24 + r.arm} y1={r.y + 11} x2={24 + r.arm} y2={r.y + 26} className={styles.gravity} />
          <polygon points={`${24 + r.arm - 4},${r.y + 24} ${24 + r.arm + 4},${r.y + 24} ${24 + r.arm},${r.y + 31}`} className={styles.gravityHead} />
          {/* 거리 이름표 */}
          <text x={24 + r.arm / 2} y={r.y - 12} className={styles.lbl} textAnchor="middle">{r.label}</text>
          {/* 모멘트 */}
          <text x="420" y={r.y + 6} className={r.strong ? styles.momentStrong : styles.moment}>{r.moment}</text>
        </g>
      ))}
    </svg>
  )
}

export default function Slide02() {
  return (
    <Frame
      title="다친 뒤 알게 된 것"
      sub="가벼운 무게의 워밍업 중 허리 디스크 파열"
      section="01 · 문제"
      converge={<>위험한 것은 무게가 아니라 <strong>무게가 가는 길</strong></>}
    >
      <div className="gr-body">
        <div className={`gr-col ${styles.left}`}>
          <div className="gr-fig gray">
            <img src={xray} alt="허리 X-ray 사진" />
          </div>
          <div className="gr-cap">허리 X-ray</div>
        </div>

        <div className="gr-col center gr-grow">
          <ul className="gr-points">
            <li>
              <strong>고중량만 위험하다는 착각.</strong> 관절과 근육의 모멘트는 드는 무게보다
              그 무게가 몸의 어디로 가는가에 좌우
            </li>
            <li>
              <em>모멘트 = 무게 × 거리.</em> 무게중심이 몇 cm 벗어나면 지렛대 원리로 모멘트는 몇 배
            </li>
            <li>
              <strong>하중 경로</strong>: 바와 몸의 무게가 관절과 근육으로 가는 길과 크기
            </li>
          </ul>
          <Lever />
        </div>
      </div>
    </Frame>
  )
}
