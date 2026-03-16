// const express = require('express');
// const router = express.Router();
// const orderController = require('../controllers/orderController');
// const { protect } = require('../middleware/authMiddleware');

// // Tuyến đường dành cho Admin quản lý
// router.get('/admin/all',protect, orderController.getAdminOrders);
// router.patch('/admin/:id/status', protect, orderController.updateStatus);

// // Route cho khách hàng (Cần middleware đăng nhập)
// router.post('/create',protect, orderController.createNewOrder);
// module.exports = router;


const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Import cả protect và adminOnly từ middleware
const { protect, adminOnly } = require('../middleware/authMiddleware');

// --- TUYẾN ĐƯỜNG DÀNH CHO ADMIN ---
// Cần đăng nhập (protect) VÀ phải là Admin (adminOnly)
router.get('/admin/all', protect, adminOnly, orderController.getAdminOrders);
router.patch('/admin/:id/status', protect, adminOnly, orderController.updateStatus);

// --- TUYẾN ĐƯỜNG DÀNH CHO KHÁCH HÀNG ---

// Đường dẫn: PATCH /api/orders/mine/:id/cancel
router.patch('/:id/cancel', protect, orderController.cancelMyOrder);
router.get('/mine', protect, orderController.getMyOrders);
router.post('/create', protect, orderController.createNewOrder);
router.get('/status/:orderCode', protect, orderController.checkOrderStatus);


module.exports = router;