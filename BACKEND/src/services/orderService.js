
const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
const Product = require('../models/Product');
const Cart = require('../models/Cart'); 
const CartDetail = require('../models/CartDetail');
const mongoose = require('mongoose');
const paymentService = require('./paymentService');
/**
 * LẤY DANH SÁCH ĐƠN HÀNG (ADMIN)
 */
exports.getAllOrdersAdmin = async (options = {}) => {
    const { search = '', status = '', page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    const filter = {};
    if (status && status !== 'all') filter.status = status;

    if (search) {
        filter.$or = [
            { orderCode: { $regex: new RegExp(search, 'i') } },
            { recipientName: { $regex: new RegExp(search, 'i') } },
            { phone: { $regex: new RegExp(search, 'i') } },
            { note: { $regex: new RegExp(search, 'i') } }
        ];
    }

    const [orders, totalOrders] = await Promise.all([
        Order.find(filter)
            .populate('customerId', 'username email')
            .sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
        Order.countDocuments(filter)
    ]);

    const ordersWithDetails = await Promise.all(orders.map(async (order) => {
        const details = await OrderDetail.find({ orderId: order._id })
            .populate('productId', 'productName productCode imageUrl').lean();
        return { ...order, orderDetails: details };
    }));

    return { orders: ordersWithDetails, pagination: { totalOrders, totalPages: Math.ceil(totalOrders / limit), currentPage: parseInt(page) } };
};

/**
 * CẬP NHẬT TRẠNG THÁI & XỬ LÝ KHO (Dùng chung cho cả Admin và PaymentService)
 */
exports.updateOrderStatus = async (orderId, newStatus, customNote = null) => {
    const order = await Order.findById(orderId);
    if (!order) throw new Error("Không tìm thấy đơn hàng");

    const oldStatus = order.status;

    // --- LOGIC TRỪ KHO (Khi xác nhận đơn: Pending -> Processing) ---
    if (oldStatus === 'Pending' && newStatus === 'Processing') {
        const details = await OrderDetail.find({ orderId });
        if (!details.length) throw new Error("Đơn hàng không có sản phẩm để trừ kho");

        // Kiểm tra kho
        for (const item of details) {
            const product = await Product.findById(item.productId);
            if (!product || product.stockQuantity < item.quantity) {
                throw new Error(`Sản phẩm "${product?.productName}" không đủ hàng.`);
            }
        }
        // Thực hiện trừ kho
        await Promise.all(details.map(item => 
            Product.findByIdAndUpdate(item.productId, { $inc: { stockQuantity: -item.quantity } })
        ));
    }

    // --- LOGIC HOÀN KHO (Khi hủy đơn) ---
    const statusesDeducted = ['Processing', 'Shipping', 'Completed'];
    if (newStatus === 'Cancelled' && statusesDeducted.includes(oldStatus)) {
        const details = await OrderDetail.find({ orderId });
        await Promise.all(details.map(item => 
            Product.findByIdAndUpdate(item.productId, { $inc: { stockQuantity: item.quantity } })
        ));
    }

    order.status = newStatus;
    order.statusHistory.push({
        status: newStatus,
        updatedAt: new Date(),
        note: customNote || `Cập nhật bởi hệ thống/Admin`
    });

    return await order.save();
};

/**
 * Tự động hủy các đơn hàng Pending/SePay quá 24h mà chưa thanh toán đủ
 * Bạn có thể dùng thư viện 'node-cron' để gọi hàm này mỗi giờ
 */
exports.autoCancelExpiredOrders = async () => {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    // Tìm các đơn: Pending + Phương thức SePay + Đặt trước 24h trước + Chưa thanh toán đủ
    const expiredOrders = await Order.find({
        status: 'Pending',
        paymentMethod: 'SePay',
        paymentStatus: { $ne: 'Paid' },
        createdAt: { $lt: twentyFourHoursAgo }
    });

    for (let order of expiredOrders) {
        order.status = 'Cancelled';
        order.statusHistory.push({
            status: 'Cancelled',
            updatedAt: new Date(),
            note: 'Hệ thống: Tự động hủy đơn hàng do quá hạn thanh toán 24 giờ.'
        });
        await order.save();
        console.log(`[Auto-Cancel] Đã hủy đơn: ${order.orderCode}`);
    }
};



/**
 * TẠO ĐƠN HÀNG MỚI & LẤY LINK THANH TOÁN
 */

// exports.createOrder = async (orderData, customerId) => {
//     // 1. Tạo mã đơn hàng duy nhất
//     const orderCode = `STL-${Date.now().toString().slice(-6)}`;

//     // 2. Tạo đơn hàng chính trong DB
//     const newOrder = await Order.create({
//         ...orderData,
//         orderCode,
//         customerId,
//         paymentStatus: 'Pending',
//         status: 'Pending'
//     });

//     // 3. Lưu chi tiết sản phẩm (OrderDetails)
//     if (orderData.items && orderData.items.length > 0) {
//         const detailRecords = orderData.items.map(item => ({
//             orderId: newOrder._id,
//             productId: item.productId,
//             quantity: item.quantity,
//             unitPrice: item.price // Giá chốt tại thời điểm mua
//         }));
//         await OrderDetail.insertMany(detailRecords);

//         // --- XÓA SẢN PHẨM TRONG GIỎ HÀNG SAU KHI ĐẶT ---//

//     }

//     // 4. LOGIC CHUYỂN LINK: Nếu thanh toán qua SePay thì gọi lấy link
//     let checkoutUrl = null;
//     if (orderData.paymentMethod === 'SePay') {
//         checkoutUrl = await paymentService.createSePayPaymentLink(newOrder);
//     }

//     return {
//         order: newOrder,
//         checkoutUrl: checkoutUrl // Link này sẽ được gửi về Frontend
//     };
// };

exports.createOrder = async (orderData, customerId) => {
    // 1. Tạo mã đơn hàng duy nhất
    const orderCode = `STL-${Date.now().toString().slice(-6)}`;

    // 2. Tạo đơn hàng chính trong DB
    const newOrder = await Order.create({
        ...orderData,
        orderCode,
        customerId,
        paymentStatus: 'Pending',
        status: 'Pending'
    });

    // 3. Lưu chi tiết sản phẩm (OrderDetails)
    if (orderData.items && orderData.items.length > 0) {
        const detailRecords = orderData.items.map(item => ({
            orderId: newOrder._id,
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.price
        }));
        await OrderDetail.insertMany(detailRecords);

        // --- XỬ LÝ XÓA GIỎ HÀNG SAU KHI ĐẶT ---
        try {
            // Lấy ra danh sách các ID của bản ghi trong bảng CartDetail
            const cartDetailIds = orderData.items
                .map(item => item.cartDetailId)
                .filter(id => id); // Lọc bỏ các giá trị null/undefined

            if (cartDetailIds.length > 0) {
                // Xóa TRỰC TIẾP các bản ghi trong CartDetail dựa trên _id
                // Vì cartDetailId là khóa chính (_id) nên ta không cần tìm CartId vòng vo nữa
                const deleteResult = await CartDetail.deleteMany({
                    _id: { $in: cartDetailIds }
                });

                console.log(`[Cart Success] Đã xóa ${deleteResult.deletedCount} sản phẩm đã mua khỏi giỏ hàng.`);
            } else {
                console.warn("[Cart Warning] Payload không chứa cartDetailId nên không thể xóa giỏ hàng.");
            }
        } catch (cartError) {
            console.error("Lỗi khi xử lý xóa giỏ hàng:", cartError.message);
            // Không throw lỗi ở đây để khách hàng vẫn thấy đặt hàng thành công
        }
    }

    // 4. LOGIC CHUYỂN LINK THANH TOÁN (Gói Free dùng QR tĩnh)
    const bankAcc = process.env.BANK_NUMBER;
    const bankName = process.env.BANK_NAME;
    const checkoutUrl = orderData.paymentMethod === 'SePay'
        ? `https://qr.sepay.vn/img?acc=${bankAcc}&bank=${bankName}&amount=${Math.round(newOrder.finalAmount)}&des=${newOrder.orderCode}`
        : null;

    return {
        order: newOrder,
        checkoutUrl: checkoutUrl
    };
};