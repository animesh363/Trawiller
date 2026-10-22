import {
  User,
  Hotel,
  UtensilsCrossed,
  Car,
  Compass,
  ShieldAlert,
} from 'lucide-react';
import { ROLES } from '../utils/constants';

// Configuration mapping for all six roles in Trawiller
export const ROLE_CONFIG = {
  [ROLES.TOURIST]: {
    id: ROLES.TOURIST,
    label: 'Tourist / Traveler',
    dashboardPath: '/dashboard/tourist',
    icon: User,
    color: 'emerald',
    description: 'Discover and book hotels, restaurants, taxis, and adventure activities across Indian hill stations.',
    navItems: [
      { path: '/dashboard/tourist', label: 'My Bookings', icon: 'Calendar' },
      { path: '/dashboard/tourist/wishlist', label: 'Wishlist', icon: 'Heart' },
      { path: '/dashboard/tourist/reviews', label: 'My Reviews', icon: 'Star' },
      { path: '/dashboard/tourist/profile', label: 'Profile Settings', icon: 'User' },
    ],
  },
  [ROLES.HOTEL]: {
    id: ROLES.HOTEL,
    label: 'Hotel / Homestay Owner',
    dashboardPath: '/dashboard/hotel',
    icon: Hotel,
    color: 'teal',
    description: 'List your property, manage room inventory, pricing, availability, and guest reservations.',
    navItems: [
      { path: '/dashboard/hotel', label: 'Overview', icon: 'LayoutDashboard' },
      { path: '/dashboard/hotel/property', label: 'Property Profile', icon: 'Building' },
      { path: '/dashboard/hotel/rooms', label: 'Manage Rooms', icon: 'BedDouble' },
      { path: '/dashboard/hotel/bookings', label: 'Room Bookings', icon: 'CalendarCheck' },
    ],
  },
  [ROLES.RESTAURANT]: {
    id: ROLES.RESTAURANT,
    label: 'Restaurant / Dhaba Owner',
    dashboardPath: '/dashboard/restaurant',
    icon: UtensilsCrossed,
    color: 'amber',
    description: 'Display your culinary menu, list specialties, veg/non-veg options, and receive table reservations.',
    navItems: [
      { path: '/dashboard/restaurant', label: 'Overview', icon: 'LayoutDashboard' },
      { path: '/dashboard/restaurant/menu', label: 'Manage Menu', icon: 'Utensils' },
      { path: '/dashboard/restaurant/reservations', label: 'Table Reservations', icon: 'BookOpen' },
    ],
  },
  [ROLES.TAXI]: {
    id: ROLES.TAXI,
    label: 'Taxi Driver / Operator',
    dashboardPath: '/dashboard/taxi',
    icon: Car,
    color: 'blue',
    description: 'Offer fixed-fare mountain routes, manage vehicle fleets, and accept tourist cab bookings.',
    navItems: [
      { path: '/dashboard/taxi', label: 'Overview', icon: 'LayoutDashboard' },
      { path: '/dashboard/taxi/vehicles', label: 'Manage Vehicles', icon: 'Car' },
      { path: '/dashboard/taxi/routes', label: 'Fares & Routes', icon: 'Navigation' },
      { path: '/dashboard/taxi/bookings', label: 'Ride Requests', icon: 'CheckSquare' },
    ],
  },
  [ROLES.ACTIVITY]: {
    id: ROLES.ACTIVITY,
    label: 'Activity / Adventure Operator',
    dashboardPath: '/dashboard/activity',
    icon: Compass,
    color: 'purple',
    description: 'Promote trekking, rafting, paragliding, or camping with slot management and booking capacity.',
    navItems: [
      { path: '/dashboard/activity', label: 'Overview', icon: 'LayoutDashboard' },
      { path: '/dashboard/activity/listings', label: 'My Activities', icon: 'Compass' },
      { path: '/dashboard/activity/slots', label: 'Time Slots', icon: 'Clock' },
      { path: '/dashboard/activity/bookings', label: 'Activity Bookings', icon: 'Users' },
    ],
  },
  [ROLES.ADMIN]: {
    id: ROLES.ADMIN,
    label: 'Platform Administrator',
    dashboardPath: '/dashboard/admin',
    icon: ShieldAlert,
    color: 'rose',
    description: 'Verify local vendor registrations, moderate platform listings, and view system analytics.',
    navItems: [
      { path: '/dashboard/admin', label: 'Admin Overview', icon: 'ShieldAlert' },
      { path: '/dashboard/admin/verifications', label: 'Vendor Approvals', icon: 'UserCheck' },
      { path: '/dashboard/admin/listings', label: 'Moderation Queue', icon: 'ListFilter' },
      { path: '/dashboard/admin/analytics', label: 'Analytics', icon: 'BarChart' },
    ],
  },
};

export const getDashboardPathForRole = (role) => {
  return ROLE_CONFIG[role]?.dashboardPath || '/dashboard/tourist';
};
