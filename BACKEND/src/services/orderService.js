// const Order = require('../models/Order');
// const OrderDetail = require('../models/OrderDetail');
// const Product = require('../models/Product');
// const mongoose = require('mongoose');
// /**
//  * LẤY DANH SÁCH ĐƠN HÀNG CHO ADMIN (CÓ SEARCH & PHÂN TRANG)
//  */
// const getAllOrdersAdmin = async (options = {}) => {
//     const { search = '', status = '', page = 1, limit = 10 } = options;
//     const skip = (page - 1) * limit;

//     // 1. Tạo bộ lọc (Filter)
//     const filter = {};
    
//     // Lọc theo trạng thái (nếu có chọn Tab)
//     if (status && status !== 'all') {
//         filter.status = status;
//     }

//     // LOGIC TÌM KIẾM: Tìm theo Mã đơn, Tên người nhận hoặc Số điện thoại
//     if (search) {
//         filter.$or = [
//             { orderCode: { $regex: new RegExp(search, 'i') } },
//             { recipientName: { $regex: new RegExp(search, 'i') } },
//             { phone: { $regex: new RegExp(search, 'i') } }
//         ];
//     }

//     // 2. Truy vấn dữ liệu
//     const [orders, totalOrders] = await Promise.all([
//         Order.find(filter)
//             .populate('customerId', 'username email') // Lấy thông tin tài khoản khách
//             .sort({ createdAt: -1 })
//             .skip(skip)
//             .limit(limit)
//             .lean(),
//         Order.countDocuments(filter)
//     ]);

//     // 3. Lấy chi tiết sản phẩm cho từng đơn hàng (Để hiện ở phần xổ xuống)
//     const ordersWithDetails = await Promise.all(orders.map(async (order) => {
//         const details = await OrderDetail.find({ orderId: order._id })
//             .populate('productId', 'productName productCode imageUrl')
//             .lean();
//         return { ...order, orderDetails: details };
//     }));

//     return {
//         orders: ordersWithDetails,
//         pagination: {
//             totalOrders,
//             totalPages: Math.ceil(totalOrders / limit),
//             currentPage: parseInt(page),
//             limit: parseInt(limit)
//         }
//     };
// };

// /**
//  * CẬP NHẬT TRẠNG THÁI & XỬ LÝ KHO HÀNG
//  */
// const updateOrderStatus = async (orderId, newStatus) => {
//     const order = await Order.findById(orderId);
//     if (!order) throw new Error("Không tìm thấy đơn hàng");

//     const oldStatus = order.status;

//     // --- LOGIC TRỪ KHO (Khi xác nhận đơn: Pending -> Processing) ---
//     if (oldStatus === 'Pending' && newStatus === 'Processing') {
//         const details = await OrderDetail.find({ 
//             orderId: new mongoose.Types.ObjectId(orderId) 
//         });

//         if (!details || details.length === 0) {
//             throw new Error("Đơn hàng không có chi tiết sản phẩm, không thể xử lý");
//         }

//         // BƯỚC 1: KIỂM TRA TOÀN BỘ KHO (Verify Phase)
//         // Chúng ta phải kiểm tra trước tất cả, nếu một món thiếu là dừng cả đơn
//         for (const item of details) {
//             const product = await Product.findById(item.productId);
            
//             if (!product) {
//                 throw new Error(`Sản phẩm với ID ${item.productId} không còn tồn tại trên hệ thống`);
//             }

//             if (product.stockQuantity < item.quantity) {
//                 // Trả về thông báo lỗi cụ thể để Frontend hiển thị toast
//                 throw new Error(`Sản phẩm "${product.productName}" hiện không đủ số lượng trong kho. (Hiện có: ${Math.max(0, product.stockQuantity)}, Cần: ${item.quantity})`);
//             }
//         }

//         // BƯỚC 2: THỰC HIỆN TRỪ KHO (Update Phase)
//         // Khi đã đi đến đây nghĩa là tất cả mặt hàng đều đủ số lượng
//         const updatePromises = details.map(item => 
//             Product.findByIdAndUpdate(item.productId, {
//                 $inc: { stockQuantity: -item.quantity }
//             })
//         );
//         await Promise.all(updatePromises);
//     }

//     // --- LOGIC HOÀN KHO (Khi hủy đơn: Cancelled) ---
//     const statusesThatDeductedStock = ['Processing', 'Shipping', 'Completed'];
//     if (newStatus === 'Cancelled' && statusesThatDeductedStock.includes(oldStatus)) {
//         const details = await OrderDetail.find({ 
//             orderId: new mongoose.Types.ObjectId(orderId) 
//         });

//         const returnPromises = details.map(item => 
//             Product.findByIdAndUpdate(item.productId, {
//                 $inc: { stockQuantity: item.quantity }
//             })
//         );
//         await Promise.all(returnPromises);
//     }

//     // Cập nhật thông tin đơn hàng
//     order.status = newStatus;
//     order.statusHistory.push({
//         status: newStatus,
//         updatedAt: new Date(),
//         note: `Trạng thái được cập nhật bởi Admin`
//     });

//     return await order.save();
// };

// module.exports = {
//     getAllOrdersAdmin,
//     updateOrderStatus
// };

const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
const Product = require('../models/Product');
const mongoose = require('mongoose');

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