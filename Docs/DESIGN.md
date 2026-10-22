# DESIGN.md — TravSense Design System

## 1. Design Principles

- **Mountain/nature feel, not generic SaaS blue.** Every screen should feel like a hill-station trip, not a corporate dashboard.
- **Trust through clarity.** Verified badges, status colors, and clean typography do the trust-building — not heavy visual noise.
- **No blank screens, ever.** Every list has an empty state, a loading skeleton, and an error state.
- **Mobile-first.** Vendors will often manage listings from a phone; tourists will browse from one.
- **Accessible by default.** Semantic HTML, labelled inputs, keyboard-navigable modals, visible focus rings.

## 2. Color Palette

| Token | Hex | Usage |
|---|---|---|
| Primary (deep teal) | `#0F6E56` | Primary buttons, active nav, links, brand accents |
| Accent (warm amber) | `#BA7517` | Secondary CTAs, highlights, "featured" badges |
| Slate-900 | `#0F172A` | Headings |
| Slate-600 | `#475569` | Body text |
| Slate-200 | `#E2E8F0` | Borders, dividers |
| White | `#FFFFFF` | Surfaces/cards |

### Status colors (badges)
| Status | Color |
|---|---|
| Pending | Amber |
| Confirmed | Green |
| Cancelled | Red |
| Completed | Slate |

## 3. Typography

- Font: **Inter** (Google Fonts).
- Headings: weight 600 max. Body: weight 400.
- No weight above 600 anywhere in the app.
- Type scale: use Tailwind defaults (`text-sm` → `text-4xl`); don't invent custom sizes.

## 4. Core UI Components (in `components/ui/`)

Button, Input, Select, Modal, Card, Badge, Spinner, Table, Tabs, EmptyState, ConfirmDialog, Pagination, ImageUploader.

- **Cards:** `rounded-xl`, `border border-slate-200`, no heavy shadows.
- **Buttons:** solid primary (teal), outline secondary, ghost tertiary — all `rounded-lg` with clear hover/focus/disabled states.
- **Badges:** pill-shaped, colored per the status table above.

## 5. Layout Components (in `components/layout/`)

- **Navbar** — sticky, transparent over hero, solid on scroll.
- **Footer** — links, contact, social.
- **Sidebar** — used inside `DashboardShell`, collapsible, becomes a slide-over drawer on mobile.
- **DashboardShell** — shared shell for all six role dashboards (see `ARCHITECTURE.md` §3 and `roleConfig.js`).

## 6. Common Components (in `components/common/`)

SearchBar, FilterPanel, RatingStars, PriceTag, ListingCard, ReviewCard — shared across public browse pages and all vendor "manage" pages.

## 7. Chart Components (in `components/charts/`)

RevenueChart (bar, last 6 months), BookingsChart (line), StatCard (single-number KPI tile) — built on recharts, used across Hotel/Restaurant/Taxi/Activity/Admin dashboards.

## 8. Page-Level Design Notes

- **Landing page:** full-bleed Himalayan hero image, prominent search bar (destination, dates, guests), horizontal destination cards, 4 category tiles, "Why TravSense" 3-column section, dark "Are you a local business?" vendor-recruitment band, featured listings grid.
- **Explore page:** left filter sidebar (collapsible on mobile) + responsive `ListingCard` grid, debounced search, URL-synced filters.
- **Listing detail page:** image gallery, category-specific booking section, reviews with rating breakdown, sticky booking sidebar on desktop.
- **Vendor dashboards:** stat cards → chart row → recent-activity table → manage-listing page, consistently in that order across all four vendor roles.

## 9. Responsive Breakpoints

Mobile-first; use Tailwind's default `sm` / `md` / `lg` / `xl` breakpoints. Never design desktop-first and retrofit mobile.

## 10. What NOT to do

- Don't introduce a second color palette or a different font per page.
- Don't use default browser alerts/confirms — use the `Modal`/`ConfirmDialog` primitives.
- Don't ship a list view without empty/loading/error states.
- Don't deviate from the amber/green/red/slate status-badge convention anywhere in the app.
