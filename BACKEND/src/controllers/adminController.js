const Product = require('../models/Product');
const Category = require('../models/Category');
// Giả sử bạn có model Order và User sau này
// const Order = require('../models/Order');
// const User = require('../models/User');

exports.getDashboardStats = async (req, res) => {
    try {
        // Đếm thực tế từ Database
        const totalProducts = await Product.countDocuments();
        const totalCategories = await Category.countDocuments();
        
        // Hiện tại chưa có đơn hàng và khách nên để mặc định hoặc đếm nếu đã có model
        const totalOrders = 0; 
        const totalCustomers = 0;
        const totalRevenue = 0;

        res.status(200).json({
            success: true,
            data: {
                revenue: totalRevenue,
                products: totalProducts,
                customers: totalCustomers,
                orders: totalOrders,
                categories: totalCategories
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};