# [CHORE] Bootstrap slide-studio repository
Parent: #<issue-number>

## Document Relations
- This document tracks the repository bootstrap work unit.
- Keep this file name aligned with the issue branch name (`1-chore-bootstrap-slide-studio`).
- Update this document before each related commit.

## Summary
slide-studio 레포를 부트스트랩한다. PowerPoint 대체용 "코드로 만드는 발표 덱" 도구로, 단일 Vite React 앱 + 세션별 슬라이드 디렉토리 구조를 확립한다. rack-tracker 프로젝트에서 축적한 agent/문서 워크플로 자산을 새 레포 모델(단일 `main`, `docs/issues/`, `app/src/sessions/`)에 맞게 이식한다. InBody U+300 피치덱을 첫 세션으로 옮기고, 금융시장 발표용 세션을 신설한다.

## Goal
- 단일 앱 + 멀티 세션 구조의 동작하는 React 앱(`app/`).
- InBody 피치덱을 `inbody-u300` 세션으로 무손실 이식(슬라이드 17장 + 이미지).
- `financial-market` 세션 골격 신설.
- agent/문서 워크플로 자산(워크플로 규칙, 관리문서 구조, 스크립트, githooks) 이식 및 적응.

## Scope
- `app/`: 단일 Vite 앱. 세션 레지스트리, 세션 인지형 Deck/Export, 세션 선택 Home.
- `app/src/sessions/inbody-u300/`: rack-tracker `slides-react` 에서 슬라이드/이미지 이식, import 경로 재작성.
- `app/src/sessions/financial-market/`: placeholder 타이틀 슬라이드.
- `docs/`: agent-workflow 7문서, repository-layout, issues 홈, sessions 추적.
- `scripts/` + `.githooks/`: commit-msg/management-doc/push 검증 (rack-tracker 전용 requirements-doc-pairs 체크는 제외).

## Out Of Scope
- 금융시장 발표 실제 콘텐츠 작성.
- 슬라이드 자동 생성 파이프라인(추후 자동화 목표).
- InBody 자산의 외부 공개 라이선스 검토.

## Done Criteria
- `cd app && npm install && npm run build` 성공.
- `/`, `/inbody-u300/1`, `/financial-market/1` 라우팅 동작.
- 워크플로 문서가 단일 `main` 모델과 `docs/issues/` 경로로 일관됨.

---

## Work Log

### chore: bootstrap slide-studio repository (#<issue-number>)

> 레포 초기 구조, 단일-앱 멀티-세션 React 앱, InBody 세션 이식, 워크플로 자산 이식을 한 번에 부트스트랩.

#### Changes
- `app/`: 단일 Vite React 앱 골격. `sessions/index.js` 레지스트리, `App.jsx` 멀티-세션 라우터(`/:sessionId/:slideId`), 세션 인지형 `Deck.jsx`·`utils/exportSlides.jsx`·`ExportControls.jsx`, 세션 선택 `Home.jsx`.
- `app/src/sessions/inbody-u300/`: rack-tracker `slides-react` 슬라이드 17장 + 이미지 이식, 이미지 import 경로 `../../../Images/` → `../assets/` 재작성.
- `app/src/sessions/financial-market/`: placeholder 타이틀 슬라이드 + 레지스트리 등록.
- `docs/`: agent-workflow 7문서·repository-layout·issues 홈·sessions 추적을 단일 `main`/`docs/issues`/`app/src/sessions` 모델로 적응.
- `scripts/`·`.githooks/`: commit-msg/management-doc/push 검증 이식(단일 `main` 보호), rack-tracker 전용 requirements-doc-pairs 체크 제외.
- `AGENTS.md`·`CLAUDE.md`·`README.md`·`.gitignore` 신설.

#### Verification
- `npm install` + `npm run build` 성공 (112 modules, 모든 이미지 경로 해소).

#### Notes
- rack-tracker 의 fork/upstream/`develop` 모델은 단독 레포 현실에 맞지 않아 단일 `origin`/`main` 모델로 적응.

---

## Management Notes

### Follow-up Candidates
- 금융시장 발표 메시지 아크 설계 및 슬라이드 작성(별도 이슈).
- 슬라이드 생성/내보내기 자동화(별도 이슈).
- 세션별 테마 토큰 override 구조 정리.

### References
- 출처 레포: rack-tracker (`docs/etc/business-plan/pitch-presentation/u+300/slides-react`).
