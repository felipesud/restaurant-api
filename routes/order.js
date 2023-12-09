const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order');
const { isAuthenticated } = require('../middleware/authenticate');

//get all orders
router.get('/', orderController.getAllOrders);

//get order by ID
router.get('/:id', orderController.getSingleOrder);

// get order by client name
router.get('/client/:clientName', orderController.getOrderByClientName);

//create new order
router.post('/', isAuthenticated, orderController.createOrder);

//update order
router.put('/:id', isAuthenticated, orderController.updateOrder);

//delete order
router.delete('/:id', isAuthenticated, orderController.deleteOrder);

module.exports = router;
