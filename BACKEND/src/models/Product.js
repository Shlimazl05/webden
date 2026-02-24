const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  productCode: { type: String, unique: true, required: true },
  productName: { type: String, required: true },
  salePrice: { type: Number, required: true, min: 0 },
  stockQuantity: { type: Number, default: 0, min: 0 },
  imageUrl: { type: String },
  specifications: { type: Object }, // Lưu linh hoạt công suất, chất liệu...
  status: { type: String,
    enum:['Active', 'Hidden', 'Discontinued'],
    default: 'Active' },
  // khóa ngoại
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);