# Course dashboard and settings surface contract

This ordinary extension keeps the TRACE visual system in `DESIGN.md` authoritative. It adds surface-specific composition and behavior without changing that system or `.impeccable/design.json`. Sources checked: `PRODUCT.md`, `DESIGN.md`, `src/CourseDashboard.tsx`, `src/CourseSettings.tsx`, `src/course.ts`, `src/course.css`, and the course integration in `src/App.tsx`.

## Shared visual language

Keep the existing deep green navigation and primary actions, charcoal active navigation, warm gray canvas, white rounded panels, and mint selected/supporting states. Charts reuse mint, lavender, yellow, rose, and charcoal with visible legends and values. The inherited Korean sans typography, thin borders, focus treatment, and flat panels remain in place. Course-specific layouts use 24px panel padding and 22px primary grid gaps; these are local composition choices, not replacement global tokens.

The dashboard uses five compact summary panels above a two-column chart grid, followed by a confirmation table and activity timeline. At 900px the chart and bottom grids stack; summaries become three columns, then two at 600px with the progress summary spanning both. Settings begin with three entry choices and a labeled import sequence, followed by six category buttons and one editable panel. At 600px entry choices, form fields, and review-dialog columns stack. Keep labels and numeric values available alongside color; SVG summaries have accessible descriptions.

## Dashboard: four main chart areas

1. **과제별 진행 현황:** current cumulative progress bars for the selected projects, with a direct route to that project's team monitoring.
2. **주차별 학습 진행률:** actual average progress against a dashed planned progression. The period selector shows all seven demo weeks or the most recent four.
3. **과제별 AI 지원:** per-project stacked counts plus a combined donut and labeled support-type percentages. Recent-period counts are an illustrative subset. Support usage does not imply learning achievement.
4. **핵심 역량 관찰 현황:** labeled horizontal bars with overall, team, and student scopes. These are illustrative observed-evidence rates, not final grades. Custom course competencies without mapped demo evidence display `미집계`.

The summary panels show project count, the demo roster, teams requiring attention, pending AI approval, and average progress. The attention table routes to the selected project's team or student, with an explicit current-project approval target. Approval status derives from the ongoing assignment mode and in-session decisions.

### Scope of the data

The dataset remains the named network-practice scenario: two projects, 24 students, six teams, and week seven. Project selection scopes the charts; period selection affects the weekly trend and AI support statistics only. Team/student selection affects the competency area only. Do not imply that course metadata edits rebuild the roster, fabricate evidence for new competencies, or turn these examples into live analytics. The recent activity panel is a current-class illustrative timeline, not a queried audit log.

## Settings and reviewed import

The three entry methods are school-system import, document setup, and direct editing. Six categories cover basic course information, curriculum and objectives, assessment rules, AI defaults, the weekly schedule, and reference documents.

School-system choices (university information system, LMS, academic administration, NEIS) open prepared examples. Document selection accepts PDF, HWP, HWPX, DOCX, and XLSX up to 10MB per file, including multiple files for a new import. A separate example-document action supports the demo. File validation inspects filenames/extensions and size; file contents are neither transmitted nor parsed. There is no institution authentication, live connector, real AI extraction, or verified official NCS-code lookup.

Both routes use the same explicit sequence:

1. Select a source and open its analysis example.
2. Review six editable extraction areas: course name, objectives, achievement standards, NCS units, evaluation criteria, and weekly curriculum. Show labeled example source evidence beside them.
3. Select or exclude areas, edit their contents, and apply selected items to the **settings draft**. Applying is not final saving.
4. Review the draft and choose **과목 설정 저장** to validate and persist the course defaults.

Document replacement shows current settings next to new example evidence before application. The document list retains only names, type, applied areas, and update dates; it does not store original documents. Empty selected import areas are rejected. Imported evaluation criteria require valid positive weights totaling 100%. The final save also checks course name and date order, objectives and schedule entries, evaluation criteria, and at least one allowed guidance type. Errors and successful actions receive visible alert/status messages.

## State, persistence, and reuse

Saved course defaults use browser `localStorage` key `trace-course-v1`; unavailable or unsuitable stored data falls back to the seeded course. The App owns a separate `courseDraft`, so edited settings and applied import results survive navigation away from settings and back within the same app session. Unsaved settings do not survive a full reload. Import-dialog edits, selected file names, active category, and import method are transient component state; do not claim session retention for those intermediate controls.

The new-project action is disabled while settings have unsaved changes. It starts a blank title/description and copies saved objectives, evaluation criteria, AI mode, intervention level, guidance choices for each mode, and the direct-answer policy into a new editable assignment draft. Other course metadata and preferences remain course-level settings; direct-answer permission is a saved demo policy, not an implemented answer-generation service. Existing assignment editing can explicitly import saved goals or criteria as needed.

Before starting that new draft, App snapshots the current teaching assignment separately under `trace-teaching-assignment` (with an in-session fallback if persistence fails). Dashboard and teaching views use that ongoing snapshot. Thus creating or editing the next assignment does not replace the ongoing classroom's demonstration data or evidence. Course settings, next-assignment drafting, and ongoing teaching context remain distinct.

## Incumbent comparison

This extension preserves the incumbent palette, Korean text hierarchy, sidebar, action styles, rounded white panels, labeled categorical chart colors, and browser-only demonstration model. The added dashboard grid, settings entry cards, review dialog, and explicit apply/save boundary are local surface patterns. They do not impose a new page composition on other TRACE screens. Neither the global design specification nor its sidecar is refreshed for this ordinary extension.
