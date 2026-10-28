/**
 * 7~10장 공통: 왼쪽 산출 원리 애니메이션(16:10) + 오른쪽 리그 시연 녹화(세로 태블릿).
 * 둘 다 자동 재생·반복·무음. demo 를 안 주면 자리표시(.gr-ph)를 그린다.
 */
export default function MediaPair({ anim, animCap, demo, demoCap, placeholder }) {
  return (
    <div className="gr-media">
      <div className="gr-media-item">
        <video className="gr-video wide" src={anim} autoPlay muted loop playsInline />
        <div className="gr-cap">{animCap}</div>
      </div>
      <div className="gr-media-item">
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
