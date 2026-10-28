import Reserve from '../components/Reserve'
import fig from '../assets/fig14_calib_board.jpg'

export default function Slide14() {
  return (
    <Reserve
      n={3}
      title="리그 실물의 정확도"
      sub="보정 결과와 줄자의 비교"
      points={[
        <>보드 여섯 칸 <strong>540mm</strong>, 줄자와 일치</>,
        <>산출한 카메라 쌍 거리 <strong>103.0cm</strong>, 줄자로 잰 약 103cm와 일치</>,
        <>랙 앵커 검산 코너의 예측 자리와 실제 자리 차이 <em>0.15cm</em>(기준 2.0cm)</>,
      ]}
      figure={fig}
      figCap="캘리브레이션 보드 도안과 실물"
      converge={<><strong>줄자</strong>와 맞는 보정값</>}
    />
  )
}
