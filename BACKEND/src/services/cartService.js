

const Cart = require('../models/Cart');
const CartDetail = require('../models/CartDetail');
const Product = require('../models/Product');

// 1. XEM GIỎ HÀNG (Sửa lại để khớp tên biến với Frontend)
const getCart = async (userId) => {
    const cart = await Cart.findOne({ userId });
    if (!cart) return { items: [], subTotal: 0 };

    // Lấy chi tiết giỏ hàng và đổ dữ liệu Product vào productId
    const rawItems = await CartDetail.find({ cartId: cart._id })
        .populate('productId', 'productName imageUrl salePrice specifications stockQuantity');

    // MAP lại dữ liệu để chuyển 'productId' thành 'product' cho đúng chuẩn Frontend
    const items = rawItems.map(item => ({
        _id: item._id,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        // Ép trường productId thành tên product để Frontend hiển thị được
        product: item.productId,
        // Đảm bảo luôn có trường selected để không bị lỗi tính toán ở Frontend
        selected: item.selected !== undefined ? item.selected : true
    }));

    // Tính tổng tiền
    const subTotal = items.reduce((total, item) => {
        // Chỉ tính tiền cho những món được chọn (nếu có logic selected)
        return total + (item.quantity * item.unitPrice);
    }, 0);

    return { items, subTotal };
};

// 2. THÊM VÀO GIỎ HÀNG (Giữ nguyên logic của ní nhưng trả về data chuẩn)
const addToCart = async (userId, productId, quantity) => {
    const product = await Product.findById(productId);
    if (!product) throw new Error("Sản phẩm không tồn tại!");
    if (product.stockQuantity < quantity) throw new Error("Số lượng trong kho không đủ!");

    let cart = await Cart.findOne({ userId });
    if (!cart) {
        cart = await Cart.create({ userId });
    }

    let detail = await CartDetail.findOne({ cartId: cart._id, productId: productId });

    if (detail) {
        detail.quantity += quantity;
        detail.selected = true;
        if (product.stockQuantity < detail.quantity) throw new Error("Tổng số lượng vượt quá tồn kho!");
        await detail.save();
    } else {
        detail = await CartDetail.create({
            cartId: cart._id,
            productId: productId,
            quantity: quantity,
            unitPrice: product.salePrice,
            selected: true // Mặc định món mới thêm sẽ được chọn
        });
    }
    return detail;
};

// 3. CẬP NHẬT SỐ LƯỢNG (Giữ nguyên logic)
const updateQuantity = async (cartDetailId, newQuantity) => {
    // Tự động đưa về 1 nếu số lượng nhập vào nhỏ hơn 1 (Không bắn lỗi)
    let quantityToUpdate = newQuantity < 1 ? 1 : newQuantity;

    const detail = await CartDetail.findById(cartDetailId).populate('productId');
    if (!detail) throw new Error("Sản phẩm không tồn tại trong giỏ");

    const stock = detail.productId.stockQuantity;

    // Chỉ bắn lỗi khi vượt quá kho hàng
    if (stock < quantityToUpdate) {
        throw new Error(`Số lượng sản phẩm hiện tại chỉ còn ${stock}.`);
    }

    detail.quantity = quantityToUpdate;
    await detail.save();

    return detail;
};

// 4. XÓA MÓN (Giữ nguyên logic)
const removeItem = async (cartDetailId) => {
    const result = await CartDetail.findByIdAndDelete(cartDetailId);
    if (!result) throw new Error("Sản phẩm không tồn tại trong giỏ");
    return result;
};

const removeManyItems = async (ids) => {
    // Kiểm tra đầu vào
    if (!ids || ids.length === 0) return null;

    // Sử dụng deleteMany kết hợp toán tử $in để xóa hàng loạt
    const result = await CartDetail.deleteMany({
        _id: { $in: ids }
    });

    // Trả về kết quả (số lượng đã xóa)
    return result;
};


module.exports = { addToCart, getCart, updateQuantity, removeItem, removeManyItems };