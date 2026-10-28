import Reserve from '../components/Reserve'
import fig from '../assets/fig16_rig_os.png'

export default function Slide18() {
  return (
    <Reserve
      n={7}
      title="리그 OS 와 lease"
      sub="카메라와 트리거 보드는 한 번에 한 곳에만"
      points={[
        <>셸, 커널, 드라이버 세 층. 카메라와 트리거 보드는 <strong>lease</strong> 로 한 번에 한 절차에만 대여</>,
        <>명령은 제어 통로(WebSocket), 영상은 별도 통로</>,
        <>위치 보정 화면이 굳은 사고의 원인은 브라우저 연결 6개를 다 차지한 미리보기 6개. 제어 통로를 나눈 뒤에는 미리보기 6개를 연 채 <em>5ms</em> 응답</>,
      ]}
      figure={fig}
      figCap="리그 OS 의 세 층과 두 통로"
      figWidth="30rem"
      converge={<>명령과 영상의 <strong>통로 분리</strong></>}
    />
  )
}
