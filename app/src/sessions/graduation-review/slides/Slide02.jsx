import Frame from '../components/Frame'
import styles from './Slide02.module.css'
import loadPath from '../assets/load_path_arms.png'

export default function Slide02() {
  return (
    <Frame
      title="대리 지표에 머문 KPI"
      sub="PT 지도와 운동 분석 솔루션 모두, 잴 수 없는 값 대신 상관이 있다고 믿는 proxy metric에 의존"
      section="01 · 문제"
      converge={<>수직 저항 무게중심에 대하여, <strong>관절들의 지지 구조와 담당 근육군</strong>이 어떻게 작용했는가?</>}
    >
      <div className="gr-body">
        {/* 실제 세트의 한 프레임. 그림은 assets/make_load_path.py 가 그린다 */}
        <div className={`gr-col ${styles.fig}`}>
          <div className="gr-fig">
            <img src={loadPath} alt="스쿼트 바닥 자세에서 두 발이 받는 몫과 다리별 관절의 모멘트 암" />
          </div>
          <div className="gr-cap">리그로 잰 다리별 모멘트 암과 두 발 몫(스쿼트 바닥 자세, 바 100kg)</div>
        </div>

        <div className="gr-col center gr-grow">
          <ul className="gr-points">
            <li>
              <strong>진짜 목표(true outcome)</strong>
              <br />
              관절 모멘트(joint moment)와 관절 부하(joint loading)를 통한 하중 분배 전이 분석
            </li>
            <li>
              <strong>대리 지표(proxy)</strong>
              <br />
              각도와 궤적 같은 외형 기준. 트레이너의 큐도, 운동 분석 앱의 판정 임계도 이 값
            </li>
            <li>
              <strong>'정답 자세'는 없다</strong>
              <br />
              사람마다 골격 길이와 가동범위는 모두 다르다
            </li>
            <li>
              <strong>3차원 하중 경로의 시계열 동역학 분석 수단 필요</strong>
              <br />
              관절별 하중 분배가 매 순간 옮겨 가는 길. 3D 골격의 모멘트&nbsp;암에서만 나오는 값
            </li>
          </ul>
        </div>
      </div>
    </Frame>
  )
}
