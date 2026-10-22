// Frontend Constants for Trawiller Platform

export const ROLES = Object.freeze({
  TOURIST: 'tourist',
  HOTEL: 'hotel',
  RESTAURANT: 'restaurant',
  TAXI: 'taxi',
  ACTIVITY: 'activity',
  ADMIN: 'admin',
});

export const BOOKING_STATUS = Object.freeze({
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
});

export const CATEGORIES = Object.freeze({
  HOTEL: 'hotel',
  RESTAURANT: 'restaurant',
  TAXI: 'taxi',
  ACTIVITY: 'activity',
});

export const VERIFICATION_STATUS = Object.freeze({
  PENDING: 'pending',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
});

export const DESTINATIONS = [
  { id: 'manali', name: 'Manali', state: 'Himachal Pradesh', tagline: 'Valley of the Gods' },
  { id: 'shimla', name: 'Shimla', state: 'Himachal Pradesh', tagline: 'Queen of the Hills' },
  { id: 'mussoorie', name: 'Mussoorie', state: 'Uttarakhand', tagline: 'Queen of the Mountains' },
  { id: 'rishikesh', name: 'Rishikesh', state: 'Uttarakhand', tagline: 'Yoga Capital of the World' },
  { id: 'nainital', name: 'Nainital', state: 'Uttarakhand', tagline: 'City of Lakes' },
];
