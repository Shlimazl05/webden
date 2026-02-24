const { VNPay } = require('vnpay');
const moment = require('moment');

// 1. Khởi tạo instance VNPay
const vnpay = new VNPay({
    tmnCode: process.env.VNP_TMNCODE,
    secureSecret: process.env.VNP_HASHSECRET,
    vnpayHost: 'https://sandbox.vnpayment.vn',
    testMode: true, // Chế độ sandbox
});

const createPaymentUrl = (order, ipAddress) => {
    const createDate = moment().format('YYYYMMDDHHmmss');
    const orderId = order._id.toString();

    // 2. Sử dụng hàm buildPaymentUrl của thư viện
    const paymentUrl = vnpay.buildPaymentUrl({
        vnp_Amount: order.totalAmount, // Thư viện tự nhân 100
        vnp_IpAddr: ipAddress === '::1' ? '127.0.0.1' : ipAddress,
        vnp_TxnRef: orderId,
        vnp_OrderInfo: `Thanh toan don hang ${orderId}`,
        vnp_OrderType: 'other',
        vnp_ReturnUrl: process.env.VNP_RETURNURL,
        vnp_Locale: 'vn',
        vnp_CreateDate: createDate,
    });

    return paymentUrl;
};

// 3. Hàm kiểm tra kết quả trả về
const validateReturn = (queryParams) => {
    try {
        const verify = vnpay.verifyReturnUrl(queryParams);
        if (verify.isSuccess) {
            return { success: true, orderId: verify.vnp_TxnRef };
        } else {
            return { success: false, message: "Giao dịch thất bại" };
        }
    } catch (error) {
        throw new Error("Xác thực chữ ký thất bại: " + error.message);
    }
};

module.exports = { createPaymentUrl, validateReturn };