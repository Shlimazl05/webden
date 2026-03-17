// const Product = require('../models/Product');
// const Category = require('../models/Category');

// const Order = require('../models/Order');
// const User = require('../models/User');

// exports.getDashboardStats = async (req, res) => {
//     try {
//         // Đếm thực tế từ Database
//         const totalProducts = await Product.countDocuments();
//         const totalCategories = await Category.countDocuments();
        
//         // Hiện tại chưa có đơn hàng và khách nên để mặc định hoặc đếm nếu đã có model
//         const totalOrders = 0; 
//         const totalCustomers = 0;
//         const totalRevenue = 0;

//         res.status(200).json({
//             success: true,
//             data: {
//                 revenue: totalRevenue,
//                 products: totalProducts,
//                 customers: totalCustomers,
//                 orders: totalOrders,
//                 categories: totalCategories
//             }
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

// Import cái service vừa tạo
const dashboardService = require('../services/dashboardService');

exports.getDashboardStats = async (req, res) => {
    try {
        // Gọi service lấy data
        const stats = await dashboardService.getStats();

        res.status(200).json({
            success: true,
            data: stats
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};