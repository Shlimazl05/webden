const supplierService = require('../services/supplierService');

/**
 * LẤY DANH SÁCH NHÀ CUNG CẤP (KÈM PHÂN TRANG & TÌM KIẾM)
 */
exports.getSuppliers = async (req, res) => {
    try {
        const { search, page, limit } = req.query;
        
        const result = await supplierService.getAllSuppliers({
            search: search || '',
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 10
        });

        res.status(200).json({
            success: true,
            data: result
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Lỗi hệ thống khi lấy danh sách nhà cung cấp",
            error: error.message
        });
    }
};

/**
 * THÊM NHÀ CUNG CẤP MỚI
 */
exports.addSupplier = async (req, res) => {
    try {
        // Dữ liệu từ req.body: { name, phone, email, address, status }
        const supplier = await supplierService.createSupplier(req.body);

        res.status(201).json({
            success: true,
            message: "Thêm nhà cung cấp thành công",
            data: supplier
        });
    } catch (error) {
        // Xử lý lỗi trùng tên (unique key trong database)
        if (error.message.includes("tồn tại")) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
        res.status(400).json({
            success: false,
            message: "Không thể thêm nhà cung cấp",
            error: error.message
        });
    }
};

/**
 * CẬP NHẬT THÔNG TIN NHÀ CUNG CẤP (BAO GỒM CẢ ẨN/HIỆN)
 */
exports.updateSupplier = async (req, res) => {
    try {
        const supplier = await supplierService.updateSupplier(req.params.id, req.body);
        
        if (!supplier) {
            return res.status(404).json({
                success: false,
                message: "Không tìm thấy nhà cung cấp để cập nhật"
            });
        }

        res.status(200).json({
            success: true,
            message: "Cập nhật thành công",
            data: supplier
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Lỗi khi cập nhật thông tin",
            error: error.message
        });
    }
};

/**
 * XÓA VĨNH VIỄN NHÀ CUNG CẤP
 */
exports.deleteSupplier = async (req, res) => {
    try {
        const supplier = await supplierService.deleteSupplier(req.params.id);

        if (!supplier) {
            return res.status(404).json({
                success: false,
                message: "Nhà cung cấp không tồn tại hoặc đã bị xóa trước đó"
            });
        }

        res.status(200).json({
            success: true,
            message: "Xóa nhà cung cấp thành công"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Không thể xóa nhà cung cấp",
            error: error.message
        });
    }
};