const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');   //KT ĐĂNG NHẬP

// Bắt buộc phải đăng nhập mới được thêm vào giỏ
router.post('/add', protect, cartController.addItem);
router.get('/', protect, cartController.getCart); 
router.patch('/update', protect, cartController.updateQuantity); // Dùng PUT để cập nhật
router.delete('/item/:id', protect, cartController.deleteItem); // Dùng DELETE để xóa

router.post('/remove-selected', protect, cartController.deleteSelectedItems);

module.exports = router;