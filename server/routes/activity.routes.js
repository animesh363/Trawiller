const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activity.controller');
const { verifyJWT } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { ROLES } = require('../config/constants');

router.get('/', activityController.getActivities);
router.get('/:id', activityController.getActivityById);

// Protected vendor/admin routes
router.use(verifyJWT);
router.get('/vendor/my-activities', authorize(ROLES.ACTIVITY, ROLES.ADMIN), activityController.getMyActivities);
router.post('/', authorize(ROLES.ACTIVITY, ROLES.ADMIN), activityController.createActivity);

module.exports = router;
