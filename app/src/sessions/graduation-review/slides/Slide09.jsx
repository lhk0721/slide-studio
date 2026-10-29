import Frame from '../components/Frame'
import MediaPair from '../components/MediaPair'
import styles from './Media.module.css'

export default function Slide09() {
  return (
    <Frame
      title="측정 ① 삼각측량"
      sub="세 광선이 만나는 점이 3D 관절"
      section="04 · 네 절차 ③"
      converge={<>한 대가 가려도 <strong>남은 두 대</strong>로 산출</>}
    >
      <div className={`gr-body tight ${styles.body}`}>
        <MediaPair
          anim="/graduation-review/anim_measure_tri.mp4"
          animCap="산출 원리 · 삼각측량"
          placeholder="측정 중 화면 녹화 예정"
          demoCap="리그 화면 · 측정 중"
        >
          <ul className={`gr-points compact ${styles.points}`}>
            <li>카메라마다 사진에서 <strong>2D 관절 33개</strong> 검출(BlazePose heavy)</li>
            <li>광학 중심에서 2D 관절을 지나는 광선, <em>세 광선이 가장 가깝게 만나는 점</em>이 3D 관절</li>
            <li>재투영 오차 4px 초과는 가중치 축소, 24px 초과는 제외</li>
          </ul>
        </MediaPair>
      </div>
    </Frame>
  )
}
