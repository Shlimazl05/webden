

// const express = require('express');
// const router = express.Router();
// const productController = require('../controllers/productController');

// // Khai báo các Middleware (giữ lại cấu trúc để bạn dễ dàng bật lên khi làm phần Auth)
// // const { protect, adminOnly } = require('../middleware/authMiddleware');

// /**
//  * @route   GET /api/products
//  * @desc    Lấy danh sách tất cả sản phẩm
//  * @access  Public (hoặc có thể thêm protect nếu cần)
//  */
// router.get('/', productController.getProducts);

// /**
//  * @route   POST /api/products/add
//  * @desc    Thêm sản phẩm mới vào kho
//  * @access  Private (Hiện tại đang tắt protect để bạn tiện test Postman)
//  */
// // Khi nào làm xong Auth, bạn đổi thành: router.post('/add', protect, productController.addProduct);
// router.post('/add', productController.addProduct);

// /**
//  * @route   DELETE /api/products/:id
//  * @desc    Xóa sản phẩm (Để dành cho các bước sau)
//  */
// // router.delete('/:id', protect, adminOnly, productController.deleteProduct);

// module.exports = router;

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.getProducts);
router.post('/add', productController.addProduct);
router.patch('/:id', productController.updateProduct); // Dùng Patch để update một phần
router.delete('/:id', productController.deleteProduct);

module.exports = router;