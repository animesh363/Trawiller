const jwt = require('jsonwebtoken');
const User = require('../models/User');
const VendorProfile = require('../models/VendorProfile');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const { ROLES } = require('../config/constants');

// Middleware to verify JWT token and attach user & vendorProfile to req
const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    throw new ApiError(401, 'Unauthorized request — Token missing');
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET || 'trawiller_access_token_secret_key_change_in_prod_12345'
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, 'Invalid Access Token — User not found');
    }

    req.user = user;

    // Attach VendorProfile if user is a vendor role
    if (user.role !== ROLES.TOURIST && user.role !== ROLES.ADMIN) {
      const vendorProfile = await VendorProfile.findOne({ user: user._id });
      req.vendorProfile = vendorProfile || null;
    }

    next();
  } catch (error) {
    throw new ApiError(401, error?.message || 'Invalid or expired access token');
  }
});

module.exports = {
  verifyJWT,
};
