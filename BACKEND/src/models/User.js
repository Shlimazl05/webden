const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'Customer'], default: 'Customer' },
    status: { type: Number, default: 1 } // 1: Hoạt động, 0: Bị chặn
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);



// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//     username: { 
//         type: String, 
//         required: true,
//         trim: true 
//     },
//     email: { 
//         type: String, 
//         required: false, 
//         default: null,
//         unique: true, // Đảm bảo không trùng email
//         lowercase: true, // Tự động chuyển về chữ thường
//         trim: true,
//         sparse: true // cho phép nhiều người để trống
//     },
//     phone: { 
//         type: String, 
//         required: true, 
//         unique: true,
//         trim: true 
//     },
//     password: { 
//         type: String, 
//         required: true 
//     },
//     role: { 
//         type: String, 
//         enum: ['Admin', 'Customer'], 
//         default: 'Customer' 
//     },
//     // Địa chỉ: Bạn có thể để String hoặc một Object nếu muốn chi tiết hơn
//     address: { 
//         type: String, 
//         default: '' // Đối với Admin có thể để trống, Customer sẽ cập nhật sau
//     },
//     status: { 
//         type: Number, 
//         default: 1 
//     } // 1: Hoạt động, 0: Bị chặn
// }, { timestamps: true });

// module.exports = mongoose.model('User', UserSchema);