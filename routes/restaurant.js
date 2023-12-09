const express = require('express');
const router = express.Router();

const restaurantController = require('../controllers/restaurant');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

//get all restaurants
router.get('/', restaurantController.getAllRestaurants);

//get restaurant by ID
router.get('/:id', restaurantController.getSingleRestaurant);

//create new restaurant
router.post(
  '/',
  isAuthenticated,
  restaurantController.createRestaurant
);

//update restaurant
router.put(
  '/:id',
  isAuthenticated,
  restaurantController.updateRestaurant
);

//delete restaurant
router.delete('/:id', isAuthenticated, restaurantController.deleteRestaurant);

module.exports = router;
