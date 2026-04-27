

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