const Product = require('../models/Product');
const Category = require('../models/Category');
const Order = require('../models/Order');
const User = require('../models/User');
const OrderDetail = require('../models/OrderDetail');
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


exports.getBestSellers = async (limit = 5) => {
    return await OrderDetail.aggregate([
        {
            // Chỉ tính sản phẩm từ các đơn hàng đã thanh toán hoặc hoàn thành
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
                'orderInfo.status': { $ne: 'Cancelled' }, // Chắc chắn không tính đơn Hủy
                $or: [
                    { 'orderInfo.paymentStatus': 'Paid' }, // Trường hợp 1: Đã thanh toán (Online/Chuyển khoản)
                    { 'orderInfo.status': 'Completed' }    // Trường hợp 2: Đơn COD đã giao hàng thành công (hoàn thành)
                ]
            }
        },
        {
            // Nhóm theo sản phẩm và cộng dồn số lượng
            $group: {
                _id: '$productId',
                totalSold: { $sum: '$quantity' },
                revenue: { $sum: { $multiply: ['$quantity', '$unitPrice'] } }
            }
        },
        {
            // Lấy thông tin chi tiết sản phẩm
            $lookup: {
                from: 'products',
                localField: '_id',
                foreignField: '_id',
                as: 'product'
            }
        },
        { $unwind: '$product' },
        { $sort: { totalSold: -1 } }, // Sắp xếp giảm dần theo số lượng bán
        { $limit: limit },
        {
            $project: {
                _id: 1,
                totalSold: 1,
                revenue: 1,
                name: '$product.productName',
                image: '$product.imageUrl',
                price: '$product.price'
            }
        }
    ]);
};

