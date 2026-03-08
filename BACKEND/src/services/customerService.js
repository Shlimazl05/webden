const User = require('../models/User');

/**
 * Lấy danh sách tất cả khách hàng và format lại dữ liệu
 */

// Backend: services/customerService.js
// Backend: services/customerService.js
// D:\webden\backend\services\customerService.js

// D:\webden\backend\services\customerService.js

const getAllCustomers = async (search = '', page = 1, limit = 10) => {
    let filter = { role: 'Customer' };
    if (search) {
        filter.$or = [
            { username: { $regex: search, $options: 'i' } },
            { phone: { $regex: search, $options: 'i' } }
        ];
    }

    const skip = (page - 1) * limit;

    const customers = await User.find(filter)
                                .select('-password')
                                .skip(skip)
                                .limit(limit)
                                .sort({ createdAt: -1 });

    const total = await User.countDocuments(filter);
    
    // Trả về tổng số trang thực tế dựa trên số lượng khách trong DB
    const totalPages = Math.ceil(total / limit);

    return {
        customers: customers.map(user => ({
            ...user.toObject(),
            status: user.status === 1 ? 'Active' : 'Blocked',
            orderCount: 0,
            totalSpent: 0
        })),
        totalPages: totalPages
    };
};
/**
 * Cập nhật trạng thái khách hàng trong DB
 */
const updateStatus = async (customerId, statusString) => {
    // Chuyển đổi 'Active'/'Blocked' thành 1/0
    const statusNumber = statusString === 'Active' ? 1 : 0;

    const updatedUser = await User.findByIdAndUpdate(
        customerId,
        { status: statusNumber },
        { new: true }
    );

    if (!updatedUser) {
        throw new Error("Không tìm thấy khách hàng để cập nhật");
    }

    // Trả về trạng thái đã chuyển đổi để Frontend đồng bộ
    return updatedUser.status === 1 ? 'Active' : 'Blocked';
};

module.exports = {
    getAllCustomers,
    updateStatus
};