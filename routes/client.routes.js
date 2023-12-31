const router = require('express').Router();
const validate = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');

const clientController = require('../controllers/client.controller');

router.get('/', clientController.getAllClients);
router.get('/:id', clientController.getSingleClient);
router.post(
  '/',
  isAuthenticated,
  validate.saveClient,
  clientController.createClient
);
router.put(
  '/:id',
  isAuthenticated,
  validate.saveClient,
  clientController.updateClient
);
router.delete('/:id', isAuthenticated, clientController.deleteClient);

module.exports = router;
