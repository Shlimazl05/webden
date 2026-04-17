


const Product = require('../models/Product');
const Category = require('../models/Category');
const Order = require('../models/Order');
const User = require('../models/User');
const OrderDetail = require('../models/OrderDetail');

exports.getStats = async (days = 30) => {
    try {
        const startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        startDate.setDate(startDate.getDate() - (days - 1));

        // 1. Thống kê tổng số lượng (Tổng kho/Tổng khách)
        const [pCount, cCount, uCount] = await Promise.all([
            Product.countDocuments().catch(() => 0),
            Category.countDocuments().catch(() => 0),
            User.countDocuments({ role: 'Customer' }).catch(() => 0),
        ]);

        // 2. Tính Doanh thu và Đơn hàng trong kỳ
        const periodStats = await Order.aggregate([
            {
                $match: {
                    updatedAt: { $gte: startDate },
                    status: { $ne: 'Cancelled' },
                    $or: [{ paymentStatus: { $regex: /^paid$/i } }, { status: 'Completed' }]
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$finalAmount" },
                    totalOrders: { $sum: 1 }
                }
            }
        ]).catch(() => []);

        // 3. Biểu đồ doanh thu theo ngày (Area Chart)
        let rawDailyRevenue = [];
        try {
            rawDailyRevenue = await Order.aggregate([
                {
                    $match: {
                        updatedAt: { $gte: startDate },
                        status: { $ne: 'Cancelled' },
                        $or: [{ paymentStatus: 'Paid' }, { status: 'Completed' }]
                    }
                },
                {
                    $group: {
                        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                        revenue: { $sum: "$finalAmount" }
                    }
                },
                { $project: { date: "$_id", revenue: 1, _id: 0 } }
            ]);
        } catch (e) { console.error("Lỗi aggregation doanh thu:", e); }

        const dailyRevenue = [];
        const dateMap = {};
        rawDailyRevenue.forEach(item => { dateMap[item.date] = item.revenue; });

        for (let i = days - 1; i >= 0; i--) {
            const d = new Date();
            d.setHours(0, 0, 0, 0);
            d.setDate(d.getDate() - i);
            const dateString = d.toISOString().split('T')[0];
            dailyRevenue.push({ date: dateString, revenue: dateMap[dateString] || 0 });
        }

        // --- CẬP NHẬT CÁCH 2: BIỂU ĐỒ TỶ TRỌNG DANH MỤC THEO DOANH THU ---
        let categoryStats = [];
        try {
            categoryStats = await OrderDetail.aggregate([
                {
                    // Kết nối với bảng Orders để lọc thời gian và trạng thái
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
                            { 'orderInfo.paymentStatus': 'Paid' },
                            { 'orderInfo.status': 'Completed' }
                        ]
                    }
                },
                {
                    // Kết nối với bảng Products để biết sản phẩm thuộc danh mục nào
                    $lookup: {
                        from: 'products',
                        localField: 'productId',
                        foreignField: '_id',
                        as: 'productInfo'
                    }
                },
                { $unwind: '$productInfo' },
                {
                    // Nhóm theo danh mục và tính tổng doanh thu (quantity * unitPrice)
                    $group: {
                        _id: '$productInfo.categoryId',
                        totalRevenue: { $sum: { $multiply: ['$quantity', '$unitPrice'] } }
                    }
                },
                {
                    // Kết nối với bảng Categories để lấy tên hiển thị
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
                        value: "$totalRevenue", // Recharts dùng key 'value' để vẽ
                        _id: 0
                    }
                },
                { $sort: { value: -1 } } // Sắp xếp danh mục kiếm nhiều tiền nhất lên đầu
            ]);
        } catch (e) { console.error("Lỗi biểu đồ danh mục doanh thu:", e); }

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

exports.getBestSellers = async (limit = 5, days = 30) => {
    try {
        const startDate = new Date();
        startDate.setHours(0, 0, 0, 0);
        startDate.setDate(startDate.getDate() - (days - 1));

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
                        { 'orderInfo.paymentStatus': 'Paid' },
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