import Reserve from '../components/Reserve'
import fig from '../assets/table4_jetson.png'

export default function Slide17() {
  return (
    <Reserve
      n={6}
      title="비용"
      sub="부품은 카메라 3대, 트리거 보드, 연산 장비, 태블릿, USB 허브"
      points={[
        <>연산 장비 모듈 <strong>Orin NX 999달러</strong>. Orin Nano 는 399달러지만 카메라 3대 추론에 느림</>,
        <>카메라 한 대 ____달러, 트리거 보드 ____달러</>,
        <>연구실 모션캡처의 카메라 수십 대와 전용 공간 대신 <em>파워랙 하나</em></>,
      ]}
      figure={fig}
      figCap="Orin Nano 와 Orin NX 사양"
      figWidth="30rem"
      converge={<>모듈 한 대와 카메라 3대로 <strong>파워랙 하나</strong>가 스튜디오</>}
    />
  )
}
