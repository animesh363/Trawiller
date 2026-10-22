# DECISIONS.md — Architecture Decision Records (ADR)

Append new decisions to the bottom with the next sequential number. Never delete a past ADR — if a decision is reversed, add a new ADR that supersedes it and link back.

Format: **Context → Decision → Alternatives considered → Consequences**

---

## ADR-001: MERN stack with plain JavaScript (no TypeScript)

**Context:** Need a full-stack setup buildable quickly by an AI agent across many files, for a hackathon MVP.
**Decision:** React + Vite + Express + MongoDB, JavaScript only (no TypeScript).
**Alternatives considered:** Next.js (rejected — adds SSR complexity not needed for this app); TypeScript (rejected — slows generation/iteration speed for a hackathon timeline; "keep it accessible" per original spec).
**Consequences:** Faster iteration, but no compile-time type safety — `RULES.md` compensates with `zod`/`express-validator` runtime validation everywhere.

## ADR-002: Redux Toolkit + RTK Query over plain Context/fetch

**Context:** Six very different dashboards need consistent, cache-aware server-state handling.
**Decision:** Redux Toolkit + RTK Query for all server state; no hand-rolled `useEffect` fetching.
**Alternatives considered:** React Query (equally valid, but RTK Query keeps state management and data fetching in one library, reducing dependency count).
**Consequences:** Slightly more boilerplate per resource (`*Api.js` files), but consistent caching/invalidation across all six roles.

## ADR-003: Single polymorphic `Booking` and `Review` collection

**Context:** Four very different bookable item types (room, dish, taxi, activity) need a booking + review flow.
**Decision:** One `Booking` collection with `itemType` + `itemId` (refPath), one `Review` collection the same way — instead of a separate booking table per vertical.
**Alternatives considered:** Per-vertical booking tables (`HotelBooking`, `TaxiBooking`, ...) — rejected because it would require duplicated controller logic and a new table for every future vertical.
**Consequences:** Adding a 5th/6th vendor category (e.g., trek guides) requires only a new `itemType` value, not a schema/table change — this is the core scalability story for judges. Tradeoff: queries need to branch on `itemType` for type-specific fields.

## ADR-004: Role selected at signup, not login

**Context:** Six roles, one login system.
**Decision:** Role is chosen once at signup via role cards; login is email+password only, redirect resolved server-side from the stored `role`.
**Alternatives considered:** Role dropdown at login — rejected, since a user's role shouldn't be user-selectable after account creation (security + UX simplicity).
**Consequences:** Simpler login UI; role changes (if ever needed) become an explicit admin action, not a user self-service toggle.

## ADR-005: httpOnly cookies for JWT, not localStorage

**Context:** Need to store access/refresh tokens client-side.
**Decision:** httpOnly, secure cookies.
**Alternatives considered:** `localStorage` — rejected due to XSS token-theft exposure (see `SECURITY.md` §2).
**Consequences:** Requires `cors` with explicit origin + credentials, and careful `sameSite` configuration; slightly more setup than `localStorage`, accepted for the security benefit.

## ADR-006: Vendor listings hidden until admin-verified

**Context:** Trust layer is a core product differentiator (see `PRD.md`).
**Decision:** New vendors default to `verificationStatus: 'pending'`; they can build listings immediately, but listings are excluded from public search until an admin sets `verified`.
**Alternatives considered:** Auto-approve on signup — rejected, defeats the trust-layer value proposition entirely. Fully blocking vendor dashboard access until verified — rejected, hurts onboarding UX and demo flow (vendor should be able to prep their listing while awaiting approval).
**Consequences:** Requires a persistent "under review" banner in the vendor dashboard and a filter (`verificationStatus: 'verified'`) on every public listing query.

## ADR-007: Mock payment flow only, no real gateway

**Context:** Hackathon MVP scope; real payment integration adds PCI/compliance surface with no demo value.
**Decision:** `Booking.paymentStatus` is tracked but no real payment gateway is integrated — payment flow is simulated client-side.
**Alternatives considered:** Integrate a test-mode Stripe/Razorpay — rejected as unnecessary scope for the MVP demo; explicitly listed as a non-goal in `PRD.md`.
**Consequences:** Keeps the build scoped and avoids handling real payment data entirely (see `SECURITY.md` §8).

---

<!-- Add new ADRs below this line, incrementing the number. -->
