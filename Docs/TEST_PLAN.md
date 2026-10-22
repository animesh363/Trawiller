# TEST_PLAN.md — Test Strategy

Given the hackathon timeline, testing is prioritized: **ownership/security > booking correctness > auth > everything else.** Full unit coverage is not the goal; correctness of the demo-critical paths is.

## 1. Testing Layers

| Layer | Tool | Scope |
|---|---|---|
| Backend unit | Jest | Controllers, utils (`paginate`, token generation), validators |
| Backend integration | Jest + Supertest + `mongodb-memory-server` | Full request → response cycles against a real (in-memory) Mongo instance |
| Frontend component | Vitest + React Testing Library | UI primitives, forms, role-based rendering |
| End-to-end (manual, minimum for MVP) | Manual test script (below) | The full demo narrative, run before every stakeholder demo |

## 2. Critical Paths (must always be tested, in this order of priority)

### P0 — Security & Ownership
- A hotel vendor **cannot** edit/delete another hotel's rooms via direct API call (bypassing the UI).
- A tourist **cannot** hit vendor-only or admin-only routes even with a valid token.
- Passwords and refresh tokens never appear in any API response body.
- Expired/invalid JWT is rejected with 401, not a 500.
- Auth routes are rate-limited (5 attempts / 15 min / IP) — verify the 6th attempt is blocked.

### P1 — Auth & Role Routing
- Signup as each of the 5 selectable roles creates the correct `User` (+ `VendorProfile` for vendors).
- Login redirects to the correct dashboard per role, every time, without a role dropdown.
- `ProtectedRoute` redirects unauthenticated users to `/login`.
- `RoleRoute` renders 403 for a role mismatch.
- A `pending` vendor can still create listings but they don't appear in public search until `verified`.

### P2 — Booking Flow (core business logic)
- Booking a hotel room decrements `availableRooms` and does not allow overbooking past `totalRooms`.
- Booking an activity slot respects `capacity` vs. `booked` on `availableSlots`.
- `Booking.bookingRef` is unique and auto-generated on every create.
- Cancelling a booking updates `status` and (for hotel/activity) releases the held inventory.
- A vendor can only see/manage bookings tied to their own `VendorProfile`.

### P3 — Reviews
- A review cannot be created without a `Booking` with `status: 'completed'` for that exact `itemId` + tourist.
- Vendor reply attaches correctly and is visible on the listing.
- Rating aggregates (`rating.average`, `rating.count`) recompute correctly after a new review.

### P4 — Search & Listings
- Filters (destination, price range, rating, amenities/category-specific) narrow results correctly, individually and combined.
- Pagination never exceeds `max limit 50`; default `limit 12` is applied when unspecified.
- Unverified vendor listings are excluded from public search and explore results.

### P5 — UI Resilience
- Every list/table view shows a loading skeleton while fetching.
- Every list/table view shows a proper empty state (icon + message + CTA) when there's no data.
- Every list/table view shows an error state (not a blank screen) on a failed fetch.
- Forms show field-level validation errors from `zod` schemas before submission is attempted.

## 3. Manual Demo Script (run before every stakeholder/judge demo)

1. Land on homepage → open Manali destination page → confirm real listings show.
2. Sign up as a tourist → search Manali hotels → filter by price → open a listing → complete a mock booking.
3. Log in as a pre-seeded hotel owner → view dashboard stats → add a new room with an image, live.
4. Log in as admin → open the vendor verification queue → approve a pending vendor → confirm it now appears in public search.
5. Confirm no console errors and no broken images anywhere in the above flow.

## 4. Regression Checklist (run before merging any Phase)

- [ ] `npm run dev` from root still boots both client and server cleanly
- [ ] No hardcoded secrets/URLs introduced (`SECURITY.md` §1)
- [ ] Ownership middleware still applied to every vendor-mutating route
- [ ] Seed script (`server/seed/seed.js`) still runs cleanly end-to-end
- [ ] All six roles still land on the correct dashboard after login

## 5. Out of Scope for MVP Testing

- Load/performance testing
- Cross-browser matrix beyond latest Chrome/Firefox
- Payment gateway testing (mocked, not real)
- Automated accessibility audits (manual spot-checks only per `DESIGN.md` §1)
