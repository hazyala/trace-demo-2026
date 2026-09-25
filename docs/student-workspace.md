# Student workspace surface contract

This is an ordinary extension of TRACE. `DESIGN.md` remains the authoritative visual system; neither it nor `.impeccable/design.json` is changed. Implementation sources are `src/StudentWorkspace.tsx`, `src/student.ts`, `src/student.css`, `src/ProfileSwitch.tsx`, `src/TeamDocuments.tsx`, the role switch in `src/App.tsx`, shared modal styles in `src/app.css`, and the connected summary in `src/TeachingWorkspace.tsx`.

## Profile, workspace, and shared shell

The bottom sidebar profile opens an anchored upward dropdown with 강병준 (instructor) and 유송민 (student, team 1). The workspace trigger opens its dropdown below the control. Both use labeled buttons with `aria-expanded`, a labeled region, native keyboard-operable options, outside-pointer dismissal, and Escape dismissal that returns focus to the trigger. Profile choices expose the current selection with `aria-pressed`; these are dropdown disclosures, not modal dialogs or ARIA menus. Switching to 유송민 mounts the student workspace; switching back restores the instructor App context. These are demonstration profiles, not authenticated accounts. The student starts on the team dashboard each time the workspace mounts. The role itself is not persisted across reloads.

Reuse the instructor shell: TRACE wordmark, deep green sidebar, charcoal active navigation, mint accents, warm gray canvas, white bordered rounded panels, Korean sans typography, shared primary/secondary buttons, visible focus, and the existing collapse/mobile drawer behavior. Change navigation content for the role without creating another visual identity. The workspace chooser enables **2학년 네트워크 실습** only. **융합 팀 프로젝트** is a disabled future-scenario option.

Student content uses 22px panel/grid gaps, generally two columns, with wider main columns for the console and conversations. At 1250px gaps tighten; at 900px the main content grids stack; at 600px the overview, chat aside, and feedback columns stack and controls wrap. The console uses a dark, monospace surface to distinguish simulation output. Labels, written status, numeric counts, and accessible SVG descriptions supplement categorical colors. No new global palette or decorative motion is introduced.

## Six student views

| View | Purpose and primary action |
| --- | --- |
| 팀 대시보드 | Current mission, five phases, progress, four team members and roles, next steps from prior feedback, current topology, and shared resources. Continue to the lab or open team chat. |
| 네트워크 실습 | Inspect the PC-A → R1 → R2 → PC-B topology, use the simulated device console, verify both directions, explain the judgment, and explicitly share evidence. |
| 팀 자료 | Search and filter resources, create/edit team documents, attach local files, download, and share a clickable resource in team chat. |
| 팀 채팅 | Append a team-visible demo message, review shared resources, and return to the lab. Seeded teammate messages do not represent live participants. |
| 개인 AI 지원 | Ask a private question, describe observations and attempts, read the automatically selected scripted response, and return to perform the work. |
| 나의 학습 기록 | Compare task progress, revisit current/prior feedback, keep a personal checklist, revisit private dialogue, and connect observation, judgment, action, verification, and explanation. |

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

Sharing requires both successful directional checks and a nonblank explanation. The explicit **검증 근거 팀에 공유** action creates or replaces the named **양방향 복구 검증** resource with the verification results and the student's explanation, appends a team announcement, and marks the current demonstration complete. The generated resource carries stable ID `network-verification`, so renaming it in the document editor preserves its learning-record link and subsequent evidence sharing updates the same resource while retaining its current name. Legacy records can still be found by the original title. The resource opens from team materials and the student's learning record. Sharing is not an actual institution submission or instructor-grade update.

The explanation field is a draft until the share action copies it into the resource. Previously shared resources are snapshots; merely editing the explanation does not rewrite their content. Reapplying the route command requires new verification while retaining earlier materials. These distinctions must remain understandable if the sharing lifecycle is extended.

## Conversations and guidance

Team messages and private AI messages are separate arrays and appear only in their respective views. Navigating clears the unsent composer text so a private draft cannot accidentally become a team message. Explicit evidence sharing publishes only the evidence summary and explanation, not the private conversation. The instructor view does not render private message text.

This is UI and state separation in a local demo, not a server security boundary: both arrays exist in the same browser storage record. New team messages remain local; no real teammate receives them.

Students no longer see or select L1–L4 labels, response badges, or level-count charts. The private support aside prompts them to describe observations, attempts, and surprises, and shows current practice status. A private submission appends the question and a prepared reply. `selectGuidanceLevel` deterministically selects internal metadata: verified work receives level 1; otherwise tool/command keywords select level 4, conceptual keywords level 3, exploration/comparison keywords level 2, and the fallback is level 1. The first matching rule wins. This is a scripted keyword classifier with a verification-state check, not model inference or production AI policy enforcement.

The internal categories remain confirmation questions, exploration direction, concept hints, and tool hints. The instructor evaluation view includes a read-only **학생 워크스페이스 지원 요약 · 유송민** disclosure with counts for each category. `readStudentGuidanceSummary` counts stored AI responses only, including the seeded response. `connectedGuidance` reads a snapshot when TeachingWorkspace mounts; it is not a continuously synchronized feed. No raw private question or response is shown to the instructor. Counts describe support use, not ability or grades.

## Learning from prior work

The learning view includes seeded IP-address-design and VLAN-task completion bars alongside the current progress. Switching between current routing work and the prior VLAN task changes the strengths, feedback, and evidence-stage summary. Prior feedback calls out verification in only one direction. The dashboard carries that lesson into the next action, and three persistent personal checklist items encourage a written cause hypothesis, both directions of verification, and separation of an AI hint from the student's own judgment.

Current evidence status combines seeded observation/comparison records with actual demo repair, verification, and explanation state. Do not describe the initial records or feedback as newly inferred from command history. The evidence timeline is a state summary, not a timestamped event audit.

## Persistence and resources

`trace-student-yusongmin-v1` stores route/verification/completion flags, explanation, team/private messages, resources, and checklist selections in browser `localStorage`. Missing or unsuitable stored data falls back to the authored scenario. Mutations update the visible state and attempt to persist; storage failure shows a warning that reload may lose changes.

View selection, selected device, console output, unsubmitted command/message text, open disclosures/dialogs, document edit fields, search/filter selection, and history selection are transient. Persisted learning state reloads after returning from the instructor profile; transient controls restart.

Resources now include seeded mission/configuration/failure records, a report draft, meeting notes, a verification checklist, address notes, and explicitly shared evidence. `resourceSchema: 2` migrates older stored records by retaining their resources and appending missing seeded items by name. Already-migrated resources are not repeatedly reseeded. Migration occurs on read and is persisted with a subsequent state update.

### Team documents and attachments

The team-materials view provides title/author/body search and four filters: all, documents (resources without a data URL), attached files, and verification materials (matching the resource kind). A table shows type, author, modification date, and version, with an empty-state message for no matches.

A centered document dialog supports creation and editing with required title and body. New documents start at v1; edits preserve the resource ID, kind, and other existing metadata while replacing its title/body, incrementing its version number, and updating author/date metadata. Versions are counters, not retained historical revisions. Text resources can be edited and downloaded as `.txt`; attachments retain their original name and locally encoded bytes for download and do not offer text editing.

Multiple selected files are read with FileReader into data URLs and added as attachments. Each file is limited to 2 MiB; the proposed entire serialized student record must remain at or below 3,800,000 JavaScript string characters. This is an approximate local-storage budget, not a 3.8 MB raw-file allowance. Read failures and budget violations show an error. Browser storage failure still follows the visible-state warning described above. No server upload, content parsing, collaborative editing, or cross-device synchronization is implemented.

Sharing a material appends a team-chat message with its resource index and navigates to team chat. A clickable document card opens that resource's current contents; it is not a frozen version attachment. The chat composer offers a route to the materials view for sharing. The lab's evidence-share announcement remains plain text; the evidence itself opens through the materials list and learning record. Private dialogue is never attached by these actions.

## Incumbent comparison

The extension retains TRACE's reference palette, Korean labels, flat rounded panels, categorical learning accents, and local-demo boundary. The six student views are distinct from the instructor assignment preview and retain their own demonstration state. Student navigation rows are locally compacted to accommodate the additional materials view, with tighter spacing on short screens.

There are now shared implementation changes worth recording: App and student controls use Lucide icons for consistent strokes, with decorative student icons hidden from assistive technology. Anchored sidebar dropdowns use a white bordered panel with a restrained overlay shadow. `src/app.css` now supplies a global `dialog:modal` base: centered fixed placement, 24px rounded corners, 28px padding, a thin border, viewport bounds, scrollable overflow, the established dialog shadow, and a dim backdrop. At 600px the dialog treatment reduces to 20px corners and 22px padding. Native modal documents retain their close controls and Escape handling; profile and workspace selectors use the separate anchored disclosure pattern.

These corrections preserve the existing palette and flat ordinary panels but broaden the shared icon and overlay implementation. This surface document records the explicit shared-component exceptions to the incumbent description: Lucide icons, anchored dropdown overlays, and the consolidated modal base. `DESIGN.md` and `.impeccable/design.json` remain untouched; a future global documentation refresh should reconcile those entries without replacing the established palette or ordinary-panel rules.
