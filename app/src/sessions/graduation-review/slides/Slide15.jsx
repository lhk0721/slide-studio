import Reserve from '../components/Reserve'
import fig from '../assets/fig24_load_path.png'

export default function Slide15() {
  return (
    <Reserve
      n={4}
      title="근육군 규칙"
      sub="관절 하중을 버티는 것은 그 관절을 펴는 근육군"
      points={[
        <>스쿼트에서 <strong>무릎</strong>은 대퇴사두근, <strong>골반</strong>은 둔근과 햄스트링, <strong>발목</strong>은 종아리, <strong>허리</strong>는 척추기립근</>,
        <>짙기는 세트 안 최대 관절 하중 대비 비율</>,
        <>근전도(EMG) 측정은 아님. <em>하중의 분배</em>를 보이는 색</>,
      ]}
      figure={fig}
      figCap="무게중심에서 관절 하중, 근육군까지"
      figWidth="32rem"
      converge={<>색은 <strong>하중이 간 곳</strong></>}
    />
  )
}
