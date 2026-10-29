/**
 * 7~10장 공통: 왼쪽에 산출 원리 애니메이션(크게)과 그 아래 글(children),
 * 오른쪽에 리그 시연 녹화(세로 태블릿)를 본문 높이 전체로.
 * 둘 다 자동 재생·반복·무음. demo 를 안 주면 자리표시(.gr-ph)를 그린다.
 */
export default function MediaPair({ anim, animCap, demo, demoCap, placeholder, children }) {
  return (
    <div className="gr-media">
      <div className="gr-media-main">
        <div className="gr-media-item grow">
          <video className="gr-video wide" src={anim} autoPlay muted loop playsInline />
          <div className="gr-cap">{animCap}</div>
        </div>
        {children}
      </div>
      <div className="gr-media-item side">
        {demo ? (
          <video className="gr-video tall" src={demo} autoPlay muted loop playsInline />
        ) : (
          <div className="gr-ph">
            <span>▶</span>
            <span>{placeholder}</span>
          </div>
        )}
        <div className="gr-cap">{demoCap}</div>
      </div>
    </div>
  )
}
