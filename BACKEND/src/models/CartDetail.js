const mongoose = require('mongoose');

const CartDetailSchema = new mongoose.Schema({
    cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart', required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, min: 1 },
    unitPrice: { type: Number, required: true } // Lưu giá tại thời điểm thêm vào giỏ
}, { timestamps: true });

module.exports = mongoose.model('CartDetail', CartDetailSchema);