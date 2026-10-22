const Hotel = require('../models/Hotel');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

// GET /api/v1/hotels - List all hotels with filters
exports.getHotels = asyncHandler(async (req, res) => {
  const { destination, minPrice, maxPrice, search } = req.query;
  const filter = {};

  if (destination && destination !== 'All') {
    filter.destination = new RegExp(destination, 'i');
  }

  if (search) {
    filter.$or = [
      { name: new RegExp(search, 'i') },
      { destination: new RegExp(search, 'i') },
      { address: new RegExp(search, 'i') },
    ];
  }

  const hotels = await Hotel.find(filter).sort({ rating: -1, createdAt: -1 });
  return res.status(200).json(new ApiResponse(200, hotels, 'Hotels fetched successfully'));
});

// GET /api/v1/hotels/my-hotels - Get current logged-in vendor's hotels
exports.getMyHotels = asyncHandler(async (req, res) => {
  const hotels = await Hotel.find({ vendor: req.user._id }).sort({ createdAt: -1 });
  return res.status(200).json(new ApiResponse(200, hotels, 'Your hotel listings fetched successfully'));
});

// GET /api/v1/hotels/:id - Get hotel details by ID
exports.getHotelById = asyncHandler(async (req, res) => {
  const hotel = await Hotel.findById(req.params.id).populate('vendor', 'name email phone');
  if (!hotel) {
    throw new ApiError(404, 'Hotel not found');
  }
  return res.status(200).json(new ApiResponse(200, hotel, 'Hotel details fetched successfully'));
});

// POST /api/v1/hotels - Create new hotel listing (Vendor)
exports.createHotel = asyncHandler(async (req, res) => {
  const { name, destination, address, description, starRating, amenities, imageUrl, images, contactPhone, rooms } = req.body;
  const imageList = imageUrl ? [imageUrl] : (images || []);
  const hotel = await Hotel.create({
    vendor: req.user._id,
    name,
    destination,
    address,
    description,
    starRating: starRating || 4,
    amenities: amenities || ['WiFi', 'Parking', 'Mountain View'],
    images: imageList,
    contactPhone: contactPhone || req.user.phone,
    rooms: rooms || [{ title: 'Deluxe Room', type: 'deluxe', pricePerNight: 3500 }],
  });
  return res.status(201).json(new ApiResponse(201, hotel, 'Hotel created successfully'));
});

// POST /api/v1/hotels/:id/rooms - Add room to hotel
exports.addRoomToHotel = asyncHandler(async (req, res) => {
  const hotel = await Hotel.findById(req.params.id);
  if (!hotel) throw new ApiError(404, 'Hotel not found');

  if (hotel.vendor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw new ApiError(403, 'Unauthorized to add rooms to this hotel');
  }

  const { title, type, pricePerNight, capacity, amenities, images } = req.body;
  hotel.rooms.push({ title, type, pricePerNight, capacity, amenities, images });
  await hotel.save();

  return res.status(200).json(new ApiResponse(200, hotel, 'Room added successfully'));
});
