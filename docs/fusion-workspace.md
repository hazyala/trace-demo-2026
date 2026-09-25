# Fusion scenario within the shared workspace

Network and fusion are data variants of the same per-role interface. A workspace choice changes course, assignment, team, task, knowledge, and simulation data; it does not select a different sidebar, navigation hierarchy, screen, card family, or form. `src/scenarios.ts` owns the scenario selection. The former `FusionWorkspace.tsx` is removed.

## Direction and visual authority

**THESIS:** Operate. Connect prior knowledge to a new learning need, a small experiment, applied evidence, and professor judgment.

**OWN-WORLD:** Preserve TRACE's existing green navigation, charcoal active states, warm gray canvas, white rounded panels, mint actions, Korean typography, and labeled categorical colors.

**STORY:** Students explain what they know, what they need, what they tried, and what the results support. Teachers compare shared evidence before recording a judgment.

**FIRST VIEWPORT / FORM:** Use the same composition for each corresponding role and route in both scenarios. The existing rich teacher dashboard, monitoring, evidence review, settings, and three-step assignment form are shared. The student dashboard and three-tab studio also share one implementation.

This is a common-contract correction, not a new visual system. `DESIGN.md` and `.impeccable/design.json` remain authoritative and unchanged. No new raster asset is introduced. Test execution and the finish review are separate validation deliverables; this document does not claim to perform them.

## Shared routes and components

`WorkspaceSidebar` uses the same `navigation.ts` definitions for both scenarios. Teacher routes are 수업 대시보드, 프로젝트 · 과제 생성, 학생별 평가 지원, 팀별 모니터링, and 과목 설정. `CourseDashboard`, `TeachingWorkspace`, `EvidenceReview`, and `CourseSettings` retain their complete chart, evidence, guidance, and editing surfaces. The shared assignment sequence is 과제 설계 → AI 운영 방식 → 학생 미리보기.

`StudentWorkspace` provides 팀 대시보드, 프로젝트 작업실, 팀 자료, 팀 채팅, 개인 AI 지원, and 나의 학습 기록. Its studio always contains 기획·기술 선택, 수행 보드, and 실행 및 검증. `ProjectSimulation` changes bounded commands and conditions from scenario data while keeping the same execution/checking form. See [the student contract](student-workspace.md) for detailed behavior.

Switching workspaces retains the active role, teacher/student route, assignment step, settings category, and studio tab during the current session. Saved records load from the selected scenario. Uncommitted form drafts and transient simulation results are not promised across workspace switching or reload.

## Open brief and data examples

Teams plan and build an AI-assisted program for a real user problem, choose topic/language/framework/tools, connect previous or other coursework, and explain how new learning was applied. Tool count is not achievement.

The shared teacher scenario has 24 illustrative students across six teams. Fusion supplies these program contexts:

| Team | Program | Connected knowledge |
| --- | --- | --- |
| 1 | 캠퍼스 길잡이 | Database, web, information ethics |
| 2 | 공유물품 연결소 | Mathematics, database, user research |
| 3 | 학습 회고 노트 | Education, statistics, web |
| 4 | 급식 수요 예측 | Probability/statistics, data analysis |
| 5 | 접근성 안내 도우미 | UX, accessibility, programming |
| 6 | 에너지 사용 리포트 | Physics, statistics, visualization |

The interactive student profile is 유송민 in team 1. Other students and teams use authored examples; they are not concurrent participants or six implemented programs. Teacher approval examples follow the common monitoring flow, including team 3's pending situation under approval mode.

`KnowledgeConnections` serves both scenarios. Each row includes learning source, existing knowledge, new learning need, application/checking action, and status. The shared assignment design, student plan, and learning record can add connections. Teacher team detail and evidence review show the same component with the relevant team context. Adding a row is local record keeping, not automatic curriculum analysis.

## Simulation, guidance, and assessment

Fusion's common execution panel recognizes schema/status requests and tests for registered questions, missing evidence, and personal information. Students enable abstention and masking rules, run all three checks, and explain their judgment before sharing. Changing a rule clears current checks. These are authored response rules with fictional data; no program, model, API, or security guarantee is executed or verified.

Private AI dialogue stays in the student interface. Teachers see guidance level/topic/time summaries, explicit shared requests, saved performance evidence, and subsequent behavior. They do not see private message text. This is a local UI/state boundary, not authenticated access control. AI guidance and provisional criterion estimates are clearly simulation examples; missing evidence remains pending and teachers make the assessment judgment.

The common fusion assignment defaults allocate 20/30/20/20/10 across problem understanding, knowledge connection/problem-solving process, verification, output, and collaboration. The shared three-step form can edit criteria and validates positive weights totaling 100. Assessment uses a common point axis and cap markers, with linked evidence and professor review; technology choice and support frequency are not grades.

## Isolated persistence

`workspaceKey(id, key)` preserves the network key and prefixes fusion keys with `fusion-`. This isolates course settings (`trace-course-v1`), assignment drafts (`trace-assignment-v1`), ongoing teaching snapshots (`trace-teaching-assignment`), student reviews (`trace-reviews`), and evidence checks (`trace-evidence-checks`). Project records use `trace-project-network-v2` and `trace-project-fusion-v2`.

Project records contain the saved plan, knowledge connections, completed tasks, evidence, materials, separate team/private conversations, guidance summaries, explicit requests, and shared teacher feedback. `readProject` can import legacy `trace-student-yusongmin-v1` and `trace-fusion-workspace-v1` data when the current record is absent. Legacy keys are migration inputs, not the current write targets.

Team-1 teacher guidance and saved feedback for 유송민 appear in that scenario's student views. Approval decisions remain session state. There is no institutional delivery, server synchronization, real authentication, actual AI service, or deployed student program. Failed browser persistence produces a visible warning and may leave changes available only in the current screen.

## Documentation evidence

The common contract was compared against `App.tsx`, `WorkspaceContext.tsx`, `WorkspaceSidebar.tsx`, `navigation.ts`, `scenarios.ts`, `StudentWorkspace.tsx`, `ProjectSimulation.tsx`, `KnowledgeConnections.tsx`, and the existing teacher/course components. Existing CSS and token documents remain the visual authority; reused `fusion-*` class names describe composition, not a separate product identity. No palette or typography token change was made for this correction.
