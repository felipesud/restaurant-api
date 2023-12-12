const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate');
const staffController = require('../controllers/staff');
const { isAuthenticated } = require('../middleware/authenticate');

//const {isAuthenticated} = require('../middleware/authenticate');

router.get('/', staffController.getAll);

router.get('/:id', staffController.getSingle);

router.post(
  '/',
  isAuthenticated,
  validate.saveStaff,
  staffController.createStaff
);

router.put(
  '/:id',
  isAuthenticated,
  validate.saveStaff,
  staffController.updateStaff
);

router.delete('/:id', isAuthenticated, staffController.deleteStaff);

module.exports = router;
