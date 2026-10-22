# RULES.md — Coding Standards & AI Behavior Guardrails

These rules override convenience. If a rule here conflicts with something faster or "cleaner" in the moment, follow the rule.

## 1. Language & Stack Discipline

- **JavaScript only** on both client and server — no TypeScript, no `.ts`/`.tsx` files.
- Do not add any package not already listed in `ARCHITECTURE.md`. If a task seems to need a new library, stop and propose it as a new entry in `DECISIONS.md` first — do not silently `npm install` something new.
- Do not swap Tailwind for CSS modules/styled-components, or Redux Toolkit for Context/Zustand, "just for this one component."

## 2. File & Folder Discipline

- Follow the exact folder structure in `ARCHITECTURE.md` §4. Do not invent new top-level folders.
- One resource = one model file, one controller file, one route file, one validator file. Do not merge multiple resources into a shared file for convenience.
- **Never modify files unrelated to the current task.** If a fix requires touching an unrelated file, call it out explicitly instead of doing it silently.
- Do not delete or rewrite a file outside the current phase's scope (see `TASKS.md`) without flagging it first.

## 3. No Duplicate Logic

- Ownership checks, pagination, token generation, and error formatting live once each in `middleware/` and `utils/` — every controller reuses them. Never re-implement pagination or JWT verification inline in a controller.
- Shared UI (empty states, loading skeletons, status badges, price formatting) lives once in `components/ui/` or `utils/` — never copy-pasted per page.
- If the same validation logic is needed in two validators, extract it to a shared helper rather than duplicating it.

## 4. Backend Rules

- Every controller function is wrapped in `asyncHandler`. Every thrown error is an `ApiError(statusCode, message)`. Never `throw new Error(...)` raw in a controller.
- Every mutating route (`POST`/`PATCH`/`DELETE`) must run through `express-validator` chains before reaching the controller.
- **Ownership must be enforced server-side, always.** A hotel owner must never be able to edit another hotel's rooms, even if the client never sends a request that way — assume a malicious client. Never trust `req.body` for identity; always derive the vendor from `req.user`/`req.vendorProfile`.
- Never return `password` or `refreshToken` fields in any API response.
- Every list endpoint must be paginated (default limit 12, max 50) — no unbounded `find()` on a public route.
- Rate-limit auth routes (5 attempts / 15 min / IP) — do not weaken or remove this.

## 5. Frontend Rules

- All server state goes through RTK Query (`features/*/*.Api.js`); do not hand-roll `useEffect` + `axios` data fetching for anything CRUD-related.
- All forms use `react-hook-form` + `zod` schemas from `lib/validationSchemas.js` — no manual `useState`-per-field forms for anything beyond a single search input.
- Role-based rendering and routing goes through `roleConfig.js` + `RoleRoute` — never hardcode a role check like `if (user.role === 'hotel')` scattered across components.
- Every list/table view needs: loading skeleton, empty state, error state. No component should be able to render a blank screen.

## 6. Naming Conventions

- Files: `PascalCase.jsx` for React components, `camelCase.js` for everything else (`hotel.controller.js`, `authSlice.js`).
- Mongoose models: singular `PascalCase` (`Hotel`, not `Hotels`).
- Routes: kebab-case URL segments (`/vendors/:id/verify`, not `/vendors/:id/Verify`).
- Redux slices: `camelCase` + `Slice`/`Api` suffix matching the file (`hotelApi.js` exports `hotelApi`).
- Enums (roles, statuses, categories) live only in `server/config/constants.js` (backend) and `client/src/utils/constants.js` (frontend) — never inline string literals like `'hotel'` scattered through logic; import the constant.

## 7. Commenting

- Comments explain **why**, not what the code already says. `// increment count` is not acceptable; `// pending vendors can still create listings, but they're hidden from search until verified` is.
- No commented-out dead code left in commits.

## 8. Security Non-Negotiables (see `SECURITY.md` for full detail)

- No secrets, API keys, or hardcoded URLs in source — everything from `.env`, referenced via `config/constants.js`.
- Passwords hashed with bcrypt (10 rounds) before save, every time, no exceptions.
- Stack traces never leaked to the client in production error responses.

## 9. Process Rules for the AI Agent

- Work **one phase at a time**, exactly as ordered in `TASKS.md`. Do not jump ahead to Phase 5 while Phase 4 is incomplete.
- Before starting a session, read `MEMORY.md` to see what was last done and what's in progress.
- After finishing a task or phase, update `MEMORY.md` and mark the task's status in `TASKS.md` — do not leave the tracker stale.
- If a decision is made that isn't already covered in `ARCHITECTURE.md`/`DESIGN.md` (a new pattern, a new library, a schema change), add an entry to `DECISIONS.md` in the same session — don't defer it.
- If a requirement is ambiguous, prefer the interpretation already established elsewhere in these docs over inventing a new pattern.
