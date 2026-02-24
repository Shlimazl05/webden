const vnpayService = require('../services/vnpayService');
const Order = require('../models/Order');

exports.vnpayReturn = async (req, res) => {
    try {
        const result = vnpayService.validateReturn(req.query);

        if (result.success) {
            // Cập nhật trạng thái đơn hàng trong DB
            await Order.findByIdAndUpdate(result.orderId, { status: 'Đã thanh toán' });
            res.status(200).json({ message: "Thanh toán thành công!", orderId: result.orderId });
        } else {
            res.status(400).json({ message: result.message });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};