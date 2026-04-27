
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// ----- CLIENT ----- //
// Lấy danh sách sản phẩm (để hiện ở trang chủ, trang danh mục)
router.get('/', productController.getProducts);
// Lấy chi tiết 1 sản phẩm (Sửa lỗi 404 tại đây)
router.get('/:id', productController.getProductById); 

// ----- ADMIN ----- //
router.get('/', protect, adminOnly,productController.getProducts);
router.post('/add',protect, adminOnly, productController.addProduct);
router.patch('/:id',protect,  adminOnly, productController.updateProduct); // Dùng Patch để update một phần
router.delete('/:id',protect, adminOnly, productController.deleteProduct);

module.exports = router;