
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
// app.use(express.json()); // Đọc dữ liệu JSON gửi lên từ Frontend
// app.use(express.urlencoded({ extended: true })); // Hỗ trợ đọc dữ liệu từ Form-data
// app.use(cors({
//   origin: 'http://localhost:3000', // URL của Frontend Next.js
//   credentials: true
// }));

// // Cấu hình thư mục tĩnh để hiển thị hình ảnh sản phẩm
// // Khi bạn lưu ảnh trong thư mục /uploads ở gốc project, 
// // Frontend có thể truy cập qua: http://localhost:5000/uploads/ten-anh.jpg
// app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// // 4. Routes (Sử dụng require trực tiếp để tránh lỗi biến chưa định nghĩa)
// app.use('/api/auth', require('./routes/authRoutes'));       // Xác thực
// app.use('/api/products', require('./routes/productRoutes')); // Sản phẩm
// app.use('/api/categories', require('./routes/categoryRoutes')); // Danh mục (ĐÃ SỬA LỖI TẠI ĐÂY)
// app.use('/api/cart', require('./routes/cartRoutes'));       // Giỏ hàng
// app.use('/api/orders', require('./routes/orderRoutes'));    // Đơn hàng
// app.use('/api/vnpay', require('./routes/vnpayRoutes'));     // Thanh toán VNPay

// // Route kiểm tra trạng thái server
// app.get('/', (req, res) => {
//     res.json({ message: "API Website Stellar Lights đang hoạt động mượt mà! 🚀" });
// });

// // 5. Middleware xử lý lỗi tập trung (Global Error Handler)
// // Giúp server không bị sập khi gặp lỗi logic bên trong Service/Controller
// app.use((err, req, res, next) => {
//     console.error("❌ Error Log:", err.stack);
//     res.status(err.status || 500).json({
//         success: false,
//         message: err.message || "Lỗi server nội bộ!",
//     });
// });

// // 6. Khởi động Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`
//   *************************************************
//   🚀 Server đang chạy tại: http://localhost:${PORT}
//   🛠️  Môi trường: ${process.env.NODE_ENV || 'development'}
//   *************************************************
//   `);
// });

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// --- 1. CONFIGURATIONS ---
dotenv.config(); // Tự động tìm .env ở gốc project
connectDB();

const app = express();

// --- 2. MIDDLEWARES ---
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express.json({ limit: '10mb' })); // Tăng giới hạn để nhận được ảnh Base64 từ Frontend
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files (Hình ảnh sản phẩm)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// --- 3. ROUTES DEFINITION ---
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const adminRoutes = require('./routes/adminRoutes'); // Tuyến đường cho Dashboard
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const supplierRoutes = require('./routes/supplierRoutes');
const importOrderRoutes = require('./routes/importOrderRoutes');
const customerRoutes = require('./routes/customerRoutes');
// Cổng chào API
app.get('/', (req, res) => res.status(200).json({ 
    message: "Stellar Lights API is running..." 
}));

// Đăng ký các tuyến đường
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/admin', adminRoutes); // Dùng cho thống kê Dashboard
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);

app.use('/api/suppliers', supplierRoutes);
app.use('/api/import-orders', importOrderRoutes);
app.use('/api/customers', customerRoutes);

// --- 4. ERROR HANDLING ---
// Xử lý lỗi 404 (Không tìm thấy Route)
app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
});

// Global Error Handler
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    console.error(`[ERROR]: ${err.message}`);
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

// --- 5. SERVER LAUNCH ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`[SERVER]: Running on http://localhost:${PORT} in ${process.env.NODE_ENV} mode`);
});