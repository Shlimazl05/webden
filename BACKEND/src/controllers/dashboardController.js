// const Product = require('../models/Product');
// const Category = require('../models/Category');

// const Order = require('../models/Order');
// const User = require('../models/User');


// const dashboardService = require('../services/dashboardService');

// exports.getDashboardStats = async (req, res) => {
//     try {
//         // Gọi service lấy data
//         const stats = await dashboardService.getStats();

//         res.status(200).json({
//             success: true,
//             data: stats
//         });
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message });
//     }
// };


const dashboardService = require('../services/dashboardService');

exports.getDashboardStats = async (req, res) => {
    try {
        const days = parseInt(req.query.range) || 30;
        // Sử dụng Promise.all để chạy 2 truy vấn song song (giúp API chạy nhanh hơn)
        const [stats, bestSellers] = await Promise.all([
            dashboardService.getStats(days),
            dashboardService.getBestSellers(5, days) // Lấy top 5 sản phẩm
        ]);

        // Gộp bestSellers vào chung với cục stats
        const responseData = {
            ...stats,
            bestSellers: bestSellers
        };

        res.status(200).json({
            success: true,
            data: responseData
        });
    } catch (error) {
        console.error("Dashboard Stats Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};