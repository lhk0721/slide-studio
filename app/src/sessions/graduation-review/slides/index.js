import '../tokens.css' // deck design tokens, scoped to [data-theme="graduation-review"]
import '../deck.css'   // session layout helpers (gr- prefix)
import Slide01 from './Slide01'
import Slide02 from './Slide02'
import Slide03 from './Slide03'
import Slide04 from './Slide04'
import Slide05 from './Slide05'
import Slide06 from './Slide06'
import Slide07 from './Slide07'
import Slide08 from './Slide08'
import Slide09 from './Slide09'
import Slide10 from './Slide10'
import Slide11 from './Slide11'
import Slide12 from './Slide12'
import Slide13 from './Slide13'
import Slide14 from './Slide14'
import Slide15 from './Slide15'
import Slide16 from './Slide16'
import Slide17 from './Slide17'
import Slide18 from './Slide18'
import Slide19 from './Slide19'
import Slide20 from './Slide20'

// ─────────────────────────────────────────────────────────────
//  SLIDE META — same schema as inbody-u300 (see that deck's index.js).
//  본편 1~11 = 180초. 예비 12~20 은 질의응답용이라 발표에서는 넘기지 않는다.
//  글·그림의 원고는 rack-tracker `docs/etc/graduation-review/slides/slides.md`.
// ─────────────────────────────────────────────────────────────
const slides = [
  {
    id: 1, title: '타이틀', component: Slide01,
    group: '도입', role: '표지',
    message: '다시점 삼각측량과 소형 연산 장비를 이용한 파워랙의 모션캡처 스튜디오화',
    visual: '파워랙 모형에 설치한 리그 사진(보고서 그림 5 오른쪽)',
    notes: '5초. 과제명과 팀만 말한다.',
  },
  {
    id: 2, title: '다친 뒤 알게 된 것', component: Slide02,
    group: '문제', role: '경험에서 문제로',
    message: '위험한 것은 무게가 아니라 무게가 가는 길(하중 경로)이다',
    body: [
      '가벼운 무게로 워밍업하다 허리 디스크가 터졌다',
      '위험한 것은 무게가 아니라 무게가 가는 길이다',
      '모멘트 = 무게 × 거리. 무게중심이 몇 cm 벗어나면 모멘트는 몇 배가 된다',
      '하중 경로: 바와 몸의 무게가 어느 관절과 근육으로 얼마나 가는가',
    ],
    visual: '허리 X-ray(보고서 그림 1) + 지렛대 도식(새로 그림)',
    notes: '20초.',
  },
  {
    id: 3, title: '기존 솔루션의 한계', component: Slide03,
    group: '기존 솔루션', role: '대안 비교',
    message: '하중 경로를 재면서 헬스장에 들어가는 것은 리그뿐이다',
    body: [
      '연구실 모션캡처: 카메라 수십 대, 전용 공간, 막대한 연산 장비. 헬스장에 못 들인다',
      '단안 카메라 앱과 장치: 사진에 깊이가 없다. 3D 는 추정값이라 cm 를 못 정하고 하중 경로를 못 낸다',
      '롤링 셔터와 파워랙 밖 카메라: 빠른 동작이 기울어 찍히고 기둥과 원판에 가린다. 횟수 세기와 각도 판정에 그친다',
      '기계식 측정 기구: 정해진 궤적의 토크. 프리웨이트가 아니다',
    ],
    visual: '비교표(보고서 표 1) + 단안 앱 한계 패널 넷(보고서 그림 4)',
    notes: '25초.',
  },
  {
    id: 4, title: '시장 실패로 이어진 정량 분석 수단 부재', component: Slide04,
    group: '시장실패', role: '수단 부재의 결과',
    message: '하중 경로를 잴 수단이 없어 트레이너, 헬스장, 회원이 함께 진다',
    body: [
      '하중 경로를 잴 수단이 없다. 지도의 근거는 구전 노하우와 감이다',
      '품질을 가릴 수 없는 시장에는 질 낮은 쪽만 남는다(레몬시장)',
      '국내 헬스장은 5년 안에 80% 넘게 닫는다. 미국 트레이너는 해마다 80%가 자리를 옮기고, 신규 회원의 절반이 6개월 안에 그만둔다',
      '비용과 부상 위험은 회원이 떠안는다',
    ],
    visual: '세 참여자의 악순환 도식(보고서 그림 2)',
    notes: '15초.',
  },
  {
    id: 5, title: '리그 하드웨어', component: Slide05,
    group: '리그', role: '무엇으로 재는가',
    message: '카메라 3대, 트리거 보드, 연산 장비, 태블릿이 리그의 전부다',
    body: [
      '카메라 3대: 글로벌 셔터, 1920×1200, 초당 30장, 파워랙 기둥에 세로 장착',
      '트리거 보드: 펄스 하나에 같은 순간의 세 사진. 노출 시각 차 0.12ms',
      '연산 장비: Jetson Orin NX 16GB 한 대. 관절 추론, 삼각측량, 하중 계산을 리그 안에서 끝낸다',
      '태블릿: USB 선 하나의 폐쇄망. 사진과 3D 관절이 밖으로 나가지 않는다',
    ],
    visual: '리그 개념도(그림 5 왼쪽) + 부품 사진(그림 6) + 셔터 프로펠러 클립',
    notes: '25초.',
  },
  {
    id: 6, title: '네 절차', component: Slide06,
    group: '리그', role: '절차 개요',
    message: '진단, 렌즈 보정, 위치 보정, 측정이 태블릿 앱 하나에 이어진다',
    body: [
      '진단: 리그를 켜거나 선을 건드린 뒤. 하드웨어와 카메라 동기를 자동 점검(STROBE 900/900)',
      '렌즈 보정: 카메라를 달거나 바꿨을 때. 위치 보정: 설치 직후와 카메라가 움직인 뒤',
      '측정: 진단을 통과하고 두 보정이 있어야 열린다',
    ],
    visual: '네 절차의 태블릿 화면(보고서 그림 7)',
    notes: '10초.',
  },
  {
    id: 7, title: '렌즈 보정', component: Slide07,
    group: '네 절차', role: '원리 + 시연 ①',
    message: '보드를 여러 자리에서 찍어 카메라마다 아홉 값을 산출한다',
    body: [
      '캘리브레이션 보드(ChArUco, A2, 90mm 칸)를 거리와 기울기를 바꿔 8장 이상 찍는다',
      '격자 모서리마다 번호가 있어 보드 위 3D 위치와 사진 위 화소가 짝지어진다',
      '카메라마다 아홉 값: 초점 거리 2, 주점 2, 왜곡 계수 5',
      '재투영 오차 0.29~0.45px, 기준 1.5px',
    ],
    visual: '왼쪽 애니메이션 K 산출 13초, 오른쪽 녹화 A 렌즈 보정 촬영 13초',
    notes: '15초.',
  },
  {
    id: 8, title: '위치 보정', component: Slide08,
    group: '네 절차', role: '원리 + 시연 ②',
    message: '기준 카메라에 C1 과 C2 를 이어 세 대를 바닥 좌표계에 놓는다',
    body: [
      '바닥에 눕힌 보드가 바닥 좌표계다. 보드 모서리가 원점, 두 변이 x 축과 z 축, 위쪽이 y 축',
      '기준 카메라 한 대로 바닥과 파워랙을 잡고, C1 과 C2 가 기준 카메라에서 어디 있는지 산출한다',
      '사람이 보드를 들고 파워랙 안을 옮겨 다니며 표본을 모은다',
      '검산: 기준 카메라를 거쳐 이은 C1 에서 C2 까지와 직접 산출한 값의 차이 0.18°, 0.35cm(기준 0.5°, 2.0cm)',
    ],
    visual: '왼쪽 애니메이션 결과 파일 13초, 오른쪽 녹화 A 위치 보정 세 토막 13초',
    notes: '15초.',
  },
  {
    id: 9, title: '측정 ① 삼각측량', component: Slide09,
    group: '네 절차', role: '원리 + 시연 ③',
    message: '세 광선이 만나는 점이 3D 관절이고, 한 대가 가려도 둘로 산출한다',
    body: [
      '카메라마다 사진에서 2D 관절 33개를 찾는다(BlazePose heavy)',
      '광학 중심에서 2D 관절을 지나는 광선을 긋고, 세 광선이 가장 가깝게 만나는 점이 3D 관절이다',
      '재투영 오차가 4px를 넘는 관측은 가중치를 줄이고, 24px를 넘으면 뺀다',
      '한 대가 가려도 남은 두 대로 산출한다',
    ],
    visual: '왼쪽 애니메이션 삼각측량 10초, 오른쪽 측정 중 화면 10초(리그 녹화 뒤 교체)',
    notes: '15초.',
  },
  {
    id: 10, title: '측정 ② 하중 경로', component: Slide10,
    group: '네 절차', role: '원리 + 시연 ④ · 결론',
    message: '무게가 어디로 갔는가 — 무게중심, 관절 모멘트, 근육까지',
    body: [
      '3D 관절에 체중, 성별, 바 무게를 넣는다. 분절 표(de Leva)로 몸의 무게중심과 바를 더한 무게중심을 구한다',
      '원인: 무게중심이 발 위 어디에 있는가(앞뒤 쏠림, 좌우 쏠림)',
      '결과: 발목, 무릎, 골반, 허리의 관절 하중 = 위쪽 무게 × 관절에서 무게중심까지의 앞뒤 거리. 가속도로 부하 배율',
      '해석: 그 하중을 받는 근육군을 색으로',
    ],
    visual: '왼쪽 애니메이션 지표 20초, 오른쪽 녹화 B 지난 세션 보기 20초',
    notes: '20초.',
  },
  {
    id: 11, title: '검증과 마무리', component: Slide11,
    group: '검증', role: '정확도 · 부스 안내',
    message: '카메라 3대의 삼각측량은 단안 모델보다 오차가 2배 작다',
    body: [
      'Fit3D(마커 모션캡처 정답) 8샘플, 관절 위치 오차 MPJPE 3.63cm',
      '단안 모델 InstantHMR 대비 관절 위치 오차 2.0배, 무릎 각도 오차 2.1배 작다',
      '화면값 251ms, 노출 시각 차 0.12ms, 동기 적중률 100%',
      '부스 9번에서 리그 실물로 측정해 볼 수 있다',
    ],
    visual: '정확도 막대(보고서 그림 28) + 지난 세션 보기 화면(그림 25)',
    notes: '15초.',
  },
  {
    id: 12, title: '예비 1 카메라 3대의 이유', component: Slide12,
    group: '예비', role: '질의응답',
    message: '2대로는 가려진 관절이 빠지고, 빠진 관절은 계산으로 못 채운다',
    visual: 'Panoptic 돔에서 고른 카메라 3대(보고서 그림 27)',
  },
  {
    id: 13, title: '예비 2 확정값 지연의 이유', component: Slide13,
    group: '예비', role: '질의응답',
    message: '20초 구간을 한꺼번에 다시 산출한다. 학습 모델 초기값으로 2차례면 된다',
    visual: '두 경로 도식(그림 22) + 다듬기 방식별 MPJPE(그림 23)',
  },
  {
    id: 14, title: '예비 3 리그 실물의 정확도', component: Slide14,
    group: '예비', role: '질의응답',
    message: '보드 540mm와 카메라 쌍 거리 103cm가 줄자와 맞았다',
    visual: '캘리브레이션 보드 도안과 실물(그림 14)',
  },
  {
    id: 15, title: '예비 4 근육군 규칙', component: Slide15,
    group: '예비', role: '질의응답',
    message: '관절 하중은 그 관절을 펴는 근육군이 버틴다',
    visual: '세션 보기 화면의 메쉬 근육군 색(그림 25)',
  },
  {
    id: 16, title: '예비 5 단안 앱과의 차이', component: Slide16,
    group: '예비', role: '질의응답',
    message: '깊이, 촬영 환경, 재는 것이 다르다',
    visual: '비교표(표 1)',
  },
  {
    id: 17, title: '예비 6 비용', component: Slide17,
    group: '예비', role: '질의응답',
    message: '연산 장비 모듈 Orin NX 999달러(Orin Nano 399달러)',
    visual: 'Orin Nano 와 Orin NX 사양표(표 4)',
  },
  {
    id: 18, title: '예비 7 리그 OS 와 lease', component: Slide18,
    group: '예비', role: '질의응답',
    message: '카메라와 트리거 보드는 lease 로 한 번에 한 곳에만',
    visual: '리그 OS 계층 도식(그림 16)',
  },
  {
    id: 19, title: '예비 8 피험자와 종목', component: Slide19,
    group: '예비', role: '질의응답',
    message: '평가는 학습에 쓰지 않은 피험자 2명 8샘플, 네 동작',
    visual: 'Fit3D 카메라 4대 사진(그림 26 오른쪽)',
  },
  {
    id: 20, title: '예비 9 수식 모음', component: Slide20,
    group: '예비', role: '질의응답',
    message: '렌즈 보정, 위치 보정, 삼각측량, 하중 경로의 식 넷',
    visual: '식 넷(KaTeX)',
  },
]

export default slides
