
const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
const Product = require('../models/Product');
const Cart = require('../models/Cart'); 
const CartDetail = require('../models/CartDetail');
const mongoose = require('mongoose');
const paymentService = require('./paymentService');
const cron = require('node-cron');



const generateQrUrl = (finalAmount, orderCode) => {
    const bankAcc = process.env.BANK_NUMBER;
    const bankName = process.env.BANK_NAME;
    // Math.round để đảm bảo số tiền là số nguyên
    const amount = Math.round(finalAmount || 0);
    return `https://qr.sepay.vn/img?acc=${bankAcc}&bank=${bankName}&amount=${amount}&des=${orderCode}`;
};

/**
 * LẤY DANH SÁCH ĐƠN HÀNG (ADMIN)
 */
// exports.getAllOrdersAdmin = async (options = {}) => {
//     const { search = '', status = '', page = 1, limit = 10, customerId = null } = options;
//     const skip = (page - 1) * limit;

//     const filter = {};
//     if (status && status !== 'all') filter.status = status;
//     if (customerId) filter.customerId = customerId;
//     if (search) {
//         filter.$or = [
//             { orderCode: { $regex: new RegExp(search, 'i') } },
//             { recipientName: { $regex: new RegExp(search, 'i') } },
//             { phone: { $regex: new RegExp(search, 'i') } },
//             { note: { $regex: new RegExp(search, 'i') } }
//         ];
//     }

//     const [orders, totalOrders] = await Promise.all([
//         Order.find(filter)
//             .populate('customerId', 'username email')
//             .sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
//         Order.countDocuments(filter)
//     ]);

//     const ordersWithDetails = await Promise.all(orders.map(async (order) => {
//         const details = await OrderDetail.find({ orderId: order._id })
//             .populate('productId', 'productName productCode imageUrl').lean();

//         let checkoutUrl = null;
//         if (order.paymentMethod === 'SePay' && order.status === 'Pending' && order.paymentStatus !== 'Paid') {
//             checkoutUrl = generateQrUrl(order.finalAmount, order.orderCode);
//         }

//         return { ...order, orderDetails: details, checkoutUrl };
//     }));

//     return { orders: ordersWithDetails, pagination: { totalOrders, totalPages: Math.ceil(totalOrders / limit), currentPage: parseInt(page) } };
// };

exports.getAllOrdersAdmin = async (options = {}) => {
    const { search = '', status = '', page = 1, limit = 10, customerId = null } = options;
    const skip = (page - 1) * limit;

    const filter = {};
    if (status && status !== 'all') filter.status = status;
    if (customerId) filter.customerId = customerId;
    if (search) {
        filter.$or = [
            { orderCode: { $regex: new RegExp(search, 'i') } },
            { recipientName: { $regex: new RegExp(search, 'i') } },
            { phone: { $regex: new RegExp(search, 'i') } },
            { note: { $regex: new RegExp(search, 'i') } }
        ];
    }

    // Sử dụng try-catch để bắt lỗi truy vấn
    try {
        const [orders, totalOrders] = await Promise.all([
            Order.find(filter)
                .populate('customerId', 'username email')
                .sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
            Order.countDocuments(filter)
        ]);

        const ordersWithDetails = await Promise.all(orders.map(async (order) => {
            const details = await OrderDetail.find({ orderId: order._id })
                .populate('productId', 'productName productCode imageUrl').lean();

            let checkoutUrl = null;
            // Logic tạo link thanh toán cho đơn hàng SePay chưa trả tiền
            if (order.paymentMethod === 'SePay' && order.status === 'Pending' && order.paymentStatus !== 'Paid') {
                // Gọi hàm helper đã định nghĩa ở trên
                checkoutUrl = generateQrUrl(order.finalAmount, order.orderCode);
            }

            return { ...order, orderDetails: details, checkoutUrl };
        }));

        return {
            orders: ordersWithDetails,
            pagination: {
                totalOrders,
                totalPages: Math.ceil(totalOrders / limit),
                currentPage: parseInt(page)
            }
        };
    } catch (error) {
        console.error("Lỗi tại getAllOrdersAdmin:", error.message);
        throw error; // Đẩy lỗi ra để Controller bắt được
    }
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
 * TỰ ĐỘNG QUÉT VÀ HỦY ĐƠN HÀNG SAU 10 PHÚT (Hợp nhất và Tự động hóa)
 */
exports.startOrderCleanupTask = () => {
    // Thiết lập lịch chạy: Cứ mỗi 1 phút quét 1 lần
    cron.schedule('* * * * *', async () => {
        try {
            // Tính mốc 10 phút trước
            const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

            // 1. Tìm đơn hàng thỏa mãn điều kiện
            const expiredOrders = await Order.find({
                status: 'Pending',
                paymentMethod: 'SePay',
                paymentStatus: { $ne: 'Paid' }, // Chưa thanh toán
                createdAt: { $lt: tenMinutesAgo } // Tạo quá 10 phút trước
            });

            if (expiredOrders.length > 0) {
                for (let order of expiredOrders) {
                    order.status = 'Cancelled';
                    order.statusHistory.push({
                        status: 'Cancelled',
                        updatedAt: new Date(),
                        note: 'Hệ thống: Tự động hủy đơn do quá hạn thanh toán 10 phút.'
                    });
                    await order.save();
                    console.log(`[Auto-Cancel] Đã hủy đơn: ${order.orderCode}`);
                }
            }
        } catch (error) {
            console.error("Lỗi tác vụ tự động hủy đơn:", error.message);
        }
    });

    console.log("[CRON JOB]: Tác vụ tự động hủy đơn sau 10p đã được kích hoạt.");
};


/**
 * TẠO ĐƠN HÀNG MỚI & LẤY LINK THANH TOÁN
 */


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