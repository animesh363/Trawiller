# MEMORY.md — Running Session Log

This file is the AI's memory between sessions. **Read it first, at the start of every session, before touching code.** Update it last, at the end of every session, before stopping.

Do not delete old entries — append new ones at the top so the most recent session is always easiest to find. If this file grows too long, summarize older entries into a single "Archived summary" block rather than deleting detail that might still matter.

---

## How to fill out a session entry

```
## Session [N] — [YYYY-MM-DD]

**Phase worked on:** [Phase X — name, from TASKS.md]

**Completed this session:**
- [task from TASKS.md, now checked off]
- [task from TASKS.md, now checked off]

**In progress / left unfinished:**
- [task] — [exact state it was left in, what's missing]

**Decisions made:** [link to new ADR number in DECISIONS.md, if any — or "none"]

**Known issues / bugs found but not fixed:**
- [issue] — [why it wasn't fixed now]

**Next session should start with:**
- [the single most important next action]
```

---

## Session Log

## Session 2 — 2026-09-23

**Phase worked on:** Phase 2 — Auth System & Multi-Role Routing

**Completed this session:**
- `server/models/User.js`: Mongoose user schema with password hashing (bcrypt 10 rounds), `select: false` on sensitive fields (`password`, `refreshToken`), and role enum.
- `server/models/VendorProfile.js`: Vendor identity schema linked to user with `verificationStatus: 'pending'`.
- `server/utils/generateTokens.js`: JWT token generation delivering short-lived access and long-lived refresh tokens in httpOnly cookies.
- `server/middleware/auth.middleware.js` (`verifyJWT`) and `role.middleware.js` (`authorize`).
- `server/validators/auth.validator.js` and `server/middleware/validate.middleware.js` handling request validation.
- Rate limiting middleware applied to `/auth/*` (5 attempts / 15 min / IP).
- `server/controllers/auth.controller.js` and `server/routes/auth.routes.js`: Full implementation of signup, login, logout, refresh-token, me, and update-password.
- `client/src/lib/roleConfig.js`: Config map driving dashboard routing and navigation icons for all 6 roles.
- `client/src/lib/validationSchemas.js`: `zod` schemas for login, signup, and update password.
- `client/src/features/auth/authSlice.js` & `authApi.js`: RTK Query auth state management and endpoint hooks.
- Two-step `SignupPage.jsx` with `RoleSelectStep.jsx`: Step 1 displays 5 role cards; Step 2 presents adaptive details form with working "Back" button.
- `LoginPage.jsx`: Email + password login form with automatic server-resolved role redirect.
- `ProtectedRoute.jsx`, `RoleRoute.jsx`, and 403 `UnauthorizedPage.jsx`.
- 6 role dashboard placeholder pages (`TouristDashboard`, `HotelDashboard`, `RestaurantDashboard`, `TaxiDashboard`, `ActivityDashboard`, `AdminDashboard`).
- Tested and verified signup, vendor profile creation (`verificationStatus: 'pending'`), httpOnly cookie issuance, and login APIs.

**In progress / left unfinished:**
- Phase 2 complete. Phase 3 (Dashboard Shell + UI Kit) ready to start next.

**Decisions made:**
- None new beyond established ADRs.

**Known issues / bugs found but not fixed:**
- None.

**Next session should start with:**
- Begin Phase 3 (Dashboard Shell + UI Kit): Create reusable UI primitives in `components/ui/` (Button, Input, Select, Modal, Card, Badge, Spinner, Table, Tabs, EmptyState, ConfirmDialog, Pagination, ImageUploader) and shared `DashboardShell.jsx` with mobile slide-over drawer.

---

**Phase worked on:** Phase 1 — Foundation

**Completed this session:**
- Root `package.json` with `concurrently` scripts (`dev`, `server`, `client`)
- `.gitignore` and root `README.md` skeleton for Trawiller
- `server/`: Express app skeleton (`app.js`, `server.js`), `config/db.js` MongoDB connection
- `server/config/constants.js` — ROLES, BOOKING_STATUS, CATEGORIES, VERIFICATION_STATUS enums
- `server/utils/`: `ApiError.js`, `ApiResponse.js`, `asyncHandler.js`
- `server/middleware/error.middleware.js` global error and 404 handlers
- `GET /api/v1/health` health-check route returning 200 operational status
- `client/`: Vite + React 18 scaffold, Tailwind CSS with mountain brand tokens (`#0F6E56` deep teal, `#BA7517` warm amber), React Router v6, Redux Toolkit, RTK Query
- Mobile-first responsive `LandingPage.jsx` with mobile drawer navigation, destination search, category cards, and vendor onboarding CTA
- Verified `npm run dev` boots both backend (port 5000) and frontend (port 5173) concurrently

**In progress / left unfinished:**
- Phase 1 complete. Phase 2 (Auth) ready to start next.

**Decisions made:**
- Custom branding initialized as **Trawiller** per user request; mobile-first responsiveness established for phones, tablets, and laptops.

**Known issues / bugs found but not fixed:**
- None.

**Next session should start with:**
- Begin Phase 2 (Auth): Create `User` & `VendorProfile` models, auth controllers, middlewares, validators, and client auth pages (`LoginPage`, two-step `SignupPage`, role-based routing).

---

**Phase worked on:** none yet — project not started

**Completed this session:**
- N/A

**In progress / left unfinished:**
- Phase 1 (Foundation) has not been started.

**Decisions made:** none

**Known issues / bugs found but not fixed:**
- none

**Next session should start with:**
- Read `PRD.md`, `ARCHITECTURE.md`, and `RULES.md` in full, then begin Phase 1 in `TASKS.md`. Confirm `npm run dev` boots both client and server before ending the session.

---

<!-- Add new sessions above this line, newest at the top of the Session Log section. -->
