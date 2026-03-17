const paymentService = require('../services/paymentService');
const Order = require('../models/Order');
const orderService = require('../services/orderService');
const Payment = require('../models/Payment');



// exports.handleSePayWebhook = async (req, res) => {
//     try {
        
//         const { content, transferAmount } = req.body;
//         console.log("Nội dung SePay gửi về:", content);

//         // 1. Regex mới: Tìm chữ STL và các con số đi kèm (có thể có hoặc không có dấu -)
//         // Nó sẽ bắt được các dạng: STL-123456, STL123456, stl123456...
//         const regex = /STL-?(\d+)/i;
//         const match = content.match(regex);

//         if (!match) {
//             return res.status(200).json({
//                 success: false,
//                 message: "Không tìm thấy mã đơn hàng trong nội dung"
//             });
//         }

//         // 2. Lấy con số sau chữ STL (ví dụ: 071917)
//         const orderNumber = match[1];
//         const orderCode = `STL-${orderNumber}`; // Đưa về chuẩn có dấu gạch ngang để tìm trong DB

//         console.log("Mã đơn hàng nhận diện được:", orderCode);

//         // 3. Tìm đơn hàng trong Database
//         const order = await Order.findOne({ orderCode: orderCode });

//         if (!order) {
//             return res.status(200).json({
//                 success: false,
//                 message: `Mã đơn ${orderCode} không tồn tại trên hệ thống`
//             });
//         }

//         // 4. Kiểm tra số tiền (Tránh khách sửa QR thanh toán thiếu)
//         if (transferAmount < order.finalAmount) {
//             // Cập nhật trạng thái thanh toán thiếu nếu cần
//             order.paymentStatus = 'Partially_Paid';
//             await order.save();
//             return res.status(200).json({ success: false, message: "Thanh toán thiếu tiền" });
//         }

//         // 5. CẬP NHẬT THÀNH CÔNG
//         // Chuyển status sang Processing (Đã xác nhận) và paymentStatus sang Paid (Đã thanh toán)
//         await orderService.updateOrderStatus(order._id, 'Processing', 'SePay: Đã nhận đủ tiền qua chuyển khoản');

//         order.paymentStatus = 'Paid';
//         await order.save();

//         console.log(`[SePay Success]: Đơn hàng ${orderCode} đã được thanh toán tự động.`);

//         // Phải trả về 200 để SePay dừng bắn Webhook
//         res.status(200).json({ success: true, message: "Xác nhận đơn hàng thành công" });

//     } catch (error) {
//         console.error("Lỗi Webhook SePay:", error.message);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };


exports.handleSePayWebhook = async (req, res) => {
    try {
        // Gửi body sang service xử lý toàn bộ logic
        const result = await paymentService.processSePayWebhook(req.body);

        // Trả về 200 cho SePay để họ biết đã xong việc
        return res.status(200).json(result);
    } catch (error) {
        console.error("Lỗi Webhook SePay:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};