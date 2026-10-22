const ApiError = require('../utils/ApiError');

// Middleware to authorize routes based on allowed roles
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new ApiError(401, 'Unauthorized request — Please log in first');
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new ApiError(
        403,
        `Forbidden — Role '${req.user.role}' is not authorized to access this resource`
      );
    }

    next();
  };
};

module.exports = authorize;
module.exports.authorize = authorize;
