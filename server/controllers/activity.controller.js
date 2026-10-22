const Activity = require('../models/Activity');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

// GET /api/v1/activities - List all activities / yoga centers with filters
exports.getActivities = asyncHandler(async (req, res) => {
  const { destination, category, search, difficulty } = req.query;
  const filter = {};

  if (destination && destination !== 'All') {
    filter.destination = new RegExp(destination, 'i');
  }

  if (category && category !== 'All') {
    filter.category = category;
  }

  if (difficulty) {
    filter.difficulty = difficulty;
  }

  if (search) {
    filter.$or = [
      { title: new RegExp(search, 'i') },
      { destination: new RegExp(search, 'i') },
      { location: new RegExp(search, 'i') },
      { description: new RegExp(search, 'i') },
    ];
  }

  const activities = await Activity.find(filter).sort({ rating: -1, createdAt: -1 });
  return res.status(200).json(new ApiResponse(200, activities, 'Activities and Yoga centers fetched successfully'));
});

// GET /api/v1/activities/my-activities - Get current vendor's activities & yoga sessions
exports.getMyActivities = asyncHandler(async (req, res) => {
  const activities = await Activity.find({ vendor: req.user._id }).sort({ createdAt: -1 });
  return res.status(200).json(new ApiResponse(200, activities, 'Your activity listings fetched successfully'));
});

// GET /api/v1/activities/:id - Get activity details
exports.getActivityById = asyncHandler(async (req, res) => {
  const activity = await Activity.findById(req.params.id).populate('vendor', 'name email phone');
  if (!activity) {
    throw new ApiError(404, 'Activity or Yoga center not found');
  }
  return res.status(200).json(new ApiResponse(200, activity, 'Activity details fetched successfully'));
});

// POST /api/v1/activities - Create new Activity or Yoga Center
exports.createActivity = asyncHandler(async (req, res) => {
  const { title, category, destination, location, description, duration, pricePerPerson, maxGroupSize, difficulty, inclusions, imageUrl, images } = req.body;
  const imageList = imageUrl ? [imageUrl] : (images || []);
  const activity = await Activity.create({
    vendor: req.user._id,
    title,
    category: category || 'adventure',
    destination,
    location,
    description,
    duration: duration || '2 Hours',
    pricePerPerson,
    maxGroupSize: maxGroupSize || 15,
    difficulty: difficulty || 'Easy',
    inclusions: inclusions || [],
    images: imageList,
    contactPhone: req.user.phone,
  });
  return res.status(201).json(new ApiResponse(201, activity, 'Activity / Yoga Center created successfully'));
});
