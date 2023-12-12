const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//get all Orders
const getAllOrders = async (req, res) => {
  //#swagger.tags=['Orders']
  try {
    const result = await mongodb.getDatabase().db().collection('orders').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

//get one order by id
const getSingleOrder = async (req, res) => {
  //#swagger.tags=['Orders']
  //validation of the id
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid order id to find an order.');
  } else {
    try {
      const orderId = new ObjectId(req.params.id);
      const result = await mongodb
        .getDatabase()
        .db()
        .collection('orders')
        .find({ _id: orderId });
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
      });
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }
};

const getOrderByClientName = async (req, res) => {
  //#swagger.tags=['Orders']
  //validation of the clientName
  if (!req.params.clientName) {
    res.status(400).json('Must use a valid client name to find an order.');
  } else {
    try {
      const clientName = req.params.clientName;
      const result = await mongodb
        .getDatabase()
        .db()
        .collection('orders')
        .find({ clientName: clientName });
      result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
    } catch (err) {
      res.status(400).json({ message: err });
    }
  }
};

const createOrder = async (req, res) => {
  //#swagger.tags=['Orders']
  const order = {
    clientName: req.body.clientName,
    price: req.body.price,
    tableNumber: req.body.tableNumber,
    staffName: req.body.staffName,
    date: req.body.date,
    orderStatus: req.body.orderStatus,
  };

  const response = await mongodb
    .getDatabase()
    .db()
    .collection('orders')
    .insertOne(order);
  if (response.acknowledged > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || 'Some error occurred while creating the order.');
  }
};

const updateOrder = async (req, res) => {
  //#swagger.tags=['Orders']
  //validation of the id
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid order id to update an order.');
  }
  const orderId = new ObjectId(req.params.id);
  const order = {
    clientName: req.body.clientName,
    price: req.body.price,
    tableNumber: req.body.tableNumber,
    staffName: req.body.staffName,
    date: req.body.date,
    orderStatus: req.body.orderStatus,
  };

  const response = await mongodb
    .getDatabase()
    .db()
    .collection('orders')
    .replaceOne({ _id: orderId }, order);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || 'Some error occurred while updating the order.');
  }
};

const deleteOrder = async (req, res) => {
  //#swagger.tags=['Orders']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid order id to delete an order.');
  }
  const orderId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('orders')
    .deleteOne({ _id: orderId }, true);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || 'Some error occurred while deleting the order.');
  }
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getOrderByClientName,
  createOrder,
  updateOrder,
  deleteOrder,
};
