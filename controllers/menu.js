const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//get all Menu
const getAllMenu = async (req, res) => {
  //#swagger.tags = ['Menu']
  try {
    const result = await mongodb.getDatabase().db().collection('menu').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const getSingleMenu = async (req, res) => {
  //#swagger.tags = ['Menu']
  //validation of the id
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid menu id to find a menu.');
  } else {
    try {
      const menuId = new ObjectId(req.params.id);
      const result = await mongodb
        .getDatabase()
        .db()
        .collection('menu')
        .find({ _id: menuId });
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
      });
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }
};

const createMenu = async (req, res) => {
  //#swagger.tags = ['Menu']
  const menu = {
    foodName: req.body.foodName,
    category: req.body.category,
    price: req.body.price,
    description: req.body.description,
    stock: req.body.stock,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('menu')
    .insertOne(menu);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || 'Some error occurred while creating the menu.');
  }
};

const updateMenu = async (req, res) => {
  //#swagger.tags = ['Menu']
  //validation of the id
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid menu id to update a menu.');
  }
  const menuId = new ObjectId(req.params.id);
  const menu = {
    foodName: req.body.foodName,
    category: req.body.category,
    price: req.body.price,
    description: req.body.description,
    stock: req.body.stock,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('menu')
    .replaceOne({ _id: menuId }, menu);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || 'Some error occurred while updating the menu.');
  }
};

const deleteMenu = async (req, res) => {
  //#swagger.tags = ['Menu']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid menu id to delete a menu.');
  }
  const menuId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('menu')
    .deleteOne({ _id: menuId }, true);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || 'Some error occurred while deleting the menu.');
  }
};

module.exports = {
  getAllMenu,
  getSingleMenu,
  createMenu,
  updateMenu,
  deleteMenu,
};
