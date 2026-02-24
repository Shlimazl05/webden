const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create', protect, orderController.placeOrder);
router.post('/confirm-payment', protect, orderController.confirmPayment);
module.exports = router;