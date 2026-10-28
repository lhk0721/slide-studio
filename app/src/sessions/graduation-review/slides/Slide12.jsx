import Reserve from '../components/Reserve'
import fig from '../assets/fig27_panoptic_cameras.jpg'

export default function Slide12() {
  return (
    <Reserve
      n={1}
      title="카메라 3대의 이유"
      sub="2대에서 가려진 관절은 누락, 계산으로는 복구 불가"
      points={[
        <><strong>2대</strong>: 한 대가 가리면 그 관절은 추정으로만 채움</>,
        <><strong>3대</strong>: 한 대가 가려도 남은 둘로 삼각측량. 2대는 <em>추정</em>, 3대는 <em>측정</em></>,
        <>Panoptic 돔의 카메라 가운데 파워랙에 달 수 있는 앞쪽과 양옆 자리의 3대로 검증</>,
      ]}
      figure={fig}
      figCap="Panoptic 돔에서 고른 카메라 3대"
      figWidth="32rem"
      converge={<>가려짐의 해법은 <strong>세 번째 카메라</strong></>}
    />
  )
}
