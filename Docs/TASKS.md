# TASKS.md — Phased Task Breakdown

Status legend: `[ ]` not started · `[~]` in progress · `[x]` done

**Rule:** work top to bottom, one phase at a time. Do not start a Phase-N task while any Phase-(N-1) task is unchecked, unless explicitly told to skip ahead. Update this file's checkboxes and `MEMORY.md` at the end of every session.

---

## Phase 1 — Foundation
- [x] Root `package.json` with `concurrently` scripts (`dev`, `server`, `client`)
- [x] `.gitignore`, root `README.md` skeleton
- [x] `server/`: Express app skeleton (`app.js`, `server.js`), `config/db.js` MongoDB connection
- [x] `server/config/constants.js` — ROLES, BOOKING_STATUS, CATEGORIES enums
- [x] `server/utils/`: `ApiError.js`, `ApiResponse.js`, `asyncHandler.js`
- [x] `GET /api/v1/health` health-check route
- [x] `client/`: Vite + React scaffold, Tailwind configured, React Router installed
- [x] Placeholder `LandingPage.jsx` rendering
- [x] Verify `npm run dev` from root boots both client and server

## Phase 2 — Auth
- [x] `User` model + `VendorProfile` model (per `ARCHITECTURE.md` §5)
- [x] `auth.controller.js`: signup, login, logout, refresh-token, me, update-password
- [x] `auth.middleware.js` (verifyJWT), `role.middleware.js` (authorize)
- [x] `auth.validator.js` + rate limiting on auth routes
- [x] Client: `LoginPage.jsx`
- [x] Client: two-step `SignupPage.jsx` (role cards → details form) + `RoleSelectStep.jsx`
- [x] Client: `authSlice.js` + `authApi.js`
- [x] Client: `ProtectedRoute.jsx`, `RoleRoute.jsx`
- [x] Six empty dashboard pages (one per role) rendering "X Dashboard" to verify redirects
- [x] Verify: signup as each role → correct redirect; login → correct redirect; role mismatch → 403

## Phase 3 — Dashboard Shell + UI Kit
- [ ] `components/ui/`: Button, Input, Select, Modal, Card, Badge, Spinner, Table, Tabs, EmptyState, ConfirmDialog, Pagination, ImageUploader
- [ ] `DashboardShell.jsx` (sidebar + topbar + `<Outlet />`)
- [ ] `lib/roleConfig.js` (nav items per role)
- [ ] Mobile slide-over sidebar behavior
- [ ] Profile page (shared shell, role-aware fields)
- [ ] Verify: all six roles navigate correctly inside their shell, on mobile and desktop

## Phase 4 — Hotel Vertical (reference pattern — build fully before replicating)
- [ ] `Hotel` + `Room` models
- [ ] `hotel.controller.js`, `room.controller.js`, `hotel.routes.js`
- [ ] `ownership.middleware.js` applied to hotel/room mutations
- [ ] `upload.middleware.js` (multer + Cloudinary) wired to hotel/room images
- [ ] Client: `PropertySetupPage.jsx` (onboarding form)
- [ ] Client: `ManageRoomsPage.jsx` + `RoomFormPage.jsx`
- [ ] Client: `HotelBookingsPage.jsx`
- [ ] Public: hotel listing (`ExplorePage` filtered) + `ListingDetailPage.jsx` hotel section
- [ ] Verify: a hotel vendor can create a property, add a room with an image, and see it publicly once verified

## Phase 5 — Replicate the Pattern (Restaurant, Taxi, Activity)
- [ ] `Restaurant` + `Dish` models, controllers, routes, dashboard pages (`RestaurantSetupPage`, `ManageMenuPage`, `DishFormPage`)
- [ ] `Taxi` model, controller, routes, dashboard pages (`ManageVehiclesPage`, `VehicleFormPage`, route/fare table CRUD)
- [ ] `Activity` model, controller, routes, dashboard pages (`ManageActivitiesPage`, `ActivityFormPage`, slot manager)
- [ ] Public listing + detail sections for all three verticals
- [ ] Verify: each vertical follows the exact Phase 4 structural pattern (no ad-hoc deviations)

## Phase 6 — Booking + Reviews
- [ ] Polymorphic `Booking` model (`itemType`/`itemId`) + `booking.validator.js`
- [ ] `booking.controller.js`: create, my (tourist), vendor, status update, cancel, get-by-id
- [ ] Booking flow wired into each `ListingDetailPage` (sticky booking sidebar)
- [ ] Client: `MyBookingsPage.jsx` (tabs: upcoming/completed/cancelled)
- [ ] Vendor booking management pages (confirm/cancel actions) for all four verticals
- [ ] `Review` model + `review.controller.js`, gated to a `completed` `Booking`
- [ ] Review display + rating breakdown on `ListingDetailPage`
- [ ] Verify: a review cannot be created without a completed booking for that exact item

## Phase 7 — Search, Explore, Landing
- [ ] `search.controller.js`: `/search`, `/search/destinations`, `/search/suggestions`
- [ ] `ExplorePage.jsx`: filter sidebar, URL-synced filters, debounced search, pagination
- [ ] Full `LandingPage.jsx`: hero, destination cards, category tiles, "Why TravSense", vendor-recruitment band, featured listings
- [ ] `DestinationPage.jsx`
- [ ] Verify: search + filters return correct paginated results across all four categories

## Phase 8 — Admin, Analytics, Seed
- [ ] `AdminDashboard.jsx` + stat cards
- [ ] `VendorVerificationPage.jsx` (approve/reject with reason)
- [ ] `AllListingsPage.jsx` (filter + force-deactivate)
- [ ] `PlatformAnalyticsPage.jsx` (recharts: vendors-by-role pie, signups-over-time line)
- [ ] `admin.controller.js`: vendors, verify, stats, users, toggle
- [ ] `server/seed/seed.js`: 6 destinations, 1 admin, 5 tourists, 3 verified vendors per role with realistic Manali/Shimla listings and INR prices
- [ ] Final `README.md`: setup steps, env vars, seed instructions, demo credentials for all six roles, API route table
- [ ] Verify full demo narrative end-to-end (see `PRD.md` §7 / `DECISIONS.md` demo flow)

---

## Progress Summary
_(update this table as phases complete)_

| Phase | Total tasks | Done | In progress | Not started |
|---|---|---|---|---|
| 1 — Foundation | 9 | 9 | 0 | 0 |
| 2 — Auth | 10 | 10 | 0 | 0 |
| 3 — Shell + UI Kit | 6 | 0 | 0 | 6 |
| 4 — Hotel Vertical | 9 | 0 | 0 | 9 |
| 5 — Replicate Pattern | 5 | 0 | 0 | 5 |
| 6 — Booking + Reviews | 8 | 0 | 0 | 8 |
| 7 — Search/Explore/Landing | 5 | 0 | 0 | 5 |
| 8 — Admin/Analytics/Seed | 8 | 0 | 0 | 8 |
