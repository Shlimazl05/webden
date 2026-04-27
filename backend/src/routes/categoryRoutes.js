const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Quản lý danh mục
router.post('/', categoryController.createCategory);        // Thêm
router.get('/', categoryController.getAllCategories);      // Lấy danh sách
router.put('/:id', categoryController.updateCategory);     // Sửa
router.delete('/:id', categoryController.deleteCategory);  // Xóa

module.exports = router;