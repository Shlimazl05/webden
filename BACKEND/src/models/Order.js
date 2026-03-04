// const mongoose = require('mongoose');

// const OrderSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   recipientName: String,
//   phone: String,
//   address: String,
//   items: [{
//     productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
//     quantity: Number,
//     unitPrice: Number
//   }],
//   shippingFee: Number,
//   totalAmount: Number,
//   paymentMethod: { type: String, enum: ['VNPay', 'COD'] },
//   transactionId: { type: String, unique: true, sparse: true  //Cho phép những đơn COD (không có mã này) vẫn được lưu mà không bị lỗi trùng lặp null
//   },
//   status: { type: String, default: 'Chờ xử lý' }
// }, { timestamps: true });

// module.exports = mongoose.model('Order', OrderSchema);

const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  // Mã đơn hàng hiển thị (Ví dụ: STL-9921)
  orderCode: { 
    type: String, 
    unique: true, 
    required: true 
  },

  // Khách hàng đặt hàng
  customerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },

  // Thông tin giao hàng
  recipientName: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },

  // Tài chính
  shippingFee: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true }, // Tổng tiền hàng
  finalAmount: { type: Number, required: true }, // Tổng cộng (Tiền hàng + Ship)

  // Thanh toán
  paymentMethod: { 
    type: String, 
    enum: ['SePay', 'COD'], 
    default: 'COD' 
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending'
  },
  transactionId: { 
    type: String, 
    unique: true, 
    sparse: true 
  },

  // Trạng thái đơn hàng (Khớp với Frontend Tab)
  status: { 
    type: String, 
    enum: ['Pending', 'Processing', 'Shipping', 'Completed', 'Cancelled'],
    default: 'Pending' 
  },

  // Lịch sử trạng thái (Để hiện: Đã đặt hàng -> Đang giao...)
  statusHistory: [
    {
      status: String,
      updatedAt: { type: Date, default: Date.now },
      note: String
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);