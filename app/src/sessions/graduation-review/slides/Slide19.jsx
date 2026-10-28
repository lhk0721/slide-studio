import Reserve from '../components/Reserve'
import fig from '../assets/fig26_datasets.jpg'

export default function Slide19() {
  return (
    <Reserve
      n={8}
      title="피험자와 종목"
      sub="학습에 쓰지 않은 피험자로 평가"
      points={[
        <>평가는 학습에 쓰지 않은 <strong>피험자 2명 8샘플</strong>, 네 동작(스쿼트, 데드리프트, 런지, 스러스터)</>,
        <>정답은 Fit3D 의 마커 모션캡처. 카메라 4대 가운데 파워랙 자리에 맞는 3대 사용</>,
        <>리그 종목은 <em>스쿼트부터</em>. 바가 몸을 가리는 종목은 카메라 배치 재검토</>,
      ]}
      figure={fig}
      figCap="Panoptic 과 Fit3D 의 촬영 장면"
      figWidth="32rem"
      converge={<>학습과 평가의 <strong>피험자 분리</strong></>}
    />
  )
}
