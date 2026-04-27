const mongoose = require('mongoose');

const OrderDetailSchema = new mongoose.Schema({
  // Liên kết với đơn hàng chính
  orderId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Order', 
    required: true 
  },

  // Liên kết với sản phẩm
  productId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },

  // Số lượng mua
  quantity: { 
    type: Number, 
    required: true,
    min: 1 
  },

  // Giá chốt tại thời điểm mua (Tránh việc sau này sản phẩm đổi giá làm sai lệch hóa đơn cũ)
  unitPrice: { 
    type: Number, 
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('OrderDetail', OrderDetailSchema);