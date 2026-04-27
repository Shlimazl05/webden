const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Kết nối MongoDB Atlas thành công!");
    } catch (err) {
        console.error("❌ Lỗi kết nối DB:", err.message);
        process.exit(1); // Dừng hệ thống nếu lỗi
    }
};

module.exports = connectDB;