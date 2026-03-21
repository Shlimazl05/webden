// const orderService = require('../services/orderService');
// const Order = require('../models/Order');
// const OrderDetail = require('../models/OrderDetail');
// const Product = require('../models/Product');

// exports.getAdminOrders = async (req, res) => {
//     try {
//         const { page, limit, status, search } = req.query;
//         const result = await orderService.getAllOrdersAdmin({
//             page: parseInt(page) || 1,
//             limit: parseInt(limit) || 10,
//             status,
//             search
//         });
//         res.status(200).json({ success: true, data: result });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// exports.updateStatus = async (req, res) => {
//     try {
//         const { status } = req.body;
//         const order = await orderService.updateOrderStatus(req.params.id, status);
//         res.status(200).json({ success: true, data: order });
//     } catch (error) {
//         res.status(400).json({ success: false, message: error.message });
//     }
// };



// // TAO DON HANG

// exports.createNewOrder = async (req, res) => {
//     try {
//         // req.user._id lấy từ middleware xác thực của bạn
//         const customerId = req.user._id || req.user?.id; 
//         if (!customerId) {
//             return res.status(401).json({
//                 success: false,
//                 message: "Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại!"
//             });
//         }
//         // Gọi Service xử lý logic
//         const result = await orderService.createOrder(req.body, customerId);

//         res.status(201).json({
//             success: true,
//             message: "Đặt hàng thành công",
//             data: result
//         });
//     } catch (error) {
//         console.error("Lỗi Controller tạo đơn:", error.message);
//         res.status(400).json({ 
//             success: false, 
//             message: error.message 
//         });
//     }
// };


// // ------ API kiểm tra trạng thái đơn hàng ------//
// exports.checkOrderStatus = async (req, res) => {
//     try {
//         const { orderCode } = req.params;
//         // Tìm đơn hàng và chỉ lấy trường status
//         const order = await Order.findOne({ orderCode }).select('status');

//         if (!order) {
//             return res.status(404).json({ success: false, message: "Không tìm thấy đơn hàng" });
//         }

//         res.status(200).json({ success: true, status: order.status });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };


// // Lấy danh sách đơn hàng của chính người dùng đang đăng nhập
// exports.getMyOrders = async (req, res) => {
//     try {
//         const { page, limit, status } = req.query;
//         const customerId = req.user._id; // Lấy ID từ middleware xác thực

//         const result = await orderService.getAllOrdersAdmin({
//             page: parseInt(page) || 1,
//             limit: parseInt(limit) || 10,
//             status: status,
//             customerId: customerId // Truyền thêm customerId để lọc
//         });
//         console.log("Số lượng đơn hàng tìm thấy:", result.orders.length);

//         res.status(200).json({ success: true, data: result });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// exports.cancelMyOrder = async (req, res) => {
//     try {
//         const orderId = req.params.id;
//         const customerId = req.user._id || req.user.id;

//         console.log("===> SERVER NHẬN LỆNH HỦY ĐƠN:", orderId);

//         // 1. Tìm đơn hàng và kiểm tra quyền sở hữu
//         const order = await Order.findOne({ _id: orderId, customerId: customerId });

//         if (!order) {
//             return res.status(404).json({ success: false, message: "Không tìm thấy đơn hàng" });
//         }

//         // 2. Chỉ cho phép hủy khi đơn đang ở trạng thái Pending
//         if (order.status !== 'Pending') {
//             return res.status(400).json({
//                 success: false,
//                 message: "Không thể hủy đơn hàng đã được xử lý hoặc đã giao"
//             });
//         }

//         // 3. Gọi service để cập nhật trạng thái thành Cancelled
//         // Hàm updateOrderStatus bạn đã có trong orderService rồi
//         const updatedOrder = await orderService.updateOrderStatus(
//             orderId,
//             'Cancelled',
//             'Khách hàng tự hủy đơn'
//         );

//         res.status(200).json({ success: true, data: updatedOrder });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };


const orderService = require('../services/orderService');
const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
const Product = require('../models/Product');
const User = require('../models/User'); 
const Cart = require('../models/Cart');
/**
 * 1. DÀNH CHO ADMIN: LẤY TẤT CẢ ĐƠN HÀNG
 */
exports.getAdminOrders = async (req, res) => {
    try {
        const { page, limit, status, search } = req.query;
        const result = await orderService.getAllOrdersAdmin({
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 10,
            status,
            search
        });
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * 2. DÀNH CHO ADMIN: CẬP NHẬT TRẠNG THÁI
 */
exports.updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await orderService.updateOrderStatus(req.params.id, status);
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

/**
 * 3. DÀNH CHO KHÁCH: TẠO ĐƠN HÀNG
 */
exports.createNewOrder = async (req, res) => {
    try {
        const customerId = req.user._id || req.user?.id;
        if (!customerId) {
            return res.status(401).json({ success: false, message: "Vui lòng đăng nhập lại!" });
        }
        const result = await orderService.createOrder(req.body, customerId);
        res.status(201).json({ success: true, message: "Đặt hàng thành công", data: result });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

/**
 * 4. DÀNH CHO KHÁCH: LẤY DANH SÁCH ĐƠN HÀNG CỦA TÔI
 * Đã đổi sang dùng hàm getMyOrdersClient để bảo mật tuyệt đối
 */
exports.getMyOrders = async (req, res) => {
    try {
        const { page, limit, status } = req.query;
        const customerId = req.user._id || req.user?.id;

        // GỌI SERVICE RIÊNG CHO CLIENT (Phải đảm bảo trong orderService.js đã có hàm này)
        const result = await orderService.getMyOrdersClient({
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 10,
            status: status,
            customerId: customerId
        });

        res.status(200).json({ success: true, data: result });
    } catch (error) {
        console.error("LỖI THỰC SỰ ĐÂY NÀY:", error); 
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * 5. DÀNH CHO CẢ HAI: LẤY CHI TIẾT ĐƠN HÀNG
 */
exports.getOrderDetail = async (req, res) => {
    try {
        const orderId = req.params.id;
        const userId = req.user._id || req.user?.id;

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ success: false, message: "Không tìm thấy đơn hàng" });
        }

        // Kiểm tra quyền: Phải là chủ đơn hoặc Admin
        const isOwner = order.customerId.toString() === userId.toString();
        const isAdmin = req.user.role && req.user.role.toLowerCase() === 'admin';

        if (!isOwner && !isAdmin) {
            return res.status(403).json({ success: false, message: "Bạn không có quyền xem đơn hàng này" });
        }

        // Lấy chi tiết sản phẩm và gộp vào object order
        const details = await OrderDetail.find({ orderId: orderId }).populate('productId');
        const orderData = order.toObject();
        orderData.orderDetails = details;

        res.status(200).json({ success: true, data: orderData });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * 6. DÀNH CHO KHÁCH: HỦY ĐƠN HÀNG CỦA TÔI
 */
exports.cancelMyOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const customerId = req.user._id || req.user?.id;

        const order = await Order.findOne({ _id: orderId, customerId: customerId });
        if (!order) {
            return res.status(404).json({ success: false, message: "Không tìm thấy đơn hàng" });
        }

        if (order.status !== 'Pending') {
            return res.status(400).json({ success: false, message: "Chỉ có thể hủy đơn đang chờ xác nhận" });
        }

        const updatedOrder = await orderService.updateOrderStatus(orderId, 'Cancelled', 'Khách hàng tự hủy đơn');
        res.status(200).json({ success: true, data: updatedOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

/**
 * 7. KIỂM TRA TRẠNG THÁI (TRA CỨU NHANH)
 */
exports.checkOrderStatus = async (req, res) => {
    try {
        const { orderCode } = req.params;
        const order = await Order.findOne({ orderCode }).select('status');
        if (!order) {
            return res.status(404).json({ success: false, message: "Không tìm thấy đơn hàng" });
        }
        res.status(200).json({ success: true, status: order.status });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};