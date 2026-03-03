const mongoose = require('mongoose');

const SupplierSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, trim: true, lowercase: true },
  address: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Active', 'Hidden'], 
    default: 'Active' 
  }
}, { timestamps: true });

// Index để tìm kiếm nhanh
SupplierSchema.index({ name: 'text', phone: 'text' });

module.exports = mongoose.model('Supplier', SupplierSchema);