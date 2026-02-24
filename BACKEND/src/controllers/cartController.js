const cartService = require('../services/cartService');
// THÊM VÀO GIỎ HÀNG
exports.addItem = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id; // Lấy từ Token qua Middleware protect

        const cartItem = await cartService.addToCart(userId, productId, quantity);
        
        res.status(200).json({
            message: "Đã thêm vào giỏ hàng!",
            cartItem
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// XEM GIỎ HÀNG
exports.getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cartData = await cartService.getCart(userId);
        res.status(200).json(cartData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//CẬP NHẬT
exports.updateQuantity = async (req, res) => {
    try {
        const { cartDetailId, quantity } = req.body;
        const updatedItem = await cartService.updateQuantity(cartDetailId, quantity);
        res.status(200).json({ message: "Đã cập nhật số lượng", updatedItem });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//XÓA
exports.deleteItem = async (req, res) => {
    try {
        const { id } = req.params; // Lấy id từ URL /api/cart/remove/ID_Ở_ĐÂY
        await cartService.removeItem(id);
        res.status(200).json({ message: "Đã xóa sản phẩm khỏi giỏ hàng" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};