# Student workspace surface contract

This is an ordinary extension of TRACE. `DESIGN.md` remains the authoritative visual system; neither it nor `.impeccable/design.json` is changed. Implementation sources are `src/StudentWorkspace.tsx`, `src/student.ts`, `src/student.css`, `src/ProfileSwitch.tsx`, and the role switch in `src/App.tsx`.

## Profile, workspace, and shared shell

The bottom sidebar profile opens a native dialog with 강병준 (instructor) and 유송민 (student, team 1). Switching to 유송민 mounts the student workspace; switching back restores the instructor App context. These are demonstration profiles, not authenticated accounts. The student starts on the team dashboard each time the workspace mounts. The role itself is not persisted across reloads.

Reuse the instructor shell: TRACE wordmark, deep green sidebar, charcoal active navigation, mint accents, warm gray canvas, white bordered rounded panels, Korean sans typography, shared primary/secondary buttons, visible focus, and the existing collapse/mobile drawer behavior. Change navigation content for the role without creating another visual identity. The workspace chooser enables **2학년 네트워크 실습** only. **융합 팀 프로젝트** is a non-interactive future-scenario notice.

Student content uses 22px panel/grid gaps, generally two columns, with wider main columns for the console and conversations. At 1250px gaps tighten; at 900px the main content grids stack; at 600px the overview, chat aside, and feedback columns stack and controls wrap. The console uses a dark, monospace surface to distinguish simulation output. Labels, written status, numeric counts, and accessible SVG descriptions supplement categorical colors. No new global palette or decorative motion is introduced.

## Five student views

| View | Purpose and primary action |
| --- | --- |
| 팀 대시보드 | Current mission, five phases, progress, four team members and roles, next steps from prior feedback, current topology, and shared resources. Continue to the lab or open team chat. |
| 네트워크 실습 | Inspect the PC-A → R1 → R2 → PC-B topology, use the simulated device console, verify both directions, explain the judgment, and explicitly share evidence. |
| 팀 채팅 | Append a team-visible demo message, review shared resources, and return to the lab. Seeded teammate messages do not represent live participants. |
| 개인 AI 지원 | Ask a private question, choose L1–L4 guidance depth, read the scripted response, and return to perform the work. |
| 나의 학습 기록 | Compare task progress, revisit current/prior feedback, keep a personal checklist, inspect guidance counts, and connect observation, judgment, action, verification, and explanation. |

The scoped scenario is 2026 second-semester network fault diagnosis, team 1 with 유송민, 김민수, 이서연, and 박지훈. Other members' activities and earlier learning records are authored examples. This student workspace is not a live projection of instructor edits or a synchronized class database.

## Network simulation contract

PC-A is the headquarters host at `192.168.10.10`; PC-B is the branch host at `192.168.20.10`. R1 and R2 connect over `10.0.0.0/30`, using `10.0.0.1` and `10.0.0.2`. The seeded fault is R2's headquarters route pointing to `10.0.0.9`.

Supported commands are deliberately bounded:

- `show ip route` on R1 or R2 shows the scenario's static route. On a PC it asks the student to select a router.
- `show ip interface brief` shows router addresses and up/up states, or the two PC addresses when a PC is selected.
- On R2, `ip route 192.168.10.0 255.255.255.0 10.0.0.1` repairs the route and resets forward/reverse verification and the completion flag. Other route values or a different device do not alter configuration.
- On PC-A, `ping 192.168.20.10` verifies headquarters → branch; on PC-B, `ping 192.168.10.10` verifies branch → headquarters. Before the repair the result is 0/4; after it, 4/4 and the corresponding verification flag is set. Other device/target combinations receive an explanation.
- Unsupported commands receive visible guidance. Whitespace is normalized; this is a small exact-command simulation, not a general network interpreter.

No command executes on the operating system or real equipment. Device tabs and shortcuts support discovery without automatically completing the repair. Console output is limited to the latest 40 entries and is transient workspace state.

## Progress and evidence sharing

Progress reflects authored scenario milestones, not a grade: initial investigation 54%, repaired route 72%, both directions verified 88%, and evidence shared 100%. The five phases are problem understanding, cause analysis, configuration change, verification, and evidence sharing. The same state drives dashboard progress, member status, topology messaging, chat context, and the current-task learning record.

Sharing requires both successful directional checks and a nonblank explanation. The explicit **검증 근거 팀에 공유** action creates or replaces the named **양방향 복구 검증** resource with the verification results and the student's explanation, appends a team announcement, and marks the current demonstration complete. The resource opens from team materials and the student's learning record. Sharing is not an actual institution submission or instructor-grade update.

The explanation field is a draft until the share action copies it into the resource. Previously shared resources are snapshots; merely editing the explanation does not rewrite their content. Reapplying the route command requires new verification while retaining earlier materials. These distinctions must remain understandable if the sharing lifecycle is extended.

## Conversations and guidance

Team messages and private AI messages are separate arrays and appear only in their respective views. Navigating clears the unsent composer text so a private draft cannot accidentally become a team message. Explicit evidence sharing publishes only the evidence summary and explanation, not the private conversation. The instructor view does not render private message text.

This is UI and state separation in a local demo, not a server security boundary: both arrays exist in the same browser storage record. New team messages remain local; no real teammate receives them.

L1 **확인 질문**, L2 **탐색 방향 안내**, L3 **개념 힌트**, and L4 **도구 활용 힌트** describe help depth, not ability levels. A private submission appends the student's text and a prepared reply selected by level and whether both directions are verified. Replies guide observation, route comparison, concepts, and tools; after verification they prompt explanation and transfer to another condition. There is no model/API call or semantic analysis of the question. Per-level counts derive from the private response records, including the seeded example; frequency is explicitly not a score.

## Learning from prior work

The learning view includes seeded IP-address-design and VLAN-task completion bars alongside the current progress. Switching between current routing work and the prior VLAN task changes the strengths, feedback, and evidence-stage summary. Prior feedback calls out verification in only one direction. The dashboard carries that lesson into the next action, and three persistent personal checklist items encourage a written cause hypothesis, both directions of verification, and separation of an AI hint from the student's own judgment.

Current evidence status combines seeded observation/comparison records with actual demo repair, verification, and explanation state. Do not describe the initial records or feedback as newly inferred from command history. The evidence timeline is a state summary, not a timestamped event audit.

## Persistence and resources

`trace-student-yusongmin-v1` stores route/verification/completion flags, explanation, team/private messages, resources, and checklist selections in browser `localStorage`. Missing or unsuitable stored data falls back to the authored scenario. Mutations update the visible state and attempt to persist; storage failure shows a warning that reload may lose changes.

View selection, guidance selection, selected device, console output, unsubmitted command/message text, open dialogs, and history selection are transient. Persisted learning state reloads after returning from the instructor profile; transient controls restart.

Resource dialogs show seeded mission/configuration/failure content and explicitly shared evidence. Adding a file registers its **name only**, with a generated explanatory placeholder. File contents are not read, parsed, uploaded, or available as a download. This does not provide cloud file sharing.

## Incumbent comparison

The extension retains TRACE's navigation proportions, reference palette, Korean labels, flat rounded panels, categorical learning accents, and local-demo boundary. New topology, console, messaging, and reflection compositions are student-surface patterns, not changes to the global design system. The five student views are distinct from the instructor's assignment preview and retain their own demonstration state.
