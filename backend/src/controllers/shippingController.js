

const shippingService = require('../services/shippingService');

const shippingController = {
    getAllShipping: async (req, res) => {
        try {
            const data = await shippingService.getAllRules();
            res.status(200).json({ success: true, data });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },

    createShipping: async (req, res) => {
        try {
            const data = await shippingService.createRule(req.body);
            res.status(201).json({ success: true, data });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    },

    // --- HÀM MỚI BỔ SUNG ---
    updateShipping: async (req, res) => {
        try {
            // Lấy ID từ params và dữ liệu mới từ body
            const data = await shippingService.updateRule(req.params.id, req.body);
            res.status(200).json({ success: true, data });
        } catch (error) {
            res.status(400).json({ success: false, message: error.message });
        }
    },

    deleteShipping: async (req, res) => {
        try {
            await shippingService.deleteRule(req.params.id);
            res.status(200).json({ success: true, message: 'Xóa thành công' });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
};

module.exports = shippingController;