const router = require('express').Router();
const validate = require('../middleware/validate');
const menu = require('../controllers/menu');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', menu.getAllMenus);
router.get('/:id', menu.getSingleMenu);

router.post('/', isAuthenticated, validate.saveMenu, menu.createMenu);

router.put('/:id', isAuthenticated, validate.saveMenu, menu.updateMenu);

router.delete('/:id', isAuthenticated, menu.deleteMenu);

module.exports = router;
