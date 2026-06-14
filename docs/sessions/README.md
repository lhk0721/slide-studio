# Sessions — 발표자료별 진행 추적

발표자료(덱) 1건 = 세션 1개. 각 세션의 기획·메시지·슬라이드 구성·진행 상태를 추적한다.

## 규칙

- 세션 `id` 는 코드(`app/src/sessions/<id>/`)와 추적(`docs/sessions/<id>/`)에서 동일하게 쓴다.
- 세션마다 `docs/sessions/<id>/README.md` 를 두고, 다음을 기록한다:
  - 목적/청중, 핵심 메시지 아크
  - 슬라이드별 구성과 상태(기획/작성/검토/완료)
  - 자산(이미지/데이터) 출처와 라이선스 메모
- 새 세션을 추가하면 `app/src/sessions/index.js` 레지스트리 등록과 이 디렉토리 추적 문서를 함께 만든다.

## 현재 세션

| id | 제목 | 상태 | 추적 문서 |
| --- | --- | --- | --- |
| `inbody-u300` | InBody · U+300 피치덱 | 이식 완료 (rack-tracker 출처) | `docs/sessions/inbody-u300/README.md` |
| `financial-market` | 같은 충격, 다른 실패 (미·한 피트니스 비교) | Phase 3 완료 · Phase 4(디자인) 진행 | `docs/sessions/financial-market/README.md` |
