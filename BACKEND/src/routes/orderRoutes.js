const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Tuyến đường dành cho Admin quản lý
router.get('/admin/all', orderController.getAdminOrders);
router.patch('/admin/:id/status', orderController.updateStatus);

module.exports = router;