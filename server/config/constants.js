// Central backend constants and enums for Trawiller Platform

const ROLES = Object.freeze({
  TOURIST: 'tourist',
  HOTEL: 'hotel',
  RESTAURANT: 'restaurant',
  TAXI: 'taxi',
  ACTIVITY: 'activity',
  ADMIN: 'admin',
});

const BOOKING_STATUS = Object.freeze({
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
});

const CATEGORIES = Object.freeze({
  HOTEL: 'hotel',
  RESTAURANT: 'restaurant',
  TAXI: 'taxi',
  ACTIVITY: 'activity',
});

const VERIFICATION_STATUS = Object.freeze({
  PENDING: 'pending',
  VERIFIED: 'verified',
  REJECTED: 'rejected',
});

module.exports = {
  ROLES,
  BOOKING_STATUS,
  CATEGORIES,
  VERIFICATION_STATUS,
};
