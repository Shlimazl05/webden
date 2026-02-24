const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

// Bắt buộc phải đăng nhập mới được thêm vào giỏ
router.post('/add', protect, cartController.addItem);
router.get('/', protect, cartController.getCart); 
router.put('/update', protect, cartController.updateQuantity); // Dùng PUT để cập nhật
router.delete('/remove/:id', protect, cartController.deleteItem); // Dùng DELETE để xóa
module.exports = router;