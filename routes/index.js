const router = require('express').Router();

//router.use('/', require('./swagger'));

//router.use('/clients', require('./client'));
//router.use('/staff', require('./staff'));
router.use('/restaurants', require('./restaurant'));
//router.use('/menu', require('./menu'));
router.use('/orders', require('./order'));

module.exports = router;
