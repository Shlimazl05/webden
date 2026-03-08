const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Cấu trúc: GET /api/customers
router.get('/', protect, adminOnly, customerController.getAllCustomers);

// Cấu trúc: PATCH /api/customers/:id/status
router.patch('/:id/status', protect, adminOnly, customerController.updateCustomerStatus);

module.exports = router;