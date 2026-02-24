const orderService = require('../services/orderService');
const vnpayService = require('../services/vnpayService'); // Nhớ import cái này ní nhé!

exports.placeOrder = async (req, res) => {
    try {
        const userId = req.user.id; // Lấy từ token
        
        // 1. Gọi service để tạo đơn hàng trong Database trước
        const order = await orderService.createOrder(userId, req.body);
        
        // 2. Kiểm tra nếu khách chọn VNPay thì tạo Link thanh toán
        if (req.body.paymentMethod === 'VNPay') {
            // Lấy địa chỉ IP của máy khách (bắt buộc cho VNPay)
            const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
            
            // Tạo đường dẫn thanh toán
            const paymentUrl = vnpayService.createPaymentUrl(order, ipAddress);
            
            // Trả về cả thông tin đơn và link cho Postman/Frontend
            return res.status(201).json({
                message: "Đơn hàng đã tạo thành công, mời ní đi thanh toán!",
                order,
                paymentUrl // <-- CÁI NÀY LÀ THỨ NÍ ĐANG THIẾU
            });
        }

        // 3. Nếu khách chọn COD (Tiền mặt) thì trả về thông báo bình thường
        res.status(201).json({
            message: "Đặt hàng thành công! Vui lòng thanh toán khi nhận hàng.",
            order
        });

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Hàm này giữ lại để sau này ní làm PayPal hoặc các thanh toán thủ công khác
exports.confirmPayment = async (req, res) => {
    try {
        const { orderId, transactionId } = req.body;
        const Order = require('../models/Order'); // Import tạm model nếu cần
        const order = await Order.findById(orderId);
        if (!order) throw new Error("Không tìm thấy đơn hàng!");

        order.status = 'Đã thanh toán';
        order.transactionId = transactionId; 
        
        await order.save();

        res.status(200).json({
            message: "Hệ thống đã ghi nhận thanh toán thành công!",
            order
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};