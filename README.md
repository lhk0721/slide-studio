# slide-studio

발표자료(PPT)를 **웹 프로그래밍으로** 만드는 도구. PowerPoint 대신 React 컴포넌트로 슬라이드를 작성하고, 4K PNG로 내보내 발표/배포한다.

- 슬라이드 = JSX 컴포넌트 (`SlideNN.jsx` + `SlideNN.module.css`)
- 발표자료 1건 = **세션(session)** 하나
- 모든 세션은 **단일 Vite 앱**(`app/`) 안에서 라우팅된다 (`/:sessionId/:slideId`)

## 구조

```
slide-studio/
├─ app/                          # 단일 Vite React 앱 (모든 발표자료가 여기 라우팅됨)
│  ├─ index.html
│  ├─ package.json
│  ├─ vite.config.js
│  └─ src/
│     ├─ main.jsx · App.jsx      # 라우터: / (세션 목록), /:sessionId/:slideId
│     ├─ tokens.css · shared.css # 공통 디자인 토큰 / 슬라이드 공통 클래스
│     ├─ components/             # Deck · SlideNav · ExportControls · Home (세션 공용)
│     ├─ utils/exportSlides.jsx  # 슬라이드 → 4K PNG / ZIP 내보내기 (세션 인자로 받음)
│     └─ sessions/
│        ├─ index.js             # 세션 레지스트리 (새 발표자료를 여기 등록)
│        ├─ inbody-u300/         # 세션: InBody U+300 피치덱
│        │  ├─ slides/  (SlideNN.jsx + index.js)
│        │  └─ assets/  (이미지)
│        └─ financial-market/    # 세션: 금융시장·금융기관 발표 (작성 예정)
│           ├─ slides/
│           └─ assets/
├─ docs/                         # 전 과정 추적 (세션 진행 + 이슈 단위 작업 로그)
├─ scripts/                      # 커밋/푸시/관리문서 검증 스크립트 (PowerShell)
└─ .githooks/                    # commit-msg · pre-commit · pre-push 훅
```

`docs/`의 두 축:
- `docs/sessions/<id>/` — 발표자료(세션) 단위의 기획·진행 추적
- `docs/issues/<type>/` — 커밋 단위 작업(이슈) 추적 (관리 문서)

자세한 추적 구조는 `docs/README.md` 참고.

## 실행

```bash
cd app
npm install
npm run dev      # 개발 서버 — 브라우저에서 세션 선택
npm run build    # dist/ 로 정적 빌드
```

- 세션 목록: `/`
- 특정 덱: `/inbody-u300/1`, `/financial-market/1`
- 키보드 ← → 로 슬라이드 이동
- 우하단 컨트롤로 현재 슬라이드 또는 전체 덱을 4K PNG(3840×2160)로 내보내기 (전체는 ZIP)

## 새 발표자료(세션) 추가

1. `app/src/sessions/<new-id>/slides/` 에 `SlideNN.jsx` + `SlideNN.module.css` + `index.js` 작성
2. `app/src/sessions/<new-id>/assets/` 에 이미지 배치 (`import x from '../assets/...'`)
3. `app/src/sessions/index.js` 레지스트리에 세션 한 줄 등록
4. `docs/sessions/<new-id>/README.md` 로 진행을 추적

## 에이전트 워크플로

이 레포는 에이전트 협업을 전제로 한다. 에이전트는 `AGENTS.md` → `docs/agent-workflow/` 순으로 읽고, 파일 변경 전 관리 문서 게이트를 적용한다. 사람이 작업할 때도 같은 규칙을 권장한다.
