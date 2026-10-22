const User = require('../models/User');
const VendorProfile = require('../models/VendorProfile');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const { generateTokensAndSetCookies, clearAuthCookies } = require('../utils/generateTokens');
const { ROLES, VERIFICATION_STATUS } = require('../config/constants');
const jwt = require('jsonwebtoken');

// @route   POST /api/v1/auth/signup
// @desc    Register a new tourist or vendor account
// @access  Public
const signup = asyncHandler(async (req, res) => {
  const { name, email, phone, password, role, businessName, registrationNumber, destination, address } = req.body;

  // Prevent admin creation via public signup
  if (role === ROLES.ADMIN) {
    throw new ApiError(400, 'Admin role cannot be registered via public signup');
  }

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, 'User with this email already exists');
  }

  // Create User document
  const user = await User.create({
    name,
    email,
    phone,
    password,
    role,
  });

  let vendorProfile = null;

  // Create VendorProfile if role is a vendor vertical
  if (role !== ROLES.TOURIST) {
    vendorProfile = await VendorProfile.create({
      user: user._id,
      businessName,
      registrationNumber,
      category: role,
      destination,
      address,
      verificationStatus: VERIFICATION_STATUS.PENDING,
    });
  }

  // Issue tokens and set cookies
  await generateTokensAndSetCookies(user, res);

  const sanitizedUser = await User.findById(user._id);

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        user: sanitizedUser,
        vendorProfile,
      },
      'User registered successfully'
    )
  );
});

// @route   POST /api/v1/auth/login
// @desc    Authenticate user & get tokens
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user and explicitly include password field
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  // Verify password
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    throw new ApiError(401, 'Invalid email or password');
  }

  // Issue tokens & set cookies
  await generateTokensAndSetCookies(user, res);

  let vendorProfile = null;
  if (user.role !== ROLES.TOURIST && user.role !== ROLES.ADMIN) {
    vendorProfile = await VendorProfile.findOne({ user: user._id });
  }

  const sanitizedUser = await User.findById(user._id);

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: sanitizedUser,
        vendorProfile,
      },
      'Logged in successfully'
    )
  );
});

// @route   POST /api/v1/auth/logout
// @desc    Logout user & clear cookies
// @access  Private
const logout = asyncHandler(async (req, res) => {
  if (req.user?._id) {
    await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } });
  }

  clearAuthCookies(res);

  return res.status(200).json(
    new ApiResponse(200, null, 'Logged out successfully')
  );
});

// @route   POST /api/v1/auth/refresh-token
// @desc    Refresh access token using httpOnly refresh cookie
// @access  Public
const refreshToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies?.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, 'Refresh token missing');
  }

  try {
    const decoded = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET || 'trawiller_refresh_token_secret_key_change_in_prod_67890'
    );

    const user = await User.findById(decoded._id).select('+refreshToken');

    if (!user || user.refreshToken !== incomingRefreshToken) {
      throw new ApiError(401, 'Invalid or expired refresh token');
    }

    await generateTokensAndSetCookies(user, res);

    return res.status(200).json(
      new ApiResponse(200, null, 'Access token refreshed successfully')
    );
  } catch (error) {
    throw new ApiError(401, error?.message || 'Invalid refresh token');
  }
});

// @route   GET /api/v1/auth/me
// @desc    Get current logged-in user profile
// @access  Private
const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: req.user,
        vendorProfile: req.vendorProfile || null,
      },
      'Current user profile fetched successfully'
    )
  );
});

// @route   PATCH /api/v1/auth/update-password
// @desc    Update user password
// @access  Private
const updatePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id).select('+password');

  const isPasswordMatch = await user.comparePassword(currentPassword);
  if (!isPasswordMatch) {
    throw new ApiError(400, 'Current password is incorrect');
  }

  user.password = newPassword;
  await user.save();

  return res.status(200).json(
    new ApiResponse(200, null, 'Password updated successfully')
  );
});

module.exports = {
  signup,
  login,
  logout,
  refreshToken,
  getCurrentUser,
  updatePassword,
};
