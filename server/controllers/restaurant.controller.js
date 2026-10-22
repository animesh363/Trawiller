const Restaurant = require('../models/Restaurant');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

// GET /api/v1/restaurants - List all restaurants with filters
exports.getRestaurants = asyncHandler(async (req, res) => {
  const { destination, search, cuisine } = req.query;
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

  if (cuisine) {
    filter.cuisine = new RegExp(cuisine, 'i');
  }

  const restaurants = await Restaurant.find(filter).sort({ rating: -1, createdAt: -1 });
  return res.status(200).json(new ApiResponse(200, restaurants, 'Restaurants fetched successfully'));
});

// GET /api/v1/restaurants/my-restaurants - Get current vendor's restaurants
exports.getMyRestaurants = asyncHandler(async (req, res) => {
  const restaurants = await Restaurant.find({ vendor: req.user._id }).sort({ createdAt: -1 });
  return res.status(200).json(new ApiResponse(200, restaurants, 'Your restaurant listings fetched successfully'));
});

// GET /api/v1/restaurants/:id - Get restaurant details
exports.getRestaurantById = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id).populate('vendor', 'name email phone');
  if (!restaurant) {
    throw new ApiError(404, 'Restaurant not found');
  }
  return res.status(200).json(new ApiResponse(200, restaurant, 'Restaurant details fetched successfully'));
});

// POST /api/v1/restaurants - Create new restaurant
exports.createRestaurant = asyncHandler(async (req, res) => {
  const { name, destination, cuisine, address, description, openingHours, priceRange, imageUrl, images, contactPhone, menu } = req.body;
  const imageList = imageUrl ? [imageUrl] : (images || []);
  const restaurant = await Restaurant.create({
    vendor: req.user._id,
    name,
    destination,
    cuisine: cuisine || ['Organic Cafe', 'Himachali'],
    address,
    description,
    openingHours: openingHours || '08:00 AM - 10:00 PM',
    priceRange: priceRange || '$$',
    images: imageList,
    contactPhone: contactPhone || req.user.phone,
    menu: menu || [],
  });
  return res.status(201).json(new ApiResponse(201, restaurant, 'Restaurant created successfully'));
});

// POST /api/v1/restaurants/:id/dishes - Add dish to restaurant menu
exports.addDishToRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);
  if (!restaurant) throw new ApiError(404, 'Restaurant not found');

  if (restaurant.vendor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw new ApiError(403, 'Unauthorized to modify menu');
  }

  const { name, category, price, description, isVeg, image } = req.body;
  restaurant.menu.push({ name, category, price, description, isVeg, image });
  await restaurant.save();

  return res.status(200).json(new ApiResponse(200, restaurant, 'Dish added to menu successfully'));
});
