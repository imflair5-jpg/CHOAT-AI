# CHOAT-AI

AI를 처음 써보는 사람도 부담 없이 고를 수 있도록, 검증된 AI 도구를 카드로 정리한 디렉토리 사이트입니다. 카테고리별로 훑어보거나 검색해서 원하는 도구를 찾을 수 있습니다.

## 주요 기능

- **도구 카드 목록** — 이름, 한 줄 소개, 난이도(입문/보통), 가격 유형(무료/부분유료/유료)을 카드로 표시
- **카테고리 필터** — 글쓰기/문서, 검색/리서치, 이미지 생성, 코딩, 생산성/자동화
- **검색** — 이름, 한 줄 소개, 태그 기준 검색
- **도구 상세 페이지** (`/tools/[slug]`) — 도구별 상세 정보와 Open Graph 이미지 자동 생성

## 기술 스택

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS 4](https://tailwindcss.com)

## 시작하기

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 확인할 수 있습니다.

### 그 외 스크립트

```bash
npm run build   # 프로덕션 빌드
npm run start   # 프로덕션 서버 실행
npm run lint    # ESLint 검사
```

## 프로젝트 구조

```
data/
  categories.json   # 카테고리 정의
  tools.json        # 도구 데이터
src/
  app/
    page.tsx                    # 메인 페이지
    tools/[slug]/page.tsx       # 도구 상세 페이지
    tools/[slug]/opengraph-image.tsx
  components/
    ToolBrowser.tsx   # 검색/필터 UI
    ToolCard.tsx       # 도구 카드
  lib/
    tools.ts          # 데이터 조회/검색 유틸
  types/
    tool.ts           # Tool, Category 타입 정의
```

## 도구 데이터 추가하기

`data/tools.json`에 아래 형식으로 항목을 추가합니다.

```json
{
  "id": "tool-id",
  "name": "도구 이름",
  "oneLiner": "한 줄 소개",
  "categoryId": "writing",
  "difficulty": "입문",
  "priceType": "무료",
  "priceNote": "선택 사항",
  "url": "https://example.com",
  "logoEmoji": "🤖",
  "tags": ["태그1", "태그2"],
  "featured": false,
  "addedAt": "2026-01-01"
}
```

`categoryId`는 `data/categories.json`에 정의된 카테고리 `id` 중 하나여야 합니다.
