import Frame from '../components/Frame'
import MediaPair from '../components/MediaPair'
import styles from './Media.module.css'

export default function Slide10() {
  return (
    <Frame
      title="측정 ② 하중 경로"
      sub="3D 관절에 체중, 성별, 바 무게를 더한 하중 계산"
      section="05 · 운용절차 ④"
      converge={<>수직 저항 무게중심에서 담당 근육군까지, <strong>관절별 하중 분배</strong> 산출</>}
    >
      <div className={`gr-body tight ${styles.body}`}>
        <MediaPair
          anim="/graduation-review/anim_measure_load.mp4"
          animCap="산출 원리 · 랙 좌표와 지표"
          demo="/graduation-review/demo_replay.mp4"
          demoCap="리그 화면 · 지난 세션 보기"
        >
          <ul className={`gr-points compact ${styles.points}`}>
            <li><strong>원인</strong>: 분절 표(de Leva)로 구한 몸과 바의 무게중심, 발 위에서의 자리. 앞뒤 쏠림, 두 발이 받는 몫</li>
            <li><strong>결과</strong>: 다리마다 발목, 무릎, 골반의 관절 하중 = 그 발이 받는 힘 × 관절까지의 앞뒤·안팎 거리. 허리는 위쪽 무게로. 몸 각 부분의 가속도와 회전까지</li>
            <li><strong>해석</strong>: 그 하중을 받는 <em>근육군을 색으로</em></li>
          </ul>
        </MediaPair>
      </div>
    </Frame>
  )
}
