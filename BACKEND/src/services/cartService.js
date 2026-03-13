// const Cart = require('../models/Cart');
// const CartDetail = require('../models/CartDetail');
// const Product = require('../models/Product');
// //THÊM VÀO GIỎ HÀNG
// const addToCart = async (userId, productId, quantity) => {
//     // 1. Kiểm tra sản phẩm có tồn tại và đủ hàng không
//     const product = await Product.findById(productId);
//     if (!product) throw new Error("Sản phẩm không tồn tại!");
//     if (product.stockQuantity < quantity) throw new Error("Số lượng trong kho không đủ!");

//     // 2. Tìm giỏ hàng của User, nếu chưa có thì tạo mới
//     let cart = await Cart.findOne({ userId });
//     if (!cart) {
//         cart = await Cart.create({ userId });
//     }

//     // 3. Kiểm tra xem sản phẩm này đã nằm trong CartDetail của giỏ này chưa
//     let detail = await CartDetail.findOne({ cartId: cart._id, productId: productId });

//     if (detail) {
//         // Nếu có rồi thì cộng dồn số lượng
//         detail.quantity += quantity;
//         // Kiểm tra lại lần nữa xem tổng số lượng có vượt kho không
//         if (product.stockQuantity < detail.quantity) throw new Error("Tổng số lượng vượt quá tồn kho!");
//         await detail.save();
//     } else {
//         // Nếu chưa có thì tạo dòng mới
//         detail = await CartDetail.create({
//             cartId: cart._id,
//             productId: productId,
//             quantity: quantity,
//             unitPrice: product.salePrice
//         });
//     }

//     return detail;
// };

// // XEM GIỎ HÀNG
// const getCart = async (userId) => {
//     const cart = await Cart.findOne({ userId });
//     if (!cart) return { items: [], subTotal: 0 };

//     // Kéo dữ liệu từ bảng Product sang bảng CartDetail
//     const items = await CartDetail.find({ cartId: cart._id }).populate('productId', 'productName imageUrl salePrice');

//     // Tính tổng tiền của cả giỏ hàng
//     const subTotal = items.reduce((total, item) => {
//         return total + (item.quantity * item.unitPrice);
//     }, 0);

//     return { items, subTotal };
// };

// // 1. Xử lý tăng giảm số lượng
// const updateQuantity = async (cartDetailId, newQuantity) => {
//     if (newQuantity < 1) throw new Error("Số lượng không thể nhỏ hơn 1");

//     const detail = await CartDetail.findById(cartDetailId).populate('productId');
//     if (!detail) throw new Error("Không tìm thấy dòng sản phẩm này trong giỏ");

//     // Kiểm tra tồn kho thực tế của đèn
//     if (detail.productId.stockQuantity < newQuantity) {
//         throw new Error("Số lượng trong kho không đủ!");
//     }

//     detail.quantity = newQuantity;
//     await detail.save();
//     return detail;
// };

// // 2. Xử lý xóa món hàng khỏi giỏ
// const removeItem = async (cartDetailId) => {
//     const result = await CartDetail.findByIdAndDelete(cartDetailId);
//     if (!result) throw new Error("Sản phẩm không tồn tại trong giỏ");
//     return result;
// };

// module.exports = { addToCart, getCart, updateQuantity, removeItem }; 


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
    if (newQuantity < 1) throw new Error("Số lượng không thể nhỏ hơn 1");

    const detail = await CartDetail.findById(cartDetailId).populate('productId');
    if (!detail) throw new Error("Không tìm thấy dòng sản phẩm này trong giỏ");

    if (detail.productId.stockQuantity < newQuantity) {
        throw new Error("Số lượng trong kho không đủ!");
    }

    detail.quantity = newQuantity;
    await detail.save();
    return detail;
};

// 4. XÓA MÓN (Giữ nguyên logic)
const removeItem = async (cartDetailId) => {
    const result = await CartDetail.findByIdAndDelete(cartDetailId);
    if (!result) throw new Error("Sản phẩm không tồn tại trong giỏ");
    return result;
};

module.exports = { addToCart, getCart, updateQuantity, removeItem };