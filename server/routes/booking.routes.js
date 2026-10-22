const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const { verifyJWT } = require('../middleware/auth.middleware');

router.use(verifyJWT);

router.post('/', bookingController.createBooking);
router.get('/my-bookings', bookingController.getMyBookings);
router.get('/vendor-bookings', bookingController.getVendorBookings);
router.put('/:id/status', bookingController.updateBookingStatus);

module.exports = router;
