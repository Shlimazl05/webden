const Product = require('../models/Product');
const Category = require('../models/Category');
const Order = require('../models/Order');
const User = require('../models/User');

exports.getStats = async () => {
    const [
        totalProducts,
        totalCategories,
        totalOrders,
        totalCustomers
    ] = await Promise.all([
        Product.countDocuments(),
        Category.countDocuments(),
        // 1. ĐẾM TẤT CẢ ĐƠN ĐANG HOẠT ĐỘNG (Bỏ đơn Hủy)
        Order.countDocuments({ status: { $ne: 'Cancelled' } }),
        User.countDocuments({ role: 'Customer' })
    ]);

    // 2. TÍNH DOANH THU THỰC TẾ (Tiền đã về túi)
    const revenueData = await Order.aggregate([
        {
            $match: {
                status: { $ne: 'Cancelled' }, // Không tính đơn hủy
                $or: [
                    { paymentStatus: 'Paid' },   // Đã thanh toán (SePay hoặc xác nhận tay)
                    { status: 'Completed' }      // Hoặc đã giao hàng xong (mặc định coi như đã thu tiền)
                ]
            }
        },
        {
            $group: {
                _id: null,
                total: { $sum: "$finalAmount" }
            }
        }
    ]);

    const totalRevenue = revenueData.length > 0 ? revenueData[0].total : 0;

    return {
        revenue: totalRevenue,
        products: totalProducts,
        customers: totalCustomers,
        orders: totalOrders,
        categories: totalCategories
    };
};