const express = require('express');
const { generateTravelPlan } = require('../controllers/ai.controller');

const router = express.Router();

// POST /api/v1/ai/travel-plan
router.post('/travel-plan', generateTravelPlan);

module.exports = router;
