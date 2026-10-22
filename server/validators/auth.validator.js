const { body } = require('express-validator');
const { ROLES } = require('../config/constants');

const signupValidator = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 50 })
    .withMessage('Name cannot exceed 50 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('role')
    .notEmpty()
    .withMessage('Role is required')
    .isIn([ROLES.TOURIST, ROLES.HOTEL, ROLES.RESTAURANT, ROLES.TAXI, ROLES.ACTIVITY])
    .withMessage('Invalid signup role selected'),
  
  // Conditional validation for vendor roles
  body('businessName')
    .if((value, { req }) => req.body.role && req.body.role !== ROLES.TOURIST)
    .trim()
    .notEmpty()
    .withMessage('Business name is required for vendors'),
  body('registrationNumber')
    .if((value, { req }) => req.body.role && req.body.role !== ROLES.TOURIST)
    .trim()
    .notEmpty()
    .withMessage('Registration number is required for vendors'),
  body('destination')
    .if((value, { req }) => req.body.role && req.body.role !== ROLES.TOURIST)
    .trim()
    .notEmpty()
    .withMessage('Destination location is required for vendors'),
  body('address')
    .if((value, { req }) => req.body.role && req.body.role !== ROLES.TOURIST)
    .trim()
    .notEmpty()
    .withMessage('Business address is required for vendors'),
];

const loginValidator = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

const updatePasswordValidator = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .notEmpty()
    .withMessage('New password is required')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long'),
];

module.exports = {
  signupValidator,
  loginValidator,
  updatePasswordValidator,
};
