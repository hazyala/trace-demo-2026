# Fusion workspace surface contract

This ordinary extension adds a teacher and student fusion-project scenario to TRACE. It preserves the incumbent system in `DESIGN.md` and `.impeccable/design.json`, with no new global tokens or visual world. Sources checked: `PRODUCT.md`, `DESIGN.md`, the Impeccable document reference, `docs/student-workspace.md`, `src/FusionWorkspace.tsx`, `src/fusion.ts`, `src/fusion.css`, and the App/profile/workspace integration.

## Direction contract

**THESIS:** Operate. Make the transfer from prior or other coursework to a new learning need, a small experiment, applied evidence, and professor judgment visible. The same open brief permits different team solutions; tool choice alone is not achievement.

**OWN-WORLD:** Existing TRACE green navigation, charcoal active states, warm gray canvas, white rounded panels, mint actions and progress, and labeled lavender/yellow/rose categories. Keep the Korean UI, shared sidebar, Lucide icons, and established dialogs.

**STORY:** Students connect what they know to what their project needs, test a bounded assumption, explain the result, and request guidance. Professors inspect the connection and individual evidence before recording judgment.

**FIRST VIEWPORT:** Persistent sidebar at left; heading and scenario context above a broad brief/phase panel. Its right edge holds the teacher's monitoring action or the student's progress ring and continue-studio action. Supporting operational panels follow in two columns.

**FORM:** Code-led scoped extension of the working TRACE shell. Existing operational composition is the form authority; no concept seed, generated seed key, or alternative visual-world selection is required.

**FINISH:** unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

The existing DESIGN.md satisfies visual authority for this extension. No new shipping raster is introduced. The finish review and test verdict are separate validation deliverables; this document does not claim to have run them.

## Open brief, different programs

The shared brief asks teams to plan and build an AI-assisted program for a real user problem, select their own topic/language/framework/tools, connect prior or other coursework, and record how new learning was applied. Teacher-defined common requirements concern user needs, a feasible minimum function, choice rationale, verification, and reflection.

| Team | Chosen solution | Teaching focus |
| --- | --- | --- |
| 1 · 캠퍼스 길잡이 | School-information assistant with source references; TypeScript/React and Python/FastAPI are the initial choices | Separate retrieval and evidence checking from answer generation; test absent evidence and personal information |
| 2 · 공유물품 연결소 | Material matching with explained conditions; Python/Streamlit/SQLite | Compare a simple quantity-based baseline before combining distance, quantity, and priority |
| 3 · 학습 회고 노트 | Reflection-question tool; TypeScript/React/Node.js | Compare learner explanations, distinguish AI language from personal reflection, and avoid generalizing a small sample |

The teacher scenario contains 12 students across three teams. The interactive student profile is 유송민 in team 1, responsible for API/data connection. Team 1 has live local-demo edits; team 2/3 program descriptions and most comparison data are seeded examples. Do not imply three fully implemented student workspaces.

## Routes and shared navigation

Both network and fusion are enabled workspace choices. App retains the current instructor/student role when switching workspaces. Fusion uses the same anchored workspace/profile disclosures and existing drawer/collapse behavior. Its teacher routes are dashboard, assignment design, evaluation support, team monitoring, and course settings. Student routes are team dashboard, project studio, team materials, team chat, private AI support, and learning record.

Teacher overview compares team progress and knowledge connections and links to concrete monitoring targets. Team 2 has a simulated approve/hold decision. Team 1 exposes its submitted guidance request, summarized AI support purpose, subsequent evidence, and teacher response. The selected student's evaluation links back to team monitoring.

## Planning, knowledge connections, and performance

The student can edit program name, audience, problem, minimum scope, language, front end, server/AI approach, collaboration tools, and the rationale connecting existing/new knowledge. Explicit save requires all fields, updates the saved plan, and adds an individual design-process evidence record.

Knowledge rows carry learning source, known concept, newly needed knowledge, application/checking action, and status. Seeded links span database study, current web programming, UX/communication, new AI/information-search learning, and information ethics. Teacher settings and student learning records can add a named area with its learning source and intended use. This is an editable connection list, not automated cross-course curriculum analysis.

The studio separates planning, a three-column performance board, and a bounded functional experiment. Six task IDs drive completion: problem definition, source schema, request/response contract, empty-result handling, boundary tests, and reflection. Saving a task requires a written action/result, marks the selected task complete, and adds evidence attributed to the current student. Progress is completed-task count divided by six, not a quality score or proof of execution. The board allows recording a selected seeded task regardless of its displayed owner; individual attribution must be assessed from the actual explanation.

## Prototype experiment and applied evidence

The functional experiment is a simulated campus-information response-rule test. It has three conditions:

- Registered question: returns an authored answer with a fictional source.
- Unknown question: passes only when the student enables abstention without source evidence.
- Personal-information question: passes only when the student enables masking of the example student number.

Changing either rule clears current test results. Sharing is disabled until all three conditions have been run successfully under the current rules and a nonblank reflection explains the applied concept and remaining checks. Sharing saves the experiment flag/reflection, marks the test task complete, adds an individual verification/reflection evidence record, and adds a team verification document. It does not execute source code, call an API, or establish a real privacy/security guarantee. Recording a board task separately is not equivalent to passing this experiment gate.

Evidence records contain title, detail, owner, learning source, assessment criterion, and illustrative time. They open in a shared-style modal from learning and evaluation views. Earlier authored records are distinguished by their scenario content; they are not inferred from newly executed code. Repeated saves can append evidence; this is not an immutable audit or deduplicated submission service.

## Contextual support and professor feedback

Student AI chat has no visible L1–L4 selector or labels. `fusionReply` uses ordered keyword rules for privacy, technology choice, source/absent-evidence questions, API/JSON connections, or a fallback clarifying question. Responses connect existing knowledge to a next small action. The classifier and replies are scripted examples, not a model service.

Private messages and team messages are separate arrays. Teacher monitoring receives only internal support level, topic/purpose, and time summaries; evaluation shows support counts and follow-up performance summaries. Neither teacher route renders raw private conversation. This is a UI/state boundary in a local browser record, not authenticated server access control. Other students without collected support records receive an explicit unavailable message rather than invented counts.

A student explicitly sends a guidance request describing the needed review. A teacher writes and sends a response from team-1 monitoring; sending clears the pending request and makes the response visible on the student dashboard, support view, and learning record. A later request marks the previous response as no longer the active response. Separately saved evaluation feedback for 유송민 appears in the learning record.

## Evidence-grounded assessment

The default rubric allocates 100 points across problem definition (20), knowledge connection/transfer (25), design/implementation process (25), verification/reflection (20), and collaboration (10). Assignment design allows names and weights to change, validating positive weights totaling 100 and a nonblank brief.

Every assessment bar uses the same absolute point axis, with a separate cap marker for the criterion weight. The axis is at least 30 points and expands for a larger criterion; bars do not independently normalize every criterion to full width. Provisional values are explicitly mock estimates awaiting teacher judgment. A value appears only when a matching criterion has linked evidence for the selected individual and a mock score is available. Missing individual evidence or a null estimate remains **산정 대기**, never zero achievement and never borrowed team performance. The completed team-1 experiment provides a mock verification/reflection estimate for 유송민. Saved weight changes rescale the corresponding seeded estimate; renamed criteria require an exact evidence-criterion match.

The professor selects sufficiently supported, appropriate, needs improvement, or additional evidence needed, then explicitly saves judgments and feedback. Student-specific review drafts remain separate from saved reviews; typing a judgment is not a final grade. Technology count, AI frequency, and another student's work do not determine the displayed personal estimate.

## Persistence, drafts, and materials

Fusion uses `trace-fusion-workspace-v1`. Network student state remains under `trace-student-yusongmin-v1`; course and instructor network records keep their existing keys. Fusion embeds its own StudentState for materials and conversations. Switching between workspaces must not overwrite the other scenario's data.

Saved fusion data includes plan, brief/rubric, connections, task completion, experiment/reflection, evidence, materials/messages, support summaries, requests, sent feedback, decisions, and saved reviews. Unsaved plan, brief/rubric, request/feedback inputs, task notes, and student review drafts are component state until their explicit save/send action. Prototype rules/results/output, route selection, and open dialogs are transient. Drafts can survive route changes while the FusionWorkspace remains mounted; they are not guaranteed across workspace switching or reload. Unsent conversation text clears on navigation and role switching. Storage failure keeps the visible change and shows a warning.

Fusion reuses `TeamDocuments` for search/type filtering, text creation/editing, version counters, local attachments, downloads, and clickable chat resource sharing. Attachment limits remain 2 MiB per file and a 3,800,000-character serialized StudentState budget at attachment time; fusion's full wrapper can additionally encounter browser storage limits. Text edit versions are counters, not archived revisions. Files are locally read into data URLs, not uploaded or parsed by a server. Team chat links open the current resource, not a frozen revision. These capabilities do not imply concurrent collaboration or cross-device synchronization.

## Visual comparison and boundaries

The implementation reuses app-shell/sidebar/nav, panels, buttons, compact tabs, badges, chart fills, ProgressRing, profile/workspace controls, TeamDocuments, and the established modal treatment. `fusion.css` chiefly composes local overview/split layouts, knowledge rows, task columns, and point-axis bars using incumbent color variables and existing soft category colors. Responsive layouts tighten at 1250px, stack major sections at 850px, and simplify forms/tasks at 600px; wide assessment tables retain intentional horizontal scrolling.

No new global palette, typography scale, raster imagery, or visual world is required. `DESIGN.md` and its sidecar are preserved. The source-led, Korean operational interface remains a simulation: real authentication, AI APIs, deployed student programs, code execution, institutional integrations, and actual grading are not implemented.
