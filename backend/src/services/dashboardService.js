



const Product = require('../models/Product');
const Category = require('../models/Category');
const Order = require('../models/Order');
const User = require('../models/User');
const OrderDetail = require('../models/OrderDetail');

/**
 * Helper: Tính toán ngày bắt đầu dựa trên filterType
 */
const getStartDate = (filterType) => {
    const now = new Date();
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    switch (filterType) {
        case 'today':
            return start;
        case '7days':
            start.setDate(now.getDate() - 6); // Lấy từ 6 ngày trước tới nay là đủ 7 ngày
            return start;
        case 'thisMonth':
            start.setDate(1); // Ngày đầu tiên của tháng hiện tại
            return start;
        case 'all':
            return new Date(0); // Từ năm 1970 (Coi như tất cả thời gian)
        default:
            // Mặc định là số ngày (ví dụ 30) nếu truyền vào số
            const days = parseInt(filterType) || 30;
            start.setDate(now.getDate() - (days - 1));
            return start;
    }
};

exports.getStats = async (filterType = '30') => {
    try {
        const startDate = getStartDate(filterType);
        const now = new Date();

        // Tính toán số ngày để vẽ biểu đồ (Chart loop)
        let diffDays = 30;
        if (filterType === 'today') diffDays = 1;
        else if (filterType === '7days') diffDays = 7;
        else if (filterType === 'thisMonth') diffDays = now.getDate();
        else if (filterType === 'all') diffDays = 30; // 'all' vẫn nên hiện 30 ngày gần nhất trên chart cho đẹp
        else diffDays = parseInt(filterType) || 30;

        // 1. THỐNG KÊ TỔNG (Snapshot hiện tại - Thường không lọc theo thời gian)
        const [pCount, cCount, uCount] = await Promise.all([
            Product.countDocuments().catch(() => 0),
            Category.countDocuments().catch(() => 0),
            User.countDocuments({ role: 'Customer' }).catch(() => 0),
        ]);

        // Điều kiện lọc chung cho doanh thu: Không Cancel + (Paid hoặc Completed)
        const revenueMatch = {
            updatedAt: { $gte: startDate },
            status: { $ne: 'Cancelled' },
            $or: [
                { paymentStatus: { $regex: /^paid$/i } },
                { status: 'Completed' }
            ]
        };

        // 2. TÍNH DOANH THU VÀ ĐƠN HÀNG TRONG KỲ
        const periodStats = await Order.aggregate([
            { $match: revenueMatch },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$finalAmount" },
                    totalOrders: { $sum: 1 }
                }
            }
        ]).catch(() => []);

        // 3. BIỂU ĐỒ DOANH THU THEO NGÀY
        let rawDailyRevenue = [];
        try {
            rawDailyRevenue = await Order.aggregate([
                { $match: revenueMatch },
                {
                    $group: {
                        _id: { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt", timezone: "+07:00" } },
                        revenue: { $sum: "$finalAmount" }
                    }
                },
                { $project: { date: "$_id", revenue: 1, _id: 0 } }
            ]);
        } catch (e) { console.error("Lỗi aggregation doanh thu chart:", e); }

        // Xử lý bù ngày trống cho biểu đồ
        const dailyRevenue = [];
        const dateMap = {};
        rawDailyRevenue.forEach(item => { dateMap[item.date] = item.revenue; });

        for (let i = diffDays - 1; i >= 0; i--) {
            const d = new Date();
            d.setHours(0, 0, 0, 0);
            d.setDate(d.getDate() - i);
            
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            const dateString = `${year}-${month}-${day}`;
            dailyRevenue.push({ date: dateString, revenue: dateMap[dateString] || 0 });
        }

        // 4. BIỂU ĐỒ TỶ TRỌNG DANH MỤC
        let categoryStats = [];
        try {
            categoryStats = await OrderDetail.aggregate([
                {
                    $lookup: {
                        from: 'orders',
                        localField: 'orderId',
                        foreignField: '_id',
                        as: 'orderInfo'
                    }
                },
                { $unwind: '$orderInfo' },
                {
                    $match: {
                        'orderInfo.updatedAt': { $gte: startDate },
                        'orderInfo.status': { $ne: 'Cancelled' },
                        $or: [
                            { 'orderInfo.paymentStatus': { $regex: /^paid$/i } },
                            { 'orderInfo.status': 'Completed' }
                        ]
                    }
                },
                {
                    $lookup: {
                        from: 'products',
                        localField: 'productId',
                        foreignField: '_id',
                        as: 'productInfo'
                    }
                },
                { $unwind: '$productInfo' },
                {
                    $group: {
                        _id: '$productInfo.categoryId',
                        totalRevenue: { $sum: { $multiply: ['$quantity', '$unitPrice'] } }
                    }
                },
                {
                    $lookup: {
                        from: 'categories',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'cat'
                    }
                },
                { $unwind: { path: '$cat', preserveNullAndEmptyArrays: true } },
                {
                    $project: {
                        name: { $ifNull: ["$cat.name", "Chưa phân loại"] },
                        value: "$totalRevenue",
                        _id: 0
                    }
                },
                { $sort: { value: -1 } }
            ]);
        } catch (e) { console.error("Lỗi biểu đồ danh mục:", e); }

        return {
            revenue: periodStats[0]?.totalRevenue || 0,
            products: pCount,
            customers: uCount,
            orders: periodStats[0]?.totalOrders || 0,
            categories: cCount,
            revenueChart: dailyRevenue,
            categoryChart: categoryStats
        };
    } catch (error) {
        console.error("Lỗi tổng tại dashboardService:", error);
        return { revenue: 0, products: 0, customers: 0, orders: 0, categories: 0, revenueChart: [], categoryChart: [] };
    }
};

exports.getBestSellers = async (limit = 5, filterType = '30') => {
    try {
        const startDate = getStartDate(filterType);

        return await OrderDetail.aggregate([
            {
                $lookup: {
                    from: 'orders',
                    localField: 'orderId',
                    foreignField: '_id',
                    as: 'orderInfo'
                }
            },
            { $unwind: '$orderInfo' },
            {
                $match: {
                    'orderInfo.updatedAt': { $gte: startDate },
                    'orderInfo.status': { $ne: 'Cancelled' },
                    $or: [
                        { 'orderInfo.paymentStatus': { $regex: /^paid$/i } },
                        { 'orderInfo.status': 'Completed' }
                    ]
                }
            },
            {
                $group: {
                    _id: '$productId',
                    totalSold: { $sum: '$quantity' },
                    revenue: { $sum: { $multiply: ['$quantity', '$unitPrice'] } }
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            { $unwind: '$product' },
            { $sort: { totalSold: -1 } },
            { $limit: limit },
            {
                $project: {
                    _id: 1,
                    totalSold: 1,
                    revenue: 1,
                    name: '$product.productName',
                    image: '$product.imageUrl'
                }
            }
        ]);
    } catch (error) {
        console.error("Lỗi getBestSellers:", error);
        return [];
    }
};