# TRACE

<!-- impeccable:product-schema 1 -->

## Platform
web

## Stack
Delegated by user: choose appropriate language and environment. React + TypeScript + Vite for a lightweight interactive UI demo, with npm.

## Users
교수자, 학생 팀, 학생 개인.

## Product Purpose
교육장비 시스템을 어떻게 사용하는지 설득력 있게 보여주는 UI 데모. 완전한 백엔드보다 일관된 시나리오와 구체적인 예시 콘텐츠가 중요하다.

## Capabilities and Constraints
필요한 화면은 교수자 대시보드, 교수자 프로젝트·과제 생성보드, 교수자 학생별 평가 지원보드, 학생 팀 대시보드, 학생 개인 채팅·학습 지원보드의 다섯 개다.
초기 개발 대상은 3단계 과제 생성보드였으며, 현재 교수자 대시보드·과제 생성·평가 지원·팀 모니터링·과목 설정과 학생의 여섯 화면을 제공한다. 네트워크 실습과 융합 팀 프로젝트는 같은 역할별 사이드바·내비게이션·화면·카드·입력폼에 서로 다른 데이터를 넣는 시나리오이다. 학생 프로젝트 작업실은 두 시나리오 모두 기획·기술 선택 / 수행 보드 / 실행 및 검증의 세 탭을 사용한다. 이전 학기·다른 교과·새로 탐색할 지식 연결도 공통 기능이다. 과목·과제·평가·학생 프로젝트 저장은 시나리오별로 분리한다. 개인 AI 대화 원문은 교수자에게 표시하지 않고 가이던스 요약과 명시적으로 공유한 요청·수행 근거만 제공한다.
데스크톱과 태블릿 웹을 지원한다. 예시 과제·대화·평가 근거는 가상 데이터로 연결한다.
실제 인증, 데이터베이스, 실제 AI API, 배포 대상은 아직 확정하지 않았다.

## Brand Commitments
TRACE 이름과 사용자가 첨부한 UI 및 사이드바 레퍼런스를 따른다. 한국어 UI.

## Evidence on Hand
사용자 제공 이미지: docs/references/dashboard.png, docs/references/sidebar.png.
교내 네트워크 장애 진단·복구와 AI 프로그램 기획·제작은 UI 시연용 가상 데이터이다. 실제 AI 호출 없이 예시 목표와 질문 맥락에 따른 가이던스를 제공한다. 실행·검증 화면은 정의된 명령과 요청에만 응답하는 모의 환경이며 실제 장비·코드·API 실행이나 자동 채점을 뜻하지 않는다.
