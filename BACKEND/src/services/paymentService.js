


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


/**
 * HÀM 2: XỬ LÝ KHI CÓ TIỀN VỀ (WEBHOOK)
 * Cập nhật: Mốc thời gian 10 phút, khớp với Cron Job tự động hủy.
 */

// exports.processSePayWebhook = async (webhookData) => {
//     const { content, transferAmount, referenceNumber, transactionDate } = webhookData;

//     // 1. Lọc mã đơn hàng (không phân biệt hoa thường)
//     const match = content.match(/STL-\d+/i);
//     const orderCode = match ? match[0].toUpperCase() : null;

//     if (!orderCode) return { success: false, message: "Không tìm thấy mã đơn hàng trong nội dung" };

//     const order = await Order.findOne({ orderCode });
//     if (!order) return { success: false, message: `Đơn hàng ${orderCode} không tồn tại` };

//     // 2. Chống trùng giao dịch (Tránh SePay bắn Webhook lại nhiều lần cho 1 mã GD)
//     const existingPayment = await Payment.findOne({ transactionId: referenceNumber });
//     if (existingPayment) return { success: true, message: "Giao dịch này đã được xử lý trước đó" };

//     // 3. Kiểm tra thời hạn 10 PHÚT kể từ lúc đặt đơn
//     const orderTime = new Date(order.createdAt).getTime();
//     const currentTime = Date.now();
//     const tenMinutes = 10 * 60 * 1000; // Đổi thành 10 phút
//     const isExpired = (currentTime - orderTime) > tenMinutes;

//     // 4. Ghi nhận giao dịch vào bảng Payment (Lưu vết tiền về)
//     await Payment.create({
//         orderId: order._id,
//         transactionId: referenceNumber,
//         amount: Number(transferAmount),
//         content,
//         paymentDate: new Date(transactionDate),
//         gatewayRawData: webhookData
//     });

//     // Tính tổng tiền đã nhận được cho đơn này (để xử lý khách chuyển nhiều lần)
//     const allPayments = await Payment.find({ orderId: order._id });
//     const totalPaid = allPayments.reduce((sum, p) => sum + p.amount, 0);

//     // 5. Logic cập nhật trạng thái đơn hàng

//     // TRƯỜNG HỢP 1: Thanh toán đủ (hoặc dư)
//     if (totalPaid >= order.finalAmount) {
//         order.paymentStatus = 'Paid';

//         // Nếu đơn vẫn đang Pending (Chưa bị Cron Job hủy)
//         if (order.status === 'Pending') {
//             try {
//                 // Gọi orderService để chuyển sang Processing (và trừ kho)
//                 await orderService.updateOrderStatus(
//                     order._id,
//                     'Processing',
//                     `Hệ thống: Nhận đủ tiền ${totalPaid.toLocaleString()}đ qua SePay.`
//                 );
//                 console.log(`[Webhook Success] Đơn hàng ${orderCode} đã thanh toán thành công.`);
//             } catch (error) {
//                 order.statusHistory.push({
//                     status: 'Pending',
//                     note: `Hệ thống: Nhận đủ tiền nhưng lỗi khi cập nhật trạng thái: ${error.message}`
//                 });
//             }
//         }
//         // Nếu đơn đã bị Cancelled (do quá 10 phút hoặc admin hủy)
//         else if (order.status === 'Cancelled') {
//             order.statusHistory.push({
//                 status: 'Cancelled',
//                 note: `CẢNH BÁO: Khách thanh toán đủ ${totalPaid.toLocaleString()}đ nhưng đơn ĐÃ BỊ HỦY trước đó (thanh toán muộn). Cần hoàn tiền hoặc xác nhận thủ công.`
//             });
//             console.warn(`[Webhook Warning] Đơn ${orderCode} đã hủy nhưng khách vẫn chuyển tiền.`);
//         }
//     }
//     // TRƯỜNG HỢP 2: Thanh toán thiếu
//     else {
//         order.paymentStatus = 'Partially_Paid';
//         order.statusHistory.push({
//             status: order.status,
//             note: `Hệ thống: Nhận thêm ${Number(transferAmount).toLocaleString()}đ. Đã nhận: ${totalPaid.toLocaleString()}/${order.finalAmount.toLocaleString()}đ. Chờ thanh toán thêm.`
//         });
//     }

//     await order.save();
//     return { success: true, orderCode, totalReceived: totalPaid };
// };

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