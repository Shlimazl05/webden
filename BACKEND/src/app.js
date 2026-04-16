

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');


// --- 1. CONFIGURATIONS ---
dotenv.config(); // Tự động tìm .env ở gốc project
connectDB();


const app = express();

// Cho phép truy cập vào thư mục public
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
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
const dashboardRoutes = require('./routes/dashboardRoutes'); // Tuyến đường cho Dashboard
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

const supplierRoutes = require('./routes/supplierRoutes');
const importOrderRoutes = require('./routes/importOrderRoutes');
const customerRoutes = require('./routes/customerRoutes');
const shippingRoutes = require('./routes/shippingRoutes');

const orderService = require('./services/orderService');

// Cổng chào API
app.get('/', (req, res) => res.status(200).json({ 
    message: "Stellar Lights API is running..." 
}));

// Đăng ký các tuyến đường
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/dashboard', dashboardRoutes); // Dùng cho thống kê Dashboard
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);

app.use('/api/suppliers', supplierRoutes);
app.use('/api/import-orders', importOrderRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/shipping', shippingRoutes);

// --- KÍCH HOẠT QUÉT ĐƠN HÀNG HẾT HẠN ---//
orderService.startOrderCleanupTask();
// --- 4. ERROR HANDLING ---//
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