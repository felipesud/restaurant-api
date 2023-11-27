const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//get all Restaurants
const getAllRestaurants = async (req, res) => {
  //#swagger.tags=['Restaurants']
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection('restaurants')
      .find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

//get one restaurant by id
const getSingleRestaurant = async (req, res) => {
  //#swagger.tags=['Restaurants']
  //validation of the id
  if (!ObjectId.isValid(req.params.id)) {
    res
      .status(400)
      .json('Must use a valid restaurant id to find a restaurant.');
  } else {
    try {
      const restaurantId = new ObjectId(req.params.id);
      const result = await mongodb
        .getDatabase()
        .db()
        .collection('restaurants')
        .find({ _id: restaurantId });
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
      });
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }
};

const createRestaurant = async (req, res) => {
  //#swagger.tags=['Restaurants']
  const restaurant = {
    restaurantName: req.body.restaurantName,
    streetAddress: req.body.streetAddress,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    zipCode: req.body.zipCode,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
  };

  const response = await mongodb
    .getDatabase()
    .db()
    .collection('restaurants')
    .insertOne(restaurant);
  if (response.acknowledged > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || 'Some error occurred while creating the restaurant.'
      );
  }
};

const updateRestaurant = async (req, res) => {
  //#swagger.tags=['Restaurants']
  //validation of the id
  if (!ObjectId.isValid(req.params.id)) {
    res
      .status(400)
      .json('Must use a valid restaurant id to update a restaurant.');
  }
  const restaurantId = new ObjectId(req.params.id);
  const restaurant = {
    restaurantName: req.body.restaurantName,
    streetAddress: req.body.streetAddress,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
    zipCode: req.body.zipCode,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
  };

  const response = await mongodb
    .getDatabase()
    .db()
    .collection('restaurants')
    .replaceOne({ _id: restaurantId }, restaurant);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || 'Some error occurred while updating the restaurant.'
      );
  }
};

const deleteRestaurant = async (req, res) => {
  //#swagger.tags=['Restaurants']
  if (!ObjectId.isValid(req.params.id)) {
    res
      .status(400)
      .json('Must use a valid restaurant id to delete a restaurant.');
  }
  const restaurantId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('restaurants')
    .deleteOne({ _id: restaurantId }, true);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || 'Some error occurred while deleting the restaurant.'
      );
  }
};

module.exports = {
  getAllRestaurants,
  getSingleRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
