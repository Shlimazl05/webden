const customerService = require('../services/customerService');

// 1. Lấy danh sách khách hàng
// D:\webden\backend\controllers\customerController.js

const getAllCustomers = async (req, res) => {
    try {
        const search = req.query.search || '';
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const result = await customerService.getAllCustomers(search, page, limit);
        
        res.status(200).json({
            success: true,
            data: result // Trả về { customers: [], totalPages: x }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. Cập nhật trạng thái
const updateCustomerStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body; // Nhận 'Active' hoặc 'Blocked'

        const newStatus = await customerService.updateStatus(id, status);

        res.status(200).json({
            success: true,
            message: "Cập nhật trạng thái thành công",
            data: { status: newStatus }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getAllCustomers,
    updateCustomerStatus
};