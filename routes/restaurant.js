const express = require('express');
const router = express.Router();

const restaurantController = require('../controllers/restaurant');
const validation = require('../middleware/validate');

//get all restaurants
router.get('/', restaurantController.getAllRestaurants);

//get restaurant by ID
router.get('/:id', restaurantController.getSingleRestaurant);

//create new restaurant
router.post(
  '/',
  validation.saveRestaurant,
  restaurantController.createRestaurant
);

//update restaurant
router.put(
  '/:id',
  validation.saveRestaurant,
  restaurantController.updateRestaurant
);

//delete restaurant
router.delete('/:id', restaurantController.deleteRestaurant);

module.exports = router;
