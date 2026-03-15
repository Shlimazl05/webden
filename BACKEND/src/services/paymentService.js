


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
 * (Đã cập nhật: Không in hoa, chặn 24h, logic cộng dồn)
 */
// exports.processSePayWebhook = async (webhookData) => {
//     const { content, transferAmount, referenceNumber, transactionDate } = webhookData;

//     // 1. Lọc mã đơn hàng
//     const match = content.match(/STL-\d+/i);
//     const orderCode = match ? match[0].toUpperCase() : null;

//     if (!orderCode) return { success: false, message: "Không tìm thấy mã đơn hàng" };
    
//     const order = await Order.findOne({ orderCode });
//     if (!order) return { success: false, message: `Đơn hàng ${orderCode} không tồn tại` };

//     // 2. Chống trùng giao dịch
//     const existingPayment = await Payment.findOne({ transactionId: referenceNumber });
//     if (existingPayment) return { success: true, message: "Giao dịch đã được xử lý" };

//     // 3. Kiểm tra thời hạn 24h kể từ lúc đặt đơn
//     const orderTime = new Date(order.createdAt).getTime();
//     const currentTime = Date.now();
//     const twentyFourHours = 24 * 60 * 60 * 1000;
//     const isExpired = (currentTime - orderTime) > twentyFourHours;

//     // 4. Ghi nhận giao dịch vào bảng Payment
//     await Payment.create({
//         orderId: order._id,
//         transactionId: referenceNumber,
//         amount: Number(transferAmount),
//         content,
//         paymentDate: new Date(transactionDate),
//         gatewayRawData: webhookData
//     });

//     // Tính tổng tiền đã nhận được cho đơn này
//     const allPayments = await Payment.find({ orderId: order._id });
//     const totalPaid = allPayments.reduce((sum, p) => sum + p.amount, 0);

//     // 5. Logic xử lý trạng thái đơn hàng
    
//     // TRƯỜNG HỢP 1: Đơn đã quá 24h (Dù khách vừa chuyển tiền cũng hủy)
//     if (isExpired && order.paymentStatus !== 'Paid') {
//         order.status = 'Cancelled';
//         order.paymentStatus = 'Partially_Paid';
//         order.statusHistory.push({
//             status: 'Cancelled',
//             note: `Hệ thống: Đơn hàng tự động hủy do quá hạn 24h. Tổng tiền đã nhận: ${totalPaid.toLocaleString()}đ.`
//         });
//         await order.save();
//         return { success: true, message: "Đơn hàng đã quá hạn thanh toán" };
//     }

//     // TRƯỜNG HỢP 2: Đã thanh toán đủ (hoặc dư)
//     if (totalPaid >= order.finalAmount) {
//         order.paymentStatus = 'Paid';
        
//         if (order.status === 'Pending') {
//             try {
//                 await orderService.updateOrderStatus(
//                     order._id, 
//                     'Processing', 
//                     `Hệ thống: Xác nhận đủ tiền ${totalPaid.toLocaleString()}đ. Đơn hàng bắt đầu được xử lý.`
//                 );
//             } catch (error) {
//                 order.statusHistory.push({
//                     status: 'Pending',
//                     note: `Hệ thống: Đã nhận đủ tiền nhưng gặp lỗi kho: ${error.message}`
//                 });
//             }
//         } else if (order.status === 'Cancelled') {
//             order.statusHistory.push({
//                 status: 'Cancelled',
//                 note: `Lưu ý: Khách thanh toán ${totalPaid.toLocaleString()}đ cho đơn đã đóng. Cần liên hệ hoàn tiền.`
//             });
//         }
//     } 
//     // TRƯỜNG HỢP 3: Thanh toán thiếu
//     else {
//         order.paymentStatus = 'Partially_Paid';
//         order.statusHistory.push({
//             status: order.status,
//             note: `Hệ thống: Nhận thêm ${Number(transferAmount).toLocaleString()}đ. Đã có: ${totalPaid.toLocaleString()}/${order.finalAmount.toLocaleString()}đ. Chờ chuyển thêm để hoàn tất.`
//         });
//     }

//     await order.save();
//     return { success: true, totalReceived: totalPaid };
// };


/**
 * HÀM 2: XỬ LÝ KHI CÓ TIỀN VỀ (WEBHOOK)
 * Cập nhật: Mốc thời gian 10 phút, khớp với Cron Job tự động hủy.
 */
exports.processSePayWebhook = async (webhookData) => {
    const { content, transferAmount, referenceNumber, transactionDate } = webhookData;

    // 1. Lọc mã đơn hàng (không phân biệt hoa thường)
    const match = content.match(/STL-\d+/i);
    const orderCode = match ? match[0].toUpperCase() : null;

    if (!orderCode) return { success: false, message: "Không tìm thấy mã đơn hàng trong nội dung" };

    const order = await Order.findOne({ orderCode });
    if (!order) return { success: false, message: `Đơn hàng ${orderCode} không tồn tại` };

    // 2. Chống trùng giao dịch (Tránh SePay bắn Webhook lại nhiều lần cho 1 mã GD)
    const existingPayment = await Payment.findOne({ transactionId: referenceNumber });
    if (existingPayment) return { success: true, message: "Giao dịch này đã được xử lý trước đó" };

    // 3. Kiểm tra thời hạn 10 PHÚT kể từ lúc đặt đơn
    const orderTime = new Date(order.createdAt).getTime();
    const currentTime = Date.now();
    const tenMinutes = 10 * 60 * 1000; // Đổi thành 10 phút
    const isExpired = (currentTime - orderTime) > tenMinutes;

    // 4. Ghi nhận giao dịch vào bảng Payment (Lưu vết tiền về)
    await Payment.create({
        orderId: order._id,
        transactionId: referenceNumber,
        amount: Number(transferAmount),
        content,
        paymentDate: new Date(transactionDate),
        gatewayRawData: webhookData
    });

    // Tính tổng tiền đã nhận được cho đơn này (để xử lý khách chuyển nhiều lần)
    const allPayments = await Payment.find({ orderId: order._id });
    const totalPaid = allPayments.reduce((sum, p) => sum + p.amount, 0);

    // 5. Logic cập nhật trạng thái đơn hàng

    // TRƯỜNG HỢP 1: Thanh toán đủ (hoặc dư)
    if (totalPaid >= order.finalAmount) {
        order.paymentStatus = 'Paid';

        // Nếu đơn vẫn đang Pending (Chưa bị Cron Job hủy)
        if (order.status === 'Pending') {
            try {
                // Gọi orderService để chuyển sang Processing (và trừ kho)
                await orderService.updateOrderStatus(
                    order._id,
                    'Processing',
                    `Hệ thống: Nhận đủ tiền ${totalPaid.toLocaleString()}đ qua SePay.`
                );
                console.log(`[Webhook Success] Đơn hàng ${orderCode} đã thanh toán thành công.`);
            } catch (error) {
                order.statusHistory.push({
                    status: 'Pending',
                    note: `Hệ thống: Nhận đủ tiền nhưng lỗi khi cập nhật trạng thái: ${error.message}`
                });
            }
        }
        // Nếu đơn đã bị Cancelled (do quá 10 phút hoặc admin hủy)
        else if (order.status === 'Cancelled') {
            order.statusHistory.push({
                status: 'Cancelled',
                note: `CẢNH BÁO: Khách thanh toán đủ ${totalPaid.toLocaleString()}đ nhưng đơn ĐÃ BỊ HỦY trước đó (thanh toán muộn). Cần hoàn tiền hoặc xác nhận thủ công.`
            });
            console.warn(`[Webhook Warning] Đơn ${orderCode} đã hủy nhưng khách vẫn chuyển tiền.`);
        }
    }
    // TRƯỜNG HỢP 2: Thanh toán thiếu
    else {
        order.paymentStatus = 'Partially_Paid';
        order.statusHistory.push({
            status: order.status,
            note: `Hệ thống: Nhận thêm ${Number(transferAmount).toLocaleString()}đ. Đã nhận: ${totalPaid.toLocaleString()}/${order.finalAmount.toLocaleString()}đ. Chờ thanh toán thêm.`
        });
    }

    await order.save();
    return { success: true, orderCode, totalReceived: totalPaid };
};