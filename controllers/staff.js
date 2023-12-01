const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

//get all staff
const getAll = async (req, res) => {
  //#swagger.tags=['Staff']
  try {
    const result = await mongodb.getDatabase().db().collection('staff').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (error) {
    console.log(error); 
    res.status(500).json(response.error || 'Error trying to get staff list.');
  }
};

//get staff by id
const getSingle = async (req, res) => {
  //#swagger.tags=['Staff']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid staff id to find a staff.');
  }
  try {    
  const userId = new ObjectId(req.params.id);
  const result = await mongodb.getDatabase().db().collection('staff').find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
} catch (error) {
  console.log(error); 
    res.status(500).json(response.error || 'Error trying to get staff.');
}
};

//create new staff
const createStaff = async (req, res) => {
  //#swagger.tags=['Staff']
  const newStaff = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthday: req.body.birthday,    
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    jobPosition: req.body.jobPosition,
    active: req.body.active,
    restaurantName: req.body.restaurantName
  };
  const response = await mongodb.getDatabase().db().collection('staff').insertOne(newStaff);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the staff.');
  }
};

const updateStaff = async (req, res) => {
  //#swagger.tags=['Staff']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid staff id to find a staff.');
  }
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const updateStaff = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    birthday: req.body.birthday,    
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    jobPosition: req.body.jobPosition,
    active: req.body.active,
    restaurantName: req.body.restaurantName
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection('staff')
    .replaceOne({ _id: userId }, updateStaff);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the staff.');
  }
};

const deleteStaff = async (req, res) => {
  //#swagger.tags=['Staff']
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid staff id to find a staff.');
  }
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDatabase().db().collection('staff').deleteOne({ _id: userId });
  console.log(response);
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the staff.');
  }
};

module.exports = {
  getAll,
  getSingle,
  createStaff,
  updateStaff,
  deleteStaff
};