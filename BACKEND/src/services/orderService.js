const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
const Product = require('../models/Product');

/**
 * LẤY DANH SÁCH ĐƠN HÀNG CHO ADMIN (CÓ SEARCH & PHÂN TRANG)
 */
const getAllOrdersAdmin = async (options = {}) => {
    const { search = '', status = '', page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;

    // 1. Tạo bộ lọc (Filter)
    const filter = {};
    
    // Lọc theo trạng thái (nếu có chọn Tab)
    if (status && status !== 'all') {
        filter.status = status;
    }

    // LOGIC TÌM KIẾM: Tìm theo Mã đơn, Tên người nhận hoặc Số điện thoại
    if (search) {
        filter.$or = [
            { orderCode: { $regex: new RegExp(search, 'i') } },
            { recipientName: { $regex: new RegExp(search, 'i') } },
            { phone: { $regex: new RegExp(search, 'i') } }
        ];
    }

    // 2. Truy vấn dữ liệu
    const [orders, totalOrders] = await Promise.all([
        Order.find(filter)
            .populate('customerId', 'username email') // Lấy thông tin tài khoản khách
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),
        Order.countDocuments(filter)
    ]);

    // 3. Lấy chi tiết sản phẩm cho từng đơn hàng (Để hiện ở phần xổ xuống)
    const ordersWithDetails = await Promise.all(orders.map(async (order) => {
        const details = await OrderDetail.find({ orderId: order._id })
            .populate('productId', 'productName productCode imageUrl')
            .lean();
        return { ...order, orderDetails: details };
    }));

    return {
        orders: ordersWithDetails,
        pagination: {
            totalOrders,
            totalPages: Math.ceil(totalOrders / limit),
            currentPage: parseInt(page),
            limit: parseInt(limit)
        }
    };
};

/**
 * CẬP NHẬT TRẠNG THÁI & XỬ LÝ KHO HÀNG
 */
const updateOrderStatus = async (orderId, newStatus) => {
    const order = await Order.findById(orderId);
    if (!order) throw new Error("Không tìm thấy đơn hàng");

    const oldStatus = order.status;

    // LOGIC HOÀN KHO: Nếu đơn hàng bị Hủy (Cancelled)
    if (newStatus === 'Cancelled' && oldStatus !== 'Cancelled') {
        const details = await OrderDetail.find({ orderId });
        for (const item of details) {
            await Product.findByIdAndUpdate(item.productId, {
                $inc: { stockQuantity: item.quantity } // Cộng lại vào kho
            });
        }
    }

    order.status = newStatus;
    order.statusHistory.push({
        status: newStatus,
        updatedAt: new Date(),
        note: `Trạng thái được cập nhật bởi Admin`
    });

    return await order.save();
};

module.exports = {
    getAllOrdersAdmin,
    updateOrderStatus
};