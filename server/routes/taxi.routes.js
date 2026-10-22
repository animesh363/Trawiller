const express = require('express');
const router = express.Router();
const taxiController = require('../controllers/taxi.controller');
const { verifyJWT } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { ROLES } = require('../config/constants');

router.get('/', taxiController.getTaxis);
router.get('/:id', taxiController.getTaxiById);

// Protected vendor/admin routes
router.use(verifyJWT);
router.get('/vendor/my-taxis', authorize(ROLES.TAXI, ROLES.ADMIN), taxiController.getMyTaxis);
router.post('/', authorize(ROLES.TAXI, ROLES.ADMIN), taxiController.createTaxi);

module.exports = router;
