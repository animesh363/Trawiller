# PRD.md — TravSense Product Requirements

## 1. Problem Statement

Tourists visiting Indian hill-station destinations (Manali, Shimla, Mussoorie, Rishikesh, Nainital) face three unsolved problems:

1. **Fragmentation** — hotels on one app, restaurants on Zomato/Google, taxis negotiated on the street, local shops nowhere online. No single place to plan a trip end-to-end.
2. **Unfair market** — big OTAs and chain hotels dominate visibility; local homestays, dhabas, taxi unions, and artisan shops get bypassed even though they are the backbone of the local economy.
3. **No trust layer** — tourists can't verify who is legitimate (registered hotel vs. random listing, licensed driver vs. anyone with a car), so trip quality is a gamble.

## 2. One-Line Pitch

> A single verified platform where tourists discover and book hotels, restaurants, taxis, and activities — and where local businesses finally get equal visibility and digital presence.

## 3. Target Users

| User | Description |
|---|---|
| Tourist | Plans and books a hill-station trip across multiple service categories |
| Hotel/Homestay owner | Small-to-mid local property owner, currently underrepresented on big OTAs |
| Restaurant owner | Local eatery/dhaba/cafe owner |
| Taxi driver/operator | Individual driver or small taxi union operator |
| Activity operator | Adventure/local-experience provider (rafting, paragliding, trekking, camping) |
| Admin | Platform operator who verifies vendors and moderates content |

## 4. Goals

- Give tourists one place to discover, compare, and book across four verticals (stays, food, transport, activities) for a single destination.
- Give local vendors a **zero-middleman, low-commission** way to list themselves online in minutes.
- Establish a **trust layer**: vendor verification + reviews gated to real completed bookings only.
- Architect the platform so a 5th/6th vendor vertical (e.g., trek guides, campsite operators) can be added without a redesign.

## 5. Non-Goals (explicitly out of scope for MVP)

- Offline mode / SMS gateways
- Police or government integration
- Native mobile apps
- Real payment gateway integration (mock the payment flow only)
- AI itinerary planning, demand forecasting, SOS/safety features (roadmap only, not built)

## 6. Core MVP Features

### Tourist-facing
- Browse/search all four categories with filters (destination, price, rating, amenities, category-specific filters)
- Destination pages showing all verified listings in that region
- Listing detail pages (images, pricing, reviews)
- Booking flow: dates/guests (hotel), slots (activity), routes (taxi), menu order/reservation (restaurant)
- My Bookings (upcoming / completed / cancelled)
- Wishlist
- Reviews & ratings — gated to verified/completed bookings only
- Tourist dashboard showing everything booked for a trip in one view

### Vendor-facing (Hotel / Restaurant / Taxi / Activity)
- Onboarding with business details + registration number (creates trust signal even without hard document verification)
- Full CRUD for category-specific listings:
  - Hotel → rooms, pricing, amenities, availability
  - Restaurant → menu items by category, veg/non-veg, specialty dishes
  - Taxi → vehicles, routes, fixed fares
  - Activity → activities, difficulty, slots, capacity
- Booking/request management (confirm, cancel, complete)
- Basic analytics: bookings, revenue, rating trend

### Admin
- Vendor verification queue (approve/reject with reason)
- Platform-wide analytics: users by role, bookings, revenue, top destinations
- Listing moderation (force-deactivate any listing)

## 7. Success Criteria (for the demo / MVP)

- A tourist can sign up, search Manali hotels, filter by price, view a listing, and complete a mock booking.
- A hotel owner can log in to a pre-seeded account, view their dashboard, and add a room live.
- An admin can approve a pending vendor and see it go live in search immediately after.
- All six roles have a distinct, working dashboard reachable via one shared login system.

## 8. Differentiation

| Existing products | TravSense |
|---|---|
| MakeMyTrip/Booking.com — hotels/flights only | One platform, four verticals |
| Zomato/Swiggy — food only, not travel-aware | Destination-aware restaurant discovery tied to the trip |
| OTAs rank by commission paid | Ranking is rating/trust-based — small vendors can compete |
| No unified vendor self-service | Any vendor signs up and lists themselves in minutes, no middleman |
| High OTA commissions (15–25%) | Low/zero-commission, vendor-first positioning |

## 9. Constraints

- Must be demoable end-to-end in a single session (hackathon-shaped MVP).
- Must be architected so scope can grow (new destinations, new vendor categories) without redesign.
- Everything must run locally via `npm install && npm run dev` from the repo root.
