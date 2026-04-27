

const User = require('../models/User');
const Order = require('../models/Order'); // Đảm bảo đường dẫn này đúng với file Order.js bạn vừa gửi

/**
 * Lấy danh sách tất cả khách hàng kèm số đơn hàng và tổng tiền
 */
const getAllCustomers = async (search = '', page = 1, limit = 10) => {
    try {
        let filter = { role: 'Customer' };
        if (search) {
            filter.$or = [
                { username: { $regex: search, $options: 'i' } },
                { phone: { $regex: search, $options: 'i' } }
            ];
        }

        const skip = (page - 1) * limit;

        // 1. Lấy danh sách khách hàng
        const customers = await User.find(filter)
            .select('-password')
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await User.countDocuments(filter);
        const totalPages = Math.ceil(total / limit);

        // 2. Lấy danh sách ID của các khách hàng đang hiển thị
        const customerIds = customers.map(c => c._id);

        // 3. Truy vấn tổng hợp từ bảng Order (Dựa trên schema bạn gửi)
        const orderStats = await Order.aggregate([
            {
                $match: {
                    customerId: { $in: customerIds },
                    status: { $ne: 'Cancelled' } // Không tính các đơn đã bị hủy (tùy bạn chọn)
                }
            },
            {
                $group: {
                    _id: "$customerId", // Nhóm theo customerId trong schema của bạn
                    orderCount: { $sum: 1 },
                    totalSpent: { $sum: "$finalAmount" } // Cộng tổng tiền từ trường finalAmount
                }
            }
        ]);

        // 4. Chuyển kết quả aggregate thành một Map để dễ tra cứu
        const statsMap = orderStats.reduce((acc, curr) => {
            acc[curr._id.toString()] = curr;
            return acc;
        }, {});

        // 5. Kết hợp dữ liệu Order vào danh sách Khách hàng
        const formattedCustomers = customers.map(user => {
            const stats = statsMap[user._id.toString()] || { orderCount: 0, totalSpent: 0 };
            return {
                ...user.toObject(),
                status: user.status === 1 ? 'Active' : 'Blocked',
                orderCount: stats.orderCount,
                totalSpent: stats.totalSpent
            };
        });

        return {
            customers: formattedCustomers,
            totalPages: totalPages
        };
    } catch (error) {
        console.error("Lỗi tại getAllCustomers:", error);
        throw error;
    }
};

/**
 * Cập nhật trạng thái khách hàng
 */
const updateStatus = async (customerId, statusString) => {
    const statusNumber = statusString === 'Active' ? 1 : 0;

    const updatedUser = await User.findByIdAndUpdate(
        customerId,
        { status: statusNumber },
        { new: true }
    );

    if (!updatedUser) {
        throw new Error("Không tìm thấy khách hàng để cập nhật");
    }

    return updatedUser.status === 1 ? 'Active' : 'Blocked';
};

module.exports = {
    getAllCustomers,
    updateStatus
};