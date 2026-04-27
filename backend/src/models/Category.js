const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  // Tên danh mục (Ví dụ: Đèn chùm, Đèn thả, Đèn tường)
  name: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true 
  },
  
  // Slug để làm đường dẫn URL đẹp (Ví dụ: den-chum, den-tha)
  // Rất hữu ích khi làm trang tìm kiếm/lọc theo danh mục ở Frontend
  slug: { 
    type: String, 
    unique: true 
  },

  // Mô tả ngắn về danh mục (không bắt buộc)
  description: { 
    type: String 
    
  },
  // Ảnh đại diện
  image: { type: String, default: "" }, 
  // Trạng thái hiển thị
  status: { 
    type: String, 
    default: 'Active',
    enum: ['Active', 'Hidden'] 
  }
}, { 
  timestamps: true // Tự động tạo createdAt và updatedAt
});

module.exports = mongoose.model('Category', CategorySchema);