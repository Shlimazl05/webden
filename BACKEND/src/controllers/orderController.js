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
