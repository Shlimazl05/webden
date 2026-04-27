


const Payment = require('../models/Payment');
const Order = require('../models/Order');
const orderService = require('./orderService');
const axios = require('axios'); // Thêm axios để gọi API SePay


/**
 * Dành cho gói FREE: Trả về link QR tĩnh nhanh gọn, không bị Cloudflare chặn.
 */
exports.createSePayPaymentLink = async (order) => {
    try {
        // Lấy thông tin từ .env
        const bankAcc = process.env.BANK_NUMBER; // Số tài khoản MB của bạn
        const bankName = process.env.BANK_NAME;     // MBBank

        // Tạo link QR của SePay (Link này cực kỳ ổn định và miễn phí)
        // acc: Số tài khoản
        // bank: Mã ngân hàng
        // amount: Số tiền (finalAmount)
        // des: Nội dung chuyển khoản (Mã đơn hàng - Rất quan trọng để Webhook khớp đơn)
        const checkoutUrl = `https://qr.sepay.vn/img?acc=${bankAcc}&bank=${bankName}&amount=${Math.round(order.finalAmount)}&des=${order.orderCode}`;

        console.log("==> Đã tạo link QR thanh toán cho đơn:", order.orderCode);

        return checkoutUrl;
    } catch (error) {
        console.error("Lỗi khi tạo link QR:", error.message);
        return null;
    }
};



exports.processSePayWebhook = async (webhookData) => {
    const { content, transferAmount, referenceNumber, transactionDate, id } = webhookData;

    // 1. Tách mã đơn hàng (Bắt được cả STL-123456 và STL123456)
    const match = content.match(/STL-?(\d+)/i);
    const orderCode = match ? `STL-${match[1]}` : null;

    if (!orderCode) return { success: false, message: "Không tìm thấy mã đơn hàng trong nội dung" };

    // 2. Tìm đơn hàng
    const order = await Order.findOne({ orderCode });
    if (!order) return { success: false, message: `Đơn hàng ${orderCode} không tồn tại` };

    // 3. Chống trùng giao dịch (Idempotency)
    const transactionId = id || referenceNumber;
    const existingPayment = await Payment.findOne({ transactionId });
    if (existingPayment) return { success: true, message: "Giao dịch này đã được xử lý trước đó" };

    // 4. Ghi nhận lịch sử giao dịch vào bảng Payment
    await Payment.create({
        orderId: order._id,
        transactionId: transactionId,
        amount: Number(transferAmount),
        content,
        paymentDate: transactionDate ? new Date(transactionDate) : new Date(),
        gatewayRawData: webhookData,
        status: 'Success'
    });

    // 5. CẬP NHẬT TRẠNG THÁI ĐƠN HÀNG
    order.paymentStatus = 'Paid';

    if (order.status === 'Pending') {
        // Chuyển sang Đang xử lý và trừ kho (Bỏ chữ "Hệ thống:")
        await orderService.updateOrderStatus(
            order._id,
            'Processing',
            `Thanh toán thành công ${Number(transferAmount).toLocaleString()}đ qua SePay.`
        );
    } else if (order.status === 'Cancelled') {
        // Trường hợp khách chuyển tiền đúng lúc đơn vừa bị hủy tự động (sau 10p)
        order.statusHistory.push({
            status: 'Cancelled',
            note: `Khách đã thanh toán ${Number(transferAmount).toLocaleString()}đ nhưng đơn đã bị hủy trước đó. Cần kiểm tra hoàn tiền hoặc xác nhận lại đơn.`
        });
    }

    await order.save();
    return { success: true, orderCode };
};