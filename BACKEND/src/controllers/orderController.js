const orderService = require('../services/orderService');

exports.getAdminOrders = async (req, res) => {
    try {
        const { page, limit, status, search } = req.query;
        const result = await orderService.getAllOrdersAdmin({
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 10,
            status,
            search
        });
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await orderService.updateOrderStatus(req.params.id, status);
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};



// TAO DON HANG

exports.createNewOrder = async (req, res) => {
    try {
        // req.user._id lấy từ middleware xác thực của bạn
        const customerId = req.user._id || req.user?.id; 
        if (!customerId) {
            return res.status(401).json({
                success: false,
                message: "Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại!"
            });
        }
        // Gọi Service xử lý logic
        const result = await orderService.createOrder(req.body, customerId);

        res.status(201).json({
            success: true,
            message: "Đặt hàng thành công",
            data: result
        });
    } catch (error) {
        console.error("Lỗi Controller tạo đơn:", error.message);
        res.status(400).json({ 
            success: false, 
            message: error.message 
        });
    }
};