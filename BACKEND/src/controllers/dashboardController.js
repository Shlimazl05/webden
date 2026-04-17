


// const dashboardService = require('../services/dashboardService');

// exports.getDashboardStats = async (req, res) => {
//     try {
//         const days = parseInt(req.query.range) || 30;
//         // Sử dụng Promise.all để chạy 2 truy vấn song song (giúp API chạy nhanh hơn)
//         const [stats, bestSellers] = await Promise.all([
//             dashboardService.getStats(days),
//             dashboardService.getBestSellers(5, days) // Lấy top 5 sản phẩm
//         ]);

//         // Gộp bestSellers vào chung với cục stats
//         const responseData = {
//             ...stats,
//             bestSellers: bestSellers
//         };

//         res.status(200).json({
//             success: true,
//             data: responseData
//         });
//     } catch (error) {
//         console.error("Dashboard Stats Error:", error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };


// D:\webden\BACKEND\src\controllers\dashboardController.js

const dashboardService = require('../services/dashboardService');

exports.getDashboardStats = async (req, res) => {
    try {
        // 1. KHÔNG dùng parseInt ở đây. Để nguyên chuỗi 'today', 'all', '30'...
        const range = req.query.range || '30';

        // 2. Truyền biến range (chuỗi) vào service
        const [stats, bestSellers] = await Promise.all([
            dashboardService.getStats(range),
            dashboardService.getBestSellers(5, range)
        ]);

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