const express = require('express');
const router = express.Router();
const vnpayController = require('../controllers/vnpayController');

// Đường dẫn đón kết quả trả về từ VNPay (Redirect URL)
// VNPay sẽ gửi dữ liệu qua phương thức GET trên URL
router.get('/return', vnpayController.vnpayReturn);

module.exports = router;