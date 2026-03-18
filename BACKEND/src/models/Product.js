

const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  // Mã sản phẩm (Ví dụ: SP-001) - Trong sơ đồ là productCode
  productCode: { 
    type: String, 
    unique: true, 
    required: true,
    trim: true 
  },

  // Tên sản phẩm - productName
  productName: { 
    type: String, 
    required: true,
    trim: true 
  },

  // Slug để làm URL đẹp (Ví dụ: den-ban-luxury-01) - Tốt cho SEO
  slug: { 
    type: String, 
    unique: true 
  },

  // Giá bán - salePrice
  salePrice: { 
    type: Number, 
    required: true, 
    min: 0 
  },

  // Số lượng tồn kho - stockQuantity
  stockQuantity: { 
    type: Number, 
    default: 0, 
    min: 0 
  },

  // Ảnh đại diện chính - imageUrl trong sơ đồ
  imageUrl: { 
    type: String,
    required: true 
  },

  // Bộ sưu tập ảnh phụ (để đáp ứng yêu cầu "nhiều ảnh" của bạn)
  images: [{ 
    type: String 
  }],

  // Thông số kỹ thuật - specifications (Object linh hoạt)
  specifications: {
    description: { type: String }, // Mô tả chi tiết
    power: { type: String },       // Công suất
    material: { type: String },    // Chất liệu
    size: { type: String },        // Kích thước
    // Cho phép thêm các trường khác tùy ý
  },

  // Trạng thái - status
  status: { 
    type: String,
    enum: ['Active', 'Hidden', 'Discontinued'],
    default: 'Active' 
  },

  // Khóa ngoại liên kết với Danh mục - 1 Category có nhiều Product
  categoryId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category', 
    required: true 
  }
}, { 
  timestamps: true // Tự động tạo createdAt và updatedAt
});

// Index để tìm kiếm nhanh theo mã và tên
ProductSchema.index({ productName: 'text', productCode: 'text' });

module.exports = mongoose.model('Product', ProductSchema);