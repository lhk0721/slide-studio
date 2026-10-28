import Frame from './Frame'
import styles from './Reserve.module.css'

/**
 * 예비(질의응답) 장 공통: 왼쪽 글 두셋, 오른쪽 그림 하나.
 * `figure` 를 안 주면 글이 가로 전체를 쓴다(수식 모음).
 */
export default function Reserve({ n, title, sub, points, figure, figCap, figWidth = '30rem', converge }) {
  return (
    <Frame
      title={title}
      sub={sub}
      section={`예비 ${n} · 질의응답`}
      converge={converge}
    >
      <div className="gr-body tight">
        <div className="gr-col center gr-grow">
          <span className="gr-reserve-tag">Q&amp;A {n}</span>
          <ul className="gr-points">
            {points.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </div>
        {figure && (
          <div className={`gr-col ${styles.fig}`} style={{ width: figWidth }}>
            <div className="gr-fig">
              <img src={figure} alt={figCap || title} />
            </div>
            {figCap && <div className="gr-cap">{figCap}</div>}
          </div>
        )}
      </div>
    </Frame>
  )
}
