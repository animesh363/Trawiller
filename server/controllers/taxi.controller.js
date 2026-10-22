const Taxi = require('../models/Taxi');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

// GET /api/v1/taxis - List taxi services
exports.getTaxis = asyncHandler(async (req, res) => {
  const { destination, vehicleType, search } = req.query;
  const filter = {};

  if (destination && destination !== 'All') {
    filter.destination = new RegExp(destination, 'i');
  }

  if (vehicleType && vehicleType !== 'All') {
    filter.vehicleType = vehicleType;
  }

  if (search) {
    filter.$or = [
      { vehicleName: new RegExp(search, 'i') },
      { driverName: new RegExp(search, 'i') },
      { destination: new RegExp(search, 'i') },
    ];
  }

  const taxis = await Taxi.find(filter).sort({ rating: -1, createdAt: -1 });
  return res.status(200).json(new ApiResponse(200, taxis, 'Taxi services fetched successfully'));
});

// GET /api/v1/taxis/my-taxis - Get current vendor's taxis
exports.getMyTaxis = asyncHandler(async (req, res) => {
  const taxis = await Taxi.find({ vendor: req.user._id }).sort({ createdAt: -1 });
  return res.status(200).json(new ApiResponse(200, taxis, 'Your taxi fleet listings fetched successfully'));
});

// GET /api/v1/taxis/:id
exports.getTaxiById = asyncHandler(async (req, res) => {
  const taxi = await Taxi.findById(req.params.id).populate('vendor', 'name email phone');
  if (!taxi) throw new ApiError(404, 'Taxi service not found');
  return res.status(200).json(new ApiResponse(200, taxi, 'Taxi service fetched successfully'));
});

// POST /api/v1/taxis
exports.createTaxi = asyncHandler(async (req, res) => {
  const { driverName, vehicleName, vehicleType, capacity, destination, routes, pricePerKm, dayPackageRate, imageUrl, images } = req.body;
  const imageList = imageUrl ? [imageUrl] : (images || []);
  const taxi = await Taxi.create({
    vendor: req.user._id,
    driverName: driverName || req.user.name,
    vehicleName,
    vehicleType: vehicleType || 'SUV',
    capacity: capacity || 6,
    destination,
    routes: routes || [],
    pricePerKm: pricePerKm || 18,
    dayPackageRate: dayPackageRate || 3500,
    images: imageList,
    contactPhone: req.user.phone,
  });
  return res.status(201).json(new ApiResponse(201, taxi, 'Taxi listing created successfully'));
});
