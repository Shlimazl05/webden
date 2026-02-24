const Order = require('../models/Order');
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const CartDetail = require('../models/CartDetail');

const createOrder = async (userId, orderData) => {
    const { address, recipientName, phone, paymentMethod } = orderData;

    // 1. Lấy giỏ hàng hiện tại của khách
    const cart = await Cart.findOne({ userId });
    if (!cart) throw new Error("Giỏ hàng trống!");

    const cartItems = await CartDetail.find({ cartId: cart._id }).populate('productId');
    if (cartItems.length === 0) throw new Error("Giỏ hàng không có sản phẩm!");

    let subTotal = 0;
    const orderItems = [];

    // 2. Kiểm tra tồn kho & Chốt giá từng món đèn
    for (let item of cartItems) {
        if (item.productId.stockQuantity < item.quantity) {
            throw new Error(`Mẫu ${item.productId.productName} đã hết hàng!`);
        }
        
        subTotal += item.quantity * item.unitPrice;
        
        orderItems.push({
            productId: item.productId._id,
            productName: item.productId.productName,
            quantity: item.quantity,
            unitPrice: item.unitPrice
        });
    }

    // 3. Logic phí vận chuyển (Theo đúng luận văn: > 2 triệu Free Ship)
    const shippingFee = subTotal >= 2000000 ? 0 : 50000;
    const totalAmount = subTotal + shippingFee;

    // 4. Tạo Đơn hàng mới
    const newOrder = await Order.create({
      userId,
      orderCode: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      recipientName,
      phone,
      address,
      shippingFee,
      totalAmount,
      paymentMethod,
      items: orderItems,
      // Nếu là COD thì "Chờ xác nhận", nếu là PayPal thì "Chờ thanh toán"
      status: paymentMethod === 'COD' ? 'Chờ xác nhận' : 'Chờ thanh toán'
    });

    // 5. Cập nhật Tồn kho Sản phẩm (Trừ đi số lượng đã mua)
    for (let item of orderItems) {
        await Product.findByIdAndUpdate(item.productId, {
            $inc: { stockQuantity: -item.quantity }
        });
    }

    // 6. Xóa giỏ hàng sau khi đặt thành công
    await CartDetail.deleteMany({ cartId: cart._id });

    return newOrder;
};

module.exports = { createOrder };