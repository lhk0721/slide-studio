# Slide JSX 작성 규칙

대상: `app/src/sessions/<session-id>/slides/` 의 슬라이드 컴포넌트(`SlideNN.jsx` + `SlideNN.module.css`).

## Document Relations

- Parent: `docs/agent-workflow/README.md`
- 이 문서는 덱 슬라이드 컴포넌트의 작성/스타일 규칙만 다룬다. 워크플로·git 규칙은 형제 문서를 따른다.

## 세션 구조 규칙

- 발표자료 1건 = 세션 1개. 세션은 `app/src/sessions/<id>/` 아래 `slides/`(컴포넌트)와 `assets/`(이미지)로 구성된다.
- 슬라이드 순서는 `slides/index.js` 의 배열로 정의하고, 세션은 `app/src/sessions/index.js` 레지스트리에 등록한다.
- 공용 디자인 토큰은 `app/src/tokens.css`, 공통 슬라이드 클래스는 `app/src/shared.css` 를 우선 재사용한다. 슬라이드 고유 스타일만 `SlideNN.module.css` 에 둔다.
- 이미지는 같은 세션의 `assets/` 에서 `import x from '../assets/<file>'` 패턴으로 불러와 `<img>` 로 렌더한다(전신/도식은 `object-fit: contain`).

## 줄바꿈(`\n`) 규칙 — 필수

슬라이드 본문 데이터(문자열 배열/객체)에 넣은 `\n`이 **화면에서 실제 줄바꿈으로 보이게** 하려면, 그 텍스트를 렌더하는 CSS 클래스에 반드시 `white-space: pre-line` 을 둔다.

이유:
- JSX 문자열 안의 `\n` 은 기본적으로 일반 공백으로 접혀(collapse) 렌더된다. `<br/>` 없이 줄을 나누려면 CSS가 개행 문자를 보존해야 한다.
- `pre-line` 은 **`\n` 만 줄바꿈으로 처리**하고, 연속 공백·들여쓰기는 한 칸으로 접는다. 그래서 데이터 문자열의 들여쓰기/정렬 공백이 화면에 새어 나오지 않는다.
- `word-break: keep-all`(자동 줄바꿈, 한국어 단어 보존)과 **함께** 쓸 수 있다. 둘은 충돌하지 않는다.

### 적용 방법

본문 텍스트를 렌더하는 클래스에 두 속성을 같이 둔다:

```css
.someText {
  word-break: keep-all;   /* 자동 줄바꿈은 단어 단위로 */
  white-space: pre-line;  /* 데이터의 \n 을 실제 줄바꿈으로 */
}
```

```jsx
const items = [
  '첫 줄\n둘째 줄',   // ← 화면에서 두 줄로 보임
]
// ...
<div className={styles.someText}>{item}</div>
```

### 점검 체크리스트

- 새 슬라이드에서 사용자가 데이터에 `\n` 을 넣을 수 있는 본문/리스트/카드 텍스트 클래스에는 처음부터 `white-space: pre-line` 을 넣는다.
- 단, 다음은 `pre-line` 대상이 아니다:
  - 한 줄 고정이 의도인 캡션/라벨 → `white-space: nowrap`.
  - 짧은 제목/카테고리 라벨 → 기본값 유지.
- `<br/>` 강제 줄바꿈은 지양한다. 줄 위치는 데이터(`\n`)로 제어하고, 표시 여부는 CSS로 제어한다.

## 내보내기(Export) 호환 규칙

- 슬라이드는 1280×720 프레임 기준으로 디자인한다. 내보내기는 이 프레임을 3배(기본)로 래스터화해 4K PNG를 만든다.
- SVG의 fill/stroke/dash 등 표현 속성은 클래스로 줘도 되지만, 내보내기 시 계산된 스타일을 inline 으로 복사하므로(`utils/exportSlides.jsx`) 클래스 기반 SVG 스타일도 PNG에 보존된다.
- 폰트는 Pretendard variable 을 내보내기 시 data URL 로 임베드한다. 한글 글리프가 깨지지 않으려면 본문 폰트를 임의 교체하지 말고 토큰 폰트 스택을 유지한다.
