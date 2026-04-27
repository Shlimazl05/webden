


// D:\webden\BACKEND\src\controllers\cartController.js

const cartService = require('../services/cartService');

// THÊM VÀO GIỎ HÀNG
exports.addItem = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;

        const cartItem = await cartService.addToCart(userId, productId, quantity);

        // CẬP NHẬT: Trả về success: true để Frontend nhận diện được
        res.status(200).json({
            success: true,
            message: "Đã thêm vào giỏ hàng!",
            data: cartItem
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// XEM GIỎ HÀNG
exports.getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cartData = await cartService.getCart(userId);

        // CẬP NHẬT: Bọc dữ liệu vào object có success và data
        // Đây là lý do tại sao Frontend của bạn không hiện (vì nó tìm json.success và json.data)
        res.status(200).json({
            success: true,
            data: cartData
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// CẬP NHẬT SỐ LƯỢNG
exports.updateQuantity = async (req, res) => {
    try {
        
        const { cartDetailId, quantity } = req.body;

        const updatedItem = await cartService.updateQuantity(cartDetailId, quantity);
        res.status(200).json({
            success: true,
            message: "Đã cập nhật số lượng",
            data: updatedItem
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// XÓA MỤC
exports.deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        await cartService.removeItem(id);
        res.status(200).json({
            success: true,
            message: "Đã xóa sản phẩm khỏi giỏ hàng"
        });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

exports.deleteSelectedItems = async (req, res) => {
    try {
        // Lấy mảng 'ids' từ body (khớp với { ids: cartDetailIds } ở frontend api)
        const { ids } = req.body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Không có sản phẩm nào được chọn để xóa"
            });
        }

        // Gọi service để xóa hàng loạt
        await cartService.removeManyItems(ids);

        res.status(200).json({
            success: true,
            message: `Đã xóa thành công ${ids.length} mục khỏi giỏ hàng`
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Lỗi khi xóa các mục đã chọn"
        });
    }
};