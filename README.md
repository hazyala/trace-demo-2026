# TRACE Demo 2026

교육장비 시스템의 교수자·학생 사용 흐름을 보여주는 한국어 UI 데모.

## 개발

Node.js 22.18.0 (`nvm use`), npm 사용.

```sh
npm ci
npm run dev
```

http://localhost:5173 에서 확인. 개발환경 확인용 시작 페이지만 있으며 실제 과제 생성보드는 다음 작업이다.

```sh
npm run check        # 타입, lint, 배포 빌드
npm run dev:tablet   # 같은 Wi-Fi 태블릿에서 Mac의 LAN IP:5173으로 접속
npm run preview     # 빌드 결과 확인
```

태블릿 접속은 로컬 네트워크/방화벽 허용이 필요하다. 기본 dev는 로컬 컴퓨터에만 공개한다.

## 구성

React + TypeScript + Vite, Tailwind CSS, shadcn/ui, Lucide, Motion.
Motion Primitives는 필요한 컴포넌트를 선택해서 추가하는 방식이므로 아직 별도 복사하지 않았다.
`@/`는 `src/` 경로. `components.json`은 shadcn 설정.

- `src/`: 앱 코드
- `docs/references/`: 사용자 제공 UI 이미지
- `PRODUCT.md`, `docs/design-brief.md`: 범위와 시각 기준
- `.agents/skills/`: 프로젝트 전용 Ponytail, Impeccable 원본 스킬

UI는 데스크톱 및 태블릿을 대상으로 한다. 현대 브라우저 기준이며 Tailwind v4 사용으로 Safari 16.4+, Chrome 111+, Firefox 128+를 기준으로 한다.
Ponytail은 구현 단순화, Impeccable은 디자인 판단·검토에 사용한다. 사용자 레퍼런스가 우선이다.
스킬은 프로젝트를 여는 다음 에이전트 턴에서 발견할 수 있다. 로더 실행이 필요하면 `sh .agents/skills/impeccable/scripts/impeccable context`를 사용할 수 있다.

## Git

Remote: https://github.com/hazyala/trace-demo-2026.git
작업 브랜치: dev

실제 로그인·서버·AI API는 아직 연결하지 않았다. 민감한 키는 커밋하지 않는다.
