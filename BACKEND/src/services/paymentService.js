
// const Payment = require('../models/Payment');
// const Order = require('../models/Order');
// const orderService = require('./orderService');

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

//     // 3. Kiểm tra thời hạn 24h (so với thời điểm đặt đơn)
//     const orderTime = new Date(order.createdAt).getTime();
//     const currentTime = Date.now();
//     const twentyFourHours = 24 * 60 * 60 * 1000;
//     const isExpired = (currentTime - orderTime) > twentyFourHours;

//     // 4. Lưu lịch sử giao dịch vào database
//     await Payment.create({
//         orderId: order._id,
//         transactionId: referenceNumber,
//         amount: Number(transferAmount),
//         content,
//         paymentDate: new Date(transactionDate),
//         gatewayRawData: webhookData
//     });

//     const allPayments = await Payment.find({ orderId: order._id });
//     const totalPaid = allPayments.reduce((sum, p) => sum + p.amount, 0);

//     // 5. Logic xử lý trạng thái
    
//     // Nếu đơn hàng đã quá hạn 24h và chưa thanh toán đủ trước đó
//     if (isExpired && order.paymentStatus !== 'Paid') {
//         order.status = 'Cancelled';
//         order.paymentStatus = 'Partially_Paid';
//         order.statusHistory.push({
//             status: 'Cancelled',
//             note: `Hệ thống: Đơn hàng tự động hủy do quá hạn thanh toán 24h. Số tiền đã nhận: ${totalPaid.toLocaleString()}đ.`
//         });
//         await order.save();
//         return { success: true, message: "Đơn hàng quá hạn" };
//     }

//     // Nếu thanh toán đủ (hoặc dư)
//     if (totalPaid >= order.finalAmount) {
//         order.paymentStatus = 'Paid';
        
//         if (order.status === 'Pending') {
//             try {
//                 await orderService.updateOrderStatus(
//                     order._id, 
//                     'Processing', 
//                     `SePay: Xác nhận đủ tiền ${totalPaid.toLocaleString()}đ. Hệ thống tự động chuyển trạng thái.`
//                 );
//             } catch (error) {
//                 order.statusHistory.push({
//                     status: 'Pending',
//                     note: `Hệ thống: Khách đã trả đủ tiền nhưng gặp lỗi kho: ${error.message}`
//                 });
//             }
//         } else if (order.status === 'Cancelled') {
//             order.statusHistory.push({
//                 status: 'Cancelled',
//                 note: `Lưu ý: Khách thanh toán ${totalPaid.toLocaleString()}đ cho đơn đã hủy. Cần liên hệ hoàn tiền.`
//             });
//         }
//     } 
//     // Nếu vẫn thiếu tiền
//     else {
//         order.paymentStatus = 'Partially_Paid';
//         order.statusHistory.push({
//             status: order.status,
//             note: `SePay: Nhận thêm ${Number(transferAmount).toLocaleString()}đ. Tổng đã nhận: ${totalPaid.toLocaleString()}/${order.finalAmount.toLocaleString()}đ. Chờ chuyển thêm để hoàn tất.`
//         });
//     }

//     await order.save();
//     return { success: true, totalReceived: totalPaid };
// };


const Payment = require('../models/Payment');
const Order = require('../models/Order');
const orderService = require('./orderService');
const axios = require('axios'); // Thêm axios để gọi API SePay

/**
 * HÀM 1: TẠO LINK THANH TOÁN (CHECKOUT PAGE)
 * Gọi hàm này khi khách bấm nút "Đặt hàng & Thanh toán"
 */
exports.createSePayPaymentLink = async (order) => {
    try {
        // Thông tin cấu hình SePay (Lấy từ Dashboard -> Cấu hình API)
        const API_TOKEN = process.env.SEPAY_API_TOKEN; 
        const PAY_URL = "https://api.sepay.vn/checkout/create";

        const data = {
            "amount": order.finalAmount,
            "description": `Thanh toán đơn hàng ${order.orderCode}`,
            "order_id": order.orderCode, // Gắn mã đơn vào để SePay trả về đúng
            "return_url": `${process.env.CLIENT_URL}/payment-success`, // Link khách quay về sau khi trả tiền
            "cancel_url": `${process.env.CLIENT_URL}/payment-failed`,
        };

        const response = await axios.post(PAY_URL, data, {
            headers: { 'Authorization': `Bearer ${API_TOKEN}` }
        });

        // Trả về link trang thanh toán (cái form tím tím bạn gửi ảnh)
        return response.data.checkout_url; 
    } catch (error) {
        console.error("Lỗi tạo link thanh toán SePay:", error.message);
        // Nếu lỗi API, có thể fallback về link ảnh QR tĩnh như cũ
        return `https://qr.sepay.vn/img?acc=${process.env.BANK_NUMBER}&bank=${process.env.BANK_NAME}&amount=${order.finalAmount}&des=${order.orderCode}`;
    }
};

/**
 * HÀM 2: XỬ LÝ KHI CÓ TIỀN VỀ (WEBHOOK)
 * (Đã cập nhật: Không in hoa, chặn 24h, logic cộng dồn)
 */
exports.processSePayWebhook = async (webhookData) => {
    const { content, transferAmount, referenceNumber, transactionDate } = webhookData;

    // 1. Lọc mã đơn hàng
    const match = content.match(/STL-\d+/i);
    const orderCode = match ? match[0].toUpperCase() : null;

    if (!orderCode) return { success: false, message: "Không tìm thấy mã đơn hàng" };
    
    const order = await Order.findOne({ orderCode });
    if (!order) return { success: false, message: `Đơn hàng ${orderCode} không tồn tại` };

    // 2. Chống trùng giao dịch
    const existingPayment = await Payment.findOne({ transactionId: referenceNumber });
    if (existingPayment) return { success: true, message: "Giao dịch đã được xử lý" };

    // 3. Kiểm tra thời hạn 24h kể từ lúc đặt đơn
    const orderTime = new Date(order.createdAt).getTime();
    const currentTime = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    const isExpired = (currentTime - orderTime) > twentyFourHours;

    // 4. Ghi nhận giao dịch vào bảng Payment
    await Payment.create({
        orderId: order._id,
        transactionId: referenceNumber,
        amount: Number(transferAmount),
        content,
        paymentDate: new Date(transactionDate),
        gatewayRawData: webhookData
    });

    // Tính tổng tiền đã nhận được cho đơn này
    const allPayments = await Payment.find({ orderId: order._id });
    const totalPaid = allPayments.reduce((sum, p) => sum + p.amount, 0);

    // 5. Logic xử lý trạng thái đơn hàng
    
    // TRƯỜNG HỢP 1: Đơn đã quá 24h (Dù khách vừa chuyển tiền cũng hủy)
    if (isExpired && order.paymentStatus !== 'Paid') {
        order.status = 'Cancelled';
        order.paymentStatus = 'Partially_Paid';
        order.statusHistory.push({
            status: 'Cancelled',
            note: `Hệ thống: Đơn hàng tự động hủy do quá hạn 24h. Tổng tiền đã nhận: ${totalPaid.toLocaleString()}đ.`
        });
        await order.save();
        return { success: true, message: "Đơn hàng đã quá hạn thanh toán" };
    }

    // TRƯỜNG HỢP 2: Đã thanh toán đủ (hoặc dư)
    if (totalPaid >= order.finalAmount) {
        order.paymentStatus = 'Paid';
        
        if (order.status === 'Pending') {
            try {
                await orderService.updateOrderStatus(
                    order._id, 
                    'Processing', 
                    `Hệ thống: Xác nhận đủ tiền ${totalPaid.toLocaleString()}đ. Đơn hàng bắt đầu được xử lý.`
                );
            } catch (error) {
                order.statusHistory.push({
                    status: 'Pending',
                    note: `Hệ thống: Đã nhận đủ tiền nhưng gặp lỗi kho: ${error.message}`
                });
            }
        } else if (order.status === 'Cancelled') {
            order.statusHistory.push({
                status: 'Cancelled',
                note: `Lưu ý: Khách thanh toán ${totalPaid.toLocaleString()}đ cho đơn đã đóng. Cần liên hệ hoàn tiền.`
            });
        }
    } 
    // TRƯỜNG HỢP 3: Thanh toán thiếu
    else {
        order.paymentStatus = 'Partially_Paid';
        order.statusHistory.push({
            status: order.status,
            note: `Hệ thống: Nhận thêm ${Number(transferAmount).toLocaleString()}đ. Đã có: ${totalPaid.toLocaleString()}/${order.finalAmount.toLocaleString()}đ. Chờ chuyển thêm để hoàn tất.`
        });
    }

    await order.save();
    return { success: true, totalReceived: totalPaid };
};