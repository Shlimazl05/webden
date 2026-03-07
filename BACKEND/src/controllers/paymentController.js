const paymentService = require('../services/paymentService');

exports.handleSePayWebhook = async (req, res) => {
    try {
        console.log(">>> [Payment] Webhook Received:", req.body);
        
        const result = await paymentService.processSePayWebhook(req.body);
        
        // SePay yêu cầu trả về HTTP 200 để xác nhận đã nhận dữ liệu
        res.status(200).json({ status: "success", data: result });
    } catch (error) {
        console.error(">>> [Payment] Webhook Error:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};