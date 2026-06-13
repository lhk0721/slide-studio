import styles from './Slide16.module.css'
import photoJeon from '../assets/전태웅.jpg'
import photoLee from '../assets/이현규.png'
import photoKim from '../assets/김미루.png'
import logoSmu from '../assets/smu.jpg'
import logoNvidia from '../assets/Nvidia.png'
import logoWeniv from '../assets/weniv.png'

const members = [
    { name: '전태웅', photo: photoJeon, role: '연구원 · 운동역학 모델링', duty: 'Warwick MEng \n 전) 한화에어로스페이스 연구원 \n현) 현대모비스 선행연구원' },
    { name: '이현규', photo: photoLee, role: '대표 · 본 기술의 원개발자\n AI/CV · 풀스택 개발 \n  제품 전략  · 자세추정 모델 설계', duty: '상명대학교 휴먼AI공학부 재학중\n (주)모두의연구소 소프트웨어 엔지니어 과정 이수 \n 전) 성보ENG 측량보조사 \n 전) 유월커뮤니케이션 PM' },
  { name: '김미루', photo: photoKim, role: '핵심 개발자 · 풀스택 개발 · DevOps\n 백엔드 아키텍처 · 인프라 파이프라인', duty: '상명대학교 휴먼AI공학부 재학중\n(전 학기 성적우수 장학생)\n선린인터넷고등학교\n' },
]

const advisors = [
  { org: '상명대학교 윤희남 교수', role: '지도교수', logo: logoSmu },
  { org: 'NVIDIA', role: 'DNN, CNN, LLM, RNN, Vision·OpenCV\n 교육훈련(9-6, 6개월) 및 프로젝트 컨설팅 수혜중 ', logo: logoNvidia },
  { org: '(주)WENIV', role: '프론트엔드·백엔드 컨설팅', logo: logoWeniv },
]

function Avatar() {
  return (
    <svg className={styles.avatar} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <circle className={styles.avatarHead} cx="32" cy="25" r="11" />
      <path className={styles.avatarBody} d="M14 56 a18 18 0 0 1 36 0 Z" />
    </svg>
  )
}

export default function Slide16() {
  return (
    <div className={styles.slide}>
      <div className="s-hd">
        <div>
          <h2 className="s-hd-title">실행하는 팀, 받쳐주는 전문 자원</h2>
          <div className="s-hd-sub">핵심 팀 3인 · 외부 자문 3 — 구성은 계속 확장됩니다</div>
        </div>
        <span className="s-hd-section">07 · 팀</span>
      </div>
      <div className="s-rule" />

      <div className="s-body">
        <div className={styles.layout}>

          {/* 팀 카드 그리드 */}
          <div className={styles.cat}>TEAM</div>
          <div className={styles.grid}>
            {members.map((m) => (
              <div key={m.name} className={styles.card}>
                <div className={styles.photo}>
                  {m.photo
                    ? <img src={m.photo} alt={`${m.name} 증명사진`} className={styles.photoImg} />
                    : <Avatar />}
                </div>
                <div className={styles.name}>{m.name}</div>
                <div className={styles.role}>{m.role}</div>
                <div className={styles.duty}>{m.duty}</div>
              </div>
            ))}
          </div>

          {/* 자문 자원 밴드 */}
          <div className={styles.cat}>ADVISORS & PARTNERS</div>
          <div className={styles.advisorRow}>
            {advisors.map((a) => (
              <div key={a.org} className={styles.advisor}>
                <div className={styles.advisorIcon}>
                  {a.logo && <img src={a.logo} alt={`${a.org} 로고`} className={styles.advisorLogo} />}
                </div>
                <div>
                  <div className={styles.advisorOrg}>{a.org}</div>
                  <div className={styles.advisorRole}>{a.role}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}
