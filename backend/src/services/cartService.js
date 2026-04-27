

const Cart = require('../models/Cart');
const CartDetail = require('../models/CartDetail');
const Product = require('../models/Product');

/**
 * 1. XEM GIỎ HÀNG
 * Cập nhật: Trả về trạng thái selected: false để Frontend tự khớp với localStorage
 */
const getCart = async (userId) => {
    const cart = await Cart.findOne({ userId });
    if (!cart) return { items: [], subTotal: 0 };

    // Lấy chi tiết giỏ hàng và đổ dữ liệu Product
    const rawItems = await CartDetail.find({ cartId: cart._id })
        .populate('productId', 'productName imageUrl salePrice specifications stockQuantity');

    const items = rawItems.map(item => ({
        _id: item._id,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        product: item.productId,
        // CẬP NHẬT: Trả về false. 
        // Hook 'useCheckout' và 'useCart' ở Frontend sẽ so khớp ID với localStorage để hiện dấu tích.
        selected: false
    }));

    // subTotal ở đây là tổng tiền của TẤT CẢ sản phẩm trong giỏ (giá trị tham khảo)
    const subTotal = items.reduce((total, item) => {
        return total + (item.quantity * item.unitPrice);
    }, 0);

    return { items, subTotal };
};

/**
 * 2. THÊM VÀO GIỎ HÀNG
 */
const addToCart = async (userId, productId, quantity) => {
    const product = await Product.findById(productId);
    if (!product) throw new Error("Sản phẩm không tồn tại!");
    if (product.stockQuantity < quantity) throw new Error("Số lượng trong kho không đủ!");

    // Tạo giỏ hàng khi thêm sản phẩm
    let cart = await Cart.findOne({ userId });
    if (!cart) {
        cart = await Cart.create({ userId });
    }

    let detail = await CartDetail.findOne({ cartId: cart._id, productId: productId });

    if (detail) {
        detail.quantity += quantity;
        // Kiểm tra tồn kho trước khi lưu
        if (product.stockQuantity < detail.quantity) throw new Error("Tổng số lượng vượt quá tồn kho!");
        await detail.save();
    } else {
        detail = await CartDetail.create({
            cartId: cart._id,
            productId: productId,
            quantity: quantity,
            unitPrice: product.salePrice
        });
    }
    return detail;
};

/**
 * 3. CẬP NHẬT SỐ LƯỢNG
 */
const updateQuantity = async (cartDetailId, newQuantity) => {
    let quantityToUpdate = newQuantity < 1 ? 1 : newQuantity;

    const detail = await CartDetail.findById(cartDetailId).populate('productId');
    if (!detail) throw new Error("Sản phẩm không tồn tại trong giỏ");

    const stock = detail.productId.stockQuantity;
    if (stock < quantityToUpdate) {
        throw new Error(`Số lượng sản phẩm hiện tại chỉ còn ${stock}.`);
    }

    detail.quantity = quantityToUpdate;
    await detail.save();

    return detail;
};

/**
 * 4. XÓA MỘT MÓN
 */
const removeItem = async (cartDetailId) => {
    const result = await CartDetail.findByIdAndDelete(cartDetailId);
    if (!result) throw new Error("Sản phẩm không tồn tại trong giỏ");
    return result;
};

/**
 * 5. XÓA NHIỀU MÓN (Dùng sau khi đặt hàng thành công)
 */
const removeManyItems = async (ids) => {
    if (!ids || ids.length === 0) return null;

    const result = await CartDetail.deleteMany({
        _id: { $in: ids }
    });

    return result;
};

module.exports = {
    addToCart,
    getCart,
    updateQuantity,
    removeItem,
    removeManyItems
};