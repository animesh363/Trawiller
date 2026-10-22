const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const {
  signup,
  login,
  logout,
  refreshToken,
  getCurrentUser,
  updatePassword,
} = require('../controllers/auth.controller');
const { verifyJWT } = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const {
  signupValidator,
  loginValidator,
  updatePasswordValidator,
} = require('../validators/auth.validator');

// Rate limiting middleware for auth endpoints: 5 attempts per 15 mins per IP
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {
    success: false,
    statusCode: 429,
    message: 'Too many authentication attempts from this IP, please try again after 15 minutes',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Public auth routes
router.post('/signup', authLimiter, signupValidator, validate, signup);
router.post('/login', authLimiter, loginValidator, validate, login);
router.post('/refresh-token', refreshToken);

// Protected auth routes
router.use(verifyJWT);
router.post('/logout', logout);
router.get('/me', getCurrentUser);
router.patch('/update-password', updatePasswordValidator, validate, updatePassword);

module.exports = router;
