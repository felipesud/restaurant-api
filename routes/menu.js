const router = require('express').Router();

const menu = require('../controllers/menu');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', menu.getAllMenu);
router.get('/:id', menu.getSingleMenu);

router.post('/', isAuthenticated, menu.createMenu);

router.put('/:id', isAuthenticated, menu.updateMenu);

router.delete('/:id', isAuthenticated, menu.deleteMenu);

module.exports = router;