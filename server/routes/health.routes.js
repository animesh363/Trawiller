const express = require('express');
const router = express.Router();
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

// @route   GET /api/v1/health
// @desc    Health check endpoint
// @access  Public
router.get(
  '/',
  asyncHandler(async (req, res) => {
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          status: 'healthy',
          timestamp: new Date().toISOString(),
          uptime: process.uptime(),
          environment: process.env.NODE_ENV || 'development',
        },
        'Trawiller API Server is fully operational'
      )
    );
  })
);

module.exports = router;
