const paymentService = require('../services/paymentService');
const Order = require('../models/Order');
const orderService = require('../services/orderService');
const Payment = require('../models/Payment');

exports.handleSePayWebhook = async (req, res) => {
    try {
        // Gửi body sang service xử lý toàn bộ logic
        const result = await paymentService.processSePayWebhook(req.body);

        // Trả về 200 cho SePay để họ biết đã xong việc
        return res.status(200).json(result);
    } catch (error) {
        console.error("Lỗi Webhook SePay:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};