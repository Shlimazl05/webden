const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  orderId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Order', 
    required: true 
  },
  transactionId: { 
    type: String, 
    unique: true, 
    required: true 
  }, // Mã tham chiếu từ Ngân hàng (referenceNumber)
  amount: { type: Number, required: true },
  paymentMethod: { type: String, default: 'SePay' },
  content: { type: String }, // Nội dung khách đã ghi khi chuyển khoản
  paymentDate: { type: Date }, // Ngày giờ giao dịch thực tế từ Bank
  gatewayRawData: { type: Object }, // Lưu toàn bộ JSON SePay gửi về để đối soát khi cần
  status: { 
    type: String, 
    enum: ['Success', 'Failed'], 
    default: 'Success' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);