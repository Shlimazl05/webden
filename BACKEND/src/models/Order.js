const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  recipientName: String,
  phone: String,
  address: String,
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    unitPrice: Number
  }],
  shippingFee: Number,
  totalAmount: Number,
  paymentMethod: { type: String, enum: ['VNPay', 'COD'] },
  transactionId: { type: String, unique: true, sparse: true  //Cho phép những đơn COD (không có mã này) vẫn được lưu mà không bị lỗi trùng lặp null
  },
  status: { type: String, default: 'Chờ xử lý' }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);