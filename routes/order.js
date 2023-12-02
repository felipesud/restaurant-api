const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order');
const validation = require('../middleware/validate');

//get all orders
router.get('/', orderController.getAllOrders);

//get order by ID
router.get('/:id', orderController.getSingleOrder);

// get order by client name
router.get('/client/:clientName', orderController.getOrderByClientName);

//create new order
router.post('/', validation.saveOrder, orderController.createOrder);

//update order
router.put('/:id', validation.saveOrder, orderController.updateOrder);

//delete order
router.delete('/:id', orderController.deleteOrder);

module.exports = router;
