const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotel.controller');
const { verifyJWT } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');
const { ROLES } = require('../config/constants');

router.get('/', hotelController.getHotels);
router.get('/:id', hotelController.getHotelById);

// Protected vendor/admin routes
router.use(verifyJWT);
router.get('/vendor/my-hotels', authorize(ROLES.HOTEL, ROLES.ADMIN), hotelController.getMyHotels);
router.post('/', authorize(ROLES.HOTEL, ROLES.ADMIN), hotelController.createHotel);
router.post('/:id/rooms', authorize(ROLES.HOTEL, ROLES.ADMIN), hotelController.addRoomToHotel);

module.exports = router;
