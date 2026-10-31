import Frame from '../components/Frame'
import MediaPair from '../components/MediaPair'
import styles from './Media.module.css'

export default function Slide08() {
  return (
    <Frame
      title="위치 보정"
      sub="기준 카메라에 C1 과 C2 를 이어 세 대를 바닥 좌표계에 배치"
      section="05 · 운용절차 ②"
      converge={<>검산 차이 <strong>0.18°, 0.35cm</strong>. 기준 0.5°, 2.0cm</>}
    >
      <div className={`gr-body tight ${styles.body}`}>
        <MediaPair
          anim="/graduation-review/anim_ext_anchor.mp4"
          animCap="산출 원리 · 바닥 앵커, 랙 앵커, 검산 코너, 표본 18칸, C1·C2 상대 위치"
          demo="/graduation-review/demo_ext.mp4"
          demoCap="리그 화면 · 바닥·랙 앵커, 검산 코너, 표본 8배속, 리포트"
        >
          <ul className={`gr-points compact ${styles.points}`}>
            <li><strong>바닥에 눕힌 보드가 바닥 좌표계.</strong> 보드 모서리가 원점, 두 변이 x 축과 z 축, 위쪽이 y 축</li>
            <li>기준 카메라 한 대로 바닥과 파워랙을 잡고, <em>기준 카메라에서 본 C1 과 C2 의 위치</em> 산출</li>
            <li>보드를 들고 파워랙 안을 옮겨 다니며 표본 수집. 검산은 기준 카메라를 거쳐 이은 C1 에서 C2 까지와 직접 산출한 값의 비교</li>
          </ul>
        </MediaPair>
      </div>
    </Frame>
  )
}
