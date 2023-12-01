const router = require("express").Router();
const validate = require("../middleware/validate");

const clientController = require("../controllers/client.controller");

router.get("/", clientController.getAllClients);
router.get("/:id", clientController.getSingleClient);
router.post("/", validate.saveClient, clientController.createClient);
router.put("/:id", validate.saveClient, clientController.updateClient);
router.delete("/:id", clientController.deleteClient);

module.exports = router;
