
const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
    let token;

    // 1. Kiểm tra xem có token trong header Authorization không (Bearer Token)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Lấy token từ chuỗi "Bearer <token>"
            token = req.headers.authorization.split(' ')[1];

            // 2. Giải mã token
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "Bi_Mat_123");

            // 3. Gán thông tin user vào request để Controller sử dụng
            req.user = decoded; 

            next(); // Cho phép đi tiếp vào Controller
        } catch (error) {
            return res.status(401).json({ message: "Token không hợp lệ hoặc đã hết hạn" });
        }
    }

    if (!token) {
        return res.status(401).json({ message: "Bạn chưa đăng nhập, không có token" });
    }
};

// src/middleware/authMiddleware.js

// Middleware kiểm tra quyền Admin
const adminOnly = (req, res, next) => {
  // req.user được tạo ra từ middleware protect trước đó
  if (req.user && req.user.role === 'Admin') {
    next();
  } else {
    res.status(403).json({ message: "Truy cập bị từ chối. Chỉ dành cho Admin!" });
  }
};

module.exports = { protect, adminOnly }; // Export cả 2

module.exports = { protect, adminOnly };