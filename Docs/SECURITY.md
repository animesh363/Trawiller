# SECURITY.md — Security Considerations

TravSense handles user PII (email, phone, address), vendor business documents, and mock payment/booking data. Even as a hackathon MVP, these baseline protections are non-negotiable.

## 1. Secrets & Configuration

- No secrets, API keys, DB URIs, or Cloudinary credentials in source code — everything comes from `.env`, loaded via `dotenv`, documented in `.env.example` (values blank/placeholder only).
- No hardcoded URLs — client uses an env-driven `VITE_API_BASE_URL`; server uses `config/constants.js` sourced from env.
- `.env` is git-ignored; `.env.example` is the only env file committed.

## 2. Authentication

- Passwords hashed with **bcrypt, 10 rounds**, before save — never stored or logged in plaintext.
- JWT access token (short-lived) + refresh token (longer-lived), both delivered as **httpOnly cookies** — never stored in `localStorage`, to reduce XSS token theft risk.
- `refreshToken` and `password` fields are `select: false` on the `User` model and must never be included in any serialized API response.
- `/auth/*` routes are rate-limited (5 attempts / 15 min / IP) via `express-rate-limit`.
- `update-password` requires the current password before accepting a new one.

## 3. Authorization

- `role.middleware.js` enforces role checks on every route that isn't public.
- `ownership.middleware.js` enforces that a vendor can only mutate resources tied to their own `VendorProfile` — this check happens **server-side on every request**, regardless of what the client UI allows or hides. Never trust `req.body.vendorId`; always derive vendor identity from the authenticated `req.user`.
- Admin-only routes (`/admin/*`) require `role === 'admin'` explicitly; there is no "super vendor" escalation path.

## 4. Input Validation & Injection Prevention

- Every mutating endpoint runs through `express-validator` chains before the controller executes.
- Mongoose schema types + `enum` constraints prevent malformed category/status values from ever being persisted.
- File uploads (`multer`) restricted by MIME type and size before being forwarded to Cloudinary; never store uploaded files on the local filesystem long-term.
- No raw user input is ever interpolated into a Mongo query string (use Mongoose query builders, not string concatenation).

## 5. Transport & Headers

- `helmet` enabled on the Express app for standard secure headers.
- `cors` configured with an explicit allow-list (the client origin), not a wildcard `*`, especially since cookies are used for auth.
- Cookies set with `httpOnly`, `secure` (in production), and `sameSite` appropriate to the deployment (e.g., `lax` or `strict`).

## 6. Error Handling

- Global `error.middleware.js` returns a consistent `ApiError`-shaped JSON response.
- Stack traces and internal error details are **never** sent to the client in production — log them server-side only (via `morgan`/console in dev), return a generic message in prod.

## 7. Vendor Trust Layer (product-level security, not just technical)

- New vendors start `verificationStatus: 'pending'` and their listings are excluded from public search until an admin sets `verified`.
- Reviews are gated to a `completed` `Booking` for that exact tourist + item, preventing fake/drive-by reviews.
- Admin actions (verify/reject/deactivate) are logged with a reason where applicable (`rejectionReason`), for accountability.

## 8. Data Minimization

- Only collect the fields actually used by the product (name, email, phone, business details for vendors) — no unnecessary PII fields.
- Payment flow is **mocked only** for MVP — no real card/bank data is ever collected or stored, avoiding PCI-scope entirely for this build.

## 9. Known Gaps (explicitly accepted for MVP, not hidden)

- No hard document-verification integration (government/tourism-board API) — verification is admin-reviewed manually, a trust signal rather than a legal guarantee.
- No WAF/DDoS mitigation, no automated dependency-vulnerability scanning pipeline yet.
- No 2FA.
- These are reasonable next steps for a production rollout, not required for the hackathon MVP — call this out honestly if asked (see `PRD.md` §9 and `DECISIONS.md`).
