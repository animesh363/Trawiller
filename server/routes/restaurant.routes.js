const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurant.controller');
const { verifyJWT } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { ROLES } = require('../config/constants');

router.get('/', restaurantController.getRestaurants);
router.get('/:id', restaurantController.getRestaurantById);

// Protected vendor/admin routes
router.use(verifyJWT);
router.get('/vendor/my-restaurants', authorize(ROLES.RESTAURANT, ROLES.ADMIN), restaurantController.getMyRestaurants);
router.post('/', authorize(ROLES.RESTAURANT, ROLES.ADMIN), restaurantController.createRestaurant);
router.post('/:id/dishes', authorize(ROLES.RESTAURANT, ROLES.ADMIN), restaurantController.addDishToRestaurant);

module.exports = router;
