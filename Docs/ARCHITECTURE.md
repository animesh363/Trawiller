# ARCHITECTURE.md — TravSense Technical Architecture

This is the single source of truth for stack, structure, and data flow. Do not introduce a new library, restructure folders, or change a pattern without adding a matching entry to `DECISIONS.md` first.

## 1. Tech Stack (fixed — no substitutions without an ADR)

**Frontend**
- React 18 + Vite
- JavaScript (not TypeScript)
- React Router v6 (protected + role-based routes)
- Redux Toolkit + RTK Query (state + API calls)
- Tailwind CSS
- react-hook-form + zod (form validation)
- axios (configured instance with interceptors)
- react-hot-toast (notifications)
- lucide-react (icons)
- recharts (dashboard analytics charts)

**Backend**
- Node.js + Express 4
- MongoDB + Mongoose
- JWT auth (access token + refresh token, httpOnly cookies)
- bcryptjs (password hashing)
- express-validator (request validation)
- multer + Cloudinary (image uploads)
- helmet, cors, express-rate-limit, morgan
- dotenv

**Dev tooling**
- ESLint + Prettier
- nodemon (backend dev)
- concurrently (run both from root)

## 2. High-Level Architecture

```
                 ┌───────────────────────┐
                 │        Client          │
                 │ React + Redux Toolkit  │
                 │ RTK Query, Tailwind    │
                 └──────────┬─────────────┘
                            │ HTTPS (axios, httpOnly cookies)
                            ▼
                 ┌───────────────────────┐
                 │   Express API (v1)     │
                 │ auth / role / owner    │
                 │ middleware layer       │
                 └──────────┬─────────────┘
                            │ Mongoose
                            ▼
                 ┌───────────────────────┐
                 │       MongoDB          │
                 │ Users, VendorProfiles, │
                 │ Hotels, Rooms, ...     │
                 └───────────────────────┘
                            │
                            ▼
                 ┌───────────────────────┐
                 │      Cloudinary        │
                 │   (image storage)      │
                 └───────────────────────┘
```

- **Discovery path** (search/browse) is read-heavy and cacheable — kept separate from **vendor management** (write-heavy, low-volume) so each can scale independently later (e.g., Redis/Elasticsearch on discovery only).
- Auth is stateless JWT; RTK Query handles client-side caching, so no server-side session store is needed.

## 3. The Six Roles

| Role | Enum value | Dashboard base path |
|---|---|---|
| Tourist | `tourist` | `/dashboard/tourist` |
| Hotel owner | `hotel` | `/dashboard/hotel` |
| Restaurant owner | `restaurant` | `/dashboard/restaurant` |
| Taxi driver | `taxi` | `/dashboard/taxi` |
| Activity operator | `activity` | `/dashboard/activity` |
| Admin | `admin` | `/dashboard/admin` |

Role is chosen at signup (not login). Login always reads role from the DB and redirects via `client/src/lib/roleConfig.js`.

## 4. Project Structure

```
travsense/
├── package.json                # root: concurrently scripts
├── README.md
├── .gitignore
├── docs/                       # this documentation set
│
├── server/
│   ├── package.json
│   ├── .env.example
│   ├── server.js                # entry: connects DB, starts app
│   ├── app.js                   # express app, middleware, route mounting
│   ├── config/
│   │   ├── db.js
│   │   ├── cloudinary.js
│   │   └── constants.js         # ROLES, BOOKING_STATUS, CATEGORIES enums
│   ├── models/
│   │   ├── User.js
│   │   ├── VendorProfile.js
│   │   ├── Hotel.js / Room.js
│   │   ├── Restaurant.js / Dish.js
│   │   ├── Taxi.js
│   │   ├── Activity.js
│   │   ├── Booking.js
│   │   ├── Review.js
│   │   └── Destination.js
│   ├── controllers/             # one per resource, thin — logic lives here
│   ├── routes/                  # one router per resource, mounted under /api/v1
│   ├── middleware/
│   │   ├── auth.middleware.js       # verifyJWT -> req.user
│   │   ├── role.middleware.js       # authorize('hotel','admin')
│   │   ├── ownership.middleware.js  # vendor owns the resource
│   │   ├── upload.middleware.js     # multer + cloudinary
│   │   ├── validate.middleware.js   # express-validator result handler
│   │   └── error.middleware.js      # global error handler + 404
│   ├── utils/
│   │   ├── ApiError.js / ApiResponse.js / asyncHandler.js
│   │   ├── generateTokens.js
│   │   └── paginate.js
│   ├── validators/               # express-validator chains per resource
│   └── seed/
│       ├── seed.js
│       └── data/
│
└── client/
    ├── package.json / vite.config.js / tailwind.config.js / index.html
    └── src/
        ├── main.jsx / App.jsx / index.css
        ├── app/store.js
        ├── features/             # RTK Query slices per resource
        ├── api/apiSlice.js       # RTK Query base + auth header
        ├── components/
        │   ├── ui/                # Button, Input, Select, Modal, Card, Badge,
        │   │                      # Spinner, Table, Tabs, EmptyState, ConfirmDialog,
        │   │                      # Pagination, ImageUploader
        │   ├── layout/            # Navbar, Footer, Sidebar, DashboardShell
        │   ├── common/            # SearchBar, FilterPanel, RatingStars, PriceTag,
        │   │                      # ListingCard, ReviewCard
        │   └── charts/            # RevenueChart, BookingsChart, StatCard
        ├── pages/
        │   ├── public/ auth/ tourist/ hotel/ restaurant/ taxi/ activity/ admin/
        ├── routes/
        │   ├── AppRoutes.jsx / ProtectedRoute.jsx / RoleRoute.jsx
        ├── hooks/                 # useAuth, useDebounce, usePagination
        └── lib/
            ├── axios.js
            ├── roleConfig.js      # role -> dashboard path, nav items, label, icon
            └── validationSchemas.js
```

## 5. Data Model Summary

Full field-level schemas live inline in each model file; this is the relationship map:

- `User` — one per account, `role` enum drives everything downstream.
- `VendorProfile` — one per vendor `User` (hotel/restaurant/taxi/activity), holds business identity + `verificationStatus`.
- `Hotel` → has many `Room`.
- `Restaurant` → has many `Dish`.
- `Taxi` — vendor can own multiple; each has embedded `routes[]`.
- `Activity` — embedded `availableSlots[]`.
- `Booking` — **single polymorphic collection** for room/dish/taxi/activity bookings via `itemType` + `itemId`. This is the key scalability decision: a new vertical only needs a new `itemType`, not a new booking table.
- `Review` — polymorphic the same way, gated to a completed `Booking`.
- `Destination` — Manali, Shimla, etc.; every listing references one.

Indexes required: `email` unique on `User`; `location` 2dsphere on geo-fields; compound `(destination, isActive)` on listings; compound `(tourist, status)` on `Booking`.

## 6. API Surface

All routes are prefixed `/api/v1` and return `{ success, statusCode, message, data }` via `ApiResponse`. Route groups: `/auth`, `/hotels` (+ nested `/rooms`), `/restaurants` (+ nested `/dishes`), `/taxis`, `/activities`, `/bookings`, `/search`, `/reviews`, `/admin`. See `TASKS.md` for the endpoint-by-endpoint build order.

## 7. Data Flow Example — Booking a Hotel Room

1. Tourist opens `ListingDetailPage` → RTK Query fetches `GET /hotels/:id` (public, populated with rooms + reviews).
2. Tourist selects dates/guests → client computes a live price estimate.
3. `POST /bookings` (role: tourist) → `booking.controller.js` validates via `booking.validator.js`, checks room availability, creates `Booking` with `status: 'pending'`.
4. Vendor sees it under `GET /bookings/vendor` → confirms via `PATCH /bookings/:id/status`.
5. On completion, tourist may leave a `Review`, which `review.controller.js` gates against a `completed` `Booking` for that `itemId`.

## 8. Scalability Notes (for the "is this production ready" question)

- Adding a new vendor vertical = one new Mongoose model + controller + route file following the Hotel pattern (Phase 4/5 in `TASKS.md`) + one new `itemType` on `Booking`/`Review`. No redesign.
- Discovery (read-heavy) and vendor management (write-heavy) are cleanly separated so caching (Redis) or search indexing (Elasticsearch) can be added to discovery alone later.
- Stateless JWT auth means horizontal scaling of the API needs no shared session store.
- New destinations are just new `Destination` documents — no engineering change required to expand to a new city.
