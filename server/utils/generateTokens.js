const jwt = require('jsonwebtoken');

// Generate access token & refresh token and send via httpOnly cookies
const generateTokensAndSetCookies = async (user, res) => {
  const accessToken = jwt.sign(
    { _id: user._id, role: user.role, email: user.email },
    process.env.ACCESS_TOKEN_SECRET || 'trawiller_access_token_secret_key_change_in_prod_12345',
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '1d' }
  );

  const refreshToken = jwt.sign(
    { _id: user._id },
    process.env.REFRESH_TOKEN_SECRET || 'trawiller_refresh_token_secret_key_change_in_prod_67890',
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || '10d' }
  );

  // Update refreshToken in database
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  // Cookie options
  const isProduction = process.env.NODE_ENV === 'production';

  const accessTokenOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  };

  const refreshTokenOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
    maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
  };

  res.cookie('accessToken', accessToken, accessTokenOptions);
  res.cookie('refreshToken', refreshToken, refreshTokenOptions);

  return { accessToken, refreshToken };
};

// Helper to clear auth cookies
const clearAuthCookies = (res) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'strict' : 'lax',
  };

  res.clearCookie('accessToken', cookieOptions);
  res.clearCookie('refreshToken', cookieOptions);
};

module.exports = {
  generateTokensAndSetCookies,
  clearAuthCookies,
};
