const express = require('express');
const router = express.Router();
const shippingController = require('../controllers/shippingController');

// Quản lý phí ship
router.post('/', shippingController.createShipping);       // Thêm mốc phí
router.get('/', shippingController.getAllShipping);        // Lấy danh sách
router.put('/:id', shippingController.updateShipping);
router.delete('/:id', shippingController.deleteShipping);  // Xóa mốc phí

module.exports = router;