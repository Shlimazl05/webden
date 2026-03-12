const express = require('express');
const router = express.Router();
const controller = require('../controllers/importOrderController');

router.post('/', controller.createOrder);
router.get('/', controller.getOrders);

router.delete('/:id', controller.deleteImportOrder); 

module.exports = router;