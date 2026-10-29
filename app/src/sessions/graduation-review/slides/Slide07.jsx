import Frame from '../components/Frame'
import MediaPair from '../components/MediaPair'
import styles from './Media.module.css'

export default function Slide07() {
  return (
    <Frame
      title="렌즈 보정"
      sub="여러 자리에서 찍은 보드로 카메라마다 아홉 값 산출"
      section="05 · 네 절차 ①"
      converge={<>재투영 오차 <strong>0.29~0.45px</strong>, 기준 1.5px</>}
    >
      <div className={`gr-body tight ${styles.body}`}>
        <MediaPair
          anim="/graduation-review/anim_lens_k.mp4"
          animCap="산출 원리 · K 산출"
          demo="/graduation-review/demo_lens.mp4"
          demoCap="리그 화면 · 렌즈 보정 촬영"
        >
          <ul className={`gr-points compact ${styles.points}`}>
            <li><strong>캘리브레이션 보드</strong>(ChArUco, A2, 90mm 칸)를 거리와 기울기를 바꿔 8장 이상 촬영</li>
            <li>격자 모서리의 번호로 보드 위 3D 위치와 사진 위 화소의 짝 맞춤</li>
            <li>카메라마다 <em>아홉 값</em>: 초점 거리 2, 주점 2, 왜곡 계수 5</li>
          </ul>
        </MediaPair>
      </div>
    </Frame>
  )
}
