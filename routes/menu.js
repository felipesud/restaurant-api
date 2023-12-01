const router = require('express').Router();

const menu = require('../controllers/menu');
const validation = require('../middleware/validate');

router.get('/', menu.getAllMenus);
router.get('/:id', menu.getSingleMenu);

router.post('/', validation.saveMenu, menu.createMenu);

router.put('/:id', validation.saveMenu, menu.updateMenu);

router.delete('/:id', menu.deleteMenu);

module.exports = router;