// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const path = require('path');
// const connectDB = require('./config/db');

// // 1. Cấu hình biến môi trường
// dotenv.config({ path: path.join(__dirname, '../.env') });

// // 2. Kết nối Database
// connectDB();

// const app = express();

// // 3. Middleware
// app.use(express.json());
// app.use(cors({
//   origin: 'http://localhost:3000', // URL của Frontend Next.js
//   credentials: true
// }));

// // 4. Routes (Sử dụng phân hệ)
// app.use('/api/auth', require('./routes/authRoutes'));   // Đăng ký, Đăng nhập
// // app.use('/api/orders', require('./routes/orderRoutes')); // Đặt hàng, Thanh toán
// app.use('/api/products', require('./routes/productRoutes'));
// //danh muc
// app.use('/api/categories', categoryRoutes);
// app.use('/api/cart', require('./routes/cartRoutes'));
// app.use('/api/orders', require('./routes/orderRoutes'));
// // API đón kết quả trả về từ VNPay
// app.use('/api/vnpay', require('./routes/vnpayRoutes'));
// // Route kiểm tra server
// app.get('/', (req, res) => {
//     res.json({ message: "API Website Bán Đèn đang hoạt động!" });
// });

// // 5. Khởi động Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server chạy tại: http://localhost:${PORT}`);
// });

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// 1. Cấu hình biến môi trường
dotenv.config({ path: path.join(__dirname, '../.env') });

// 2. Kết nối Database
connectDB();

const app = express();

// 3. Middleware
app.use(express.json()); // Đọc dữ liệu JSON gửi lên từ Frontend
app.use(express.urlencoded({ extended: true })); // Hỗ trợ đọc dữ liệu từ Form-data
app.use(cors({
  origin: 'http://localhost:3000', // URL của Frontend Next.js
  credentials: true
}));

// Cấu hình thư mục tĩnh để hiển thị hình ảnh sản phẩm
// Khi bạn lưu ảnh trong thư mục /uploads ở gốc project, 
// Frontend có thể truy cập qua: http://localhost:5000/uploads/ten-anh.jpg
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// 4. Routes (Sử dụng require trực tiếp để tránh lỗi biến chưa định nghĩa)
app.use('/api/auth', require('./routes/authRoutes'));       // Xác thực
app.use('/api/products', require('./routes/productRoutes')); // Sản phẩm
app.use('/api/categories', require('./routes/categoryRoutes')); // Danh mục (ĐÃ SỬA LỖI TẠI ĐÂY)
app.use('/api/cart', require('./routes/cartRoutes'));       // Giỏ hàng
app.use('/api/orders', require('./routes/orderRoutes'));    // Đơn hàng
app.use('/api/vnpay', require('./routes/vnpayRoutes'));     // Thanh toán VNPay

// Route kiểm tra trạng thái server
app.get('/', (req, res) => {
    res.json({ message: "API Website Stellar Lights đang hoạt động mượt mà! 🚀" });
});

// 5. Middleware xử lý lỗi tập trung (Global Error Handler)
// Giúp server không bị sập khi gặp lỗi logic bên trong Service/Controller
app.use((err, req, res, next) => {
    console.error("❌ Error Log:", err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Lỗi server nội bộ!",
    });
});

// 6. Khởi động Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
  *************************************************
  🚀 Server đang chạy tại: http://localhost:${PORT}
  🛠️  Môi trường: ${process.env.NODE_ENV || 'development'}
  *************************************************
  `);
});