const { validationResult } = require('express-validator');
const ApiError = require('../utils/ApiError');

// Middleware to evaluate express-validator result and throw ApiError if validation fails
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = errors.array().map((err) => ({
    field: err.path || err.param,
    message: err.msg,
  }));

  const errorMessage = extractedErrors.map((e) => e.message).join(', ');
  throw new ApiError(400, errorMessage || 'Invalid input validation', extractedErrors);
};

module.exports = validate;
