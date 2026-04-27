const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Đường dẫn đón kết quả trả về từ VNPay (Redirect URL)
// VNPay sẽ gửi dữ liệu qua phương thức GET trên URL
router.post('/webhook/sepay', paymentController.handleSePayWebhook);

module.exports = router;