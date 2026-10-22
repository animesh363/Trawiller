const Booking = require('../models/Booking');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

// POST /api/v1/bookings - Create new booking
exports.createBooking = asyncHandler(async (req, res) => {
  const { itemType, itemId, itemTitle, destination, startDate, endDate, guests, totalAmount, vendor, notes } = req.body;

  const booking = await Booking.create({
    tourist: req.user._id,
    vendor,
    itemType,
    itemId,
    itemTitle,
    destination,
    startDate: startDate ? new Date(startDate) : new Date(),
    endDate: endDate ? new Date(endDate) : undefined,
    guests: guests || 1,
    totalAmount,
    notes: notes || '',
    status: 'confirmed',
    paymentStatus: 'paid',
  });

  return res.status(201).json(new ApiResponse(201, booking, 'Booking confirmed successfully'));
});

// GET /api/v1/bookings/my-bookings - Get current logged-in tourist's bookings
exports.getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ tourist: req.user._id }).sort({ createdAt: -1 });
  return res.status(200).json(new ApiResponse(200, bookings, 'Your bookings fetched successfully'));
});

// GET /api/v1/bookings/vendor-bookings - Get vendor's received bookings
exports.getVendorBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ vendor: req.user._id }).populate('tourist', 'name email phone').sort({ createdAt: -1 });
  return res.status(200).json(new ApiResponse(200, bookings, 'Vendor bookings fetched successfully'));
});

// PUT /api/v1/bookings/:id/status - Update booking status
exports.updateBookingStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const booking = await Booking.findById(req.params.id);
  if (!booking) throw new ApiError(404, 'Booking not found');

  booking.status = status;
  await booking.save();
  return res.status(200).json(new ApiResponse(200, booking, 'Booking status updated successfully'));
});
