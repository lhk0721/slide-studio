import Frame from '../components/Frame'
import styles from './Slide20.module.css'
import 'katex/dist/katex.min.css'
import katex from 'katex'

const eqs = [
  {
    k: '렌즈 보정',
    d: '렌즈 왜곡을 거쳐 화소가 되는 정규화 좌표. 카메라마다 아홉 값',
    tex: String.raw`x_d = \tilde x\,(1 + k_1 \rho^2 + k_2 \rho^4 + k_3 \rho^6) + 2p_1 \tilde x \tilde y + p_2\,(\rho^2 + 2\tilde x^2), \qquad u = f_x\,x_d + c_x`,
  },
  {
    k: '위치 보정',
    d: '바닥에서 기준 카메라로 가는 변환과 기준 카메라에서 C i 로 가는 변환의 연결',
    tex: String.raw`(X_c,\ Y_c,\ Z_c)^\top = R_i\,\mathbf X + \mathbf t_i, \qquad R_i = R_{0i}\,R_g, \qquad \mathbf t_i = R_{0i}\,\mathbf t_g + \mathbf t_{0i}`,
  },
  {
    k: '삼각측량',
    d: '가중 DLT. 가중치는 관측 신뢰도에 재투영 오차가 4px를 넘은 만큼 줄인 값',
    tex: String.raw`\bar{\mathbf X}^{\mathrm{tri}} = \arg\min_{\lVert \bar{\mathbf X} \rVert = 1} \sum_{i} w_i \Big[ \big( (\tilde x_i \mathbf P_i^{(3)} - \mathbf P_i^{(1)})\,\bar{\mathbf X} \big)^2 + \big( (\tilde y_i \mathbf P_i^{(3)} - \mathbf P_i^{(2)})\,\bar{\mathbf X} \big)^2 \Big], \qquad w_i = \kappa_i \min(1,\ \delta / e_i)`,
  },
  {
    k: '하중 경로',
    d: '관절 위쪽 분절과 바의 무게에 앞뒤 거리를 곱해 더한 것이 관절 하중. 부하 배율은 무게중심의 수직 가속도로',
    tex: String.raw`\tau_j = g \Big[ \sum_{s \in A(j)} \mu_s\, m_{\text{body}}\,(\mathbf c_s - \mathbf X_j)\cdot \hat{\mathbf e}_f + m_{\text{bar}}\,(\mathbf b - \mathbf X_j)\cdot \hat{\mathbf e}_f \Big], \qquad D = \frac{g + a_y}{g}`,
  },
]

function Tex({ tex }) {
  const html = katex.renderToString(tex, { displayMode: true, throwOnError: false })
  return <div className={styles.tex} dangerouslySetInnerHTML={{ __html: html }} />
}

export default function Slide20() {
  return (
    <Frame
      title="수식 모음"
      sub="7~10장의 계산을 식으로 물을 때. 기호는 보고서 6장과 7장 그대로"
      section="예비 9 · 질의응답"
      converge={<><strong>사진에서 하중 경로까지</strong> 잇는 네 식</>}
    >
      <div className={`gr-body tight ${styles.body}`}>
        {eqs.map((e) => (
          <div key={e.k} className={styles.row}>
            <div className={styles.head}>
              <span className={styles.k}>{e.k}</span>
              <span className={styles.d}>{e.d}</span>
            </div>
            <Tex tex={e.tex} />
          </div>
        ))}
      </div>
    </Frame>
  )
}
