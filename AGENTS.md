# TRACE demo

- Work in this repository on `dev`. Preserve user changes.
- Current scope is environment setup; the first feature will be the instructor project/assignment creation board.
- Read PRODUCT.md and docs/design-brief.md before UI work. User reference images are authoritative.
- Use project-local Ponytail (`.agents/skills/ponytail/SKILL.md`) to keep implementation simple. Never omit requested screens, content, accessibility or interactions in the name of minimalism.
- Use project-local Impeccable (`.agents/skills/impeccable/SKILL.md`) for frontend design. Follow the user's established scope and choices; do not repeat questions already answered.
- React + TypeScript + Vite, Tailwind, shadcn/ui primitives, Lucide icons, Motion where useful. Add components as needed, not whole catalogs.
- Korean UI. Desktop and tablet. Support keyboard, touch, reduced motion, clear focus and readable contrast.
- Mock data and scripted responses are appropriate. Do not imply live AI or real student records.
- Run `npm run check` before completing changes. Verify desktop and portrait/landscape tablet layouts for UI features.
