
// const Payment = require('../models/Payment');
// const Order = require('../models/Order');
// const orderService = require('./orderService');

// exports.processSePayWebhook = async (webhookData) => {
//     const { content, transferAmount, referenceNumber, transactionDate } = webhookData;

//     // 1. Regex lọc mã đơn STL-xxxx (Hỗ trợ không phân biệt hoa thường)
//     const match = content.match(/STL-\d+/i);
//     const orderCode = match ? match[0].toUpperCase() : null;

//     if (!orderCode) return { success: false, message: "Không tìm thấy mã đơn hàng trong nội dung" };

//     const order = await Order.findOne({ orderCode });
//     if (!order) return { success: false, message: `Đơn hàng ${orderCode} không tồn tại` };

//     // 2. Chống trùng giao dịch (Idempotency)
//     const existingPayment = await Payment.findOne({ transactionId: referenceNumber });
//     if (existingPayment) return { success: true, message: "Giao dịch này đã được xử lý trước đó" };

//     // 3. Lưu lịch sử giao dịch thanh toán mới vào Database
//     const newPayment = await Payment.create({
//         orderId: order._id,
//         transactionId: referenceNumber,
//         amount: Number(transferAmount),
//         content,
//         paymentDate: new Date(transactionDate),
//         gatewayRawData: webhookData
//     });

//     // 4. LOGIC CỘNG DỒN: Tính tổng tất cả các lần khách đã chuyển cho đơn này
//     const allPayments = await Payment.find({ orderId: order._id });
//     const totalPaid = allPayments.reduce((sum, p) => sum + p.amount, 0);

//     // 5. XỬ LÝ TRẠNG THÁI ĐƠN HÀNG DỰA TRÊN TỔNG TIỀN
    
//     // TRƯỜNG HỢP A: ĐÃ THANH TOÁN ĐỦ (HOẶC DƯ)
//     if (totalPaid >= order.finalAmount) {
//         order.paymentStatus = 'Paid';
        
//         // KIỂM TRA TRẠNG THÁI ĐƠN HÀNG TRƯỚC KHI DUYỆT TỰ ĐỘNG
//         if (order.status === 'Pending') {
//             // Nếu đơn đang chờ, tự động duyệt và TRỪ KHO
//             try {
//                 await orderService.updateOrderStatus(
//                     order._id, 
//                     'Processing', 
//                     `SePay: Xác nhận đủ tiền ${totalPaid}đ (Cộng dồn ${allPayments.length} giao dịch).`
//                 );
//             } catch (error) {
//                 // Nếu lỗi trừ kho (hết hàng), ghi vào lịch sử để Admin xử lý
//                 order.statusHistory.push({
//                     status: 'Pending',
//                     note: `SePay: Khách đã trả đủ tiền nhưng lỗi trừ kho: ${error.message}`
//                 });
//             }
//         } else if (order.status === 'Cancelled') {
//             // Nếu đơn đã hủy mà khách vẫn cố tình chuyển tiền
//             order.statusHistory.push({
//                 status: 'Cancelled',
//                 note: `CẢNH BÁO: Khách đã thanh toán ${totalPaid}đ cho đơn hàng ĐÃ HỦY. Cần hoàn tiền.`
//             });
//         }
//     } 
//     // TRƯỜNG HỢP B: VẪN THANH TOÁN THIẾU
//     else {
//         order.paymentStatus = 'Partially_Paid';
//         order.statusHistory.push({
//             status: order.status,
//             note: `SePay: Khách chuyển thiếu. Mới nhận: ${totalPaid}/${order.finalAmount}đ. chưa đủ điều kiện xác nhận đơn.`
//         });
//     }

//     await order.save();
//     return { success: true, totalReceived: totalPaid };
// };


const Payment = require('../models/Payment');
const Order = require('../models/Order');
const orderService = require('./orderService');

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

    // 3. Kiểm tra thời hạn 24h (so với thời điểm đặt đơn)
    const orderTime = new Date(order.createdAt).getTime();
    const currentTime = Date.now();
    const twentyFourHours = 24 * 60 * 60 * 1000;
    const isExpired = (currentTime - orderTime) > twentyFourHours;

    // 4. Lưu lịch sử giao dịch vào database
    await Payment.create({
        orderId: order._id,
        transactionId: referenceNumber,
        amount: Number(transferAmount),
        content,
        paymentDate: new Date(transactionDate),
        gatewayRawData: webhookData
    });

    const allPayments = await Payment.find({ orderId: order._id });
    const totalPaid = allPayments.reduce((sum, p) => sum + p.amount, 0);

    // 5. Logic xử lý trạng thái
    
    // Nếu đơn hàng đã quá hạn 24h và chưa thanh toán đủ trước đó
    if (isExpired && order.paymentStatus !== 'Paid') {
        order.status = 'Cancelled';
        order.paymentStatus = 'Partially_Paid';
        order.statusHistory.push({
            status: 'Cancelled',
            note: `Hệ thống: Đơn hàng tự động hủy do quá hạn thanh toán 24h. Số tiền đã nhận: ${totalPaid.toLocaleString()}đ.`
        });
        await order.save();
        return { success: true, message: "Đơn hàng quá hạn" };
    }

    // Nếu thanh toán đủ (hoặc dư)
    if (totalPaid >= order.finalAmount) {
        order.paymentStatus = 'Paid';
        
        if (order.status === 'Pending') {
            try {
                await orderService.updateOrderStatus(
                    order._id, 
                    'Processing', 
                    `SePay: Xác nhận đủ tiền ${totalPaid.toLocaleString()}đ. Hệ thống tự động chuyển trạng thái.`
                );
            } catch (error) {
                order.statusHistory.push({
                    status: 'Pending',
                    note: `Hệ thống: Khách đã trả đủ tiền nhưng gặp lỗi kho: ${error.message}`
                });
            }
        } else if (order.status === 'Cancelled') {
            order.statusHistory.push({
                status: 'Cancelled',
                note: `Lưu ý: Khách thanh toán ${totalPaid.toLocaleString()}đ cho đơn đã hủy. Cần liên hệ hoàn tiền.`
            });
        }
    } 
    // Nếu vẫn thiếu tiền
    else {
        order.paymentStatus = 'Partially_Paid';
        order.statusHistory.push({
            status: order.status,
            note: `SePay: Nhận thêm ${Number(transferAmount).toLocaleString()}đ. Tổng đã nhận: ${totalPaid.toLocaleString()}/${order.finalAmount.toLocaleString()}đ. Chờ chuyển thêm để hoàn tất.`
        });
    }

    await order.save();
    return { success: true, totalReceived: totalPaid };
};