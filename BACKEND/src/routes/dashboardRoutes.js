const express = require('express');
const router = express.Router();
const adminController = require('../controllers/dashboardController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/stats', protect, adminOnly, adminController.getDashboardStats);

module.exports = router;